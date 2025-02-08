addLayer("C", {
    name: "Clicker", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
                points: new Decimal(0),
    }},
    layerShown(){
        let visible = false
        if (hasMilestone('H',6 ) || player.H.unlocked) visible = true
       return visible
     },  
    color: "#4BDC13",
    requires: new Decimal(0), // Can be a function that takes requirement increases into account
    resource: "Click", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: "side", // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "t: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ], 
    clickables: {
        11: {
            title: "Click",
            canClick() {return true},
            onClick() {return addPoints('C',clicky)}
        },
    },
    upgrades: {
        11: {
            title: "The first click upgrade",
            description: "Most creative upgrade name ever.",
            cost: new Decimal(1),
        },
    }
})