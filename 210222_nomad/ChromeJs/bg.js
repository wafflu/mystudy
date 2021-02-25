const body = document.querySelector("body");


function paintImage(imgNumber) {
    const image = new Image();
    image.src = `./img/${imgNumber+1}.jpeg`;
    image.classList.add("bgImage");
    body.prepend(image);

}

function genRandom() {
    const number = Math.floor(Math.random() * 4);
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();