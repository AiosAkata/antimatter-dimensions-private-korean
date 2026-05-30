import { DC } from "../../constants";

export const alchemyResources = {
  // T1 resources (Non-Effarig "base" resources)
  "power": {
    id: ALCHEMY_RESOURCE.POWER,
    name: "Power",
    symbol: "Ω",
    isBaseResource: true,
    effect: amount => 1 + amount / 200000,
    tier: 1,
    uiOrder: 1,
    unlockedAt: 2,
    description: "반물질 차원에 거듭제곱을 제공합니다.",
    formatEffect: value => `Antimatter Dimension multipliers ${formatPow(value, 4, 4)}`
  },
  "infinity": {
    id: ALCHEMY_RESOURCE.INFINITY,
    name: "Infinity",
    symbol: "∞",
    isBaseResource: true,
    effect: amount => 1 + amount / 200000,
    tier: 1,
    uiOrder: 2,
    unlockedAt: 3,
    description: "무한 차원에 거듭제곱을 제공합니다.",
    formatEffect: value => `Infinity Dimension multipliers ${formatPow(value, 4, 4)}`
  },
  "time": {
    id: ALCHEMY_RESOURCE.TIME,
    name: "Time",
    symbol: "Δ",
    isBaseResource: true,
    effect: amount => 1 + amount / 200000,
    tier: 1,
    uiOrder: 3,
    unlockedAt: 4,
    description: "시간 차원에 거듭제곱을 제공합니다.",
    formatEffect: value => `Time Dimension multipliers ${formatPow(value, 4, 4)}`
  },
  "replication": {
    id: ALCHEMY_RESOURCE.REPLICATION,
    name: "Replication",
    symbol: "Ξ",
    isBaseResource: true,
    effect: amount => Decimal.pow10(amount / 1000),
    tier: 1,
    uiOrder: 4,
    unlockedAt: 5,
    description: `복제 속도를 증가시킵니다.`,
    formatEffect: value => `Replication speed is increased by ${formatX(value, 2, 2)}`
  },
  "dilation": {
    id: ALCHEMY_RESOURCE.DILATION,
    name: "Dilation",
    symbol: "Ψ",
    isBaseResource: true,
    effect: amount => Decimal.pow10(amount / 2000),
    tier: 1,
    uiOrder: 5,
    unlockedAt: 6,
    description: "팽창된 시간 생산을 증가시킵니다.",
    formatEffect: value => `Dilated Time production is increased by ${formatX(value, 2, 2)}`
  },

  // T2 resources (combinations of pairs of T1 resources)
  "cardinality": {
    id: ALCHEMY_RESOURCE.CARDINALITY,
    name: "Cardinality",
    symbol: "α",
    isBaseResource: false,
    effect: amount => 1 + 0.2 / (1 + amount / 20000),
    tier: 2,
    uiOrder: 3,
    unlockedAt: 8,
    description: "상한선 이상일 때 복제체 속도 저하를 줄입니다.",
    formatEffect: value => `Replicanti interval increases slower ${formatX(1.2, 1, 1)} ➜
      ${formatX(value, 4, 4)} per ${format(Number.MAX_VALUE, 2)}`,
    reagents: [
      {
        resource: ALCHEMY_RESOURCE.TIME,
        amount: 8
      },
      {
        resource: ALCHEMY_RESOURCE.REPLICATION,
        amount: 7
      }
    ]
  },
  "eternity": {
    id: ALCHEMY_RESOURCE.ETERNITY,
    name: "Eternity",
    symbol: "τ",
    isBaseResource: false,
    effect: amount => 1 + amount / 15000,
    tier: 2,
    uiOrder: 2,
    unlockedAt: 9,
    description: "영원 생성에 거듭제곱을 제공합니다.",
    formatEffect: value => `Eternity generation ${formatPow(value, 4, 4)}`,
    reagents: [
      {
        resource: ALCHEMY_RESOURCE.TIME,
        amount: 11
      },
      {
        resource: ALCHEMY_RESOURCE.INFINITY,
        amount: 4
      }
    ]
  },
  "dimensionality": {
    id: ALCHEMY_RESOURCE.DIMENSIONALITY,
    name: "Dimensionality",
    symbol: "ρ",
    isBaseResource: false,
    effect: amount => Decimal.pow10(5 * amount),
    tier: 2,
    uiOrder: 1,
    unlockedAt: 10,
    description: "모든 차원에 큰 배수를 제공합니다.",
    formatEffect: value => `All Dimensions ${formatX(value)}`,
    reagents: [
      {
        resource: ALCHEMY_RESOURCE.POWER,
        amount: 10
      },
      {
        resource: ALCHEMY_RESOURCE.INFINITY,
        amount: 5
      }
    ]
  },
  "inflation": {
    id: ALCHEMY_RESOURCE.INFLATION,
    name: "Inflation",
    symbol: "λ",
    isBaseResource: false,
    effect: amount => Decimal.pow10(6e9 - 3e5 * amount),
    tier: 2,
    uiOrder: 5,
    unlockedAt: 11,
    description: "매우 큰 배수에 추가 거듭제곱을 제공합니다.",
    formatEffect: value => `All Antimatter Dimension multipliers are ${formatPow(1.05, 2, 2)}
      if they are above ${format(value)} `,
    reagents: [
      {
        resource: ALCHEMY_RESOURCE.POWER,
        amount: 9
      },
      {
        resource: ALCHEMY_RESOURCE.DILATION,
        amount: 6
      }
    ]
  },
  "alternation": {
    id: ALCHEMY_RESOURCE.ALTERNATION,
    name: "Alternation",
    symbol: "ω",
    isBaseResource: false,
    effect: amount => amount / 200000,
    tier: 2,
    uiOrder: 4,
    unlockedAt: 12,
    description: "복제체에 기반한 타키온 갤럭시의 강도를 증가시킵니다.",
    formatEffect: value => `Tachyon Galaxies are ${formatPercents(value, 2, 2)} stronger
      per ${format(DC.E1E6)} Replicanti`,
    reagents: [
      {
        resource: ALCHEMY_RESOURCE.REPLICATION,
        amount: 5
      },
      {
        resource: ALCHEMY_RESOURCE.DILATION,
        amount: 10
      }
    ]
  },

  // T3 resources (Effarig and conbinations of T1/T2 with Effarig)
  "effarig": {
    id: ALCHEMY_RESOURCE.EFFARIG,
    name: "Effarig",
    symbol: "Ϙ",
    isBaseResource: true,
    effect: amount => Math.pow(10, amount / 2500),
    tier: 1,
    uiOrder: 1.5,
    unlockedAt: 7,
    description: "유물 파편 획득을 증가시킵니다.",
    formatEffect: value => `Relic Shard gain is multiplied ${formatX(value, 2, 2)}`
  },
  "synergism": {
    id: ALCHEMY_RESOURCE.SYNERGISM,
    name: "Synergism",
    symbol: "π",
    isBaseResource: false,
    effect: amount => {
      const rawValue = 0.3 + 1.3 * Math.sqrt(amount / 25000);
      return Achievement(175).isUnlocked ? rawValue : Math.min(rawValue, 1);
    },
    tier: 3,
    uiOrder: 2,
    unlockedAt: 13,
    description: "연금술 반응의 수확량을 증가시킵니다.",
    formatEffect(value) {
      return `Alchemy Reaction efficiency ${formatPercents(0.3)} ➜ ${formatPercents(value, 2, 2)}
        ${(!Achievement(175).isUnlocked && value >= 1) ? " (Capped)" : ""}`;
    },
    reagents: [
      {
        resource: ALCHEMY_RESOURCE.EFFARIG,
        amount: 3
      },
      {
        resource: ALCHEMY_RESOURCE.REPLICATION,
        amount: 16
      },
      {
        resource: ALCHEMY_RESOURCE.INFINITY,
        amount: 14
      }
    ]
  },
  "momentum": {
    id: ALCHEMY_RESOURCE.MOMENTUM,
    name: "Momentum",
    symbol: "μ",
    isBaseResource: false,
    effect: amount => 1 + amount / 125000,
    tier: 3,
    uiOrder: 3,
    unlockedAt: 15,
    description: "시간에 따라 영구적으로 증가하는 모든 차원에 거듭제곱을 제공합니다.",
    formatEffect: value => `All Dimensions ${formatPow(Ra.momentumValue, 4, 4)}, increasing by
      ${format(0.005 * Achievement(175).effectOrDefault(1), 3, 3)}
      per real-time hour after the resource is unlocked, up to a maximum of ${formatPow(value, 4, 4)}`,
    reagents: [
      {
        resource: ALCHEMY_RESOURCE.EFFARIG,
        amount: 11
      },
      {
        resource: ALCHEMY_RESOURCE.POWER,
        amount: 4
      },
      {
        resource: ALCHEMY_RESOURCE.TIME,
        amount: 20
      }
    ]
  },
  "decoherence": {
    id: ALCHEMY_RESOURCE.DECOHERENCE,
    name: "Decoherence",
    symbol: "ξ",
    isBaseResource: false,
    effect: amount => 0.15 * Math.sqrt(amount / 25000),
    tier: 3,
    uiOrder: 4,
    unlockedAt: 14,
    description: "정제 시 모든 기본 연금술 자원을 제공합니다.",
    formatEffect: value => `Refined Glyphs also give ${formatPercents(value, 2)} of their value ` +
      "to all other base resources",
    reagents: [
      {
        resource: ALCHEMY_RESOURCE.EFFARIG,
        amount: 13
      },
      {
        resource: ALCHEMY_RESOURCE.ALTERNATION,
        amount: 8
      }
    ]
  },

  // T4 resources (resources which feed directly into the final resource)
  "exponential": {
    id: ALCHEMY_RESOURCE.EXPONENTIAL,
    name: "Exponential",
    symbol: "Γ",
    isBaseResource: false,
    effect: amount => 10 * Math.pow(amount / 10000, 2),
    tier: 4,
    uiOrder: 2,
    unlockedAt: 18,
    description: "복제체에 기반한 무한 포인트를 곱합니다.",
    formatEffect: value => `Infinity Points multiplied by Replicanti${formatPow(value, 2, 3)}`,
    reagents: [
      {
        resource: ALCHEMY_RESOURCE.INFLATION,
        amount: 18
      },
      {
        resource: ALCHEMY_RESOURCE.SYNERGISM,
        amount: 3
      }
    ]
  },
  "force": {
    id: ALCHEMY_RESOURCE.FORCE,
    name: "Force",
    symbol: "Φ",
    isBaseResource: false,
    effect: amount => 5 * amount,
    tier: 4,
    uiOrder: 2,
    unlockedAt: 17,
    description: "현실 기계에 기반한 반물질 차원을 곱합니다.",
    formatEffect: value => `Multiply Antimatter Dimensions by Reality Machines${formatPow(value, 2, 2)}`,
    reagents: [
      {
        resource: ALCHEMY_RESOURCE.DIMENSIONALITY,
        amount: 7
      },
      {
        resource: ALCHEMY_RESOURCE.MOMENTUM,
        amount: 8
      }
    ]
  },
  "uncountability": {
    id: ALCHEMY_RESOURCE.UNCOUNTABILITY,
    name: "Uncountability",
    symbol: "Θ",
    isBaseResource: false,
    effect: amount => 160 * Math.sqrt(amount / 25000),
    tier: 4,
    uiOrder: 3,
    unlockedAt: 19,
    description: "수동적으로 현실과 특전 포인트를 생성합니다.",
    formatEffect: value => `Generate ${format(value, 2, 2)} Realities and Perk Points per second`,
    reagents: [
      {
        resource: ALCHEMY_RESOURCE.INFINITY,
        amount: 20
      },
      {
        resource: ALCHEMY_RESOURCE.EFFARIG,
        amount: 6
      },
      {
        resource: ALCHEMY_RESOURCE.CARDINALITY,
        amount: 16
      }
    ]
  },
  "boundless": {
    id: ALCHEMY_RESOURCE.BOUNDLESS,
    name: "Boundless",
    symbol: "Π",
    isBaseResource: false,
    effect: amount => amount / 80000,
    tier: 4,
    uiOrder: 1,
    unlockedAt: 20,
    description: "테서랙트를 더 강하게 만듭니다.",
    formatEffect: value => `Tesseracts are +${formatPercents(value, 2, 2)} stronger`,
    reagents: [
      {
        resource: ALCHEMY_RESOURCE.ETERNITY,
        amount: 13
      },
      {
        resource: ALCHEMY_RESOURCE.INFLATION,
        amount: 18
      }
    ]
  },
  "multiversal": {
    id: ALCHEMY_RESOURCE.MULTIVERSAL,
    name: "Multiversal",
    symbol: "Σ",
    isBaseResource: false,
    effect: amount => 32 * Math.pow(amount / 25000, 2),
    tier: 4,
    uiOrder: 5,
    unlockedAt: 16,
    description: "각 현실이 더 많은 현실을 시뮬레이션하도록 합니다.",
    formatEffect: value => `Each Reality simulates ${format(value, 2, 3)} additional Realities, giving all
      the same rewards as if it was amplified`,
    reagents: [
      {
        resource: ALCHEMY_RESOURCE.ALTERNATION,
        amount: 16
      },
      {
        resource: ALCHEMY_RESOURCE.DECOHERENCE,
        amount: 3
      }
    ]
  },
  "unpredictability": {
    id: ALCHEMY_RESOURCE.UNPREDICTABILITY,
    name: "Unpredictability",
    symbol: "Λ",
    isBaseResource: false,
    // Somewhat ugly number to make this show 70.00% at cap
    effect: amount => amount / (10714.28 + amount),
    tier: 4,
    uiOrder: 4,
    unlockedAt: 21,
    description: "각 연금술 반응이 두 번 발생할 기회를 만듭니다.",
    formatEffect: value => `Any Alchemy Reaction has a ${formatPercents(value, 2, 2)}
      chance of triggering again`,
    reagents: [
      {
        resource: ALCHEMY_RESOURCE.EFFARIG,
        amount: 15
      },
      {
        resource: ALCHEMY_RESOURCE.DECOHERENCE,
        amount: 3
      },
      {
        resource: ALCHEMY_RESOURCE.SYNERGISM,
        amount: 10
      }
    ]
  },

  // T5 (Reality)
  "reality": {
    id: ALCHEMY_RESOURCE.REALITY,
    name: "Reality",
    symbol: "Ϟ",
    isBaseResource: false,
    effect: amount => Math.floor(amount),
    tier: 5,
    unlockedAt: 25,
    description: "소비하여 현실 글리프를 생성할 수 있습니다.",
    formatEffect: value => `Consume all Reality Resource to create a level ${formatInt(value)} Reality Glyph`,
    reagents: [
      {
        resource: ALCHEMY_RESOURCE.EXPONENTIAL,
        amount: 1
      },
      {
        resource: ALCHEMY_RESOURCE.FORCE,
        amount: 1
      },
      {
        resource: ALCHEMY_RESOURCE.UNCOUNTABILITY,
        amount: 1
      },
      {
        resource: ALCHEMY_RESOURCE.BOUNDLESS,
        amount: 1
      },
      {
        resource: ALCHEMY_RESOURCE.MULTIVERSAL,
        amount: 1
      },
      {
        resource: ALCHEMY_RESOURCE.UNPREDICTABILITY,
        amount: 1
      }
    ]
  },
};
