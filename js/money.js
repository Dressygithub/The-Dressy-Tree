addLayer("M", {
    name: "Money", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
                points: new Decimal(0),
    }},
    layerShown(){
        let visible = false
        if (hasChallenge('D', 11) || player.H.unlocked) visible = true
       return visible
     },
    passiveGeneration() {
        if (hasUpgrade('M', 11)) return 1
        return 0
    },
    color: "#048c1b",
    requires: new Decimal(150), // Can be a function that takes requirement increases into account
    resource: "Money", // Name of prestige currency
    baseResource: "Hyper", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResourc
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "t: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: { 
        11: {
            title: "Lemonade stand",
            description: "Generate +1 money per second.",
            cost: new Decimal(0),
        },
    }
})