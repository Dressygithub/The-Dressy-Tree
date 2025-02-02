addLayer("D", {
    name: "Dressy Layer", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
                points: new Decimal(0),
    }},
    passiveGeneration() {
        if (inChallenge('D', 11)) return -0.5
        if (hasUpgrade('D',31)) return 0.3
        if (hasMilestone('H', 1)) return 0.15
        if (hasMilestone('S', 2)) return 0.1
        if (inChallenge('H', 11)) return 0
        return 0
    },
    autoUpgrade() {
        if (hasMilestone('H', 1)) return true
        return false
    },
    autoPrestige() {
        if (inChallenge('H',11)) return true
        return false
    },
    color: "#0055ff",
    branches: ["D", "S"], 
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Dressy points", // Name of prestige currency
    baseResource: "Points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('D', 32)) mult = mult.times(300)
        if (layers.H.effect().gte(1)) mult = mult.times(layers.H.effect())
        if (hasMilestone('H', 1)) mult = mult.times(getBuyableAmount('D', '11')).add(1)
        if (hasUpgrade('S', 31)) mult = mult.times(1.6)
        if (inChallenge('S', 11)) mult = mult.times(0.5)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    buyables: {
        11: {
            title: "<br>Point booster<br>",
            cost(x) { return new Decimal(1).mul(x) },
            display() { return "Boosts dressy point gain" +  format(tmp[this.layer].buyables[this.id].cost) },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
    },
    upgrades: { 
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

        }, 
        14: {
            title: "Double again yay",
            description: "You might as well call it the double tree at this point",
            cost: new Decimal(10),
            unlocked() {return hasUpgrade("D",13)},

        }, 
        15: {
            title: "No more doubling",
            description: "1.01x",
            cost: new Decimal(1),
            unlocked() {return hasUpgrade("D",14)},

        },
        16: {
            title: "Hey, ever heard of exponents?",
            description: "^1.01 point gain",
            cost: new Decimal(10),
            unlocked() {return hasUpgrade("D",15)},

        },
        21: {
            title: "Personally i think its a bit too early for that",
            description: "1.01x point gain",
            cost: new Decimal(3),
            unlocked() {return hasUpgrade("D",16)},

        },
        22: {
            title: "Shift",
            description: "1.23x point gain",
            cost: new Decimal(5),
            unlocked() {return hasUpgrade("D",21)},

        },
        23: {
            title: "The",
            description: "2.31x point gain",
            cost: new Decimal(12),
            unlocked() {return hasUpgrade("D",22)},

        },
        24: {
            title: "Number",
            description: "3.21x point gain",
            cost: new Decimal(22),
            unlocked() {return hasUpgrade("D",23)},

        },
        25: {
            title: "Five",
            description: "5x point gain",
            cost: new Decimal(50),
            unlocked() {return hasUpgrade("D",24)},

        },
        26: {
            title: "Finale of row 2",
            description: "22x point gain and unlock a new layer",
            cost: new Decimal(222),
            unlocked() {return hasUpgrade("D",25)},
        },
        31: {
            title: "We are so back",
            description: "Gain 30% of dressy point reset",
            cost: new Decimal(1e9),
            unlocked() {return hasMilestone("H",5)},
        },
        32: {
            title: "Dresstastic",
            description: "x300 dressy point gain",
            cost: new Decimal(1e11),
            unlocked() {return hasUpgrade("D",31)},
        },
        33: {
            title: "One for each layer",
            description: "Unlock a challenge",
            cost: new Decimal(1e14),
            unlocked() {return hasUpgrade("D",32)},
        },
    }, 
    challenges: {
        11: {
            name: "Negative",
            challengeDescription: "You gain -50% dressy point reset",
            rewardDescription: "--2x point gain (haha see what i did there) also new layer",
            canComplete: function() {return player.S.points.gte(1000)},
            unlocked() {return hasUpgrade("D",33)},
        }
        },
})