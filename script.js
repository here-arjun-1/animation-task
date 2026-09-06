const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

let gameState = "playing";
let targetCoins = Math.ceil((Math.random()*10)+1)+5;

let collectCoins = 0;

let player = {
    x: 100,
    y: canvas.height/2,
    radius: 20,
    speed: 5,
    color: "cyan"
};

let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,

    w: false,
    a: false,
    s: false,
    d: false
};

window.addEventListener("keydown", function(event){
    if(event.key in keys){
        key[event.key] = true;
    }
})

window.addEventListener("keyup", function(event){
    if(event.key in keys){
        key[event.key] = false;
    }
})

let cannon = {
    x : canvas.width - 100,
    y : canvas.height/2,
    radius : 35,
    angle : Math.PI
};

let bullets = [];
let coins = [];

function Bullet(x, y, dx, dy){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = 7;
    this.speed = 6;

    this.draw = function(){
        c.beginPath();
        c.arc(
            this.x,
            this.y,
            this.radius,
            0, 
            Math.PI*2
        );
        c.fillStyle = "orange";
        c.shadowBlur = 15;
        c.shadowColor = "orange";
        c.fill();
        c.shadowBlur = 0;
    }

    this.update = function(){
        this.dx = this.dx + this.speed;
        this.dy = this.dy + this.speed;
        this.draw();
    };
}

function Coin(x, y){
    this.x = x;
    this.y = y;
    this.radius = 12;
    this.angle = 0;

    this.draw = function(){
        this.angle += 0.5;

        c.beginPath();
        c.arc(
            this.x, this.y, this.radius, 0, Math.PI*2, false
        );

        c.fillStyle = "gold";
        c.shadowBlur = 15;
        c.shadowColor = "gold";
        c.fill();
        c.shadowBlur = 0;

        c.beginPath();
        c.arc(
            this.x, this.y, 5, 0, Math.PI * 2
        );

        c.fillStyle = "#b8860b";
        c.fill();
    };
}

function createCoin(){
    let x = Math.random(canvas.width - 300)+100;
    let y = Math.random(canvas.height - 100)+50;

    coins.push(new Coin(x,y));
}

createCoin();

function movePlayer(){
    if(keys.ArrowUp || keys.w){
        player.y -= player.speed;
    }

    if(keys.ArrowDown || keys.s){
        player.y += player.speed;
    }

    if(keys.ArrowLeft || keys.a){
        player.x -= player.speed;
    }

    if(keys.ArrowRight || keys.d){
        player.x += player.speed;
    }

    if(player.x - player.radius < 0){
        player.x = player.radius;
    }

    if(player.x + player.radius > canvas.width){
        player.x = canvas.width - player.radius;
    }

    if(player.y - player.radius < 0){
        player.y = player.radius;
    }

    if(player.y + player.radius > canvas.height){
        player.y = canvas.height - player.radius;
    }
}