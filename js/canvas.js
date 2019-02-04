/*----- constants -----*/
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');


//Background Image
// var bgImg = new Image();
// bgImg.onload = function () {
//     c.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
// }
// bgImg.src = "Images/Background.png";

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

window.addEventListener('click', 
    function(event) {
        mouse.x = event.x;

})

function Ship(x , y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    

    this.draw = function() {
        var shipImg = new Image();
        shipImg.src ="Images/Single Ship Sprite.png"; 
        c.drawImage(shipImg, this.x, this.y, 60, 60);
       
    }

    this.update = function() {
        if (this.x >= innerWidth - 50 || this.x < 0) {
            this.dx = -this.dx;
        }
    
        if (this.y >= 400 || this.y < 0) {
            this.dy = -this.dy;
        }
    
    
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }


}

var shipArray = [];

//Can adjust the veloticy and # of ships here//
for (var i = 0; i < 5; i++) {
    shipArray.push(new Ship(x, y, dx, dy));
    var x = Math.random() * (innerWidth - 50);
    var y = Math.floor(Math.random() * 401);
    var dx = (Math.random() - 0.5) * 10;
    var dy = (Math.random() - 0.5) * 10;
}



function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);


    for (var i = 0; i < shipArray.length; i++) {
        shipArray[i].update();
    }
}

animate();




    
//   this.update = function() {
//       if(this.x > innerWidth || this.x - this.radius < 0) {
//           this.dx = -this.dx;
//       }

//       if(this.y > innerHeight || this.y < 0) {
//           this.dy = -this.dy;
//       }
//       this.x += this.dx;
//       this.y += this.dy;

//       this.draw();
//   }  
// }

// var shipArray = [];

// function init() {
//     shipArray = [];
//     for (var i = 0; i < 10; i++) {
//         var x = Math.random();
//         var y = Math.random();
//         var dx = (Math.random() - 0.5) * 2;
//         var dy = (Math.random() - 0.5) * 2;
//         shipArray.push(new Ship(x, y, dx, dy));
//     }
// }

// function animate () {
//     requestAnimationFrame(animate);
//     c.clearRect(0, 0, innerWidth, innerHeight);

//     for (var i = 0; i < shipArray.length; i++) {
//         shipArray[i].update();
//     };
// }

// init();
// animate();

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
