
require('bulma');
const hello = require("hellojs");
const config = require("./config.js").GITHUB;

const $loginButton = document.querySelector(".js-login-button-github");
const $logoutButton = document.querySelector(".js-logout-button");
const $form = document.querySelector(".js-form-add-topic");
const $topics = document.querySelector(".js-columns");

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
    topics.add(map);
    console.log(topics);
    renderTopics();
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

function renderTopic(topic) {
    const template = `
    <div class="column is-3">
          <div class="card">
              <header class="card-header">
                  <p class="card-header-title">
                      ${topic.get('topic')}
                  </p>
              </header>
              <div class="card-content">
                  <div class="content">
                      ${topic.get('description')}
                  </div>
              </div>
              <footer class="card-footer">
                  <a href="#" class="card-footer-item">Zagłosuj</a>
                  <a href="#" class="card-footer-item">Chcę być trenerem</a>
              </footer>
          </div>
      </div>
    `
    $topics.innerHTML += template;
}

function renderTopics() {
    $topics.innerHTML = "";
    topics.forEach(element => {
        renderTopic(element);
    });
}