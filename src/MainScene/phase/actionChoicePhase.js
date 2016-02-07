mkmk.phases.actionChoicePhase.attr({
    
    onEnter : function(){
        cc.log("onEnter Action Choice Phase");
        var mapLayer = this.layers.mapLayer;
        
        mapLayer.setOnTouchBeganCallback(function(){
            mkmk.phases.playerMovePhase.onEnter();
        }, this);
        
        mapLayer.startIconTouchEvent();
    },
        
    onExit : function(){
        cc.log("onExit Action Choice Phase");
        var mapLayer = this.layers.mapLayer;
    }
});