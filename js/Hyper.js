addLayer("H", {
    name: "Hyper", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
                points: new Decimal(0),
    }},
    layerShown(){
        let visible = false
        if (hasChallenge('S', 11) || player.H.unlocked) visible = true
       return visible
     },   
    effect() {
        Heff = player[this.layer].points.add(1).pow(0.9)
        return Heff
        },
        effectDescription() {
            Heff = this.effect();
            return "that are boosting Dressy point gain AND super gain by "+format(Heff)+"x."
        },
    color: "#38ffa4",
    requires: new Decimal(25), // Can be a function that takes requirement increases into account
    resource: "Hyper", // Name of prestige currency
    baseResource: "Super", // Name of resource prestige is based on
    baseAmount() {return player.S.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.4, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "t: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ], 
    milestones: {
        1: {
            requirementDescription: "1 Hyper point",
            effectDescription: "Gain 15% of dressy point reset, 1% of super reset, autobuy dressy point upgrades and ^1.1 points",
            done() { return player.H.points.gte(1) }
        },
        2: {
            requirementDescription: "3 Hyper points",
            effectDescription: "Gain 5% of super reset instead of the 1%",
            done() { return player.H.points.gte(3) }
        },
        3: {
            requirementDescription: "10 Hyper points",
            effectDescription: "Unlock a challenge",
            done() { return player.H.points.gte(10) }
        },
        4: {
            requirementDescription: "10 Hyper points",
            effectDescription: "Unlock a challenge",
            done() { return player.H.points.gte(10) },
            unlocked() {return hasChallenge("H",11)},
        },
        5: {
            requirementDescription: "100 Hyper points",
            effectDescription: "Unlock 3 dressy upgrades",
            done() { return player.H.points.gte(100) && hasChallenge("H",11)  },
            unlocked() {return hasChallenge("H",11)},
        },
        6: {
            requirementDescription: "250 Hyper points",
            effectDescription: "Unlock a side layer",
            done() { return player.H.points.gte(10) && hasChallenge("H",11)},
            unlocked() {return hasChallenge("D",11)},
        },
        7: {
            requirementDescription: "1000 Hyper points",
            effectDescription: "Move on",
            done() { return player.H.points.gte(10) && hasChallenge("H",11)},
            unlocked() {return hasChallenge("D",11)},
        },
    }, challenges: {
        11: {
            name: "Automation",
            challengeDescription: "Automation of layers is a good thing, right?",
            rewardDescription: "Autobuy super upgrades and more milestones",
            canComplete: function() {return player.S.points.gte(1000)},
            unlocked() {return hasMilestone("H",3)},
        },
    }
})