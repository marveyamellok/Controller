document.addEventListener("DOMContentLoaded", function() {

  var mc = new MyController();

  ///////////////////////////////////////////////создание активности через enable и bindActivityKeys//////////////////////////////////

  mc.bindActions({
    "left":{
      keys: [ mc.KEYCODES.KEY_A, 31 ]
    },
    "right":{
      keys: [ 32 ]
    },
  });
  
  mc.attachToDOM( window );
  
  window.addEventListener(mc.ACTION_FIRED, function(e, data ){
    console.log('ACTION_FIRED: ', data );
    switch(data.action){
      case "left":
        break;
      case "right":
        break;
    }

  });

});