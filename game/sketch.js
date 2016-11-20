/*
* Luc Pitre<pitreluc@gmail.com>
* conflict resolution simple dialogue simulation
* 4 November 2016
*/

/*
********************
GLOBAL VARIABLES
********************
*/
var img1 = "person1.jpg";
var img2 = "person2.jpg";
var char1;
var char2;

    //Text Areas
    var textDec;
    var textCon;
    var conceptDec;
    var conceptCon;
    var reasonDec;
    var reasonCon;
    //Labels and Button
    var button;
    var label1;
    var label2;
    var conLabel1;
    var conLabel2;
    var reaLabel1;
    var reaLabel2;
    var diaLabel1;
    var diaLabel2;

/*
********************
Char class begins
********************
*/

function Char(person, type){
    if(type == 't'){
        this.xpos = (640/8)*6;
        this.bubbleRight = false;
    }else if(type == 'o'){
        this.xpos = (640/10);
        this.bubbleRight = true;
    }//end else if block
    this.ypos = 480/2;
    this.img = loadImage(person);
    
    this.bubble = function(){
        if(this.bubbleRight == true){
            ellipse(this.xpos + 120, this.ypos -50, 200, 100);
            ellipse(this.xpos + 60, this.ypos, 32, 32);
            ellipse(this.xpos+50, this.ypos + 20, 16, 16);
        }else if(this.bubbleRight == false){
            ellipse(this.xpos-50, this.ypos -50, 200, 100);
            ellipse(this.xpos+30, this.ypos, 32, 32);
            ellipse(this.xpos+50, this.ypos + 20, 16, 16);
        }//end else-if block
    }//end bubble
    
    this.disp = function(){
        image(this.img, this.xpos, this.ypos);
        this.bubble();
    }//end disp()
}//end Char class

/*
********************
Scene class begins
********************
*/

function Scene(){
    
}//end Scene class

/*
********************
SETUP AND DRAW
********************
*/

function setup() {
  createCanvas(640, 480);
  //ellipseMode(CORNER);
  background(255);
  //image(img, 0, 0);
  char1 = new Char(img1, 't');
  char2 = new Char(img2, 'o');
  
  //Text Areas
    textDec = createInput();
    textDec.position(char1.xpos-140, char1.ypos-50);
    textCon = createInput();
    textCon.position(char2.xpos+40, char2.ypos-50);
    conceptDec = createInput();
    conceptDec.position(char1.xpos-150, char1.ypos+50);
    conceptCon = createInput();
    conceptCon.position(char2.xpos+80, char2.ypos+50);
    reasonDec = createInput();
    reasonDec.position(char1.xpos-150, char1.ypos+150);
    reasonCon = createInput();
    reasonCon.position(char2.xpos+80, char2.ypos+150);
    //Labels and Button
    button = createButton('SAVE');
    button.position((640/2), 50);
    label1 = createElement('h3', 'DESTRUCTIVE');
    label1.position(char1.xpos-100, char1.ypos-150);
    label2 = createElement('h3', 'CONSTRUCTIVE');
    label2.position(char2.xpos+40, char2.ypos-150);
    conLabel1 = createElement('h3', 'Concept?');
    conLabel1.position(char1.xpos-100, char1.ypos);
    conLabel2 = createElement('h3', 'Concept?');
    conLabel2.position(char2.xpos+100, char2.ypos);
    reaLabel1 = createElement('h3', 'Reason?');
    reaLabel1.position(char1.xpos-100, char1.ypos+100);
    reaLabel2 = createElement('h3', 'Reason?');
    reaLabel2.position(char2.xpos+100, char2.ypos+100);
    diaLabel1 = createElement('h3', 'Dialogue');
    diaLabel1.position(char1.xpos-100, char1.ypos-100);
    diaLabel2 = createElement('h3', 'Dialogue');
    diaLabel2.position(char2.xpos+40, char2.ypos-100);
    
    
  
}//end setup()

function draw() {
    char1.disp();
    char2.disp();
    
    //button.mousePressed(save("mycanvas.jpg"));
    
}//end draw()

/*
********************
        EOF
********************
*/
