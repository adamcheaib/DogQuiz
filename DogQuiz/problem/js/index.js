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

let random_dog = ALL_BREEDS[Math.floor(Math.random() * ALL_BREEDS.length - 1)];

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

/*(Det där uppe) Kanske ta bort allt där uppe och spara till senare! */

const username_field = document.querySelector("#user_inputs .input_fields > input");
const password_field = document.querySelector("#user_inputs > .input_fields:nth-child(4) > input");
console.log(username_field);
console.log(password_field);

console.log(window.localStorage);
console.log(window.localStorage.clear())
username_field.value = "";
password_field.value = "";

document.querySelector("#already_or_newAccount").addEventListener("click", css_register_login_change);

document.querySelector("#login_button").addEventListener("click", consolelogger1); // Behöver ändra funktionen

