let actionBar = event.message.getStringStripFormatting();

var debug = GlobalVars.getBoolean("debug");
var gameVersion = GlobalVars.getDouble("gameVersion");

// THIS CHARACTER IN QUOTES IS RIGHT SPELL OCCURENCE: ""
// THIS CHARACTER IN QUOTES IS LEFT SPELL OCCURENCE: ""

if(gameVersion >= 2.1){
    let actionBarSpells = "?-?-?";
    let spellClickCount = 0;
    for(let i=120;i<actionBar.length && spellClickCount < 3;i++){ // as I seen these characters alvays appear past 120th index
        if(actionBar[i] == ""){ // R
            actionBarSpells = actionBarSpells.substring(0,spellClickCount*2) + 'R' + actionBarSpells.substring(spellClickCount*2 + 1);
            spellClickCount++;
            //Chat.log("R" + i);
        }
        if(actionBar[i] == ""){ // L
            actionBarSpells = actionBarSpells.substring(0,spellClickCount*2) + 'L' + actionBarSpells.substring(spellClickCount*2 + 1);
            spellClickCount++;
            //Chat.log("L" + i);
        }
    }
    //Chat.log(actionBarSpells);
    //Chat.log("\n");

    if(spellClickCount > 0 && spellClickCount < 3){ //if action bar is empty or full, cast full spell (pass empty spellState)
        GlobalVars.putString("spellState", actionBarSpells);
    }else{
        GlobalVars.putString("spellState", "-");
    }
}else{
    if(actionBar.length == 5 && actionBar[4] == '?'){
        GlobalVars.putString("spellState", actionBar);
    }else{
        GlobalVars.putString("spellState", "-");
    }
}


/* states for spells:
0: Not spell ([Sprint] or other)
1: R-L-R or L-R-L
2: R-R-R or L-L-L
3: R-L-L or L-R-R
4: R-R-L or L-L-R
5: R-L-? or L-R-?
6: R-R-? or L-L-?
7: R-?-? or L-?-?
*/