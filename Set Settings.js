//spell1:R-L-R spell2:R-R-R spell3:R-L-L spell4:R-R-L

//let num = (4 -1) >>> 0;
//Chat.log(num.toString(2));

const tickMS = 50; //1000/20
//const spellDelay_1 = 60;
//const spellDelay_2 = 90;
const spellDelay_Main = (tickMS*1.55)|0;
const spellDelay_After = 1;
//const spellDelay_1 = 2;
//const spellDelay_2 = 3;

const spellDelay_Hold = (tickMS*1.6)|0;
//const holdSpellDelay = 2;

const spellDelayInTicks = false;

const timeThreshold = 275;
const timeDelay = 25;

const meleeDelay = 15;

// Enable smart spell cast
const checkSpellProcess = true;

// Enables timed buffer for spells  
const doBufferedSpells = false;
const maxBufferedSpells = 3;

const debug = 0;

GlobalVars.putInt("spellDelay_Main", spellDelay_Main);
GlobalVars.putInt("spellDelay_After", spellDelay_After);

GlobalVars.putBoolean("spellDelayInTicks", spellDelayInTicks);

GlobalVars.putInt("timeThreshold", timeThreshold);
GlobalVars.putInt("timeDelay", timeDelay);

GlobalVars.putBoolean("checkSpellProcess", checkSpellProcess);

GlobalVars.putBoolean("isChanneling", false); //if somehow it is still true after casting a spell

GlobalVars.putInt("meleeDelay", meleeDelay);

GlobalVars.putBoolean("doBufferedSpells", doBufferedSpells);
GlobalVars.putInt("maxBufferedSpells", maxBufferedSpells);
GlobalVars.putInt("channelingSpellCount", 0);
GlobalVars.putInt("spellBuffer", 0);

GlobalVars.putInt("spellDelay_Hold", spellDelay_Hold);

GlobalVars.putString("spellState", "-");

//GlobalVars.putBoolean("isArcher", false);

GlobalVars.putInt("debug", debug);

const models = Java.type("com.wynntils.core.components.Models");
const crowdSourceDataManager = Java.type("com.wynntils.core.crowdsource.CrowdSourcedDataManager");
const gameVersion = crowdSourceDataManager.CURRENT_GAME_VERSION.getReadableVersion();
let gameVersionDouble = 0;
let onBeta = models.WorldState.isOnBetaServer();
if(onBeta){
    gameVersionDouble = 2.1; // dont know any ways of getting beta version, so time to hardcode it 
}else{
    let divisor = 1; // get global version
    for(const n of gameVersion.split('.')){
        gameVersionDouble += Number(n.split(' ')[0]) / divisor;
        divisor *= 10;
    }
}
GlobalVars.putDouble("gameVersion", gameVersionDouble); // it is easier to work with double
//GlobalVars.putObject("wynntilsModels", models); // it is easier to work with double

const overlayMessageField = Reflection.getClass("net.minecraft.class_329").getDeclaredField("field_2018");
overlayMessageField.setAccessible(true);
GlobalVars.putObject("overlayMessageField", overlayMessageField);

let versionString = (onBeta ? "Beta " : "").concat(gameVersionDouble.toString());
Chat.log("JS Macros Settings Set - Wynncraft " + versionString); //.concat(GlobalVars.getBoolean("isArcher") ? " (Archer)" : " (Not Archer)")

//JsMacros.on('Title', JavaWrapper.methodToJava(event => {
//    let actionBar = event.message.getStringStripFormatting();
//    Chat.log(actionBar);
//}));

//const printMethods = (obj) => {
//    let properties = new Set()
//    let currentObj = obj
//    do {
//      Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
//    } while ((currentObj = Object.getPrototypeOf(currentObj)))
//    Chat.log([...properties.keys()]);
//}
  