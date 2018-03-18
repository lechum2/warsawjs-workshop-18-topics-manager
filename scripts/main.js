require('bulma');
const hello = require("hellojs");

hello.init({
    github: "d3ce163d91db690a5ccd"
});

const $loginButton = document.querySelector(".js-login-button-github");
$loginButton.addEventListener("click", event => {
    //event.preventDefault(); //if link, this should prevent page reload
    hello('github').login()
        .then(() => {return hello('github').api('/me')})
        .then(userProfile => console.log(userProfile));
});
