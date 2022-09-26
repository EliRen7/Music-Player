const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');

// Music
const songs = [
  {
    name: 'Liz-1',
    displayName: 'Erase',
    artist: 'FRND',
  },
  {
    name: 'Liz-2',
    displayName: 'Reflejo',
    artist: 'Charly Flow',
  },
  {
    name: 'Liz-3',
    displayName: 'Dimple',
    artist: 'BTS',
  },
  {
    name: 'Liz-4',
    displayName: 'What If I Fall Apart',
    artist: 'FRND',
  },
  {
    name: 'Liz-5',
    displayName: 'On Your Collarbone',
    artist: 'Jordan Klassen',
  },
  {
    name: 'Liz-6',
    displayName: 'Sin Ti',
    artist: 'Sebastian Yatra',
  },
  {
    name: 'Liz-7',
    displayName: 'Siren (Remix)',
    artist: '(UNEDUCATED KID, Paul Blanco)',
  },
  {
    name: 'Liz-8',
    displayName: 'There x2',
    artist: 'Slushii (Feat: Marshmellow)',
  },
  {
    name: 'Liz-9',
    displayName: 'Take It All Back',
    artist: 'Judah & The Lion',
  },
  {
    name: 'Liz-10',
    displayName: 'To Zion',
    artist: 'Trevor Hall',
  },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}


// Volume Controls --------------------------- //


let lastVolume = 1;

// Mute
function toggleMute() {
  volumeIcon.className = '';
  if (music.volume) {
    lastVolume = music.volume;
    music.volume = 0;
    volumeIcon.classList.add('fas', 'fa-volume-mute');
    volumeIcon.setAttribute('title', 'Unmute');
    volumeBar.style.width = 0;
  } else {
    music.volume = lastVolume;
    volumeIcon.classList.add('fas', 'fa-volume-up');
    volumeIcon.setAttribute('title', 'Mute');
    volumeBar.style.width = `${lastVolume * 100}%`;
  }
}

// Volume Bar
function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  // Rounding volume up or down
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }
  volumeBar.style.width = `${volume * 100}%`;
  music.volume = volume;
  // Change icon depending on volume
  volumeIcon.className = '';
  if (volume > 0.7) {
    volumeIcon.classList.add('fas', 'fa-volume-up');
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add('fas', 'fa-volume-down');
  } else if (volume === 0) {
    volumeIcon.classList.add('fas', 'fa-volume-off');
  }
  lastVolume = volume;
}

// //  slider
// function sliderDisplay(){
//   volumeBar.style.margin('0px 2px 0px 0px');   
//   volumeRange.style.width='53px';
// }
// function sliderDisplay(){
//  volumeBar.style.margin('0px 0px 0px 0px');   
//  volumeRange.style.width='0px';
// }

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
// volumeIcon.addEventListener('mouseover', sliderDisplay);
// volumeIcon.addEventListener('mouseleave', sliderDisplay);
