
var canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');
//width and height of canvas...
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var shipImg = getShipImage();
var shipsOnScreen = [];
var risingSpeed = 100; //pixels per second...
var shipSize = 60;

var lastAnimationTime = 0;
var howLongUntilNextShip = 1000;
var nextShipOnScreen = 0;

function doDraw() {
    var canvas = document.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let c = canvas.getContext('2d');

  //Erase the canvas
  c.fillRect(0, 0, window.innerWidth, window.innerHeight);

  if (new Date().getTime() - nextShipOnScreen > 0) {

    var newX = Math.floor(Math.random() * canvas.width) + 1;
    var newY = canvas.height + 50;

    var newShip = {
      x: newX,
      y: newY
    };
    shipsOnScreen.push(newShip);
    nextShipOnScreen = new Date().getTime() + howLongUntilNextShip;
  }

  //Now draw the coins
  if (lastAnimationTime != 0) {

    var deltaTime = new Date().getTime() - lastAnimationTime;
    var shipRisePixels = Math.floor((deltaTime * risingSpeed) / 1000);

    var survivingShips = [];
    for (var i = 0; i < shipsOnScreen.length; i++) {
      var ship = shipsOnScreen[i];
      ship.y = ship.y - shipRisePixels;
      //the stl variable controlls the alpha of the image            
      if (ship.y + 50 > 0) {
        c.drawImage(shipImage, ship.x, ship.y);
        //this coin is still on the screen, so promote it to the new array...
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
  var canvas = document.querySelector('canvas');
  //Here is the onclick handler
  canvas.onclick = function(e) {
    var x = e.clientX;
    var y = e.clientY;
    var survivingShips = [];
    for (var i = 0; i < shipsOnScreen.length; i++) {
      var ship = shipsOnScreen[i];
      //check to see if this coin has been clicked...
      if (x > ship.x && x < ship.x + shipSize && y > ship.y && y < ship.y + shipSize) {
        //ths coin will disappear because it is not inserted into the new array...
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
  var shipImg = new Image();
  shipImg.src = "Images/Single Ship Sprite.png"
  return shipImg;
}