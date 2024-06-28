
const {castL, castR} = require('./Shared');

var isArcher = GlobalVars.getBoolean("isArcher");
var melee = !isArcher ? castL : castR;

var delay = GlobalVars.getInt("meleeDelay");

if (!GlobalVars.getBoolean("isMelee")) {
    GlobalVars.putBoolean("isMelee", true);
    //let currTime = 0;
    //let lastTime = 0;
    while (KeyBind.getPressedKeys().contains(event.key)) {
        let overlayMessageText = GlobalVars.getString("spellState");
        if(overlayMessageText.length == 5 && overlayMessageText[4] == '?'){ break; }
        //currTime = Time.time();
        //Chat.log(currTime - lastTime);
        //lastTime = currTime;
        melee();
        Time.sleep(delay);
    }
    GlobalVars.putBoolean("isMelee", false);
}