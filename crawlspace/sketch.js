var photo,currentScreen;
var segScl = 50;
var hSegArray = [];
var hSegPosArray = [];
var vSegArray = [];
var vSegPosArray = [];
var whichGlitch = 4;
var prevGlitch;
var timer = 0;
var interval = 5000;
var chromAb,displacementV,displacementH,duplicaiton;
var btnCol1,btnCol2,btnCol3,bgCol,barCol1,barCol2,bgDot1,bgDot2,winShadow;
var message;
var font;


/*function preload(){
  font = loadFont("https://cdn.glitch.global/0f8a22d7-3705-4e26-8cde-22f2630498e7/Courier%20New.ttf?v=1747645123348");
}*/

function setup() {
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
  pixelDensity(1);
  Wallpaper();
  
  currentScreen = createImage(width,height);
  currentScreen = get();
  currentScreen.loadPixels();
  
  chromAb = new ChromAb(2);
  displacementV = new DisplacementV(20,2);
  displacementH = new DisplacementH(20,2);
  duplicaiton = new Duplication();
  message = new Message();
  
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
  chromAb.MakeColourChannels();
  displacementV.MakeSegments();
  displacementH.MakeSegments();
  duplicaiton.MakeDuplication();
  message.GenerateMessage();
}