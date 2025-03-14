addLayer("Mi", {
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: "side",
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        clicky: new Decimal(1),
        clickyadd: new Decimal(0),
        clickymult: new Decimal(1),
        chargedclicky: new Decimal(0),
        CCadd: new Decimal(1),


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
    tabFormat: {
        "Clicky": {
            content: [
                "main-display",
                ["clickables",[1]],
                ["display-text",
                    function(){
                        let txt = "You are getting "+new Decimal(player.Mi.clicky.add(player.Mi.clickyadd).times(player.Mi.clickymult).floor())+" per click"
                        return txt
                    }
                ],
                "blank", 
                ["upgrades", [1, 2, 3]],
            ],
        },
        "Overcharged clicky": {
            content: [
                ["display-text",
                    function(){
                        let txt = "<h2>You have "+new Decimal(player.Mi.chargedclicky)+" Overchargium</h2> "
                        return txt
                    }
                ],
                ["clickables",[2]]
              
            ],
            unlocked() { return hasUpgrade('Mi',36) },
        },
    },
    clickables: {
        11: {
            title: "Click",
            canClick() {return true},
            onClick() { return addPoints('Mi',new Decimal(player.Mi.clicky.add(player.Mi.clickyadd).times(player.Mi.clickymult))) },
        },
        12: {
            title: "Boost click",
            canClick() {return true},
            display() {return },
            onClick() { new Audio('sound.mp3')
                if (hasUpgrade('Mi',21)) player.Mi.clickyadd = player.Mi.clickyadd.add(10)
                if (hasUpgrade('Mi',22)) player.Mi.clickyadd = player.Mi.clickyadd.add(20)
                if (hasUpgrade('Mi',23)) player.Mi.clickyadd = player.Mi.clickyadd.add(pow(0.5))
                
                
                
            },
            unlocked() {return hasUpgrade('Mi',21)}
        },
        21: {
            title: "Overcharge click",
            canClick() {return true},
            onClick() { return player.Mi.chargedclicky.add(player.Mi.CCadd)},
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
            description: "The second clickable now boosts clicky by +20 clicky instead of +10",
            cost: new Decimal(300000),
            unlocked() { return hasUpgrade('Mi', 21) }
        },
        23: {
            title: "Clicky maybe better",
            description: "booster clickable formula is now x+sqrt(x) or not.",
            cost: new Decimal(500000),
            unlocked() { return hasUpgrade('Mi', 22) }
        },
        24: {
            title: "Convenient",
            description: "+100,30x and ^1.1 click but they are placed at the most inconvenient places",
            cost: new Decimal(750000),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.pow(1.1).times(30).add(100)
            },
            unlocked() { return hasUpgrade('Mi', 23) }
        },
        25: {
            title: "Aaaaaaaa",
            description: "3x click",
            cost: new Decimal(7000000),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(3)
            },
            unlocked() { return hasUpgrade('Mi', 24) }
        },
        26: {
            title: "Finale of row 1+1",
            description: "Finale of row 1 but 1.1",
            cost: new Decimal(40000000),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.pow(1.1)
            },
            unlocked() { return hasUpgrade('Mi', 25) }
        },
        31: {
            title: "2x row becuase1",
            description: "Im really running out of ideas",
            cost: new Decimal(1e8),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(2)
            },
            unlocked() { return hasUpgrade('Mi', 26) }
        },
        32: {
            title: "2x row becuase2",
            description: "Im really running out of ideas",
            cost: new Decimal(2e8),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(2)
            },
            unlocked() { return hasUpgrade('Mi', 31) }
        },
        33: {
            title: "2x row becuase3",
            description: "Im really running out of ideas",
            cost: new Decimal(4e8),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(2)
            },
            unlocked() { return hasUpgrade('Mi', 32) }
        },
        34: {
            title: "2x row becuase4",
            description: "Im really running out of ideas",
            cost: new Decimal(8e8),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(2)
            },
            unlocked() { return hasUpgrade('Mi', 33) }
        },
        35: {
            title: "2x row becuase5",
            description: "Im really running out of ideas",
            cost: new Decimal(1.6e9),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(2)
            },
            unlocked() { return hasUpgrade('Mi', 34) }
        },
        36: {
            title: "Finale of #",
            description: "Unlock something...",
            cost: new Decimal(3.2e9),
            onPurchase() {
            },
            unlocked() { return hasUpgrade('Mi', 35) }
        },
    },
})