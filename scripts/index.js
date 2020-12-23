import videoPlayer from './videoPlayer.js';
import radioPlayer from './radioPlayer.js';
import musicPlayer from './musicPlayer.js';

document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.player-btn');
  const tabBlocks = document.querySelectorAll('.player-block');
  const temp = document.querySelector('.temp');

  // initial state for buttons and players
  toggleActiveElement(tabButtons, 0, 'active');
  toggleActiveElement(tabBlocks, 0, 'active');
  temp.style.display = 'none';

  const radio = radioPlayer();
  musicPlayer();
  videoPlayer();

  tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      toggleActiveElement(tabButtons, index, 'active');
      toggleActiveElement(tabBlocks, index, 'active');
      stopVideoOnClose();
      stopRadioOnClose(radio);
    });
  });
});

function toggleActiveElement(list, index, activeClass = 'active') {
  list.forEach((item, i) => {
    i === index
      ? item.classList.add(activeClass)
      : item.classList.remove(activeClass);
  });
}

function stopVideoOnClose() {
  stopOnClose({
    playerBlockSelector: '.player-block.video',
    playButtonSelector: '.video-button__play',
    player: document.querySelector('.video-player'),
  });
}

function stopRadioOnClose(radio) {
  stopOnClose({
    playerBlockSelector: '.player-block.radio',
    playButtonSelector: '.radio-stop',
    player: radio,
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