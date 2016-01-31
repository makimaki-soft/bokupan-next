var mkmk = mkmk || {};

mkmk.WebLayout = ccui.Layout.extend(/** @lends ccui.Layout# */{
    _usedHeight:0,
    _margin:5,
    _fontColor:cc.color(0,0,0),
    _tableLineColor:cc.color(128,128,128),
    
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
    
    table : function(_2DArray, _colWidths){
        var self = this;
        var drowLine = function(_start, _end){
            var lineWidth = 0.5;
            var lineColor = self._tableLineColor;
            var node = cc.DrawNode.create();
            node.drawSegment(_start,_end, lineWidth, lineColor);
            self.addChild(node);
            self._usedHeight += self._margin;
        };
        
        var firstPosY = this.height-this._usedHeight;
        
        drowLine(cc.p(this._margin,firstPosY), cc.p(this.width-this._margin,firstPosY));
        
        for(var col=0 ; col<_2DArray.length ; col++){
            var curCol = _2DArray[col];
            var posX = this._margin;
            var maxHeight = 0;
            for(var row=0 ; row<curCol.length ; row++){
                var text = new cc.LabelTTF(curCol[row]);
                text.setDimensions(cc.size(_colWidths[row],0));
                text.setAnchorPoint(cc.p(0,1));
                text.setPosition(cc.p(posX, this.height-this._usedHeight));
                text.setColor(this._fontColor);
                posX += _colWidths[row] + this._margin;
                maxHeight = Math.max(maxHeight, text.height );
                this.addChild(text);
            }
            this._usedHeight += maxHeight + this._margin;
            drowLine(cc.p(this._margin,this.height-this._usedHeight), cc.p(this.width-this._margin,this.height-this._usedHeight));
        }
        
        var posX = this._margin;
        var height = this.height-this._usedHeight+this._margin;
        drowLine(cc.p(posX,firstPosY), cc.p(posX,height));
          
        for(var i=0 ; i<_colWidths.length ; i++){
            posX += _colWidths[i];
            drowLine(cc.p(posX,firstPosY), cc.p(posX,height));
        }
    },
    
    brank : function(_height){
        this._usedHeight += _height;
    },
    
    setPage :function(_page){
        _page.call(this);
    }
});
