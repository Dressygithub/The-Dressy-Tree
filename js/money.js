addLayer("M", {
    name: "Money", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
                points: new Decimal(0),
                moneygain: new Decimal(0),
    }},
    layerShown(){
        let visible = false
        if (hasChallenge('D', 11) || player.H.unlocked) visible = true
       return visible
     },
    passiveGeneration() {
        if (hasUpgrade('M', 21)) return 50
        if (hasUpgrade('M', 16)) return 35
        if (hasUpgrade('M', 15)) return 25
        if (hasUpgrade('M', 14)) return 10
        if (hasUpgrade('M', 13)) return 5
        if (hasUpgrade('M', 12)) return 2
        if (hasUpgrade('M', 11)) return 1
        return 0
    },
    color: "#048c1b",
    branches: ["M", "Ma"], 
    resource: "Money", // Name of prestige currency
    baseResource: "Hyper", // Name of resource prestige is based on
    baseAmount() {return player.H.points}, // Get the current amount of baseResourc
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0000000000000000000001,
    requires: new Decimal(150),
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "t: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ], clickables:
    {
        11: {
            title: "Sell all your hyper<br> <h4>2 hyper = 1 money</h4>",
            canClick() {return true},
            onClick() {return (addPoints('M',new Decimal(player.H.points).div(2)))
                (addPoints('H', new Decimal(player.H.points).sub(new Decimal(player.H.points).times(2))))
                (playaudio('sound.mp3'))
            },
        },
    },
    upgrades: { 
        11: {
            title: "Lemonade stand",
            description: "Generate 1 money per second",
            cost: new Decimal(0),
        },
        12: {
            title: "Marketing stratergy",
            description: "Generate 2 money per second",
            cost: new Decimal(15),
        },
        13: {
            title: "Marketing team",
            description: "Generate 5 money per second",
            cost: new Decimal(45),
        },
        14: {
            title: "More drinks",
            description: "Just go to the store to get more drinks anyways generate 10 money per second",
            cost: new Decimal(120),
        },
        15: {
            title: "Expand stand",
            description: "Generate 25 money per second",
            cost: new Decimal(400),
        },
        16: {
            title: "Building permit",
            description: "Generate 35 money because you made a store",
            cost: new Decimal(750),
        },
        21: {
            title: "No more lemonade",
            description: "You now sell other things and generate 50 money.",
            cost: new Decimal(1250)
        },
        22: {
            title: "Hire mathematicians",
            description: "Hire some mathematicians",
            cost: new Decimal(1250),
        },
    }
})