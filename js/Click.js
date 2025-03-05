addLayer("Mi", {
    position: 4, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 4,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        clicky: new Decimal(1),
        clickypow: new Decimal(1),
        clickymult: new Decimal(1),
        clickyeff1: new Decimal(1),

    }},
    layerShown(){
        let visible = true
       return visible
     },
    name: "Minigame", // This is optional, only used in a few places, If absent it just uses the layer id.
    resource: "Minigame points", // Name of prestige currency
    //requires: new Decimal(1), // Can be a function that takes requirement increases into account
    //baseResource: "", // Name of resource prestige is based on
    //baseAmount() {return player.points}, // Get the current amount of baseResource
    //type: "normal", // normal: cost to gain currency depends on amount ganed. static: cost depends on how much you already have
    //exponent: 1.72, // Prestige currency exponent
    //passiveGeneration() {
        //return 1
    //},
    row: "side", // Row the layer is in on the tree (0 is the first row)
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    clickables: {
        11: {
            title: "Click",
            canClick() {return true},
            onClick() { return addPoints('Mi',new Decimal(player.Mi.clicky)) },
        },
    },
    upgrades: { 
        11: {
            title: "Clicky upgrade",
            description: "2x click",
            cost: new Decimal(10),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(2)
            },
        },
        12: {
            title: "Clicker upgrade",
            description: "3x click",
            cost: new Decimal(40),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(3)
            },
            unlocked() { return hasUpgrade('Mi', 11) }
        },
        13: {
            title: "Clicketh upgradeth",
            description: "2x click",
            cost: new Decimal(30),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(2)
            },
            unlocked() { return hasUpgrade('Mi', 12) }
        },
        13: {
            title: "Clicketh upgradeth",
            description: "2x click",
            cost: new Decimal(30),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(2)
            },
            unlocked() { return hasUpgrade('Mi', 12) }
        },
        14: {
            title: "Click boost",
            description: "click boost click",
            cost: new Decimal(30),
            effect() {
                let clickyeff1 = player.Mi.clicky.times(0.5)
                player.Mi.clicky = player.Mi.clicky.times(clickyeff1)
                return clickyeff1
            },
            effectDisplay() { return format(clickyeff1)+"x" },
            unlocked() { return hasUpgrade('Mi', 13) }
        },
    },
})