"use strict"

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
        document.querySelector(".popup_button").addEventListener("click", answer_popup);
    };

    if (status === "wrong answer") {
        change_text_content(".response_popup_box", "WRONG! :(");
        change_text_content(".popup_button", "ONE MORE");
        document.querySelector(".white_cover > div").style.backgroundColor = "darkred";
        document.querySelector(".popup_button").addEventListener("click", answer_popup);
    }

    if (status === "error") {
        class_manipulation(".white_cover", "show_alert", "add");
        class_manipulation(".white_cover", "hide_alert", "remove");
        document.querySelector(".white_cover > div").innerHTML = `<span class="response_popup_box" style="font-size: 1.4rem">${error_message}</span>
        <button class="popup_button" style="font-size: 1.5rem">CLOSE</button>`;
        document.querySelector(".popup_button").addEventListener("click", close_popup_box);
        username_field.value = "";
        password_field.value = "";

    };

    function close_popup_box(event) {
        class_manipulation(".white_cover", "show_alert", "remove");
        class_manipulation(".white_cover", "hide_alert", "add");
        event.target.removeEventListener("click", close_popup_box);
    };

    function answer_popup(event) {
        close_popup_box(event)

        document.querySelectorAll(".alternative").forEach(item => item.textContent = "")

        event.target.removeEventListener("click", answer_popup);
        get_all_dogs();
    };
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

    } else {

        event.target.className = "login_page";
        event.target.textContent = "New to this? Register for free";

        change_text_content("#user_interaction > span", "Let the magic start!");
        change_text_content("#user_inputs > h1", "LOGIN");
        change_text_content("#login_button", "Login");

        class_manipulation("#login_button", "login_now", "edit");
        class_manipulation("#wrapper", "to_login_page", "edit");
        document.querySelector("#user_interaction > span").style.backgroundColor = "";

    };
};

async function register_user(username_value, password_value) {

    try {
        const user_to_register = { action: "register", user_name: username_value, password: password_value };
        const user_to_send = { method: "POST", headers: { "Content-type": "application/json; charset=UTF-8" }, body: JSON.stringify(user_to_register) };
        const fly_away_user = await fetch(new Request(`https://teaching.maumt.se/apis/access/`, user_to_send));
        console.log(fly_away_user);
        const user_returned = await fly_away_user.json();
        console.log(user_returned);

        if (!fly_away_user.ok) {
            document.querySelector("#user_interaction > span").style.backgroundColor = "red";
            change_text_content("#user_interaction > span", "Username already taken");
        };

    } catch (error) {
        console.log(error);
    }
};



async function login_user(username_value, password_value) {
    loading_alert("Contacting server...");

    try {
        const user = await fetch(new Request(`https://www.teaching.maumt.se/apis/access/?action=check_credentials&user_name=${username_value}&password=${password_value}`));
        console.log(user);
        username_field.value = "";
        password_field.value = "";

        if (user.ok) {
            window.localStorage.setItem("username", username_value);
            window.localStorage.setItem("password", password_value);
            console.log(window.localStorage);
            get_all_dogs()
            class_manipulation(".white_cover", "hide_alert", "add");
            class_manipulation(".white_cover", "show_alert", "remove");
            document.querySelector(".css_file").setAttribute("href", "./css/quiz.css");
            rickroll.pause();
            quiz_BGM.play();
            document.querySelector("#logout_text").textContent = `${window.localStorage.username}`;
        } else {
            change_text_content("#user_interaction > span", "Wrong username or password");
            document.querySelector("#user_interaction > span").style.backgroundColor = "red";
            class_manipulation(".white_cover", "show_alert", "remove");
            class_manipulation(".white_cover", "hide_alert", "add");
        };
    } catch (error) {
        console.log(error);
        create_alert("error", error.message)
    }
}




async function accountCheck(event) {


    if (event.target.className === "register_now") {
        await register_user(username_field.value, password_field.value);
        username_field.value = "";
        password_field.value = "";

    } else {

        await login_user(username_field.value, password_field.value);
        // rickroll.pause();
        // quiz_BGM.play();

        // if (username_field.value === "adam" && password_field.value === "rasta") {
        //     document.querySelector(".css_file").setAttribute("href", "./css/quiz.css")
        //     username_field.value = "";
        //     password_field.value = "";
        //     rickroll.pause();
        //     quiz_BGM.play();

        // } else {
        //     console.log("No such user found!")
        //     username_field.value = "";
        //     password_field.value = "";
        // }

    };
};










