// SAAMAANYA KAAM
let disapathani = { x: 0, y: 0 };
const hiSound = new Audio("music/point.mp3");
const foodSound = new Audio("music/food.mp3");
const khatamSound = new Audio("music/khatam.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/nagin.mp3");
let speed = 2;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];

food = { x: 6, y: 7 };

// KHEL PRAKRIYA
function prakriya(ctime) {
  window.requestAnimationFrame(prakriya);
  // console.log(ctime)
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  // console.log(ctime)
  lastPaintTime = ctime;
  // console.log(ctime)
  gameEngine();
}

function takkarhua(snake) {
  // Agar Saanp ne apna sar dewaar pe de maara
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }

  // Agar Saanp ne Khud k hi maje le liye
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  return false;
}

function gameEngine() {
  // Incrementing the snake array & Food
  if (takkarhua(snakeArr)) {
    musicSound.pause();
    foodSound.pause();
    hiSound.pause();
    khatamSound.play();
    disapathani = { x: 0, y: 0 };
    khatamSound.play();
    alert("Its Okay . Press OK to play again!");
    snakeArr = [{ x: 13, y: 15 }];
    musicSound.play();
    khatamSound.pause();
    score = 0;
  }

  // Agar Saanp ne Thoonsa
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("Highscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "HighScore: " + hiscoreval;
      hiSound.play();
    }
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + disapathani.x,
      y: snakeArr[0].y + disapathani.y,
    });
    //naya khana
    let a = 1;
    let b = 17;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += disapathani.x;
  snakeArr[0].y += disapathani.y;

  // Saanp Dikhaao
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  // ab khaana dikhaao
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}
// Backend
musicSound.play();
let hiscore = localStorage.getItem("highscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("highscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "HighScore: " + hiscore;
}
window.requestAnimationFrame(prakriya);
window.addEventListener("keydown", (e) => {
  disapathani = { x: 0, y: 1 };
  musicSound.play();
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("Uper");
      disapathani.x = 0;
      disapathani.y = -1;
      break;

    case "ArrowDown":
      console.log("Niche");
      disapathani.x = 0;
      disapathani.y = 1;
      break;

    case "ArrowLeft":
      console.log("Baayaan");
      disapathani.x = -1;
      disapathani.y = 0;
      break;

    case "ArrowRight":
      console.log("Daayaan");
      disapathani.x = 1;
      disapathani.y = 0;
      break;
    default:
      break;
  }
});
