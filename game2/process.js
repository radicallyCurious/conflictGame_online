/*
*
*
*
*/
var canv = document.getElementById("canv");
var context = canv.getContext("2d");

//create array of strings

//take in 6 textarea.values as strings

function wrapText(context, text, x, y, maxWidth, lineHeight) {
        var cars = text.split("\n");

        for (var ii = 0; ii < cars.length; ii++) {

            var line = "";
            var words = cars[ii].split(" ");

            for (var n = 0; n < words.length; n++) {
                var testLine = line + words[n] + " ";
                var metrics = context.measureText(testLine);
                var testWidth = metrics.width;

                if (testWidth > maxWidth) {
                    context.fillText(line, x, y);
                    line = words[n] + " ";
                    y += lineHeight;
                }
                else {
                    line = testLine;
                }
            }

            context.fillText(line, x, y);
            y += lineHeight;
        }
     }


//make circles for dialogue
//place textarea values in proper places
function drawDialogue(){

}//end drawDialogue()

//save image to users computer


//save image in array for later use as comic strip