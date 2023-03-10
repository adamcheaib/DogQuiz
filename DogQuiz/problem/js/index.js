"use strict"

/*
Skapa designen först för varje sida genom att lägga alla HTML-element som behöver finnas och de som ej behöver synas
och synas beroende på vilken class det är som aktiverat.
*/

const username_field = document.querySelector("#user_inputs .input_fields > input");
const password_field = document.querySelector("#user_inputs > .input_fields:nth-child(4) > input");
// get_all_dogs();


/*(Det där uppe) Kanske ta bort allt där uppe och spara till senare! */

username_field.value = "";
password_field.value = "";

console.log(window.localStorage)

document.querySelector("#already_or_newAccount").addEventListener("click", css_register_login_change);

document.querySelector("#login_button").addEventListener("click", accountCheck);

document.querySelector(".play_click").addEventListener("click", click_to_play);

document.querySelector("#logout > button").addEventListener("click", logout_user);