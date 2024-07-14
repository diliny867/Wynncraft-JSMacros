// Code not mine. Source: ETKW Discord server, @_soumen

const maxstacklist = {
    "Persnickety": 1, 
    "Picky Looter": 15, 
    "Heavensent": 15, 
    "Slowrunner": 1,
    "Clockworker": 15,
    "Looter": 15, 
    "Serendipity": 15,
    "Bad Omen": 10, 
    "Midas Touch": 8,
    "Killstreak": 100, 
    "Persistent Champion": 15,
    "Patient Champion": 1, 
    "Parsimonious": 10, 
    "Madman": 8, 
    "Lightbringer": 5,  
    "Mob Slaughter": 12, 
    "Retrograde Champion": 10 
};

const descriptions = {
    "Persnickety": "Offered Blue/Purple Beacon >6",
    "Picky Looter": "Yellow Beacon offer.",
    "Heavensent": "Any Beacon offer.",
    "Slowrunner": "Timer <6m",
    "Clockworker": "Timer min left.",
    "Looter": "4 Chest items.",
    "Serendipity": "Open Chest.",
    "Bad Omen": "Get Curse.",
    "Midas Touch": "Get Boon.",
    "Killstreak": "Kill 3 Mobs, 60s.",
    "Persistent Champion": "Complete Challenge.",
    "Patient Champion": "5 Challenges.",
    "Parsimonious": "4 Chest items.",
    "Madman": "Current Curse.",
    "Lightbringer": "Current Boon.",
    "Mob Slaughter": "5 Mobs kill.",
    "Retrograde Champion": "Challenge complete."
};




function getEffect(nbt) {
    const lore = nbt.resolve("display.Lore");
    let effect = null;

    for (let line of lore) {
        if (line.isList()) {
            const lineList = line.asListHelper();
            const length = lineList.length();

            for (let i = 0; i < length; i++) {
                const textJson = line.resolve(`[${i}]`)[0].asString();
                const text = Chat.createTextHelperFromJSON(textJson);
                text.visit(JavaWrapper.methodToJava((style, string, _) => {
                    if (string.includes("+")) {
                        effect = string;
                    } else if (string == "Health") {
                        effect += string
                    }
                }));
            }
        }
    }
    return effect;  // 明示的に effect を返す
}

function addBoonDisplay(event, i, name, color, description, effect, maxStackEffect) {
    const screenWidth = event.screen.getWidth();
    const screenHeight = event.screen.getHeight();
    const xBase = Math.floor(screenWidth / 2 - 160 + 40 * (i - 9));
    let yBase = Math.floor(screenHeight / 2 - 120);
    const itemX = Math.floor(screenWidth / 2 - 72 + 18 * (i - 9));
    const itemY = Math.floor(screenHeight / 2 - 50);

    // Helper function to add text and center it
    function addCenteredText(textString, x, y, color, shadow, scale, zIndex) {
        let text = event.screen.addText(textString, x, y, color, shadow, scale, zIndex);
        text.setX(Math.floor(text.getX() - text.getScaledWidth() / 2));

        rect.setX1(Math.min(rect.getX1(),text.getX()-4))
        rect.setX2(Math.max(rect.getX2(),text.getX()+text.getScaledWidth()+4))

        rect2.setX1(Math.min(rect2.getX1(),text.getX()-2))
        rect2.setX2(Math.max(rect2.getX2(),text.getX()+text.getScaledWidth()+2))
        return text.getScaledHeight();
    }
    // Draw rect
    rect = event.screen.addRect(xBase, yBase-4, 0, 0, color)
    rect2 = event.screen.addRect(xBase, yBase-2, 0, 0, 0x000000, 128)

    // Add and center each text element
    yBase += addCenteredText(name, xBase, yBase, 0xFFFFFF, true, 0.7, 0);
    yBase += addCenteredText(maxStackEffect, xBase, yBase, 0xFFFFFF, true, 0.7, 0);
    yBase += addCenteredText(effect, xBase, yBase, 0xFFFFFF, true, 0.7, 0);
    yBase += addCenteredText(description, xBase, yBase, 0xFFFFFF, true, 0.5, 0);
    rect.setY2(yBase+4)
    rect2.setY2(yBase+2)

    // Draw the lore
    const lineEndY = yBase + 15;
    event.screen.addLine(xBase, lineEndY, xBase, yBase, 0x000000, 100, 4);
    event.screen.addLine(itemX, itemY, xBase, lineEndY, 0x000000, 100, 4);
    event.screen.addLine(xBase, lineEndY, xBase, yBase, color, 101, 2);
    event.screen.addLine(itemX, itemY, xBase, lineEndY, color, 101, 2);
}

