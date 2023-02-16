let test = document.querySelector(".one");

let doggo = new Audio();
doggo.src = "./media/audio/background.mp3";

function play_doggo() {
    doggo.play();
}

document.querySelector("#login_button").addEventListener("click", play_doggo);