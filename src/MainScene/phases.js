var mkmk = mkmk || {};

/**
 * Phaseを定義する.
 * @type {Object}
 */
mkmk.phaseList = {
    
    "list" : [    "actionChoicePhase"
                , "playerMovePhase"
                , "rotateAllowPhase"
                , "collectPantsPhase"
                , "selectItemPhase"
                , "rotateAllAllowPhase"
                , "movePolicePhase"
                , "movePeoplePhase"
                , "comPhase"
                , "playerPhase"
            ]
}

mkmk.turnCnt = 2;
mkmk.phases = mkmk.initPhases();