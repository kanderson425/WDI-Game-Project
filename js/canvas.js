
const sounds = {
    gunshot:'file:///Users/kyleanderson/git/WDI/WDI-Game-Project/Sounds/Gunshot1.mp3',
    hillbillyYeehaw: 'file:///Users/kyleanderson/git/WDI/WDI-Game-Project/Sounds/Hillbilly_Yeehaw.wav',
    alien: 'file:///Users/kyleanderson/git/WDI/WDI-Game-Project/Sounds/UFO_Ship.wav',
    hillbillySong: 'file:///Users/kyleanderson/git/WDI/WDI-Game-Project/Sounds/Bluegrass_Banjo_Song.wav'
}


var shipDimensions = {
    width: .10 * canvasWidth,
    height: .10 * canvasHeight
};

var score = 0;
var timeLeft = 30;


const player = new Audio();

document.querySelector('.reset-btn').addEventListener("click", reload);

var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
var can = document.querySelector('canvas');;
var context = can.getContext("2d");

// var bgImage = getBgImage();
var shipImage = getShipImage();
var shipsOnScreen = [];
var lastAnimationTime = 0;
var howLongUntilNextShip = 500;
var nextShipOnScreen = 0;
var hillbillyImage = getHillbillyImage();

var shipDimensions = {
    width: .10 * canvasWidth,
    height: .10 * canvasHeight
};

var ship = {
    x: Math.floor(Math.random() * (.9 * canvasWidth)),
    y: Math.floor(Math.random() * (.55 * canvasHeight)),
    dx: (Math.random() - 1) * 3,
    dy: (Math.random() - 1) * 3
}

/*----- functions -----*/
function drawScore() {
    context.font = "20px Arial white";
    context.fillText("Score: " + score, 15, 30);
}

function drawTimer() {
    var downloadTimer = setInterval(function() {
        document.getElementById("timer").innerHTML = timeLeft + " seconds remaining!";
        timeLeft -= 1;
        if(timeLeft <= 0) {
            clearInterval(downloadTimer);
            document.getElementById("timer").innerHTML = "Finished!"
        }
    }, 1000);
}  

function startGame() {
    var titlePage = document.querySelector('title-page')
    var can = document.querySelector('canvas');
    can.width  = window.innerWidth;
    can.height = window.innerHeight;
    var context = can.getContext("2d");
    // titlePage.style.display = "none";
    // context.drawImage(hillbillyImage, can.width * .2, can.height * .8);
}

function doDraw() {
    if (timeLeft > 0) {
        var can = document.querySelector('canvas');
        can.width  =window.innerWidth;
        can.height = window.innerHeight;
        var context = can.getContext("2d");

        if (new Date().getTime() - nextShipOnScreen > 0) {
            var newShip = {
            x: Math.floor(Math.random() * (.9 * canvasWidth)),
            y: Math.floor(Math.random() * (.55 * canvasHeight)),
            dx: (Math.random() - 1) * 3,
            dy: (Math.random() - 1) * 3
            };

            shipsOnScreen.push(newShip);
            nextShipOnScreen = new Date().getTime() + howLongUntilNextShip;
        }
        if (lastAnimationTime != 0) {
            var survivingShips = [];
            for (var i = 0; i < shipsOnScreen.length; i++) {
                var ship = shipsOnScreen[i];
                function update() {
                    if (ship.x + shipDimensions.width - 60 > canvasWidth || ship.x < 0) {
                        ship.dx = -ship.dx
                    }
                    if (ship.y > (canvasHeight * .60) || ship.y < 0) {
                        ship.dy = -ship.dy;
                    }
                    ship.x += ship.dx;
                    ship.y += ship.dy;
                    }
                context.drawImage(shipImage, ship.x , ship.y);
                survivingShips.push(ship);
                update();
            }
            shipsOnScreen = survivingShips;
        }
        lastAnimationTime = new Date().getTime();
        setTimeout(function() {
            doDraw();
        }, 30);
    } else {
        for (var i = 0; i < shipsOnScreen.length; i++) {
            var ship = shipsOnScreen[i];
            ship.dx = 0;
            ship.dy = 0;
                ship.x + ship.dx;
                ship.y + ship.dy;
        }
        endGame();
    }
}

function setupClickHandler() {
    if(timeLeft > 0) {
        var can = document.querySelector('canvas');
        can.onclick = function(e) {
            var gunshot = new Audio('file:///Users/kyleanderson/git/WDI/WDI-Game-Project/Sounds/Gunshot1.mp3');
            gunshot.play();
            x = e.clientX;
            y = e.clientY;
            var survivingShips = [];
            console.log(window.innerWidth, window.innerHeight);
            for (var i = 0; i < shipsOnScreen.length; i++) {
            var ship = shipsOnScreen[i];
            console.log("Mouse X = " + e.clientX + " X = " + (ship.x + 200) + " X + width = " + (ship.x + shipDimensions.width + 60 + 
                " Mouse Y = " + e.clientY + " Y = " + (ship.y + 70) + " Y + Height  = " + (ship.y + shipDimensions.height + 60)));
            //check to see if this ship has been shot
            if (x > ship.x && x < (ship.x + shipDimensions.width) && y > (ship.y + 70) && y < ship.y + (shipDimensions.height + 60)) {
                //ths ship will disappear because it is not inserted into the new array
                score += 1;
            } else {
                survivingShips.push(ship);
            }

            }
            shipsOnScreen = survivingShips;
        };
    } else {
        return score;
    }
}    

function endGame() {
    console.log("The game has ended!");
    context.drawImage(hillbillyImage, canvasWidth * .7, canvasHeight * .7);
    context.font = "40px DriftType Regular";
    context.fillText(`You done shawt ${score} uv 'dem buggers!`,canvasWidth * .2, canvasHeight * .2);
}

function getShipImage() {
  var shipImg = new Image(.1 * canvasWidth, .1 * canvasHeight);
  shipImg.src = "Images/Single Ship Sprite.png";
  return shipImg;
}

function getHillbillyImage() {
    var hillbillyImage = new Image (10, 10);
    hillbillyImage.src = "file:///Users/kyleanderson/git/WDI/WDI-Game-Project/Images/Cartoon_hillbilly_with_rifle.png";
    return hillbillyImage;
}

function hillbillyYeehaw() {
    if(timeLeft > 0) {
    var hillbillyYeehaw = new Audio('file:///Users/kyleanderson/git/WDI/WDI-Game-Project/Sounds/Hillbilly_Yeehaw.wav');
    setInterval(() => {
        hillbillyYeehaw.play();
    }, 15000)
    } else {
    //STOP THE SOUND//
    }   
} 

 function alienSound() {
     if(timeLeft > 0) {
     var alienSound = new Audio('file:///Users/kyleanderson/git/WDI/WDI-Game-Project/Sounds/UFO_Ship.wav');
     setInterval(() => {
         alienSound.play();
     }, 10000)
    } else {
        //STOP THE SOUND//
    } 
}    
     
function animate() {
    requestAnimationFrame(animate);
        drawScore();
}     

function reload() {
    window.location.reload();
}

function init() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    score = 0;
    hillbillyYeehaw();
    alienSound();
    startGame();
    // endGame();
    drawTimer();
    // getHillbillyImage();
    // init();
    doDraw(); 
    setupClickHandler();
    animate();
}


init();

