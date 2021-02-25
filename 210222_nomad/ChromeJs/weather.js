const weather = document.querySelector(".js-weather");

const API_KEY = "61dcfa32bf85da7d9c13f3aea405c39c";
const COORDS = 'coords';

function getWeather(lat, lng){ //weaher api
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`).then(function(response){
            return response.json();
        })
        .then(function(json){
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `현재 온도 : ${temperature} \n 위치 : ${place}`
        });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("error");
}

function askForCoords() { // 위치정보 읽는곳
     navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)//api
}


function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords(); // 좌표요청
    } else {
        //getWeather
        const parseCoords = JSON.parse(loadedCoords);
        console.log(parseCoords.longitude)
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();

