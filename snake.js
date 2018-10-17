/////////////////////////graph/////////////////////////////////////////

var canvas, ctx, width, heigth, accessKeyboard; 

var init = function(){
  canvas = document.getElementById("canvas");
  width = canvas.width;
  height = canvas.height;
  ctx = canvas.getContext('2d');  
};

var fillAll = function(color){
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height)
};

var clearAll = function(){
  ctx.clearRect(0, 0, width, height)
};

var drawRect = function(x, y, w, h, color){
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
};

var drawCircle = function(x, y, r, color){
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  ctx.fill();
};

var isCollision = function(x1, y1, w1, h1, x2, y2, w2, h2){
  return ( x1 < x2 + w2 && 
           x1 + w1 > x2 && 
           y1 < y2 + h2 && 
           h1 + y1 > y2)
}

///////////////////////////////apple///////////////////////////////////////

var apple = {

  drawApple: function(){
    var x = this.x * 30 + 2;
    var y = this.y * 30 + 2;
    ctx.fillStyle ="green";
    ctx.fillRect(x, y, 28, 28);
  },

  createApple: function(){
    var x = Math.floor(Math.random() * 21);
    var y = Math.floor(Math.random() * 21);

    for (var i = 0; i < snake.length; i++){
      if (x === snake[i].x && y === snake[i].y){
        createApple();
        return;
      }
    }

    this.x = x;
    this.y = y;
  }

};

//////////////////////////////////snake////////////////////////////////////////////
var score = 0;
var dir = "";

var snake = [
  {
    x: 10,
    y: 10
  }
];

function moveSnake(){
  var x = 0;
  var y = 0;
  var obj = {};
  obj.x = snake[0].x;
  obj.y = snake[0].y;

  if (accessKeyboard){
    if (mc.isActionActive("left")) dir = "left";
    if (mc.isActionActive("right")) dir = "right";
    if (mc.isActionActive("down")) dir = "down";
    if (mc.isActionActive("up")) dir = "up";
    accessKeyboard = false;
  }

  if (dir == "left") x -= 1;
  if (dir == "right") x += 1;
  if (dir == "up") y -= 1;
  if (dir == "down") y += 1;

  obj.x = wallCollision(obj.x + x);
  obj.y = wallCollision(obj.y + y);


  if (dir) {
    snake.pop();
    snake.unshift(obj);
  }
};

function wallCollision(val){
  if (val < 0) val = 20;
  if (val > 20) val = 0;
  return val;
};

function aboutCollision(){
  if (snake.length > 4){
    var x = snake[0].x;
    var y = snake[0].y;
    for (var i = 4; i < snake.length; i++){
      if (x == snake[i].x && y == snake[i].y){
        dir = '';
        snake = [ {x: 10, y: 10}];
        apple.createApple();
        score = 0;
      }
    }
    
  }
}

function addSnake(x,y){
  var obj = {};
  obj.x = x;
  obj.y = y;
  snake.unshift(obj);
  apple.createApple();
  score++;
}

function testCollision(){
  var x = snake[0].x;
  var y = snake[0].y;
  if (dir == "left") x -= 1;
  if (dir == "right") x += 1;
  if (dir == "top") y -= 1;
  if (dir == "bottom") y += 1;

  if (apple.x == x && apple.y == y){
    addSnake(x,y);
    return;
  }

  moveSnake();
}

function drawSnake(){
  ctx.fillStyle = "blue";
  for (var i = 0; i < snake.length; i++){
    var x = snake[i].x * 30 + 2;
    var y = snake[i].y * 30 + 2;
    ctx.fillRect(x, y, 28, 28);
  }
}

///////////////////////game//////////////////////////

var startNewGame = function(game){
  setInterval(game, 200);
};

function drawScore(){
  var $board = $(".score");
  var newScore = "Points: " + score;
  $($board).html(newScore);
}
