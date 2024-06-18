//Chat.log("a");
//Chat.log("E: ");
//Chat.log(event.entity.getName());
//Chat.log("P: ");
//Chat.log(Player.getPlayer().getName());

//Chat.log(event.entity.getName() == "diliny867");

//if (event.entity.getType() == "minecraft:player"){
//    Chat.log(event.entity.getName());
//}

//if(event.entity.getName() == Player.getPlayer().getName()){


function isArcher() {
    let slot = Player.openInventory().getSelectedHotbarSlotIndex();
    let loreList = Player.openInventory().getSlot(36 + slot).getLore();
    let isArcher = false;
    for (let i = 0; i < loreList.length; i++) {
        let loreLine = loreList[i];
        let text = loreLine.getStringStripFormatting();
        isArcher = text.includes("Archer/Hunter");
        if (isArcher) {
            //Chat.log("A");
            break;
        }
    }
    return isArcher;
}

// https://wagyourtail.xyz/Projects/MinecraftMappingViewer/App?version=1.20.2&mapping=INTERMEDIARY%2CYARN&search=net%2Fminecraft%2Fclient%2Fnetwork%2FClientPlayerEntity
if(Player.openInventory().getTotalSlots() == 46 && //if player inventory
        Player.getPlayer().getRaw().method_45773() != ""){ //like the only way i found to check if player is riding a horse
    GlobalVars.putBoolean("isArcher", isArcher());
}

//Chat.log("a")
//Chat.log(event.entity.getName());
//Chat.log(Player.getPlayer().getName());


//}