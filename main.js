img="";
status="";
objects="";

function setup() {
canvas=createCanvas(380 , 380);
canvas.center();
video=createCapture(VIDEO);
video.size(380,380);
video.hide();
objectDetector=ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status1").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("modelLoaded");
    status=true;
    
}

function gotResult(error,results) {
if (error) {
    console.log(error);
}
console.log(results);
objects=results;
}


function draw() {
image(video ,0,0, 380,380);
/*
fill("#FF0000");
text("dog", 45, 75);
noFill();
stroke("#FF0000");
rect(30 , 60 , 450 , 350);
rect(305 , 100 , 400 , 420);
text("cat", 315, 125);
noFill();
stroke("#FF0000");
rect(296 ,300 , 100 , 200);
text("Bowl", 310, 310);
noFill();
stroke("#FF0000");
*/
if (status !="") {
    objectDetector.detect(video , gotResult);
    for (i=0; i < objects.length;i++) {
        
        document.getElementById("status1").innerHTML="Status : Object Detected ";  
        document.getElementById("number_objects").innerHTML="Number Of Objects Detected are: "+objects.length;

        fill("#FF0000");
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%",objects[i].x+5, objects[i].y+20);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x,objects[i].y, objects[i].width,objects[i].height);
    }
}
}







