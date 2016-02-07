var mkmk = mkmk || {};

mkmk.util = {
    
    /**
     * returns the distance of two positions.
     * @param {cc.p} posA - 1st position.
     * @param {cc.p} posB - 2nd position.
     * @return {Number} distance[pix]
     */   
    getDistance : function(posA, posB) {
        var diffX = (posA.x - posB.x);
        var diffY = (posA.y - posB.y);
        var squareDist = diffX*diffX + diffY*diffY;
        
        return Math.sqrt(squareDist);
    },
    
    
    drowLine : function(_start, _end ){
        var lineWidth = 0.5;
        var lineColor = cc.color(128,128,128);
        var node = cc.DrawNode.create();
        node.drawSegment(_start,_end, lineWidth, lineColor);
        return node;
    },
    
    /**
     * returns the angle of two positions.
     * @param {cc.p} posA - 1st position.
     * @param {cc.p} posB - 2nd position.
     * @return {Number} angle[degree]
     */ 
    angle : function(_anchor, _target){
        
        var dX = _target.x - _anchor.x;
        var dY = _target.y - _anchor.y;
        
        return Math.atan2(dY,dX)*180/Math.PI;
    }
}

/**
 * 
 */
mkmk.color = {
    black : cc.color(0,0,0),
    white : cc.color(255,255,255),
    grey  : cc.color(128,128,128)
};

mkmk.ColorMenu = cc.Node.extend({
    
    ctor:function (_color, _pos, _msg, _callback, _target) {
        this._super();
        
        var subLayer1 = new cc.LayerColor(_color,150,30);
        
        subLayer1.setPosition(cc.p(this.width/2-subLayer1.width/2,this.height/2));
        var startGame_txt = new cc.MenuItemFont( _msg, _callback, _target);
        startGame_txt.attr({fontSize : 10,
                            x:subLayer1.width/2,
                            y:subLayer1.height/2,
                            anchorX:0.5,
                            anchorY:0.5,
                            color: cc.color(255,255,255) 
                            });
        var startMenu = new cc.Menu(startGame_txt);
        startMenu.attr({x:0,y:0});
        subLayer1.addChild(startMenu);
        this.addChild(subLayer1);
        this.setPosition(_pos);
    }
});