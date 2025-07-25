addLayer("M", {
    name: "Money", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        moneygain: new Decimal(0),
        moneymult: new Decimal(1),

    }},
    layerShown(){
        let visible = false
        if (hasUpgrade('D', 33) || hasUpgrade('M',11)) visible = true
        if (player.L.inChallenge) visible = false
        return visible
    },
    passiveGeneration() {
        if (hasUpgrade('M', 56)) return 1e14
        if (hasUpgrade('M', 55)) return 1e11
        if (hasUpgrade('M', 54)) return 1e10
        if (hasUpgrade('M', 53)) return 1e9
        if (hasUpgrade('M', 52)) return 1e8
        if (hasUpgrade('M', 51)) return 1e7
        if (hasUpgrade('M', 46)) return 1e6
        if (hasUpgrade('M', 45)) return 100000
        if (hasUpgrade('M', 44)) return 50000
        if (hasUpgrade('M', 43)) return 25000
        if (hasUpgrade('M', 42)) return 15000
        if (hasUpgrade('M', 41)) return 10000
        if (hasUpgrade('M', 36)) return 5000
        if (hasUpgrade('M', 35)) return 3000
        if (hasUpgrade('M', 34)) return 2000
        if (hasUpgrade('M', 33)) return 1500
        if (hasUpgrade('M', 32)) return 1000
        if (hasUpgrade('M', 31)) return 500
        if (hasUpgrade('M', 26)) return 300
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
    branches: ["M", "L"], 
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
    directMult() {
        mult = new Decimal(1)
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
            display() { return "Boosts points<br>" + "Costs: " + format(tmp[this.layer].buyables[this.id].cost) + " money <br>Currently: " + format(buyableEffect("M",11))+"x" },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect() {return new Decimal(2).pow(getBuyableAmount(this.layer, this.id).div(1))},
        },
        12: {
            title: "<br>Dressy point thing<br>",
            cost(x) { return new Decimal(30).pow(getBuyableAmount(this.layer, this.id)) },
            display() { return "Boosts Dressy points<br>" + "Costs: " + format(tmp[this.layer].buyables[this.id].cost) + " money <br>Currently: " + format(buyableEffect(this.layer,this.id))+"x" },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect() {return new Decimal(1.75).pow(getBuyableAmount(this.layer, this.id).div(new Decimal(Number(inChallenge("L",11))).times(5).add(1)))},
        },
        13: {
            title: "<br>Super thing<br>",
            cost(x) { return new Decimal(50).pow(getBuyableAmount(this.layer, this.id)) },
            display() { return "Boosts Super<br>" + "Costs: " + format(tmp[this.layer].buyables[this.id].cost) + " money <br>Currently: " + format(buyableEffect(this.layer,this.id))+"x" },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect() {return new Decimal(1.5).pow(getBuyableAmount(this.layer, this.id).div(new Decimal(Number(inChallenge("L",11))).times(5).add(1)))},
        },
        14: {
            title: "<br>Hyper thing<br>",
            cost(x) { return new Decimal(150).pow(getBuyableAmount(this.layer, this.id)) },
            display() { return "Boosts Hyper<br>" + "Costs: " + format(tmp[this.layer].buyables[this.id].cost) + " money <br>Currently: " + format(buyableEffect(this.layer,this.id))+"x" },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect() {return new Decimal(1.1).pow(getBuyableAmount(this.layer, this.id).div(new Decimal(Number(inChallenge("L",11))).times(5).add(1)))},
        },
        15: {
            title: "<br>Upgrades<br>",
            purchaseLimit: new Decimal(5),
            cost(x) { return new Decimal(10000).pow(getBuyableAmount(this.layer, this.id)) },
            display() { return "Its literally upgrades, go find them<br>" + "Costs: " + format(tmp[this.layer].buyables[this.id].cost) + " money<br>" + getBuyableAmount("M",15) +"/"+this.purchaseLimit},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1).div(new Decimal(Number(inChallenge("L",11))).times(5).add(1)))
            },
            effect() {return "no"},
        },

        999991: {
            title: "<br>Epic<br>",
            cost(x) { return new Decimal(1.444490).pow(getBuyableAmount(this.layer, this.id).pow(0.1).add(1)) },
            display() { return "Does nothing<br>" + "Costs: " + format(tmp[this.layer].buyables[this.id].cost) + " money <br>You have " + format(getBuyableAmount("M",999991))+"" },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect() {new Decimal(0)},
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
                    ["buyables",[1,99999]],
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
            cost: new Decimal(1),
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
        26: {
            title: "Online marketing",
            description: "You advertise your stuff online and you are generating 300",
            cost: new Decimal(20000)
        },
        31: {
            title: "Epic money",
            description: "Generate 500 money",
            cost: new Decimal(25000)
        },
        32: {
            title: "Epic money 2",
            description: "Generate 1000 money",
            cost: new Decimal(27500)
        },
        33: {
            title: "Epic money 3",
            description: "Generate 1500 money",
            cost: new Decimal(30000)
        },
        34: {
            title: "Epic money 4",
            description: "Generate 2000 money",
            cost: new Decimal(35000)
        },
        35: {
            title: "Epic money 6",
            description: "Generate 3000 money",
            cost: new Decimal(40000)
        },
        36: {
            title: "Epic money 6",
            description: "Generate 5000 money",
            cost: new Decimal(50000)
        },
        41: {
            title: "Global",
            description: "You are known everywhere now and are generating 10000 money",
            cost: new Decimal(75000)
        },
        42: {
            title: "Super Millionare",
            description: "Generate 15000 money",
            cost: new Decimal(250000),
        },
        43: {
            title: "Super duper Millionare",
            description: "Generate 25000 money",
            cost: new Decimal(750000),
        },
        44: {
            title: "Super duper idk what comes after Millionare",
            description: "Generate 50000 money",
            cost: new Decimal(1e6),
        },
        45: {
            title: "Coolionare",
            description: "Generate 100000 money",
            cost: new Decimal(1.5e6),
        },
        46: {
            title: "Billionare",
            description: "Generate 1e6 money",
            cost: new Decimal(1e7),
        },
        51: {
            title: "Extremely lazy development",
            description: "Generate 1e7",
            cost: new Decimal(1e8)
        },
        52: {
            title: "Extremely lazy development",
            description: "Generate 1e8",
            cost: new Decimal(1e9)
        },
        53: {
            title: "Extremely lazy development",
            description: "Generate 1e9",
            cost: new Decimal(5e9)
        },
        54: {
            title: "Extremely lazy development",
            description: "Generate 1e10",
            cost: new Decimal(1e10)
        },
        55: {
            title: "Extremely lazy development",
            description: "Generate 1e11",
            cost: new Decimal(5e11)
        },
        56: {
            title: "Money",
            description: "Generate 1e14",
            cost: new Decimal(1e13)
        },
        61: {
            title: "The next layer",
            description: "Unlock the next layer",
            cost: new Decimal(1e15),
            unlocked() {return getBuyableAmount("M",15).gte(5)},
        },
        
        
    }
})