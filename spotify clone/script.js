console.log("Welcome to Spotify");

// Initialise the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let myProgressBar = document.getElementById('myProgressBar');
let masterPlay = document.getElementById('masterPlay');
let currentSongName = document.getElementById('currentSongName');

let songs = [
  { songName: "Desi Kalakar", filePath: "songs/1.mp3", coverPath: "covers/1.jpeg" },
  { songName: "Brown Rang", filePath: "songs/2.mp3", coverPath: "covers/2.jpeg" },
  { songName: "Blue Eyes", filePath: "songs/3.mp3", coverPath: "covers/3.jpeg" },
  { songName: "Love Dose", filePath: "songs/4.mp3", coverPath: "covers/4.jpeg" },
  { songName: "Makhna", filePath: "songs/5.mp3", coverPath: "covers/5.jpeg" },
  { songName: "Dope Shope", filePath: "songs/6.mp3", coverPath: "covers/6.jpeg" },
  { songName: "First Kiss", filePath: "songs/7.mp3", coverPath: "covers/7.jpeg" },
  { songName: "Angreji Beat", filePath: "songs/8.mp3", coverPath: "covers/8.jpeg" },
];

// Handle play/pause click

masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    // Play the audio
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    // Update song name (no GIF)
    document.querySelector('.songInfo').textContent = songs[songIndex].songName;
  } else {
    // Pause the audio
    audioElement.pause();
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
    document.querySelector('.songInfo').textContent = "Paused";
  }
});

// Listen to events
audioElement.addEventListener('timeupdate', () => {
  console.log('timeupdate');
  // Update seekbar
  let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  console.log(progress);
  myProgressBar.value = progress;
});

// Handle progress bar click
myProgressBar.addEventListener('change', () => {
  audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Play next song (updated)
document.querySelector('.fa-forward-fast').addEventListener('click', () => {
  if (songIndex >= songs.length - 1) songIndex = 0;
  else songIndex++;
  audioElement.src = songs[songIndex].filePath;
  audioElement.play();
  masterPlay.classList.replace('fa-circle-play', 'fa-circle-pause');
  currentSongName.textContent = songs[songIndex].songName;
  document.querySelector('.songInfo').textContent = songs[songIndex].songName;
});

// Play previous song (updated)
document.querySelector('.fa-backward-fast').addEventListener('click', () => {
  if (songIndex <= 0) songIndex = songs.length - 1;
  else songIndex--;
  audioElement.src = songs[songIndex].filePath;
  audioElement.play();
  masterPlay.classList.replace('fa-circle-play', 'fa-circle-pause');
  currentSongName.textContent = songs[songIndex].songName;
  document.querySelector('.songInfo').textContent = songs[songIndex].songName;
});