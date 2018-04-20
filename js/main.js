(() => {
  //this is a fat arrow function
console.log('Starship Trooper Game');
	var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    var tempButton = document.querySelector('.button');
    var bug = document.querySelector('#warrior_bug');
    var guns =  [1, 2, 3];
    var lasers = [
      { x : 849, y : 90, x2 : 30, y2 : 30, xspeed : 13, yspeed: 12, points : 10 },
      { x : 849, y : 260, x2 : 40, y2 : 40, xspeed : 12, yspeed: 9,  points : 5},
      { x : 849, y : 430, x2 : 35, y2 : 35, xspeed : 15, yspeed: 8, points : 10 }
    ]
    //grab the gun images
    var gun = document.querySelector('.gun');

    var laser = document.querySelector('#laser');
    var laserStart = 703;
    var score = 0;
    var playerLives = [1, 2, 3];
    // var TempLives = [1,2,3];
    // var popped = playerLives.pop();
    var playerImg = document.querySelector('#livesImg');
    var playState = true;
    var resetScreen = document.querySelector('.nextlevel');
    var restartButton = document.querySelector('#playAgain');

    var bugPlayer = { x: 90, y: 290, width: 130, height: 70, speed: 10, lives: 3};

function Draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height); //erasing the canvas

  //drawing the score first
  ctx.fillStyle = 'rgb(101,52,141)';
  ctx.font = '25px Orbitron';
  ctx.fillText(`Score: ${score}`, 450, 40);

  //life icons
  playerLives.forEach((life, index) => {
    ctx.drawImage(playerImg, 10 + (index*36), 10, 30, 30);
  });

  //draw lasers
  lasers.forEach((bullet, index) => {
    ctx.drawImage(laser, bullet.x, 90 + (index*170), 115, 10);
    bullet.x -= bullet.xspeed;
    if (bullet.x < 0) {bullet.x =849}; // bullet speed

    //check for collision
    if (bullet.x <= (bugPlayer.x + bugPlayer.width) && bullet.x > bugPlayer.x && bullet.y > bugPlayer.y && bullet.y < (bugPlayer.y + bugPlayer.height)) { //(bullet.x <= (bugPlayer.x + bugPlayer.width))
      console.log('hit')
        playerLives.pop();
        removeLife();
      // lasers.splice(index, 0);
      // bugPlayer.splice();
    }
  });

  // draw guns
  guns.forEach((currentGun, index) => {
    ctx.drawImage(gun, 850, 70 + (index*170), 130, 70);
  });

  //draw Bug
  ctx.drawImage(bug, bugPlayer.x, bugPlayer.y, bugPlayer.width, bugPlayer.height);
  if (bugPlayer.x > canvas.width) {score+=1};

 //  //draw Laser
	// ctx.drawImage (laser, laserStart, 225, 150, 10);
	// 	laserStart-=5;
	// 	if (laserStart < canvas.width) {laserStart = 0}

  if (playState === false) {
    window.cancelAnimationFrame(Draw);
    return;
  }

		window.requestAnimationFrame(Draw);
};

function moveBug(e) {
    e.preventDefault();
    //debugger;
    switch (e.keyCode) {
      //left arrow key
      case 37:
      console.log('move bug to the left');
      if (bugPlayer.x > 0) {
        bugPlayer.x -=15;
      }
      break;

      //right
        //debugger;
      case 39:
      console.log('move bug to the right');
      if (bugPlayer.x > canvas.width) {
        bugPlayer.x = 0;
      } else {
        bugPlayer.x +=15;
      }
      break;

      //up
        //debugger;
      case 38:
      console.log('move bug up');
      if (bugPlayer.y > 0) {
        bugPlayer.y -=15;
      }
      break;

      //down
        //debugger;
      case 40:
      console.log('move bug down');
      if (bugPlayer.y > canvas.height) {
        bugPlayer.y = 0;
        } else {
           bugPlayer.y +=15;
        }
      break;
      }
  }

  function removeLife () {
    playState = false;
		playerLives.pop();

    if (playerLives.length ==0) {
      console.log ('show lose screen');
    resetScreen.classList.add('show-next-level');
    bugPlayer.x = 90;
    bugPlayer.y = 100;
    }
  }

  function restartGame () {
    playState =true;
    Draw();
    resetScreen.classList.remove('show-next-level');
  }

	bugPlayer.x = 90;
	bugPlayer.y = 290;

window.requestAnimationFrame(Draw);

//move bug with keys
window.addEventListener ('keydown', moveBug);
tempButton.addEventListener ('click', removeLife);
restartButton.addEventListener('click', restartGame);

})();
