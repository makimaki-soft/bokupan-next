var res = {
    WelcomePage : "res/image/welcome_logo.png",
    HomeIcon : "res/image/ifn0204.png",
    Favicon : "res/image/favicon.png",
    Screen : "res/image/screen_game.png",
    Koma : "res/image/koma.png",
    House : "res/image/house.png",
    Girl : "res/image/people.png",
    Ajito : "res/image/ajito.png",
    Police : "res/image/police.png",
    Arrow : "res/image/arrowsign.png"
};

var audio = {
    Opening : "res/audio/bokupan_opening.mp3",
    Click : "res/audio/effect_04_click.wav"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
for (var i in audio) {
    g_resources.push(audio[i]);
}
