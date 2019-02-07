/*----- constants -----*/
const sounds = {
    gunshot:'file:///Users/kyleanderson/git/WDI/WDI-Game-Project/Sounds/Gunshot1.mp3',
    hillbillyYeehaw: 'file:///Users/kyleanderson/git/WDI/WDI-Game-Project/Sounds/Hillbilly_Yeehaw.wav',
    alien: 'file:///Users/kyleanderson/git/WDI/WDI-Game-Project/Sounds/UFO_Ship.wav',
    hillbillySong: 'file:///Users/kyleanderson/git/WDI/WDI-Game-Project/Sounds/Bluegrass_Banjo_Song.wav'
}

/*----- app's state (variables) -----*/
var shipSpeed = {
    dx: (Math.random()) * 4,
    dy: (Math.random()) * 4
}
var shipDimensions = {
    width: .10 * canvasWidth,
    height: .10 * canvasHeight
};

var score = 0;

/*----- cached element references -----*/
const player = new Audio();


/*----- event listeners -----*/
// document.querySelector('.reset-btn').addEventListener("click", init);

/*----- functions -----*/
function playSound(name) {
    player.src = sounds[name];
    player.play();
}

var canvasWidth =  0.5 * window.innerWidth;
var canvasHeight = window.innerHeight;
var can = document.querySelector('canvas');;
var context = can.getContext("2d");

// var bgImage = getBgImage();
var shipImage = getShipImage();
var shipsOnScreen = [];
var lastAnimationTime = 0;
var howLongUntilNextShip = 3000;
var nextShipOnScreen = 0;
var hillbillyImage = getHillbillyImage();

var shipDimensions = {
    width: .10 * canvasWidth,
    height: .10 * canvasHeight
};

var ship = {
    x: Math.floor(Math.random() * (canvasWidth)),
    y: Math.floor(Math.random() * (.7 * canvasHeight)),
}


function doDraw() {
  var can = document.querySelector('canvas');;
  can.width  =window.innerWidth;
  can.height = window.innerHeight;
  var context = can.getContext("2d");

  if (new Date().getTime() - nextShipOnScreen > 0) {

    var newX = Math.floor(Math.random() * (canvasWidth * .8));
    var newY = Math.floor(Math.random() * (.55 * canvasHeight));

    var newShip = {
      x: newX,
      y: newY
    };

    shipsOnScreen.push(newShip);
    nextShipOnScreen = new Date().getTime() + howLongUntilNextShip;
  }

  //Now draw the ships
  if (lastAnimationTime != 0) {
    // var deltaTime = new Date().getTime() - lastAnimationTime;
    // var shipVerticalPixels = Math.floor((deltaTime * shipSpeed.dx)/500);
    // var shipHorizontalPixels = Math.floor((deltaTime * shipSpeed.dx) /500);
    var survivingShips = [];
    for (var i = 0; i < shipsOnScreen.length; i++) {
        var ship = shipsOnScreen[i];
        var newShip = {
            x: newX,
            y: newY
          };
        var newShipSpeed = {
            dx: (Math.random() - 0.5) * 7,
            dy: (Math.random() - 0.5) * 7,
        }    

        var newX = Math.floor(Math.random() * (canvasWidth * .6));
        var newY = Math.floor(Math.random() * (.6 * canvasHeight));

          function update() {
            if (ship.x + shipDimensions.width - 30  > canvasWidth || ship.x < 0) {
                shipSpeed.dx = -shipSpeed.dx
            }
            if (ship.y > (canvasHeight * .60) || ship.y < 0) {
                shipSpeed.dy = -shipSpeed.dy;
            }
                ship.x = ship.x + shipSpeed.dx;
                ship.y = ship.y + shipSpeed.dy;
            }    
      //the stl variable controlls the alpha of the image            
    //   if ((ship.y + shipDimensions.height < (canvasHeight * .6) && ship.y > 0) && 
    //         (ship.x + shipDimensions.width - 30 < canvasWidth && ship.x > 0)) {
    
        context.drawImage(shipImage, ship.x, ship.y);
        function drawScore() {
            context.font = "20px Arial white";
            context.fillText("Score: " + score, 15, 30);
        }

        //this ship is still on the screen, so promote it to the new array...
        survivingShips.push(ship);
    //   }
      update();
    }
    shipsOnScreen = survivingShips;
  }
 
  lastAnimationTime = new Date().getTime();
  //Wait, and then call this function again to animate:
  setTimeout(function() {
    doDraw();
  }, 30);
}

