/*----- constants -----*/
var canvas = document.querySelector('canvas');
canvasLeft = canvas.offsetLeft;
canvasTop = canvas.offsetTop;
canvasProperties = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

//Alien Spaceship Image
var shipImg = new Image();
shipImg.src ="Images/Single Ship Sprite.png";

var shipDimensions = {
    width: 60,
    height: 50
};

var shipLocation = {
    x: null,
    y: null
};

var shipSpeed = {
    dx: 0,
    dy: 0
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
// var dy = (Math.random() - 0.5) * 8

function Ship(x , y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    
    this.draw = function() {
        var shipImg = new Image();
        shipImg.src ="Images/Single Ship Sprite.png"; 
        c.drawImage(shipImg, this.x, this.y, shipDimensions.width, shipDimensions.height);
       
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
    }
    
    // this.collision = function() {
    //     if( this.x + shipDimensions.width > mouse.x && this.x < mouse.x && 
    //         this.y + shipDimensions.height > mouse.y && this.y - shipDimensions.height < mouse.y) {
    //             this.dx = 0;
    //             this.dy = 0;
    //             console.log("You have hit a ship");
    //         }
    // }

    canvas.addEventListener('click', function(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        let xOffset = e.clientX - canvasLeft;
        let yOffset = e.clientY - canvasTop;
        this.x = x;
        this.y = y;
    
        console.log("Mouse clicked on:" + mouse.x, mouse.y);
        console.log("The ship coordinates are: " + this.x, this.y);
    
             if((mouse.x < this.x - 10 + shipDimensions.width) && (this.x - 15 < mouse.x) && 
                (mouse.y > this.y + 20 + shipDimensions.height) && 
                (mouse.y < this.y + 70 + shipDimensions.height)) {        
                    console.log("Hit a ship!");
        } else {
            console.log("Did not hit");
        }
    });

}

var shipArray = [];

/*----- app's state (variables) -----*/


/*----- cached element references -----*/


/*----- event listeners -----*/

//Shoot Functionality 
let mouse = {
    x: null,
    y: null
}


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
        // shipArray[i].collision();
    }
}

animate();

//Ships Getting shot

function die() {

}

//Can adjust the velocity and # of ships here//
function init() {
    shipArray = [];
    for (var i = 0; i < 2; i++) {
        var x = Math.random() * (innerWidth - 58);
        var y = Math.floor(Math.random() * 401);
        var dx = (Math.random() - 0.5) * shipSpeed.dx;
        var dy = (Math.random() - 0.5) * shipSpeed.dy;
        shipArray.push(new Ship(x, y, dx, dy));
    }
}

init();
