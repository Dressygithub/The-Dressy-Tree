addLayer("De", {
    name: "Dev panel", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Dev", // This appears on the layer's node. Default is the id with the first letter capitalized
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
    },
    achievements: {
    11: {
        name: "The beginning",
        tooltip: "",
        done() {return hasUpgrade("D",11)}
    },
    12: {
        name: "100",
        tooltip: "Get 100 dressy points",
        done() {return player.D.points.gte(100)}
    },
    13: {
        name: "Thats super!",
        tooltip: "Get your first super point",
        done() {return player.S.points.gte(1)}
    },
    14: {
        name: "I wasnt challenged at all",
        tooltip: "Complete the super challenge which is the first challenge",
        done() {return hasChallenge('S', 11)}
    },

    },
    tabFormat: {
        "Achievements": {
            content: [
                "main-display",
                "blank",
                "blank",
                "achievements",
                "blank",
                "clickables",
                "blank",
            ],
        },
    },
    clickables: {
        11: {
            title: "Import time",
            canClick() {return true},
            onClick() {return importSave(player.saves.time)}
        },
    }
})
