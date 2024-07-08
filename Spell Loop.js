
const {castRLL, castRLR, castRRL, castRRR} = require('./Shared');

GlobalVars.putInt("channelingSpellCount", 0);
GlobalVars.putInt("spellBuffer", 0);

while(true){
    //Chat.log(GlobalVars.getInt("channelingSpellCount"));
    //Chat.log(GlobalVars.getInt("spellBuffer"));
    let channelingSpellCount = GlobalVars.getInt("channelingSpellCount");
    if(channelingSpellCount > 0 && !GlobalVars.getBoolean("isChanneling")){
        let spellBuffer = GlobalVars.getInt("spellBuffer");
        switch (spellBuffer&3){
            case 0:
                castRLR();
                break;
            case 1:
                castRRR();
                break;
            case 2:
                castRLL();
                break;
            case 3:
                castRRL();
                break;
        };
        spellBuffer = spellBuffer>>2;
        GlobalVars.putInt("spellBuffer", spellBuffer);
        GlobalVars.putInt("channelingSpellCount", channelingSpellCount-1);
    }
    Time.sleep(25);
}
