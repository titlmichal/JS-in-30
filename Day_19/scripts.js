const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false})   // returns promise, hence the .then
        // will throw error for devices w/o webcame
        .then(localMediaStream => {
            console.log(localMediaStream);
            video.srcObject = localMediaStream;     // video will be as src="blob..." --> its local
            video.play();   // the video will not update until we play it
        })
        .catch(err => {
            console.error("Oh no!", err);   // catching errors for missing devices, permissions etc
        })
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.viodeHeight;
    // need to first set the same size of canvas for the video
    canvas.width = width;
    canvas.height = height;
    // every few ms take picture and put it into the canvas
    setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);  // first what we draw, then where and then dimensions
    }, 16); // this one will play function each 16 ms
}

function takePhoto() {
    // plays the sound
    snap.currentTime = 0;
    snap.play();
    // take data out of canvas to save the photos
    const data = canvas.toDataURL("image/jpeg");    //returns base64 = string representation of the phote
    const link = document.createElement("a");
    link.href = data;   // setting the newly taken photo to new element
    link.setAttribute("download", "handsome");  // = it can be downloaded with the name of "handsome"
    link.innerHTML = `<img src=${data} alt="Handsome man"/>`;   // putting it to the element content
    strip.insertBefore(link, strip.firstChild); // putting some extras and inserting in front of
}

getVideo();

video.addEventListener("canplay", paintToCanvas);   //when video gets played, it will be emit the pictures/video