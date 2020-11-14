// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/9apYE0438/';

//details for hte classifier
let label = "";
let conf;
let confArr = [];
// let confArr2;
//make a variable for a changing div
let awrd;
//keywords for the different knots
let k1;
let k2 = "kinship"
let k3 = "challenges"
let k4;
let k5 = "mirror"

//basic requirements
let button; //accept button
let answerbtn;
let intro;
let constraints;
let machAns;
let machAns2
//video variable
let vid

//dictionary for the qna
let dict

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  dict = loadJSON("dict.json")
}

function setup() {
  // createCanvas(200, 200);
  // background(200)
  noCanvas()
  constraints = {
    video: {

      facingMode: {
        exact: "environment"
      }

    },
    audio: false
  };
  textFont('Rajdhani')
  // intro.select("#introduction")
  button = createButton("Accept")
  // button.size(150, 150)
  button.addClass("btnclass")
  button.mousePressed(startStream)
  awrd = createDiv("")
  awrd.addClass("awrd")
  machAns = createDiv("")
  machAns.addClass("awrd")
  k1 = dict.knotalist[0].question
  k4 = dict.knotalist[3].question
  answerbtn = createButton("Answer")
  answerbtn.addClass("btnclass")
  // answerbtn.mousePressed(giveanswer)
  answerbtn.hide()

}
//check orientation rather than platform
function startStream() {

  //   "portrait",
  // "portrait-primary"
  // if (window.screen.orientation.type !=
  //   "landscape-primary" || window.screen.orientation.type !=
  //   "landscape") {
    if (navigator.platform == "iPhone" || navigator.platform == "Linux armv8l") {
    vid = createCapture(VIDEO , constraints)
  } else {

    vid = createCapture(VIDEO);
  }
  // vid = createCapture(VIDEO)
  // vid.hide()
  vid.position(0, 0)
  button.remove()
  select("#accept").remove()
  answerbtn.show()
  // text("test",10,10)
  classifyVideo()

}
// Get a prediction for the current video frame
function classifyVideo() {
  // flippedVideo = ml5.flipImage(video)
  classifier.classify(vid, gotResult);
  // flippedVideo.remove();

}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.

  label = results[0].label;
  conf = results[0].confidence
  // console.log(conf)
  // console.log(label);
  // Classify again!
  classifyVideo();
}

function draw() {
  // image(startStream,0,0)

  addFrm()

}

function addFrm() {
  if (conf > 0.7) {
    if (label == "Knot 1") {
      awrd.html(k1);
      // a.position(width/2,height/2-100)

    }
    if (label == "Knot 2") {
      awrd.html(k2);
      // a.position(width/2,height/2-100)
    }
    if (label == "Knot 3") {
      awrd.html(k3);
      // a.position(width/2,height/2-100)
    }
    if (label == "Knot 4") {
      // clk.ellipse(100, 100, 10, 10)
      awrd.html(k4);
      // a.position(width/2,height/2-100)
    }
    if (label == "Knot 5") {
      awrd.html(k5);
      // a.position(width/2,height/2-100)
    }
  }
  // console.log(conf)
  // console.log()
  if (label == "Knot 4" && conf > 0.97) {
    confArr.push(frameCount)
    if (confArr.length > 240) {
      diff = confArr[239] - confArr[0]
      if (diff > 300) {

        console.log(diff, confArr[0], confArr[49], "other")
      } else {
        answerbtn.mousePressed(giveanswer)
        console.log(diff, confArr[0], confArr[49], k4)
        // answerbtn.show()
        machAns2 = dict.knotalist[3].answer[0]

      }
      confArr = []
    }
  }
}

function giveanswer() {


  machAns.html(machAns2)

}