function setupClickHandler() {
  var can = document.querySelector('canvas');
  //Here is the onclick handler
  can.onclick = function(e) {
    var gunshot = new Audio('file:///Users/kyleanderson/git/WDI/WDI-Game-Project/Sounds/Gunshot1.mp3');
    gunshot.play();
     x = e.clientX;
     y = e.clientY;
    var survivingShips = [];
    for (var i = 0; i < shipsOnScreen.length; i++) {
      var ship = shipsOnScreen[i];
      //check to see if this coin has been clicked...
      if (x > ship.x && x < ship.x + shipDimensions.width && y > (ship.y + 60) && y < ship.y + (shipDimensions.height + 33)) {
        //ths ship will disappear because it is not inserted into the new array...
        score += 100;
        console.log(score);
        // console.log("Mouse coordinates " + x + " " + y + " Ship coordinates " + ship.x + " " + ship.y);
        //  return score +100;
      } else {
        survivingShips.push(ship);
      }

    }
    shipsOnScreen = survivingShips;
  };

}

function getShipImage() {
  var shipImg = new Image(50, 50);
  shipImg.src = "Images/Single Ship Sprite.png";
  return shipImg;
}

function getHillbillyImage() {
    var hillbillyImage = new Image (120, 150);
    hillbillyImage.src = "Images/Single Ship Sprite.png";
    return hillbillyImage;
}

// function getBgImage() {
//     var bgImg = new Image (window.innerWidth, window.innerHeight);
//     bgImg.src = "file:///Users/kyleanderson/git/WDI/WDI-Game-Project/Images/Background.png";
//     return bgImg;
// }

function drawScore() {
    context.font = "20px Arial white";
    context.fillText("Score: " + score, 15, 30);
}

function drawTimer() {
    var timeLeft = 30;
    var downloadTimer = setInterval(function() {
        document.getElementById("timer").innerHTML = timeLeft + " seconds remaining!";
        timeLeft -= 1;
        if(timeLeft <= 0) {
            clearInterval(downloadTimer);
            document.getElementById("timer").innerHTML = "Finished!"
            endGame();
        }
    }, 1000);
}    

function startGame() {
    var can = document.querySelector('canvas');;
    can.width  = window.innerWidth;
    can.height = window.innerHeight;
    var context = can.getContext("2d");
    context.drawImage(hillbillyImage, canvasWidth * .2, canvasHeight * .8);
}

function endGame() {
    // alert(`You scored ${score} points!`);
    context.drawImage(shipImage, ship.x, ship.y);
    function drawScore() {
        context.font = "20px Arial white";
        context.fillText("Score: " + score, 15, 30);
    }

}

function hillbillyYeehaw() {
    var hillbillyYeehaw = new Audio('file:///Users/kyleanderson/git/WDI/WDI-Game-Project/Sounds/Hillbilly_Yeehaw.wav');
    setInterval(() => {
        hillbillyYeehaw.play();
    }, 15000)}

 function alienSound() {
     var alienSound = new Audio('file:///Users/kyleanderson/git/WDI/WDI-Game-Project/Sounds/UFO_Ship.wav');
     setInterval(() => {
         alienSound.play();
     }, 10000)}  
     
function animate() {
    requestAnimationFrame(animate);
        drawScore();
}     

function init() {
    var can = document.querySelector('canvas');;
    can.width  = window.innerWidth;
    can.height = window.innerHeight;
    var context = can.getContext("2d");
}


// hillbillyYeehaw();
// alienSound();
startGame();
endGame();
drawTimer();
getHillbillyImage();
// init();
doDraw(); 
setupClickHandler();
animate();

