
var debug = GlobalVars.getInt("debug");

const hand = Java.type('net.minecraft.class_1268').field_5808;
const AttackPacketType = Java.type('net.minecraft.class_2879');
const InteractItemPacketType = Java.type('net.minecraft.class_2886');
function sendAttackPacket() {Client.sendPacket(new AttackPacketType(hand))}
function sendInteractPacket() {Client.sendPacket(new InteractItemPacketType(hand,0))}

const player = Player.getPlayer();
var spellDelay_Main = GlobalVars.getInt("spellDelay_Main");
var spellDelay_After = GlobalVars.getInt("spellDelay_After");
var spellDelayInTicks = GlobalVars.getBoolean("spellDelayInTicks");

//var isArcher = GlobalVars.getBoolean("isArcher");
const models = Java.type("com.wynntils.core.components.Models");
currentClass = models.Character.getClassType().toString();
var isArcher = currentClass.includes("Archer");

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
    var delayMain = () => Client.waitTick(spellDelay_Main);
    var delayAfter = () => Client.waitTick(spellDelay_After);
}else{
    var delayMain = () => Time.sleep(spellDelay_Main);
    var delayAfter = () => Time.sleep(spellDelay_After);
}

//var overlayMessageField = GlobalVars.getObject("overlayMessageField");

function castSpell(smartCompleteL, smartCompleteR, smartCompleteQ, fullSpellFunc, label = ""){
    if(debug>=1) Chat.log("Casting ".concat(label));
    if(GlobalVars.getBoolean("checkSpellProcess")){
        let overlayMessageText = GlobalVars.getString("spellState");
        if(overlayMessageText != "-"){
            switch (overlayMessageText[2]){
                case 'L':
                    delayMain();
                    smartCompleteL();
                    break;
                case 'R':
                    delayMain();
                    smartCompleteR();
                    break;
                case '?':
                    smartCompleteQ();
                    break;
                }
            delayAfter();
            return;
        }
    }
    fullSpellFunc();
    delayAfter();
}
function castRLL(){
    castSpell(
        !isArcher ? castL : castR, 
        !isArcher ? castL : castL, 
        () => {
            castL();
            delayMain();
            castL();
        }, 
        () => {
            castR();
            castL();
            delayMain();
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
            delayMain();
            castR();
        }, 
        () => {
            castR();
            castL();
            delayMain();
            castR();
        }, 
        "R-L-R"
    );
}
function castRRL(){
    castSpell(
        !isArcher ? castL : castR, 
        !isArcher ? castL : castR, 
        () => {
            delayMain();
            castR();
            castL();
        }, 
        () => {
            castR();
            delayMain();
            castR();
            castL();
        }, 
        "R-R-L"
    );
}
function castRRR(){
    castSpell(
        !isArcher ? castR : castL, 
        !isArcher ? castR : castL, 
        () => {
            delayMain();
            castR();
            delayMain();
            castR();
        }, 
        () => {
            castR();
            delayMain();
            castR();
            delayMain();
            castR();
        }, 
        "R-R-R"
    );
}

function worldCastSpell(spellCastFunc){
    var timeThreshold = GlobalVars.getInt("timeThreshold");
    var timeDelay = GlobalVars.getInt("timeDelay");
    var time = Time.time();
    var targetTime = time + timeThreshold;
    var spellDelay_Hold = GlobalVars.getInt("spellDelay_Hold");

    while(GlobalVars.getBoolean("isChanneling") && time <= targetTime) {
        Time.sleep(timeDelay)
        time = Time.time();
    }
    if(time <= targetTime) {
        do{
            GlobalVars.putBoolean("isChanneling", true);
            spellCastFunc();
            GlobalVars.putBoolean("isChanneling", false);
            Time.sleep(spellDelay_Hold);
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