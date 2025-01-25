addLayer("H", {
    name: "Hyper", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
                points: new Decimal(0),
                HyperEffectPower: new Decimal(0.9),
    }},
    layerShown(){
        let visible = false
        if (hasUpgrade('S', 35) || player.H.unlocked) visible = true
       return visible
     },   
    effect() {
        Heff = player[this.layer].points.add(1).pow(HyperEffectPower)
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
    exponent: 0.5, // Prestige currency exponent
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
            requirementDescription: "3 Hyper point",
            effectDescription: "Gain 5% of super reset instead of the 1%",
            done() { return player.H.points.gte(3) }
        },
    }
})