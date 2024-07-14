//R-R-L

const {castRRL, worldCastSpell, pushBufferedSpell} = require('./Shared');

if (GlobalVars.getBoolean("doBufferedSpells")){
    const spellCode = 3;
    pushBufferedSpell(spellCode);
}else{
    worldCastSpell(castRRL);
}
