//R-R-R

const {castRRR, worldCastSpell, pushBufferedSpell} = require('./Shared');

if (GlobalVars.getBoolean("doBufferedSpells")){
    const spellCode = 1;
    pushBufferedSpell(spellCode);
}else{
    worldCastSpell(castRRR);
}
