// console.log("Welcome to Spotify Clone!");

// Initialize the variables
let masterPlay = document.getElementById('masterPlay');
let songIndex = 0;
let audioElem = new Audio('./Utilities/Daylight David.mp3');
let masterSong = document.getElementById('masterSongName');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songitem'))

let songs = [
    {songName: 'Hoist The Colors', filePath: './Utilities/songs/1.mp3', coverPath: './Utilities/covers/1.jpg'},
    {songName: 'Lovely', filePath: './Utilities/songs/2.mp3', coverPath: './Utilities/covers/2.jpg'},
    {songName: 'Past Lives', filePath: './Utilities/songs/3.mp3', coverPath: './Utilities/covers/3.jpg'},
    {songName: 'Running Up That Hill', filePath: './Utilities/songs/4.mp3', coverPath: './Utilities/covers/4.jpg'},
    {songName: 'Turn Off The Phone', filePath: './Utilities/songs/5.mp3', coverPath: './Utilities/covers/5.jpg'}
];

songItems.forEach((element, ind) => {
    element.getElementsByTagName('img')[0].src = songs[ind].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[ind].songName;
});

// Handle Play/Pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElem.paused || audioElem.currentTime <= 0){
        audioElem.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElem.pause();
        masterPlay.classList.add('fa-circle-play');
        masterPlay.classList.remove('fa-circle-pause');
        gif.style.opacity = 0;

    }
})

// Event Listeners
audioElem.addEventListener('timeupdate',()=>{
    // Update Progress Bar
    progress = parseInt((audioElem.currentTime / audioElem.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', ()=>{
    audioElem.currentTime = (myProgressBar.value * audioElem.duration) /  100;
});

const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
        gif.style.opacity = 1;

    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (event)=>{
        songIndex = parseInt(event.target.id);
        masterSong.innerText = songs[songIndex].songName
        makeAllPlays();
        event.target.classList.remove('fa-circle-play');
        event.target.classList.add('fa-circle-pause');
        audioElem.src = `./Utilities/songs/${songIndex + 1}.mp3`;
        audioElem.currentTime = 0;
        audioElem.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    });
});

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex >= 5){
        songIndex = 0
    }
    else{
        songIndex = songIndex + 1;
    }
    audioElem.src = `./Utilities/songs/${songIndex + 1}.mp3`;
    masterSong.innerText = songs[songIndex].songName
    audioElem.currentTime = 0;
    audioElem.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

});

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex <= 0){
        songIndex = 0
    }
    else{
        songIndex = songIndex - 1;
    }
    audioElem.src = `./Utilities/songs/${songIndex + 1}.mp3`;
    masterSong.innerText = songs[songIndex].songName
    audioElem.currentTime = 0;
    audioElem.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});
