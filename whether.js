const whether = document.querySelector('.whether');
const site = document.querySelector('.site');

const API_KEY = '02e441a38cd4dea2f66af42e94f8dc29';
const COORDS = 'coords';

// 날씨 API로 날씨 data 들고오기
function getWhether(lat, lng) {
  fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric
`)
    .then(function (response) {
      return response.json(); // 이게 뭔 기능인지 몰겠네
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      whether.innerText = `${temperature}℃`;
      site.innerText = `${place}`;
    });
}
// then은 기본적으로 함수를 호출하지만 데이터가 완전히 들어온후 호출
// then은 fetch가 완료되길 기다려야함

// setItem에는 string이 들어와야해서
// 스트링으로 변환해서 local stroage에 저장
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// 위도와 경도 들고 와서 저장
function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWhether(latitude, longitude);
}

// console 출력
function handleGeoErr() {
  console.log('Can not access geo location');
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoErr);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    // get whether
    const parsedCoords = JSON.parse(loadedCoords);
    console.log(parsedCoords);
    getWhether(parsedCoords.latitude, parsedCoords.longitude);
  }
}

// 키자마자 실행하기
function init() {
  loadCoords();
}

init();
