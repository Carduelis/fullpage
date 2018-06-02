import debounce from "debounce";
import { NEXT_SLIDE_CODES, PREV_SLIDE_CODES } from "../constants";
import onChange from "../helpers/onChange";
import { isDevelopment } from "../helpers/env";

class FullpageSlider {
    constructor(node) {
        const props = {
            timeoutId: null,
            lastSuccessScrollTime: new Date().getTime()
        };
        this.node = node;
        this.slides = node.children;
        this.node.addEventListener(
            "transitionend",
            this.onTransitionEnd,
            false
        );
        this.props = onChange(props, (target, property, { value }) => {
            if (property === "currentSlide") {
                console.log(`property ${property} has been set to`, value);
                const translateY = 100 * value / this.slides.length;
                this.node.style.transform = `translateY(-${translateY}%)`;
                this.sliderDidTrigger(this.props);
            }
        });
    }
    setProp(key, value) {
        this.props[key] = value;
    }
    setProps(obj) {
        Object.entries(obj).forEach(([key, value]) => {
            this.setProp(key, value);
        });
    }
    init(node = this.node, startSlide = 0) {
        this.setProps({
            currentSlide: startSlide
        });
        isDevelopment && console.log(node);
        node.addEventListener("wheel", debounce(this.onWheel, 20));
        document.addEventListener("keydown", this.onKeydown);
        this.sliderDidMount(this.props);
    }
    destroy() {
        document.removeEventListener("keydown", this.onKeydown);
        this.node.removeEventListener("transitionend", this.onTransitionEnd);
    }
    onTransitionEnd = event => {
        const { target, propertyName } = event;
        const EVENT_IS_ON_SLIDE_LIST = target === this.node;
        const IS_TRANFORM_TRANSITION = propertyName === "transform";
        if (EVENT_IS_ON_SLIDE_LIST && IS_TRANFORM_TRANSITION) {
            this.sliderTransitionEnded(this.props, event);
        }
    };
    onKeydown = event => {
        const { currentSlide } = this.props;
        const { code } = event;
        if (NEXT_SLIDE_CODES.includes(code)) {
            if (currentSlide < this.slides.length - 1) {
                this.tryDoSlide(1, 350);
            } else {
                this.doBounceDown();
            }
        } else if (PREV_SLIDE_CODES.includes(code)) {
            if (currentSlide > 0) {
                this.tryDoSlide(-1, 350);
            } else {
                this.doBounceUp();
            }
        }
    };

    doBounceDown() {
        const lastSlide = this.slides[this.slides.length - 1];
        lastSlide.style.transform = `translateY(-5%)`;
        const timeoutId = setTimeout(() => {
            lastSlide.style.transform = null;
        }, 100);
        this.setProps({ timeoutId });
    }
    doBounceUp() {
        const firstSlide = this.slides[0];
        firstSlide.style.transform = `translateY(5%)`;
        const timeoutId = setTimeout(() => {
            firstSlide.style.transform = null;
        }, 100);
        this.setProps({ timeoutId });
    }
    onWheel = event => {
        const { wheelDeltaY, wheelDeltaX, wheelDelta } = event;
        isDevelopment && console.log("wheel fired");
        this.scroll(wheelDeltaY);
    };
    scroll = delta => {
        const { currentSlide, lastTimeScroll } = this.props;
        // isDevelopment && console.warn(delta);
        if (Math.abs(delta) > 0) {
            if (currentSlide > 0 && delta < 0) {
                isDevelopment &&
                    console.log("%cscrollUp", "background: yellow");
                this.tryDoSlide(-1);
            } else {
                this.doBounceUp();
            }
            if (currentSlide < this.slides.length - 1 && delta > 0) {
                isDevelopment &&
                    console.log("%cscrollDown", "background: lime");
                this.tryDoSlide(1);
            } else {
                this.doBounceDown();
            }
        }
    };
    setAttemptToScrollTime() {
        this.setProps({
            lastAttemptToScrollTime: new Date().getTime()
        });
    }
    isAllowedToScroll(delay = 700) {
        const { lastAttemptToScrollTime, lastSuccessScrollTime } = this.props;
        return lastAttemptToScrollTime - lastSuccessScrollTime > delay;
    }
    tryDoSlide(delta) {
        const { node, props } = this;
        const { currentSlide, lastSuccessScrollTime } = props;
        this.setAttemptToScrollTime();
        if (this.isAllowedToScroll()) {
            this.doSlide(delta);
        } else {
            isDevelopment && console.log("too early for sliding");
        }
    }
    doSlide(delta) {
        this.sliderWillTrigger(this.props);
        this.setProps({
            currentSlide: (this.props.currentSlide += delta),
            lastSuccessScrollTime: new Date().getTime()
        });
    }
    setSlide(slide) {
        this.setProps({
            currentSlide: slide
        });
    }

    // lifecycle

    sliderTransitionEnded(props, event) {
        isDevelopment && console.log("sliderTransitionEnded", props, event);
    }
    sliderWillTrigger(props) {
        isDevelopment && console.log(props);
    }
    sliderDidMount(props) {
        isDevelopment && console.log(props);
    }
    sliderDidTrigger(props) {
        isDevelopment && console.log(props);
    }
}

export default FullpageSlider;
