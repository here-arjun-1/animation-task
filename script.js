const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

let hindiName = "अर्जुन";
let englishName = "Arjun";

let currentName = hindiName;

let arrow = {x:50, y:canvas.height/2, speed:15, direction:1, length: 100};

let nameX = canvas.width/2;
let nameY = canvas.height/2;

let lastNameSet = "hindi";

function drawName(){
    c.font = "bold 100px Calligrapher";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillStyle = "white";
    c.fillText(currentName, nameX, nameY);
}


//draw arrow
function drawArrow(){
    c.strokeStyle = "white";
    c.fillStyle = "white";

    c.lineWidth = 5;
    c.beginPath();
    
    if(arrow.direction == 1){
        c.moveTo(arrow.x - arrow.length, arrow.y);
        c.lineTo(arrow.x, arrow.y);
    }else{
        c.moveTo(arrow.x + arrow.length, arrow.y);
        c.lineTo(arrow.x, arrow.y);
    }

    c.stroke();

    c.beginPath();
    if(arrow.direction == 1){
        c.moveTo(arrow.x, arrow.y);
        c.lineTo(arrow.x - 20, arrow.y - 15);
        c.lineTo(arrow.x - 20,arrow.y + 15);
    }else{
        c.moveTo(arrow.x,arrow.y);
        c.lineTo(arrow.x + 20,arrow.y - 15);
        c.lineTo(arrow.x + 20,arrow.y + 15);
    }
    c.closePath();
    c.fill();

}

//waves area
let waves = [];

function createWave(){
    wave.push({x:nameX, y:nameY, radius:10, alpha:1})
}
function drawWaves(){

    for(let i=waves.length - 1; i >= 0; i--){
        let wave = waves[i];
        c.beginPath();
        c.arc(wave.x,wave.y,wave.radius,0,Math.PI * 2);

        c.strokeStyle =`rgba(255,255,255,${wave.alpha})`;
        c.lineWidth = 3;
        c.stroke();
        wave.radius += 3;
        wave.alpha -= 0.02;
        if(wave.alpha <= 0){
            waves.splice(i,1);
        }
    }
}



function checkCrossing(){
    const nameWidth = c.measureText(currentName).width;
    const left = nameX - nameWidth/2;
    const right = nameX + nameWidth/2;

    if(arrow.direction === 1 && arrow.x >= left && arrow.x <= right){
        if(lastNameSet === "hindi"){
            currentName = englishName;
            lastNameSet = "english";
            createWave();
            createWave();
        }
    }

    if(arrow.direction === -1 && arrow.x <= right && arrow.x >= left){
        if(lastNameSet === "english"){
            currentName = hindiName;
            lastNameSet = "hindi";
            createWave();
            createWave();
        }
    }
}

function updateArrow(){
    arrow.x += arrow.speed * arrow.direction;

    if (arrow.direction === 1 && arrow.x >= canvas.width - 30){
        arrow.direction = -1;
    }
    if(arrow.direction === -1 && arrow.x <= 30){
        arrow.direction = 1;
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    updateArrow();
    checkCrossing();
    drawWaves();
    drawName();
    drawArrow();
}
animate();
window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    nameX = canvas.width / 2;
    nameY = canvas.height / 2;
});