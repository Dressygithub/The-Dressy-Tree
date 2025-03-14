addLayer("Sm", {
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: "side",
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        card: new Decimal(0)

    }},
    layerShown(){
        let visible = true
        if (hasUpgrade('Mi', 36) || player.Mi.unlocked) visible = true
       return visible
    },
    name: "Superminigame points", // This is optional, only used in a few places, If absent it just uses the layer id.
    resource: "Superminigame points", // Name of prestige currency
    requires: new Decimal(1e10), // Can be a function that takes requirement increases into account
    baseResource: "Minigame points", // Name of resource prestige is based on
    baseAmount() {return player.Mi.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount ganed. static: cost depends on how much you already have
    exponent: 1.2, // Prestige currency exponent
    //passiveGeneration() {
        //return 1
    //},
    row: "side", // Row the layer is in on the tree (0 is the first row)
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    clickables: {
        11: {
            title: "Open",
            canClick() {if (player.Mi.points.gte(1)) return true},
            onClick() {},
        },
    },
    upgrades: { 
        11: {
            title: "Clicky",
            description: "2x click",
            cost: new Decimal(1),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(2)
            },
        },
    },
})