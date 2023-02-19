"use strict"

const username_field = document.querySelector("#user_inputs .input_fields > input");
const password_field = document.querySelector("#user_inputs > .input_fields:nth-child(4) > input");

async function fetch_data(type, dog_object) {

    const post_req = new Request(`https://www.teaching.maumt.se/apis/access/`);

    const get_req = new Request(`https://www.teaching.maumt.se/apis/access/?action=check_credentials&user_name=${username_field.value}&password=${password_field.value}`);

    const dog_req = new Request(`https://dog.ceo/api/breed/${dog_object.url}/images/random`);

    if (type === "get") {

        try {
            let response_promise = await fetch(get_req);
            console.log(response_promise);
            let resource = await response_promise.json();

            if (response_promise.status === 418) {
                create_alert("error", response_promise.statusText);
            };

            if (response_promise.status === 404) {
                document.querySelector("#user_interaction > span").textContent = "Wrong username or password";
                document.querySelector("#user_interaction > span").style.backgroundColor = "red";
                remove_alert();
            };

            if (response_promise.status === 200) {
                remove_alert();

                window.localStorage.setItem("password", resource.data.password);
                window.localStorage.setItem("username", resource.data.user_name);

                document.querySelector(".css_file").setAttribute("href", "./css/quiz.css");
                document.querySelector("#logout_text").textContent = window.localStorage.getItem("username");

                // get_all_dogs();

                rickroll.pause();
                rickroll.currentTime = 0;
                quiz_BGM.currentTime = 0;
                quiz_BGM.play();

                return resource;

            };

        } catch (error) {
            create_alert("error", error.message);
            console.log(error);
        };
    };


    if (type === "post") {

        try {
            const post = {
                action: "register",
                user_name: username_field.value,
                password: password_field.value,
            };

            const options = {
                method: 'POST',
                headers: { "Content-type": "application/json; charset =UTF-8" },
                body: JSON.stringify(post),
            };

            let response = await fetch(post_req, options);
            let resource = await response.json();
            console.log(response);
            console.log(resource);

            remove_alert();

            if (response.status !== 200) {
                create_alert("error", "The username is already taken!");
            };

        } catch (error) {
            create_alert("error", error.message);
        };
    };


    if (type === "dog") {
        try {
            let response = await fetch(dog_req);
            if (response.status === 200) {
                let resource = await response.json();
                let dog_data = { background_link: resource.message, dog_name: dog_object.name };
                return dog_data;
            } else {
                create_alert("error", response.statusText);
            }
        } catch (error) {
            console.log(error);
            fetch_data("dog")
        };
    };


};

// LÄGG TILL I QUIZ.JS