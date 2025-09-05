addLayer("G", {
    name: "Generator", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        genpoints: new Decimal(0),
        points: new Decimal(0),

        gen1: new Decimal(0),
        gen1cost: new Decimal(1000),
        gen1collect: new Decimal(0),
        gen1costscale: new Decimal(2),

        gen2: new Decimal(0),
        gen2cost: new Decimal(100),
        gen2collect: new Decimal(0),
        gen2costscale: new Decimal(1.5)
        

    }},
    generate() {
        player.G.gen1collect = player.G.gen1collect.add(player.G.gen1.div(100))
        player.G.gen2collect = player.G.gen2collect.add(player.G.gen2.times(3).div(90))
    },
    layerShown(){
        let visible = false
        if (inChallenge("L",16)) visible = true
        if (!inChallenge("L",16)) visible = false
        return visible
    },
    color: "#FFFFFF",
    requires: new Decimal(100),
    resource: "Generator points", // Name of prestige currency
    baseResource: "Points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: new Decimal(5), // Prestige currency exponent
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
    clickables: {
        11: {
            display: function() {return "<h2><b>Generator 1</b></h2><br><h3>You have "+player.G.gen1+" Generators of this type<br>Costs: "+format(player.G.gen1cost)+" points"},
            description: function() {return "You have "+player.G.gen1+" Generators"},
            canClick() {
                if (player.points.gte(player.G.gen1cost)) {
                    return true
                }
                else {
                    return false
                }
            },
            onClick() { 
                if (player.points.gte(player.G.gen1cost)) {
                    player.G.gen1 = player.G.gen1.add(1)
                    player.points = player.points.sub(player.G.gen1cost)
                    player.G.gen1cost = player.G.gen1cost.times(player.G.gen1costscale)
                }
                else {

                }
            },
            style() {return {
                'width': '200px',
                'height': '120px',
            }},
        },
        12: {
            display: function() {return "<h2><b>Collect Gen 1 points</b></h2><br><h3>You will get "+format(player.G.gen1collect.floor())+" Gen points"},
            canClick() {
                if (player.G.gen1collect.floor().gte(1)) {
                    return true
                }
                else {
                    return false
                }
            },
            onClick() {
                if (player.G.gen1collect.floor().gte(1)) {
                    player.G.genpoints = player.G.genpoints.add(player.G.gen1collect)
                    player.G.gen1collect = new Decimal(0)
                }
            },
            style() {return {
                'width': '200px',
                'height': '120px',
            }},
        },

        21: {
            display: function() {return "<h2><b>Generator 2</b></h2><br><h3>You have "+player.G.gen2+" Generators of this type<br>Costs: "+format(player.G.gen2cost)+" Generator points"},
            description: function() {return "You have "+player.G.gen2+" Generators"},
            canClick() {
                if (player.G.genpoints.gte(player.G.gen2cost)) {
                    return true
                }
                else {
                    return false
                }
            },
            onClick() { 
                if (player.G.genpoints.gte(player.G.gen2cost)) {
                    player.G.gen2 = player.G.gen2.add(1)
                    player.G.genpoints = player.G.genpoints.sub(player.G.gen2cost)
                    player.G.gen2cost = player.G.gen2cost.times(player.G.gen2costscale)
                }
                else {

                }
            },
            style() {return {
                'width': '200px',
                'height': '120px',
            }},
        },
        22: {
            display: function() {return "<h2><b>Collect Gen 2 points</b></h2><br><h3>You will get "+format(player.G.gen2collect.floor())+" Gen points"},
            canClick() {
                if (player.G.gen2collect.floor().gte(1)) {
                    return true
                }
                else {
                    return false
                }
            },
            onClick() {
                if (player.G.gen2collect.floor().gte(1)) {
                    player.G.genpoints = player.G.genpoints.add(player.G.gen2collect)
                    player.G.gen2collect = new Decimal(0)
                }
            },
            style() {return {
                'width': '200px',
                'height': '120px',
            }},
        },
    },
    tabFormat: {
        "Generators": {
            content: [
                ["display-text",
                    function(){
                        return "You have <h2><span style='color:rgba(255, 255, 255, 1); text-shadow: 0px 0px 10px rgba(255, 230, 230, 1); font-family: Lucida Console, Courier New, monospace'>"+ player.G.genpoints.floor() +"</span></h2> Generator points"
                    }
                ],
                ["display-text",
                    function(){
                        return "You have "+ format(player.points) +" points "
                    }
                ],
                    "blank",
                    "clickables",
                    "blank",
                    "blank",
                ],
            },
    },
})