
var LinkLayer = cc.LayerColor.extend({
    sprite:null,
    ctor:function () {
        this._super(cc.color(255,255,255), cc.winSize.width, 20);
           
        var menuHome = new cc.MenuItemImage( res.HomeIcon, res.HomeIcon, function(){
                var nextScene = cc.TransitionCrossFade.create(0.5, new WelcomeScene());
                cc.director.runScene(nextScene);
        });
        
        menuHome.attr({
            scaleX: this.height/menuHome.height,
            scaleY: this.height/menuHome.height,
            anchorX: 0,
            anchorY: 0
        });
        
        var menuManual = new cc.MenuItemFont( msg.showManual, function(){
            var nextScene = cc.TransitionCrossFade.create(0.5, new ManualScene());
            cc.director.runScene(nextScene);
        });
        
        menuManual.attr({
            x:this.width,
            y:this.height/2,
            anchorX: 1,
            anchorY: 0.5,
            color : cc.color(51, 122, 183),
            fontSize : 10
        });
        
        var menuMake = new cc.MenuItemFont( msg.makeRoom, function(){
            var nextScene = cc.TransitionCrossFade.create(0.5, new MakeRoomScene());
            cc.director.runScene(nextScene);
        });
        
        menuMake.attr({
            x:this.width - menuManual.width -  /* margin */ 10,
            y:this.height/2,
            anchorX: 1,
            anchorY: 0.5,
            color : cc.color(51, 122, 183),
            fontSize : 10
        });
            
        var menu = new cc.Menu(menuHome, menuManual, menuMake);
        menu.attr({x:0,y:0});
        this.addChild(menu, 0);
        
    }
});

var RoomListLayer = cc.LayerColor.extend({
    
    ctor:function () {
        this._super(cc.color(255,255,255));
        var self = this;
        
        
        
    }
});


var RoomListScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var winSize = cc.winSize;
        
        var linkMenu = new LinkLayer();
        linkMenu.setPosition(cc.p(0,winSize.height-linkMenu.height));
        this.addChild(linkMenu,1);
        
        var roomList = new RoomListLayer();
        this.addChild( roomList );
    }
});