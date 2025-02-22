const songs = [
    { title: "Song 1", src: "Songs/alone-296348.mp3" },
    { title: "Song 2", src: "Songs/chant-268684.mp3" },
    { title: "Song 3", src: "Songs/freesilla-x-karma030-type-beat-kugelsicher-by-tremoxbeatz-302838.mp3" },
];

let currentSongIndex = 0;
const audio = document.getElementById('audio');
const audioSource = document.getElementById('audio-source');
const playlist = document.getElementById('playlist');
const searchInput = document.getElementById('search');
const volumeControl = document.getElementById('volume');

function loadPlaylist() {
    playlist.innerHTML = '';
    songs.forEach((song, index) => {
        const songDiv = document.createElement('div');
        songDiv.textContent = song.title;
        songDiv.addEventListener('click', () => {
            currentSongIndex = index;
            playSong();
        });
        playlist.appendChild(songDiv);
    });
}

function playSong() {
    audioSource.src = songs[currentSongIndex].src;
    audio.load();
    audio.play();
}

document.getElementById('play').addEventListener('click', () => {
    audio.play();
});

document.getElementById('pause').addEventListener('click', () => {
    audio.pause();
});

document.getElementById('next').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong();
});

document.getElementById('prev').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong();
});

volumeControl.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// Search functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredSongs = songs.filter(song => song.title.toLowerCase().includes(searchTerm));
    playlist.innerHTML = '';
    filteredSongs.forEach((song, index) => {
        const songDiv = document.createElement('div');
        songDiv.textContent = song.title;
        songDiv.addEventListener('click', () => {
            currentSongIndex = songs.indexOf(song);
            playSong();
        });
        playlist.appendChild(songDiv);
    });
});

// Load the initial playlist
loadPlaylist();