const clcockContainer = document.querySelector('.clock');
const clockTitle = clcockContainer.querySelector('h1');
// const ampm = document.querySelector('.ampm');

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${hours > 9 ? hours : `0${hours}`} : ${
    minutes > 9 ? minutes : `0${minutes}`
  } : ${seconds > 9 ? seconds : `0${seconds}`}`;
  // ampm.innerText = `${hours <= 12 ? 'AM' : 'PM'}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
