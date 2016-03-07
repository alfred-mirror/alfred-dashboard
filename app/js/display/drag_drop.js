document.onmousemove = mouseMove;
document.onmouseup = mouseUp;

var dragObject = null;
var mouseOffset = null;

function mouseMove(e) {
  e = e || window.event;
}

function mouseCoords(e) {
  if (e.pageX || e.pageY) {
    return { x: e.pageX, y: e.pageY };
  }
}

function mouseUp(e) {
  dragObject = null;
}

function clickItem(obj) {
  object.onmousedown = function() {
    dragObject = this;
  };
}
