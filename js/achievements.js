addLayer("A", {
    name: "Dev panel", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
                points: new Decimal(0),
    }},
    color: "#ffe000",
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: "side", // Row the layer is in on the tree (0 is the first row)
    requires: new Decimal("1F100"), // Can be a function that takes requirement increases into account
    resource: "Achievement points", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },clickables: {
        11: {
            title: "+1000 dressy points",
            canClick() {return true},
            onClick() {return addPoints('D',1e3)}
        },

    },
    achievements: {
        11: {
            name: "Reset",
            tooltip: "Do your first reset for a dressy point.",
            done() {player.D.points.gte(1)}
        },
    }
})
