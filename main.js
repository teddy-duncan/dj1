song = "";
song1="";
leftWristX=0;
leftWristY=0;
rightWristY=0;
rightWristX=0;
scoreLeftwrist=0;
scoreRightwrist=0;
function preload()
{
	song = loadSound("music.mp3");
	song1 = loadSound("music.mp3");
}
function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
	
}
function modelLoaded(){
	console.log("poseNet is intialized");
}
function gotPoses(results){
	if(results.lenght>0){
		console.log(results);
leftWristX=results[0].pose.leftWrist.x;
leftWristY=results[0].pose.leftWrist.y;
console.log("leftwristX="+leftWristX+"leftWristY="+leftWristY);
rightWristX=results[0].pose.rightWrist.x;
rightWristY=results[0].pose.rightWrist.y;
console.log("rightwristX="+rightWristX+"rightWristY="+rightWristY);
scoreLeftwrist=results[0].pose.keypoints[9].score;
scoreRightwrist=results[0].pose.keypoints[10].score;

console.log("scoreLeftwrist="+scoreLeftwrist);
}
}
function draw() {
	image(video, 0, 0, 600, 500);
fill("ff0000");
stroke("ff0000");
if(scoreLeftwrist>0.2){
	circle(leftWristX,leftWristY,20);
	song1.stop();
	song.play();

}
if(scoreRightwrist>0.2){
	circle(rightWristX,rightWristY,20);
	song.stop();
	song1.play();

}
}
