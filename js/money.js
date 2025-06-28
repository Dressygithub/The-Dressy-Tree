addLayer("M", {
    name: "Money", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(10),
        moneygain: new Decimal(0),

        FSPEcost: new Decimal(1e6), 
        FSPEtime: new Decimal(0), 
    }},
    layerShown(){
        let visible = false
        if (hasUpgrade('D', 33) || hasUpgrade('M',11)) visible = true
        return visible
    },
    passiveGeneration() {
        if (hasUpgrade('M', 25)) return 200
        if (hasUpgrade('M', 24)) return 150
        if (hasUpgrade('M', 23)) return 100
        if (hasUpgrade('M', 22)) return 75
        if (hasUpgrade('M', 21)) return 50
        if (hasUpgrade('M', 16)) return 35
        if (hasUpgrade('M', 15)) return 25
        if (hasUpgrade('M', 14)) return 10
        if (hasUpgrade('M', 13)) return 5
        if (hasUpgrade('M', 12)) return 2
        if (hasUpgrade('M', 11)) return 1
        return 0
    },
    color: "#048c1b",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Money", // Name of prestige currency
    baseResource: "Hyper", // Name of resource prestige is based on
    baseAmount() {return player.H.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(0.99)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "t: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ], 
    buyables: {
        11: {
            title: "<br>Point thing<br>",
            cost(x) { return new Decimal(15).times(new Decimal(2).pow(getBuyableAmount(this.layer, this.id))) },
            display() { return "Boosts points<br>" + "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + "<br>Currently: " + format(new Decimal(2).pow(getBuyableAmount(this.layer, this.id)))+"x" },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect() {new Decimal(2).pow(getBuyableAmount(this.layer, this.id))},
        },
    },
    tabFormat: {
            "Money": {
                content: [
                    "main-display",
                    "prestige-button",
                    "blank",
                    ["clickables", [1]],
                    "blank",
                    "blank",
                    "upgrades",
                ],
            },
            "SHOPPING": {
                content: [
                    "main-display",
                    "blank",
                    "blank",
                    "blank",
                    ["buyables", [1]],
                    "blank",
                    "blank",
                    ["main"],
                ],
            },
        },
    upgrades: { 
        11: {
            title: "Lemonade stand",
            description: "Generate 1 money per second",
            cost: new Decimal(0),
            onPurchase() {
                console.log("THE DUCK WALKED UP TO THE")
            }
        },
        12: {
            title: "Marketing stratergy",
            description: "Generate 2 money per second",
            cost: new Decimal(15),
        },
        13: {
            title: "Marketing team",
            description: "Generate 5 money per second",
            cost: new Decimal(45),
        },
        14: {
            title: "More drinks",
            description: "Just go to the store to get more drinks anyways generate 10 money per second",
            cost: new Decimal(120),
        },
        15: {
            title: "Expand stand",
            description: "Generate 25 money per second",
            cost: new Decimal(400),
        },
        16: {
            title: "Building permit",
            description: "Generate 35 money because you made a store",
            cost: new Decimal(750),
        },
        21: {
            title: "No more lemonade",
            description: "You now sell other things and generate 50 money.",
            cost: new Decimal(1250)
        },
        22: {
            title: "Branding",
            description: "You officially start a brand and are generating 75 money",
            cost: new Decimal(3500)
        },
        23: {
            title: "Expand stores",
            description: "Expand your stores to other suburbs and are generating 100 money",
            cost: new Decimal(5000)
        },
        24: {
            title: "State",
            description: "Your stores are now across the state and you are generating 150 money",
            cost: new Decimal(10000)
        },
        25: {
            title: "Country",
            description: "Your stores are now across the country and you are generating 200 money",
            cost: new Decimal(12500)
        },
        
    }
})