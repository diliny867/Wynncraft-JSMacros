
var debug = GlobalVars.getInt("debug");

const hand = Java.type('net.minecraft.class_1268').field_5808;
const AttackPacketType = Java.type('net.minecraft.class_2879');
const InteractItemPacketType = Java.type('net.minecraft.class_2886');
function sendAttackPacket() {Client.sendPacket(new AttackPacketType(hand))}
function sendInteractPacket() {Client.sendPacket(new InteractItemPacketType(hand,0))}

const player = Player.getPlayer();
var spellDelay_1 = GlobalVars.getInt("spellDelay_1");
var spellDelay_2 = GlobalVars.getInt("spellDelay_2");
var spellDelayInTicks = GlobalVars.getBoolean("spellDelayInTicks");
var isArcher = GlobalVars.getBoolean("isArcher");

if(debug > 0){
    var castL = () => {
        Chat.log("Casting L"); 
        !isArcher ? sendAttackPacket() : sendInteractPacket();
    };
    var castR = () => {
        Chat.log("Casting R");
        !isArcher ? sendInteractPacket() : sendAttackPacket();
    };
}else{
    var castL = !isArcher ? sendAttackPacket : sendInteractPacket;
    var castR = !isArcher ? sendInteractPacket : sendAttackPacket;
}

if(spellDelayInTicks){
    var delayShort = () => Client.waitTick(spellDelay_1);
    var delayLong = () => Client.waitTick(spellDelay_2);
}else{
    var delayShort = () => Time.sleep(spellDelay_1);
    var delayLong = () => Time.sleep(spellDelay_2);
}

//var overlayMessageField = GlobalVars.getObject("overlayMessageField");

function castSpell(smartCompleteL, smartCompleteR, smartCompleteQ, fullSpellFunc, label = ""){
    if(debug>=1) Chat.log("Casting ".concat(label));
    if(GlobalVars.getBoolean("checkSpellProcess")){
        let overlayMessageText = GlobalVars.getString("spellState");
        if(overlayMessageText != "-"){
            switch (overlayMessageText[2]){
                case 'L':
                    delayShort();
                    smartCompleteL();
                    break;
                case 'R':
                    delayShort();
                    smartCompleteR();
                    break;
                case '?':
                    smartCompleteQ();
                    break;
                }
            delayLong();
            return;
        }
    }
    fullSpellFunc();
    delayLong();
}
function castRLL(){
    castSpell(
        !isArcher ? castL : castR, 
        !isArcher ? castL : castL, 
        () => {
            castL();
            delayShort();
            castL();
        }, 
        () => {
            castR();
            castL();
            delayShort();
            castL();
        }, 
        "R-L-L"
    );
}
function castRLR(){
    castSpell(
        !isArcher ? castR : castL, 
        !isArcher ? castL : castR, 
        () => {
            castL();
            delayShort();
            castR();
        }, 
        () => {
            castR();
            castL();
            delayShort();
            castR();
        }, 
        "R-L-L"
    );
}
function castRRL(){
    castSpell(
        !isArcher ? castL : castR, 
        !isArcher ? castR : castL, 
        () => {
            delayShort();
            castR();
            castL();
        }, 
        () => {
            castR();
            delayShort();
            castR();
            castL();
        }, 
        "R-L-L"
    );
}
function castRRR(){
    castSpell(
        !isArcher ? castR : castL, 
        !isArcher ? castR : castL, 
        () => {
            delayShort();
            castR();
            delayShort();
            castR();
        }, 
        () => {
            castR();
            delayShort();
            castR();
            delayShort();
            castR();
        }, 
        "R-L-L"
    );
}

function worldCastSpell(spellCastFunc){
    var timeThreshold = GlobalVars.getInt("timeThreshold");
    var timeDelay = GlobalVars.getInt("timeDelay");
    var time = Time.time();
    var targetTime = time + timeThreshold;
    var holdSpellDelay = GlobalVars.getInt("holdSpellDelay");

    while(GlobalVars.getBoolean("isChanneling") && time <= targetTime) {
        Time.sleep(timeDelay)
        time = Time.time();
    }
    if(time <= targetTime) {
        do{
            GlobalVars.putBoolean("isChanneling", true);
            spellCastFunc();
            GlobalVars.putBoolean("isChanneling", false);
            Time.sleep(holdSpellDelay);
        } while(KeyBind.getPressedKeys().contains(event.key));
    }
}

function pushBufferedSpell(spellCode){
    var maxBufferedSpells = GlobalVars.getInt("maxBufferedSpells");
    var channelingSpellCount = GlobalVars.getInt("channelingSpellCount");
    if(channelingSpellCount < maxBufferedSpells){
        GlobalVars.putBoolean("isChanneling", true);
        var spellBuffer = GlobalVars.getInt("spellBuffer");
        var dist = channelingSpellCount*2;
        spellBuffer = spellBuffer&((1<<dist)-1);
        spellBuffer = spellBuffer|(spellCode<<dist);
        GlobalVars.putInt("spellBuffer", spellBuffer);
        GlobalVars.putInt("channelingSpellCount",channelingSpellCount+1);
        GlobalVars.putBoolean("isChanneling", false);
    }
}


module.exports = {castL, castR, castRLL, castRLR, castRRL, castRRR, castSpell, worldCastSpell, pushBufferedSpell}