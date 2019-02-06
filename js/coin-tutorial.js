//width and height of canvas...
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
var can = document.querySelector('canvas');;
var context = can.getContext("2d");

var bgImage = getBgImage();
var shipImage = getShipImage();
var shipsOnScreen = [];
var risingSpeed = 50; //pixels per second...

var shipSpeed = {
    dx: (Math.random() - 0.5) * 5,
    dy: (Math.random() - 0.5) * 5
}

var shipDimensions = {
    width: .10 * canvasWidth,
    height: .10 * canvasHeight
};

var lastAnimationTime = 0;
var howLongUntilNextShip = 10000;
var nextShipOnScreen = 0;

function doDraw() {
  var can = document.querySelector('canvas');;
  can.width  = window.innerWidth;
  can.height = window.innerHeight;
  var context = can.getContext("2d");

  if (new Date().getTime() - nextShipOnScreen > 0) {

    var newX = Math.floor(Math.random() * canvasWidth) + 1;
    var newY = Math.floor(Math.random() * (.7 * canvasHeight));

    var newShip = {
      x: newX,
      y: newY
    };

    shipsOnScreen.push(newShip);
    nextShipOnScreen = new Date().getTime() + howLongUntilNextShip;
  }

  //Now draw the ships
  if (lastAnimationTime != 0) {
    var deltaTime = new Date().getTime() - lastAnimationTime;
    var shipVerticalPixels = Math.floor((deltaTime * shipSpeed.dx) / 1000);
    var shipHorizontalPixels = Math.floor((deltaTime * shipSpeed.dx) / 1000);


    var survivingShips = [];
    for (var i = 0; i < shipsOnScreen.length; i++) {
        var ship = shipsOnScreen[i];
        var newShip = {
            x: newX,
            y: newY
          };    
          function update() {
            if (ship.x + shipDimensions.width - 30  > canvasWidth || ship.x < 0) {
                shipSpeed.dx = -shipSpeed.dx
            }
            if (ship.y + shipDimensions.height > (canvasHeight * .60) || ship.y < 0) {
                shipSpeed.dy = -shipSpeed.dy;
            }
                ship.x += shipSpeed.dx;
                ship.y += shipSpeed.dy;
            }    
      //the stl variable controlls the alpha of the image            
      if (ship.y + 50 > 0 && ship.x + 50 > 0) {
        context.drawImage(shipImage, ship.x, ship.y);
        //this ship is still on the screen, so promote it to the new array...
        survivingShips.push(ship);
      }
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

// function animate() {
//     requestAnimationFrame(animate);
//     context.clearRect(0,0, canvasWidth, canvasHeight);
//     for (var i = 0; i < shipsOnScreen.length; i++) {
//         let ship = shipsOnScreen[i];
//         ship.update();
//     };
// }

function setupClickHandler() {
  var can = document.querySelector('canvas');
  //Here is the onclick handler
  can.onclick = function(e) {
    var x = e.clientX;
    var y = e.clientY;
    var survivingShips = [];
    for (var i = 0; i < shipsOnScreen.length; i++) {
      var ship = shipsOnScreen[i];
      //check to see if this coin has been clicked...
      if (x > ship.x && x < ship.x + shipDimensions.width && y > (ship.y + 60) && y < ship.y + (shipDimensions.height + 33)) {
        //ths ship will disappear because it is not inserted into the new array...
        console.log("Mouse coordinates " + x + " " + y + " Ship coordinates " + ship.x + " " + ship.y);
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

function getBgImage() {
    var bgImg = new Image (window.innerWidth, window.innerHeight);
    bgImg.src = "file:///Users/kyleanderson/git/WDI/WDI-Game-Project/Images/Background.png";
    return bgImg;
}

document.querySelector('.reset-btn').addEventListener("click", init);

function init() {
    let shipsOnScreen = [];
    let survivingShips = [];
    let ship = shipsOnScreen[i];
    for (var i = 0; i < 5; i++) {
        var x = Math.random() * (canvasWidth - 58);
        var y = Math.floor(Math.random() * (.7 * canvasHeight));
        var dx = (Math.random() - 0.5) * shipSpeed.dx;
        var dy = (Math.random() - 0.5) * shipSpeed.dy;
        survivingShips.push(ship);
    }
}

init();
doDraw();
// animate();
setupClickHandler();