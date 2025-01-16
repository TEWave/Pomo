let timer;
let isRunning = false;
let timeLeft = 25 * 60; // 25 minutes in seconds
let isBreak = false;

const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

// Format time as MM:SS
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  return `${minutes < 10 ? '0' + minutes : minutes}:${secondsLeft < 10 ? '0' + secondsLeft : secondsLeft}`;
}

// Update the timer display
function updateTimerDisplay() {
  timerDisplay.textContent = formatTime(timeLeft);
}

// Start the timer
function startTimer() {
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      // Time is up, switch to break or reset timer
      clearInterval(timer);
      isBreak = !isBreak;
      if (isBreak) {
        timeLeft = 5 * 60; // 5-minute break
        alert('Break time! Take a 5-minute break.');
      } else {
        timeLeft = 25 * 60; // 25-minute work period
        alert('Time to focus! Start working.');
      }
      startBtn.disabled = false;
      pauseBtn.disabled = true;
      updateTimerDisplay();
    }
  }, 1000);
}

// Start button click
startBtn.addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    startTimer();
  }
});

// Pause button click
pauseBtn.addEventListener('click', () => {
  clearInterval(timer);
  isRunning = false;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
});

// Reset button click
resetBtn.addEventListener('click', () => {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 25 * 60; // Reset to 25 minutes
  updateTimerDisplay();
  startBtn.disabled = false;
  pauseBtn.disabled = true;
});

// Initial update
updateTimerDisplay();
