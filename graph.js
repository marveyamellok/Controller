var canvas, ctx, width, height, accessKeyboard, interval; 
  canvas = document.getElementById("canvas");
  width = canvas.width;
  height = canvas.height;
  ctx = canvas.getContext('2d');  


// var init = function(){
//   canvas = document.getElementById("canvas");
//   width = canvas.width;
//   height = canvas.height;
//   ctx = canvas.getContext('2d');  
// };

function fillAll(color){
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height)
};

var clearAll = function(){
  ctx.clearRect(0, 0, width, height)
};

function drawRect(x, y, w, h, color){
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
};

function drawCircle(x, y, r, color){
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  ctx.fill();
}; 

function drawImage(x, y, w, h, img){
  ctx.drawImage(img, x, y, w, h);
};

var isCollision = function(x1, y1, w1, h1, x2, y2, w2, h2){
  return ( x1 < x2 + w2 && 
           x1 + w1 > x2 && 
           y1 < y2 + h2 && 
           h1 + y1 > y2)
}

var startNewGame = function(game){
  setInterval(game, 200);
};