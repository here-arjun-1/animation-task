// var canvas = document.querySelector("canvas");

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// var c = canvas.getContext("2d");
// let x = Math.random()*innerWidth;
// let y = Math.random()*innerHeight;
// let dx = 4;
// let radius = 30;
// let dy = 4;
// function animate() {
//     requestAnimationFrame(animate);
//     c.clearRect(0, 0, innerWidth, innerHeight);
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = "blue";
//     c.stroke();
//     if(x+radius> innerWidth || x-radius < 0){
//         dx = -dx;
//     }

//     if(y+radius > innerHeight || y-radius <0){
//         dy = -dy;
//     }

//     if(x==innerWidth || x==0){
//         generate();
//     }

//     if(y==innerHeight || y==0){
//         generate();
//     }
//     x += dx;
//     y += dy;
// }

// animate();

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");


// ==========================
// CANVAS SIZE
// ==========================

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// ==========================
// NAME
// ==========================

let hindiName = "अर्जुन";
let englishName = "ARJUN";

let currentName = hindiName;


// ==========================
// NAME POSITION
// ==========================

const nameX = canvas.width / 2;
const nameY = canvas.height / 2;


// ==========================
// ARROW
// ==========================

let arrow = {
    x: 50,
    y: canvas.height / 2,

    speed: 7,

    direction: 1,

    length: 70
};


// ==========================
// WAVE ARRAY
// ==========================

let waves = [];


// ==========================
// CONTROL
// ==========================

let lastNameState = "hindi";


// ==========================
// DRAW NAME
// ==========================

function drawName() {

    c.font = "bold 70px Arial";

    c.textAlign = "center";
    c.textBaseline = "middle";

    c.fillStyle = "white";

    c.fillText(
        currentName,
        nameX,
        nameY
    );
}


// ==========================
// DRAW ARROW
// ==========================

function drawArrow() {

    c.save();

    c.strokeStyle = "white";
    c.fillStyle = "white";

    c.lineWidth = 5;

    c.beginPath();

    // Arrow body

    if (arrow.direction === 1) {

        c.moveTo(
            arrow.x - arrow.length,
            arrow.y
        );

        c.lineTo(
            arrow.x,
            arrow.y
        );

    } else {

        c.moveTo(
            arrow.x + arrow.length,
            arrow.y
        );

        c.lineTo(
            arrow.x,
            arrow.y
        );
    }

    c.stroke();


    // Arrow head

    c.beginPath();

    if (arrow.direction === 1) {

        c.moveTo(
            arrow.x,
            arrow.y
        );

        c.lineTo(
            arrow.x - 20,
            arrow.y - 15
        );

        c.lineTo(
            arrow.x - 20,
            arrow.y + 15
        );

    } else {

        c.moveTo(
            arrow.x,
            arrow.y
        );

        c.lineTo(
            arrow.x + 20,
            arrow.y - 15
        );

        c.lineTo(
            arrow.x + 20,
            arrow.y + 15
        );
    }

    c.closePath();

    c.fill();

    c.restore();
}


// ==========================
// CREATE WAVE
// ==========================

function createWave() {

    waves.push({
        x: nameX,
        y: nameY,

        radius: 10,

        alpha: 1
    });
}


// ==========================
// DRAW WAVES
// ==========================

function drawWaves() {

    for (let i = waves.length - 1; i >= 0; i--) {

        let wave = waves[i];

        c.beginPath();

        c.arc(
            wave.x,
            wave.y,
            wave.radius,
            0,
            Math.PI * 2
        );

        c.strokeStyle =
            `rgba(255,255,255,${wave.alpha})`;

        c.lineWidth = 3;

        c.stroke();


        // Increase wave size

        wave.radius += 3;

        wave.alpha -= 0.02;


        // Remove wave

        if (wave.alpha <= 0) {

            waves.splice(i, 1);
        }
    }
}


// ==========================
// CHECK NAME CROSSING
// ==========================

function checkNameCollision() {

    const nameWidth =
        c.measureText(currentName).width;


    const left =
        nameX - nameWidth / 2;


    const right =
        nameX + nameWidth / 2;


    // Arrow moving RIGHT

    if (
        arrow.direction === 1 &&
        arrow.x >= left &&
        arrow.x <= right
    ) {

        if (lastNameState === "hindi") {

            currentName = englishName;

            lastNameState = "english";

            createWave();
            createWave();
        }
    }


    // Arrow moving LEFT

    if (
        arrow.direction === -1 &&
        arrow.x <= right &&
        arrow.x >= left
    ) {

        if (lastNameState === "english") {

            currentName = hindiName;

            lastNameState = "hindi";

            createWave();
            createWave();
        }
    }
}


// ==========================
// UPDATE ARROW
// ==========================

function updateArrow() {

    arrow.x +=
        arrow.speed * arrow.direction;


    // RIGHT WALL

    if (
        arrow.direction === 1 &&
        arrow.x >= canvas.width - 30
    ) {

        arrow.direction = -1;
    }


    // LEFT WALL

    if (
        arrow.direction === -1 &&
        arrow.x <= 30
    ) {

        arrow.direction = 1;
    }
}


// ==========================
// ANIMATION
// ==========================

function animate() {

    requestAnimationFrame(animate);


    // Clear screen

    c.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Update

    updateArrow();

    checkNameCollision();


    // Draw

    drawWaves();

    drawName();

    drawArrow();
}


// Start animation

animate();


// ==========================
// RESIZE
// ==========================

window.addEventListener("resize", function () {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    nameX = canvas.width / 2;
    nameY = canvas.height / 2;
});