score_Rw=0;
score_Lw=0;
song_1="";
song_2="";
leftWristX= 0;
leftWristY= 0;
rightWristX= 0;
rightWristY= 0;
song1_status="";
song2_status="";

function preload(){
song_1=loadSound("Bezubaan.mp3");
song_2=loadSound("Saathiya.mp3");
}  

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
        
    video=createCapture(VIDEO);
    video.hide();
    
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
    }

function modelLoaded(){
    console.log("Posenet model has been loaded");
}

function draw(){
image(video,0,0,600,500);
fill("#00aee3");
stroke("#000000");
song1_status=song_1.isPlaying();
song2_status=song_2.isPlaying();

if(score_Lw > 0.2){
    circle(leftWristX,leftWristY,35);
    song_2.stop();

    if(song1_status == false){
        song_1.play();
        document.getElementById("song_name").innerHTML = "Song Name: Bezubaan";
    }
}

if(score_Rw > 0.2){
    circle(rightWristX,rightWristY,35);
    song_1.stop();

    if(song2_status == false){
        song_2.play();
        document.getElementById("song_name").innerHTML = "Song Name: Saathiya";
    }
}
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        score_Rw=results[0].pose.keypoints[10].score;
        score_Lw=results[0].pose.keypoints[9].score;
        console.log("Score Left Wrist = "+score_Lw + " Score Right Wrist = "+score_Rw );

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("Left wrist X= "+leftWristX+" Left wrist Y= "+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("Right wrist X= "+rightWristX+" Right wrist Y= "+rightWristY);
    }
}