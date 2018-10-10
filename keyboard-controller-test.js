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
    }
  });
  
  mc.attachToDOM( window );

  // mc.isKeyPressed(97) //KEY_A

  // mc.enableAction("left");
  // mc.disableAction("right");
  
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

  setInterval(function(){
    console.log("left:", mc.isActionActive('left') );
  });

  window.isKeyPressed = function(){
    console.log( "TEST: isKeyPressed:", mc.isKeyPressed(mc.KEYCODES.LEFT_ARROW) );
  }

  window.disableAction = function(){
    mc.disableAction('left')
    console.log( "TEST: disableAction:" );
  }

});