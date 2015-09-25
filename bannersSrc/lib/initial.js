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

	setTimeout(function(){ creative.showAd(); }, 500);
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
creative.hasClass = function ( className, element) {
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


creative.spriteAnimator = function (container,rows,columns,frames,speed,looping) { 

  // grab the elements involved
  var spriteContainer = document.querySelector(container);
  var sprite = spriteContainer.querySelector('img');
  
  // make an object to store the values
  sprite.prop = {};
	// show the elements to read from them
  sprite.style.display = 'block'; 
  sprite.container = spriteContainer;
  sprite.prop.totalWidth  =  sprite.offsetWidth;
  sprite.prop.totalHeight  = sprite.offsetHeight;
  sprite.style.display= 'none';
   
  sprite.prop.totalColumns = columns;
  sprite.prop.totalRows = rows;
  sprite.prop.frameWidth = sprite.prop.totalWidth/columns;
  sprite.prop.frameHeight = sprite.prop.totalHeight/rows;
  sprite.prop.framesTotal = frames;
  sprite.prop.currentFrame = 0;
  sprite.prop.currentRows = 1;
  sprite.prop.currentColumns = 1;
  sprite.prop.totalLoop = looping;
  sprite.prop.currentLoop = 1;
  sprite.prop.spriteURL =  sprite.getAttribute('src');
  sprite.prop.speed = speed;
  sprite.prop.totalTime = frames*speed;
  // define the w and h of the container and bg image
  spriteContainer.style.backgroundImage = 'url(' + sprite.prop.spriteURL + ')'; 
  spriteContainer.style.width =  sprite.prop.frameWidth+'px';
  spriteContainer.style.height = sprite.prop.frameHeight+'px'; 
 
  creative.spriteAnimatorEngine(sprite);
};

creative.spriteAnimatorEngine = function (sprite) { 
  
	 sprite.prop.currentFrame = 0;
  // for loop for bg position   
	for( sprite.prop.currentFrame ; sprite.prop.currentFrame <= sprite.prop.framesTotal ; sprite.prop.currentFrame ++ ) {
	 
	  // to track the rows
	  if( sprite.prop.currentColumns == sprite.prop.totalColumns ) { 

		sprite.prop.currentRows ++ ;
		sprite.prop.currentColumns = 0;
	  }else { 
		  sprite.prop.currentColumns ++;
	  }

	   var bgX = sprite.prop.currentColumns * sprite.prop.frameWidth;
	   var bgY = sprite.prop.currentRows * sprite.prop.frameHeight;
	  (function (sprite,posX,posY,time,currentFrame) {     
				 setTimeout(function () {
				sprite.container.style.backgroundPosition = posX +"px " + posY+"px";
				if( currentFrame == sprite.prop.framesTotal ) { 

				  creative.restartSpriteAnimation(sprite);
				  
				}
			},time);
		  })(sprite,bgX,bgY,sprite.prop.speed*sprite.prop.currentFrame,sprite.prop.currentFrame);
	  }
}

creative.restartSpriteAnimation = function (sprite) {

	sprite.prop.currentFrame = 0;
	sprite.prop.currentRows = 1;
	sprite.prop.currentColumns = 1;
  
	 if( sprite.prop.totalLoop != 0 ) { 
		   if(sprite.prop.currentLoop < sprite.prop.totalLoop ) {
		 //if its counting the looping
			sprite.prop.currentLoop ++;        
			creative.spriteAnimatorEngine(sprite);
		  }       
	   }else { 
		 // if is looping forever
			creative.spriteAnimatorEngine(sprite);
	  }
}

// just get a container with an img inside and the function will do the rest : 
  //params :  
		  //  container : String : name of the class 
		  //  rows      : Number :  amount of rows,
		  //  columns   : Number : amount of columns,
		  //  frames    : Number : amount of frames or drawings
		  //  speed     : Number : Miliseconds via 
		  //  looping   : Number : number of loops were 0 is continous loop

//creative.spriteAnimator('.sprite-container',3,5,14,100,0);






// Start creative once all elements in window are loaded.
window.addEventListener('load', creative.init.bind(creative));