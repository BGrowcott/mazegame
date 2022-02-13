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

// function Game(id) {
//     this.el = document.getElementById(id)
//     this.tileTypes = ['floor','wall'];
// }

// draw the maze
for (let i = 0; i < levels[0].maze1.length; i++) {
  for (let j = 0; j < levels[0].maze1[0].length; j++)
    if (levels[0].maze1[i][j] === 0) {
      $("#mazeArea").append($(`<div class="mazeTile"></div>`));
    } else {
      $("#mazeArea").append($(`<div class="mazeTile mazeTileWall"></div>`));
    }
}

$("#mazeArea").append($('<div id="player"></div>'));
$("#mazeArea").append($('<div id="enemy"></div>'));

$("html").keydown(playerMovement);

const player = $("#player")
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
}

// move up
async function enemyUp() {
  setTimeout(() => {
    console.log("up");
    enemyCSSVertical += -50;
    enemy.css("top", enemyCSSVertical);
  }, 1000);
}

//move left
async function enemyLeft() {
  setTimeout(() => {
    console.log("left");
    enemyCSSHorizontal += -50;
    enemy.css("left", enemyCSSHorizontal);
  }, 1000);
}

async function enemyDown() {
  setTimeout(() => {
    console.log("down");
    enemyCSSVertical += 50;
    enemy.css("top", enemyCSSVertical);
  }, 1000);
}

async function enemyRight() {
  setTimeout(() => {
    console.log("right");
    enemyCSSHorizontal += 50;
    enemy.css("left", enemyCSSHorizontal);
  }, 1000);
}
