
//LAYER
addLayer("T", {
    name: "Test", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    passiveGeneration() {
        return 0
    },
    autoUpgrade() {
        return false
    },
    layerShown(){
        let visible = true
        if (player.L.inchallenge) visible = false
        return visible
     },   
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "test points", // Name of prestige currency
    baseResource: "test points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "t: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
})

//UPGRADE
upgrades: {
    11: {
        title: "Upgrade",
        description: "nothing times nothing",
        cost: new Decimal(1),
        effect() {
            return player.points
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
    },
    if (hasUpgrade('T', 11)) gain = gain.times(upgradeEffect("T",11))

    12: {
        title: "Effect",
        description: "nothing times nothing",
        cost: new Decimal(1),
    },
    if (hasUpgrade('T', 12)) gain = gain.times(2)
},

upgrades: {
    
}

//MILESTONE
milestones: {
    1: {
        requirementDescription: "1 Super point",
        effectDescription: "1.5x points",
        done() { return player.S.points.gte(1) }
    },
},

//CLICKABLE
clickables: {
    11: {
        title: "Click",
        canClick() {return true},
        onClick() {return "something"}
    },
},


//