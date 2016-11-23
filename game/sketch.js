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

var table;

//distance mouse pointer is from button:
var d;

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

//screen control
var sceneOne = true;
var sceneTwo = false;
var sceneThree = false;
var counter = 0;
var dispCount;

var can;

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
SETUP AND DRAW
********************
*/
function preload(){
	//table = loadTable("responses.csv", "csv", "header");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
	frameRate(30);
	
	
	char1 = new Char(img1, 't');
	char2 = new Char(img2, 'o');
	dispSceneOne();
    
    
    
}//end setup()

function draw() {
	d = int(dist(mouseX, mouseY, width/2, 50));
    if(counter >= 10){
    	done();
    }else{
    	char1.disp();
    	char2.disp();
    	
    	if(mouseIsPressed){
	    	if(d < 50){
	    		console.log("CLICK!");
	    		moveOn();
			}//end if
	    }//end if
    }//end else
}//end draw()

function saveStuff(){
	
}//end saveStuff()

function moveOn(){
	if(sceneOne == true && sceneTwo == false){
		sceneOne = false;
		sceneTwo = true;
		sceneThree = false;
	}else if(sceneOne == false && sceneTwo == true){
		sceneOne = false;
		sceneTwo = false;
		sceneThree = true;
	}else if(sceneOne == false && sceneThree == true){
		sceneOne = true;
		sceneTwo = false;
		sceneThree = false;
	}//end else if block
	
	if(sceneOne == true){
		dispSceneOne();
	}else if(sceneTwo == true){
		dispSceneTwo();
	}else if(sceneThree == true){
		dispSceneThree();
	}//end else if block
}//end moveOn()

function drawMain(){
	char1.disp();
    char2.disp();

	//Labels and Button
    button = createButton('SAVE');
    button.position((width/2)-20, 30);
    
    label1 = createElement('h3', 'DESTRUCTIVE');
    label1.position(char1.xpos-100, char1.ypos-200);
    //label1.parent("main");
    label2 = createElement('h3', 'CONSTRUCTIVE');
    label2.position(char2.xpos+40, char2.ypos-200);
    //label2.parent("main");
    
    
    
}

function dispSceneOne(){
	//table.set("Destructive Reason", document.getElementById("reaD"));
	//table.set("Constructive Reason", document.getElementById("reaC"));

	counter++;
	if(counter == 10){
		done();
	}else{
		//table.set("ID", counter);
		clear();
		removeElements();
		drawMain();
		console.log("running ONE");
		textDec = createElement('textarea', 'Dialogue goes here.');
	    textDec.position(char1.xpos-140, char1.ypos-80);
	    //textDec.id("textD");
	    textCon = createElement('textarea', 'Dialogue goes here.');
	    textCon.position(char2.xpos+40, char2.ypos-80);
	    //textCon.id("textC");
	    
	    diaLabel1 = createElement('h3', 'Dialogue');
		diaLabel1.position(char1.xpos-100, char1.ypos-150);
		diaLabel2 = createElement('h3', 'Dialogue');
		diaLabel2.position(char2.xpos+40, char2.ypos-150);
		
		dispCount = createP('Count = ' + counter);
		dispCount.position(5, 5);
	}
}

function dispSceneTwo(){
	//table.set("Destructive Dialogue", document.getElementById("textD"));
	//table.set("Constructive Dialogue", document.getElementById("textC"));

	clear();
	removeElements();
	drawMain();
	console.log("running TWO");
	conceptDec = createElement('textarea', 'Concept goes here.');
    conceptDec.position(char1.xpos-140, char1.ypos-80);
    //conceptDec.id("conD");
    conceptCon = createElement('textarea', 'Concept goes here.');
    conceptCon.position(char2.xpos+40, char2.ypos-80);
    //conceptCon.id("conC");
    
    conLabel1 = createElement('h3', 'Concept?');
    conLabel1.position(char1.xpos-100, char1.ypos-150);
    conLabel2 = createElement('h3', 'Concept?');
    conLabel2.position(char2.xpos+40, char2.ypos-150);
    
    dispCount = createP('Count = ' + counter);
	dispCount.position(5, 5);
}

function dispSceneThree(){
	//table.set("Destructive Concept", document.getElementById("conD"));
	//table.set("Concstructive Concept", document.getElementById("conC"));
	
	clear();
	removeElements();
	drawMain();
	console.log("running THREE");
	reasonDec = createElement('textarea', 'Reason goes here.');
    reasonDec.position(char1.xpos-140, char1.ypos-80);
    //reasonDec.id("reaD");
    reasonCon = createElement('textarea', 'Reason goes here.');
    reasonCon.position(char2.xpos+40, char2.ypos-80);
    //reasonCon.id("reaC");
    
	reaLabel1 = createElement('h3', 'Reason?');
    reaLabel1.position(char1.xpos-100, char1.ypos-150);
    reaLabel2 = createElement('h3', 'Reason?');
    reaLabel2.position(char2.xpos+40, char2.ypos-150);
    
    dispCount = createP('Count = ' + counter);
	dispCount.position(5, 5);
}

function done(){
	//saveTable(table, "responses.csv");
	clear();
	removeElements();
	var finishText1 = createElement('h2', 'ALL DONE!');
	finishText1.position(25, 25);
	var finishText2 = createP('You have completed the dialogue input. A csv file should have been downloaded automatically.');
	finishText2.position(100, 100);
}//end done()

/*
********************
        EOF
********************
*/