var WelcomeLayer = cc.LayerColor.extend({
    sprite:null,
    ctor:function () {
        this._super(cc.color(255,255,255));
        var winSize = cc.winSize;
        
        var version_txt = new cc.LabelTTF(cc.game.config[cc.game.CONFIG_KEY.app_version]);
        version_txt.attr({
            fontSize : 10,
            x: this.width - 10,
            y: this.height - 10,
            anchorX: 1,
            anchorY: 1,
            color:cc.color(0,0,0)
        });
        this.addChild(version_txt, 0);
        
        var circleIcon = new cc.Sprite(res.Favicon);
        circleIcon.attr({
            x: 10,
            y: winSize.height - 10,
            scaleX : 30 / circleIcon.width,
            scaleY : 30 / circleIcon.width,
            anchorX: 0,
            anchorY: 1
        });
        this.addChild(circleIcon, 0);
        
        var mainLogo = new cc.Sprite(res.WelcomePage);
        mainLogo.attr({
            x: winSize.width / 2,
            y: 2 * winSize.height / 3,
            scaleX : winSize.width / mainLogo.width,
            scaleY : winSize.width / mainLogo.width
        });
        this.addChild(mainLogo, 0);
        
        // text menu (start game.)
        var subLayer1 = new cc.LayerColor(cc.color(51, 122, 183),150,30);
        subLayer1.setPosition(cc.p(this.width/2-subLayer1.width/2,this.height/2));
        var startGame_txt = new cc.MenuItemFont( msg.startGame, function(){
            var nextScene = new cc.TransitionCrossFade(0.5, new RoomListScene());
            cc.audioEngine.playEffect(audio.Click);
            cc.director.runScene(nextScene);
        }, this);
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
        
        // text menu (show manual.)
        var subLayer2 = new cc.LayerColor(cc.color(76, 174, 76),150,30);
        subLayer2.setPosition(cc.p(this.width/2-subLayer2.width/2,this.height/2-50));
        
        var showManual_txt = new cc.MenuItemFont( msg.showManual, function(){
            var nextScene = new cc.TransitionCrossFade(0.5, new ManualScene());
            cc.audioEngine.playEffect(audio.Click);
            cc.director.runScene(nextScene);
        }, this );
        showManual_txt.attr({fontSize : 10,
                             x:subLayer2.width/2,
                             y:subLayer2.height/2,
                             anchorX:0.5,
                             anchorY:0.5,
                             color: cc.color(255,255,255) 
                             });
        var manualMenu = new cc.Menu(showManual_txt);
        manualMenu.attr({x:0,y:0});
        subLayer2.addChild(manualMenu);
        this.addChild(subLayer2);
      
        return true;
    }
});

var WelcomeScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new WelcomeLayer();
        this.addChild(layer);
        cc.audioEngine.playMusic(audio.Opening, true);
    },
    onExit:function(){
        cc.audioEngine.stopMusic(audio.Opening);
    }
});