/* QUIZ PART */

function get_wrong_dogs() {
    const three_alternatives = document.querySelectorAll(".alternative");
    const index_numbers = []

    while (3 > index_numbers.length) {
        let random_number = Math.floor(Math.random() * three_alternatives.length);
        if (!index_numbers.includes(random_number)) {
            index_numbers.push(random_number)
        };
    };

    index_numbers.forEach(number => {
        three_alternatives[number].classList.add("wrong");
        const wrong_random_dog = ALL_BREEDS[Math.floor(Math.random() * ALL_BREEDS.length)];
        three_alternatives[number].textContent = wrong_random_dog.name
    });
};


async function get_all_dogs() {


    const random_dog = ALL_BREEDS[Math.floor(Math.random() * ALL_BREEDS.length)];
    loading_alert("Fetching image...");
    async function get_correct_dog(dog_object) {
        document.querySelector("#dog_image").style.backgroundImage = `url(./media/logo.png)`;

        try {
            let fetched_dog = await (await fetch(new Request(`https://dog.ceo/api/breed/${dog_object.url}/images/random`))).json();
            class_manipulation(".white_cover", "show_alert", "remove");
            class_manipulation(".white_cover", "hide_alert", "add");
            get_wrong_dogs();

            document.querySelector("#dog_image").style.backgroundImage = `url(${fetched_dog.message})`;
            document.querySelector("#dog_image").style.backgroundSize = "cover";
            document.querySelector("#dog_image").style.backgroundPosition = "center";

            const correct_choice = document.querySelector("#choices > :not(.wrong)");
            correct_choice.classList.add("correct");
            correct_choice.textContent = dog_object.name;
            add_answer_check(dog_object);

        } catch (error) {
            console.log(error);
            get_all_dogs();
        };

    };

    await get_correct_dog(random_dog);


    function add_answer_check(dog_object) {
        document.querySelectorAll(".alternative").forEach(item => item.addEventListener("click", check_answer));

        function check_answer(event) {

            if (event.target.textContent === dog_object.name) {
                bingoo.play();
                create_alert("correct answer");
                document.querySelectorAll(".alternative").forEach(item => {
                    item.classList.remove("wrong");
                    item.classList.remove("correct");
                    item.removeEventListener("click", check_answer);
                });
            } else {
                create_alert("wrong answer")
                document.querySelectorAll(".alternative").forEach(item => {
                    item.classList.remove("wrong");
                    item.classList.remove("correct");
                    item.removeEventListener("click", check_answer);
                });
            };
        };
    };
};


function logout_user() {

    window.localStorage.clear();
    console.log(window.localStorage);
    document.querySelector(".css_file").setAttribute("href", "./css/login_register.css");
    quiz_BGM.pause();
    rickroll.currentTime = 0;
    quiz_BGM.currentTime = 0;
    change_text_content("#user_interaction > span", "Let the magic begin");
    document.querySelector("#user_interaction > span").style.backgroundColor = "";
    setTimeout(
        play_sound, 2700, rickroll
    )

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

async function click_to_play(event) {

    if (window.localStorage.length === 2) {
        try {
            let log_user_in = await fetch(new Request(`https://www.teaching.maumt.se/apis/access/?action=check_credentials&user_name=${window.localStorage.username}&password=${window.localStorage.password}`));
            if (log_user_in.ok) {
                document.querySelector(".css_file").setAttribute("href", "./css/quiz.css");
                quiz_BGM.play();
                get_all_dogs();
                document.querySelector("#logout_text").textContent = `${window.localStorage.username}`;
            };
        } catch (error) {
            create_alert("error", error.message);
        }
    } else {
        play_sound(clickSound);
        class_manipulation(".css_file", "introduction", "remove");
        class_manipulation(".css_file", "loggo_on", "add");
        document.querySelector(".css_file").setAttribute("href", "./css/login_register.css");
        setTimeout(play_sound, 2700, rickroll);
    };

};