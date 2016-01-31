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
        
        var menuLeft = new cc.MenuItemLabel(new cc.LayerColor(cc.color(0,0,0,0), 100, 200), function(){
            pageView.scrollToPage(pageView.getCurPageIndex()-1);
        }, this);
        
        var left = new cc.Menu(menuLeft);
        left.setAnchorPoint(cc.p(0,0.5));
        left.setPosition(cc.p(0,this.height/2));
        this.addChild(left);
        
        var menuRight = new cc.MenuItemLabel(new cc.LayerColor(cc.color(0,0,0,0), 100, 200), function(){
            pageView.scrollToPage(pageView.getCurPageIndex()+1);
        }, this);
        
        var right = new cc.Menu(menuRight);
        right.setAnchorPoint(cc.p(1,0.5));
        right.setPosition(cc.p(this.width,this.height/2));
        this.addChild(right);
    },
    
    pages : [
        function(){
            this.header("概要");
            this.brank(15);
            this.table([
                ["タイトル", "僕がパンツを好きになった理由"],
                ["対象年齢", "良識のある15歳以上"],
                ["プレイ人数", "4人"]
            ],  [100, this.width-100-this._margin*2]);
            this.write("あなたはパンツをこよなく愛する紳士です。家宅にしｎ...訪問しパンツを得て、日々を過ごしていました。 そんな折、パンツへの愛を競い合うコンテストの存在を耳にします。あなたは自身の愛が一番だと示すため、コンテストに参加することにしました。");
            this.footer("1");
        },
        function(){
            this.header("画面の見方(1/2)");
            this.addImage(res.Screen, mkmk.webLayout.ALIGNMENT_CENTER, 0.6);
            this.write("マップ これが今回のコンテスト会場です（マップ全体の絵） ターゲットとなる家は９つあります。");
            this.footer("2");
        },
        function(){
            this.header("画面の見方(2/2)");
            this.item("プレイヤーのアイコンです。プレイヤー毎に色が違います。", res.Koma);
            this.item("家です。", res.House);
            this.item("家に住人がいる場合、住人アイコンが表示されます。", res.Girl);
            this.item("アイコンと同じ色が自分の拠点です。自分の拠点に帰るまでがパンツコンテンストです。", res.Ajito);
            this.item("巡回中の警察官です。見つかると・・・。", res.Police);
            this.item("巡回ルートを示す看板（矢印）がです。警察官は矢印に従って巡回します。", res.Arrow);
            this.addImage(res.Status, mkmk.webLayout.ALIGNMENT_LEFT, 0.6);
            this.write("ステータス画面です。");
            this.write("① ぽっけにいれているパンツ");
            this.write("② 拠点に持ち帰ったパンツ");
            this.write("③ コンテスト主催者から配られたアイテム。紳士に奇跡を起こします。");
            this.footer("3");
        },
        function(){
            this.header("ゲームの流れ(1/2)");
            this.write("ゲームは各プレイヤーが順に行動を行うターン制です。 全区画の住人のパンツを1番最初にすべて集めたプレイヤーが勝ちです。 警察官に捕まらないように移動したり、警察官の進行方向を変えて戦います。");
            
            this.innerLayout("1. ターンの開始",function(){
                this.write("ターンの最初に、マップに以下のいずれかの変更が起こります。");
                this.write("    - 警察官の移動");
                this.write("    - 住人の帰宅");
                this.write("警察官の移動について");
                this.write("サイコロを２個振り、出た目の合計分、進行方向に進みます。 T字路では矢印の方向に進行方向を変えます。");

                this.write("住人の帰宅について");
                this.write("ランダムで住人がでかけたり、帰宅したりします。");
            });
            this.footer("4");
        },
        function(){
            this.header("ゲームの流れ(2/2)");
            this.innerLayout("2. プレイヤーの行動", function(){
            
                this.write("各プレイヤは自分の番に、次のうちどれかを２回行わなければなりません。");

                this.write("    - 移動する");
                this.write("    - パンツを得る");
                this.write("    - 巡回ルートの矢印の向きを変える");
                this.write("    - アイテムを使う");
                this.write("移動する");
                this.write("ひとつ隣のマスに移動します。");

                this.write("パンツを得る");
                this.write("プレイヤは家の前にいるときパンツを得ることができます。ただし、「家に住人がいるとき」、「自分がその家のパンツを持っているとき」はこの行動をすることができません。");

                this.write("巡回ルートの矢印の向きを変える");
                this.write("プレイヤは矢印の前にいるとき矢印の向きをかえることができます。変えるときは必ず別の方向に変えなければなりません。");

                this.write("アイテムを使う");
                this.write("プレイヤはコンテスト中に以下のアイテムをそれぞれ一回ずつ使用することができます。");

                this.write("    - 警察官に巡回させる");
                this.write("    - ランダムに住人を帰宅させる");
                this.write("    - 巡回ルートの矢印の向きを時計回りに１つずつ回す");
            });
            
            this.innerLayout("3. ターンの終了",function(){
                this.write("全プレーヤの行動が終わると１ターンが終了です。");
            });
            
            this.footer("5");
        },
        function(){
            this.header("逮捕について");
            this.write("パンツを持った状態で警官とすれ違うか、住人と出くわした場合は逮捕となり、手持ちのパンツをすべて破棄して自分の拠点に戻ります。 逮捕されずに自分の拠点までパンツを持って帰ることで、パンツをポケットからコレクションにしまうことができます。 拠点は警察官の巡回ルーツに含まれていません。ライバルの拠点に入ることはできますが、コレクションには加わりません。");
            this.brank(15);
       
            this.header("コンテストの終了について");
            this.write("すべての家のパンツを最初にコレクションに加えたプレイヤーの勝利となり、コンテンストの終了となります。");
            this.footer("6");
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