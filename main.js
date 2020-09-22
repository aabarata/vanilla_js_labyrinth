const labyrinth = [
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 0, 0, 2, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1],
  [1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
  [1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
  [1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
  [1, 0, 0, 1, 1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const buttonFirst = document.getElementById("openFirstDoor");
const buttonSecond = document.getElementById("openSecondDoor");
const buttonThird = document.getElementById("openThirdDoor");
var isFirstDoorOpen = false;
var isSecondDoorOpen = false;
var isThirdDoorOpen = false;
var firstDoorY = 0;
var secondDoorY = 0;
var thirdDoorY = 0;

buttonFirst.addEventListener("click", () => {
  toggleDoor(7, 7, isFirstDoorOpen, firstDoorY)
});
buttonSecond.addEventListener("click", () => {
  toggleDoor(18, 9, isSecondDoorOpen, secondDoorY)
});
buttonThird.addEventListener("click", () => {
  toggleDoor(18, 19, isThirdDoorOpen, thirdDoorY)
});

function buildLabyrinth() {
  for(var i = 0; i < labyrinth.length; i++) {
    for(var z = 0; z < labyrinth[i].length; z++) {
      if(labyrinth[i][z]) {
        ctx.fillStyle = labyrinth[i][z] === 1 ? "#b6b8bc" : "#e7ece4";
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1;
        ctx.strokeRect(z * 40, i * 40, 40, 40);
        ctx.fillRect(z * 40, i * 40, 40, 40);
      }
    }
  }
}

function toggleDoorAnimation(line, column, control, y) {
  var newY;
  ctx.save();
  ctx.fillStyle = "#e7ece4";
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1;
  console.log(control);
  console.log(newY);
  console.log(y);
  if(control) {
    newY = y <= -40 ? -40 : y - 1;
  } else {
    newY = y >= 0 ? 0 : y + 1;
  }
  if(y !== newY) {
    ctx.clearRect(column * 40, line * 40, 40, 40);
    ctx.clearRect(column * 40, (line - 1) * 40, 40, 40);
    ctx.setTransform(1, 0, 0, 1, 0, y);
    ctx.strokeRect(column * 40, line * 40, 40, 40);
    ctx.fillRect(column * 40, line * 40, 40, 40);
    ctx.restore();
    y = newY;
    window.requestAnimationFrame(function() {
      toggleDoorAnimation(line, column, control, y);
    });
  }
}

function toggleDoor(line, column, control, y) {
  control = !control;
  toggleDoorAnimation(line, column, control, y);
}

buildLabyrinth();

