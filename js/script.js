var body = document.querySelector('.body');
var audio = document.querySelector('.audio-tag');

var music_title = document.querySelector('.music-title');
var record_img = document.querySelector('.record-img');
var artist = document.querySelector('.artist-name');

var progress = document.querySelector('.progress');
var progress_total = document.querySelector('.progress-total');
var progress_play = document.querySelector('.progress-play');

var played_time = document.querySelector('.played-time');
var audio_time = document.querySelector('.audio-time');

var mode = document.querySelector('#play_mode');
var skip_forward = document.querySelector('#skip_forward');
var play_pause = document.querySelector('#play_pause');
var skip_backward = document.querySelector('#skip_backward');
var volume = document.querySelector('#volume');
var volume_togger = document.querySelector('#volumn-togger');
var list = document.querySelector('#list');
var speed = document.querySelector('#speed');

var close_list = document.querySelector('.close-list');
var music_list = document.querySelector('.music-list');

play_pause.addEventListener('click', function() {
    if (audio.paused) {
        audio.play();
        rotateRecord();
        play_pause.classList.remove('play');
        play_pause.classList.add('pause');
    } else {
        audio.pause();
        rotateRecordStop();
        play_pause.classList.remove('pause');
        play_pause.classList.add('play');
    }
});


audio.addEventListener('timeupdate', updateProgress);
function updateProgress() {
    var value = audio.currentTime / audio.duration;
    progress_play.style.width = value * 100 + '%';
    played_time.innerText = transTime(audio.currentTime);
}

function transTime(value) {
    var time = "";
    var h = parseInt(value / 3600);
    value %= 3600;
    var m = parseInt(value / 60);
    var s = parseInt(value % 60);
    if (h > 0) {
        time = formatTime(h + ":" + m + ":" + s);
    } else {
        time = formatTime(m + ":" + s);
    }

    return time;
}

function formatTime(value) {
    var time = "";
    var s = value.split(':');
    var i = 0;
    for (; i < s.length - 1; i++) {
        time += s[i].length == 1 ? ("0" + s[i]) : s[i];
        time += ":";
    }
    time += s[i].length == 1 ? ("0" + s[i]) : s[i];

    return time;
}

progress_total.addEventListener('mousedown', function (event) {
    if (!audio.paused || audio.currentTime != 0) {
        var pgsWidth = parseFloat(window.getComputedStyle(progress_total, null).width.replace('px', ''));
        var rate = event.offsetX / pgsWidth;
        audio.currentTime = audio.duration * rate;
        updateProgress(audio);
    }
});

list.addEventListener('click', function (event) {
    music_list.classList.remove("list-card-hide");
    music_list.classList.add("list-card-show");
    music_list.style.display = "flex";
    close_list.style.display = "flex";
    close_list.addEventListener('click', close_listBoard);
});

function close_listBoard() {
    music_list.classList.remove("list-card-show");
    music_list.classList.add("list-card-hide");
    close_list.style.display = "none";
}

var musicId = 0;

let musicData = [['迷星叫', 'MyGO!!!!!'],
    ['壱雫空', 'MyGO!!!!!'],
    ['碧天伴走', 'MyGO!!!!!'],
    ['影色舞', 'MyGO!!!!!'],
    ['歌いましょう鳴らしましょう', 'MyGO!!!!!'],
    ['潜在表明', 'MyGO!!!!!'],
    ['音一会', 'MyGO!!!!!'],
    ['春日影 (MyGO!!!!! ver.)', 'MyGO!!!!!'],
    ['詩超絆', 'MyGO!!!!!'],
    ['迷路日々', 'MyGO!!!!!'],
    ['無路矢', 'MyGO!!!!!'],
    ['名無声', 'MyGO!!!!!'],
    ['栞', 'MyGO!!!!!']
    ];

function initMusic() {
    audio.src = "./assets/MyGO!!!!!/" + musicData[musicId][0] + ".mp3";
    audio.load();
    record_img.classList.remove('rotate-play');
    audio.ondurationchange = function () {
        music_title.innerText = musicData[musicId][0];
        artist.innerText = musicData[musicId][1];
        audio_time.innerText = transTime(audio.duration);
        audio.currentTime = 0;
        updateProgress();
        refreshRotate();
    }
}
initMusic();

