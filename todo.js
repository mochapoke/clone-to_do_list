const toDoForm = document.querySelector('.toDoForm'),
  toDoInput = toDoForm.querySelector('input'),
  toDoList = document.querySelector('.toDoList');

// local storage 에 todo
const TODO_LS = 'toDos';

// to do를 목록으로 만들기
let toDos = [];

// filter는 아이템을 array, true를 리턴하는 함수 아이템
function filterFn(toDo) {
  return toDo.id === 1;
}

// 목록 삭제하기
function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    // filter 중요!
    return toDo.id !== parseInt(li.id);
    // toDos의 id가 li의 id와 같지않을 때
    // parseint : string을 숫자로 바꿈
  });
  toDos = cleanToDos; // 목록 삭제된 게 저장..
  saveToDos();
}

// Local Storage에는 data type이 string만 저장됨!!
// toDos(목록)를 가져와 로컬에 저장하기
function saveToDos() {
  localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}
// JSON.stringify(toDos)은 object를 string으로 바꿔줌.
// 확인은 f12 > 응용프로그램> 로컬저장소

// JS로 바로 리스트 목록 만들기
function paintToDO(text) {
  const li = document.createElement('li'); //list가 아닌 li여야지 작동
  const delBtn = document.createElement('delBtn');
  const span = document.createElement('span');
  const newID = toDos.length + 1; // id에 숫자 카운팅하기

  delBtn.innerText = '❌';
  delBtn.addEventListener('click', deleteToDo);
  span.innerText = text;
  li.id = newID; // list 목록 아이템에 id 추가하기

  toDoList.appendChild(li);
  li.appendChild(span);
  li.appendChild(delBtn);

  const toDoObj = {
    text: text,
    id: newID,
  };

  //toDos에 toDoObj 넣기
  toDos.push(toDoObj);
  // PUSH이후에 호출하기
  saveToDos();
}

// write to do! 에서 엔터하면 이벤트 발생
function handleSubmit(event) {
  event.preventDefault(); // 새로고침 방지
  const currentValue = toDoInput.value;
  paintToDO(currentValue);
  toDoInput.value = '';
}

// 로컬스토리지에 있는 목록이 새로고침해도 화면에 계속 출력되게 함
// 비어있지 않다면 local stroage에서 toDO 들고오기
function loadToDos() {
  const loadedtoDos = localStorage.getItem(TODO_LS);
  if (loadedtoDos !== null) {
    // string 을 object로 바꾸기
    const parsedToDos = JSON.parse(loadedtoDos);

    // 각각에 대해서(for eacH) paintToDo라는 function 실행.
    // forEach은 array를 위한 function.
    parsedToDos.forEach(function (toDo) {
      paintToDO(toDo.text);
    });
  }
}

// 실행
function init() {
  loadToDos();
  toDoForm.addEventListener('submit', handleSubmit); //sbumit하면 handleSubmit 실행
}

init();
