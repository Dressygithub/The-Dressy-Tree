addLayer("De", {
    name: "Dev panel", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Dev", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
                points: new Decimal(0),
    }},
    color: "#ffe000",
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: "side", // Row the layer is in on the tree (0 is the first row)
    requires: new Decimal("1F100"), // Can be a function that takes requirement increases into account
    resource: "Achievement points", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    clickables: {
        10: {
            title: "Custom",
            canClick() {return true},
            onClick() {return addPoints(prompt(),prompt())},
        }, 
        11: {
            title: "+1000 dressy points",
            canClick() {return true},
            onClick() {return addPoints('D',1e3)}
        },
        12: {
            title: "Double dressy points",
            canClick() {return true},
            onClick() {return addPoints('D',player.D.points)}
        },
        13: {
            title: "Reset dressy points",
            canClick() {return true},
            onClick() {return addPoints('D',player.D.points.sub(player.D.points.times(2)))}
        },
        14: {
            title: "25+ super",
            canClick() {return true},
            onClick() {return addPoints('S',25)}
        },
        15: {
            title: "Double super",
            canClick() {return true},
            onClick() {return addPoints('S',player.S.points)}
        },
        16: {
            title: "Reset super",
            canClick() {return true},
            onClick() {return addPoints('S',player.S.points.sub(player.S.points.times(2)))}
        },
        21: {
            title: "150+ hyper",
            canClick() {return true},
            onClick() {return addPoints('H',150)}
        },
        22: {
            title: "Double hyper",
            canClick() {return true},
            onClick() {return addPoints('H',player.H.points)}
        },
        23: {
            title: "Reset hyper",
            canClick() {return true},
            onClick() {return addPoints('H',player.H.points.sub(player.H.points.times(2)))}
        },
        24: {
            title: "1+ money",
            canClick() {return true},
            onClick() {return addPoints('M',1)}
        },
        25: {
            title: "Double money",
            canClick() {return true},
            onClick() {return addPoints('M',player.M.points)}
        },
        26: {
            title: "Reset money",
            canClick() {return true},
            onClick() {return addPoints('M',player.M.points.sub(player.M.points.times(2)))}
        },
        31: {
            title: "1+ MA",
            canClick() {return true},
            onClick() {return addPoints('Ma',1)}
        },
        32: {
            title: "Double MA",
            canClick() {return true},
            onClick() {return addPoints('Ma',player.Ma.points)}
        },
        33: {
            title: "Reset MA",
            canClick() {return true},
            onClick() {return addPoints('Ma',player.Ma.points.sub(player.Ma.points.times(2)))}
        },    
    },
})
