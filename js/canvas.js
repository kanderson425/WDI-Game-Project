/*----- constants -----*/
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');


//Background Image
var bgImg = new Image();
bgImg.onload = function () {
    c.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
}

bgImg.src = "Images/Background.png";

//Alien Spaceship Image

var shipImg = new Image();
shipImg.src ="Images/Single Ship Sprite.png";

function Ship(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
}
    this.draw = function() {
        shipImg.onload = function() {
        c.drawImage(shipImg, 500, 100, 50, 50);
        }  
    }  
 
var shipArray = [];

funtion init() {
    shipArray = [];
    for (var i = 0; i < 10; i++) {
        var x = Math.random();
        var y = Math.random();
        var dx = (Math.random() - 0.5) * 2;
        var dy = (Math.random() - 0.5) * 2;
        shipArray.push(new Ship(x, y, dx, dy));
    }
}

function animate () {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < shipArray.length; i++) {
        shipArray[i].update();
    };
}

init();
animate();

// /*Hillbilly Image with rifle
// var hbImg = new Image();
// hbImg.onload = function() {
//     c.drawImage(hbImg, 200, 200, 100, 100);
// }

// hbImg.src = "Images/Cartoon_hillbilly_with_rifle.";


/*----- app's state (variables) -----*/


/*----- cached element references -----*/


/*----- event listeners -----*/


/*----- functions -----*/

// var mouse = {
//     x: undefined,
//     y: undefined
// }

// var maxRadius = 40;
// var minRadius = 2;

// var colorArray = [
//     '#2C3E50',
//     '#E74C3C',
//     '#ECF0F1',
//     '#3498DB',
//     '#3498DB'
// ];   

// window.addEventListener('mousemove', function(event) {
//     mouse.x = event.x;
//     mouse.y = event.y;
// });

// window.addEventListener('resize', function() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     init();
// })


// function Circle(x, y, dx, dy, radius) {
//     this.x = x;
//     this.y = y;
//     this.dx = dx;
//     this.dy = dy;
//     this.radius = radius;
//     this.minRadius = radius;
//     this.color = c.fillStyle = colorArray[Math.floor(Math.random() * colorArray.length)];

//     this.draw = function() {
//         c.beginPath();
//         c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//         c.strokeStyle = "blue";
//         c.stroke();
//         c.fillStyle = this.color;
//         c.fill();
//     }
    
//     this.update = function() {
//         if (this.x + this.radius  > innerWidth || this.x - this.radius < 0) {
//             this.dx = -this.dx
//         }
    
//         if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
//             this.dy = -this.dy;
//         }
//         this.x += this.dx;
//         this.y += this.dy;

//         //This is where the interactivity between circles and mouse occurs
//         if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && 
//             mouse.y - this.y < 50 && mouse.y - this.y > -50) {
//             if(this.radius < maxRadius) {    
//             this.radius += 1;
//             }
//         } else if (this.radius > this.minRadius) {
//             this.radius -= 1;
//         }
//         this.draw();
//     }
// }

// var circleArray = [];

// for (var i = 0; i < 800; i++) {
// var radius = Math.random() * 3 + 1;
// var x = Math.random() * (innerWidth - radius * 2) + radius;
// var y = Math.random() * (innerHeight - radius * 2) + radius;
// var dx = (Math.random() - 0.5) * 2;
// var dy = (Math.random() - 0.5) * 2;
//     circleArray.push(new Circle(x, y, dx, dy, radius));
// }

// var circleArray = [];

// function init() {
//     circleArray = [];
//     for (var i = 0; i < 2500; i++) {
//     var radius = Math.random() * 3 + 1;
//     var x = Math.random() * (innerWidth - radius * 2) + radius;
//     var y = Math.random() * (innerHeight - radius * 2) + radius;
//     var dx = (Math.random() - 0.5) * 2;
//     var dy = (Math.random() - 0.5) * 2;
//     circleArray.push(new Circle(x, y, dx, dy, radius));
//     }
// }


// function animate() {
//     requestAnimationFrame(animate);
//     c.clearRect(0, 0, innerWidth, innerHeight);

//     for (var i = 0; i < circleArray.length; i++) {
//         circleArray[i].update();
//     };

// }
// init();
// animate();