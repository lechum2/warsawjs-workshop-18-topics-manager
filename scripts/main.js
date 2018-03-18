require('bulma');
const hello = require("hellojs");

hello.init({
    github: "d3ce163d91db690a5ccd"
});

const $loginButton = document.querySelector(".js-login-button-github");
const $logoutButton = document.querySelector(".js-logout-button");

if(hello('github').getAuthResponse()) {
    hello('github').api('/me')
        .then(userProfile => renderUserDetails(userProfile));
}

$loginButton.addEventListener("click", event => {
    //event.preventDefault(); //if link, this should prevent page reload
    hello('github').login()
        .then(() => {return hello('github').api('/me')})
        .then(userProfile => renderUserDetails(userProfile));
});

$logoutButton.addEventListener("click", event => {
    hello.logout('github')
        .then(() => {
            location.reload();
        });
});

function renderUserDetails(userProfile) {
    const template = `
        ${ userProfile.login }&nbsp;
        <img src="${userProfile.avatar_url}" alt="${userProfile.name}"/>
        `
    const $navbar = document.querySelector(".js-user-placeholder");
    $navbar.innerHTML = template;
}