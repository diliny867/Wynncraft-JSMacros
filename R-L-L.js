//R-L-L

if (GlobalVars.getBoolean("doBufferedSpells")){
    const spellCode = 2;
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
    const player = Player.getPlayer();
    var spellDelay_1 = GlobalVars.getInt("spellDelay_1");
    var spellDelay_2 = GlobalVars.getInt("spellDelay_2");
    var isArcher = GlobalVars.getBoolean("isArcher");
    castL = !isArcher ? player.attack : player.interact;
    castR = !isArcher ? player.interact : player.attack;

    var overlayMessageField = GlobalVars.getObject("overlayMessageField");

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
            castRLL();
            GlobalVars.putBoolean("isChanneling", false);
            Time.sleep(holdSpellDelay);
        }
    } while((time <= targetTime) && KeyBind.getPressedKeys().contains(event.key));
}


function castRLL(){
    if(GlobalVars.getInt("debug")>=1) Chat.log("Casting R-L-L");
    if(GlobalVars.getBoolean("checkSpellProcess")){
        let overlayMessageText = GlobalVars.getString("spellState");
        //let overlayMessageText = overlayMessageField.get(Client.getMinecraft().field_1705).getString();
        //if(overlayMessageText.length != 5){
        //    castR();
        //    overlayMessageText = overlayMessageField.get(Client.getMinecraft().field_1705).getString();
        //}
        if(overlayMessageText.length == 5 && overlayMessageText[4] == '?'){
            switch (overlayMessageText[2]){
            case 'L':
                Time.sleep(spellDelay_1);
                !isArcher ? castL() : castR();
                break;
            case 'R':
                Time.sleep(spellDelay_1);
                !isArcher ? castL() : castL();
                break;
            case '?':
                castL();
                Time.sleep(spellDelay_1);
                castL();
                break;
            }
            Time.sleep(spellDelay_2);
            return;
        }
    }
    castR();
    castL();
    Time.sleep(spellDelay_1);
    castL();
    Time.sleep(spellDelay_2);
}