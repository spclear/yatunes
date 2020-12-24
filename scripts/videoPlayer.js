import { addZero } from './common.js';
import { configureVolumeControl } from './volume.js';

function videoPlayer() {
  const video = document.querySelector('.video-player');
  const playButton = document.querySelector('.video-button__play');
  const stopButton = document.querySelector('.video-button__stop');
  const videoProgress = document.querySelector('.video-progress');;
  const timePassed = document.querySelector('.video-time__passed');
  const timeTotal = document.querySelector('.video-time__total');

  video.addEventListener('click', togglePlay);
  video.addEventListener('timeupdate', updateTime);
  playButton.addEventListener('click', togglePlay);
  stopButton.addEventListener('click', stopVideo);
  videoProgress.addEventListener('input', changeVideoProgress);

  // volume config for video
  const volumeConfig = {
    volumeSelector: '.video-volume',
    volumeMuteSelector: '#video-mute',
    volumeMaxSelector: '#video-max-volume',
    player: video,
    initialVolume: .35
  };

  configureVolumeControl(volumeConfig);


  // ====================
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
    const minutesPassed = Math.floor(current / 60) || 0;
    const secondsPassed = Math.floor(current % 60) || 0;
    const minutesTotal = Math.floor(total / 60) || 0;
    const secondsTotal = Math.floor(total % 60) || 0;

    timePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
    timeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;

    videoProgress.value = current / total * 100;
  }

  function changeVideoProgress() {
    const value = videoProgress.value;
    video.currentTime = value / 100 * video.duration;
  }

  // additional functions
  function toggleIcon() {
    if (video.paused) {
      playButton.classList.replace('fa-pause', 'fa-play');
    } else {
      playButton.classList.replace('fa-play', 'fa-pause');
    }
  }

  return video;
}

export default videoPlayer;