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
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
      milestones: {
        1: {
            requirementDescription: "1 Super point",
            effectDescription: "Unlock super upgrades",
            done() { return player.S.points.gte(1) }
        },
        2: {
            requirementDescription: "3 Super point",
            effectDescription: "2x point gain",
            done() { return player.S.points.gte(2) }
        },
    }, upgrades: {
        11: {
            title: "Cross-boosting",
            description: "Super boosts points (Finally I learnt how to do this).",
            cost: new Decimal(2),
            unlocked() {return hasMilestone("S",1)},
            effect() {
                return player[this.layer].points.add(1).pow(0.7)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
            title: "Cross-boosting again",
            description: "Super boosts points again.",
            cost: new Decimal(1),
            unlocked() {return hasUpgrade("S",11)},
            effect() {
                return player[this.layer].points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Are you ready?",
            description: "Unlocks some upgrades",
            cost: new Decimal(0),
            unlocked() {return hasUpgrade("S",12)} 
        },
        21: {
            title: "1",
            description: "111x point gain",
            cost: new Decimal(11),
            unlocked() {return hasUpgrade("S",13)} 
        },
        22: {
            title: "2",
            description: "2x point gain",
            cost: new Decimal(2),
            unlocked() {return hasUpgrade("S",13)} 
        },
        23: {
            title: "3",
            description: "3.33x point gain",
            cost: new Decimal(3),
            unlocked() {return hasUpgrade("S",13)} 
        },
        24: {
            title: "4",
            description: "Gain +4 point generation for every super",
            cost: new Decimal(4),
            unlocked() {return hasUpgrade("S",13)},
            effect() {
                return player[this.layer].points.add(4)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
})