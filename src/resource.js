var res = {
    WelcomePage : "res/welcome_logo.png",
    HomeIcon : "res/ifn0204.png",
    Favicon : "res/favicon.png"
};

var audio = {
    Opening : "audio/bokupan_opening.mp3" 
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
for (var i in audio) {
    g_resources.push(audio[i]);
}
