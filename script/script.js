let levels = [];

levels[0] = {
  maze1: [
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 1, 1, 1, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 1, 1, 1, 0, 0],
  ],
  player: {
    x: 0,
    y: 10,
  },
  goal: {
    x: 9,
    y: 0,
  },
  theme: "default",
};

const mazeArea = $("#mazeArea")

// draw the maze
for (let i = 0; i < levels[0].maze1.length; i++) {
  for (let j = 0; j < levels[0].maze1[0].length; j++)
    if (levels[0].maze1[i][j] === 0) {
      mazeArea.append($(`<div class="mazeTile"></div>`));
    } else {
      mazeArea.append($(`<div class="mazeTile mazeTileWall"></div>`));
    }
}

mazeArea.append($('<div id="player"></div>'));
mazeArea.append($('<div id="enemy"></div>'));
mazeArea.append($('<div id="enemy2"></div>'));
mazeArea.append($('<div id="blueKey"><img id="blueKeyImage" src="images/key.png" alt="blue key"></div>'));
mazeArea.append($('<div id="closedDoor"><img id="closedDoorImage" src="images/double-door.png" alt="closed door"></div>'));
mazeArea.append($('<div id="openDoor"><img id="openDoorImage" src="images/opened-double-door.png" alt="open door"></div>'));
mazeArea.append($('<div id="blueKey2"><img id="blueKeyImage2" src="images/key.png" alt="blue key"></div>'));
mazeArea.append($('<div id="door2"><img id="door2Image" src="images/double-door.png" alt="closed door"></div>'));
mazeArea.append($('<div id="target"><img id="targetImage" src="images/target.png" alt="target"></div>'));


$("html").keydown(playerMovement);

const player = $("#player");
// css positions
let playerCSSVertical = -50;
let playerCSSHorizontal = 0;
// maze array positions
let x = levels[0].player.x;
let y = levels[0].player.y;
// player movements + limitations
function playerMovement(e) {
  if (e.key == "ArrowUp") {
    playerCSSVertical += -50;
    y += -1;
    if (y < 0 || levels[0].maze1[y][x] === 1) {
      playerCSSVertical += 50;
      y++;
      return;
    }
    player.css("top", playerCSSVertical);
    killed();
  }
  if (e.key == "ArrowDown") {
    playerCSSVertical += 50;
    y += 1;
    if (y > 10 || levels[0].maze1[y][x] === 1) {
      playerCSSVertical += -50;
      y += -1;
      return;
    }
    player.css("top", playerCSSVertical);
    killed();
  }
  if (e.key == "ArrowRight") {
    playerCSSHorizontal += 50;
    x += 1;
    if (x > 9 || levels[0].maze1[y][x] === 1) {
      playerCSSHorizontal += -50;
      x += -1;
      return;
    }
    player.css("left", playerCSSHorizontal);
    killed();
  }
  if (e.key == "ArrowLeft") {
    playerCSSHorizontal += -50;
    x += -1;
    if (x < 0 || levels[0].maze1[y][x] === 1) {
      playerCSSHorizontal += 50;
      x += 1;
      return;
    }
    player.css("left", playerCSSHorizontal);
    killed();
  }
}

// enemy
const enemy = $("#enemy");
let enemyCSSVertical = -50;
let enemyCSSHorizontal = 400;
// maze array positions
let enemyX = 9;
let enemyY = 10;

async function enemyMovement() {
  enemyCSSVertical = -50;
  enemyCSSHorizontal = 400;
  enemyX = 9;
  enemyY = 10;
  await enemyUp();
  await enemyLeft();
  await enemyDown();
  await enemyRight();
  enemyMovement()
}

const wait = (delay, ...args) =>
  new Promise((resolve) => setTimeout(resolve, delay, ...args));
// move up
async function enemyUp() {
  return wait(1000).then(() => {
    enemyCSSVertical += -50;
    enemyY--
    enemy.css("top", enemyCSSVertical);
    killed()
  });
}

//move left
async function enemyLeft() {
  return wait(1000).then(()=>{
    enemyCSSHorizontal += -50;
    enemyX--
    enemy.css("left", enemyCSSHorizontal);
    killed()
  })
}

async function enemyDown() {
  return wait(1000).then(()=>{
    enemyCSSVertical += 50;
    enemyY++
    enemy.css("top", enemyCSSVertical);
    killed()
  })
}

async function enemyRight() {
  return wait(1000).then(()=>{
    enemyCSSHorizontal += 50;
    enemyX++
    enemy.css("left", enemyCSSHorizontal);
    killed()
  });
}

const gameOverModal = $('#gameOver')
const gameContainer = $('#mazeContainer')

function killed() {
  if (enemyX === x && enemyY === y) {
    gameOverModal.css('display', 'block')
    gameContainer.css('opacity', '0.3')
    player.css('opacity', '0')
  }
  if (enemy2X === x && enemy2Y === y) {
    gameOverModal.css('display', 'block')
    gameContainer.css('opacity', '0.3')
    player.css('opacity', '0')
  }
}

$('.tryAgain').click(()=>{location.reload()})

enemyMovement()
const enemy2 = $("#enemy2");
let enemy2CSSVertical = -300;
let enemy2CSSHorizontal = 300;
// maze array positions
let enemy2X = 8;
let enemy2Y = 5;

async function enemy2MovementUp() {
  return wait(800).then(()=>{
    enemy2CSSVertical += -50;
    enemy2Y--
    enemy2.css("top", enemy2CSSVertical);
    killed()
  })
}

async function enemy2MovementDown() {
  return wait(800).then(()=>{
    enemy2CSSVertical += 50;
    enemy2Y++
    enemy2.css("top", enemy2CSSVertical);
    killed()
  })
}

async function enemy2Movement(){
  for (let i=0;i<3;i++){
    await enemy2MovementUp()}
  for (let i=0;i<3;i++){
    await enemy2MovementDown()}
  enemy2Movement()
}
enemy2Movement()

//key1
levels[0].maze1[9][5] = 1
const keyChecker = setInterval(()=>{
if (x===0 && y===0){
  $('#blueKeyImage').css('opacity', '0')
  $('#closedDoor').css('display', 'none')
  $('#openDoor').css('display', 'block')
  levels[0].maze1[9][5] = 0
  clearInterval(keyChecker)
}
}, 100)

//key2
levels[0].maze1[2][6] = 1
const key2Checker = setInterval(()=>{
if (x===9 && y===10){
  $('#blueKeyImage2').css('opacity', '0')
  $('#door2Image').attr('src', 'images/opened-double-door.png')
  levels[0].maze1[2][6] = 0
  clearInterval(key2Checker)
}
}, 100)

const winModal = $('#victory')
const completeChecker = setInterval(()=>{
  if (x===9 && y===0){
    winModal.css('display', 'block')
    gameContainer.css('opacity', '0.3')
    player.css('opacity', '0')
  }
},100)