// 3 pieces of the script here
// 1) get elements
const player = document.querySelector(".player");   // the whole player
const video = player.querySelector(".viewer")       // the class of the video
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]"); // everything with data-skip properity
const ranges = player.querySelectorAll(".player__slider");

// 2) build functions
function togglePlay() {
    if (video.paused) {  //video has paused properity, no played properity
        video.play();
    } else {
        video.pause();
    }
    // btw I could save the play() or pause() option
    // via quick if like const method = video.paused ? "play" : "pause"
    // and then be like video.[method]()
    // but its kinda harder to read
}

    // rather creating distinct function for alternative ways of playing
function updatePlayButton() {
    const icon = this.paused ? "►" : "⏸";
    toggle.textContent = icon;  // again, quick if else could be used here
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip); // parsing bcs its a string
}

function handleRangeUpdate() {
    video[this.name] = this.value;  // bcs video has properities of with same name as the elements
}

function handleProgress() {
    // we will update flex-basis properity of the progress bar element --> using video length
    const percent = (video.currentTime / video.duration) * 100 ; // just using basic video attributes
    progressBar.style.flexBasis = `${percent}%`;
}

    // using offset event properities to get click relative position within the bar
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration; // relative position times the video length to get desired
    video.currentTime = scrubTime;
    console.log(e);
}

// 3) hook up event listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updatePlayButton);
video.addEventListener("pause", updatePlayButton);
toggle.addEventListener("click", togglePlay);
skipButtons.forEach(skipButton => skipButton.addEventListener("click", skip));
ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));
ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate)); // so we update dynamically
    // btw the values stay the same unless its changed, hence it doesnt change when only hovered over
video.addEventListener("timeupdate", handleProgress); // for triggering bar update
progress.addEventListener("click", scrub);