function addMissionDisplay(event, i, name, color, lore) {
    const index = lore.findIndex(line => line.getStringStripFormatting() === "Complete the objective");
    lore.splice(index);
    const screenWidth = event.screen.getWidth();
    const screenHeight = event.screen.getHeight();
    const xBase = Math.floor(screenWidth / 2 - 240 + 60 * (i - 9));
    let yBase = Math.floor(screenHeight / 2 - 85);
    const itemX = Math.floor(screenWidth / 2 - 72 + 18 * (i - 9));
    const itemY = Math.floor(screenHeight / 2 - 50);

    // Helper function to add text and center it
    function addCenteredText(textString, x, y, color, shadow, scale, zIndex) {
        let text = event.screen.addText(textString, x, 0, color, shadow, scale, zIndex);
        text.setX(Math.floor(text.getX() - text.getScaledWidth() / 2));
        text.setY(y-text.getScaledHeight());
        rect.setX1(Math.min(rect.getX1(),text.getX()-4))
        rect.setX2(Math.max(rect.getX2(),text.getX()+text.getScaledWidth()+4))
        rect2.setX1(Math.min(rect2.getX1(),text.getX()-2))
        rect2.setX2(Math.max(rect2.getX2(),text.getX()+text.getScaledWidth()+2))
        return text.getScaledHeight();
    }
    // Draw rect
    rect = event.screen.addRect(xBase, 0, 0, yBase+4, color)
    rect2 = event.screen.addRect(xBase, 0, 0, yBase+2, 0x000000, 128)

    // Draw the line
    const lineEndY = yBase + 15;
    event.screen.addLine(xBase, lineEndY, xBase, yBase, 0x000000, 100, 4);
    event.screen.addLine(itemX, itemY, xBase, lineEndY, 0x000000, 100, 4);
    event.screen.addLine(xBase, lineEndY, xBase, yBase, color, 101, 2);
    event.screen.addLine(itemX, itemY, xBase, lineEndY, color, 101, 2);

    // Add and center each text element
    for (line of lore.reverse()) {
        if (line.getStringStripFormatting().length > 0) {
            yBase -= addCenteredText(line, xBase, yBase, 0xFFFFFF, true, 0.7, 0) + 1; 
        }
    }
    yBase -= addCenteredText(name, xBase, yBase, 0xFFFFFF, true, 1, 0);
    rect.setY1(yBase-4)
    rect2.setY1(yBase-2)
}

const effectpattern = /\+(\d+).*/;
const list_colorcode = {"0":0x000000,"1":0x0000AA,"2":0x00AA00,"3":0x00AAAA,"4":0xAA0000,"5":0xAA00AA,"6":0xFFAA00,"7":0xAAAAAA,"8":0x555555,"9":0x5555FF,"a":0x55FF55,"b":0x55FFFF,"c":0xFF5555,"d":0xFF55FF,"e":0xFFFF55,"f":0xFEFEFE,"k":0xFEFEFE
,"l":0xFEFEFE,"m":0xFEFEFE,"n":0xFEFEFE,"o":0xFEFEFE,"r":0xFEFEFE};
Time.sleep(100)
if (event.inventory.getContainerTitle() === "\u00A7\u0066\uE000\uE073") {
    for (let i = 9; i < 18; i++) {
        let slot = event.inventory.getSlot(i);

        if (slot.getItemId() !== "minecraft:air") {
            let item = slot;
            let name = item.getName();
            let unformattedName = name.getStringStripFormatting();
            let nbt = item.getNBT();
            let description = descriptions[unformattedName];
            let maxStack = maxstacklist[unformattedName];
            let effect = getEffect(nbt);

            // Extract effect value and name
            let effectMatch = effect.match(effectpattern);
            let effectValue = 0;
            let effectName = "???";

            if (effectMatch) {
                effectValue = parseInt(effectMatch[1]);
                effectName = effect.substring(effectMatch[1].length + 1);
            }

            let maxStackEffect = `${effectValue * maxStack} ${effectName}`;
            let displayEffect = `(${effectValue}x${maxStack})`;

            // Determine color from name if it starts with a color code
            let color = 0xFEFEFE;
            if (name.getString()[0] === "\u00A7") {
                color = list_colorcode[name.getString()[1]];
            }

            addBoonDisplay(event, i, name, color, description, displayEffect, maxStackEffect);
        }
    }
} else if (event.inventory.getContainerTitle() === "\u00A7\u0066\uE000\uE082") {
    for (let i = 9; i < 18; i++) {
        let slot = event.inventory.getSlot(i);

        if (slot.getItemId() !== "minecraft:air") {
            let item = slot;
            let name = item.getName();
            let lore = item.getLore()
            let unformattedName = name.getStringStripFormatting();
            let nbt = item.getNBT();
            let color = 0xFEFEFE;
            if (name.getString()[0] === "\u00A7") {
                color = list_colorcode[name.getString()[1]];
            }
            addMissionDisplay(event, i, name, color, lore)
        }
    }
}