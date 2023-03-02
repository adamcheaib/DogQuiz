"use strict"

const username_field = document.querySelector("#user_inputs .input_fields > input");
const password_field = document.querySelector("#user_inputs > .input_fields:nth-child(4) > input");

async function fetch_data(type, dog_object) {

    const post_req = new Request(`https://www.teaching.maumt.se/apis/access/`);

    const get_req = new Request(`https://www.teaching.maumt.se/apis/access/?action=check_credentials&user_name=${username_field.value}&password=${password_field.value}`);

    const dog_req = new Request(`https://dog.ceo/api/breed/${dog_object.url}/images/random`);

    const sticky_login = new Request(`https://www.teaching.maumt.se/apis/access/?action=check_credentials&user_name=${window.localStorage.username}&password=${window.localStorage.password}`);

    if (type === "get") {

        try {
            let response_promise = await fetch(get_req);
            return response_promise;

        } catch (error) {
            create_alert("error", error.message);
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

            remove_alert();

            if (response.status === 409) {
                create_alert("error", "The username is already taken!");
            };

            if (response.status !== 200 || response.status !== 409) {
                create_alert("error", response.statusText);
            };

            if (response.status === 200) {
                create_alert("error", `Registration ${response.statusText}`);
            }

        } catch (error) {
            create_alert("error", error.message);
        };
    };


    if (type === "dog") {
        try {
            let response = await fetch(dog_req);
            let returner = { server_response: response, dog_name: dog_object.name }
            return returner;
        } catch (error) {
            fetch_data("dog")
        };
    };


    if (type === "check login") {
        let response_promise = await fetch(sticky_login);
        return response_promise;
    };


};