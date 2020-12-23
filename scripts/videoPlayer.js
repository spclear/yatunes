import { addZero } from './common.js';

function videoPlayer() {
  const video = document.querySelector('.video-player');
  const playButton = document.querySelector('.video-button__play');
  const stopButton = document.querySelector('.video-button__stop');
  const videoProgress = document.querySelector('.video-progress');
  const volumeControl = document.querySelector('.video-volume');
  const volumeMute = document.querySelector('#video-mute');
  const volumeMax = document.querySelector('#video-max-volume');
  const timePassed = document.querySelector('.video-time__passed');
  const timeTotal = document.querySelector('.video-time__total');
  
  let isMuted = false;
  let isVolumeMax = false;

  const toggleVolume = createVolumeToggle();

  video.addEventListener('click', togglePlay);
  video.addEventListener('timeupdate', updateTime);
  playButton.addEventListener('click', togglePlay);
  stopButton.addEventListener('click', stopVideo);
  videoProgress.addEventListener('input', changeVideoProgress);
  volumeControl.addEventListener('input', changeVideoVolume);
  volumeMute.addEventListener('click', toggleMute);
  volumeMax.addEventListener('click', toggleMaxVolume);
  
  volumeInit(.35);

  // only functions below


  // video progress functions
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

  // video volume functions
  function volumeInit(initialVolume) {
    volumeControl.value = initialVolume;
    video.volume = initialVolume;
  }

  function changeVideoVolume() {
    video.volume = volumeControl.value;
    isMuted = false;
    isVolumeMax = false;
  }

  function toggleMute() {
    toggleVolume(0);
    isMuted = !isMuted;
    isVolumeMax = false;
  }

  function toggleMaxVolume() {
    toggleVolume(1);
    isVolumeMax = !isVolumeMax;
    isMuted = false;
  }

  function createVolumeToggle() {
    let previousVolume = video.volume;

    // volume value is 1 or 0 (1 for mute, 1 for max volume);
    return (volumeValue = 0) => {
      if ((isVolumeMax && volumeValue) || (isMuted && !volumeValue )) {
        video.volume = previousVolume;
        previousVolume = volumeValue;
      } else {
        previousVolume = video.volume;
        video.volume = volumeValue;
      }

      volumeControl.value = video.volume;
    }
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