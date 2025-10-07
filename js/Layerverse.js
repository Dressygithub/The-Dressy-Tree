addLayer("L", {
    name: "Layerverse", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        completedlayers: new Decimal(0),
        inchallenge: false,

        spacecompletionnlimit: new Decimal(10),
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
    exponent: function() {
        if (hasUpgrade("L",31)) {
            return 2
        }
        return 3
    }, // Prestige currency exponent
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
            rewardDescription: "Points are boosted by points",
            goalDescription: "Infinity prestige points?",
            canComplete: function() {return player.P.points.gte(new Decimal(2).pow(1024))},
            rewardEffect() {
                return player.points.add(1).log(10).add(1)
            },
            onComplete() {
                player.L.completedlayers = player.L.completedlayers.add(1)
            },
            rewardDisplay() { return format(challengeEffect(this.layer, this.id))+"x" },
            onEnter() {return player.L.inchallenge = true},
            onExit() {return player.L.inchallenge = false}
        },
        12: {
            name: "Math Layer",
            challengeDescription: "Everyones favourite subject! Complete the math layer",
            rewardDescription: "Points are boosted by points at a lesser scale",
            goalDescription: "10 million math",
            canComplete: function() {return player.Ma.points.gte(10000000)},
            unlocked() {return hasChallenge("L",11)},
            rewardEffect() {
                return player.points.add(1).log(20).add(1)
            },
            rewardDisplay() { return format(challengeEffect(this.layer, this.id))+"x" },
            onEnter() {return player.L.inchallenge = true},
            onExit() {return player.L.inchallenge = false}
        },
        13: {
            name: "Time layer",
            challengeDescription: "Patience is key, complete the time layer",
            rewardDescription: "Points are boosted by total played time",
            goalDescription: "The age of the universe",
            canComplete: function() {return new Decimal(player.T.points).div(60).div(60).div(24).div(7).div(4).div(12).floor().gte(13.7e9)},
            unlocked() {return hasChallenge("L",11)},
            rewardEffect() {
                return new Decimal(player.time).slog()
            },
            rewardDisplay() { return format(challengeEffect(this.layer, this.id))+"x" },
            onEnter() {return player.L.inchallenge = true},
            onExit() {return player.L.inchallenge = false}
        },
        14: {
            name: "Space",
            challengeDescription: "Elements of space, complete the space layers (you can only complete this 10 times)",
            rewardDescription: "For every time you beat this challenge, get +1.5x points",
            goalDescription: "Hydrogen milestone 10",
            completionLimit: 10,
            canComplete: function() {return hasMilestone("Hy",10)},
            unlocked() {return hasChallenge("L",11) && hasChallenge("L",12) && hasChallenge("L",13)},
            rewardEffect() {
                return new Decimal(1.5).times(challengeCompletions(this.layer, this.id)).add(1)
            },
            rewardDisplay() { return format(challengeEffect(this.layer, this.id))+"x" },
            onEnter() {return player.L.inchallenge = true},
            onExit() {return player.L.inchallenge = false}
        },
        15: {
            name: "Not a new layer?",
            challengeDescription: "From the beginning, complete the main layers again but /5 points, dressy points, super (only when you have 5) and money buyable power.",
            rewardDescription: "3x points, 2x dressy points, 1.5x super, 1.25x hyper and more layerverse upgrades",
            goalDescription: "The last money upgrade",
            canComplete: function() {return hasUpgrade("M",61)},
            unlocked() {return hasChallenge("L",14)},
            rewardEffect() {
                return "Yes"
            },
            rewardDisplay() { return format(challengeEffect(this.layer, this.id)) },
            onEnter() {return 1},
            onExit() {return 1}
        },
        16: {
            name: "Generator layer",
            challengeDescription: "Complete the generator layer",
            rewardDescription: "Boost points by the amount of time you spend in the layerverse and unlock the layer generators",
            goalDescription: "1000 Prestinerator points",
            canComplete: function() {return player.PG.points.gte(1000)},
            unlocked() {return hasChallenge("L",14)},
            rewardEffect() {
                return new Decimal(player.L.resetTime).pow(0.9).add(1)
            },
            rewardDisplay() { return format(challengeEffect(this.layer, this.id))+"x" },
            onEnter() {return player.L.inchallenge = true},
            onExit() {return player.L.inchallenge = false}
        },
        99991: {
            name: "Rooms layer (BROKEN)",
            challengeDescription: "This isnt even an incremental game anymore. Complete the rooms layer",
            rewardDescription: "Boost points by the amount of time you spend in the layerverse and unlock more stuff",
            goalDescription: "1000 Prestinerator points",
            canComplete: function() {return player.PG.points.gte(1000)},
            unlocked() {return hasChallenge("L",14)},
            rewardEffect() {
                return new Decimal(player.L.resetTime).pow(0.1).add(1)
            },
            rewardDisplay() { return format(challengeEffect(this.layer, this.id))+"x" },
            onEnter() {player.L.inchallenge = true
                roomslockerlistrng()
            },
            onExit() {return player.L.inchallenge = false}
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
            title: "Time saving upgrade",
            description: "Always start with 1e9 money generated per second",
            cost: new Decimal(1),
            unlocked() {return hasUpgrade("L",11)},
        },
        21: {
            title: "Money boosts ALL",
            description: "Money boosts points, dressy points, super and hyper",
            cost: new Decimal(1),
            unlocked() {return hasChallenge("L",15)},
            effect() {
                return player.M.points.add(1).pow(0.01)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        22: {
            title: "Points boost ALLish",
            description: "Points boosts points, dressy points, super and hyper",
            cost: new Decimal(2),
            unlocked() {return hasChallenge("L",15)},
            effect() {
                return player.M.points.add(1).pow(0.05)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        23: {
            title: "Op maybe",
            description: "Generate 5% hyper",
            cost: new Decimal(3),
            unlocked() {return hasChallenge("L",15)},
        },
        24: {
            title: "Big number haha",
            description: "1000x points",
            cost: new Decimal(5),
            unlocked() {return hasChallenge("L",15)},
        },
        25: {
            title: "Unrealistic pricing",
            description: "The last money upgrade on row 5 costs 1000x less",
            cost: new Decimal(5),
            onPurchase() {
            },
            unlocked() {return hasChallenge("L",15)},
        },
        26: {
            title: "You probably need this for the generator challenge",
            description: "While in a challenge, 1e5x points and boost points by points",
            cost: new Decimal(6),
            effect() {
                return player.points.pow(0.3).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        31: {
            title: "Awesome price scaling",
            description: "The layer exponent is subtracted by 1",
            cost: new Decimal(6),
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
                    function() {
                        if (player.L.inchallenge == false) {
                            return "prestige-button"
                        }
                        else {
                            return "blank"
                        }
                    },
                    "blank",
                    "blank",
                    "upgrades",
                    "buyables"
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
                    ["challenges",[1]],
                ],
            },
            "Extra Challenges": {
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
                    ["challenges",[9999]]
                ],
                unlocked() {return hasChallenge("L",16)}
            },
        },

        
})