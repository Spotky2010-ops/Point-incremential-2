addLayer("p", {
    name: "The Point Tree",
    symbol: "L",
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        autoPrestige: false,
        buyAll: false,
    }},
    color: "#4BDC13",
    requires: new Decimal(10),
    resource: "prestige points",
    baseResource: "points",
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.5,
    gainMult() {
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
    gainExp() { return new Decimal(1) },
    row: 0,
    hotkeys: [
        {key: "p", description: "Reset for Layer 1", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    update(diff) {
        if (player[this.layer].autoPrestige && canReset(this.layer)) doReset(this.layer)

        if (player[this.layer].buyAll) {
            for (let i = 11; i <= 20; i++) {
                if (!hasUpgrade(this.layer, i) && canAffordUpgrade(this.layer, i)) {
                    buyUpgrade(this.layer, i)
                }
            }
        }
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        "blank",
        ["display-text", function() {
            const total = Object.keys(player.p.achievements || {}).length
            const max = 5
            return `Achievements: ${total}/${max}`
        }],
        "blank",
        "achievements",
        "blank",
        "upgrades",
        "blank",
        "clickables",
    ],
    clickables: {
        11: {
            display() {
                return player.p.buyAll ? "Buy All: ON" : "Buy All: OFF"
            },
            onClick() {
                player.p.buyAll = !player.p.buyAll
            },
            canClick() { return true },
        },
        12: {
            display() {
                return player.p.autoPrestige ? "Auto Prestige: ON" : "Auto Prestige: OFF"
            },
            onClick() {
                player.p.autoPrestige = !player.p.autoPrestige
            },
            canClick() { return true },
        },
    },
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
