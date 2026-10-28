addLayer("p", {
    name: "The Point Tree", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)

        if (hasUpgrade("p", 11)) mult = mult.times(2)
        if (hasUpgrade("p", 12)) mult = mult.times(2)
        if (hasUpgrade("p", 13)) mult = mult.times(2)
        if (hasUpgrade("p", 14)) mult = mult.times(2)
        if (hasUpgrade("p", 15)) mult = mult.times(2)
        if (hasUpgrade("p", 16)) mult = mult.times(2)
        if (hasUpgrade("p", 17)) mult = mult.times(2)
        if (hasUpgrade("p", 18)) mult = mult.times(2)
        if (hasUpgrade("p", 19)) mult = mult.times(2)
        if (hasUpgrade("p", 20)) mult = mult.times(3)

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "I: Reset for Layer 1", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Point Booster I",
            description: "Double point gain.",
            cost: new Decimal(1),
            effect() { return new Decimal(2) },
        },
        12: {
            title: "Point Booster II",
            description: "Double point gain again.",
            cost: new Decimal(3),
            effect() { return new Decimal(2) },
        },
        13: {
            title: "Point Booster III",
            description: "Double point gain once more.",
            cost: new Decimal(6),
            effect() { return new Decimal(2) },
        },
        14: {
            title: "Point Booster IV",
            description: "More efficiency for point gains.",
            cost: new Decimal(12),
            effect() { return new Decimal(2) },
        },
        15: {
            title: "Point Booster V",
            description: "Boost point generation further.",
            cost: new Decimal(24),
            effect() { return new Decimal(2) },
        },
        16: {
            title: "Point Booster VI",
            description: "A stronger multiplier for points.",
            cost: new Decimal(48),
            effect() { return new Decimal(2) },
        },
        17: {
            title: "Point Booster VII",
            description: "A serious points production boost.",
            cost: new Decimal(96),
            effect() { return new Decimal(2) },
        },
        18: {
            title: "Point Booster VIII",
            description: "Point generation is now greatly amplified.",
            cost: new Decimal(192),
            effect() { return new Decimal(2) },
        },
        19: {
            title: "Point Booster IX",
            description: "Keep pushing toward an efficient economy.",
            cost: new Decimal(384),
            effect() { return new Decimal(2) },
        },
        20: {
            title: "Point Booster X",
            description: "Triple all point gains from boosters.",
            cost: new Decimal(768),
            effect() { return new Decimal(3) },
        },
    },
    achievements: {
        11: {
            name: "First Step",
            done() { return player.points.gte(10) },
            tooltip: "Reach 10 total points.",
        },
        12: {
            name: "Rising Momentum",
            done() { return player.points.gte(50) },
            tooltip: "Reach 50 total points.",
        },
        13: {
            name: "The Grind Begins",
            done() { return player.points.gte(200) },
            tooltip: "Reach 200 total points.",
        },
        14: {
            name: "Prestige Power",
            done() { return player.p.points.gte(10) },
            tooltip: "Earn 10 prestige points.",
        },
        15: {
            name: "Point Monarch",
            done() { return player.p.points.gte(50) },
            tooltip: "Earn 50 prestige points.",
        },
    },
})
