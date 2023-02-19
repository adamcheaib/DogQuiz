"use strict"

// FORTSÄTT RAD 255!

/* GENERAL FUNCTIONS */

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

function create_alert(status, error_message) {
    document.querySelector(".white_cover > div").innerHTML = `<span class="response_popup_box"></span>
    <button class="popup_button "></button>`
    class_manipulation(".white_cover", "hide_alert", "remove");
    class_manipulation(".white_cover", "show_alert", "add");


    if (status === "correct answer") {
        change_text_content(".response_popup_box", "CORRECT!");
        change_text_content(".popup_button", "ONE MORE");
        document.querySelector(".white_cover > div").style.backgroundColor = "lightgreen";
        document.querySelector(".popup_button").addEventListener("click", new_dogs_after_answer);
    };

    if (status === "wrong answer") {
        change_text_content(".response_popup_box", "WRONG! :(");
        change_text_content(".popup_button", "ONE MORE");
        document.querySelector(".white_cover > div").style.backgroundColor = "darkred";
        document.querySelector(".popup_button").addEventListener("click", new_dogs_after_answer);
    }

    if (status === "error") {
        class_manipulation(".white_cover", "show_alert", "add");
        class_manipulation(".white_cover", "hide_alert", "remove");
        document.querySelector(".white_cover > div").innerHTML = `<span class="response_popup_box" style="font-size: 1.4rem">${error_message}</span>
        <button class="popup_button" style="font-size: 1.5rem">CLOSE</button>`;
        document.querySelector(".white_cover > div").style.backgroundColor = "white";
        document.querySelector(".white_cover > div").style.gap = "40px";
        document.querySelector(".popup_button").addEventListener("click", close_popup_box);
        username_field.value = "";
        password_field.value = "";
    };

    function close_popup_box(event) {
        remove_alert();
        event.target.removeEventListener("click", close_popup_box);
    };

    function new_dogs_after_answer(event) {
        close_popup_box(event);
        document.querySelectorAll(".alternative").forEach(item => item.textContent = "");
        event.target.removeEventListener("click", new_dogs_after_answer);
        get_all_dogs();
    };
};

function remove_alert() {
    class_manipulation(".white_cover", "hide_alert", "add");
    class_manipulation(".white_cover", "show_alert", "remove");
};

function loading_alert(content) {
    class_manipulation(".white_cover", "show_alert", "add");
    class_manipulation(".white_cover", "hide_alert", "remove");

    document.querySelector(".white_cover > div").style.backgroundColor = "white";
    document.querySelector(".white_cover > div").style.border = "1px solid gray";
    document.querySelector(".white_cover > div").style.justifyContent = "center";
    document.querySelector(".white_cover > div").innerHTML = `<div>${content}</div>`;
};








/* LOGIN/REGISTER SECTION */


function css_register_login_change(event) {
    if (event.target.className !== "registration") {

        event.target.className = "registration";
        event.target.textContent = "Already have an account? Go to login";

        change_text_content("#user_interaction > span", "Ready when you are...");
        change_text_content("#user_inputs > h1", "REGISTER");
        change_text_content("#login_button", "Register");

        class_manipulation("#wrapper", "to_registration_page", "edit")
        class_manipulation("#login_button", "register_now", "edit");
        document.querySelector("#user_interaction > span").style.backgroundColor = "";

        username_field.value = "";
        password_field.value = "";

    } else {

        event.target.className = "login_page";
        event.target.textContent = "New to this? Register for free";

        change_text_content("#user_interaction > span", "Let the magic start!");
        change_text_content("#user_inputs > h1", "LOGIN");
        change_text_content("#login_button", "Login");

        class_manipulation("#login_button", "login_now", "edit");
        class_manipulation("#wrapper", "to_login_page", "edit");
        document.querySelector("#user_interaction > span").style.backgroundColor = "";

        username_field.value = "";
        password_field.value = "";

    };
};









/* QUIZ PART */













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

async function click_to_play(event) {

    if (window.localStorage.length === 2) {
        clickSound.play();
        await fetch_data("get", "");



        // try {
        //     let log_user_in = await fetch(new Request(`https://www.teaching.maumt.se/apis/access/?action=check_credentials&user_name=${window.localStorage.username}&password=${window.localStorage.password}`));
        //     console.log(log_user_in);
        //     if (log_user_in.status === 200) {
        //         document.querySelector(".css_file").setAttribute("href", "./css/quiz.css");
        //         setTimeout(play_sound, 200, quiz_BGM);
        //         get_all_dogs();
        //         document.querySelector("#logout_text").textContent = `${window.localStorage.username}`;
        //     };
        // } catch (error) {
        //     create_alert("error", error.message);
        // }
    } else {
        play_sound(clickSound);
        class_manipulation(".css_file", "introduction", "remove");
        class_manipulation(".css_file", "loggo_on", "add");
        document.querySelector(".css_file").setAttribute("href", "./css/login_register.css");
        setTimeout(play_sound, 2700, rickroll);
    };

};


