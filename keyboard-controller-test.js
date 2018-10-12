document.addEventListener("DOMContentLoaded", function() {

  var mc = new MyController();

  mc.bindActions({
    "left":{
      keys: [ mc.KEYCODES.KEY_A,  mc.KEYCODES.LEFT_ARROW],
      // is_enabled: !true
    },
    "right":{
      keys: [ mc.KEYCODES.RIGHT_ARROW, mc.KEYCODES.KEY_D ],
      // is_enabled: true
    },
    "jump":{
      keys: [ mc.KEYCODES.UP_ARROW, mc.KEYCODES.KEY_W ],
      // is_enabled: true
    }
  });
  
  mc.attachToDOM( window );
  
  // window.addEventListener(mc.ACTION_FIRED, function(e, data ){
  //   console.log('ACTION_FIRED: ', data );
  //   switch(data.action){
  //     case "left":
  //       console.log("left");
  //       break;
  //     case "right":
  //       console.log("right");
  //       break;
  //   }
  // });

  window.disableAction = function(){
    mc.disableAction('left')
    console.log( "TEST: disableAction:" );
  }

  window.isKeyPressed = function(){
    console.log( "TEST: isKeyPressed:", mc.isKeyPressed(mc.KEYCODES.LEFT_ARROW) );
  }
  

////////////////////game//////////////////////

  var _renderer = (function() {
    return function(callback) {
      setTimeout(callback, 1000 / 60);
    };

  })();

  var _engine = function(){
    log('игр.ц.не иниц.')
  };

  var startGame = function(game){
    if (typeof game == 'function'){
      _engine = game;
    };
    gameLoop();
  };

  var setGame = function(game){
    if (typeof game == 'function'){
      _engine = game;
    };
  }

  var gameLoop = function(){
    _engine();
    _renderer(gameLoop);
  }

//////////////////graph/////////////////////////////

  var canvas, ctx, width, height; 
  canvas = document.getElementById("canvas");
  width = canvas.width;
  height = canvas.height;
  ctx = canvas.getContext('2d'); 


  function fillAll(color){
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height)
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

  function isCollisionWidth(x1, w1, x2, w2){
    return ( x1 < x2 + w2 && 
             x1 + w1 > x2)
  }

  function isCollisionHeight( y1, h1, y2, h2){
    return ( y1 < y2 + h2 && 
             h1 + y1 > y2)
  }

  function stopJump(){
    jumpCount = 0;
    jumpPressed = false;
    jumpHeight = 0;
  }


////////////////////////////grass////////////////////////////////////

  var grass = {
    x: 0,
    y: height - 100,
    w: 680,
    h: 200,
    color: "#27ac1b",

    draw: function(){
      drawRect(this.x, this.y, this.w, this.h, this.color); 
    }
  }

//////////////////////ball////////////////////////////

  var jumpPressed = false;
  var jumpCount = 0;
  var jumpLength = 50;
  var jumpHeight = 0;
  var destroy = false;
    
  var ball = {
    speed: 5,
    x: 320,
    radius: 20,
    y: grass.y - 20,
    color: "blue",

    init: function(x, y){
      this.x = x;
      this.y = y;
    },

    draw: function(){
      var img = false;

      if ( jumpPressed ){
        jumpCount++;
        jumpHeight = 4 * jumpLength * Math.sin( Math.PI * jumpCount / jumpLength );
      }

      if ( jumpCount > jumpLength ){
        stopJump()
      }

      if (destroy){
        img = true;
      }
        
      // drawCircle(this.x, this.y - jumpHeight, this.radius, this.color);
      var image = new Image(this.radius * 2, this.radius * 2);

      if (!img){
        image.src = "images/ball.png";
      } else {
        image.src = "images/destroyBall.png";
      }

      drawImage(this.x - this.radius, this.y - this.radius - jumpHeight, this.radius * 2, this.radius * 2, image);

    },

    move: function(){
      destroy = false;

      if (mc.isActionActive("left")){
        this.x -= this.speed;
      };

      if (mc.isActionActive("right")){
        this.x += this.speed;
      };

      if (mc.isActionActive("jump")){
        jumpPressed = true;
      };

      if (mc.isActionActive("left") && mc.isActionActive("right")){
        destroy = true;
      }
    }, 

    collision: function(){
      var yPos = this.y - this.radius - jumpHeight;

      if (isCollisionWidth(this.x - this.radius, this.radius * 2, shelf.x, shelf.width)){

        if (isCollisionHeight(yPos, this.radius* 2, shelf.y, shelf.height)){

          if (yPos <= shelf.y && yPos < shelf.y + shelf.height){
            stopJump()
            this.y = shelf.y - this.radius;
            console.log("top")
          }

          if (yPos > shelf.y && yPos <= shelf.y + shelf.height){
            stopJump()
          }
        }

      } else {
        if (this.y !== grass.y - this.radius){
          this.y = this.y + this.speed * 2;
        }
      }
      

      if (this.x - this.radius <= 0){
        this.x = this.x - this.speed * ( -1 );
      }

      if (this.x + this.radius >= width ){
        this.x = this.x + this.speed * ( -1 );
      }
    }
  }

  //////////////////////////////shelf/////////////////////////////////////


  var shelf = {
    x: 100,
    y: 200,
    width: 170,
    height: 30,
    color: "brown",

    draw: function() {
      drawRect(this.x, this.y, this.width, this.height, this.color);
    }
  }

  function createStage(){
    fillAll("#8ddef8");
    grass.draw();
  }

  createStage();

  var BallMoveEvent = new CustomEvent("ballMoving");

  window.moveBall = function(){
    canvas.dispatchEvent(BallMoveEvent);
  }

  var game = function(){
    createStage()
    ball.draw();
    ball.move();
    ball.collision();
    shelf.draw();
  }

  canvas.addEventListener("ballMoving", function() {
    startGame(game);
  })

});