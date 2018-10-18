/////////////////////////graph/////////////////////////////////////////

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
    y: 10,

    move: function(){

    }
  }
];

function moveSnake(){
  var x = 0;
  var y = 0;
  var obj = {
    x: snake[0].x,
    y: snake[0].y
  };

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

function addBlockToSnake(X,Y){
  var obj = {
    x: X,
    y: Y
  };
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
    addBlockToSnake(x,y);
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



function drawScore(){
  var $board = $(".score");
  var newScore = "Points: " + score;
  $($board).html(newScore);
}
