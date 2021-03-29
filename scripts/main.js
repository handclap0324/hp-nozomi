'use strict';
{

document.addEventListener('DOMContentLoaded', function() {

    //toggle menu
    const toggle = document.getElementById('js-toggle');
    toggle.addEventListener('click', function() {
        const nav = document.getElementById('js-nav');
        let menuText = document.getElementById('js-menuText');
        
        toggle.classList.toggle('navOpen');
        nav.classList.toggle('navOpen');

        if(nav.classList.contains('navOpen')) {
            menuText.textContent = 'close';
        } else {
            menuText.textContent = 'menu';
        }
    });


    //フォントサイズ変更
    const fontSizebutton = document.querySelectorAll('.font-size-button');
    const sessionValue = sessionStorage.getItem('fontSize');

    if(sessionValue === "拡大" ) {
        const fontSize = fontSizebutton[1].dataset.fontsize;
        document.querySelector('html').style.fontSize = fontSize + 'px';

        toggleClass(fontSizebutton, 'active');
    }

    for(let i = 0; i < fontSizebutton.length; i++) {
        fontSizebutton[i].addEventListener('click', function() {
            const fontSize = this.dataset.fontsize;
            const textContent = this.textContent;
            document.querySelector('html').style.fontSize = fontSize + 'px';
            sessionStorage.setItem('fontSize', textContent);

            if(!this.classList.contains('active')) {
                toggleClass(fontSizebutton, 'active');
            }
        });
    }

    function toggleClass(array, className) {
        for(let i = 0; i < array.length; i++) {
            array[i].classList.toggle(className);
        }
    }


    //////////////////////////////////////////
    /// title-text animation
    //////////////////////////////////////////

    const titleText = document.querySelector('.title-text-inner');
    
    window.addEventListener('load', function() {

        if(titleText) {
            titleText.classList.add('start-animation');
        }
    })

    /////////////////////////////////////////
    ////       to-top             ///////////
    /////////////////////////////////////////

    const toTop = document.getElementById('js-toTop');
    
    document.addEventListener('scroll', function() {

        const scrollValue = window.scrollY || window.pageYOffset; //IEはscrollYが使えない

        if(scrollValue > 500) {
            toTop.classList.add('display-on');
        } else {
            toTop.classList.remove('display-on');
        }
    });

    toTop.addEventListener('click', function (e) {

		let scrollTop = function () {

			const nowY = window.scrollY || window.pageYOffset; 
			window.scrollTo(0, Math.floor(nowY * 0.8)); // liner風なら、window.scrollTo(0, nowY - 100);

			let timer = window.setTimeout(scrollTop, 20);

			if (nowY === 0) {
				clearTimeout(timer);
			}
		}

		scrollTop();
		e.preventDefault();

	}, false);


    //copyright 今年の年を取得
    const thisYear = document.getElementById('js-thisyear');
    thisYear.textContent = new Date().getFullYear();


    /////////////////////////////////////////////
    //  Object-fit Polyfill   ///////////////////
    /////////////////////////////////////////////

    const body = document.body;
    //topページのみ適用
    if(body.classList.contains('home')) {
        objectFitImages('.ofi-img');
    }



    ////////////////////////////////////////////
    //  Heroイメージ
    ///////////////////////////////////////////

    const heroImgs = document.querySelectorAll('.ofi-img');

    function heroImageHeight() {
        const windowWidth = window.innerWidth;
        let setHeight;
        if(windowWidth < 960) {
            setHeight = Math.floor((windowWidth * 2) / 3);
        } else {
            setHeight = 650;
        }

        for(let i = 0; i < heroImgs.length; i++) {
            heroImgs[i].style.height = setHeight + 'px';
        }
    }

    window.addEventListener('load', heroImageHeight );
    window.addEventListener('resize', heroImageHeight );
    
    
    


});











}

/////////////////////////////////////////////////////////////////////////////////////////////

// document.addEventListener('DOMContentLoaded', function () {
//     const main = new Main();
// });

// class Main {
//     constructor() {
//         this.header = document.querySelector('.header');
//         this.sides = document.querySelectorAll('.side');
//         this._observers = [];
//         this._init();
//     }

//     set observers(val) {
//         this._observers.push(val);
//     }

//     get observers() {
//         return this._observers;
//     }

//     _init() {
//         new MobileMenu();
//         this.hero = new HeroSlider('.swiper-container');
//         Pace.on('done', this._paceDone.bind(this));
//     }

//     _paceDone() {
//         this._scrollInit();
//     }

//     _inviewAnimation(el, inview) {
//         if(inview) {
//             el.classList.add('inview');
//         }else {
//             el.classList.remove('inview');
//         }
//     }

//     _navAnimation(el, inview) {
//         if(inview) {
//             this.header.classList.remove('triggered');
//         } else {
//             this.header.classList.add('triggered');
//         }
//     }

//     _sideAnimation(el, inview) {
//         if(inview) {
//             this.sides.forEach(side => side.classList.add('inview'));
//         } else {
//             this.sides.forEach(side => side.classList.remove('inview'));
//         }
//     }

//     _textAnimation(el, inview) {
//         if(inview) {
//             const ta = new TweenTextAnimation(el);
//             ta.animate();
//         }
//     }

//     _toggleSlideAnimation(el, inview) {
//         if(inview) {
//             this.hero.start();
//         } else {
//             this.hero.stop();
//         }
//     }

//     _destroyObservers() {
//         this.observers.forEach(ob => {
//             ob.destroy();
//         });
//     }

//     destroy() {
//         this._destroyObservers();
//     }

//     _scrollInit() {
//         this.observers = new ScrollObserver('.nav-trigger', this._navAnimation.bind(this), {once: false});
//         this.observers = new ScrollObserver('.cover-slide', this._inviewAnimation);
//         this.observers = new ScrollObserver('.appear', this._inviewAnimation);
//         this.observers = new ScrollObserver('.tween-animate-title', this._textAnimation, {rootMargin: "-200px 0px"});
//         this.observers = new ScrollObserver('.swiper-container', this._toggleSlideAnimation.bind(this), {once: false});
//         this.observers = new ScrollObserver('#main-content', this._sideAnimation.bind(this), {once: false, rootMargin: "-300px 0px"});
//     }
// }

