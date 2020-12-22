import { addZero } from './common.js';

function videoPlayer() {
  const video = document.querySelector('.video-player');
  const playButton = document.querySelector('.video-button__play');
  const stopButton = document.querySelector('.video-button__stop');
  const videoProgress = document.querySelector('.video-progress');
  const timePassed = document.querySelector('.video-time__passed');
  const timeTotal = document.querySelector('.video-time__total');

  video.addEventListener('click', togglePlay);
  video.addEventListener('timeupdate', updateTime);
  playButton.addEventListener('click', togglePlay);
  stopButton.addEventListener('click', stopVideo);
  videoProgress.addEventListener('input', changeVideoProgress);

  // only functions below

  function togglePlay() {
    video.paused ? video.play() : video.pause();
    toggleIcon();
  }

  function stopVideo() {
    video.pause();
    video.currentTime = 0;
    toggleIcon();
  }

  function updateTime() {
    const current = video.currentTime;
    const total = video.duration;
    const minutesPassed = Math.floor(current / 60);
    const secondsPassed = Math.floor(current % 60);
    const minutesTotal = Math.floor(total / 60);
    const secondsTotal = Math.floor(total % 60);

    timePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
    timeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;

    videoProgress.value = current / total * 100;
  }

  function changeVideoProgress() {
    const value = videoProgress.value;
    video.currentTime = value / 100 * video.duration;
  }

  function toggleIcon() {
    if (video.paused) {
      playButton.classList.replace('fa-pause', 'fa-play');
    } else {
      playButton.classList.replace('fa-play', 'fa-pause');
    }
  }
}

export default videoPlayer;