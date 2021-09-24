// Sound classification model trained and stored with teachable machine:
const soundModel = 'https://teachablemachine.withgoogle.com/models/rB-0GY11D/';

// Interface class
let VC = {
    label: 'laden...',
    classifier: null,
    init: initVoiceControl,
    classify: classifySound,
}

// Initialize Voice Control
function initVoiceControl() {
  const options ={ probabilityThreshold:0.5};
  VC.classifier = ml5.soundClassifier(soundModel + 'model.json', options);
}

// Start sound classification
function classifySound() {
    VC.classifier.classify(onVoiceResult);
}

// The model recognizing a sound will trigger this event
function onVoiceResult(error, results) {
    if (error) {
      console.error(error);
      return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    VC.label = results[0].label;
  }