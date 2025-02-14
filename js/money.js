addLayer("M", {
    name: "Money", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
                points: new Decimal(0),
                moneygain: new Decimal(0)
    }},
    layerShown(){
        let visible = false
        if (hasChallenge('D', 11) || player.H.unlocked) visible = true
       return visible
     },
    passiveGeneration() {
        if (hasUpgrade('M', 11)) return new Decimal(moneygain)
        return 0
    },
    color: "#048c1b",
    branches: ["M", "Ma"], 
    resource: "Money", // Name of prestige currency
    baseResource: "Hyper", // Name of resource prestige is based on
    baseAmount() {return player.H.points}, // Get the current amount of baseResourc
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0000000000000000000001,
    requires: new Decimal(150),
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "t: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ], clickables:
    {
        11: {
            title: "fix money earn",
            canClick() {return true},
            onClick() {return },
        },
    },
    upgrades: { 
        11: {
            title: "Lemonade stand",
            description: "Generate 1 money per second",
            cost: new Decimal(0),
            onPurchase() {
                moneygain = 1
            },
        },
        12: {
            title: "Marketing stratergy",
            description: "Generate 2 money per second",
            cost: new Decimal(15),
            onPurchase() {
                moneygain = 2
            },
        },
        13: {
            title: "Marketing team",
            description: "Generate 5 money per second",
            cost: new Decimal(45),
            onPurchase() {
                moneygain = 5
            },
        },
        14: {
            title: "More drinks",
            description: "Just go to the store to get more drinks anyways generate 10 money per second",
            cost: new Decimal(120),
            onPurchase() {
                moneygain = 10
            },
        },
        15: {
            title: "Expand stand",
            description: "Generate 25 money per second",
            cost: new Decimal(400),
            onPurchase() {
                moneygain = 25
            },
        },
        16: {
            title: "Building permit",
            description: "Generate 35 money because you made a store",
            cost: new Decimal(750),
            onPurchase() {
                moneygain = 35
            },
        },
        21: {
            title: "No more lemonade",
            description: "You now sell other things and generate 50 money.",
            cost: new Decimal(1250),
            onPurchase() {
                moneygain = 50
            },
        },
        22: {
            title: "Hire mathematicians",
            description: "Hire some mathematicians",
            cost: new Decimal(1250),
        },

    }
})