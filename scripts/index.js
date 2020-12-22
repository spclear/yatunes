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

  tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      toggleActiveElement(tabButtons, index, 'active');
      toggleActiveElement(tabBlocks, index, 'active');
      stopVideoOnClose();
    });
  });

  musicPlayer();
  videoPlayer();
  radioPlayer();
});

function toggleActiveElement(list, index, activeClass = 'active') {
  list.forEach((item, i) => {
    i === index
      ? item.classList.add(activeClass)
      : item.classList.remove(activeClass);
  });
}

function stopVideoOnClose() {
  const videoBlock = document.querySelector('.player-block.video');
  const video = videoBlock.querySelector('.video-player');
  const playButton = videoBlock.querySelector('.video-button__play');
  const isHidden = window.getComputedStyle(videoBlock).display === 'none';
  
  playButton.classList.add('fa-play');
  playButton.classList.remove('fa-pause');
  isHidden && video.pause();
}