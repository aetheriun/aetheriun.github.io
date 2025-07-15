function Message() {
    this.grammar = tracery.createGrammar(source);
    this.prev = "";
    this.message = "";
    this.pos = createVector(0, 0);
    //this.font = font;
    this.fontSize = 24;
  
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
        random(width / 6, (width/3) * 2),
        random(height / 6, (height / 3) * 2)
      );
    };
  
    this.DisplayMessage = function () {
      //Shadow
      fill(winShadow);
      rect(this.pos.x+10,this.pos.y-40,300,140,10);
      
      //Toolbar
      fill(barCol2);
      rect(this.pos.x,this.pos.y-50,300,25,10,10,0,0);
      
      //Buttons
      fill(btnCol1);
      rect(this.pos.x+5,this.pos.y-45,15,15,5);
      fill(btnCol2);
      rect(this.pos.x+25,this.pos.y-45,15,15,5);
      fill(btnCol3);
      rect(this.pos.x+45,this.pos.y-45,15,15,5);
      
      //Window
      fill(255);
      rect(this.pos.x,this.pos.y-25,300,115,0,0,5,5);
      
      //Text
      fill(0);
      text(this.message, this.pos.x, this.pos.y, 300, 100);
    };
  }
  
  function Wallpaper() {
    ellipseMode(CENTER);
    let gridScl = 30;
    background(bgCol);
    for (var y = -gridScl/4; y < height + gridScl; y += gridScl) {
      for (var x = -gridScl/4; x < width + gridScl; x += gridScl) {
        let fillCol = lerpColor(bgDot1,bgDot2,random(0,1));
        fill(fillCol);
        ellipse(x + gridScl / 2, y + gridScl / 2, gridScl / 3, gridScl / 3);
      }
    }
    fill(barCol2);
    rect(0, height - 35, width, 35);
    fill(barCol1);
    rect(0, height - 35, width / 6, 35);
    fill(255);
    rect(width-27.5,height-27.5,20,20);
    rect(width-57.5,height-27.5,20,20);
    rect(width-87.5,height-27.5,20,20);
    ellipseMode(CORNER);
  }