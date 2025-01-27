addLayer("C", {
    name: "Challenge", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
                points: new Decimal(0),
    }},
    layerShown(){
        let visible = false
        if (hasMilestone('H',6 ) || player.H.unlocked) visible = true
       return visible
     },  
    color: "#4BDC13",
    requires: new Decimal(0), // Can be a function that takes requirement increases into account
    resource: "Challenges completed", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
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
    ], challenges: {
        11: {
            name: "challenge",
            challengeDescription: "hi",
            rewardDescription: "Autobuy super upgrades and more milestones",
            canComplete: function() {return player.S.points.gte(1000)},
            unlocked() {return hasMilestone("H",3)},
        },
        12: {
            name: "challenge",
            challengeDescription: "hi",
            rewardDescription: "Autobuy super upgrades and more milestones",
            canComplete: function() {return player.S.points.gte(1000)},
            unlocked() {return hasMilestone("H",3)},
        },
    }
})