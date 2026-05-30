import { DC } from "../../constants";

function dimInfinityMult() {
  return Currency.infinitiesTotal.value.times(0.2).plus(1);
}
function chargedDimInfinityMult() {
  return 1 + Math.log10(Math.max(1, Currency.infinitiesTotal.value.pLog10())) * Math.sqrt(Ra.pets.teresa.level) / 150;
}

export const infinityUpgrades = {
  totalTimeMult: {
    id: "timeMult",
    cost: 1,
    description: "반물질 차원이 플레이 시간을 기반으로 한 배율을 획득합니다",
    effect: () => Math.pow(Time.totalTimePlayed.totalMinutes / 2, 0.15),
    formatEffect: value => formatX(value, 2, 2),
    charged: {
      description: "반물질 차원이 플레이 시간과 테레사 레벨을 기반으로 한 파워 효과를 획득합니다",
      effect: () => 1 +
        Math.log10(Math.log10(Time.totalTimePlayed.totalMilliseconds)) *
        Math.pow(Ra.pets.teresa.level, 0.5) / 150,
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  dim18mult: {
    id: "18Mult",
    cost: 1,
    checkRequirement: () => InfinityUpgrade.totalTimeMult.isBought,
    description: "1번째와 8번째 반물질 차원이 무한을 기반으로 한 배율을 획득합니다",
    effect: () => dimInfinityMult(),
    formatEffect: value => formatX(value, 1, 1),
    charged: {
      description: "1번째와 8번째 반물질 차원이 무한과 테레사 레벨을 기반으로 한 파워 효과를 획득합니다",
      effect: () => chargedDimInfinityMult(),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  dim27mult: {
    id: "27Mult",
    cost: 1,
    checkRequirement: () => InfinityUpgrade.buy10Mult.isBought,
    description: "2번째와 7번째 반물질 차원이 무한을 기반으로 한 배율을 획득합니다",
    effect: () => dimInfinityMult(),
    formatEffect: value => formatX(value, 1, 1),
    charged: {
      description: "2번째와 7번째 반물질 차원이 무한과 테레사 레벨을 기반으로 한 파워 효과를 획득합니다",
      effect: () => chargedDimInfinityMult(),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  dim36mult: {
    id: "36Mult",
    cost: 1,
    checkRequirement: () => InfinityUpgrade.dim18mult.isBought,
    description: "3번째와 6번째 반물질 차원이 무한을 기반으로 한 배율을 획득합니다",
    effect: () => dimInfinityMult(),
    formatEffect: value => formatX(value, 1, 1),
    charged: {
      description: "3번째와 6번째 반물질 차원이 무한과 테레사 레벨을 기반으로 한 파워 효과를 획득합니다",
      effect: () => chargedDimInfinityMult(),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  dim45mult: {
    id: "45Mult",
    cost: 1,
    checkRequirement: () => InfinityUpgrade.dim27mult.isBought,
    description: "4번째와 5번째 반물질 차원이 무한을 기반으로 한 배율을 획득합니다",
    effect: () => dimInfinityMult(),
    formatEffect: value => formatX(value, 1, 1),
    charged: {
      description: "4번째와 5번째 반물질 차원이 무한과 테레사 레벨을 기반으로 한 파워 효과를 획득합니다",
      effect: () => chargedDimInfinityMult(),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  resetBoost: {
    id: "resetBoost",
    cost: 1,
    checkRequirement: () => InfinityUpgrade.dim36mult.isBought,
    description: () =>
      `차원 부스트와 반물질 은하에 필요한 차원의 수를 ${formatInt(9)}만큼 감소시킵니다`,
    effect: 9,
    charged: {
      description: () => "차원 부스트 요구치를 테레사 레벨을 기반으로 감소시킵니다",
      effect: () => 1 / (1 + Math.sqrt(Ra.pets.teresa.level) / 10),
      formatEffect: value => `${formatX(value, 4, 4)}`
    }
  },
  buy10Mult: {
    id: "dimMult",
    cost: 1,
    description: () => `${formatInt(10)}개의 반물질 차원을 구입할 때의 배율을 증가시킵니다`,
    effect: () => 1.1,
    formatEffect: () => `${formatX(2, 0, 1)} ➜ ${formatX(2.2, 0, 1)}`,
    charged: {
      description: () => `${formatInt(10)}개의 반물질 차원을 구입할 때의 배율이 ` +
        "테레사 레벨을 기반으로 한 파워 효과를 획득합니다",
      effect: () => 1 + Ra.pets.teresa.level / 200,
      formatEffect: value => formatPow(value, 3, 3)
    }
  },
  galaxyBoost: {
    id: "galaxyBoost",
    cost: 2,
    checkRequirement: () => InfinityUpgrade.dim45mult.isBought,
    description: "모든 은하가 2배 더 강해집니다",
    effect: 2,
    charged: {
      description: "모든 은하가 테레사 레벨을 기반으로 더 강해집니다",
      effect: () => 2 + Math.sqrt(Ra.pets.teresa.level) / 100,
      formatEffect: value => `+${formatPercents(value - 1)}`
    }
  },
  thisInfinityTimeMult: {
    id: "timeMult2",
    cost: 3,
    description: "반물질 차원이 현재 무한에 소비한 시간을 기반으로 한 배율을 획득합니다",
    effect: () => Decimal.max(Math.pow(Time.thisInfinity.totalMinutes / 4, 0.25), 1),
    formatEffect: value => formatX(value, 2, 2),
    charged: {
      description:
        "반물질 차원이 현재 무한에 소비한 시간과 테레사 레벨을 기반으로 한 파워 효과를 획득합니다",
      effect: () => 1 +
        Math.log10(Math.log10(Time.thisInfinity.totalMilliseconds + 100)) *
        Math.sqrt(Ra.pets.teresa.level) / 150,
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  unspentIPMult: {
    id: "unspentBonus",
    cost: 5,
    checkRequirement: () => InfinityUpgrade.thisInfinityTimeMult.isBought,
    description: "1번째 반물질 차원에 대한 배율을 미사용 무한 포인트를 기반으로 합니다",
    effect: () => Currency.infinityPoints.value.dividedBy(2).pow(1.5).plus(1),
    formatEffect: value => formatX(value, 2, 2),
    charged: {
      description: "1번째 반물질 차원에 대한 배율을 미사용 무한 포인트를 기반으로 하며, 테레사 레벨로 강화됩니다",
      effect: () => Currency.infinityPoints.value.dividedBy(2).pow(Math.sqrt(Ra.pets.teresa.level) * 1.5).plus(1),
      formatEffect: value => formatX(value, 2, 2)
    }
  },
  dimboostMult: {
    id: "resetMult",
    cost: 7,
    checkRequirement: () => InfinityUpgrade.unspentIPMult.isBought,
    description: "차원 부스트 배율을 증가시킵니다",
    effect: () => 2.5,
    formatEffect: () => `${formatX(2, 0, 1)} ➜ ${formatX(2.5, 0, 1)}`,
    charged: {
      description: "차원 부스트 배율이 테레사 레벨을 기반으로 한 파워 효과를 획득합니다",
      effect: () => 1 + Ra.pets.teresa.level / 200,
      formatEffect: value => formatPow(value, 3, 3)
    }
  },
  ipGen: {
    id: "passiveGen",
    cost: 10,
    checkRequirement: () => InfinityUpgrade.dimboostMult.isBought,
    description: () => `가장 빠른 무한보다 ${formatInt(10)}배 느리게 수동으로 무한 포인트를 생성합니다`,
    // Cutting corners: this is not actual effect, but it is totalIPMult that is displyed on upgrade
    effect: () => (Teresa.isRunning || V.isRunning || Pelle.isDoomed ? DC.D0 : GameCache.totalIPMult.value),
    formatEffect: value => {
      if (Teresa.isRunning || V.isRunning) return "Disabled in this reality";
      if (Pelle.isDoomed) return "Disabled";
      if (player.records.bestInfinity.time >= 999999999999) return "Too slow to generate";
      return `${format(value, 2)} every ${Time.bestInfinity.times(10).toStringShort()}`;
    },
    charged: {
      description: () =>
        `현실에서 획득한 양에 비례하여 실시간 초당 현실 기계를 획득하며,
        테레사 레벨에 따라 증가합니다`,
      effect: () => Math.pow(Ra.pets.teresa.level, 2) *
        Ra.unlocks.continuousTTBoost.effects.autoPrestige.effectOrDefault(1),
      formatEffect: value => formatX(value, 2, 1)
    }
  },
  skipReset1: {
    id: "skipReset1",
    cost: 20,
    description: () =>
      `매 리셋마다 ${formatInt(1)}개의 차원 부스트로 시작하여 5번째 반물질 차원을 자동으로 해금합니다`,
  },
  skipReset2: {
    id: "skipReset2",
    cost: 40,
    checkRequirement: () => InfinityUpgrade.skipReset1.isBought,
    description: () =>
      `매 리셋마다 ${formatInt(2)}개의 차원 부스트로 시작하여 6번째 반물질 차원을 자동으로 해금합니다`,
  },
  skipReset3: {
    id: "skipReset3",
    cost: 80,
    checkRequirement: () => InfinityUpgrade.skipReset2.isBought,
    description: () =>
      `매 리셋마다 ${formatInt(3)}개의 차원 부스트로 시작하여 7번째 반물질 차원을 자동으로 해금합니다`,
  },
  skipResetGalaxy: {
    id: "skipResetGalaxy",
    cost: 300,
    checkRequirement: () => InfinityUpgrade.skipReset3.isBought,
    description: () =>
      `매 리셋마다 ${formatInt(4)}개의 차원 부스트로 시작하여 8번째 반물질 차원을 자동으로 해금하며,
      반물질 은하 1개를 획득합니다`,
  },
  ipOffline: {
    id: "ipOffline",
    cost: 1000,
    checkRequirement: () => Achievement(41).isUnlocked,
    description: () => (player.options.offlineProgress
      ? `오프라인 중에만 최대 구매 없이 달성한 최고 IP/분의 ${formatPercents(0.5)}를 획득합니다`
      : "이 업그레이드는 오프라인 무한 포인트 생성을 제공하지만 오프라인 진행이 현재 비활성화되어 있습니다"),
    effect: () => (player.options.offlineProgress
      ? player.records.thisEternity.bestIPMsWithoutMaxAll.times(TimeSpan.fromMinutes(1).totalMilliseconds / 2)
      : DC.D0),
    isDisabled: () => !player.options.offlineProgress,
    formatEffect: value => `${format(value, 2, 2)} IP/min`,
  },
  ipMult: {
    id: "ipMult",
    cost: () => InfinityUpgrade.ipMult.cost,
    checkRequirement: () => Achievement(41).isUnlocked,
    costCap: DC.E6E6,
    costIncreaseThreshold: DC.E3E6,
    description: () => `모든 출처의 무한 포인트를 ${formatX(2)}로 배수합니다`,
    // Normally the multiplier caps at e993k or so with 3300000 purchases, but if the cost is capped then we just give
    // an extra e7k to make the multiplier look nice
    effect: () => (player.IPMultPurchases >= 3300000 ? DC.E1E6 : DC.D2.pow(player.IPMultPurchases)),
    cap: () => Effarig.eternityCap ?? DC.E1E6,
    formatEffect: value => formatX(value, 2, 2),
  }
};
