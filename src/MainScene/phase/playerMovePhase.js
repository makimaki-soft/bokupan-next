mkmk.phases["playerMovePhase"].attr({
    
    onEnter : function(){
        cc.log("onEnter player Move Phase");
        var mapLayer = this.layers.mapLayer;
        
        mapLayer.setOnTouchEndedCallback(function(){
            mapLayer.removeIconTouchEvent();
            mkmk.phases["actionChoicePhase"].onEnter();
        }, this);
    },
        
    onExit : function(){
        cc.log("onExit player Move Phase");
        
        
    }
});
