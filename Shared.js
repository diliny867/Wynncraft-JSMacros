
const hand = Java.type('net.minecraft.class_1268').field_5808;
const AttackPacketType = Java.type('net.minecraft.class_2879');
const InteractItemPacketType = Java.type('net.minecraft.class_2886');
function sendAttackPacket() {Client.sendPacket(new AttackPacketType(hand))}
function sendInteractPacket() {Client.sendPacket(new InteractItemPacketType(hand,0))}

const player = Player.getPlayer();
var spellDelay_1 = GlobalVars.getInt("spellDelay_1");
var spellDelay_2 = GlobalVars.getInt("spellDelay_2");
var isArcher = GlobalVars.getBoolean("isArcher");

var castL = !isArcher ? sendAttackPacket : sendInteractPacket;
var castR = !isArcher ? sendInteractPacket : sendAttackPacket;

var debug = GlobalVars.getInt("debug");

//var overlayMessageField = GlobalVars.getObject("overlayMessageField");

function castRLL(){
    if(debug>=1) Chat.log("Casting R-L-L");
    if(GlobalVars.getBoolean("checkSpellProcess")){
        let overlayMessageText = GlobalVars.getString("spellState");
        //let overlayMessageText = overlayMessageField.get(Client.getMinecraft().field_1705).getString();
        //if(overlayMessageText.length != 5){
        //    castR();
        //    overlayMessageText = overlayMessageField.get(Client.getMinecraft().field_1705).getString();
        //}
        if(overlayMessageText != "-"){
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
function castRLR(){
    if(debug>=1) Chat.log("Casting R-L-R");
    if(GlobalVars.getBoolean("checkSpellProcess")){
        let overlayMessageText = GlobalVars.getString("spellState");
        if(overlayMessageText != "-"){
            switch (overlayMessageText[2]){
            case 'L':
                Time.sleep(spellDelay_1);
                !isArcher ? castR() : castL();
                break;
            case 'R':
                Time.sleep(spellDelay_1);
                !isArcher ? castL() : castR();
                break;
            case '?':
                castL();
                Time.sleep(spellDelay_1);
                castR();
                break;
            }
            Time.sleep(spellDelay_2);
            return;
        }
    }
    castR();
    castL();
    Time.sleep(spellDelay_1);
    castR();
    Time.sleep(spellDelay_2);
}
function castRRL(){
    if(debug>=1) Chat.log("Casting R-R-L");
    if(GlobalVars.getBoolean("checkSpellProcess")){
        let overlayMessageText = GlobalVars.getString("spellState");
        if(overlayMessageText != "-"){ //Spell progress
            switch (overlayMessageText[2]){
            case 'R':
                Time.sleep(spellDelay_1);
                !isArcher ? castL() : castR();
                break;
            case 'L':
                Time.sleep(spellDelay_1);
                !isArcher ? castR() : castL();
                break;
            case '?':
                Time.sleep(spellDelay_1);
                castR();
                castL();
                break;
            }
            Time.sleep(spellDelay_2);
            return;
        }
    }
    castR();
    Time.sleep(spellDelay_1);
    castR();
    castL();
    Time.sleep(spellDelay_2);
}
function castRRR(){
    if(debug>=1) Chat.log("Casting R-R-R");
    if(GlobalVars.getBoolean("checkSpellProcess")){
        let overlayMessageText = GlobalVars.getString("spellState");
        if(overlayMessageText != "-"){
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

module.exports = {castL, castR, castRLL, castRLR, castRRL, castRRR}