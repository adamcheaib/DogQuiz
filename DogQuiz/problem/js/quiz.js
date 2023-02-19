"use strict"

document.querySelector("#logout > button").addEventListener("click", logout_user);

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

    loading_alert("Fetching image...");

    const correct_dog = await get_correct_dog();
    get_wrong_dogs();

    const correct_choice = document.querySelector("#choices > :not(.wrong)");
    correct_choice.textContent = correct_dog.dog_name;
    correct_choice.classList.add("correct");


    document.querySelector("#dog_image").style.backgroundImage = `url(${correct_dog.background_link})`;
    document.querySelector("#dog_image").style.backgroundSize = "cover";
    document.querySelector("#dog_image").style.backgroundPosition = "center";

    remove_alert();

    document.querySelectorAll(".alternative").forEach(item => item.addEventListener("click", check_answer));



    function check_answer(event) {

        if (event.target.textContent === correct_dog.dog_name) {
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

async function get_correct_dog() {
    const random_dog = ALL_BREEDS[Math.floor(Math.random() * ALL_BREEDS.length)];
    let correct_dog = await fetch_data("dog", random_dog);
    return correct_dog;
};