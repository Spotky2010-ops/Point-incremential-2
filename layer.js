function getPrestigeMilestoneMult() {
    let mult = new Decimal(1)

    if (player.p.points.gte(1)) mult = mult.times(2)
    if (player.p.points.gte(10)) mult = mult.times(2)
    if (player.p.points.gte(25)) mult = mult.times(3)
    if (player.p.points.gte(50)) mult = mult.times(3)
    if (player.p.points.gte(100)) mult = mult.times(5)

    return mult
}

addLayer("p", {
    name: "The Point Tree",
    symbol: "L",
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        autoPrestige: false,
        buyAll: false,
        autoPrestigeTarget: new Decimal(10),
    }},
    color: "#4BDC13",
    requires: new Decimal(10),
    resource: "prestige points",
    baseResource: "points",
    baseAmount() { return player.points },
    type: "normal",
    exponent: 0.5,
    gainMult() {
        let mult = getPrestigeMilestoneMult()

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
        if (hasUpgrade("p", 21)) mult = mult.times(2)
        if (hasUpgrade("p", 22)) mult = mult.times(2)
        if (hasUpgrade("p", 23)) mult = mult.times(3)
        if (hasUpgrade("p", 24)) mult = mult.times(2)
        if (hasUpgrade("p", 25)) mult = mult.times(5)

        return mult
    },
    gainExp() { return new Decimal(1) },
    row: 0,
    hotkeys: [
        {key: "p", description: "Reset for Layer 1", onPress(){ if (canReset(this.layer)) doReset(this.layer) }},
    ],
    layerShown() { return true },
    update(diff) {
        if (player[this.layer].autoPrestige && player.points.gte(player[this.layer].autoPrestigeTarget)) {
            doReset(this.layer)
        }

        if (player[this.layer].buyAll) {
            const costMap = {
                11: new Decimal(1),
                12: new Decimal(3),
                13: new Decimal(8),
                14: new Decimal(18),
                15: new Decimal(40),
                16: new Decimal(90),
                17: new Decimal(200),
                18: new Decimal(440),
                19: new Decimal(960),
                20: new Decimal(2100),
                21: new Decimal(4200),
                22: new Decimal(9000),
                23: new Decimal(18000),
                24: new Decimal(36000),
                25: new Decimal(72000),
            }

            for (let i = 11; i <= 25; i++) {
                if (!hasUpgrade(this.layer, i) && player[this.layer].points.gte(costMap[i])) {
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
            return `Auto prestige: ${player.p.autoPrestige ? "ON" : "OFF"} | Target: ${format(player.p.autoPrestigeTarget)} | Buy All: ${player.p.buyAll ? "ON" : "OFF"}`
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
            display() { return player.p.buyAll ? "Buy All: ON" : "Buy All: OFF" },
            onClick() { player.p.buyAll = !player.p.buyAll },
            canClick() { return true },
        },
        12: {
            display() { return player.p.autoPrestige ? "Auto Prestige: ON" : "Auto Prestige: OFF" },
            onClick() { player.p.autoPrestige = !player.p.autoPrestige },
            canClick() { return true },
        },
        13: {
            display() { return "Increase Target" },
            onClick() {
                player.p.autoPrestigeTarget = player.p.autoPrestigeTarget.times(2).max(new Decimal(10))
            },
            canClick() { return true },
        },
        14: {
            display() { return "Decrease Target" },
            onClick() {
                player.p.autoPrestigeTarget = player.p.autoPrestigeTarget.div(2).max(new Decimal(10))
            },
            canClick() { return true },
        },
    },
    milestones: {
        1: {
            requirementDescription: "1 prestige point",
            effectDescription: "x2 point gain",
            done() { return player.p.points.gte(1) },
        },
        2: {
            requirementDescription: "10 prestige points",
            effectDescription: "x4 total point gain",
            done() { return player.p.points.gte(10) },
        },
        3: {
            requirementDescription: "25 prestige points",
            effectDescription: "x12 total point gain",
            done() { return player.p.points.gte(25) },
        },
        4: {
            requirementDescription: "50 prestige points",
            effectDescription: "x36 total point gain",
            done() { return player.p.points.gte(50) },
        },
        5: {
            requirementDescription: "100 prestige points",
            effectDescription: "x180 total point gain",
            done() { return player.p.points.gte(100) },
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
            cost: new Decimal(8),
            effect() { return new Decimal(2) },
        },
        14: {
            title: "Point Booster IV",
            description: "More efficiency for point gains.",
            cost: new Decimal(18),
            effect() { return new Decimal(2) },
        },
        15: {
            title: "Point Booster V",
            description: "Boost point generation further.",
            cost: new Decimal(40),
            effect() { return new Decimal(2) },
        },
        16: {
            title: "Point Booster VI",
            description: "A stronger multiplier for points.",
            cost: new Decimal(90),
            effect() { return new Decimal(2) },
        },
        17: {
            title: "Point Booster VII",
            description: "A serious points production boost.",
            cost: new Decimal(200),
            effect() { return new Decimal(2) },
        },
        18: {
            title: "Point Booster VIII",
            description: "Point generation is now greatly amplified.",
            cost: new Decimal(440),
            effect() { return new Decimal(2) },
        },
        19: {
            title: "Point Booster IX",
            description: "Keep pushing toward an efficient economy.",
            cost: new Decimal(960),
            effect() { return new Decimal(2) },
        },
        20: {
            title: "Point Booster X",
            description: "Triple all point gains from boosters.",
            cost: new Decimal(2100),
            effect() { return new Decimal(3) },
        },
        21: {
            title: "Prestige Upgrade I",
            description: "Double prestige gains and all point scaling.",
            cost: new Decimal(4200),
            effect() { return new Decimal(2) },
        },
        22: {
            title: "Prestige Upgrade II",
            description: "Add a powerful amplifier to all prestige rewards.",
            cost: new Decimal(9000),
            effect() { return new Decimal(2) },
        },
        23: {
            title: "Prestige Upgrade III",
            description: "Triple the effect of prestige growth.",
            cost: new Decimal(18000),
            effect() { return new Decimal(3) },
        },
        24: {
            title: "Prestige Upgrade IV",
            description: "Furthers the multiplier behind prestige power.",
            cost: new Decimal(36000),
            effect() { return new Decimal(2) },
        },
        25: {
            title: "Prestige Upgrade V",
            description: "Massively boosts prestige efficiency and late-game grind.",
            cost: new Decimal(72000),
            effect() { return new Decimal(5) },
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
