var wasArcher = GlobalVars.getBoolean("isArcher");
var nowArcher = false;
//Chat.log(wasArcher);

if(Player.openInventory().getTotalSlots() == 46 && //if player inventory
        Player.getPlayer().getRaw().method_45773() != ""){ //like the only way i found to check if player is riding a horse (because things go wrong if player is riding a horse)
    isArcher();
    GlobalVars.putBoolean("isArcher", nowArcher);
}

if(wasArcher != nowArcher){
    Chat.log(nowArcher ? "JSM Set Archer" : "JSM Set Not Archer");
}


function isArcher() {
    let slot = Player.openInventory().getSelectedHotbarSlotIndex();
    let loreList = Player.openInventory().getSlot(36 + slot).getLore();
    //let isArcher = false;
    nowArcher = false;

    for (let i = 0; i < loreList.length; i++) {
        let loreLine = loreList[i];
        let text = loreLine.getStringStripFormatting();
        //Chat.log(text);
        //isArcher = text.includes("Archer/Hunter");
        nowArcher = text.includes("Archer/Hunter");
        //if (isArcher) {
        if (nowArcher) {
            break;
        }
    }
    //return isArcher;
}
