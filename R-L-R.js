//R-L-R

const {castRLR, worldCastSpell, pushBufferedSpell} = require('./Shared');

if (GlobalVars.getBoolean("doBufferedSpells")){
    const spellCode = 0;
    pushBufferedSpell(spellCode);
}else{
    worldCastSpell(castRLR);
}
