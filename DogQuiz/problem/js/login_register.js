"use strict"

async function register_user() {
    loading_alert("Contacting server...");
    await fetch_data("post", "");
};

async function login_user() {
    loading_alert("Contacting server...");
    let response_promise = await fetch_data("get", "");

    if (response_promise.status === 418) {
        create_alert("error", response_promise.statusText);
    };

    if (response_promise.status === 404 || response_promise.status === 400) {
        document.querySelector("#user_interaction > span").textContent = "Wrong username or password";
        document.querySelector("#user_interaction > span").style.backgroundColor = "red";
        remove_alert();
    };

    if (response_promise.status === 200) {
        let resource = await response_promise.json();
        remove_alert();
        get_all_dogs();

        window.localStorage.setItem("password", resource.data.password);
        window.localStorage.setItem("username", resource.data.user_name);


        document.querySelector(".css_file").setAttribute("href", "./css/quiz.css");
        document.querySelector("#logout_text").textContent = window.localStorage.getItem("username");

        rickroll.pause();
        rickroll.currentTime = 0;
        quiz_BGM.currentTime = 0;
        quiz_BGM.play();

        return resource;

    };



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
