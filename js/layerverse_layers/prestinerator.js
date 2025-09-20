addLayer("PG", {
    name: "Prestinerator", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        automate: false
    
    }},
    layerShown(){
        let visible = false
        if (inChallenge("L",16) && player.G.gen3.gte(3) || player.PG.unlocked) visible = true
        if (!inChallenge("L",16)) visible = false
        return visible
    },
    color: "#ff0000ff",
    requires: new Decimal(5000),
    resource: "Prestinerator points", // Name of prestige currency
    baseResource: "Generator points", // Name of resource prestige is based on
    baseAmount() {return player.G.genpoints}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: new Decimal(0.45), // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)     
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "t: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "Cheaper infinity",
            description: "Infinite generator costscale is reduced",
            cost: new Decimal(1),
            onPurchase() {
                player.G.geninfcostscale = player.G.geninfcostscale.sub(0.001) 
            }
        },
        12: {
            title: "Generator 1 is cheaper wow",
            description: "Generator 1 costscale is reduced",
            cost: new Decimal(10),
            onPurchase() {
                player.G.gen1costscale = player.G.gen1costscale.div(1.1) 
            }
        },
        13: {
            title: "Generator 2 is cheaper wow",
            description: "Generator 2 costscale is reduced",
            cost: new Decimal(20),
            onPurchase() {
                player.G.gen2costscale = player.G.gen2costscale.div(1.2) 
            }
        },
        14: {
            title: "Generator 3 is cheaper wow",
            description: "Generator 3 costscale is reduced",
            cost: new Decimal(30),
            onPurchase() {
                player.G.gen3costscale = player.G.gen3costscale.div(1.3) 
            }
        },
        15: {
            title: "Generator 4 is cheaper wow",
            description: "Generator 4 costscale is reduced",
            cost: new Decimal(40),
            onPurchase() {
                player.G.gen4costscale = player.G.gen4costscale.div(1.4) 
            }
        },
        16: {
            title: "Generator 5 is cheaper wow",
            description: "Generator 5 costscale is reduced",
            cost: new Decimal(50),
            onPurchase() {
                player.G.gen5costscale = player.G.gen5costscale.div(1.5) 
            }
        },
        21: {
            title: "Greater Infinity",
            description: "Infinite generator point boost is boosted but its more expensive",
            cost: new Decimal(5),
            onPurchase() {
                player.G.geninfboost = player.G.geninfboost.times(1.125)
                player.G.geninfcostscale = player.G.geninfcostscale.pow(2)
            }
        },
        22: {
            title: "Even greater Infinity",
            description: "Infinite generator point boost is boosted even more but its more expensive",
            cost: new Decimal(15),
            onPurchase() {
                player.G.geninfboost = player.G.geninfboost.times(1.25)
                player.G.geninfcostscale = player.G.geninfcostscale.pow(2)
            }
        },
        23: {
            title: "Beyond Infinity",
            description: "Infinite generator point boost is boosted way more but its more expensive",
            cost: new Decimal(45),
            onPurchase() {
                player.G.geninfboost = player.G.geninfboost.times(1.5)
                player.G.geninfcostscale = player.G.geninfcostscale.pow(2)
            }
        },
        23: {
            title: "Barginning",
            description: "Infinite generator costs less",
            cost: new Decimal(3),
            onPurchase() {
                player.G.geninfcostscale = player.G.geninfcostscale.div(1.1)
            }
        },
        24: {
            title: "Can it get any chaper?",
            description: "Infinite generator costs even less",
            cost: new Decimal(30),
            onPurchase() {
                player.G.geninfcostscale = player.G.geninfcostscale.div(1.2)
            }
        },
        25: {
            title: "It can",
            description: "Infinite generator costs even less",
            cost: new Decimal(50),
            onPurchase() {
                player.G.geninfcostscale = player.G.geninfcostscale.div(1.3)
            }
        },
        26: {
            title: "Jack of all trades",
            description: "All generators cost way more less",
            cost: new Decimal(100),
            onPurchase() {
                player.G.gen1costscale = player.G.gen1costscale.div(1.5)
                player.G.gen2costscale = player.G.gen2costscale.div(1.5)
                player.G.gen3costscale = player.G.gen3costscale.div(1.5)
                player.G.gen4costscale = player.G.gen4costscale.div(1.5)
                player.G.gen5costscale = player.G.gen5costscale.div(1.5)
            }
        },
        31: {
            title: "Gen 1 Automation",
            description: "Autobuy gen 1",
            cost: new Decimal(5),
            onPurchase() {
            }
        },
        32: {
            title: "Gen 2 Automation",
            description: "Autobuy gen 2",
            cost: new Decimal(10),
            onPurchase() {
            }
        },
        33: {
            title: "Gen 3 Automation",
            description: "Autobuy gen 3",
            cost: new Decimal(20),
            onPurchase() {
            }
        },
        34: {
            title: "Gen 4 Automation",
            description: "Autobuy gen 4",
            cost: new Decimal(40),
            onPurchase() {
            }
        },
        35: {
            title: "Gen 5 Automation",
            description: "Autobuy gen 5",
            cost: new Decimal(80),
            onPurchase() {
            }
        },
        36: {
            title: "Infinite Generator Automation",
            description: "Autobuy gen inf",
            cost: new Decimal(100),
            onPurchase() {
            }
        },
    },
    clickables: {
        11: {
            title: function() {return "Automation: "+player.PG.automate},
            canClick() {
                if (hasUpgrade("PG",31) || hasUpgrade("PG",32) || hasUpgrade("PG",33) || hasUpgrade("PG",34) || hasUpgrade("PG",35)){
                    return true
                }
                else {
                    return false
                }
            },
            onClick() {
                if (player.PG.automate == true) {
                    player.PG.automate = false
                }
                else {
                    player.PG.automate = true
                }
                
            }
        },
    },

})