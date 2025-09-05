addLayer("Mi", {
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: "side",
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        clicky: new Decimal(1),
        clickymult: new Decimal(1),
        buyableboost: new Decimal(1),
        buyableboost2: new Decimal(1),
        Pgen: new Decimal(0),


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
                "bars",
                ["display-text",
                    function(){
                        let txt = "You are getting "+new Decimal(player.Mi.clicky.add(player.Mi.clickyadd).times(player.Mi.clickymult).times(buyableEffect("Mi",11))).floor()+" per click"
                        return txt
                    }
                ],
                "blank", 
                ["upgrades",[1,2,3,4,5,6]],
                "bars"
            ],
        },
        "Buyables": {
            content: [
                "main-display",
                ["display-text",
                    function(){
                        let txt = "You are getting "+new Decimal(player.Mi.clicky.add(player.Mi.clickyadd).times(player.Mi.clickymult).times(buyableEffect("Mi",11))).floor()+" per click"
                        return txt
                    }
                ],
                "blank", 
                ["buyables",[1]],
            ],
            unlocked() {return hasUpgrade("Mi",41)}
        },
        "Clicky 2": {
            content: [
                "main-display",
                ["clickables",[1]],
                ["display-text",
                    function(){
                        let txt = "You are getting "+new Decimal(player.Mi.clicky.add(player.Mi.clickyadd).times(player.Mi.clickymult).times(buyableEffect("Mi",11))).floor()+" per click"
                        return txt
                    }
                ],
                "blank", 
                ["upgrades",[7,8,9,10]],
            ],
            unlocked() {return hasUpgrade("Mi",66)}
        },
    },
    bars: {
        replicate: {
            direction: RIGHT,
            width: 600,
            height: 60,
            fillStyle: { 'background-color': "green" },
            borderStyle() { return { "border-color": "white" } },
            progress() {
                let prog = 0
                if (player.points.gte(1e20)) {prog = 1}
                return prog
            },
        },
    },
    buyables: {
        11: {
            title: "<br>Minigame booster<br>",
            cost(x) { return new Decimal(x).pow(10).div(buyableEffect("Mi",12)) },
            display() { return "Boosts minigame point gain<br>" + "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + "<br>Currently: " + format(buyableEffect("Mi",11))+"x" },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect() {return getBuyableAmount("Mi",11).add(1).times(player.Mi.buyableboost)},
        },
        12: {
            title: "<br>Discount services<br>",
            cost(x) { return new Decimal(x).pow(new Decimal(x).log(5)) },
            display() { return "Divide the first buyable cost<br>" + "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + "<br>Currently: /" + format(buyableEffect("Mi",12))},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect() {return getBuyableAmount(this.layer, this.id).add(1).times(player.Mi.buyableboost2)},
            unlocked() {{return hasUpgrade('Mi',61)}}
        },
    },
    clickables: {
        11: {
            title: "Click",
            canClick() {return true},
            onClick() { return addPoints('Mi',new Decimal(player.Mi.clicky.add(player.Mi.clickyadd).times(player.Mi.clickymult).times(buyableEffect("Mi",11)).floor())) },
            style() {return {
                
            }},
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
            title: "row 2",
            description: "2x points",
            cost: new Decimal(250000),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(2)
            },
            unlocked() { return hasUpgrade('Mi', 16) }
        },
        22: {
            title: "Exponent land",
            description: "^1.1 click",
            cost: new Decimal(300000),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.pow(1.1)
            },
            unlocked() { return hasUpgrade('Mi', 21) }
        },
        23: {
            title: "Recycled upgrade",
            description: "^1.1 click",
            cost: new Decimal(500000),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.pow(1.1)
            },
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
            cost: new Decimal(40000000),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(3)
            },
            unlocked() { return hasUpgrade('Mi', 24) }
        },
        26: {
            title: "Finale of row 1+1",
            description: "Finale of row 1 but 1.1",
            cost: new Decimal(99999999),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.pow(1.1)
            },
            unlocked() { return hasUpgrade('Mi', 25) }
        },
        31: {
            title: "2x row becuase1",
            description: "Im really running out of ideas",
            cost: new Decimal(1e9),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(2)
            },
            unlocked() { return hasUpgrade('Mi', 26) }
        },
        32: {
            title: "2x row becuase2",
            description: "Im really running out of ideas",
            cost: new Decimal(2e9),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(2)
            },
            unlocked() { return hasUpgrade('Mi', 31) }
        },
        33: {
            title: "2x row becuase3",
            description: "Im really running out of ideas",
            cost: new Decimal(4e9),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(2)
            },
            unlocked() { return hasUpgrade('Mi', 32) }
        },
        34: {
            title: "2x row becuase4",
            description: "Im really running out of ideas",
            cost: new Decimal(8e9),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(2)
            },
            unlocked() { return hasUpgrade('Mi', 33) }
        },
        35: {
            title: "2x row becuase5",
            description: "Im really running out of ideas",
            cost: new Decimal(1.6e10),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(2)
            },
            unlocked() { return hasUpgrade('Mi', 34) }
        },
        36: {
            title: "Finale of #",
            description: "2x click",
            cost: new Decimal(3.2e10),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(2)
            },
            unlocked() { return hasUpgrade('Mi', 35) }
        },
        41: {
            title: "row FOUR",
            description: "Unlock buyables",
            cost: new Decimal(1e11),
            onPurchase() {
    
            },
            unlocked() { return hasUpgrade('Mi', 36) }
        },
        42: {
            title: "Cool upgrade",
            description: "Its so cool that 1.5x points",
            cost: new Decimal(1.5e11),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(1.5)
            },
            unlocked() { return hasUpgrade('Mi', 41) }
        },
        43: {
            title: "Cool upgrad",
            description: "Its so cool that 1.5x points",
            cost: new Decimal(2e11),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(1.5)
            },
            unlocked() { return hasUpgrade('Mi', 42) }
        },
        44: {
            title: "Cool upgra",
            description: "Its so cool that 1.5x points",
            cost: new Decimal(2.5e11),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(1.5)
            },
            unlocked() { return hasUpgrade('Mi', 43) }
        },
        45: {
            title: "Upgrade",
            description: "Its so cool that 2x points",
            cost: new Decimal(3e11),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(2)
            },
            unlocked() { return hasUpgrade('Mi', 44) }
        },
        46: {
            title: "Very harsh upgrade",
            description: "1.001x points",
            cost: new Decimal(1e12),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(1.001)
            },
            unlocked() { return hasUpgrade('Mi', 45) }
        },
        51: {
            title: "New row new me",
            description: "1.01x points",
            cost: new Decimal(3e12),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(1.01)
            },
            unlocked() { return hasUpgrade('Mi', 46) }
        },
        52: {
            title: "Thats alot",
            description: "1.1x points",
            cost: new Decimal(5e12),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(1.1)
            },
            unlocked() { return hasUpgrade('Mi', 51) }
        },
        53: {
            title: "Tha",
            description: "1.2x points",
            cost: new Decimal(2e13),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(1.2)
            },
            unlocked() { return hasUpgrade('Mi', 52) }
        },
        54: {
            title: "Buyable power",
            description: "2x better buyable1",
            cost: new Decimal(1.001e14),
            onPurchase() {
                player.Mi.buyableboost = player.Mi.buyableboost.times(2)
            },
            unlocked() { return hasUpgrade('Mi', 53) }
        },
        55: {
            title: "Again",
            description: "2x better buyable1",
            cost: new Decimal(2e14),
            onPurchase() {
                player.Mi.buyableboost = player.Mi.buyableboost.times(2)
            },
            unlocked() { return hasUpgrade('Mi', 54) }
        },
        56: {
            title: "Final of row sqrt(25)",
            description: "3x better buyable1",
            cost: new Decimal(3e14),
            onPurchase() {
                player.Mi.buyableboost = player.Mi.buyableboost.times(3)
            },
            unlocked() { return hasUpgrade('Mi', 55) }
        },
        61: {
            title: "These have been really hard",
            description: "Unlock a new buyable",
            cost: new Decimal(1e15),
            onPurchase() {
                console.log("what was i supposed to put here")
            },
            unlocked() { return hasUpgrade('Mi', 56) }
        },
        62: {
            title: "I will be nicer for this row",
            description: "3x points",
            cost: new Decimal(1.5e15),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(3)
            },
            unlocked() { return hasUpgrade('Mi', 61) }
        },
        63: {
            title: "This is an upgrade",
            description: "5x points",
            cost: new Decimal(3e15),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(5)
            },
            unlocked() { return hasUpgrade('Mi', 62) }
        },
        64: {
            title: "What do i even put here",
            description: "7x points",
            cost: new Decimal(1e16),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(7)
            },
            unlocked() { return hasUpgrade('Mi', 63) }
        },
        65: {
            title: "Hello",
            description: "9x points",
            cost: new Decimal(1e17),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(9)
            },
            unlocked() { return hasUpgrade('Mi', 64) }
        },
        66: {
            title: "Upgrade 36",
            description: "6x points and unlock a new tab",
            cost: new Decimal(1e18),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(6)
            },
            unlocked() { return hasUpgrade('Mi', 65) }
        },




        71: {
            title: "The next upgrade section",
            description: "25% passive generation",
            cost: new Decimal(1e18),
            onPurchase() {
                player.Mi.Pgen = new Decimal(0.25)
            },
            unlocked() { return hasUpgrade('Mi', 66) }
        },
        72: {
            title: "Points",
            description: "2x points",
            cost: new Decimal(1e19),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(2)
            },
            unlocked() { return hasUpgrade('Mi', 71) }
        },
        73: {
            title: "Boosts",
            description: "2x better buyable 1",
            cost: new Decimal(1e19),
            onPurchase() {
                player.Mi.buyableboost = player.Mi.buyableboost.times(2)
            },
            unlocked() { return hasUpgrade('Mi', 72) }
        },
        74: {
            title: "I like points!",
            description: "1.5x points",
            cost: new Decimal(1e21),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(1.5)
            },
            unlocked() { return hasUpgrade('Mi', 73) }
        },
        75: {
            title: "I like them more!",
            description: "50% passive generation",
            cost: new Decimal(1e21),
            onPurchase() {
                player.Mi.Pgen = new Decimal(0.50)
            },
            unlocked() { return hasUpgrade('Mi', 74) }
        },
        76: {
            title: "Even better boosts",
            description: "2x better buyable 2",
            cost: new Decimal(3e21),
            onPurchase() {
                player.Mi.buyableboost2 = player.Mi.buyableboost2.times(2)
            },
            unlocked() { return hasUpgrade('Mi', 75) }
        },
        81: {
            title: "Double trouble but its not trouble",
            description: "1.5x better buyable 1 and 2",
            cost: new Decimal(3e21),
            onPurchase() {
                player.Mi.buyableboost = player.Mi.buyableboost.times(1.5)
                player.Mi.buyableboost2 = player.Mi.buyableboost2.times(1.5)
            },
            unlocked() { return hasUpgrade('Mi', 76) }
        },
        82: {
            title: "Epic points",
            description: "1.3x points",
            cost: new Decimal(5e21),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(1.3)
            },
            unlocked() { return hasUpgrade('Mi', 81) }
        },
        83: {
            title: "Buyables are useful i think",
            description: "3x better buyable 1 and 2",
            cost: new Decimal(1e22),
            onPurchase() {
                player.Mi.buyableboost = player.Mi.buyableboost.times(3)
                player.Mi.buyableboost2 = player.Mi.buyableboost2.times(3)
            },
            unlocked() { return hasUpgrade('Mi', 82) }
        },
        84: {
            title: "I love exponents",
            description: "^1.05 point mult",
            cost: new Decimal(1.25e22),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.pow(1.05)
            },
            unlocked() { return hasUpgrade('Mi', 83) }
        },
        85: {
            title: "I love exponents again",
            description: "^1.05 point mult again",
            cost: new Decimal(1.75e22),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.pow(1.05)
            },
            unlocked() { return hasUpgrade('Mi', 84) }
        },
        86: {
            title: "Passive generational upgrade",
            description: "75% passive generation",
            cost: new Decimal(5e22),
            onPurchase() {
                player.Mi.Pgen = new Decimal(0.75)
            },
            unlocked() { return hasUpgrade('Mi', 85) }
        },
        91: {
            title: "I exponents exponents",
            description: "^1.1 point mult",
            cost: new Decimal(1e23),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.pow(1.1)
            },
            unlocked() { return hasUpgrade('Mi', 86) }
        },
        92: {
            title: "Exponents exponents exponents",
            description: "^1.1 point mult again",
            cost: new Decimal(2e23),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.pow(1.1)
            },
            unlocked() { return hasUpgrade('Mi', 91) }
        },
        93: {
            title: "A",
            description: "^1.5 point mult again",
            cost: new Decimal(1e25),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.pow(1.5)
            },
            unlocked() { return hasUpgrade('Mi', 92) }
        },
        94: {
            title: "cool",
            description: "2x points",
            cost: new Decimal(1e25),
            onPurchase() {
                player.Mi.clicky = player.Mi.clicky.times(2)
            },
            unlocked() { return hasUpgrade('Mi', 93) }
        },
        
    },
})