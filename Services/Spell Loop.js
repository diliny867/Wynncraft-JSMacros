
const {castRLL, castRLR, castRRL, castRRR, worldCastSpell, pushBufferedSpell} = require('../Shared');

GlobalVars.putInt("channelingSpellCount", 0);
GlobalVars.putInt("spellBuffer", 0);

const spellCodes = {"key.keyboard.q" : 1, "key.keyboard.r" : 2, "key.keyboard.c" : 3, "key.keyboard.f" : 4};

//var listener = JsMacros.on('Key', true, JavaWrapper.methodToJava((event, context) => {
//    context.releaseLock();
//    if(event.action != 1 || event.key.length < 14){ return; }
//
//    let spellCode = spellCodes[event.key];
//    if(spellCode === undefined){ return; }
//
//    pushBufferedSpell(spellCode);
//}));
//JsMacros.off(listener);


while(true){
    //Chat.log(GlobalVars.getInt("channelingSpellCount"));
    //Chat.log(GlobalVars.getInt("spellBuffer"));
    let channelingSpellCount = GlobalVars.getInt("channelingSpellCount");
    if(channelingSpellCount > 0 && !GlobalVars.getBoolean("isChanneling")){
        let spellBuffer = GlobalVars.getInt("spellBuffer");
        switch (spellBuffer&3){
            case 0:
                worldCastSpell(castRLR);
                break;
            case 1:
                worldCastSpell(castRRR);
                break;
            case 2:
                worldCastSpell(castRLL);
                break;
            case 3:
                worldCastSpell(castRRL);
                break;
        };
        spellBuffer = spellBuffer>>2;
        GlobalVars.putInt("spellBuffer", spellBuffer);
        GlobalVars.putInt("channelingSpellCount", channelingSpellCount-1);
    }
    Time.sleep(25);
}
