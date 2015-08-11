![bannerhammermed](https://cloud.githubusercontent.com/assets/213993/8670507/b09bb79e-2a15-11e5-9204-fd1a2115f14c.jpg)


An HTML5 banner framework to cut down on mundane tasks and speed up your workflow.
__________________________________________________________________________________


Key Features
__________________________________________________________________________________


- Generate Doubleclick Polite loads banners campaigns quickly
- Dynamic Data Integration with DoubleClick
- Internal Clock and built in trigger for functions 
- Font face integration
- Simple animation engine


Install 
__________________________________________________________________________________

 - Make sure you hve node.js installed
 - Clone or Download the github REPO.
 - open Terminal, navigate to the folder.
 - run npm install (you might need sudo).
 - run Grunt Serve.
 - And Voilá.

Usage
__________________________________________________________________________________



 - Make sure you are working in the bannersSRC folder, in bannersDist are the files that go into doubleclick.
 - In the libs folder there is the initial JS and initial CSS, which are common for all the banners.
 - In the banners folder you will find the MPU master and the polite JS and polite SCSS which is specific for each banner.

Making new banners
__________________________________________________________________________________


- Just duplicate and rename the folder containing the banner files inside the banners folder, by default is  called : ClientName_CampaignName_MPU_300x250. 
- make sure that you include a default image for old browsers.  And upload to doubleclick.


Naming & resizing Scheme 
__________________________________________________________________________________

- In Order to quickly change your banner dimensions  you will need to go to your index html and simple change the name of the class banner--MPU, to one of the following.  

		-Double MPU		: banner--DMPU	: 300x600px
		-Leaderboard	: banner--LDB	: 728x90px
		-Skyscraper 	: banner--SKY	: 120x600px
		-Wide Skyscaper : banner--WSKY	: 160x600px 
		-Mobile 		: banner--MOB	: 300x50px
		-Wide Mobile 	: banner--WMOB	: 320x50px
		-Billboard 		: banner--BILL	: 970x250px

If the format you need is not created feel free to add your own modifying the file : /bannersSrc/lib/initial.scss


API  Bannerhammer
__________________________________________________________________________________

BannerHammer is quite minimalistic but it got some functionalities to make your life easier. 

JS Classes
__________________________________________________________________________________

	-	creative.hasClass(className, element) = returns true or false if the element contains the class  

	-	creative.addClass( classname, element ) = securely add the class to an element

	-	creative.removeClass( classname, element ) = securely remove a specific class to an element 

GLOBALS 
__________________________________________________________________________________


/bannersSrc_globalvars.scss, this file also control will control variables for your entire campaign. 
Controlling elements like font families &  colours, and animation timings.

CSS 
__________________________________________________________________________________


Bannerhammer it got built it helpers and animation classes, the timing of those classes is defined in the global var and by default are is it follows.

	$timingFadeIn  : .5s; 
	$timingFadeOut : .5s; 
	$timingStagger : .2s;


by default those values are defined as it follows :


	-	it-hasFadeIn  : fade in an element
	

	-	it-hasFadeInDelay  : fade in an element with delay based on the value $timingStagger
	

	-	it-hasFadeInDelayX2 : fade in an element with delay based on the value $timingStagger x 2 


	-	it-hasFadeInDelayX3 : fade in an element with delay based on the value $timingStagger x 3 


	-	it-hasFadeOut : fades out an element based on $timingFadeOut var 


Helpers
__________________________________________________________________________________



	-	is-hidden : make the element invisible 

	-	is-visible : make the element visible (block)

	-	is-inline-block:  make the element visible (inline-block)

	-	is-inline :  make the element visible (inline)



This classes are really basic but using in in syncronization with the add class and remove class methods they can sort out most of your animation needs.


Authors
__________________________________________________________________________________


Fabian Andrade Valencia
https://github.com/fabzl/

Ivan Hayes
https://github.com/munkychop/

Zander Martineau
https://github.com/mrmartineau/
  



