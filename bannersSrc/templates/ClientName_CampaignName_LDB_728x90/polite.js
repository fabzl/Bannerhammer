// This next line references a grunt task to include the file below
// so we concatenate these two files
include "../../lib/plugins.min.js"

var creative = window.creative || {};

//general settings variables

creative.timeOut = 15000;
creative.currentTime = 0;
creative.currentFrame = 0;
creative.totalFrames = 5;
creative.clock;
creative.adCompleted = false;

// starts everything
creative.startBannerAnimation = function  ()
{	
	//console.dir(creative.dynamicData);
    creative.createStaticFunctions();
 	creative.startClock();

};

// this object will trigger specific functions based on time in miliseconds.
creative.framesTrigger = {

	0: creative.displayFrame0,
	
	3000: creative.displayFrame1,
	3500: creative.hideFrame1,
	
	6000: creative.displayFrame2,
	6500: creative.hideFrame2,

	9000: creative.displayFrame3,
	9500: creative.hideFrame3,

	12000: creative.displayFrame4,
	12500: creative.hideFrame4,

	13000: creative.displayFrame5,

	15000: creative.bannerTimeOut
};


// all elements that will be present through out the entire banner. 
creative.createStaticFunctions = function () { 

};

// clock function 
creative.startClock = function () { 
	creative.clock  = setInterval(bannerTick, 100);
};

// tic tac 
function bannerTick () { 
	
	if ( creative.currentTime ==  creative.timeOut )  {
//		console.log("bannerTimeOut");
		clearInterval(creative.clock);
	}else{ 
		creative.triggerFrames(creative.currentTime);
		creative.currentTime += 100;
	}
}

// trigger puller
creative.triggerFrames = function (time) {

	var trigger = creative.framesTrigger[time];

	if (trigger != undefined) { 

		// if the right key is accessed the function will be triggered
		trigger = trigger();
	}
};

// procedural framing
creative.displayFrame0 = function () { 
		console.log("display frame 0");
};

creative.hideFrame0 = function () { 

	console.log("hide frame 0"); 
};

creative.displayFrame1 = function () { 
		console.log("display frame 1");
};

creative.hideFrame1 = function () { 

	console.log("hide frame 1"); 
};


creative.displayFrame2 = function () { 
		console.log("display frame 2");
};

creative.hideFrame2 = function () { 

	console.log("hide frame 2"); 
};

creative.displayFrame3 = function () { 
		console.log("display frame 3");
};

creative.hideFrame3 = function () { 

	console.log("hide frame 3"); 
};


creative.displayFrame4 = function () { 
		console.log("display frame 4");
};

creative.hideFrame4 = function () { 

	console.log("hide frame 4"); 
};


creative.displayFrame5 = function () { 
		console.log("display frame 5");
};

// triggered when time finish
creative.bannerTimeOut = function () {

	creative.adCompleted = true;
};


