var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

function ControllerDown(event) {
  if (event.keyCode == 68) {
    rightPressed = true;
  } else if (event.keyCode == 65) {
    leftPressed = true;
  }
  if (event.keyCode == 83) {
    downPressed = true;
  } else if (event.keyCode == 87) {
    upPressed = true;
  }
}
function ControllerUp(event) {
  if (event.keyCode == 68) {
    rightPressed = false;
  } else if (event.keyCode == 65) {
    leftPressed = false;
  }
  if (event.keyCode == 83) {
    downPressed = false;
  } else if (event.keyCode == 87) {
    upPressed = false;
  }
}
document.addEventListener("keydown", ControllerDown, false);
document.addEventListener("keyup", ControllerUp, false);