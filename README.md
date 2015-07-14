![bannerhammermed](https://cloud.githubusercontent.com/assets/213993/8670507/b09bb79e-2a15-11e5-9204-fd1a2115f14c.jpg)



An HTML5 banner framework to cut down on mundane tasks and speed up your workflow.
__________________________________________________________________________________
Key Features

- Generate Doubleclick Polite loads banners campaigns quickly
- Dynamic Data Integration with DoubleClick
- Internal Clock and built in trigger for functions 
- Font face integration
- Simple animation engine


Install 

 - Clone or Download the github REPO.
 - open Terminal, navigate to the folder.
 - run npm install (you might need sudo).
 - run Grunt Serve.
 - And Voilá.

 Usage
 - Make sure you are working in the bannersSRC folder, in bannersDist are the files that go into doubleclick.
 - In the libs folder there is the initial JS and initial CSS, which are common for all the banners.
 - In the banners folder you will find the MPU master and the polite JS and polite SCSS which is specific for each banner.

 Making new banners

- Just duplicate and rename the folder containing the banner files inside the banners folder, by default is  called : ClientName_CampaignName_MPU_300x250. 
- make sure that you include a default image for old browsers.  And upload to doubleclick.







