require('bulma');
const hello = require("hellojs");
const config = require("./config.js").GITHUB;

hello.init({
    github: config.CLIENT_ID
});

const $loginButton = document.querySelector(".js-login-button-github");
const $logoutButton = document.querySelector(".js-logout-button");

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