let startTime = null;
let elapsedTime = 0;
let timerInterval = null;
let laps = [];

const timeDisplay = document.getElementById("time-display");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const lapBtn = document.getElementById("lap-btn");
const lapTimes = document.getElementById("lap-times");

function formatTime(ms) {
  const microseconds = Math.floor(ms % 1000); 
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / (1000 * 60)) % 60;
  const hours = Math.floor(ms / (1000 * 60 * 60));
  return (
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0") +
    "." +
    String(microseconds).padStart(3, "0") 
  );
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
  }, 10); 
}

function pauseTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  laps = [];
  timeDisplay.textContent = "00:00:00.000";
  lapTimes.innerHTML = "";
}

function recordLap() {
  laps.push(elapsedTime);
  const lapItem = document.createElement("li");
  lapItem.textContent = `Lap ${laps.length}: ${formatTime(elapsedTime)}`;
  lapTimes.appendChild(lapItem);
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);
