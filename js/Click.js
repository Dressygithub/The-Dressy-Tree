addLayer("Mi", {
    position: 4, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: "side",
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        clicky: new Decimal(1),
        clickyadd: new Decimal(1),
        clickymult: new Decimal(1),

    }},
    layerShown(){
        let visible = true
       return visible
    },
    name: "Minigame", // This is optional, only used in a few places, If absent it just uses the layer id.
    resource: "Minigame points", // Name of prestige currency
    //requires: new Decimal(1), // Can be a function that takes requirement increases into account
    //baseResource: "", // Name of resource prestige is based on
    //baseAmount() {return player.points}, // Get the current amount of baseResource
    //type: "normal", // normal: cost to gain currency depends on amount ganed. static: cost depends on how much you already have
    //exponent: 1.72, // Prestige currency exponent
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
            title: "Click",
            canClick() {return true},
            onClick() { return addPoints('Mi',new Decimal(player.Mi.clicky)) },
        },
        12: {
            title: "Boost click",
            canClick() {return true},
            display() {return },
            onClick() { new Audio('sound.mp3')
                if (hasUpgrade('Mi',21)) player.Mi.clickyadd.add(10)
                if (hasUpgrade('Mi',22)) player.Mi.clickyadd.times(1.01)
                
                
            },
            unlocked() {return hasUpgrade('Mi',21)}
        },
    },
    upgrades: { 
        11: {
            title: "Clicky upgrade",
            description: "2x click",
            cost: new Decimal(10),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(2)
            },
        },
        12: {
            title: "Clicker upgrade",
            description: "3x click",
            cost: new Decimal(40),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(3)
            },
            unlocked() { return hasUpgrade('Mi', 11) }
        },
        13: {
            title: "Clicketh upgradeth",
            description: "2x click",
            cost: new Decimal(300),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(2)
            },
            unlocked() { return hasUpgrade('Mi', 12) }
        },
        13: {
            title: "Clicketh upgradeth",
            description: "2x click",
            cost: new Decimal(100),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(2)
            },
            unlocked() { return hasUpgrade('Mi', 12) }
        },
        14: {
            title: "Grindy Click upgrade",
            description: "+10 click",
            cost: new Decimal(1000),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.add(10)
            },
            unlocked() { return hasUpgrade('Mi', 13) }
        },
        15: {
            title: "Click upgrade again",
            description: "^1.1 click",
            cost: new Decimal(1750),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.pow(1.1)
            },
            unlocked() { return hasUpgrade('Mi', 14) }
        },
        16: {
            title: "Finale of row",
            description: "^2 click :o",
            cost: new Decimal(2500),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.pow(2)
            },
            unlocked() { return hasUpgrade('Mi', 15) }
        },
        21: {
            title: "A second clickable",
            description: "2 clickables now",
            cost: new Decimal(250000),
            unlocked() { return hasUpgrade('Mi', 16) }
        },
        22: {
            title: "Clicky why",
            description: "the second clickable now boosts clicky by +20 clicky instead of +10",
            cost: new Decimal(300000),
            unlocked() { return hasUpgrade('Mi', 21) }
        },
        23: {
            title: "Epic formula",
            description: "",
            cost: new Decimal(1000000),
            unlocked() { return hasUpgrade('Mi', 22) }
        },
        24: {
            title: "A second clickable",
            description: "2 clickables now",
            cost: new Decimal(250000),
            unlocked() { return hasUpgrade('Mi', 16) }
        },
        25: {
            title: "",
            description: "",
            cost: new Decimal(2000000),
            unlocked() { return hasUpgrade('Mi', 21) }
        },
        26: {
            title: "A  clickable",
            description: "2 clickables now",
            cost: new Decimal(1000000),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.pow(2)
            },
            unlocked() { return hasUpgrade('Mi', 22) }
        },
    },
})