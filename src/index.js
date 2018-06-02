import debounce from 'debounce';
import forEachNode from './forEachNode';
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

if (isProduction) {
	console.log('Welcome to console!')
} else {
	console.log('Looks like we are in development mode!');
}



document.addEventListener("DOMContentLoaded", e => {
	const sliderNodeLIst = document.getElementsByClassName('slider-list');
	forEachNode(sliderNodeLIst, node => {
		const slider = new FullpageSlider(node);
		slider.init();
	})
})

class FullpageSlider {
	constructor(node) {
		this.data = {
			node,
			timeoutId: null,
			lastSuccessScrollTime: new Date().getTime()
		};
		for (let i = 8; i < 10; i++) {
			const clonedChild = node.children[0].cloneNode();
			clonedChild.innerHTML = i;
			clonedChild.style.backgroundColor = `hsl(${i*20}, 50%, 50%)`
			node.appendChild(clonedChild)
		}
		this.onWheel = this.onWheel.bind(this)
		this.onKeydown = this.onKeydown.bind(this)
	}
	init(node = this.data.node) {
		this.data.slides = node.children;
		this.data.currentSlide = 0;
		node.onwheel = debounce(this.onWheel, 20);
		document.onkeydown = this.onKeydown;
		this.printDebug();
	}
	onKeydown(event) {
		const { currentSlide, slides } = this.data;
		const { code } = event;
		const nextSlideCodes = ['ArrowDown', 'ArrowRight', 'Numpad2', 'Numpad6'];
		const prevSlideCodes = ['ArrowUp', 'ArrowLeft', 'Numpad8', 'Numpad4'];
		if (nextSlideCodes.includes(code)) {
			if (currentSlide < slides.length - 1) {
				this.doSlide(1, 350)
			} else {
				this.doBounceDown();
			}
		} else if (prevSlideCodes.includes(code)) {
			if (currentSlide > 0) {
				this.doSlide(-1, 350)
			} else {
				this.doBounceUp();
			}
		}
	}

	doBounceDown() {
		const lastSlide = this.data.slides[this.data.slides.length - 1];
		lastSlide.style.transform = `translateY(-5%)`;
		this.data.timeoutId = setTimeout(() => {
			lastSlide.style.transform = null;
		}, 100);
	}
	doBounceUp() {
		const firstSlide = this.data.slides[0];
		firstSlide.style.transform = `translateY(5%)`;
		this.data.timeoutId = setTimeout(() => {
			firstSlide.style.transform = null;
		}, 100);
	}
	onWheel(event) {
		const { wheelDeltaY, wheelDeltaX, wheelDelta } = event;
		console.log('wheel fired')
		// if (wheelDeltaY < 0) {
		// 	this.scrollDown(wheelDeltaY)
		// } else {
		// 	this.scrollUp(wheelDeltaY)
		// }
		this.scroll(wheelDeltaY)
	}
	scroll(delta) {
		const { currentSlide, slides, lastTimeScroll } = this.data;
		console.warn(delta)
		if (Math.abs(delta) > 0) {
			if (currentSlide > 0 && delta < 0) {
				console.log('%cscrollUp', 'background: yellow')
				this.doSlide(-1)
			} else {
				this.doBounceUp()
			}
			if(currentSlide < slides.length -1 && delta > 0) {
				console.log('%cscrollDown', 'background: lime');
				this.doSlide(1);
			} else {
				this.doBounceDown()
			}
		}
	}
	setSucceedScrolltime() {
		this.lastSuccessScrollTime = new Date().getTime()
	}
	setAttemptToScrollTime() {
		this.lastAttemptToScrollTime = new Date().getTime();
	}
	isAllowedToScroll(delay = 700) {
		return this.lastAttemptToScrollTime - this.lastSuccessScrollTime > delay
	}
	changeCurrentSlideBy(delta) {
		this.data.currentSlide += delta;
		this.setSucceedScrolltime();
	}
	doSlide(delta) {
		const { data } = this;
		const { slides, node, currentSlide, lastSuccessScrollTime } = data;
		this.setAttemptToScrollTime();
		if (this.isAllowedToScroll()) {
			this.changeCurrentSlideBy(delta);
			console.log('scroll after', TIME_SINCE_LAST_SCROLL)
			this.printDebug();
			const translateY = 100*(data.currentSlide)/this.data.slides.length;
			console.log(data.currentSlide, slides.length)
			node.style.transform = `translateY(-${translateY}%)`
		} else {
			console.log('too early for sliding')
		}
	}
	printDebug() {
		document.getElementById('test').innerHTML = JSON.stringify(this.data).split('},"').join('},\n"')
	}
}
