require('bulma');

const $loginButton = document.querySelector(".js-login-button-github");
$loginButton.addEventListener("click", (event) => {
    //event.preventDefault(); //if link should prevent page reload
    console.log('login to github clicked')
});
