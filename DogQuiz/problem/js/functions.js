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

async function register_user(username_value, password_value) {

    try {
        const user_to_register = { action: "register", user_name: username_value, password: password_value };
        const send_user = { method: "POST", headers: { "Content-type": "application/json; charset=UTF-8" }, body: JSON.stringify(user_to_register) };
        const fly_away_user = await (await fetch(new Request(`https://teaching.maumt.se/apis/access/`, send_user))).json();
        console.log(fly_away_user.json())
    } catch (error) {
        console.log(error);
        // register_user(username_value, password_value);
    }
};

async function login_user(username_value, password_value) {
    console.log(username_value)
    console.log(password_value)
    try {
        const user = await fetch(new Request(`https://www.teaching.maumt.se/apis/access/prefix?action=check_credentials&username=${username_value}&password=${password_value}`));
        const full_user = await user.json();
        console.log(user);
        console.log(full_user)
    } catch (error) {
        console.log(error);
        // login_user(username_value, password_value);
    }
}


async function accountCheck(event) {

    if (event.target.className === "register_now") {
        const username_field = document.querySelector("#user_inputs .input_fields > input");
        const password_field = document.querySelector("#user_inputs > .input_fields:nth-child(4) > input");

        await register_user(username_field.value, password_field.value);

    } else {
        const username_field = document.querySelector("#user_inputs .input_fields > input");
        const password_field = document.querySelector("#user_inputs > .input_fields:nth-child(4) > input");
        console.log(username_field.value)
        console.log(password_field.value)

        await login_user(username_field.value, password_field.value);

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

    }
};










/* QUIZ PART */

function get_wrong_dogs() {
    const three_alternatives = document.querySelectorAll(".alternative");
    const number_array = []

    while (3 > number_array.length) {
        let random_number = Math.floor(Math.random() * three_alternatives.length);
        if (!number_array.includes(random_number)) {
            number_array.push(random_number)
        };
    }

    number_array.forEach(number => {
        three_alternatives[number].classList.add("wrong");
        const wrong_random_dog = ALL_BREEDS[Math.floor(Math.random() * ALL_BREEDS.length)];
        three_alternatives[number].textContent = wrong_random_dog.name
    });
}




async function get_all_dogs() {


    const random_dog = ALL_BREEDS[Math.floor(Math.random() * ALL_BREEDS.length)];

    async function get_correct_dog(dog_object) {

        document.querySelector("#dog_image").style.backgroundImage = `url(./media/logo.png)`;

        try {

            let fetched_dog = await (await fetch(new Request(`https://dog.ceo/api/breed/${dog_object.url}/images/random`))).json();
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
        };

    };

    await get_correct_dog(random_dog);

    function add_answer_check(dog_object) {
        document.querySelectorAll(".alternative").forEach(item => item.addEventListener("click", check_answer));

        function check_answer(event) {

            if (event.target.textContent === dog_object.name) {

                alert("Your answer is CORRECT!");
                document.querySelectorAll(".alternative").forEach(item => {
                    item.classList.remove("wrong");
                    item.classList.remove("correct");
                    item.removeEventListener("click", check_answer);
                    item.textContent = "";
                });
                get_all_dogs();
            } else {
                alert("Your answer is WRONG!")
                document.querySelectorAll(".alternative").forEach(item => {
                    item.classList.remove("wrong");
                    item.classList.remove("correct");
                    item.removeEventListener("click", check_answer);
                    item.textContent = "";
                });
                get_all_dogs();
            }
        }
    };
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

    setTimeout(play_sound, 2700, rickroll);
};