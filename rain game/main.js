var gameContainer = document.getElementById('game-container');
var player = document.getElementById('player');
var score = 0;
var gameOver = false;

var umbrella;
var umbrellaActive = false;

function createUmbrella() {
  if (gameOver) {
    return;
}

umbrella = document.createElement('img');
umbrella.src = 'umbrella.png';
umbrella.className = 'umbrella';
umbrella.style.left = Math.floor(Math.random() * (gameContainer.offsetWidth - 60)) + 'px';
umbrella.style.top = '-100px';
gameContainer.appendChild(umbrella);

var animationInterval = setInterval(function() {
    var topPos = parseInt(umbrella.style.top);
    umbrella.style.top = (topPos + 10) + 'px';

    if (topPos > (gameContainer.offsetHeight - umbrella.offsetHeight)) {
      if (isColliding(umbrella, player)) {
        umbrellaActive = true;
        player.classList.add('umbrella-active');
        gameContainer.removeChild(umbrella);
        setTimeout(deactivateUmbrella, 5000); // 雨傘持續5秒後取消保護
      } else {
        gameContainer.removeChild(umbrella);
      }

      clearInterval(animationInterval);
    }
  }, 50);

  setTimeout(createUmbrella, 10000); // 每10秒創建一個新的雨傘
}

function deactivateUmbrella() {
  umbrellaActive = false;
  player.classList.remove('umbrella-active');
}

gameContainer.addEventListener('mousemove', function(event) {
  var containerRect = gameContainer.getBoundingClientRect();
  var containerLeft = containerRect.left;
  var containerWidth = containerRect.width;
  var mouseX = event.clientX;
  var playerWidth = player.offsetWidth;

  var playerLeft = mouseX - containerLeft - (playerWidth / 2);

  if (playerLeft >= 0 && playerLeft <= (containerWidth - playerWidth)) {
    player.style.left = playerLeft + 'px';
  }
});

function createRaindrop() {
  if (gameOver) {
    return;
  }

  var raindrop = document.createElement('img');
  raindrop.src = 'rain.png';
  raindrop.className = 'raindrop';
  raindrop.style.left = Math.floor(Math.random() * (gameContainer.offsetWidth - 50)) + 'px';
  raindrop.style.top = '0px';
  gameContainer.appendChild(raindrop);

  var animationInterval = setInterval(function() {
    var topPos = parseInt(raindrop.style.top);
    raindrop.style.top = (topPos + 10) + 'px';

    if (topPos > (gameContainer.offsetHeight - raindrop.offsetHeight)) {
      if (isColliding(raindrop, player)) {
        endGame();
      } else {
        gameContainer.removeChild(raindrop);
        score++;
        updateScore();
      }

      clearInterval(animationInterval);
    }
  }, 50);

  setTimeout(createRaindrop, 1000);
}


function isColliding(element1, element2) {
    var rect1 = element1.getBoundingClientRect();
    var rect2 = element2.getBoundingClientRect();

    if (element1.classList.contains('umbrella') && element2 === player) {
        return false; // 雨傘和玩家不會產生碰撞
    }

    return !(rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom ||
      rect2.right < rect1.left ||
      rect2.left > rect1.right ||
      rect2.bottom < rect1.top ||
      rect2.top > rect1.bottom);
    
      
}
  

function endGame() {
  gameOver = true;



  var dialogContainer = document.createElement('div');
  dialogContainer.className = 'dialog-container';

  var dialogBox = document.createElement('div');
  dialogBox.className = 'dialog-box';

  var message = document.createElement('p');
  message.textContent = '遊戲結束！得分：' + score;

  var restartButton = document.createElement('button');
  restartButton.textContent = '重新開始';
  restartButton.addEventListener('click', restartGame);

  dialogBox.appendChild(message);
  dialogBox.appendChild(restartButton);
  dialogContainer.appendChild(dialogBox);

  gameContainer.appendChild(dialogContainer);
  // 停止創建雨滴的計時器

}

function restartGame() {
  location.reload();
}

function updateScore() {
  document.getElementById('score').textContent = '得分：' + score;
}

createRaindrop();
