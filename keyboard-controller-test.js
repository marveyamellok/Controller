// document.addEventListener("DOMContentLoaded", function() {

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
    "up":{
      keys: [ mc.KEYCODES.UP_ARROW, mc.KEYCODES.KEY_W ],
      // is_enabled: true
    },
    "down":{
      keys: [ mc.KEYCODES.DOWN_ARROW, mc.KEYCODES.KEY_S ],
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
  
  // createStage();

  function createStage(isGrass){
    fillAll("#8ddef8");
    if (!isGrass) return;
    grass.draw();
  }

  var ballMoveEvent = new CustomEvent("ballMoving");
  var playSnakeEvent = new CustomEvent("playSnake");

  window.moveBall = function(){
    canvas.dispatchEvent(ballMoveEvent);
  };

  window.playSnake = function(){
    canvas.dispatchEvent(playSnakeEvent);
  };

  var gameBall = function(){
    createStage(true);
    ball.draw();
    ball.move();
    ball.collision();
    shelf.draw();
  };

  var gameSnake = function(){
    createStage(false);
    accessKeyboard = true;
    ctx.clearRect(0, 0, width, height);
    testCollision()
    apple.drawApple();
    aboutCollision()
    drawSnake();
    drawScore();
  };

  canvas.addEventListener("ballMoving", function() {
    startGame(gameBall);
  })

  canvas.addEventListener("playSnake", function() {
    init()
    apple.createApple();
    startNewGame(gameSnake);
  })