import videoPlayer from './videoPlayer.js';
import radioPlayer from './radioPlayer.js';
import musicPlayer from './musicPlayer.js';

document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.player-btn');
  const tabBlocks = document.querySelectorAll('.player-block');
  const temp = document.querySelector('.temp');

  // initial state for buttons and players
  toggleActiveElement(tabButtons, 1, 'active');
  toggleActiveElement(tabBlocks, 1, 'active');
  temp.style.display = 'none';

  const video = videoPlayer();
  const radio = radioPlayer();
  const audio = musicPlayer();

  tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      toggleActiveElement(tabButtons, index, 'active');
      toggleActiveElement(tabBlocks, index, 'active');
      
      stopMusicOnClose(audio);
      stopVideoOnClose(video);
      stopRadioOnClose(radio);
    });
  });
});


// ====================
// only functions below

function toggleActiveElement(list, index, activeClass = 'active') {
  list.forEach((item, i) => {
    i === index
      ? item.classList.add(activeClass)
      : item.classList.remove(activeClass);
  });
}

function stopMusicOnClose(player) {
  stopOnClose({
    playerBlockSelector: '.player-block.audio',
    playButtonSelector: '.audio-button__play',
    player,
  });
  document.querySelector('.player-block.audio').classList.remove('play');
}

function stopVideoOnClose(player) {
  stopOnClose({
    playerBlockSelector: '.player-block.video',
    playButtonSelector: '.video-button__play',
    player,
  });
}

function stopRadioOnClose(player) {
  stopOnClose({
    playerBlockSelector: '.player-block.radio',
    playButtonSelector: '.radio-stop',
    player,
  });
  document.querySelector('.player-block.radio').classList.remove('play');
}

function stopOnClose(props) {
  const { playerBlockSelector, playButtonSelector, player } = props;

  const playerBlock = document.querySelector(playerBlockSelector);
  const playButton = playerBlock.querySelector(playButtonSelector);
  const isHidden = window.getComputedStyle(playerBlock).display === 'none';

  playButton.classList.add('fa-play');
  playButton.classList.remove('fa-pause');
  isHidden && player.pause();
}