var mkmk = mkmk || {};

mkmk.WebLayout = ccui.Layout.extend(/** @lends ccui.Layout# */{
    _usedHeight:0,
    _margin:5,
    _fontColor:cc.color(0,0,0),
    
    ctor: function () {
        ccui.Layout.prototype.ctor.call(this); // super
        this._usedHeight = this._margin;
    },
    
    
    write: function(_string){
        var text = new cc.LabelTTF(_string);
        text.setDimensions(cc.size(this.width,0));
        text.setAnchorPoint(cc.p(0,1));
        text.setPosition(cc.p(0,this.height-this._usedHeight));
        text.setColor(this._fontColor);
        
        this._usedHeight += text.height + this._margin;
        this.addChild(text);
        return text;
    },
    
    header : function(_string){
        var text = new cc.LabelTTF(_string);
        text.setDimensions(cc.size(this.width,0));
        text.setAnchorPoint(cc.p(0,1));
        text.setPosition(cc.p(0,this.height-this._usedHeight));
        text.setColor(this._fontColor);
        
        this._usedHeight += text.height + this._margin;
        this.addChild(text);
        return text;
    },
    
    footer : function(_string){
        var text = new cc.LabelTTF(_string);
        text.setDimensions(cc.size(this.width,0));
        text.setAnchorPoint(cc.p(0,0));
        text.setPosition(cc.p(this.width/2,0));
        text.setColor(this._fontColor);
        
        this.addChild(text);
        return text;
    },
    
    addImage : function(_image, _scaleX, _scaleY){
        var imageView = ccui.ImageView.create(_image);
        var height = imageView.height;
        if( _scaleX || _scaleY ){
            imageView.setScale( _scaleX, _scaleY );
            height *= _scaleY ? _scaleY : _scaleX;
        } 
        imageView.setAnchorPoint(cc.p(0.5,1));
        imageView.setPosition(cc.p(this.width/2,this.height-this._usedHeight));
        
        this._usedHeight += height + this._margin;
        this.addChild(imageView);
        return imageView;
    },
    
    item : function(_string, _image){
        var iconSize = 40;
        var imageView = ccui.ImageView.create(_image);
        imageView.setScale(iconSize/imageView.width, iconSize/imageView.height);
        imageView.setAnchorPoint(cc.p(0,1));
        imageView.setPosition(cc.p(0,this.height-this._usedHeight));
        
        var text = new cc.LabelTTF(_string);
        text.setDimensions(cc.size(this.width-iconSize-this._margin,0));
        text.setAnchorPoint(cc.p(0,1));
        text.setPosition(cc.p(iconSize+this._margin,this.height-this._usedHeight));
        text.setColor(this._fontColor);
        
        this._usedHeight += Math.max(iconSize, text.height) + this._margin;
        
        this.addChild(imageView);
        this.addChild(text);
    },
    
    brank : function(_height){
        this._usedHeight += _height;
    },
    
    setPage :function(_page){
        _page.call(this);
    }
});
