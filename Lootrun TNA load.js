if(GlobalVars.getBoolean("Lootrun TNA loaded")){
    Chat.say("/lootrun clear");
    Chat.log("Lootrun cleared");
    GlobalVars.putBoolean("Lootrun TNA loaded", false);
}else{
    Chat.say("/lootrun load TNA");
    Chat.log("Lootrun TNA loaded");
    GlobalVars.putBoolean("Lootrun TNA loaded", true);
}

