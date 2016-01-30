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
        this._super(cc.color(255,255,255), cc.winSize.width, cc.winSize.height-20);
        var winSize = cc.winSize;
        
        var pageTitle = new cc.LabelTTF(msg.ManualTitle);
        pageTitle.setAnchorPoint(cc.p(0,1));
        pageTitle.setPosition(cc.p(0,this.height));
        pageTitle.setColor(cc.color(0,0,0));
        this.addChild(pageTitle);
        
        var pageView = new ccui.PageView();
        pageView.setContentSize(this.width-10, this.height-pageTitle.height);
        pageView.setPosition(cc.p(5, 5));
        pageView.setBackGroundColorType(ccui.Layout.COLOR_SOLID);
        pageView.setBackGroundColor(cc.color(255,255,255));
        
        this.addChild(pageView);
        
        for( var i=0 ; i<this.pages.length ; i++){
            
            var page = this.pages[i];
            var layout = new mkmk.WebLayout();
            layout.setContentSize(pageView.getContentSize());
       
            layout.setPage(page);
            
            pageView.insertPage(layout, i);
        }
    },
    
    pages : [
        function(){
            this.header("概要");
            this.write("あなたはパンツをこよなく愛する紳士です。家宅にしｎ...訪問しパンツを得て、日々を過ごしていました。 そんな折、パンツへの愛を競い合うコンテストの存在を耳にします。あなたは自身の愛が一番だと示すため、コンテストに参加することにしました。");
            this.footer("1");
        },
        function(){
            this.header("画面の見方");
            this.addImage(res.Screen, 0.25);
            this.write("マップ これが今回のコンテスト会場です（マップ全体の絵） ターゲットとなる家は９つあります。");
            this.item("プレイヤーのアイコンです。プレイヤー毎に色が違います。", res.Koma);
            this.item("家です。", res.House);
            this.item("家に住人がいる場合、住人アイコンが表示されます。", res.Girl);
            this.item("アイコンと同じ色が自分の拠点です。自分の拠点に帰るまでがパンツコンテンストです。", res.Ajito);
            this.item("巡回中の警察官です。見つかると・・・。", res.Police);
            this.item("巡回ルートを示す看板（矢印）がです。警察官は矢印に従って巡回します。", res.Arrow);
            this.footer("2");
        },
        function(){
            this.header("ゲームの流れ");
            this.write("ゲームは各プレイヤーが順に行動を行うターン制です。 全区画の住人のパンツを1番最初にすべて集めたプレイヤーが勝ちです。 警察官に捕まらないように移動したり、警察官の進行方向を変えて戦います。");
            this.footer("3");
        },
        function(){
            this.header("逮捕について");
            this.write("パンツを持った状態で警官とすれ違うか、住人と出くわした場合は逮捕となり、手持ちのパンツをすべて破棄して自分の拠点に戻ります。 逮捕されずに自分の拠点までパンツを持って帰ることで、パンツをポケットからコレクションにしまうことができます。 拠点は警察官の巡回ルーツに含まれていません。ライバルの拠点に入ることはできますが、コレクションには加わりません。");
            this.footer("4");
        },
        function(){
            this.header("コンテストの終了について");
            this.write("すべての家のパンツを最初にコレクションに加えたプレイヤーの勝利となり、コンテンストの終了となります。");
            this.footer("5");
        }
    ]
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