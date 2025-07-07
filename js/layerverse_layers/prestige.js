addLayer("P", {
    name: "Prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    layerShown(){
        let visible = false
        if (inChallenge("L",11)) visible = true
        return visible
     },
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Prestige points", // Name of prestige currency
    baseResource: "Points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('P', 11)) mult = mult.times(2)
        if (hasUpgrade('P', 12)) mult = mult.times(1.5)
        if (hasUpgrade('P', 13)) mult = mult.times(3)
        if (hasUpgrade('P', 14)) mult = mult.times(upgradeEffect('P', 14))
        if (hasUpgrade('P', 15)) mult = mult.times(upgradeEffect('P', 15))
        if (hasUpgrade('P', 16)) mult = mult.times(upgradeEffect('P', 16))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "t: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: { 
        11: {
            title: "The first upgrade?",
            description: "2x prestige points AND 10x points, you will see why later",
            cost: new Decimal(1),
        },
        12: {
            title: "The second upgrade?",
            description: "1.5x prestige points",
            cost: new Decimal(10),
            unlocked() {return hasUpgrade("P",11)}
        },
        13: {
            title: "Prestige upgrade 3",
            description: "3x prestige points",
            cost: new Decimal(20),
            unlocked() {return hasUpgrade("P",12)}
        },
        14: {
            title: "Self-synergy",
            description: "Boost prestige points based on prestige points",
            cost: new Decimal(60),
            effect() {
                return player[this.layer].points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked() {return hasUpgrade("P",13)}
        },
        15: {
            title: "Self-synergy 2",
            description: "Boost prestige points based on prestige points",
            cost: new Decimal(1000),
            effect() {
                return player[this.layer].points.add(1).pow(0.11)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked() {return hasUpgrade("P",14)}
        },
        16: {
            title: "Self-synergy 3",
            description: "Boost prestige points based on TOTAL prestige points",
            cost: new Decimal(1e6),
            effect() {
                return player[this.layer].total.add(1).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked() {return hasUpgrade("P",15)}
        },
        21: {
            title: "Do you see the pattern in this layer now?",
            description: "1.5x PP",
            cost: new Decimal(1e8),
            unlocked() {return hasUpgrade("P",16)}
        },
    },
})