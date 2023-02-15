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



let random_dog = ALL_BREEDS[Math.floor(Math.random() * ALL_BREEDS.length)];

async function get_dog(dog_object) {
    try {
        let dog = await (await fetch(new Request(`https://dog.ceo/api/breed/${dog_object.url}/images/random`))).json();
        console.log(dog);
        document.querySelector("#dog_image").style.backgroundImage = `url(${dog.message})`;
        document.querySelector("#dog_image").style.backgroundSize = "cover";
        document.querySelector("#dog_image").style.backgroundPosition = "center";
    } catch (error) {
        console.log(error);
    }
};

get_dog(random_dog);