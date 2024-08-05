
clickCooldown = 1000

function isRaidKeeper(target) {
    const filter = JavaWrapper.methodToJava(entity => {
        return (entity.getName().getStringStripFormatting() === "Raid Keeper" &&
            target.distanceTo(entity) < 3)
        })
    return (0 < World.getEntities(filter).length)
}

if (isRaidKeeper(event.entity)) {
    if (KeyBind.getKeyBindings()["key.use"] !== "key.keyboard.unknown") {
        const key = KeyBind.getKeyBindings()["key.use"];
        KeyBind.releaseKeyBind("key.use");
        KeyBind.setKeyBind("key.use","key.keyboard.unknown");
        Time.sleep(clickCooldown);
        KeyBind.setKeyBind("key.use",key);
    }
}