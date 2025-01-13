addLayer("S", {
    name: "Super Layer", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
                points: new Decimal(0),
    }},
    color: "#00fff0",
    requires: new Decimal(1e3), // Can be a function that takes requirement increases into account
    resource: "Super", // Name of prestige currency
    baseResource: "Dressy points", // Name of resource prestige is based on
    baseAmount() {return player.D.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(2)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],  milestones: {
        1: {
            requirementDescription: "1 Super point",
            effectDescription: "2x point gain",
            done() { return player.S.points.gte(1) }
        },
        2: {
            requirementDescription: "1 Super point",
            effectDescription: "2x point gain",
            done() { return player.S.points.gte(25) }
        }
    }
})