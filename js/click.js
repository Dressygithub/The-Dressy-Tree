addLayer("C", {
    name: "Clicker", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
                points: new Decimal(0),
    }},
    color: "#FF0000",
    canBuyMax() {return false},
    resetsNothing: true,
    requires: new Decimal(0), // Can be a function that takes requirement increases into account
    resource: "Click points", // Name of prestige currency
    baseAmount() {return player.C.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    directMult() {mult = new Decimal(1)
        if (hasUpgrade('S', 11)) mult = mult.times(2)
            if (hasUpgrade('S', 12)) mult = mult.times(3)
            if (hasUpgrade('S', 13)) mult = mult.times(4)
            if (hasUpgrade('S', 21)) mult = mult.times(4)
            if (hasUpgrade('S', 22)) mult = mult.times(9)
            if (hasUpgrade('S', 23)) mult = mult.times(16)
            if (hasUpgrade('S', 31)) mult = mult.times(16)
            if (hasUpgrade('S', 31)) mult = mult.times(81)
            if (hasUpgrade('S', 31)) mult = mult.times(256)
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
    }, upgrades: { 
        11: {
            title: "Clicker",
            description: "2x click.",
            cost: new Decimal(10),
        },
        12: {
            title: "Clicker 2",
            description: "3x click.",
            cost: new Decimal(40),
        },
        13: {
            title: "Clicker 3",
            description: "4x click.",
            cost: new Decimal(100),
        },
        14: {
            title: "Clicker exponent",
            description: "^1.1 click.",
            cost: new Decimal(100),
        },
        15: {
            title: "Clicker exponent 2",
            description: "^1.5 click",
            cost: new Decimal(300),
        },
        21: {
            title: "Clicker^2",
            description: "4x click",
            cost: new Decimal(300),
        },
        22: {
            title: "Clicker 2^2",
            description: "9x click",
            cost: new Decimal(300),
        },
        23: {
            title: "Clicker 3^2",
            description: "16x click",
            cost: new Decimal(300),
        },
        24: {
            title: "Clicker exponent^2",
            description: "^1.21 click",
            cost: new Decimal(300),
        },
        25: {
            title: "Clicker exponent 2^2",
            description: "^2.25 click",
            cost: new Decimal(300),
        },
        31: {
            title: "Clicker^2^2",
            description: "16x click",
            cost: new Decimal(300),
        },
        32: {
            title: "Clicker 2^2^2",
            description: "81x click",
            cost: new Decimal(300),
        },
        33: {
            title: "Clicker 3^2^2",
            description: "256x click",
            cost: new Decimal(300),
        },
        34: {
            title: "Clicker exponent^2^2",
            description: "^1.4641 click",
            cost: new Decimal(300),
        },
        35: {
            title: "Clicker exponent 2^2^2",
            description: "^5.0625 click",
            cost: new Decimal(300),
        },
        
        
    }
})