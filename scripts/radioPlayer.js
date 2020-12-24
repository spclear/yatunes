function radioPlayer() {
  const radio = document.querySelector('.radio');
  const radioStations = document.querySelectorAll('.radio-item');
  const radioNavigation = document.querySelector('.radio-navigation');
  const playButton = document.querySelector('.radio-stop');
  const radioTitle = document.querySelector('.radio-header__big');
  const radioImage = document.querySelector('.radio-cover__img');

  // init
  const audio = new Audio();
  audio.type = 'audio/aac';
  playButton.disabled = true;

  radioNavigation.addEventListener('change', chooseStation);
  playButton.addEventListener('click', togglePlay);

  
  // ====================
  // only functions below

  function chooseStation(event) {
    const station = event.target;
    const stationSrc = event.target.getAttribute('data-radio-station');

    audio.src = stationSrc;
    audio.play();
    playButton.disabled = false;

    toggleSelectedStation(station);
    togglePlayDisplay();
  }

  function toggleSelectedStation(station) {
    const stationItem = station.closest('.radio-item');
    const title = stationItem.querySelector('.radio-name').textContent;
    const image = stationItem.querySelector('.radio-img').src;

    radioStations.forEach(station => station.classList.remove('select'));
    stationItem.classList.add('select');

    radioTitle.textContent = title;
    radioImage.src = image;
  }

  function togglePlay() {
    audio.paused ? audio.play() : audio.pause();
    togglePlayDisplay();
  }

  function togglePlayDisplay() {
    if (audio.paused) {
      playButton.classList.replace('fa-pause', 'fa-play');
      radio.classList.remove('play');
    } else {
      playButton.classList.replace('fa-play', 'fa-pause');
      radio.classList.add('play');
    }
  }

  return audio;
}

export default radioPlayer;