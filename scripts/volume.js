export function configureVolumeControl(props) {
  const {
    volumeSelector,
    volumeMuteSelector,
    volumeMaxSelector,
    player,
    initialVolume = .35
  } = props;

  const volumeControl = document.querySelector(volumeSelector);
  const volumeMute = document.querySelector(volumeMuteSelector);
  const volumeMax = document.querySelector(volumeMaxSelector);

  let isMuted = false;
  let isVolumeMax = false;

  const toggleVolume = createVolumeToggle();

  volumeControl.addEventListener('input', changeVolume);
  volumeMute.addEventListener('click', toggleMute);
  volumeMax.addEventListener('click', toggleMaxVolume);

  volumeInit(initialVolume);


  // ====================
  // only functions below

  function volumeInit(initialVolume) {
    volumeControl.value = initialVolume;
    player.volume = initialVolume;
  }

  function changeVolume() {
    player.volume = volumeControl.value;
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
    let previousVolume = player.volume;

    // volume value is 1 or 0 (0 for mute, 1 for max volume);
    return (volumeValue = 0) => {
      if ((isVolumeMax && volumeValue) || (isMuted && !volumeValue)) {
        player.volume = previousVolume;
        previousVolume = volumeValue;
      } else {
        previousVolume = player.volume;
        player.volume = volumeValue;
      }

      volumeControl.value = player.volume;
    }
  }
} 