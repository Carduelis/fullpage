import forEachNode from "./helpers/forEachNode";
import FullpageSlider from "./core";
import { isDevelopment } from "./helpers/env";
window.FullpageSlider = FullpageSlider;

if (isDevelopment) {
    document.addEventListener("DOMContentLoaded", e => {
        const sliderNodeList = document.getElementsByClassName("slider-list");
        class MySlider extends FullpageSlider {
            sliderWillTrigger(props) {
                console.log("sliderWillTrigger", props.currentSlide);
            }
            sliderDidTrigger(props) {
                // console.log("sliderDidTrigger", props.currentSlide);
            }
        }

        forEachNode(sliderNodeList, node => {
            const slider = new MySlider(node);
            slider.init();
        });
    });
}
