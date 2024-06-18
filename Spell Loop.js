
const player = Player.getPlayer();
GlobalVars.putInt("channelingSpellCount", 0);
GlobalVars.putInt("spellBuffer", 0);

var overlayMessageField = GlobalVars.getObject("overlayMessageField");

var castL, castR;

while(true){
    //Chat.log(GlobalVars.getInt("channelingSpellCount"));
    //Chat.log(GlobalVars.getInt("spellBuffer"));
    let channelingSpellCount = GlobalVars.getInt("channelingSpellCount");
    if(channelingSpellCount > 0 && !GlobalVars.getBoolean("isChanneling")){
        var spellDelay_1 = GlobalVars.getInt("spellDelay_1");
        var spellDelay_2 = GlobalVars.getInt("spellDelay_2");
        var isArcher = GlobalVars.getBoolean("isArcher");
        castL = !isArcher ? player.attack : player.interact;
        castR = !isArcher ? player.interact : player.attack;
        
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


function castRLR(){
    if (GlobalVars.getInt("debug")>=1) Chat.log("Casting R-L-R");
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
function castRRR(){
    if (GlobalVars.getInt("debug")>=1) Chat.log("Casting R-R-R");
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
function castRLL(){
    if (GlobalVars.getInt("debug")>=1) Chat.log("Casting R-L-L");
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
    Time.sleep(spellDelay_2);
}
function castRRL(){
    if (GlobalVars.getInt("debug")>=1) Chat.log("Casting R-R-L");
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