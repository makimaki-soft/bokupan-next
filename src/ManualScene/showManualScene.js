var LinkMenulLayer = cc.LayerColor.extend({
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
        
        var menuRoom = new cc.MenuItemFont( msg.startGame, function(){
            var nextScene = cc.TransitionCrossFade.create(0.5, new WelcomeScene());
            cc.director.runScene(nextScene);
        });
        
        menuRoom.attr({
            x:this.width,
            y:this.height/2,
            anchorX: 1,
            anchorY: 0.5,
            color : cc.color(51, 122, 183),
            fontSize : 10
        });
            
        var menu = new cc.Menu(menuHome, menuRoom);
        menu.attr({x:0,y:0});
        this.addChild(menu, 0);
    }
});

var ManualLayer = cc.LayerColor.extend({
    sprite:null,
    ctor:function () {
        this._super(cc.color(255,255,255));
        var winSize = cc.winSize;
    }
});

var ManualScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var winSize = cc.winSize;
        
        var linkMenu = new LinkMenulLayer();
        linkMenu.setPosition(cc.p(0,winSize.height-linkMenu.height));
       
        this.addChild(linkMenu,1);
        
        var manual = new ManualLayer();
        this.addChild(manual);
    }
});