var addr = {
      HOME : {
          "1" : {x: 86, y:134 } 
        , "2" : {x:198, y:134 } 
        , "3" : {x:308, y:134 }
        , "4" : {x: 86, y:288 }
        , "5" : {x:198, y:288 }
        , "6" : {x:308, y:288 }
        , "7" : {x: 86, y:443 }
        , "8" : {x:198, y:443 }
        , "9" : {x:308, y:443 }
        , "A" : {x: 24, y:134 }
        , "B" : {x:377, y:134 }
        , "C" : {x: 24, y:443 }
        , "D" : {x:377, y:443 }
      }
    , ARROW : {
          "1" : {x: 35, y:168}
        , "2" : {x:239, y: 39}
        , "3" : {x:165, y:370}
        , "4" : {x:365, y:233}
    }
    , ROAD : {
          "1"  : {x:142, y:134}
        , "2"  : {x:255, y:134}
        , "3"  : {x: 86, y:211}
        , "4"  : {x:198, y:211}
        , "5"  : {x:308, y:211}
        , "6"  : {x:142, y:288}
        , "7"  : {x:255, y:288}
        , "8"  : {x: 86, y:365}
        , "9"  : {x:198, y:365}
        , "10" : {x:308, y:365}
        , "11" : {x:142, y:443}
        , "12" : {x:255, y:443}
    }
};

var closestPos = function(_pos){

    var distance = Number.MAX_VALUE;
    var bestPos = -1;

    for( var key in addr.HOME ){
        var tmp = mkmk.util.getDistance( addr.HOME[key], _pos );
        if( tmp < distance ){
            bestPos = addr.HOME[key];
            distance = tmp;
        }
    }
    
    for( var key in addr.ROAD ){
        var tmp = mkmk.util.getDistance( addr.ROAD[key], _pos );
        if( tmp < distance ){
            bestPos = addr.ROAD[key];
            distance = tmp;
        }
    }
     
    return bestPos;
};
