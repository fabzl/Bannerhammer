// Setup banner namespace
window.creative = window.creative || {};

//console.log("src/lib/initial.js:: creative = ", window.creative);

require("./lazyLoad");

creative.adCompleted = false;

// Checks if Enabler is loaded
creative.init = function () {
	creative.setupDOMElements();

	if (Enabler.isInitialized()) {
		creative.enablerInitHandler();
	} else {
		Enabler.addEventListener(studio.events.StudioEvent.INIT, creative.enablerInitHandler);
	}
};
/**
 * enablerInitHandler
 * Checks if page is loaded, or waits for it to load, then inits pageLoadHandler()
 */
creative.enablerInitHandler = function (event) {

	if ( creative.dynamicDataAvailable ) { 
		creative.dynamicDataAvailable();
	}
		creative.domEl.tapArea.addEventListener('click', creative.exitClickHandler);
	// Check if page is loaded
	if (Enabler.isPageLoaded()) {
		creative.pageLoadHandler();
	} else {
		Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, creative.pageLoadHandler);
	}
};

// Once page has loaded, init the ad
creative.pageLoadHandler = function (event) {
	creative.loadPolite();
};

creative.isAndroidNativeBrowser = (function () {
	var ua = navigator.userAgent.toLowerCase();
	return ua.indexOf('android') != -1 && ua.indexOf('mobile') != -1 && ua.indexOf('chrome') == -1;
	})();

var firstElementLoaded = false;

// Load polite CSS and JS
creative.loadPolite = function () {

	if (creative.isAndroidNativeBrowser === true) {

		LazyLoad.js("polite.js");
		LazyLoad.css("polite.css");

	// FORCES ANDROID ONLY FONT SMOOTHING
		document.querySelector('.banner').classList.add("is-android");

		addAuxiliaryLoader();
	}else{
		LazyLoad.js("polite.js",creative.onJSLoaded);
	}
};

creative.onJSLoaded = function () {

	LazyLoad.css("polite.css",creative.onCSSLoaded);
};

creative.onCSSLoaded = function () {

		creative.showAd();
};

function addAuxiliaryLoader() {

	creative.auxiliaryLoader = setInterval(doPoll, 100);

};

function removeAuxiliaryLoader() {

	window.clearInterval(creative.auxiliaryLoader);

};


function doPoll() {

		if(document.styleSheets.length > 1) {
			removeAuxiliaryLoader();
			creative.showAd();
		}
};

creative.showAd = function() {

	// Show banner content
	document.querySelector('.banner-content').className = "banner-content";
	// Hide loader
	document.querySelector('.loader').className = "loader is-hidden";

	creative.startBannerAnimation();
};

/**
 * Add days to today
 * Used in the creative.exitClickCreate() method
 * format as 20140730
 */
creative.addDays = function(theDate, days) {
	var newDate =  new Date(theDate.getTime() + days*24*60*60*1000);
	return newDate.getFullYear() + ('0' + (newDate.getMonth()+1)).slice(-2) + ('0' + newDate.getDate()).slice(-2);
};

/**
 * Exit click handler
 * This creates the Exit link. If there are {out} or {rtn} flags then we know its a dynamic exit.
 * &out=20140731&rtn=20140820
 */
creative.exitClickCreate = function() {
	console.log("exitClickCreate fired");
	return creative.dynamicData.exitURL.Url;

};

creative.exitClickHandler = function (event) {

	event.preventDefault();

	if (typeof creative.dynamicDataAvailable == 'function') {
		Enabler.exit("exit", creative.exitClickCreate());
		console.log('Exit:', creative.exitClickCreate());
	} else {
		Enabler.exit("exit", creative.domEl.cta.href);
		console.log('Exit:', creative.domEl.cta.href);
	}
	
};

/// helper functions 

// return true or false if the element got the class
creative.hasClass = function (element, className) {
    return element.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className);
};

// add a class to an element 
creative.addClass = function( classname, element ) {
    var cn = element.className;
    //test for existance
    if( cn.indexOf( classname ) != -1 ) {
        return;
    }
    //add a space if the element already has class
    if( cn != '' ) {
        classname = ' '+classname;
    }
    element.className = cn+classname;
};
// remove a class to an element 
creative.removeClass = function( classname, element ) {

    var cn = element.className;
    var rxp = new RegExp( "\\s?\\b"+classname+"\\b", "g" );
    cn = cn.replace( rxp, '' );
    element.className = cn;
    element.offsetWidth = element.offsetWidth;

};

// Start creative once all elements in window are loaded.
window.addEventListener('load', creative.init.bind(creative));