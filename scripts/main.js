
require('bulma');
const hello = require("hellojs");
const config = require("./config.js").GITHUB;

const $loginButton = document.querySelector(".js-login-button-github");
const $logoutButton = document.querySelector(".js-logout-button");
const $form = document.querySelector(".js-form-add-topic");

const topics = new Set();

hello.init({
    github: config.CLIENT_ID
});

if(hello('github').getAuthResponse()) getAndRenderUser();

$loginButton.addEventListener("click", event => {
    //event.preventDefault(); //if link, this should prevent page reload
    hello('github').login()
        .then(() => getAndRenderUser());
});

$logoutButton.addEventListener("click", event => {
    hello.logout('github')
        .then(() => location.reload());
});

$form.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData($form);
    const map = new Map(data.entries());
    console.log(map);
    $form.reset();
});

function getAndRenderUser() {
    hello('github').api('/me')
        .then(userProfile => renderUserDetails(userProfile));
}

function renderUserDetails(userProfile) {
    const template = `
        ${ userProfile.login }&nbsp;
        <img src="${userProfile.avatar_url}" alt="${userProfile.name}"/>
        `
    const $navbar = document.querySelector(".js-user-placeholder");
    $navbar.innerHTML = template;
}