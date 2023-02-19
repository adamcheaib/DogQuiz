"use strict"

async function register_user() {
    loading_alert("Contacting server...");
    await fetch_data("post", "");
};



async function login_user() {
    loading_alert("Contacting server...");
    await fetch_data("get", "");
    get_all_dogs();

    username_field.value = "";
    password_field.value = "";

};


async function accountCheck(event) {

    if (event.target.className === "register_now") {
        await register_user(username_field.value, password_field.value);
        username_field.value = "";
        password_field.value = "";


    } else {
        await login_user();
    };
};
