mkmk.phases["playerPhase"].attr({
       
   /**
    * playerPhaseの開始処理
    *  - 次のフェーズがComかプレイヤーか決定し、子フェーズを開始する。
    */
    onEnter : function(){
       cc.log("onEnter Player Phase");
       var mapLayer = this.layers.mapLayer;
       
       mkmk.phases["actionChoicePhase"].onEnter();
    }
    
    /**
     * playerPhaseの終了処理
     *  - 次のプレイヤーに変更する。
     */
  , onExit : function(){
        cc.log("onExit Player Phase");
    }
});