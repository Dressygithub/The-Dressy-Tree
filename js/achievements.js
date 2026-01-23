addLayer("A", {
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
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
    achievements: {
        11: {
            name: "The Beginning",
            done() {
                return (hasUpgrade('D', 11))
            },
            tooltip: "Get the first upgrade",
            unlocked() {return true},
            style() {return {"visibility": "visible",}}
        },
        12: {
            name: "Hundredare",
            done() {
                return (player.D.points.gte(100))
            },
            tooltip: "Get 100 dressy points",
            unlocked() {return true},
            style() {return {"visibility": "visible",}}
        },
        13: {
            name: "A new layer?",
            done() {
                return (layers.S.layerShown())
            },
            tooltip: "See the next layer",
            unlocked() {return true},
            style() {return {"visibility": "visible",}}
        },
        14: {
            name: "Super",
            done() {
                return (player.S.points.gte(1))
            },
            tooltip: "Get a super point",
            unlocked() {return true},
            style() {return {"visibility": "visible",}}
        },
        15: {
            name: "I wasn't challenged at all",
            done() {
                return (hasChallenge("S", 11))
            },
            tooltip: "Beat the first challenge",
            unlocked() {return true},
            style() {return {"visibility": "visible",}}
        },
        16: {
            name: "Hyper",
            done() {
                return (player.H.points.gte(1))
            },
            tooltip: "Get a hyper point",
            unlocked() {return true},
            style() {return {"visibility": "visible",}}
        },
        21: {
            name: "More!",
            done() {
                return (hasChallenge("H", 11))
            },
            tooltip: "Beat the second challenge",
            unlocked() {return true},
            style() {return {"visibility": "visible",}}
        },
    },
    tabFormat: {
        "Achievements": {
            content: [
                "blank",
                "blank",
                "achievements",
                "blank",
                "clickables",
                "blank",
            ],
        },
    },
    clickables: {
        11: {
            title: "Import time",
            canClick() {return true},
            onClick() {return importSave(player.saves.time)}
        },
        12: {
            title: "Import Space",
            canClick() {return true},
            onClick() {return importSave(player.saves.space)}
        },
        13: {
            title: "Import Generators",
            canClick() {return true},
            onClick() {return importSave(player.saves.gen)}
        },
    }
})
