// document.addEventListener("DOMContentLoaded", function() {

  var mc = new MyController();
  var flagBall = false;
  var flagSnake = false;

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

  function createStage(isGrass){
    fillAll("#8ddef8");
    if (!isGrass) return;
    grass.draw();
  }

  var ballMoveEvent = new CustomEvent("ballMoving");
  var playSnakeEvent = new CustomEvent("playSnake");

  // function moveBall(){
  //   canvas.dispatchEvent(ballMoveEvent);
  //   console.log("1");
  // };

  // function playSnake(){
  //   canvas.dispatchEvent(playSnakeEvent);
  //   console.log("2")
  // };

  // function beginSnake(){
  //   snakeFlag = true;
  //   ballFlag = false;
  //   init()
  //   apple.createApple();
  //   startNewGame(gameSnake);
  //   // canvas.removeEventListener("ballMoving", beginBall)
  //   console.log("snake");
  // }

  // function beginBall(){
  //   startGame(gameBall);
  //   // canvas.removeEventListener("playSnake", beginSnake)
  // }
  // var ballInterval;


  // canvas.addEventListener("ballMoving", function(){
  //   // startGame(gameBall);
  //   ballInterval = null
  //   ballInterval = setInterval(gameBall, 1000 / 60);
  //   interval = null;
  // })


  // canvas.addEventListener("playSnake", function(){
  //   apple.createApple();
  //   // startNewGame(gameSnake);
  //   fillAll("white");
  //   console.log("ballInterval: ", ballInterval);
  //   interval = setInterval(gameSnake, 200);
  //   ballInterval = null;
  //   console.log("ballInterval: ", ballInterval);
  // })



  function beginSnake(){
    ballFlag = false;
    if (flagSnake) return; 
    apple.createApple();
    // canvas.removeEventListener("ballMoving", beginBall)
    startNewGame(gameSnake);
    flagSnake = true;
    // console.log("snake");
  }

  function beginBall(){
    flagSnake = false;
    if (flagBall) return; 
    // canvas.removeEventListener("playSnake",  beginSnake)
    startGame(gameBall);
    flagBall = true;
    // console.log("ball");
    console.log("addEventListener");
  }

  window.moveBall = function(){  
    canvas.dispatchEvent(ballMoveEvent);
    console.log("dispach");
  };

  window.playSnake = function(){
    canvas.dispatchEvent(playSnakeEvent);
  };

  canvas.addEventListener("ballMoving", beginBall)
  canvas.addEventListener("playSnake",  beginSnake)