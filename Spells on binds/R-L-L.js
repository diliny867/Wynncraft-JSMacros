//R-L-L

const {castRLL, worldCastSpell, pushBufferedSpell} = require('../Shared');

if (GlobalVars.getBoolean("doBufferedSpells")){
    const spellCode = 2;
    pushBufferedSpell(spellCode);
}else{
    worldCastSpell(castRLL);
}
