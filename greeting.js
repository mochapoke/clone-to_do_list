const form = document.querySelector('.form'),
  input = form.querySelector('input'),
  greeting = document.querySelector('.greetings');

const User_LS = 'currentUser',
  showing_cn = 'showing';

function saveName(text) {
  localStorage.setItem(User_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(showing_cn);
  form.addEventListener('submit', handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(showing_cn);
  greeting.classList.add(showing_cn);
  greeting.innerText = `Hello, ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(User_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
