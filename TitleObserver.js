let actionBar = event.message.getStringStripFormatting();
//Chat.log(actionBar);

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
//if(actionBar.length > 0){
//    var spellState = 0;
//    if(actionBar.length == 5){
//        let firstR = actionBar[0] == 'R';
//        switch(actionBar[4]){
//        case 'R':
//            if(actionBar[2] == 'R'){
//                spellState = firstR ? 2 : 3;
//            }else{
//                spellState = firstR ? 1 : 4;
//            }
//            break;
//        case 'L':
//            if(actionBar[2] == 'R'){
//                spellState = firstR ? 4 : 1;
//            }else{
//                spellState = firstR ? 3 : 2;
//            }
//            break;
//        case '?':
//            if(actionBar[2] == 'R'){
//                spellState = firstR ? 6 : 5;
//            }else{
//                if(actionBar[2] == 'L'){
//                    spellState = firstR ? 5 : 6;
//                }else{
//                    spellState = 7;
//                }
//            }
//            break;
//        }
//    }
//    GlobalVars.putInt("spellState", spellState);
//}

if(actionBar.length == 5 && actionBar[4] == '?'){
    GlobalVars.putString("spellState", actionBar);
    //Chat.log("TO: ".concat(GlobalVars.getString("spellState")));
}else{
    GlobalVars.putString("spellState", "-");
}
//Chat.log("TO: ".concat(GlobalVars.getString("spellState")).concat(" ").concat(actionBar.length));
//Chat.log("Global: " + GlobalVars.getString("spellState"));