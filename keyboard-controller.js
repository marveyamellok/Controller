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
      KEY_Z: 90
    }
    
    this.bindActions( activities );

    // Объект с активностями
    this.activities = {};
    
  }


  attachToDOM(DOM_target, action_name) {
    this.DOM_target = DOM_target;
    var This = this;

    DOM_target.addEventListener( 'keydown', function(event) { This.onKeyDown(event, action_name) }, false );
    DOM_target.addEventListener( 'keyup', function(event) { This.onKeyUp(event, action_name) }, false );
  };

  detachOfDOM(DOM_target, action_name) {
    this.DOM_target = DOM_target;
    var This = this;

    DOM_target.removeEventListener( 'keydown', function(event) { This.onKeyDown(event, action_name) } );
    DOM_target.removeEventListener( 'keyup', function(event) { This.onKeyDown(event, action_name) });
  };

  onKeyDown(event, action_name){
    this.enableAction(action_name, event)
  }

  onKeyUp(event, action_name){
    this.disableAction(action_name, event)
  }

  /////Проверяет активирована ли переданная активность в контроллере???

  isActionActive(action, event){
    var e = event || window.event;
    var code = e.keyCode;
    var obj = this.activities[ action ].keys;
    var isTrue = false;
    
    for (var keys in obj){
      if( this.isKeyPressed(obj[keys], code) ){
        isTrue = true;
      }  
    }

    if (isTrue) {
      return true;
    } else {
      return false;
    }

    
  };

  /////Проверяет нажата ли переданная кнопка в контроллере

  isKeyPressed(key, code){
    var result = false;
    if (key === code){
      result = true;
    }
    return result;
  }

  /////Активирует объявленную активность

  enableAction(action_name, event){
    console.log(this.isActionActive( action_name, event ));

    if (this.isActionActive( action_name, event ))
      this.activities[ action_name ].isEnabled = true

    console.log("enableAction: ", this.activities[ action_name ].isEnabled)
  };
  
  /////Дезактивирует объявленную активность

  disableAction(action_name, event){
    if (this.isActionActive( action_name, event )){
      this.activities[ action_name ].isEnabled = false;
    }

    console.log("disableAction: ", this.activities[ action_name ].isEnabled)
  };

  bindActions(activities){
     for( var activity_name in activities ){
      var activity = activities[ activity_name ];
      this.activities[ activity_name ] = {
        keys: activity.keys,
        isEnabled: activity.isEnabled
      }
    }
  }
}
