import { addZero } from "./common.js";
import { configureVolumeControl } from "./volume.js";

function musicPlayer() {
  const audioBlock = document.querySelector('.audio');
  const player = document.querySelector('.audio-player');
  const playButton = document.querySelector('.audio-button__play');
  const prevButton = document.querySelector('.audio-button__prev');
  const nextButton = document.querySelector('.audio-button__next');
  const audioProgressBar = document.querySelector('.audio-progress');
  const audioProgress = document.querySelector('.audio-progress__timing');
  const timePassed = document.querySelector('.audio-time__passed');
  const timeTotal = document.querySelector('.audio-time__total');
  const songTitle = document.querySelector('.audio-header');
  const songImage = document.querySelector('.audio-img');
  
  const audioList = ['flow', 'hello', 'speed'];
  let currSongIndex = 0;
  
  setSong();

  player.addEventListener('timeupdate', updateTime);
  player.addEventListener('ended', endSongHandler);
  playButton.addEventListener('click', togglePlay);
  prevButton.addEventListener('click', prev);
  nextButton.addEventListener('click', next);
  audioProgressBar.addEventListener('click', changeSongProgress)

  // volume config for audio

  const volumeConfig = {
    volumeSelector: '.audio-volume',
    volumeMuteSelector: '#audio-mute',
    volumeMaxSelector: '#audio-max-volume',
    player,
    initialVolume: .8
  };

  configureVolumeControl(volumeConfig);


  // ====================
  // only functions below

  function setSong() {
    const isPaused = player.paused; 
    
    player.src = `./audio/${audioList[currSongIndex]}.mp3`;
    songTitle.textContent = audioList[currSongIndex];
    songImage.src = `./audio/${audioList[currSongIndex]}.jpg`;
    
    isPaused ? player.pause() : player.play();
  }

  function next() {
    currSongIndex = (currSongIndex + 1) % audioList.length;
    setSong();
  }

  function prev() {
    currSongIndex ? currSongIndex-- : currSongIndex = audioList.length - 1;
    setSong();
  }

  function endSongHandler() {
    next();
    player.play();
  }

  function togglePlay() {
    if (player.paused) {
      player.play();
      playButton.classList.replace('fa-play', 'fa-pause');
      audioBlock.classList.add('play');
    } else {
      player.pause();
      playButton.classList.replace('fa-pause', 'fa-play');
      audioBlock.classList.remove('play');
    }
  }

  function updateTime() {
    const current = player.currentTime;
    const total = player.duration;
    const minutesPassed = Math.floor(current / 60) || 0;
    const secondsPassed = Math.floor(current % 60) || 0;
    const minutesTotal = Math.floor(total / 60) || 0;
    const secondsTotal = Math.floor(total % 60) || 0;

    timePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
    timeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;

    audioProgress.style.width = current * 100 / total + '%';
  }

  function changeSongProgress(e) {
    const width = audioProgressBar.clientWidth;
    const percent = e.offsetX / width;
    audioProgress.style.width = percent * 100 + '%';
    player.currentTime = percent * player.duration;
  }

  return player;
}

export default musicPlayer;