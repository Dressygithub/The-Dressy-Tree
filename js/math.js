addLayer("Ma", {
    name: "Mathematicians", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Ma", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
                points: new Decimal(0),
    }},
    layerShown(){
        let visible = false
        if (hasUpgrade('M', 22) || player.Ma.unlocked) visible = true
       return visible
     },
    effect() {
        Maeff = player[this.layer].points.pow(player.Ma.Ma_effect).add(1)
        return Maeff
        },
        effectDescription() {
            Maeff1 = this.effect();
            return "that are boosting point gain by "+format(Maeff)+"x."
        },
        branches: [], 
    color: "#4BDC13",
    requires: new Decimal(2000), // Can be a function that takes requirement increases into account
    resource: "Mathematicians", // Name of prestige currency
    baseResource: "Money", // Name of resource prestige is based on
    baseAmount() {return player.M.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "t: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ], milestones: {
        1: {
            requirementDescription: "1 Mathematician",
            effectDescription: "Unlock a dressy point buyable",
            done() { return player.Ma.points.gte(1) },
        },
        2: {
            requirementDescription: "2 Mathematicians",
            effectDescription: "500 money gain",
            done() { return player.Ma.points.gte(2) }
        },
        3: {
            requirementDescription: "3 Mathematicians",
            effectDescription: "5000 money gain",
            done() { return player.Ma.points.gte(3) },
        },
        4: {
            requirementDescription: "5 Mathematicians",
            effectDescription: "Unlock Mathematician upgrades",
            done() { return player.Ma.points.gte(5) },
        },
    }, 
    upgrades: {
    11: {
        title: "Buy this to make the effect work",
        description: "Uh",
        cost: new Decimal(0),
        unlocked() {if (hasUpgrade("Ma",11)) return false
            else return true
        },
        effect() {
            return player.Ma.Maeff
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
    },
    12: {
        title: "Pythagoras",
        description: "6^2 + 8^2 = 10^2 super gain",
        cost: new Decimal(2),
        unlocked() {if (hasMilestone("Ma",4)) return true},
    },
    13: {
        title: "Pi",
        description: "3.141592653589793238462643383279502884197169399375105820974944592307 dressy point gain",
        cost: new Decimal(3),
        unlocked() {if (hasMilestone("Ma",4)) return true},
    },
    14: {
        title: "Euler",
        description: "2.71x hyper gain",
        cost: new Decimal(4),
        unlocked() {if (hasMilestone("Ma",4)) return true},
    },
    15: {
        title: "Add",
        description: "Add 1 money to the selling hyper clickable which now just makes it a 1:1 ratio",
        cost: new Decimal(4),
        unlocked() {if (hasMilestone("Ma",4)) return true},
    }
}
})