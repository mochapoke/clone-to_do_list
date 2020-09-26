const body = document.querySelector('body');

const img_number = 6;

function paintImg(imgNumber) {
  const image = new Image();
  image.src = `/img/${imgNumber + 1}.jpg`;
  image.classList.add('bgImage');
  body.prepend(image);
}

function genRandom() {
  const number = Math.floor(Math.random() * img_number);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImg(randomNumber);
}

init();
