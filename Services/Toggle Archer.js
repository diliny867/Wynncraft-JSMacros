var wasArcher = GlobalVars.getBoolean("isArcher");
GlobalVars.putBoolean("isArcher", !wasArcher);

Chat.log(GlobalVars.getBoolean("isArcher") ? "Set to Archer" : "Set to not Archer")
