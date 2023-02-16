"use strict"

function change_text_content(css_selector, content) {
    let dom_element = document.querySelector(css_selector);
    dom_element.textContent = content;
};

function consolelogger1(event) {

    if (event.target.classList.contains("register_now")) {

        console.log("REGISTERED")


    } else {
        console.log("LOGGED ON");
    }
};


function css_page_change(event) {
    if (!event.target.classList.contains("registration")) {
        event.target.classList.add("registration");
        event.target.textContent = "Already have an account? Go to login";
        change_text_content("#user_interaction > span", "Ready when you are...");
        change_text_content("#user_inputs > h1", "REGISTER");
        change_text_content("#login_button", "Register");

        // document.querySelector("#login_button").removeEventListener("click", consolelogger2);
        document.querySelector("#login_button").classList.add("register_now");
        document.querySelector("#login_button").classList.remove("login_now");
    } else {
        event.target.classList.remove("registration");
        event.target.textContent = "New to this? Register for free";
        change_text_content("#user_interaction > span", "Let the magic start!");
        change_text_content("#user_inputs > h1", "LOGIN");
        change_text_content("#login_button", "Login");
        document.querySelector("#login_button").classList.remove("register_now");
        document.querySelector("#login_button").classList.add("login_now");
    };
};

