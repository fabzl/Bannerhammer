(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
		creative.domEl.loader.addEventListener('click', creative.exitClickHandler);
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

	creative.smoothHideLoader();
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
			creative.smoothHideLoader();
		}
};


creative.showAd = function() {

	
	// Hide loader
	document.querySelector('.loader').className = "loader is-hidden";
	// start the creative
	creative.startBannerAnimation();
};

creative.smoothHideLoader = function () { 

	// Show banner content
	document.querySelector('.banner-content').className = "banner-content";
	document.querySelector('.loader').className = "loader is-smoothLoaderFading";

	setInterval(function(){ creative.showAd(); }, 500);
}
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
	//console.log("exitClickCreate fired");
	return creative.dynamicData.exitURL.Url;

};

creative.exitClickHandler = function (event) {

	event.preventDefault();
	Enabler.exit("clicktrough");
	
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
},{"./lazyLoad":2}],2:[function(require,module,exports){
LazyLoad = (function (doc) {

  var env,head,
  // Requests currently in progress, if any.
  pending = {},
  // Number of times we've polled to check whether a pending stylesheet has
  // finished loading. If this gets too high, we're probably stalled.
  pollCount = 0,
  // Queued requests.
  queue = {css: [], js: []},
  // Reference to the browser's list of stylesheets.
  styleSheets = doc.styleSheets;
  function createNode(name, attrs) {
    var node = doc.createElement(name), attr;

    for (attr in attrs) {
      if (attrs.hasOwnProperty(attr)) {
        node.setAttribute(attr, attrs[attr]);
      }
    }

    return node;
  }

  function finish(type) {
    var p = pending[type],
        callback,
        urls;

    if (p) {
      callback = p.callback;
      urls     = p.urls;

      urls.shift();
      pollCount = 0;

      // If this is the last of the pending URLs, execute the callback and
      // start the next request in the queue (if any).
      if (!urls.length) {
        callback && callback.call(p.context, p.obj);
        pending[type] = null;
        queue[type].length && load(type);
      }
    }
  }

  /**
  Populates the <code>env</code> variable with user agent and feature test
  information.

  @method getEnv
  @private
  */
  function getEnv() {
    var ua = navigator.userAgent;

    env = {
      // True if this browser supports disabling async mode on dynamically
      // created script nodes. See
      // http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
      async: doc.createElement('script').async === true
    };

    (env.webkit = /AppleWebKit\//.test(ua))
      || (env.ie = /MSIE|Trident/.test(ua))
      || (env.opera = /Opera/.test(ua))
      || (env.gecko = /Gecko\//.test(ua))
      || (env.unknown = true);
  }

  function load(type, urls, callback, obj, context) {
    var _finish = function () { finish(type); },
        isCSS   = type === 'css',
        nodes   = [],
        i, len, node, p, pendingUrls, url;

    env || getEnv();

    if (urls) {
      // If urls is a string, wrap it in an array. Otherwise assume it's an
      // array and create a copy of it so modifications won't be made to the
      // original.
      urls = typeof urls === 'string' ? [urls] : urls.concat();


      if (isCSS || env.async || env.gecko || env.opera) {
        // Load in parallel.
        queue[type].push({
          urls    : urls,
          callback: callback,
          obj     : obj,
          context : context
        });
      } else {
        // Load sequentially.
        for (i = 0, len = urls.length; i < len; ++i) {
          queue[type].push({
            urls    : [urls[i]],
            callback: i === len - 1 ? callback : null, // callback is only added to the last URL
            obj     : obj,
            context : context
          });
        }
      }
    }

    // If a previous load request of this type is currently in progress, we'll
    // wait our turn. Otherwise, grab the next item in the queue.
    if (pending[type] || !(p = pending[type] = queue[type].shift())) {
      return;
    }

    head || (head = doc.head || doc.getElementsByTagName('head')[0]);
    pendingUrls = p.urls.concat();

    for (i = 0, len = pendingUrls.length; i < len; ++i) {
      url = pendingUrls[i];

      if (isCSS) {
          node = env.gecko ? createNode('style') : createNode('link', {
            href: url,
            rel : 'stylesheet'
          });
      } else {
        node = createNode('script', {src: url});
        node.async = false;
      }

      node.className = 'lazyload';
      node.setAttribute('charset', 'utf-8');

      if (env.ie && !isCSS && 'onreadystatechange' in node && !('draggable' in node)) {
        node.onreadystatechange = function () {
          if (/loaded|complete/.test(node.readyState)) {
            node.onreadystatechange = null;
            _finish();
          }
        };
      } else if (isCSS && (env.gecko || env.webkit)) {
        // Gecko and WebKit don't support the onload event on link nodes.
        if (env.webkit) {
          // In WebKit, we can poll for changes to document.styleSheets to
          // figure out when stylesheets have loaded.
          p.urls[i] = node.href; // resolve relative URLs (or polling won't work)
          pollWebKit();
        } else {
          // In Gecko, we can import the requested URL into a <style> node and
          // poll for the existence of node.sheet.cssRules. Props to Zach
          // Leatherman for calling my attention to this technique.
          node.innerHTML = '@import "' + url + '";';
          pollGecko(node);
        }
      } else {
        node.onload = node.onerror = _finish;
      }

      nodes.push(node);
    }

    for (i = 0, len = nodes.length; i < len; ++i) {
      head.appendChild(nodes[i]);
    }
  }

  function pollGecko(node) {
    var hasRules;

    try {
      // We don't really need to store this value or ever refer to it again, but
      // if we don't store it, Closure Compiler assumes the code is useless and
      // removes it.
      hasRules = !!node.sheet.cssRules;
    } catch (ex) {
      // An exception means the stylesheet is still loading.
      pollCount += 1;

      if (pollCount < 200) {
        setTimeout(function () { pollGecko(node); }, 50);
      } else {
        // We've been polling for 10 seconds and nothing's happened. Stop
        // polling and finish the pending requests to avoid blocking further
        // requests.
        hasRules && finish('css');
      }

      return;
    }

    // If we get here, the stylesheet has loaded.
    finish('css');
  }

  /**
  Begins polling to determine when pending stylesheets have finished loading
  in WebKit. Polling stops when all pending stylesheets have loaded or after 10
  seconds (to prevent stalls).

  @method pollWebKit
  @private
  */
  function pollWebKit() {
    var css = pending.css, i;

    if (css) {
      i = styleSheets.length;

      // Look for a stylesheet matching the pending URL.
      while (--i >= 0) {
        if (styleSheets[i].href === css.urls[0]) {
          finish('css');
          break;
        }
      }

      pollCount += 1;

      if (css) {
        if (pollCount < 200) {
          setTimeout(pollWebKit, 50);
        } else {
          finish('css');
        }
      }
    }
  }

  return {

    css: function (urls, callback, obj, context) {
      load('css', urls, callback, obj, context);
    },
    js: function (urls, callback, obj, context) {
      load('js', urls, callback, obj, context);
    }

  };
})(window.document);//(window.document);


module.exports = LazyLoad;


},{}]},{},[1]);
