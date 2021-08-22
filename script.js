// selecting elements from html
const songImage = document.querySelector('.music-image-container img');
const songTitle = document.querySelector('.music-title h1');
const songAuthor = document.querySelector('.music-author h3');
const song = document.querySelector('audio');
const progressBar = document.querySelector('.progress-bar');
const maskEffect = document.querySelector('.mask-effect');
const songCard = document.querySelector('.music-card');
const progressBarContainer = document.querySelector('.progress-bar-container');
const [
    currentTimeEl, 
    durationEl
] = Array.from(document.querySelectorAll('.time'));
const [
    previousButton,
    playAndPauseButton,
    nextButton
] = Array.from(document.querySelectorAll('.fas'));

// stores all the songs
const songs = [
    {
        title  : 'Dance Monkey',
        author : 'Tones And I'
    },
    {
        title  : "don't give up on me",
        author : 'Andy Grammer'
    },
    {
        title  : 'unstopabble',
        author : 'Sia furler'
    },
    {
        title  : 'Money',
        author : 'Position Music'
    },
    {
        title  : 'never gonna give you up',
        author : 'Rick Ashley'
    }
];

// checks if the song is playing or not
let isPlaying = false;

// plays the song
function playSong() {
    isPlaying = true;
    maskEffect.classList.add('play');
    playAndPauseButton.classList.replace('fa-play', 'fa-pause');
    songCard.classList.add('play');
    song.play();
    song.volume = 1.0;
}

//pauses the song
function pauseSong() {
    isPlaying = false;
    maskEffect.classList.remove('play');
    playAndPauseButton.classList.replace('fa-pause', 'fa-play');
    songCard.classList.remove('play');
    song.pause();
}

// function that triggers pause and play
function triggerPauseAndPlay() {

        isPlaying ? pauseSong() :
        playSong();
}

// loadSong() function will update the dom
function loadSong(music) {
    songTitle.textContent = music.title;
    song.src = `./audios/${music.title}.mp3`;
    songImage.src = `./images/${music.title}.jpg`;
    songAuthor.textContent = music.author;
}

// current song
let songIndex = 0;

// next song
function nextSong() {
    progressBar.style.width = '0%';
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    pauseSong();
}

// preivous song
function previousSong() {
    progressBar.style.width = '0%';
    songIndex--;
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    pauseSong();
}

// on load - selects the first song
loadSong(songs[songIndex]);

// updates the progress bar and the time
function updateProgress(event) {
    if (isPlaying) {
        const { currentTime, duration } = event.srcElement;
        // update progress bar each time the song is playing
        const progressPercent = currentTime / duration * 100;
        progressBar.style.width = `${progressPercent}%`;

        // current time calculation
        const currentTimeMins = Math.floor(currentTime / 60);
        let currentTimeSecs = Math.floor(currentTime % 60);

        if (currentTimeSecs < 10) {
            currentTimeSecs = `0${currentTimeSecs}`;
        }

        currentTimeEl.textContent = `${currentTimeMins}:${currentTimeSecs}`;

        // duration calculation
        const durationTimeMins = Math.floor(duration / 60);
        let durationTimeSecs = Math.floor(duration % 60);

        if (durationTimeSecs < 10) {
            durationTimeSecs = `0${durationTimeSecs}`;
        }

        if (durationTimeSecs) {
            durationEl.textContent = `${durationTimeMins}:${durationTimeSecs}`;
        }
    }
}

// sets the progress bar width where the user clicks on the progress bar container
function setProgressBar(event) {
    console.log(event);
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const { duration } = song;
    song.currentTime = clickX / width * duration;
}

// play or pause event listener
playAndPauseButton.addEventListener('click', () => {
    triggerPauseAndPlay();
});

// event listeneres
nextButton.addEventListener('click', nextSong);
previousButton.addEventListener('click', previousSong);
song.addEventListener('timeupdate', updateProgress);
progressBarContainer.addEventListener('click', setProgressBar);
song.addEventListener('ended', nextSong);
window.addEventListener('keyup', (event) => {
    if (event.keyCode === 32) {
        triggerPauseAndPlay();
    }
    else if (event.keyCode === 39) {
        nextSong();
    }
    else if (event.keyCode === 37) {
        previousSong();
    }
});

