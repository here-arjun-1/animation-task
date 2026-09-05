var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");
let x = Math.random()*innerWidth;
let y = Math.random()*innerHeight;
let dx = 4;
let radius = 30;
let dy = 4;
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    c.beginPath();
    c.arc(x, y, 30, 0, Math.PI * 2, false);
    c.strokeStyle = "blue";
    c.stroke();
    if(x+radius> innerWidth || x-radius < 0){
        dx = -dx;
    }

    if(y+radius > innerHeight || y-radius <0){
        dy = -dy;
    }

    if(x==innerWidth || x==0){
        generate();
    }
    
    if(y==innerHeight || y==0){
        generate();
    }
    x += dx;
    y += dy;
}

animate();