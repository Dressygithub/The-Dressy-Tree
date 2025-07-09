addLayer("L", {
    name: "Layerverse", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        complete: new Decimal(0),
    }},
    layerShown(){
        let visible = true
        if (hasUpgrade('M', 61) || player.L.unlocked) visible = true
       return visible
     },   
    color: "rgb(132, 0, 255)",
    requires: new Decimal(1e60), // Can be a function that takes requirement increases into account
    resource: "Layer points", // Name of prestige currency
    baseResource: "Points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    nodeStyle() {return {
        "background": "linear-gradient(rgb(0, 0, 255), rgb(132, 0, 255))",
        "width": "175px",
        "height": "175px",
        }
    },
    effect() {
        Leff = player[this.layer].points.add(1).pow(1.1)
        return Leff
        },
        effectDescription() {
            Leff=this.effect();
            return "that are boosting point gain by "+format(Leff)+"x."
        },
    row: 5, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "t: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    challenges: {
        11: {
            name: "The first layer",
            challengeDescription: "Complete the Prestige layer",
            rewardDescription: "",
            goalDescription: "Infinity prestige points?",
            canComplete: function() {return player.P.points.gte(new Decimal(2).pow(1024))},
        },
    },
    upgrades: { 
        11: {
            title: "Welcome to the layerverse",
            description: "Unlock challenges",
            cost: new Decimal(0),
            unlocked() {return player.L.points.gte(1) || hasUpgrade("L",11)}
        },
        12: {
            title: "Point enchancer",
            description: "5x points",
            cost: new Decimal(1),
            unlocked() {return hasUpgrade("L",11)}
        },
        13: {
            title: "Dressy point booster",
            description: "3x dressy points",
            cost: new Decimal(1),
            unlocked() {return hasUpgrade("L",11)}
        },
        14: {
            title: "Super enchancer",
            description: "2x super",
            cost: new Decimal(1),
            unlocked() {return hasUpgrade("L",11)}
        },
        15: {
            title: "Hyper booster",
            description: "1.5x hyper points",
            cost: new Decimal(1),
            unlocked() {return hasUpgrade("L",11)}
        },
        16: {
            title: "Money boosts ALL",
            description: "Money boosts points, dressy points, super and hyper",
            cost: new Decimal(2),
            unlocked() {return hasUpgrade("L",11)},
            effect() {
                return player.M.points.add(1).pow(0.01)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
    tabFormat: {
            "Layerverse": {
                content: [
                    "main-display",
                    ["display-text",
                    function(){
                        return "You have <h2><span style='color:rgb(0, 0, 255); text-shadow: 0px 0px 10px rgb(132, 0, 255); font-family: Lucida Console, Courier New, monospace'>"+ 0 +"</span></h2> Completeted layers"
                    }
                ],
                    "blank",
                    "prestige-button",
                    "blank",
                    "blank",
                    "upgrades",
                ],
            },
            "Challenges": {
                content: [
                    ["display-text",
                    function(){
                        return "You have <h2><span style='color:rgb(0, 0, 255); text-shadow: 0px 0px 10px rgb(132, 0, 255); font-family: Lucida Console, Courier New, monospace'>"+ 0 +"</span></h2> Completeted layers"
                    }
                ],  
                    ["display-text",
                    function(){
                        return "<b>NOTE: THESE CHALLENGES WONT SAVE IF YOU EXIT THEM AND NORMAL PROGRESSION WONT SAVE WHEN ENTERING THEM</b>"
                    }
                ],  
                    "blank",
                    "blank",
                    "blank",
                    "challenges",
                ],
            },
        }
})