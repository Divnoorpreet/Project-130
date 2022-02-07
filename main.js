song_1 = "";
song_2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_1_status = "";
song_2_status= "";

function preload(){
    song_1 = loadSound("music.mp3");
    song_2 = loadSound("music2.mp3");

}

function setup(){
    canvas = createCanvas(500, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("Model is Loaded");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreleftWrist = " + scoreleftWrist + "scorerightWrist = " + scorerightWrist)
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);
    song_1_status = song_1.isPlaying();
    fill("#FFFFFF");
    stroke("#FFFFFF");
    if(scoreleftWrist > 0.2){
        circle(leftWristX, leftWristX, 20);
        song_2.stop();
        if(song_1_status==false){
            song_1.play();
            document.getElementById("song_name").innerHTML= "Playing The Harry Potter Theme";
        }
    }
    song_2_status = song_2.isPlaying();
    if(scorerightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        song_1.stop();
        if(song_2_status==false){
            song_2.play();
            document.getElementById("song_name").innerHTML = "Playing The Imperial Theme";
        }
    }
}

function play(){
    song.play()
    song.setVolume(1);
    song.rate(1);
}