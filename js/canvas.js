/*----- constants -----*/
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

//Alien Spaceship Image
var shipImg = new Image();
shipImg.src ="Images/Single Ship Sprite.png";

//Random Spaceships Generator 
// shipImg.onload = function() {
//     for (var i = 0; i < 2; i++) {
//         var x = Math.random() * window.innerWidth;
//         var y = Math.random() * window.innerHeight;
//         c.drawImage(shipImg, x, y, 50, 50);
//     };
// } 

//Random moving spaceships
// var x = Math.random() * innerWidth;
// var y = Math.floor(Math.random() * 401);
// var dx = (Math.random() -0.5) * 8;
// var dy = (Math.random() - 0.5) * 8;

var mouse = {
    x: undefined,
    y: undefined
} 
function Ship(x , y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    

    this.draw = function() {
        var shipImg = new Image();
        shipImg.src ="Images/Single Ship Sprite.png"; 
        c.drawImage(shipImg, this.x, this.y, 60, 50);
       
    }

    this.update = function() {
        if (this.x >= innerWidth - 58 || this.x < 0) {
            this.dx = -this.dx;
        }
    
        if (this.y >= 400 || this.y < 0) {
            this.dy = -this.dy;
        }
    
    
        this.x += this.dx;
        this.y += this.dy;

        this.draw();

        //Interactivity
        if(mouse.x - this.x < 100 && mouse.x - this.x > -100
            && mouse.y - this.y < 100 && mouse.y - this.y > -100) {
            console.log("You hit a spaceship!")
        }
    }
}

var shipArray = [];

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);


    for (var i = 0; i < shipArray.length; i++) {
        shipArray[i].update();
    }
}

animate();

// var shipArray = [];

//Can adjust the veloticy and # of ships here//
function init() {
    shipArray = [];
    for (var i = 0; i < 10; i++) {
        var x = Math.random() * (innerWidth - 58);
        var y = Math.floor(Math.random() * 401);
        var dx = (Math.random() - 0.5) * 3;
        var dy = (Math.random() - 0.5) * 3;
        shipArray.push(new Ship(x, y, dx, dy));
    }
}

init();
/*----- app's state (variables) -----*/


/*----- cached element references -----*/


/*----- event listeners -----*/

//Shoot Functionality 
window.addEventListener('click', 
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
})

//Reset Button
document.querySelector('.reset-btn').addEventListener("click", init);
/*----- functions -----*/
