!function(e){var t={};function n(o){if(t[o])return t[o].exports;var l=t[o]={i:o,l:!1,exports:{}};return e[o].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s="./src/index.js")}({"./node_modules/debounce/index.js":function(e,t){e.exports=function(e,t,n){var o,l,i,r,s;function u(){var a=Date.now()-r;a<t&&a>=0?o=setTimeout(u,t-a):(o=null,n||(s=e.apply(i,l),i=l=null))}null==t&&(t=100);var a=function(){i=this,l=arguments,r=Date.now();var a=n&&!o;return o||(o=setTimeout(u,t)),a&&(s=e.apply(i,l),i=l=null),s};return a.clear=function(){o&&(clearTimeout(o),o=null)},a.flush=function(){o&&(s=e.apply(i,l),i=l=null,clearTimeout(o),o=null)},a}},"./src/forEachNode.js":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){for(var o=0;o<e.length;o++)t.call(n,e[o],o,e)}},"./src/index.js":function(e,t,n){"use strict";var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=r(n("./node_modules/debounce/index.js")),i=r(n("./src/forEachNode.js"));function r(e){return e&&e.__esModule?e:{default:e}}console.log("Welcome to console!"),document.addEventListener("DOMContentLoaded",function(e){var t=document.getElementsByClassName("slider-list");(0,i.default)(t,function(e){new s(e).init()})});var s=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.data={node:t,timeoutId:null,lastSuccessScrollTime:(new Date).getTime()};for(var n=8;n<10;n++){var o=t.children[0].cloneNode();o.innerHTML=n,o.style.backgroundColor="hsl("+20*n+", 50%, 50%)",t.appendChild(o)}this.onWheel=this.onWheel.bind(this),this.onKeydown=this.onKeydown.bind(this)}return o(e,[{key:"init",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.data.node;this.data.slides=e.children,this.data.currentSlide=0,e.onwheel=(0,l.default)(this.onWheel,20),document.onkeydown=this.onKeydown,this.printDebug()}},{key:"onKeydown",value:function(e){var t=this.data,n=t.currentSlide,o=t.slides,l=e.code;["ArrowDown","ArrowRight","Numpad2","Numpad6"].includes(l)?n<o.length-1?this.doSlide(1,350):this.doBounceDown():["ArrowUp","ArrowLeft","Numpad8","Numpad4"].includes(l)&&(n>0?this.doSlide(-1,350):this.doBounceUp())}},{key:"doBounceDown",value:function(){var e=this.data.slides[this.data.slides.length-1];e.style.transform="translateY(-5%)",this.data.timeoutId=setTimeout(function(){e.style.transform=null},100)}},{key:"doBounceUp",value:function(){var e=this.data.slides[0];e.style.transform="translateY(5%)",this.data.timeoutId=setTimeout(function(){e.style.transform=null},100)}},{key:"onWheel",value:function(e){var t=e.wheelDeltaY;e.wheelDeltaX,e.wheelDelta,console.log("wheel fired"),this.scroll(t)}},{key:"scroll",value:function(e){var t=this.data,n=t.currentSlide,o=t.slides;t.lastTimeScroll,console.warn(e),Math.abs(e)>0&&(n>0&&e<0?(console.log("%cscrollUp","background: yellow"),this.doSlide(-1)):this.doBounceUp(),n<o.length-1&&e>0?(console.log("%cscrollDown","background: lime"),this.doSlide(1)):this.doBounceDown())}},{key:"setSucceedScrolltime",value:function(){this.lastSuccessScrollTime=(new Date).getTime()}},{key:"setAttemptToScrollTime",value:function(){this.lastAttemptToScrollTime=(new Date).getTime()}},{key:"isAllowedToScroll",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:700;return this.lastAttemptToScrollTime-this.lastSuccessScrollTime>e}},{key:"changeCurrentSlideBy",value:function(e){this.data.currentSlide+=e,this.setSucceedScrolltime()}},{key:"doSlide",value:function(e){var t=this.data,n=t.slides,o=t.node;if(t.currentSlide,t.lastSuccessScrollTime,this.setAttemptToScrollTime(),this.isAllowedToScroll()){this.changeCurrentSlideBy(e),console.log("scroll after",TIME_SINCE_LAST_SCROLL),this.printDebug();var l=100*t.currentSlide/this.data.slides.length;console.log(t.currentSlide,n.length),o.style.transform="translateY(-"+l+"%)"}else console.log("too early for sliding")}},{key:"printDebug",value:function(){document.getElementById("test").innerHTML=JSON.stringify(this.data).split('},"').join('},\n"')}}]),e}()}});