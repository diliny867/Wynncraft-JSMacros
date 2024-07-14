//spell1:R-L-R spell2:R-R-R spell3:R-L-L spell4:R-R-L

//let num = (4 -1) >>> 0;
//Chat.log(num.toString(2));

const tickMS = 50; //1000/20
const spellDelay_1 = (tickMS*1.55)|0;
const spellDelay_2 = (tickMS*1.75)|0;
//const spellDelay_1 = 2;
//const spellDelay_2 = 3;

const holdSpellDelay = (tickMS*1.6)|0;
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

GlobalVars.putInt("spellDelay_1", spellDelay_1);
GlobalVars.putInt("spellDelay_2", spellDelay_2);

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

GlobalVars.putInt("holdSpellDelay", holdSpellDelay);

GlobalVars.putString("spellState", "-");

//GlobalVars.putBoolean("isArcher", false);

GlobalVars.putInt("debug", debug);


const overlayMessageField = Reflection.getClass("net.minecraft.class_329").getDeclaredField("field_2018");
overlayMessageField.setAccessible(true);
GlobalVars.putObject("overlayMessageField", overlayMessageField);


Chat.log("JS Macros Settings Set".concat(GlobalVars.getBoolean("isArcher") ? " (Archer)" : " (Not Archer)"));

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
  