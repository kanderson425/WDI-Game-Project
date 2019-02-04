/*----- constants -----*/
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

//Alien Spaceship Image
var shipImg = new Image();
shipImg.src ="Images/Single Ship Sprite.png";

var shipDimensions = {
    x: 60,
    y: 50
};

var shipSpeed = {
    dx: 2,
    dy: 2
}

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
        c.drawImage(shipImg, this.x, this.y, shipDimensions.x, shipDimensions.y);
       
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
        // if(mouse.x - this.x < 50 && mouse.x - this.x > -50
        //     && mouse.y - this.y < 100 && mouse.y - this.y > -100) {
        //     this.x += 20;
        // }

        this.draw();
    }
}

var shipArray = [];

/*----- app's state (variables) -----*/


/*----- cached element references -----*/



/*----- event listeners -----*/

//Shoot Functionality 

function isIntersect(mouse, shipImg) {
    return Math.sqrt((mouse.x - shipImg.x) ** 2 + (mouse.y - shipImg.y) ** 2);
  }
  
  canvas.addEventListener('click', function(e) {
    const pos = {
      x: e.clientX,
      y: e.clientY
    };
    console.log(e.clientX, e.clientY);
    shipArray.forEach(shipImg => {
      if (isIntersect(mouse, shipImg)) {
        console.log("a ship has been clicked");
      }
    });
  });

// shipImg.isHitBy = function(x, y) {
//     return (x >= this.x && x <= this.x + shipDimensions.x && Y >= this.y && Y <= this. Y + shipDimensions.y)
// }

// canvas.addEventListener('click', function(e) {
//     var canvasBounds = canvas.getBoundingClientRect();
//     var clickX = e.pageX - canvasBounds.left;
//     var clickY = e.pageY - canvasBounds.top;

//     if(shipImg.isHitBy(clickX, clickY)) {
//         console.log("A ship was hit");
//     }
// })

// canvas.addEventListener('click', function(e) {
//     var ship = new Ship()
//         if (mouse.x || mouse.y) { 
//            var x = e.clientX,
//                y = e.clientY
//           if(Math.pow(x - shipDimensions.x, 2) + Math.pow(y - shipDimensions.y, 2) < Math.pow(shipDimensions.x, 2))
            
//         }
//         else { 
//           x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
//           y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
//           console.log(x, y)
//         } 
//         x -= canvas.offsetLeft;
//         y -= canvas.offsetTop;

//         mouse.x = event.x;
//         mouse.y = event.y;
//         // if(mouse.x - this.x < 50 && mouse.x - this.x > -50
//         //     && mouse.y - this.y < 100 && mouse.y - this.y > -100) {
//         //     console.log("You have shot a ship!");
//         // }
// })

//Reset Button
document.querySelector('.reset-btn').addEventListener("click", init);


/*----- functions -----*/
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);


    for (var i = 0; i < shipArray.length; i++) {
        shipArray[i].update();
    }
}

animate();

// var shipArray = [];

//Can adjust the velocity and # of ships here//
function init() {
    shipArray = [];
    for (var i = 0; i < 10; i++) {
        var x = Math.random() * (innerWidth - 58);
        var y = Math.floor(Math.random() * 401);
        var dx = (Math.random() - 0.5) * shipSpeed.dx;
        var dy = (Math.random() - 0.5) * shipSpeed.dy;
        shipArray.push(new Ship(x, y, dx, dy));
    }
}

init();