alert("ENTERED THE ARENA")
const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

let gameState = "playing";
let targetCoins = Math.ceil((Math.random()*10)+1)+5;

let collectCoins = 0;

let restartBtn = document.getElementById("restartBtn");

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
        keys[event.key] = true;
    }
})

window.addEventListener("keyup", function(event){
    if(event.key in keys){
        keys[event.key] = false;
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
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;
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
    let x = Math.random()*(canvas.width - 300)+100;
    let y = Math.random()*(canvas.height - 100)+50;

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

function drawPlayer(){
    c.beginPath();
    c.arc(player.x, player.y, player.radius,0, Math.PI*2);
    c.fillStyle = player.color;
    c.shadowBlur = 20;
    c.shadowColor = "cyan";
    c.fill();
    c.shadowBlur = 0;
}

function cannonUpdate(){
    let dx = player.x- cannon.x;
    let dy = player.y-cannon.y;
    cannon.angle = Math.atan2(dy,dx);
}

function drawCannon(){
    c.beginPath();
    c.arc(cannon.x, cannon.y, cannon.radius, 0 ,Math.PI*2);
    c.fillStyle = "red";
    c.shadowBlur = 20;
    c.shadowColor = "red";
    c.fill();
    c.shadowBlur = 0;

    c.save();
    
    c.translate(cannon.x, cannon.y);
    c.rotate(cannon.angle);

    c.fillStyle = "darkred";
    c.fillRect(0, -8, 50, 16);

    c.restore();

    c.beginPath();
     c.arc(cannon.x, cannon.y, 12, 0, Math.PI * 2);
    c.fillStyle = "black";
    c.fill();
}

function fireBullet(){
    let dx = player.x - cannon.x;
    let dy = player.y - cannon.y;
    let angle = Math.atan2(dy, dx);

    let bulletDx = Math.cos(angle);
    let bulletDy = Math.sin(angle);

    bullets.push(new Bullet(cannon.x, cannon.y, bulletDx, bulletDy));
}

function randomFire(){
    if(gameState === "playing"){
        fireBullet();
    }

    let nextTime = Math.random()*500 +100;

    setTimeout(randomFire, nextTime);
}

function checkCoin(){
    for(let i=coins.length-1; i >= 0; i--){
        let coin = coins[i];
        let dx = player.x -coin.x;
        let dy = player.y -coin.y;
        let d = Math.sqrt(dx*dx + dy*dy);
        if(d < player.radius + coin.radius){
            coins.splice(i,1);
            collectCoins++;

            createCoin();

            if(collectCoins >= targetCoins){
                gameState = "win";
            }
        }
    }
}

function checkBulltetCollision(){
    for(let i=bullets.length-1; i>=0; i--){
        let bullet = bullets[i];

        let dx = player.x - bullet.x;
        let dy = player.y - bullet.y;

        let d = Math.sqrt(dx*dx + dy*dy);

        if(d < bullet.radius + player.radius){
            gameState = "gameover";
        }
    }
}

function drawCoin(){
    for(let i=0; i<coins.length; i++){
        coins[i].draw();
    }
}

function drawScore(){
    c.fillStyle = "white";
    c.font = "30px Arial"

    c.fillText("coins: "+ collectCoins + "/" + targetCoins, 20,35);
}

function drawMessage(){
    c.textAlign = "center";

    if(gameState === "gameover"){
        c.fillStyle = "red";
        c.font ="60px Arial";

        c.fillText("GAME OVER", canvas.width/2, canvas.height/2);
        c.fillStyle = "white";
        c.font = "20px Arial";

        c.fillText("You collected " + collectCoins + " / " + targetCoins + " coins", canvas.width/2, canvas.height/2 + 50);
    }

    if(gameState === "win"){
        c.fillStyle = "lime";
        c.font = "60px Arial";
        c.fillText("YOU WIN!", canvas.width/2, canvas.height/2);

        c.fillStyle = "white";
        c.font = "22px Arial";
        c.fillText("You collected all "+targetCoins+" coins!", canvas.width / 2, canvas.height / 2 + 30);

    };
    c.textAlign = "left";
}

function restartGame(){
    gameState = "playing";
    collectCoins = 0;
    targetCoins = Math.ceil((Math.random() * 10) + 1) + 5;
    player.x = 100;
    player.y = canvas.height / 2;
    bullets = [];
    coins = [];
    createCoin();
}

restartBtn.addEventListener("click", restartGame);
function animate(){
    requestAnimationFrame(animate);
    c.fillStyle="#111";
    c.fillRect(0,0,canvas.width,canvas.height);

    if(gameState === "playing"){
        movePlayer();
        cannonUpdate();

        for(let i=bullets.length-1; i>=0; i--){
            bullets[i].update();
            if(bullets[i].x < -50 || bullets[i].x > canvas.width + 50 || bullets[i].y < -50 || bullets[i].y > canvas.height + 50){
            bullets.splice(i,1);
            }
        }
        checkBulltetCollision();
        checkCoin();
    }
    

    drawCoin();
    drawPlayer();
    drawCannon();
    drawScore();
    drawMessage();
}

randomFire();
animate();

window.addEventListener("resize",function(){canvas.width =window.innerWidth; canvas.height = window.innerHeight; cannon.x =canvas.width - 100; cannon.y = canvas.height / 2;});