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
var presave = [ ['', ''],
				['', ''],
				['', ''],
				];
var usedConcepts = [ 
					['', ''],
					['', ''],
					['', ''],
					['', ''],
					['', ''],
					['', ''],
					['', ''],
					['', ''],
					['', ''],
					['', '']
					];

var saveImg;
var savedFrames = [];
//distance mouse pointer is from button:
var d;

//Text Areas
var textDec;
var textCon;
var conceptDec;
var conceptCon;
var reasonDec;
var reasonCon;
var usedConceptsDisp;
//Labels and Button
var button;
var label1;
var label2;
var label3;
var conLabel1;
var conLabel2;
var reaLabel1;
var reaLabel2;
var diaLabel1;
var diaLabel2;

var input1;

//screen control
var sceneOne = true;
var sceneTwo = false;
var sceneThree = false;
var counter = 0;
var dispCount;

var saved = false;

var canv;

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
function setup() {
	canv = createCanvas(windowWidth, windowHeight);
	canv.id("canSave");
	background(255);
	frameRate(11);
	
	
	char1 = new Char(img1, 't');
	char2 = new Char(img2, 'o');
	dispSceneOne();
    
    table = new p5.Table();
    table.addColumn('id');
    table.addColumn('Destructive Dialogue');
    table.addColumn('Constructive Dialogue');
    table.addColumn('Destructive Reason');
    table.addColumn('Constructive Reason');
    table.addColumn('Destructive Concept');
    table.addColumn('Constructive Concept');
    
}//end setup()

function draw() {
	d = int(dist(mouseX, mouseY, width/2-400, 50));
    if(counter == 10){
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


//setup the csv file
function saveEntries(){
	var newRow = table.addRow();
	newRow.setNum('id', counter-1);
	newRow.setString('Destructive Dialogue', presave[0][0]);
	newRow.setString('Constructive Dialogue', presave[0][1]);
	newRow.setString('Destructive Reason', presave[1][0]);
	newRow.setString('Constructive Reason', presave[1][1]);
	newRow.setString('Destructive Concept', presave[2][0]);
	newRow.setString('Constructive Concept', presave[2][1]);
	console.log("NEW TABLE ROW ADDED!!!");
}//end saveStuff()

//which scene is shoing?
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

//draw characters and buttons and labels that are always there
function drawMain(){
	char1.disp();
    char2.disp();

	//Labels and Button
    button = createButton('NEXT');
    button.position((width/2)-400, 30);
    button.id("button");
    
    label1 = createElement('h3', 'Distressed/Ineffective System');
    label1.position(char1.xpos-150, char1.ypos-200);
    //label1.parent("main");
    label2 = createElement('h3', 'Effective System');
    label2.position(char2.xpos+0, char2.ypos-200);
    //label2.parent("main");
    label3 = createElement('h3', 'Concepts Used');
    label3.position(width-200, 20);
    
    usedConceptsDisp = createElement('textarea', usedConcepts);
    usedConceptsDisp.position(width-200, 100);
    
    console.log(counter);
    
    
    /** SOLUTION TO CNAVAS SAVING PORBLEM!!!!!!! **/
    input1 = new CanvasInput({
    	canvas: document.getElementById("canSave")
    	
    });
}//end drawMain()

function dispSceneOne(){
	if(counter > 0 && counter <= 10){
		textToCan(document.getElementById("canSave"), document.getElementById("reaD").value, char1.xpos+100, char1.ypos+80);
		textToCan(document.getElementById("canSave"), document.getElementById("reaC").value, char2.xpos+100, char2.ypos+80);
		save("myCanvas.png");
		presave[2][0] = document.getElementById("reaD").value;
		presave[2][1] = document.getElementById("reaC").value;
		console.log(presave[2][0]);
		console.log(presave[2][1]);
		saveEntries();
	}
	
	if(counter == 10){
		saveEntries();
		done();
	}else{
		//table.set("ID", counter);
		//clear();
		removeElements();
		drawMain();
		console.log("running ONE");
		textDec = createElement('textarea', 'Dialogue goes here.');
	    textDec.position(char1.xpos-140, char1.ypos-80);
	    textDec.id("textD");
	    textCon = createElement('textarea', 'Dialogue goes here.');
	    textCon.position(char2.xpos+40, char2.ypos-80);
	    textCon.id("textC");
	    
	    diaLabel1 = createElement('h3', 'Dialogue');
		diaLabel1.position(char1.xpos-100, char1.ypos-150);
		diaLabel2 = createElement('h3', 'Dialogue');
		diaLabel2.position(char2.xpos+40, char2.ypos-150);
		
		dispCount = createP('Scene ' + (counter+1));
		dispCount.position(5, 5);
	}
}

function dispSceneTwo(){
	presave[0][0] = document.getElementById("textD").value;
	presave[0][1] = document.getElementById("textC").value;
	console.log(presave[0][0]);
	console.log(presave[0][1]);

	//clear();
	//removeElements();
	//drawMain();
	console.log("running TWO");
	diaLabel1.remove();
	diaLabel2.remove();
	conceptDec = createElement('textarea', 'Concept goes here.');
    conceptDec.position(char1.xpos+100, char1.ypos-0);
    conceptDec.id("conD");
    conceptCon = createElement('textarea', 'Concept goes here.');
    conceptCon.position(char2.xpos+100, char2.ypos-0);
    conceptCon.id("conC");
    
    conLabel1 = createElement('h3', 'Concept?');
    conLabel1.position(char1.xpos-100, char1.ypos-150);
    conLabel2 = createElement('h3', 'Concept?');
    conLabel2.position(char2.xpos+40, char2.ypos-150);
    
    dispCount = createP('Scene ' + (counter+1));
	dispCount.position(5, 5);
}

function dispSceneThree(){
	presave[1][0] = document.getElementById("conD").value;
	presave[1][1] = document.getElementById("conC").value;
	console.log(presave[1][0]);
	console.log(presave[1][1]);
	usedConcepts[counter][0] = document.getElementById("conD").value;
	usedConcepts[counter][1] = document.getElementById("conC").value;
	console.log("saved " + usedConcepts[counter][0]);
	console.log("saved " + usedConcepts[counter][1]);
	
	//clear();
	//removeElements();
	//drawMain();
	console.log("running THREE");
	conLabel1.remove();
	conLabel2.remove();
	reasonDec = createElement('textarea', 'Reason goes here.');
    reasonDec.position(char1.xpos+100, char1.ypos+80);
    reasonDec.id("reaD");
    reasonCon = createElement('textarea', 'Reason goes here.');
    reasonCon.position(char2.xpos+100, char2.ypos+80);
    reasonCon.id("reaC");
    
	reaLabel1 = createElement('h3', 'Reason?');
    reaLabel1.position(char1.xpos-100, char1.ypos-150);
    reaLabel2 = createElement('h3', 'Reason?');
    reaLabel2.position(char2.xpos+40, char2.ypos-150);
    
    dispCount = createP('Scene ' + (counter+1));
	dispCount.position(5, 5);
	counter++;
}

//save all data to csv
function done(){
	if(!saved){
		saveTable(table, "responses.csv");
		saved = true;
	}
	clear();
	removeElements();
	var finishText1 = createElement('h2', 'ALL DONE!');
	finishText1.position(25, 25);
	var finishText2 = createP('You have completed the dialogue input. A csv file should have been downloaded automatically.');
	finishText2.position(100, 100);
}//end done()

function textToCan(canvas, text, x, y){
	ctx = canvas.getContext("2d");
	ctx.fillText(text, x, y);
}

/*
********************
        EOF
********************
*/