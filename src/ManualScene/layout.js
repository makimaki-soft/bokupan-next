var mkmk = mkmk || {};

mkmk.webLayout = {
    ALIGNMENT_CENTER    : "ALIGNMENT_CENTER",
    ALIGNMENT_LEFT      : "ALIGNMENT_LEFT",
    ALIGNMENT_RIGHT     : "ALIGNMENT_RIGHT"
};

mkmk.WebLayout = ccui.Layout.extend(/** @lends ccui.Layout# */{
    _usedHeight:0,
    _margin:5,
    _fontColor:cc.color(0,0,0),
    _tableLineColor:cc.color(128,128,128),
    _headerFontColor:cc.color(169, 68, 66),
    _headerUnderLineColor:cc.color(169, 68, 66),
    _innerTitleColor:cc.color(49, 112, 143),
    _innerFillColor:cc.color(217, 237, 247),
    _innerLineColor:cc.color(188, 232, 241),
    _offset : 0,
    _fontSize : 12,
    
    ctor: function () {
        ccui.Layout.prototype.ctor.call(this); // super
        this._usedHeight = this._margin;
    },
    
    write: function(_string ){
        var text = new cc.LabelTTF(_string);
        text.setDimensions(cc.size(this.width-this._offset,0));
        text.setAnchorPoint(cc.p(0,1));
        text.setPosition(cc.p(this._offset,this.height-this._usedHeight));
        text.setColor(this._fontColor);
        text.setFontSize(this._fontSize);
        
        this._usedHeight += text.height + this._margin;
        this.addChild(text);
        return text;
    },
    
    header : function(_string){
        var self = this;
        var text = new cc.LabelTTF("◯"+_string);
        text.setDimensions(cc.size(this.width,0));
        text.setAnchorPoint(cc.p(0,1));
        text.setPosition(cc.p(0,this.height-this._usedHeight));
        text.setColor(this._headerFontColor);
        
        this._usedHeight += text.height;
        this.addChild(text);
        
        var drowDashLine = function(_startX, _endX, height){
            var lineWidth = 0.5;
            var lineColor = self._headerUnderLineColor;
            var dashWidth = 4;
            var space = 3;
            
            for(var posX = _startX ; posX < _endX ; posX += dashWidth ){
                
                var node = cc.DrawNode.create();
                node.drawSegment(cc.p(posX, height) , cc.p(posX+dashWidth, height), lineWidth, lineColor);
                self.addChild(node);
                posX += space;
            }
            self._usedHeight += self._margin;
        };
        
        drowDashLine(0, this.width, this.height-this._usedHeight);
        
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
    
    addImage : function(_image, _alignment, _scaleX, _scaleY){
        var imageView = ccui.ImageView.create(_image);
        var height = imageView.height;
        if( _scaleX || _scaleY ){
            imageView.setScale( _scaleX, _scaleY );
            height *= _scaleY ? _scaleY : _scaleX;
        } 
        
        switch(_alignment){
            case mkmk.webLayout.ALIGNMENT_LEFT:
                imageView.setAnchorPoint(cc.p(0,1));
                imageView.setPosition(cc.p(this._margin,this.height-this._usedHeight));
                break;
            case mkmk.webLayout.ALIGNMENT_RIGHT:
                imageView.setAnchorPoint(cc.p(1,1));
                imageView.setPosition(cc.p(this.width-this._margin,this.height-this._usedHeight));
                break;
            default :
                imageView.setAnchorPoint(cc.p(0.5,1));
                imageView.setPosition(cc.p(this.width/2,this.height-this._usedHeight));
                break;
        }
        
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
        text.setFontSize(this._fontSize);
        
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
    
    innerLayout : function(_string, _inner){
        var self = this;
        var text = new cc.LabelTTF(_string);
        text.setDimensions(cc.size(this.width,0));
        text.setAnchorPoint(cc.p(0,1));
        text.setPosition(cc.p(this._margin*2,this.height-this._usedHeight-this._margin));
        text.setColor(this._innerTitleColor);
        
        var node = cc.DrawNode.create();
        node.drawRect(cc.p(this._margin, this.height-this._usedHeight), 
                      cc.p(this.width-this._margin, this.height-this._usedHeight-text.height-this._margin), 
                      this._innerFillColor, 0.5, this._innerLineColor);
        this.addChild(node);
        this.addChild(text);
        
        var posY = this.height - this._usedHeight - text.height-this._margin;
        this._usedHeight += text.height + this._margin*2;
        
        this._offset = this._margin*2;
        _inner.call(this);
        this._offset = 0;
        
        var drowLine = function(_start, _end){
            var lineWidth = 0.5;
            var lineColor = self._innerLineColor;
            var node = cc.DrawNode.create();
            node.drawSegment(_start,_end, lineWidth, lineColor);
            self.addChild(node);
        };
        
        drowLine(cc.p(this._margin,  posY), cc.p(this._margin,  this.height-this._usedHeight));
        drowLine(cc.p(this.width-this._margin,  posY), cc.p(this.width-this._margin,  this.height-this._usedHeight));
        drowLine(cc.p(this._margin,  this.height-this._usedHeight), cc.p(this.width-this._margin,  this.height-this._usedHeight));
        
        this._usedHeight += this._margin;
    },
    
    brank : function(_height){
        this._usedHeight += _height;
    },
    
    setPage :function(_page){
        _page.call(this);
    }
});
