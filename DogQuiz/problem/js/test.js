let test = document.querySelector(".one");

let doggo = new Audio();
doggo.src = "./media/audio/background.mp3";

function play_doggo() {
    doggo.play();
    document.querySelector(".doggo").style.opacity = "100%";
    document.querySelector(".doggo").style.transitionProperty = "opacity";
    document.querySelector(".doggo").style.transitionDuration = "1s";
}

document.querySelector("#login_button").addEventListener("click", play_doggo);