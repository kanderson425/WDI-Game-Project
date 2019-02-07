/*----- constants -----*/
var canvas = document.querySelector('canvas');
canvasLeft = canvas.offsetLeft;
canvasTop = canvas.offsetTop;
canvasProperties = [];
let c = canvas.getContext('2d');

var setCanvasSize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
 setCanvasSize();

//Alien Spaceship Image
var shipImg = new Image();
shipImg.src ="Images/Single Ship Sprite.png"

var shipDimensions = {
    width: .10 * canvas.width,
    height: .10 * canvas.height
};

var shipLocation = {
    x: Math.random() * (innerWidth - 58),
    y: Math.floor(Math.random() * 401)
};

var shipSpeed = {
    dx: 0,
    dy: 0
}

let shipArray = [];
let survivingShips = [];
let shipsOnScreen = [];

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

let mouse = {
    x: null,
    y: null
}  

// class Ship {
//     constructor(x, y, dx, dy, width, height) {
//         this.x = x;
//         this.y = y;
//         this.dx = dx;
//         this.dy = dy;
//         this.width = .08 * canvas.width;
//         this.height = .08 * canvas.height;
//     }

//     draw() {
//         var shipImg = new Image();
//         shipImg.src ="Images/Single Ship Sprite.png"; 
//         c.drawImage(shipImg, this.x, this.y, this.width, this.height);

//     }

//     update() {
//         if (this.x >= innerWidth - 58 || this.x < 0) {
//             this.dx = -this.dx;
//         }
    
//         if (this.y >= 400 || this.y < 0) {
//             this.dy = -this.dy;
//         }
//         this.draw();
//     }

//     shoot() {
//         canvas.addEventListener('click', function(e) { 
//             mouse.x = e.clientX;
//             mouse.y = e.clientY;
//             console.log(mouse.x, this.x, this.x + 0.08 * canvas.width);
//             if (mouse.x >= this.x && mouse.x < (this.x + (0.08 * canvas.width))) {
//                 console.log("This is a hit!");
//             } else {
//                 console.log("This is not a hit");
//             }            
//         });
//     }       
//     die() {


//     }
// }

function Ship(x , y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    var continueAnimating = true;

    this.draw = function() {
        if(!continueAnimating) {return;}
        var shipImg = new Image();
        shipImg.src ="Images/Single Ship Sprite.png"; 
        c.drawImage(shipImg, this.x, this.y, .08 * canvas.width, .08 * canvas.height);
       
    }

    this.update = function() {
        if (this.x >= innerWidth - 58 || this.x < 0) {
            this.dx = -this.dx;
        }
    
        if (this.y >= 400 || this.y < 0) {
            this.dy = -this.dy;
        }
    
        let newLocX = this.x += this.dx;
        let newLocY = this.y += this.dy;

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

        this.shoot = function () {
            canvas.addEventListener('click', function(e) {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
                // let ship = shipArray[i];
                let xOffset = this.x - canvasLeft;
                let yOffset = this.y - canvasTop;
                this.x = x;
                this.y = y;
                let survivingShips = [];
                let hitShips = [];
                // console.log("Mouse clicked on:" + mouse.x, mouse.y);
                // console.log("The ship coordinates are: " + this.x, this.y);
                for (var i = 0; i < shipArray.length; i++) {
                //     // if((mouse.x < xOffset + shipDimensions.width - 48) && (xOffset - 60 < mouse.x) { 
                //         if((mouse.y > yOffset + 30) && 
                //         (mouse.y < yOffset + 30 + shipDimensions.height)) {
                //             console.log("Hit a ship!");
                //             hitShips.push(ship);
                //             console.log(hitShips);
                //     }
                //      else {
                //     console.log("Did not hit.");
                //     survivingShips.push(ship);
                // }
                // console.log(this.x, this.y)
                // console.log(, mouse.y)
                // console.log(mouse.x, this.x,this.x + 0.08 * canvas.width);
                console.log(mouse.x, this.x, this.x + shipDimensions.width);
                var ship = shipArray[i];
                if (mouse.x >= this.x && mouse.x < (this.x + shipDimensions.width - 20) 
                    && (mouse.y >= (this.y + 70) && mouse.y < (this.y + shipDimensions.height) + 50)) {
                // if (mouse.y >= (this.y + 80) && (mouse.y < (this.y + shipDimensions.height + 80))
                //     && mouse.x >= (this.x + (shipDimensions.width/2)) && mouse.x < (this.x)) {
                    console.log('Landed a hit!');
                    hitShips.push(ship);
                    continueAnimating = false;

                } else {
                    console.log("Miss");
                    survivingShips.push(ship);
                }
                    shipsOnScreen = survivingShips;
                }   
            });
        }
        this.shoot();
}



/*----- app's state (variables) -----*/


/*----- cached element references -----*/


/*----- event listeners -----*/

//Shoot Functionality 
// let mouse = {
//     x: null,
//     y: null

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
        shipArray[i].draw();
        shipArray[i].update();
        shipArray[i].shoot();
    }
}
animate();

//Ships Getting shot
function die() {

}

function changeImg() {

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
