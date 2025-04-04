const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const albumCover = document.getElementById('album-cover');

const songs = [
    {
        title: 'Song 1',
        artist: 'Artist 1',
        src: 'song1.mp3',
        cover: 'cover1.jpg'
    },
    {
        title: 'Song 2',
        artist: 'Artist 2',
        src: 'song2.mp3',
        cover: 'cover2.jpg'
    },
    {
        title: 'Song 3',
        artist: 'Artist 3',
        src: 'song3.mp3',
        cover: 'cover3.jpg'
    }
];

let currentSongIndex = 0;
let isPlaying = false;
let audio = new Audio(songs[currentSongIndex].src);

const loadSong = (index) => {
    audio.src = songs[index].src;
    songTitle.textContent = songs[index].title;
    songArtist.textContent = songs[index].artist;
    albumCover.src = songs[index].cover;
};

const playSong = () => {
    isPlaying = true;
    audio.play();
    playBtn.textContent = 'Pause';
};

const pauseSong = () => {
    isPlaying = false;
    audio.pause();
    playBtn.textContent = 'Play';
};

playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
        playSong();
    }
});

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
        playSong();
    }
});

audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
});

progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

loadSong(currentSongIndex);
