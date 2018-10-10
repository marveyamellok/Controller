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

    // Объект с активностями
    this.actions_by_keycode = {};
    this.activities = {};

    if( activities ) this.bindActions( activities );

  }




  // ============================================================

  bindActions(activities){

    var scope = this;

    for( var activity_name in activities ){

      var activity = activities[ activity_name ];

      scope.activities[ activity_name ] = {
        keys: activity.keys,
        is_enabled: activity.is_enabled !== undefined ? activity.is_enabled : true,
        is_active: false
      }

      activity.keys.forEach(function(e,i){
        // console.log('>', i, e );
        scope.actions_by_keycode[e] = {
          action: activity_name,
          is_pressed: false
        };
      });

    }
  }


  // ============================================================
  attachToDOM(DOM_target) {
    this.DOM_target = DOM_target;
    DOM_target.addEventListener( 'keydown', this.onKeyDown.bind(this), false );
    DOM_target.addEventListener( 'keyup', this.onKeyUp.bind(this), false );
  };

  detachOfDOM(){
    if( !this.DOM_target ) return;
    this.DOM_target.removeEventListener( 'keydown', this.onKeyDown );
    this.DOM_target.removeEventListener( 'keyup', this.onKeyDown );
    this.DOM_target = undefined;
  };

  onKeyDown(event){
    var activity_name = this.getActivityByKeycode(event.keyCode);
    if( !activity_name || !this.isActionEnabled(activity_name) ) return;
    // console.log("onKeyDown: ", event.keyCode, activity_name, this.isActionEnabled(activity_name) );
    this.actions_by_keycode[event.keyCode].is_pressed = true;

    var action = this.activities[activity_name];
    if( action.is_active ) return;
    console.log("activate action: ", activity_name );
    action.is_active = true;
    // this.enableAction(activity_name);
  }

  onKeyUp(event){
    
    var activity_name = this.getActivityByKeycode(event.keyCode);
    if( !activity_name || !this.isActionEnabled(activity_name) ) return;
    // console.log("onKeyUp: ", event.keyCode, activity_name );
    this.actions_by_keycode[event.keyCode].is_pressed = false;

    var action = this.activities[activity_name];
    // if( !action.is_enabled ) return;
    console.log("DEactivate action: ", activity_name );
    action.is_active = false;
    // this.disableAction(activity_name);
  }


 

  ///
  getActivityByKeycode(keyCode){
    var activity_name = this.actions_by_keycode[keyCode];
    if( !activity_name ) return;
    activity_name = activity_name.action;
    
    return activity_name;
  }


  /////Проверяет активирована ли переданная активность в контроллере (зажата ли одна из соотвествующих этой активности кнопок)

  isActionActive(action_name){

    var action = this.activities[action_name];
    if( !action ) return false;
    return action.is_active;
    
  };

  /////Проверяет нажата ли переданная кнопка в контроллере

  isKeyPressed(keyCode){
    return this.actions_by_keycode[keyCode].is_pressed;
  }

  /////Активирует объявленную активность

  enableAction(action_name){
    // console.log(this.isActionActive( action_name, event ));
    var action = this.activities[ action_name ];
    if( !action ) return;
    // if (this.isActionActive( action_name, event ))
    action.is_enabled = true;
    
    // console.log("enableAction, is_enabled: ", this.activities[ action_name ].is_enabled)
  };
  
  /////Дезактивирует объявленную активность

  disableAction(action_name){

    var action = this.activities[ action_name ];
    if( !action ) return;
    action.is_enabled = false;

  };

  //
  isActionEnabled(action_name){
    var action = this.activities[ action_name ];
    if( !action ) return;
    return action.is_enabled;
  }

}
