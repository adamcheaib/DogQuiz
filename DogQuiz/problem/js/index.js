"use strict"

/*
Skapa designen först för varje sida genom att lägga alla HTML-element som behöver finnas och de som ej behöver synas
och synas beroende på vilken class det är som aktiverat.



Hur man ändrar CSS:
function change_css(event) {
    let new_css_source = document.createElement("link");
    new_css_source.innerHTML = `<link rel="stylesheet" href="./css/index.css">`;
    document.querySelector("head").appendChild(new_css_source);
    document.querySelector("#haha").remove()
};


*/



let random_dog = Math.floor(Math.random() * ALL_BREEDS.length);
console.log(random_dog);