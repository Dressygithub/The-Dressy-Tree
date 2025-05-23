addLayer("P", {
    name: "Philosphy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    layerShown(){
        let visible = false
        if (hasUpgrade('Ma', 21) || player.P.unlocked) visible = true
       return visible
     },
        branches: [], 
    color: "#4BDC13",
    requires: new Decimal(1e30), // Can be a function that takes requirement increases into account
    resource: "Philosiphical points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.01, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "t: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: { 
        11: {
            title: "Ponder",
            description: "3x points",
            cost: new Decimal(1),
        },
        12: {
            title: "Think",
            description: "2x dressy point gain",
            cost: new Decimal(2),
        },
        13: {
            title: "Reflect",
            description: "1.5x super gain",
            cost: new Decimal(2),
        },
        14: {
            title: "Revolutionise",
            description: "1.3x hyper gain",
            cost: new Decimal(2),
        },
        15: {
            title: "Theory",
            description: "/1.1 money",
            cost: new Decimal(2),
        },
        16: {
            title: "Anti",
            description: "Now you really start to wonder, is there truly an opposite to everything?",
            cost: new Decimal(0),
        },
        21: {
            title: "Philosophy",
            description: "Unlock a challenge",
            cost: new Decimal(0),
        },
    }
})