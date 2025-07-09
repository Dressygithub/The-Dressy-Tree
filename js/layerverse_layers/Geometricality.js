addLayer("G", {
    name: "Geometricality", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        sides: new Decimal(2)
    }},
    layerShown(){
        let visible = true
        if (inChallenge("L",12)) visible = true
        if (!inChallenge("L",12)) visible = false
        return visible
     },
    color: "#FFEE00",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Geometricality", // Name of prestige currency
    baseResource: "Points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "t: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: { 
        /*11: {
            title: "The first upgrade?",
            description: "2x prestige points AND 10x points, you will see why later",
            cost: new Decimal(1),
        },*/
    },
    buyables: {
        /*11: {
            title: "<br>Prestige booster<br>",
            cost(x) { return new Decimal(1e6).pow(getBuyableAmount(this.layer, this.id).div(270)) },
            display() { return "Boosts prestige point gain<br>" + "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + "<br>Currently: " + format(tmp[this.layer].buyables[this.id].effect)+"x" },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect() {return new Decimal(2).pow(getBuyableAmount(this.layer, this.id).pow(0.5)).pow(player.P.buyablepower)},
            unlocked() {return hasUpgrade('P',31)}
        },*/
    },
})