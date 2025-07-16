function Message(scl) {
    this.scl = scl;
    this.grammar = tracery.createGrammar(source);
    this.prev = "";
    this.message = "";
    this.pos = createVector(0, 0);
    //this.font = font;
    this.fontSize = this.scl * 2;
    messageWidth = this.scl * 32;
  
    this.GenerateMessage = function () {
      textFont("Courier Prime");
      textSize(this.fontSize);
      textAlign(CENTER);
  
      this.message = this.grammar.flatten("#origin#");
      if (this.message == this.prev) {
        this.message = this.grammar.flatten("#origin#");
      }
      this.prev = this.message;
  
      this.pos = createVector(
        random(this.scl * 5, width - messageWidth),
        random(this.scl * 15,height - messageWidth)
      );
    };
  
    this.DisplayMessage = function () {
      //Shadow
      fill(winShadow);
      rect(this.pos.x+this.scl,this.pos.y-(this.scl * 4),this.scl * 30,this.scl * 14,this.scl);
      
      //Toolbar
      strokeWeight(5);
      stroke(barCol2);
      fill(barCol2);
      rect(this.pos.x,this.pos.y-(this.scl * 5),this.scl * 30,this.scl * 2.5,this.scl,this.scl,0,0);
      noStroke();
      
      //Buttons
      fill(btnCol1);
      rect(this.pos.x+ (this.scl/2),this.pos.y-(this.scl * 4.5),this.scl * 1.5,this.scl *1.5,this.scl/2);
      fill(btnCol2);
      rect(this.pos.x+(this.scl * 2.5),this.pos.y-(this.scl * 4.5),this.scl *1.5,this.scl * 1.5,this.scl/2);
      fill(btnCol3);
      rect(this.pos.x+(this.scl * 4.5),this.pos.y-(this.scl * 4.5),this.scl * 1.5,this.scl * 1.5,this.scl/2);
      
      //Window
      strokeWeight(5);
      stroke(barCol2);
      fill(255);
      rect(this.pos.x,this.pos.y-(this.scl * 2.5),this.scl * 30,this.scl * 11.5,0,0,this.scl/2,this.scl/2);
      noStroke();
      
      //Text
      fill(0);
      text(this.message, this.pos.x, this.pos.y, this.scl * 30, this.scl * 10);
    };
  }
  
  function Wallpaper(scl) {
    ellipseMode(CENTER);
    let gridScl = 30;
    let drawScl = scl;
    background(bgCol);
    for (var y = -gridScl/4; y < height + gridScl; y += gridScl) {
      for (var x = -gridScl/4; x < width + gridScl; x += gridScl) {
        let fillCol = lerpColor(bgDot1,bgDot2,random(0,1));
        fill(fillCol);
        ellipse(x + gridScl / 2, y + gridScl / 2, gridScl / 3, gridScl / 3);
      }
    }
    fill(barCol2);
    rect(0, height - drawScl * 3.5, width, drawScl * 3.5);
    fill(barCol1);
    rect(0, height - drawScl * 3.5, width / 6, drawScl * 3.5);
    fill(52, 102,255);
    rect(width-(drawScl * 2.75),height-(drawScl * 2.75),drawScl * 2,drawScl * 2);
    rect(width-(drawScl * 5.75),height-(drawScl * 2.75),drawScl * 2,drawScl * 2);
    rect(width-(drawScl * 8.75),height-(drawScl * 2.75),drawScl * 2,drawScl * 2);
    ellipseMode(CORNER);
  }