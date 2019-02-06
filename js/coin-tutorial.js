//width and height of canvas...
var rW = window.innerWidth;
var rH = window.innerHeight;

var bgImage = getBgImage();
var shipImage = getShipImage();
var shipsOnScreen = [];
var risingSpeed = 50; //pixels per second...
var shipSize = 75;

var lastAnimationTime = 0;
var howLongUntilNextShip = 1000;
var nextShipOnScreen = 0;

function doDraw() {
  var can = document.querySelector('canvas');;
  can.width  = window.innerWidth;
  can.height = window.innerHeight;
  var context = can.getContext("2d");

  //Erase the canvas
//   context.fillStyle = "#ffffff";
//   context.fillRect(0, 0, window.innerWidth, window.innerHeight);

  if (new Date().getTime() - nextShipOnScreen > 0) {

    var newX = Math.floor(Math.random() * rW) + 1;
    var newY = rH + 50;

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
      if (x > ship.x && x < ship.x + shipSize && y > ship.y && y < ship.y + shipSize) {
        //ths ship will disappear because it is not inserted into the new array...
        console.log("Ship was clicked!! " + x + " " + y);
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