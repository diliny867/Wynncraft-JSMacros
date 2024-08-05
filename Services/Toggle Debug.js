let debug = 0;
if(GlobalVars.getInt("debug") == 0){
    debug = 1;
}else{
    debug = 0;
}
GlobalVars.putInt("debug", debug);
Chat.log("Set debug to ".concat(debug))