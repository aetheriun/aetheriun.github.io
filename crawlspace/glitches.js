// Class containing all of the variables / functions for the random displacing chromatic abberation effect
function ChromAb(moveScl) {
    //creates blank pImage objects to use as each colour channel for the effect
    this.channelR = createImage(width, height);
    this.channelG = createImage(width, height);
    this.channelB = createImage(width, height);
  
    // creates vectors to store the position of each colour channel for the displacement
    this.channelRPos = createVector(0, 0);
    this.channelGPos = createVector(0, 0);
    this.channelBPos = createVector(0, 0);
  
    //sets the amount the channels move by each frame
    this.moveScl = moveScl;
  
    // function for initializing the colour channels using the currentscreen p5.Image
    this.MakeColourChannels = function () {
      // makes a new p5.Image object from the currentscreen p5.Image using only the red colour values.
      this.channelR.loadPixels();
      for (let i = 0; i < this.channelR.pixels.length; i += 4) {
        this.channelR.pixels[i] = currentScreen.pixels[i];
        this.channelR.pixels[i + 1] = 0;
        this.channelR.pixels[i + 2] = 0;
        this.channelR.pixels[i + 3] = 255;
      }
      this.channelR.updatePixels();
  
      // makes a new p5.Image object from the currentscreen p5.Image using only the green colour values.
      this.channelG.loadPixels();
      for (let i = 0; i < this.channelG.pixels.length; i += 4) {
        this.channelG.pixels[i] = 0;
        this.channelG.pixels[i + 1] = currentScreen.pixels[i + 1];
        this.channelG.pixels[i + 2] = 0;
        this.channelG.pixels[i + 3] = 255;
      }
      this.channelG.updatePixels();
  
      // makes a new p5.Image object from the currentscreen p5.Image using only the blue colour values.
      this.channelB.loadPixels();
      for (let i = 0; i < this.channelB.pixels.length; i += 4) {
        this.channelB.pixels[i] = 0;
        this.channelB.pixels[i + 1] = 0;
        this.channelB.pixels[i + 2] = currentScreen.pixels[i + 2];
        this.channelB.pixels[i + 3] = 255;
      }
      this.channelB.updatePixels();
  
      // resets the position vectors that are used for the displacement
      this.channelRPos.set(0, 0);
      this.channelGPos.set(0, 0);
      this.channelBPos.set(0, 0);
    };
  
    // function for moving the colour channel pImages every frame
    this.MoveColourChannels = function () {
      background(0);
      // calculates the new position of each colour channel, moving them randomly by the moveScl amount
      this.channelRPos.add(
        int(random(-this.moveScl, this.moveScl)),
        int(random(-this.moveScl, this.moveScl))
      );
      this.channelGPos.add(
        int(random(-this.moveScl, this.moveScl)),
        int(random(-this.moveScl, this.moveScl))
      );
      this.channelBPos.add(
        int(random(-this.moveScl, this.moveScl)),
        int(random(-this.moveScl, this.moveScl))
      );
  
      // draws the colour channels to the canvas using blend modes so they overlay each other to create the effect
      blend(this.channelR,0, 0,width,height,this.channelRPos.x,this.channelRPos.y,width,height,LIGHTEST);
      blend(this.channelG,0,0,width,height,this.channelGPos.x,this.channelGPos.y,width,height,LIGHTEST);
      blend(this.channelB,0,0,width,height,this.channelBPos.x,this.channelBPos.y,width,height,LIGHTEST);
    };
  }
  
  // Class containing all of the variables / fuctions for the vertical band displacement effect
  function DisplacementV(bandScl,moveScl) {
    //creates an array for the band images and an array for the band positions, as well as setting the width and movement scales 
    this.bandArray = [];
    this.bandPosArray = [];
    this.bandScl = bandScl;
    this.moveScl = moveScl;
  
    this.MakeSegments = function () {
        // resets the image and position arrays as empty
      this.bandArray = [];
      this.bandPosArray = [];
      // sets the images for each band + their starting position
      for (let i = 0; i < width / this.bandScl; i++) {
        let bandImg = createImage(this.bandScl, height);
        bandImg = get(i * this.bandScl,0,i * this.bandScl + this.bandScl,height);
        this.bandArray.push(bandImg);
        this.bandPosArray.push(createVector(i * this.bandScl,0));
      }
    };
  
    this.DrawSegments = function () {
        // applies a movement to the position of each band in the array
      for (let i=0;i<this.bandPosArray.length;i++){
        this.bandPosArray[i].y += int(random(-this.moveScl,this.moveScl));
      }
        // draws each band to the screen at the current position
      for(let i=0;i<this.bandArray.length;i++){
        image(
          this.bandArray[i],
          this.bandPosArray[i].x,
          this.bandPosArray[i].y,
          i * this.bandScl + this.bandScl,
          height
        );
      }
    }
  }
  
  
  // Class containing all of the variables / fuctions for the Horizontal band displacement effect. works the same way as above.
  function DisplacementH(bandScl,moveScl) {
    this.bandArray = [];
    this.bandPosArray = [];
    this.bandScl = bandScl;
    this.moveScl = moveScl;
  
    this.MakeSegments = function () {
      this.bandArray = [];
      this.bandPosArray = [];
      for (let i = 0; i < height / this.bandScl; i++) {
        let bandImg = createImage(width,this.bandScl);
        bandImg = get(0,i * this.bandScl,width,i * this.bandScl + this.bandScl);
        this.bandArray.push(bandImg);
        this.bandPosArray.push(createVector(0,i * this.bandScl));
      }
    };
  
    this.DrawSegments = function () {
      for (let i=0;i<this.bandPosArray.length;i++){
        this.bandPosArray[i].x += int(random(-this.moveScl,this.moveScl));
      }
      
      for(let i=0;i<this.bandArray.length;i++){
        image(
          this.bandArray[i],
          this.bandPosArray[i].x,
          this.bandPosArray[i].y,
          width,
          i * this.bandScl + this.bandScl
        );
      }
    }
  }
  
  // Class for the direcitonal duplication // screenslide effect
  function Duplication(){
    //creates the image and variables for the duplication effect
    this.screen = createImage(width,height);
    this.posX = 0;
    this.posY = 0;
    this.dirX = 0;
    this.dirY = 0;
    
    this.MakeDuplication = function() {
    // sets the duplication image to the currentscreen
      this.screen = currentScreen;
      //resett the position varaible for the diplication effect
      this.posX = 0;
      this.posY = 0;
      // sets a random direction for the duplicaiton effect
      this.dirX = (random(-0.5,0.5));
      this.dirY = (random(-0.5,0.5));
    }
    
    this.DrawDuplicate = function() {
        //draws the duplicate image at the current position, then incriments the position by the direction variables
      image(this.screen,this.posX,this.posY);
      this.posX += this.dirX;
      this.posY += this.dirY;
    }
  }