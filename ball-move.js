function findWidth(){
  var elem = document.getElementById("play-field");
  var n = getComputedStyle(elem).width;
  var width = Number(n.substring(0, n.length - 2));
  return width;
}

function ballWidth(){
  var ball = document.getElementById("ball");
  var n = getComputedStyle(ball).width;
  var width = Number(n.substring(0, n.length - 2));
  return width;
}

function findLeft(){
  var ball = document.getElementById("ball");
  var left = getComputedStyle(ball).left;
  var n = Number(left.substring(0, left.length - 2));
  return n;
};

function findBottom(){
  var ball = document.getElementById("ball");
  var bottom = getComputedStyle(ball).bottom;
  var n = Number(bottom.substring(0, bottom.length - 2));
  return n;
};

function ballLeft(x) {  
  var n = findLeft();
  var b = ballWidth();
  if ( n > b) {
    ball.style.left = -x + n + "px"
  } else {
    ball.style.left = "0px";
  }
};

function ballRight(x) {
  var n = findLeft();
  var m = findWidth();
  var b = ballWidth();
  var g = m - b - (b/3);
  if ( n <= g) {
    ball.style.left = x + n + "px"
  }else {
    ball.style.left = m - b + "px";
  }
};

function ballUp(){
  var ball = document.getElementById("ball");
  ball.style.bottom = "120px";
}

function ballDown(){
  var ball = document.getElementById("ball");
  ball.style.bottom = "70px";
}

function ballJump(){
  ballUp();
  var p=setTimeout("ballDown()",400);
}




