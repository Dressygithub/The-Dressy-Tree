addLayer("T", {
    name: "Time", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        seconds: new Decimal(0),
        minutes: new Decimal(0),
        hours: new Decimal(0),
        mult: new Decimal(1),
        pow: new Decimal(1),
    }},
    layerShown(){
        let visible = false
        if (inChallenge("L",13)) visible = true
        if (!inChallenge("L",13)) visible = false
        return visible
     },
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Seconds", // Name of prestige currency
    baseResource: "test points", // Name of resource prestige is based on
    baseAmount() {return NaN}, // Get the current amount of baseResource
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
    ],
    tabFormat: {
            "Time": {
                content: [
                    "main-display",
                    ["display-text",
                    function(){
                        return "You have <h2><span style='color:rgb(0, 0, 255); text-shadow: 0px 0px 10px rgb(132, 0, 255); font-family: Lucida Console, Courier New, monospace'></span></h2> Completeted layers"
                    }
                ],
                    "blank",
                    "prestige-button",
                    "blank",
                    "blank",
                    "upgrades",
                ],
            },
    },
    upgrades: { 
        11: {
            title: "Waiting",
            description: "Double your seconds",
            cost: new Decimal(10),   
            onPurchase() {
                return player.T.mult = player.T.mult.times(2)
            }
        },
     }
})