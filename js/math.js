addLayer("Ma", {
    name: "Mathematicians", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Ma", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
                points: new Decimal(0),
                Ma_effect: new Decimal(0.1)
    }},
    layerShown(){
        let visible = false
        if (hasUpgrade('M', 22) || player.Ma.unlocked) visible = true
       return visible
     }, 
    effect() {
        Maeff = player[this.layer].points.add(1).pow(Ma_effect)
        return Maeff
        },
        effectDescription() {
            Maeff1 = this.effect();
            return "that are boosting point gain by "+format(Maeff)+"x."
        },
        branches: ["Ma", "A","Mu","P"], 
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
            done() { return player.Ma.points.gte(1) }
        },
    }
})