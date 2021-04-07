'use strict';
{

document.addEventListener('DOMContentLoaded', function() {

    //Loading(sessionStrage管理)

    const animationTime = 4000; //cssでのアニメーション時間
    const loading = document.getElementById('js-loading');
    const hero = document.getElementById('js-hero');

    if(hero !== null && loading !== null) {

        if (sessionStorage.getItem("nozomi-visited") ) {
            loading.style.display = "none";
            hero.classList.add('animation-start');
        } else {
            sessionStorage.setItem("nozomi-visited", 1);
            setTimeout(function(){
                hero.classList.add('animation-start');
            }, animationTime);
        }
    }

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
    /// 新薬情報　new表示
    //////////////////////////////////////////

    const tableThs = document.querySelectorAll('.table-news table th');
    //Array.from : polyfill使用
    const tableThsArr = Array.from(tableThs);

    tableThsArr.forEach(function(tableTh) {

        const today = new Date();
        const newsDate = new Date(tableTh.dataset.date);
        const differMilliseconds = today - newsDate;
        const differDays = differMilliseconds / (1000*60*60*24);

        //30日以内ならnew表示
         if(differDays <= 30) {
             insertNewTag(tableTh);
         }
    });
    
    function insertNewTag(el) {
        const span = document.createElement('span');
        span.textContent = 'new';
    
        span.style.backgroundColor = "#F6AA1C";
        span.style.color = "#fff";
        span.style.fontWeight = "normal";
        span.style.marginLeft = "10px";
        span.style.padding = "1px 5px 3px 5px";
        span.style.borderRadius = "3px";
        span.style.letterSpacing = "0.01em";
        span.style.fontSize = "14px";
        el.appendChild(span);
    }

    //////////////////////////////////////////
    /// title-text animation
    //////////////////////////////////////////

    const pageTitle = document.querySelector('.pagetitle');
    const titleText = document.querySelector('.title-text-inner');

    if(pageTitle && titleText) {
        setTimeout(function() {
            titleText.classList.add('start-animation');
        }, 750); 
    }

    /////////////////////////////////////////
    ////       to-top             ///////////
    /////////////////////////////////////////

    const toTop = document.getElementById('js-toTop');

    toTop.addEventListener('click', function (e) {

		let scrollTop = function () {

			const nowY = window.scrollY || window.pageYOffset;  //IEはscrollYが使えない
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
    const heaederHeight = 121; // headerの高さ

    function heroImageHeight() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const maxHeight = 750;
        let setHeight;
        if(windowWidth < 1025) {
            setHeight = Math.floor((windowWidth * 2) / 3);
        } else if (windowWidth > 1780) {
            setHeight = maxHeight;
        } else if(windowHeight - heaederHeight < maxHeight ){
            setHeight = windowHeight - heaederHeight;
        } else {
            setHeight = 650;
        }

        for(let i = 0; i < heroImgs.length; i++) {
            heroImgs[i].style.height = setHeight + 'px';
        }
    }

    if(heroImgs) {
        heroImageHeight();
        window.addEventListener('resize', heroImageHeight );
    }


    /////////////////////////////////////////////////////////////
    // Intersection Observer APIによる処理　　///////////////////
    ////////////////////////////////////////////////////////////

    const targets = document.querySelectorAll('.intersection-target');
    const targetsArr = Array.from(targets); 

    const cb = function(entries, observer) {
        entries.forEach(function(entry){
            if(entry.isIntersecting) {
                entry.target.classList.add('inview');
                observer.unobserve(entry.target);
            }
        });
    };

    const options = {
        root: null,
        rootMargin: "0px",
        thredshold: 0.3 
    };

    const io = new IntersectionObserver(cb, options);

    targetsArr.forEach(function(target) {
        io.observe(target);
    });

    // header とトップに戻るボタン
    const header = document.querySelector('header');
    const headerInner = document.querySelector('.container-header');
    
    const cb2 = function(entries, observer) {
        if(entries[0].isIntersecting) {
            headerInner.classList.remove('fixed');
            toTop.classList.remove('display-on');
        }else {
            headerInner.classList.add('fixed');
            toTop.classList.add('display-on');
        }
    };

    const options2 = {
        root: null,
        rootMargin: "500px 0px 0px 0px",  
        thredshold: 0 
    };
    
    const headerIo = new IntersectionObserver(cb2, options2);
    headerIo.observe(header);

    
});

//////////////////////////////////////////////////////////////////////////////////////
////////Polyfill of Intersection Observer API and Array.from function for IE /////////
//////////////////////////////////////////////////////////////////////////////////////

    loadPolyfills();

    // Polyfills for Intersection Observer and Array.from
    function loadPolyfills() {
        "use strict";

        const isIntersectionObserverSupported = "IntersectionObserver" in window;

        // Intersection Observer
        if (!isIntersectionObserverSupported) {
            IntersectionObserverPolyfill();
        };

        /// minified version of the Intersection Observer polyfill from: https://github.com/w3c/IntersectionObserver/tree/master/polyfill
        function IntersectionObserverPolyfill() {
            (function(h,f){function m(a){this.time=a.time;this.target=a.target;this.rootBounds=a.rootBounds;this.boundingClientRect=a.boundingClientRect;this.intersectionRect=a.intersectionRect||l();this.isIntersecting=!!a.intersectionRect;a=this.boundingClientRect;a=a.width*a.height;var b=this.intersectionRect;b=b.width*b.height;this.intersectionRatio=a?b/a:this.isIntersecting?1:0}function d(a,b){var c=b||{};if("function"!=typeof a)throw Error("callback must be a function");if(c.root&&1!=c.root.nodeType)throw Error("root must be an Element");this._checkForIntersections=u(this._checkForIntersections.bind(this),this.THROTTLE_TIMEOUT);this._callback=a;this._observationTargets=[];this._queuedEntries=[];this._rootMarginValues=this._parseRootMargin(c.rootMargin);this.thresholds=this._initThresholds(c.threshold);this.root=c.root||null;this.rootMargin=this._rootMarginValues.map(function(a){return a.value+a.unit}).join(" ")}function u(a,b){var c=null;return function(){c||(c=setTimeout(function(){a();c=null},b))}}function n(a,b,c,e){"function"==typeof a.addEventListener?a.addEventListener(b,c,e||!1):"function"==typeof a.attachEvent&&a.attachEvent("on"+b,c)}function r(a,b,c,e){"function"==typeof a.removeEventListener?a.removeEventListener(b,c,e||!1):"function"==typeof a.detatchEvent&&a.detatchEvent("on"+b,c)}function p(a){try{var b=a.getBoundingClientRect()}catch(c){}if(!b)return l();b.width&&b.height||(b={top:b.top,right:b.right,bottom:b.bottom,left:b.left,width:b.right-b.left,height:b.bottom-b.top});return b}function l(){return{top:0,bottom:0,left:0,right:0,width:0,height:0}}function t(a,b){for(var c=b;c;){if(c==a)return!0;c=q(c)}return!1}function q(a){return(a=a.parentNode)&&11==a.nodeType&&a.host?a.host:a}if("IntersectionObserver"in h&&"IntersectionObserverEntry"in h&&"intersectionRatio"in h.IntersectionObserverEntry.prototype)"isIntersecting"in h.IntersectionObserverEntry.prototype||Object.defineProperty(h.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return 0<this.intersectionRatio}});else{var k=[];d.prototype.THROTTLE_TIMEOUT=100;d.prototype.POLL_INTERVAL=null;d.prototype.USE_MUTATION_OBSERVER=!0;d.prototype.observe=function(a){if(!this._observationTargets.some(function(b){return b.element==a})){if(!a||1!=a.nodeType)throw Error("target must be an Element");this._registerInstance();this._observationTargets.push({element:a,entry:null});this._monitorIntersections();this._checkForIntersections()}};d.prototype.unobserve=function(a){this._observationTargets=this._observationTargets.filter(function(b){return b.element!=a});this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())};d.prototype.disconnect=function(){this._observationTargets=[];this._unmonitorIntersections();this._unregisterInstance()};d.prototype.takeRecords=function(){var a=this._queuedEntries.slice();this._queuedEntries=[];return a};d.prototype._initThresholds=function(a){a=a||[0];Array.isArray(a)||(a=[a]);return a.sort().filter(function(a,c,e){if("number"!=typeof a||isNaN(a)||0>a||1<a)throw Error("threshold must be a number between 0 and 1 inclusively");return a!==e[c-1]})};d.prototype._parseRootMargin=function(a){a=(a||"0px").split(/\s+/).map(function(a){a=/^(-?\d*\.?\d+)(px|%)$/.exec(a);if(!a)throw Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(a[1]),unit:a[2]}});a[1]=a[1]||a[0];a[2]=a[2]||a[0];a[3]=a[3]||a[1];return a};d.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(n(h,"resize",this._checkForIntersections,!0),n(f,"scroll",this._checkForIntersections,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in h&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(f,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))};d.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,r(h,"resize",this._checkForIntersections,!0),r(f,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))};d.prototype._checkForIntersections=function(){var a=this._rootIsInDom(),b=a?this._getRootRect():l();this._observationTargets.forEach(function(c){var e=c.element,d=p(e),g=this._rootContainsTarget(e),f=c.entry,k=a&&g&&this._computeTargetAndRootIntersection(e,b);c=c.entry=new m({time:h.performance&&performance.now&&performance.now(),target:e,boundingClientRect:d,rootBounds:b,intersectionRect:k});f?a&&g?this._hasCrossedThreshold(f,c)&&this._queuedEntries.push(c):f&&f.isIntersecting&&this._queuedEntries.push(c):this._queuedEntries.push(c)},this);this._queuedEntries.length&&this._callback(this.takeRecords(),this)};d.prototype._computeTargetAndRootIntersection=function(a,b){if("none"!=h.getComputedStyle(a).display){for(var c=p(a),e=q(a),d=!1;!d;){var g=null,k=1==e.nodeType?h.getComputedStyle(e):{};if("none"==k.display)return;e==this.root||e==f?(d=!0,g=b):e!=f.body&&e!=f.documentElement&&"visible"!=k.overflow&&(g=p(e));if(g){k=Math.max(g.top,c.top);var l=Math.min(g.bottom,c.bottom),m=Math.max(g.left,c.left);c=Math.min(g.right,c.right);g=c-m;var n=l-k;c=0<=g&&0<=n&&{top:k,bottom:l,left:m,right:c,width:g,height:n};if(!c)break}e=q(e)}return c}};d.prototype._getRootRect=function(){if(this.root)var a=p(this.root);else{a=f.documentElement;var b=f.body;a={top:0,left:0,right:a.clientWidth||b.clientWidth,width:a.clientWidth||b.clientWidth,bottom:a.clientHeight||b.clientHeight,height:a.clientHeight||b.clientHeight}}return this._expandRectByRootMargin(a)};d.prototype._expandRectByRootMargin=function(a){var b=this._rootMarginValues.map(function(b,d){return"px"==b.unit?b.value:b.value*(d%2?a.width:a.height)/100});b={top:a.top-b[0],right:a.right+b[1],bottom:a.bottom+b[2],left:a.left-b[3]};b.width=b.right-b.left;b.height=b.bottom-b.top;return b};d.prototype._hasCrossedThreshold=function(a,b){var c=a&&a.isIntersecting?a.intersectionRatio||0:-1,d=b.isIntersecting?b.intersectionRatio||0:-1;if(c!==d)for(var f=0;f<this.thresholds.length;f++){var g=this.thresholds[f];if(g==c||g==d||g<c!==g<d)return!0}};d.prototype._rootIsInDom=function(){return!this.root||t(f,this.root)};d.prototype._rootContainsTarget=function(a){return t(this.root||f,a)};d.prototype._registerInstance=function(){0>k.indexOf(this)&&k.push(this)};d.prototype._unregisterInstance=function(){var a=k.indexOf(this);-1!=a&&k.splice(a,1)};h.IntersectionObserver=d;h.IntersectionObserverEntry=m}})(window,document);
        };

        // Mini polyfill for Array.from without optional arguments (mapFunction [second argument], thisArg [third argument]) (https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
        if (typeof Array.from !== "function") {
            Array.from = function(arrLikeObj) {
                return Array.prototype.slice.call(arrLikeObj, 0);
            }
        };
    };
}
