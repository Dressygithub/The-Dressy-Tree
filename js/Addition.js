addLayer("A", {
    name: "Add", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "+", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
                points: new Decimal(0),
    }},
    layerShown(){
        let visible = false
        if (hasMilestone('Ma',1) || player.A.unlocked) visible = true
       return visible
    }, 
    effect() {
        Aeff = player[this.layer].points.add(1).pow(0.1)
        return Aeff
        },
        effectDescription() {
            Aeff = this.effect();
            return "that are boosting point gain base by +"+format(Aeff)
        },
    color: "#4BDC13",
    resource: "Addition", // Name of prestige currency
    baseResource: "Money", // Name of resource prestige is based on
    baseAmount() {return player.M.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.7, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "t: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
})