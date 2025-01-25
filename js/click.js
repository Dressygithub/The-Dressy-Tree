addLayer("C", {
    name: "Clicker", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
                points: new Decimal(0),
    }},
    color: "#4BDC13",
    canBuyMax() {return false},
    prestigeButtonText() {return ""},
    requires: new Decimal(0), // Can be a function that takes requirement increases into account
    resource: "Click points", // Name of prestige currency
    baseResource: "Click", // Name of resource prestige is based on
    baseAmount() {return player.C.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row),
    infoboxes: {
        main: {
            title: "Minigame",
            body() { return "This is a minigame, it will not contribute to any of the main game but will only be here as an extra part of the game" },
        },
    }
})