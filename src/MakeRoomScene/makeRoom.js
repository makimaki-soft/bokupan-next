var mkmk = mkmk || {};

var LinkMakeRoomLayer = cc.LayerColor.extend({
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
        
        var menuMake = new cc.MenuItemFont( msg.showRooms, function(){
            var nextScene = cc.TransitionCrossFade.create(0.5, new RoomListScene());
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

mkmk.InputForm = cc.Node.extend({
    
    ctor:function (_name, _pos, _delegate) {
        this._super();
        this.attr({ width  : cc.winSize.width - _pos.x });
        var text = new cc.LabelTTF(_name);
        text.setAnchorPoint(cc.p(0,0.5));
        text.setPosition(cc.p(0,0));
        text.setColor(mkmk.color.black);
        text.setFontSize(18);
        this.addChild(text);
        
        var form = new cc.EditBox(new cc.Size(200,text.height+15), new cc.Scale9Sprite(res.Grey));
        form.setAnchorPoint(cc.p(1,0.5));
        form.setPosition(cc.p(this.width-20, 0));
        form.attr({fontSize  : 15, fontColor : mkmk.color.black });
                            
        form.setDelegate(_delegate);
        this.addChild(form);
        this.setPosition(_pos);
        
        this.getString = function(){
            return form.getString();
        }
    }
});

var MakeRoomLayer = cc.LayerColor.extend({
    
    ctor:function () {
        this._super(cc.color(255,255,255));
        var self = this;
        var winSize = cc.winSize;
        
        var form1 = new mkmk.InputForm("部屋名", cc.p(10,400), this);    form1.setName("form1"); this.addChild(form1);
        var form2 = new mkmk.InputForm("ホスト", cc.p(10,350), this);    form2.setName("form2"); this.addChild(form2);
        var form3 = new mkmk.InputForm("メッセージ", cc.p(10,300), this); form3.setName("form3"); this.addChild(form3);
        
        this.addChild(new mkmk.ColorMenu(cc.color(51, 122, 183), cc.p(this.width/2,200), "OK", this.editBoxReturn, this));
    },
    
    editBoxReturn: function (sender) {
        // cc.log("Form1", sender.getString());
        var form1 = this.getChildByName("form1");
        var form2 = this.getChildByName("form2");
        var form3 = this.getChildByName("form3");
        
        var nextScene = cc.TransitionCrossFade.create(0.5, new BokupanMainScene());
        cc.director.runScene(nextScene);
    }
});

var MakeRoomScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var winSize = cc.winSize;
        
        var linkMenu = new LinkMakeRoomLayer();
        linkMenu.setPosition(cc.p(0,winSize.height-linkMenu.height));
        this.addChild(linkMenu,1);
        
        this.addChild( new MakeRoomLayer() , 0);
    }
});