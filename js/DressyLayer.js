addLayer("D", {
    name: "Dressy points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
                points: new Decimal(0),
    }},
    color: "#0055ff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Dressy points", // Name of prestige currency
    baseResource: "Points", // Name of resource prestige is based on
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
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],     upgrades: { 
        11: {
            title: "The first upgrade!",
            description: "2x points.",
            cost: new Decimal(1),

        },
        12: {
            title: "The second upgrade!",
            description: "2x points again.",
            cost: new Decimal(3),
            unlocked() {return hasUpgrade("D",11)}

        },
        13: {
            title: "The third upgrade!",
            description: "2x points for the third time",
            cost: new Decimal(6),
            unlocked() {return hasUpgrade("D",12)},

        }, 14: {
            title: "Double again yay",
            description: "You might as well call it the double tree at this point",
            cost: new Decimal(10),
            unlocked() {return hasUpgrade("D",13)},

        }, 15: {
            title: "Ok i'll stop",
            cost: new Decimal(0),
            unlocked() {return hasUpgrade("D",14)},

        },
        16: {
            title: "Hey, ever heard of exponents?",
            description: "^1.01 point gain",
            cost: new Decimal(10),
            unlocked() {return hasUpgrade("D",15)},

        },
        

    }, 
})