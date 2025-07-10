addLayer("Ma", {
    name: "Math", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Ma", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        Ma_effectpow: new Decimal(1)
    }},
    layerShown(){
        let visible = false
        if (inChallenge("L",12)) visible = true
        if (!inChallenge("L",12)) visible = false
       return visible
     },
    color: "#123456",
    requires: function() {return new Decimal(10).sub(upgradeEffect("Ma",12)).div(upgradeEffect("Ma", 14))}, // Can be a function that takes requirement increases into account
    resource: "Math", // Name of prestige currency
    baseResource: "Points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: new Decimal(0.5), // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "t: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ], milestones: {
        1: {
            requirementDescription: "1 Mathematician",
            effectDescription: "what",
            done() { return player.Ma.points.gte(10**308) },
        },
    }, 
    upgrades: {
    11: {
        title: "Plus",
        description: "Increase point gain by math",
        cost: new Decimal(1),
        effect() {
            if (hasUpgrade("Ma",11)) {
                return new Decimal(player[this.layer].points.add(1)).pow(0.3).div(new Decimal(2)).times(upgradeEffect("Ma", 13))
            }
            else {
                return new Decimal(0)
            }
        },
        effectDisplay() { return "+"+format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
    },
    12: {
        title: "Minus",
        description: "Math subtracts the requirement",
        cost: new Decimal(2),
        effect() {
            if (hasUpgrade("Ma",12)) {
                return new Decimal(player[this.layer].points).pow(0.25).times(upgradeEffect("Ma", 13))
            }
            else {
                return new Decimal(0)
            }
        },
        effectDisplay() { return "-"+format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        unlocked() {return hasUpgrade("Ma",11)}
    },
    13: {
        title: "Multiply",
        description: "Multiply Add and Minus effects by 1.2x",
        cost: new Decimal(5),
        effect() {
            if (hasUpgrade("Ma",13)) {
                 return new Decimal(1.2)
            }
            else {
                return new Decimal(1)
            }
        },
        unlocked() {return hasUpgrade("Ma",12)}
    },
    14: {
        title: "Division",
        description: "Divide the requirement by /1.1",
        cost: new Decimal(5),
        effect() {
            if (hasUpgrade("Ma",14)) {
                return new Decimal(1.1)
            }
            else {
                return new Decimal(1)
            }
        },
        unlocked() {return hasUpgrade("Ma",13)}
    },
    15: {
        title: "Exponent",
        description: "Increase math gain by points, capped at 1.1",
        cost: new Decimal(7),
        effect() {
            if (hasUpgrade("Ma",15)) {
                if (upgradeEffect("Ma", 15).lt(1.1)) {
                    return new Decimal(player[this.layer].points.add(1)).pow(0.001)
                }
                else {
                    return new Decimal(1.1)
                }
            }
            else {
                return new Decimal(1)
            }
        },
        effectDisplay() { return "^"+format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
    },
    },
})