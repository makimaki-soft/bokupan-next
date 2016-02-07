/**
 * @constructor
 * @classdesc Main scene.
 * @extends cc.Scene
 */
var BokupanMainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var winSize = cc.winSize;
        
         // define layers
        this.layers = (function(){
            var mapLayer = new MainMapLayer();
            
            return {
                mapLayer : mapLayer
            };
        }());
        
        // Add all layers to this scene
        for(var key in this.layers ){
            this.addChild(this.layers[key]);
        }
       
        // Add all layers to each phase
        for(var key in mkmk.phases ){
            mkmk.phases[key].attr({ layers : this.layers });
        }
        
        this.layers.mapLayer.setPlayerIcon(addr.HOME["1"]);
        mkmk.phases["playerPhase"].onEnter();
    }
});