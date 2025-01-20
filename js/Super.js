addLayer("S", {
    name: "Super Layer", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
                points: new Decimal(0),
                layerShown(){
                    let visible = false
                    if (hasUpgrade('D', 26) || player.S.unlocked) visible = true
                   return visible
                },
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
        if (inChallenge('S', 11)) mult = mult.pow(0.01)
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
            effectDescription: "Unlock super upgrades and 1.5x points",
            done() { return player.S.points.gte(1) }
        },
        2: {
            requirementDescription: "15 Super point",
            effectDescription: "Passively generate dressy points",
            done() { return player.S.points.gte(15) }
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
                return player[this.layer].points.add(1).pow(0.3)
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
            description: "1.1x points",
            cost: new Decimal(1),
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
            description: "Points boost themselves",
            cost: new Decimal(4),
            unlocked() {return hasUpgrade("S",13)},
            effect() {
                return player.points.add(1).pow(0.04)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        25: {
            title: "5",
            description: "^1.05 point gain",
            cost: new Decimal(5),
            unlocked() {return hasUpgrade("S",13)},
        },
        31: {
            title: "6",
            description: "1.6x dressy point gain",
            cost: new Decimal(6),
            unlocked() {return hasUpgrade("S",13)},
        },
        32: {
            title: "7",
            description: "^1.77 point gain (leave this for later)",
            cost: new Decimal(777),
            unlocked() {return hasUpgrade("S",13)},
        },
        33: {
            title: "8",
            description: "Points boost themselves more than before",
            cost: new Decimal(8),
            unlocked() {return hasUpgrade("S",13)},
            effect() {
                return player.points.add(1).pow(0.08)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }, 
        34: {
            title: "Super",
            description: "Unlock a challenge",
            cost: new Decimal(1),
            unlocked() {return hasUpgrade("S",33) && hasUpgrade("S",31) && hasUpgrade("S",25) && hasUpgrade("S",24) && hasUpgrade("S",23) && hasUpgrade("S",22) && hasUpgrade("S",21)  },
            effect() {
                return player.S.points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }, 
        
    }, challenges: {
        11: {
            name: "Super",
            challengeDescription: "^0.01 point gain, dressy points and super",
            goalDescription: "??? points",
            canComplete: function() {return player.points.gte(100)},
        },
    }
})