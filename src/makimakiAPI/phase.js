var mkmk = mkmk || {};

mkmk.Phase = function(name) {
    this._name = name;
};

mkmk.Phase.prototype = {
    nextPhase : []
  , childPhase : null
  , parentPhase : null
  , layers : null
  , playCnt : -1
    
  , attr : function(attrs){
      for(var key in attrs) {
        this[key] = attrs[key];
      }
    }
    
  , onEnter : function(){
      cc.log("This is onEnter function. Please override me.");
    }
    
  , onExit : function(){
      cc.log("This is onExit function. Please override me.");
    }
    
  , gotoNextPhase : function(id, delay_msec, bDec){
      this.onExit();
      var nextPhase = this.nextPhase[id];
      nextPhase.setParentEntoryPoint(this.parentPhase);
      var playCnt = this.playCnt;
      
      if(bDec){
          playCnt--;
      }
      
      if( playCnt == 0 ){
          playCnt = mkmk.turnCnt;
          var parentPhase = this.parentPhase;
          var nextIdx = parentPhase.nextPhaseIdx;
          parentPhase.gotoNextPhase(nextIdx, delay_msec+1500, false);
      } else{ 
          setTimeout(function(){
            nextPhase.onEnter();
          }, delay_msec);
      }
    }
    
  , setchildEntryPoint : function(childPhase){
      this.childPhase = childPhase;
    }
    
  , setParentEntoryPoint : function(parentPhase){
      this.parentPhase = parentPhase;
    }
    
  , gotoChildPhase : function(delay_msec){
      var nextPhase = this.childPhase;
      nextPhase.setParentEntoryPoint(this);
      setTimeout(function(){
          nextPhase.onEnter();
      }, delay_msec);
    }
};

/**
 * Phaseのインスタンス
 * @type {Object}
 */
mkmk.initPhases = function(){

    mkmk.Phase.prototype.playCnt = mkmk.turnCnt;

    var phase = {};
    var list = mkmk.phaseList.list;

    for(var key in list) {
        phase[list[key]] = new mkmk.Phase(list[key]);
    }

    return phase;
};