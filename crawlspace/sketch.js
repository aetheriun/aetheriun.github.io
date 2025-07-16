var currentScreen; // variable to hold the current image being used 
var segScl = 50; // variable for the pixel scale used in the band displacement effect
// variious variables that are arrays used in the glitch effects
var hSegArray = []; 
var hSegPosArray = [];
var vSegArray = [];
var vSegPosArray = [];
var whichGlitch = 4; // variable to decide the currently active glitch effect. starts as an unued variable to delay the glitches starting 
var prevGlitch; // varaible which holds the previous glitch effect, to help avoid repeats
var timer = 0; // variable to track how long the sketch has been active
var interval = 5000; // variable to 
var chromAb,displacementV,displacementH,duplicaiton; // variables used to hold each glitch effect object
var btnCol1,btnCol2,btnCol3,bgCol,barCol1,barCol2,bgDot1,bgDot2,winShadow; // variables used to store colours used in the background and messagebox
var message,messageWidth; // variables to store the current message popup, and the max width of the message
var sketchScl; // variable used to define the size of the backgorund and message boxes / changes dynamically depending on screensize.

function setup() {
  // sets the colors used for the backgorund image and message pop-ups
  btnCol1 = color(255, 102, 102);
  btnCol2 = color(255, 255, 102);
  btnCol3 = color(102, 255, 102);
  bgCol = color(65, 65, 65);
  barCol1 = color(82, 255, 166);
  barCol2 = color(102, 166, 255);
  bgDot1 = color(255, 179, 102);
  bgDot2 = color(255, 255, 102);
  winShadow = color(255, 0, 0);
  
  noStroke();
  createCanvas(windowWidth,windowHeight);
  // checks if the width is larger than the height, and uses the larger value to define the sketchScl
  if (width >= height){
  sketchScl = width/140; 
  } else {
    sketchScl = height/120;
  }
  pixelDensity(1); // if I don't set this explicitly the glitch effects go craxy on retina screens

  //draws the initial background image used for the sketch
  Wallpaper(sketchScl);
  
  //saves the current canvas as an image to use for the glitch effects
  currentScreen = createImage(width,height);
  currentScreen = get();
  currentScreen.loadPixels();
  
  // creates an object for each glitch effect, and the initial message popup
  chromAb = new ChromAb(2);
  displacementV = new DisplacementV(20,2);
  displacementH = new DisplacementH(20,2);
  duplicaiton = new Duplication();
  message = new Message(sketchScl);
  
  //initialises the glitch effects and the message popup
  chromAb.MakeColourChannels();
  displacementV.MakeSegments();
  displacementH.MakeSegments();
  duplicaiton.MakeDuplication();
  message.GenerateMessage();
  
}

function draw() {
  
  // executes one glitch effect at a time
  switch (whichGlitch) {
    case 0:
      chromAb.MoveColourChannels();
      break;
    case 1:
      displacementV.DrawSegments();
      break;
    case 2:
      displacementH.DrawSegments();
      break;
    case 3:
      duplicaiton.DrawDuplicate();
      break;
    default:
      break;
  }
  
  message.DisplayMessage();
  
  // checks the amount of time the sketch has been running; if it hits the timer, save a new frame to use as the base and pick a different glich effect to use
  if (millis() - timer >= interval) {
    SetBaseImage();
    prevGlitch = whichGlitch;
    whichGlitch = int(random(0, 4));
    if (whichGlitch == prevGlitch){
      whichGlitch = int(random(0, 4));
    }
    timer = millis();
  }
}

// Sets the current canvas to be the image used as the base for the glitch effects
function SetBaseImage() {
  currentScreen = createImage(width, height);
  currentScreen = get();
  currentScreen.loadPixels();
  //resets the glitch effects using the new base image
  chromAb.MakeColourChannels();
  displacementV.MakeSegments();
  displacementH.MakeSegments();
  duplicaiton.MakeDuplication();
  //generates a new message popup
  message.GenerateMessage();
}