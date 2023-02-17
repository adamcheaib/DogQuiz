"use strict"


function change_text_content(css_selector, content) {
    let dom_element = document.querySelector(css_selector);
    dom_element.textContent = content;
};

function class_manipulation(dom_reference, class_name, action) {
    if (action === "add") {
        document.querySelector(dom_reference).classList.add(class_name)
    };

    if (action === "remove") {
        document.querySelector(dom_reference).classList.remove(class_name)
    }

    if (action === "edit") {
        document.querySelector(dom_reference).className = class_name
    };
}


function css_register_login_change(event) {
    if (event.target.className !== "registration") {

        event.target.className = "registration";
        event.target.textContent = "Already have an account? Go to login";

        change_text_content("#user_interaction > span", "Ready when you are...");
        change_text_content("#user_inputs > h1", "REGISTER");
        change_text_content("#login_button", "Register");

        class_manipulation("#wrapper", "to_registration_page", "edit")
        class_manipulation("#login_button", "register_now", "edit");

    } else {

        event.target.className = "login_page";
        event.target.textContent = "New to this? Register for free";

        change_text_content("#user_interaction > span", "Let the magic start!");
        change_text_content("#user_inputs > h1", "LOGIN");
        change_text_content("#login_button", "Login");

        class_manipulation("#login_button", "login_now", "edit");
        class_manipulation("#wrapper", "to_login_page", "edit");

    };
};

function accountCheck(event) {

    if (event.target.className === "register_now") {

        console.log("REGISTERED")
        window.localStorage.setItem("username", username_field.value);
        window.localStorage.setItem("password", password_field.value);
        username_field.value = "";
        password_field.value = "";
        console.log(window.localStorage);


    } else {

        if (username_field.value === "adam" && password_field.value === "rasta") {
            document.querySelector(".css_file").setAttribute("href", "./css/quiz.css")
            username_field.value = "";
            password_field.value = "";
            rickroll.pause();
            quiz_BGM.play()

        } else {
            console.log("No such user found!")
            username_field.value = "";
            password_field.value = "";
        }

    }
};


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


/* MISC FUNCTIONS */

function audio_picker(source) {
    let new_audio = document.querySelector(source)
    return new_audio
};

function play_sound(sound) {
    sound.play();
};

function pause_sound(sound) {
    sound.pause();
};

function click_to_play(event) {

    play_sound(clickSound);
    class_manipulation(".css_file", "introduction", "remove");
    class_manipulation(".css_file", "loggo_on", "add");
    document.querySelector(".css_file").setAttribute("href", "./css/login_register.css");

    setTimeout(play_sound, 2200, rickroll);
};