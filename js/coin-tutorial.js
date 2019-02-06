//width and height of canvas...
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;

var bgImage = getBgImage();
var shipImage = getShipImage();
var shipsOnScreen = [];
var risingSpeed = 0; //pixels per second...
var shipSpeed = {
    dx: 0,
    dy: 0
}

// var shipSize = 200;

var shipDimensions = {
    width: .10 * canvasWidth,
    height: .10 * canvasHeight
};

var lastAnimationTime = 0;
var howLongUntilNextShip = 1000;
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
    var shipRisePixels = Math.floor((deltaTime * risingSpeed) / 1000);

    var survivingShips = [];
    for (var i = 0; i < shipsOnScreen.length; i++) {
      var ship = shipsOnScreen[i];
      ship.y = ship.y - shipRisePixels;
      //the stl variable controlls the alpha of the image            
      if (ship.y + 50 > 0) {
        context.drawImage(shipImage, ship.x, ship.y);
        //this ship is still on the screen, so promote it to the new array...
        survivingShips.push(ship);
      }
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
    var x = e.clientX;
    var y = e.clientY;
    var survivingShips = [];
    for (var i = 0; i < shipsOnScreen.length; i++) {
      var ship = shipsOnScreen[i];
      //check to see if this coin has been clicked...
      if (x > ship.x && x < ship.x + shipDimensions.width && y > (ship.y + 60) && y < ship.y + (shipDimensions.height + 33)) {
        //ths ship will disappear because it is not inserted into the new array...
        console.log("Mouse coordinates " + x + " " + y + " Ship coordinates " + x + " " + y);
      } else {
        survivingShips.push(ship);
      }

    }
    shipsOnScreen = survivingShips;
  };

}


doDraw();
setupClickHandler();

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