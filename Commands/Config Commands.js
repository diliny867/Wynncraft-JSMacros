JsMacros.waitForEvent('ChunkLoad');

const CommandManager = Chat.getCommandManager();
var command = CommandManager.createCommandBuilder("spells");
//command.unregister();


let spellDelayHandle = JavaWrapper.methodToJavaAsync((c) => {
    let delay = c.getArg("delay");
    //let delaysFile = FS.open("../Config/Delays.json");
    //let delaysJSON = JSON.parse(delaysFile.read());
    //switch(c.getArg("type").toLowerCase()){
    //case "main":
    //    delaysJSON["spellDelay_Main"] = delay;
    //    break;
    //case "after":
    //    delaysJSON["spellDelay_After"] = delay;
    //    break;
    //case "hold":
    //    delaysJSON["spellDelay_Hold"] = delay;
    //    break;
    //}
    //delaysFile.write(JSON.stringify(delaysJSON));

    let delayName = "";
    switch(c.getArg("type").toLowerCase()){
    case "main":
        delayName = "spellDelay_Main";
        break;
    case "after":
        delayName = "spellDelay_After";
        break;
    case "hold":
        delayName = "spellDelay_Hold";
        break;
    default:
        return;
    }
    GlobalVars.putInt(delayName, delay);
    Chat.log(delayName + " set to " + delay);
});

let debugHandle = JavaWrapper.methodToJavaAsync((c) => {
    let value = c.getArg("value");
    GlobalVars.putInt("debug", value);
    Chat.log("Set debug to " + value);
});

let variableHandle = JavaWrapper.methodToJavaAsync((c) => {
    let type = c.getArg("type");
    let variable = c.getArg("var");
    let stringValue = c.getArg("value");
    let value;
    switch(type){
    case "int":
        value = parseInt(stringValue);
        GlobalVars.putInt(variable, value);
        break;
    case "double":
        value = parseFloat(stringValue);
        GlobalVars.putFloat(variable, value);
        break;
    case "bool":
        value = stringValue.toLowerCase() == "true";
        GlobalVars.putBoolean(variable, value);
        break;
    case "string":
        value = stringValue;
        GlobalVars.putString(variable, value);
        break;
    case "object":
        value = JSON.parse(stringValue);
        GlobalVars.putObject(variable, value);
        break;
    default:
        return;
    }
    Chat.log("Put " + value + " to " + type + " " + variable);
});


command.literalArg("spelldelay").wordArg("type").suggestMatching("main", "after", "hold").intArg("delay").executes(spellDelayHandle)
    .or(1).literalArg("sd").wordArg("type").suggestMatching("main", "after", "hold").intArg("delay").executes(spellDelayHandle) // how to do command aliases
    .or(1).literalArg("debug").intArg("value").executes(debugHandle)
    .or(1).literalArg("variable").wordArg("type").suggestMatching("int", "double", "bool", "string", "object").wordArg("var").wordArg("value").executes(variableHandle); 

command.register();


event.stopListener = JavaWrapper.methodToJava(() => {
    command.unregister();
})