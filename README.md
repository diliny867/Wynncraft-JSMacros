# Wynncraft-JSMacros
My JSMacros scripts used on Wynncraft server

## Keys
|File|Effect|
|----|------|
|`Kill.js`|Just /kill
|`Melee Loop.js`|Loops jour melee
|`New Party.js`|Leaves current party, then /pfinder
|`R-L-L.js`|Casts rll spell
|`R-L-R.js`|Casts rlr spell
|`R-R-L-js`|Casts rrl spell
|`R-R-R.js`|Casts rrr spell

## Events
|Status|Event|File|Effect|
|------|-----|----|------|
|Currently unused|OpenContainer|`Archer Detect.js`|Detects archer|
|Enabled|OpenContainer|`Boon View.js`|Shows lootrun boons|
|Enabled|ProfileLoad|`Init.js`|Some internal initialization|
|Enabled|HeldItemChange|`Is Archer.js`|Also detects archer|
|Enabled|InteractEntity|`Raid Keeper No Multiple Clicks.js`|Prevents multiple raid keeper clicks|
|Enabled|JoinServer|`Set Settings.js`|See **Services**|
|Currently disabled|JoinServer|`Spell Loop.js`|See **Services**|
|Enabled|Title|`TitleObserver.js`|Checks current spell progress|

## Services
|Status|Activation|File|Effect|
|------|-------|----|------|
|Enabled|Click *Stopped* to run once|`Set Settings.js`|Sets all settings (mostly global variables)|
|Disabled|Click *Stopped* to run, click again to stop|`Spell Loop.js`|Currently broken loop for casting buffered spells (i believe this is banned on Wynncraft, so use on your own risk)|
|Disabled|Click *Stopped* to run once|`Toggle Archer.js`|Toggles spells to be cast for archer or for not archer|

## Taken code
### From ETKW Discord (`code` chat category):
- Melee loop
- Spell cast base
- Raid keeper no multiple clicks
- Is archer
- Boon view
