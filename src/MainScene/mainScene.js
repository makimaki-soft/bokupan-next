/**
 * @constructor
 * @classdesc Main scene.
 * @extends cc.Scene
 */
var BokupanMainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var winSize = cc.winSize;
        
        var mapLayer = new MainMapLayer();
        this.addChild( mapLayer );
        
        
        mapLayer.setPlayerIcon(addr.HOME[1]);
        mapLayer.startIconTouchEvent();
    }
});