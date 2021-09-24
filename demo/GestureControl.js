// Interface class
let GC = {
    detections: {},
    video,
    height: 480,
    width: 640,
    label: 'laden...',
    init: initGestureControl,
}


// get MediaPipe Hands model
const hands = new Hands({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }
});


// Start video input
const videoElement = document.getElementById('video');
const camera = new Camera(videoElement, {
    onFrame: async () => {
        await hands.send({ image: videoElement });
    },
    width: GC.width,
    height: GC.height
});
camera.start();


// Initialize Gesture Control
function initGestureControl() {
    // choose MP-Hands options
    hands.setOptions({
        maxNumHands: 1,
        minDetectionConfidence: 0.8,
        minTrackingConfidence: 0.5
    });
    hands.onResults(gotHands);
}


// check for detection and update
function gotHands(results) {
    GC.detections = results;
    if (GC.detections.multiHandLandmarks.length > 0) {
        GC.label = getLabel();
    }
    else {
        GC.label = '';
    }
}


// convert result to label
function getLabel() {
    // https://google.github.io/mediapipe/solutions/hands.html

    // fingers up(1) or down(0)
    let fingers = 0;

    // thumb
    let thumb_tip_x = GC.detections.multiHandLandmarks[0][4].x;
    let thumb_mcp_x = GC.detections.multiHandLandmarks[0][3].x;
    if (GC.detections.multiHandLandmarks[0][4].x < GC.detections.multiHandLandmarks[0][17].x) {
        // right hand
        if (thumb_tip_x < thumb_mcp_x) {
            fingers |= 0b10000;
        }
    }
    else {
        // left hand
        if (thumb_tip_x > thumb_mcp_x) {
            fingers |= 0b10000;
        }
    }


    // index finger
    let index_tip_y = GC.detections.multiHandLandmarks[0][8].y;
    let index_pip_y = GC.detections.multiHandLandmarks[0][6].y;
    if (index_tip_y < index_pip_y) {
        fingers |= 0b01000;
    }

    // middle
    let middle_tip_y = GC.detections.multiHandLandmarks[0][12].y;
    let middle_pip_y = GC.detections.multiHandLandmarks[0][10].y;
    if (middle_tip_y < middle_pip_y) {
        fingers |= 0b00100;
    }

    // ring
    let ring_tip_y = GC.detections.multiHandLandmarks[0][16].y;
    let ring_pip_y = GC.detections.multiHandLandmarks[0][14].y;
    if (ring_tip_y < ring_pip_y) {
        fingers |= 0b00010;
    }

    // pinky
    let pinky_tip_y = GC.detections.multiHandLandmarks[0][20].y;
    let pinky_pip_y = GC.detections.multiHandLandmarks[0][19].y;
    if (pinky_tip_y < pinky_pip_y) {
        fingers |= 0b00001;
    }

    let label = '';
    switch (fingers) {
        case 0b00000: label = '0'; break;
        case 0b10000: label = '1'; break;
        case 0b11000: label = '2'; break;
        case 0b11100: label = '3'; break;
        case 0b11110: label = '4'; break;
        case 0b11111: label = '5'; break;
        case 0b01000: label = '6'; break;
        case 0b01100: label = '7'; break;
        case 0b01110: label = '8'; break;
        case 0b01111: label = '9'; break;
        case 0b00100: label = '+'; break;
        case 0b00110: label = '-'; break;
        case 0b00101: label = '*'; break;
        case 0b00111: label = '/'; break;
        case 0b11001: label = '='; break;
        default: label = '';
    }
    return label;
}


