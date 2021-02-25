const clockContainer = document.querySelector('.js-clock'),
      clockTitle = clockContainer.querySelector('.time');

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 9 ? `0${seconds}` : seconds
    }`; //3항 조건 연산자 : 조건 / 트루값 / 그외값
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();

// 자바스크립트 시간 만드는 방법