/**
 * @constructor
 * @classdesc Main layer with sprite of Map.
 * @extends cc.Layer
 */
var MainMapLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var self = this;
        
        var mainMap = new cc.Sprite(res.MainMap);
        
        mainMap.attr({
            scaleX: this.width/mainMap.width,
            scaleY: this.height/mainMap.height,
            x: this.width/2,
            y: this.height/2,
            anchorX: 0.5,
            anchorY: 0.5
        });
        
        this.addChild(mainMap, 0);      
       
        this.locus = new cc.Sprite(res.Arrow);
        this.locus.setScale(0.05);
        this.locus.t = 0;
        this.locus.update = function(dt){
            
            var pos = self.endPos;
            
            this.setVisible(mkmk.util.getDistance(self.endPos, self.startPos) != 0);
            
            this.t += dt;
            if( this.t > 0.5 ){
                this.t = 0;
                this.setPosition(self.startPos);
                return;
            }
            
            var currX = this.x;
            var currY = this.y;
            
            var x = pos.x - currX;
            var y = pos.y - currY;
            
            this.setRotation(90-mkmk.util.angle(self.startPos, self.endPos ));
            
            x *= this.t;
            y *= this.t;
            
            this.x += x;
            this.y += y;
        };
        
        return true;
    },
    
    /**
     * function that sets player Icon.
     * @param {cc.p} _pos - initial position.
     */
    setPlayerIcon : function(_pos){
      
        var icon = new cc.Sprite(res.Koma);
        var id = 1;
        
        icon.attr({
            scaleX: 50/icon.width,
            scaleY: 50/icon.height,
            x: _pos.x,
            y: _pos.y,
            anchorX: 0.5,
            anchorY: 0.5
        });
        
        icon.setName("playerIcon"+id.toString());
        
        this.addChild(icon);
    },
    
    /**
     * start listener of the event users move thier own icon.
     */
    startIconTouchEvent : function(){
        this._iconTouchEvent = cc.EventListener.create(this._touchEventIconMove);
        cc.eventManager.addListener(this._iconTouchEvent, this.getChildByName("playerIcon1"));
    },
    /**
     * remove listener of the event users move thier own icon.
     */
    removeIconTouchEvent : function(){
        cc.eventManager.removeListener(this._iconTouchEvent );
    },
    
    _touchEventIconMove : {
        event: cc.EventListener.TOUCH_ONE_BY_ONE, // single touch.
        swallowTouches: true, // don't pass to lower layer.
        
        /**
         * onTouchBegan
         * @param {cc.Touch} touch - touch.
         * @param {cc.Event} event - event.
         */
        onTouchBegan: function (touch, event) {
            
            var target = event.getCurrentTarget();
            var parent = target.getParent();
            
            if( mkmk.util.getDistance(target.getPosition(), touch.getLocation()) > 20 ){
                return false;
            }
            
            target.setOpacity(128);
            target.setPosition(touch.getLocation());
            target.runAction( new cc.RotateBy(0.2, 35, 10) );
            
            parent.addChild(parent.locus);
            parent.locus.setPosition(closestPos(touch.getLocation()));
            
            parent.startPos = closestPos(touch.getLocation());
            parent.endPos = closestPos(touch.getLocation());
            parent.locus.scheduleUpdate();
            
            return true;
        },
        
        /**
         * onTouchMoved
         * @param {cc.Touch} touch - touch.
         * @param {cc.Event} event - event.
         */
        onTouchMoved : function (touch, event) {
            var target = event.getCurrentTarget();
            var parent = target.getParent();
            var pos = cc.p(touch.getLocation());
            pos.y += 40;
            
            target.setPosition(pos);
            parent.endPos= closestPos(touch.getLocation());
            
            return true;
        },
        
        /**
         * onTouchEnded
         * @param {cc.Touch} touch - touch.
         * @param {cc.Event} event - event.
         */
        onTouchEnded : function (touch, event) {
            var target = event.getCurrentTarget();
            var parent = target.getParent();
            target.stopAllActions()
            target.setOpacity(255);
            target.setRotation(0);
            target.setPosition(closestPos(touch.getLocation()));
            
            	
            parent.locus.unscheduleUpdate();
            parent.removeChild(parent.locus);
            
            return false;
        },
        
        /**
         * onTouchCancellsed
         * @param {cc.Touch} touch - touch.
         * @param {cc.Event} event - event.
         */
        onTouchCancelled : function(touch, event){
            cc.log("Cancelled", touch.getLocationX(),touch.getLocationY());
            this.onTouchEnded(touch, event);
        }
    }
});