function initAndPlay() {
    initMusic();
    audio.play();
    play_pause.classList.remove('play');
    play_pause.classList.add('pause');
    rotateRecord();
}

let modes = [
    "single",
    "order",
    "random"
]

var modeId = 0;
mode.addEventListener('click', function() {
    modeId = modeId + 1;
    if (modeId > 2) {
        modeId = 0;
    }
    mode.style.backgroundImage = "url('assets/image/icons/" + modes[modeId] + ".png')";
});

audio.addEventListener('ended', function() {
    if (modeId == 1) {
        musicId = (musicId + 1) % 13;
    }
    else if (modeId == 2) {
        var oldId = musicId;
        while (true) {
            musicId = Math.floor(Math.random() * 12) + 0;
            if (musicId != oldId) { break; }
        }
    }
    initAndPlay();
});

skip_backward.addEventListener('click', function() {
    musicId = (musicId + 12) % 13
    initAndPlay();
});

skip_forward.addEventListener('click', function() {
    musicId = (musicId + 1) % 13;
    initAndPlay();
});

speed.addEventListener('click', function (event) {
    var speedText = speed.innerText;
    if (speedText == "1.0X") {
        speed.innerText = "1.5X";
        audio.playbackRate = 1.5;
    }
    else if (speedText == "1.5X") {
        speed.innerText = "2.0X";
        audio.playbackRate = 2.0;
    }
    else if (speedText == "2.0X") {
        speed.innerText = "0.5X";
        audio.playbackRate = 0.5;
    }
    else if (speedText == "0.5X") {
        speed.innerText = "1.0X";
        audio.playbackRate = 1.0;
    }
});


document.getElementById("song0").addEventListener('click', function (event) {
    musicId = 0;
    initAndPlay();
});
document.getElementById("song1").addEventListener('click', function (event) {
    musicId = 1;
    initAndPlay();
});
document.getElementById("song2").addEventListener('click', function (event) {
    musicId = 2;
    initAndPlay();
});
document.getElementById("song3").addEventListener('click', function (event) {
    musicId = 3;
    initAndPlay();
});
document.getElementById("song4").addEventListener('click', function (event) {
    musicId = 4;
    initAndPlay();
});
document.getElementById("song5").addEventListener('click', function (event) {
    musicId = 5;
    initAndPlay();
});
document.getElementById("song6").addEventListener('click', function (event) {
    musicId = 6;
    initAndPlay();
});
document.getElementById("song7").addEventListener('click', function (event) {
    musicId = 7;
    initAndPlay();
});

document.getElementById("song8").addEventListener('click', function (event) {
    musicId = 8;
    initAndPlay();
});
document.getElementById("song9").addEventListener('click', function (event) {
    musicId = 9;
    initAndPlay();
});
document.getElementById("song10").addEventListener('click', function (event) {
    musicId = 10;
    initAndPlay();
});
document.getElementById("song11").addEventListener('click', function (event) {
    musicId = 11;
    initAndPlay();
});
document.getElementById("song12").addEventListener('click', function (event) {
    musicId = 12;
    initAndPlay();
});

function refreshRotate() {
    record_img.classList.add('rotate-play');
}

function rotateRecord() {
    record_img.style.animationPlayState = "running"
}

function rotateRecordStop() {
    record_img.style.animationPlayState = "paused"
}

var last_volume = 50

audio.addEventListener('timeupdate', function() {
    audio.volume = volume_togger.value / 100;
});

volume.addEventListener('click', function() {
    if (volume_togger.value == 0) {
        if (last_volume == 0) {
            last_volume = 50;
        }
        volume_togger.value = last_volume;
        volume.style.backgroundImage = "url('assets/image/icons/volume.png')";
    }
    else {
        last_volume = volume_togger.value;
        volume_togger.value = 0;
        volume.style.backgroundImage = "url('assets/image/icons/mute.png')";
    }
});