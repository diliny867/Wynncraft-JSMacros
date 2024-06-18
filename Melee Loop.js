
const player = Player.getPlayer();
var isArcher = GlobalVars.getBoolean("isArcher");
var melee = !isArcher ? player.attack : player.interact;

var delay = GlobalVars.getInt("meleeDelay");

var overlayMessageField = GlobalVars.getObject("overlayMessageField");

if (!GlobalVars.getBoolean("isMelee")) {
    GlobalVars.putBoolean("isMelee", true);
    //let currTime = 0;
    //let lastTime = 0;
    while (KeyBind.getPressedKeys().contains(event.key)) {
        let overlayMessageText = GlobalVars.getString("spellState");
        //let overlayMessageText = overlayMessageField.get(Client.getMinecraft().field_1705).getString();
        if(overlayMessageText.length == 5 && overlayMessageText[4] == '?'){ break; }
        //currTime = Time.time();
        //Chat.log(currTime - lastTime);
        //lastTime = currTime;
        melee();
        Time.sleep(delay);
    }
    GlobalVars.putBoolean("isMelee", false);
}