addLayer("G", {
    name: "Generator", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        genpoints: new Decimal(0),
        points: new Decimal(0),

        gen1: new Decimal(0),

        gen1collect: new Decimal(0)
        

    }},
    generate() {
        
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
            onClick() {return "something"},
            style() {return {
                'width': '200px',
                'height': '120px',
            }},
        },
        12: {
            display: function() {return "<h2><b>Collect Gen 1 points</b></h2><br><h3>You will get "+player.G.gen1+" Gen points"},
            description: function() {return "You have "+player.G.gen1+" Generators"},
            canClick() {return true},
            onClick() {return "something"},
            style() {return {
                'width': '200px',
                'height': '120px',
            }},
        },
    },
    tabFormat: {
        "Generators": {
            content: [
                "main-display",
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