"use strict"


document.querySelector("#logout > button").addEventListener("click", logout_user);

async function get_all_dogs() {
    const dog_index_array = [];
    document.querySelector("#dog_image").src = "./media/logo.png";
    loading_alert("Fetching image...");

    while (dog_index_array.length < 4) {
        let random_number = Math.floor(Math.random() * ALL_BREEDS.length);
        if (!dog_index_array.includes(random_number)) {
            dog_index_array.push(random_number);
        };
    };

    const correct_dog = await fetch_data("dog", ALL_BREEDS[dog_index_array[0]]);
    dog_index_array.splice(0, 1);

    if (correct_dog.server_response.status === 200) {
        remove_alert();

        const three_wrong_alternatives = document.querySelectorAll(".alternative");
        const index_numbers = [];

        while (index_numbers.length < 3) {
            let random_number = Math.floor(Math.random() * three_wrong_alternatives.length);
            if (!index_numbers.includes(random_number)) {
                index_numbers.push(random_number);
            };
        };


        for (let i = 0; i < index_numbers.length; i++) {
            three_wrong_alternatives[index_numbers[i]].classList.add("wrong");
            const wrong_random_dog = ALL_BREEDS[dog_index_array[i]].name;
            three_wrong_alternatives[index_numbers[i]].textContent = wrong_random_dog;
        };

        const correct_dog_name = correct_dog.dog_name;
        const dog_url = await correct_dog.server_response.json();
        const correct_choice = document.querySelector("#choices > :not(.wrong)");

        correct_choice.textContent = correct_dog_name;
        correct_choice.classList.add("correct");

        document.querySelector("#dog_image").src = dog_url.message;

        document.querySelectorAll(".alternative").forEach(item => item.addEventListener("click", check_answer));

        function check_answer(event) {

            if (event.target.textContent === correct_dog_name) {
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

    } else {
        create_alert("error", fetched_dog.statusText);
        get_all_dogs();
    };


};


// async function get_all_dogs() {

//     loading_alert("Fetching image...");

//     const random_dog = ALL_BREEDS[Math.floor(Math.random() * ALL_BREEDS.length)];

//     const fetched_dog = await get_correct_dog("dog", random_dog);

//     if (fetched_dog.server_response.status === 200) {
//         remove_alert();
//         // get_wrong_dogs();
//         const correct_dog_name = fetched_dog.dog_name;
//         const dog_url = await fetched_dog.server_response.json();
//         const correct_choice = document.querySelector("#choices > :not(.wrong)");

//         correct_choice.textContent = fetched_dog.dog_name;
//         correct_choice.classList.add("correct");

//         document.querySelector("#dog_image").src = dog_url.message;

//         document.querySelectorAll(".alternative").forEach(item => item.addEventListener("click", check_answer));

//         function check_answer(event) {

//             if (event.target.textContent === correct_dog_name) {
//                 bingoo.play();
//                 create_alert("correct answer");
//                 document.querySelectorAll(".alternative").forEach(item => {
//                     item.classList.remove("wrong");
//                     item.classList.remove("correct");
//                     item.removeEventListener("click", check_answer);
//                 });
//             } else {
//                 create_alert("wrong answer")
//                 document.querySelectorAll(".alternative").forEach(item => {
//                     item.classList.remove("wrong");
//                     item.classList.remove("correct");
//                     item.removeEventListener("click", check_answer);
//                 });
//             };
//         };

//     } else {
//         create_alert("error", fetched_dog.statusText);
//         get_all_dogs();
//     };


// };


function logout_user() {

    window.localStorage.clear();

    document.querySelector(".css_file").setAttribute("href", "./css/login_register.css");
    quiz_BGM.pause();
    rickroll.currentTime = 0;
    quiz_BGM.currentTime = 0;

    username_field.value = "";
    password_field.value = "";

    change_text_content("#user_interaction > span", "Let the magic begin");
    document.querySelector("#user_interaction > span").style.backgroundColor = "";


    setTimeout(
        play_sound, 2700, rickroll
    );

    class_manipulation(".correct", "correct", "remove");
    document.querySelectorAll(".wrong").forEach(item => item.classList.remove("wrong"));

};

async function get_correct_dog() {
    const random_dog = ALL_BREEDS[Math.floor(Math.random() * ALL_BREEDS.length)];
    let correct_dog = await fetch_data("dog", random_dog);
    return correct_dog;
};