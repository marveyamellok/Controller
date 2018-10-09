class MyController {
  constructor( activities ) {
    
    // Объект с кодами клавиш
    this.KEYCODES = {
      BACKSPACE: 8,
      TAB: 9,
      ENTER: 13,
      SHIFT: 16,
      CTRL: 17,
      ALT: 18,
      PAUSE: 19,
      CAPS_LOCK: 20,
      ESCAPE: 27,
      SPACE: 32,
      PAGE_UP: 33,
      PAGE_DOWN: 34,
      LEFT_ARROW: 37,
      UP_ARROW: 38,
      RIGHT_ARROW: 39,
      DOWN_ARROW: 40,
      DELETE: 46,
      KEY_A: 65,
      KEY_B: 66,
      KEY_C: 67,
      KEY_D: 68,
      KEY_E: 69,
      KEY_F: 70,
      KEY_G: 71,
      KEY_H: 72,
      KEY_I: 73,
      KEY_J: 74,
      KEY_K: 75,
      KEY_L: 76,
      KEY_M: 77,
      KEY_N: 78,
      KEY_O: 79,
      KEY_P: 80,
      KEY_Q: 81,
      KEY_R: 82,
      KEY_S: 83,
      KEY_T: 84,
      KEY_U: 85,
      KEY_V: 86,
      KEY_W: 87,
      KEY_X: 88,
      KEY_Y: 89,
      KEY_Z: 90,
    }
    
    this.bindActions( activities );

    // Объект с активностями
    this.activities = {}

  }
  
  //Связывание активности с элементом DOM с использованием механизма handleEvent

  attachToDOM(DOM_target) {
    this.DOM_target = DOM_target;
    DOM_target.addEventListener( 'keydown', this.onKeyDown );
    DOM_target.addEventListener( 'keyup', this.onKeyUp );
  }

  bindActions(activities){
     for( var activity_name in activities ){
      var activity = activities[ activity_name ];
      this.activities[ activity_name ] {
        keys: activity.keys,
        
      }
    }
  }
}