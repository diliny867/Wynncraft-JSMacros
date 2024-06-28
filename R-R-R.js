//R-R-R

const {castRRR} = require('./Shared');

if (GlobalVars.getBoolean("doBufferedSpells")){
    const spellCode = 1;
    let maxBufferedSpells = GlobalVars.getInt("maxBufferedSpells");
    let channelingSpellCount = GlobalVars.getInt("channelingSpellCount");
    if(channelingSpellCount < maxBufferedSpells){
        GlobalVars.putBoolean("isChanneling", true);
        let spellBuffer = GlobalVars.getInt("spellBuffer");
        let dist = channelingSpellCount*2;
        spellBuffer = spellBuffer&((1<<dist)-1);
        spellBuffer = spellBuffer|(spellCode<<dist);
        GlobalVars.putInt("spellBuffer", spellBuffer);
        GlobalVars.putInt("channelingSpellCount",channelingSpellCount+1);
        GlobalVars.putBoolean("isChanneling", false);
    }
}else{
    var timeThreshold = GlobalVars.getInt("timeThreshold");
    var timeDelay = GlobalVars.getInt("timeDelay");
    var time = Time.time();
    var targetTime = time + timeThreshold;
    while(GlobalVars.getBoolean("isChanneling") && time <= targetTime) {
        Time.sleep(timeDelay)
        time = Time.time();
    }
    
    var holdSpellDelay = GlobalVars.getInt("holdSpellDelay");
    do{
        if(time <= targetTime) {
            GlobalVars.putBoolean("isChanneling", true);
            castRRR();
            GlobalVars.putBoolean("isChanneling", false);
            Time.sleep(holdSpellDelay);
        }
    } while((time <= targetTime) && KeyBind.getPressedKeys().contains(event.key));
}
