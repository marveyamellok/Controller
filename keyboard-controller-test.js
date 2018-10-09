document.addEventListener("DOMContentLoaded", function() {

  var mc = new MyController();

  mc.bindActions({
    "left":{
      keys: [ mc.KEYCODES.KEY_A,  mc.KEYCODES.LEFT_ARROW],
      isEnabled: false
    },
    "right":{
      keys: [ mc.KEYCODES.RIGHT_ARROW, mc.KEYCODES.KEY_D ],
      isEnabled: true
    }
  });
  
  // mc.attachToDOM( window, "left");
  mc.attachToDOM( window, "right");
  // mc.detachOfDOM( window, "left");

  // mc.isKeyPressed(97) //KEY_A

  // mc.enableAction("left");
  // mc.disableAction("right");
  
  // window.addEventListener(mc.ACTION_FIRED, function(e, data ){
  //   console.log('ACTION_FIRED: ', data );
  //   switch(data.action){
  //     case "left":
  //       break;
  //     case "right":
  //       break;
  //   }

  // });



});