//R-R-R

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
    const player = Player.getPlayer();
    var spellDelay_1 = GlobalVars.getInt("spellDelay_1");
    var spellDelay_2 = GlobalVars.getInt("spellDelay_2");
    var isArcher = GlobalVars.getBoolean("isArcher");
    
    const hand = Java.type('net.minecraft.class_1268').field_5808;
    const AttackPacketType = Java.type('net.minecraft.class_2879');
    const InteractItemPacketType = Java.type('net.minecraft.class_2886');
    function sendAttackPacket() {Client.sendPacket(new AttackPacketType(hand))}
    function sendInteractPacket() {Client.sendPacket(new InteractItemPacketType(hand,0))}
    var castL = !isArcher ? sendAttackPacket : sendInteractPacket;
    var castR = !isArcher ? sendInteractPacket : sendAttackPacket;

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
            castRRR();
            GlobalVars.putBoolean("isChanneling", false);
            Time.sleep(holdSpellDelay);
        }
    } while((time <= targetTime) && KeyBind.getPressedKeys().contains(event.key));
}


function castRRR(){
    if(GlobalVars.getInt("debug")>=1) Chat.log("Casting R-R-R");
    if(GlobalVars.getBoolean("checkSpellProcess")){
        let overlayMessageText = GlobalVars.getString("spellState");
        //let overlayMessageText = overlayMessageField.get(Client.getMinecraft().field_1705).getString();
        //if(overlayMessageText.length != 5){
        //    castR();
        //    overlayMessageText = overlayMessageField.get(Client.getMinecraft().field_1705).getString();
        //}
        if(overlayMessageText.length == 5 && overlayMessageText[4] == '?'){
            switch (overlayMessageText[2]){
            case 'R':
                Time.sleep(spellDelay_1);
                !isArcher ? castR() : castL();
                break;
            case 'L':
                Time.sleep(spellDelay_1);
                !isArcher ? castR() : castL();
                break;
            case '?':
                Time.sleep(spellDelay_1);
                castR();
                Time.sleep(spellDelay_1);
                castR();
                break;
            }
            Time.sleep(spellDelay_2);
            return;
        }
    }
    castR();
    Time.sleep(spellDelay_1);
    castR();
    Time.sleep(spellDelay_1);
    castR();
    Time.sleep(spellDelay_2);
}