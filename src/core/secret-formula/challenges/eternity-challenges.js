import { DC } from "../../constants";

const specialInfinityGlyphDisabledEffectText = () => (PelleRifts.chaos.milestones[1].canBeApplied
  ? "펠레의 무한 글리프의 특정 효과도 비활성화됩니다."
  : "");

export const eternityChallenges = [
  {
    id: 1,
    description: "시간 차원이 비활성화됩니다.",
    goal: DC.E1800,
    goalIncrease: DC.E200,
    reward: {
      description: "이 영원에서 소비한 시간을 기반으로 한 시간 차원 배율",
      effect: completions =>
        Decimal.pow(Math.max(player.records.thisEternity.time / 10, 0.9), 0.3 + (completions * 0.05)),
      formatEffect: value => formatX(value, 2, 1)
    },
    // These will get notation-formatted and scrambled between for the final goal
    scrambleText: ["1e2600", "1e201600"],
  },
  {
    id: 2,
    description: "무한 차원이 비활성화됩니다.",
    goal: DC.E975,
    pelleGoal: DC.E1750,
    goalIncrease: DC.E175,
    reward: {
      description: "무한 힘을 기반으로 한 1번째 무한 차원 배율",
      effect: completions => Currency.infinityPower.value.pow(1.5 / (700 - completions * 100)).clampMin(1),
      cap: DC.E100,
      formatEffect: value => formatX(value, 2, 1)
    }
  },
  {
    id: 3,
    description: "반물질 차원 5-8이 아무것도 생성하지 않습니다. 차원 희생이 비활성화됩니다.",
    goal: DC.E600,
    pelleGoal: DC.E925,
    goalIncrease: DC.E75,
    reward: {
      description: () => `${formatInt(10)}개의 반물질 차원을 구매하는 배율 증가`,
      effect: completions => completions * 0.72,
      formatEffect: value => `+${format(value, 2, 2)}`
    }
  },
  {
    id: 4,
    description: `모든 무한 배율과 생성기가 비활성화됩니다. 특정 무한 횟수 내에 목표를 달성해야 하거나 도전에 실패합니다.`,
    goal: DC.E2750,
    goalIncrease: DC.E550,
    restriction: completions => Math.max(16 - 4 * completions, 0),
    checkRestriction: restriction => Currency.infinities.lte(restriction),
    formatRestriction: restriction => (restriction === 0
      ? "무한 없이"
      : `${quantifyInt("무한", restriction)} 이하`),
    failedRestriction: "(더 이상 무한이 너무 많음)",
    reward: {
      description: "미사용 무한 포인트를 기반으로 한 무한 차원 배율",
      effect: completions => Currency.infinityPoints.value.pow(0.003 + completions * 0.002),
      cap: DC.E200,
      formatEffect: value => formatX(value, 2, 1)
    }
  },
  {
    id: 5,
    description: () => `반물질 갤럭시 비용 증가 스케일링이 즉시 시작됩니다 (일반적으로 ${formatInt(100)}
      갤럭시에서). 차원 부스트 비용 스케일링이 대폭 증가합니다.`,
    goal: DC.E750,
    pelleGoal: DC.E1400,
    goalIncrease: DC.E400,
    reward: {
      description: "먼 갤럭시 비용 스케일링이 더 늦게 시작됨",
      effect: completions => completions * 5,
      formatEffect: value => `${formatInt(value)} AG later`
    }
  },
  {
    id: 6,
    // The asterisk, if present, will get replaced with strings generated from the scramble text
    description: () => {
      if (Enslaved.isRunning) return "당신은 *. 최대 복제체 갤럭시를 업그레이드하는 비용이 대폭 감소합니다.";
      return "일반적으로 반물질 갤럭시를 얻을 수 없습니다. 최대 복제체" +
              " 갤럭시를 업그레이드하는 비용이 대폭 감소합니다.";
    },
    goal: DC.E850,
    pelleGoal: DC.E1500,
    goalIncrease: DC.E250,
    reward: {
      description: "반물질 차원 비용 배율 증가를 더욱 감소",
      effect: completions => completions * 0.2,
      formatEffect: value => {
        const total = Math.round(Player.dimensionMultDecrease + Effects.sum(EternityChallenge(6).reward)) - value;
        return `-${format(value, 2, 1)} (${formatX(total, 2, 1)} total)`;
      }
    },
    scrambleText: ["cannot gain Antimatter Galaxies normally", "c㏰'퐚 gai鸭 Anti꟢at랜erﻪﶓa⁍axie㮾 䂇orma㦂l"],
  },
  {
    id: 7,
    description:
      "1번째 시간 차원이 8번째 무한 차원을 생성하고 1번째 무한 차원이 " +
      "7번째 반물질 차원을 생성합니다. 틱속도도 무한 및 시간 차원에 직접 적용됩니다.",
    goal: DC.E2000,
    pelleGoal: DC.E2700,
    goalIncrease: DC.E530,
    effect: () => TimeDimension(1).productionPerSecond,
    reward: {
      description: "1번째 시간 차원이 8번째 무한 차원을 생성",
      effect: completions => TimeDimension(1).productionPerSecond.pow(completions * 0.2).minus(1).clampMin(0),
      formatEffect: value => `${format(value, 2, 1)} per second`
    }
  },
  {
    id: 8,
    description: () => `무한 차원을 ${formatInt(50)}번만 업그레이드할 수 있고 복제체
      업그레이드 ${formatInt(40)}번. 무한 차원 및 복제체 업그레이드 자동구매기가 비활성화됩니다.`,
    goal: DC.E1300,
    pelleGoal: DC.E2800,
    goalIncrease: DC.E900,
    reward: {
      description: "무한 힘이 복제체 갤럭시를 강화",
      effect: completions => {
        const infinityPower = Math.log10(Currency.infinityPower.value.pLog10() + 1);
        return Math.max(0, Math.pow(infinityPower, 0.03 * completions) - 1);
      },
      formatEffect: value => formatPercents(value, 2)
    }
  },
  {
    id: 9,
    description: () => `틱속도 업그레이드를 구매할 수 없습니다. 무한 힘이 대신
      시간 차원을 크게 감소된 효과로 곱합니다. ${specialInfinityGlyphDisabledEffectText()}`,
    goal: DC.E1750,
    pelleGoal: DC.E2900,
    goalIncrease: DC.E250,
    reward: {
      description: "시간 조각을 기반으로 한 무한 차원 배율",
      effect: completions => Currency.timeShards.value.pow(completions * 0.1).clampMin(1),
      cap: DC.E400,
      formatEffect: value => formatX(value, 2, 1)
    }
  },
  {
    id: 10,
    description: () => {
      let description = `시간 차원과 무한 차원이 비활성화됩니다. 무한에서
        반물질 차원으로 거대한 부스트를 얻습니다 (무한${formatPow(950)}). ${specialInfinityGlyphDisabledEffectText()}`;
      EternityChallenge(10).applyEffect(v => description += ` 현재: ${formatX(v, 2, 1)}`);
      return description;
    },
    goal: DC.E3000,
    pelleGoal: DC.E3200,
    goalIncrease: DC.E300,
    effect: () => Decimal.pow(Currency.infinitiesTotal.value, 950).clampMin(1).pow(TimeStudy(31).effectOrDefault(1)),
    reward: {
      description: "무한을 기반으로 한 시간 차원 배율",
      effect: completions => {
        const mult = Currency.infinitiesTotal.value.times(2.783e-6).pow(0.4 + 0.1 * completions).clampMin(1);
        return mult.powEffectOf(TimeStudy(31));
      },
      formatEffect: value => {
        // Since TS31 is already accounted for in the effect prop, we need to "undo" it to display the base value here
        const mult = formatX(value, 2, 1);
        return TimeStudy(31).canBeApplied
          ? `${formatX(value.pow(1 / TimeStudy(31).effectValue), 2, 1)} (After TS31: ${mult})`
          : mult;
      }
    }
  },
  {
    id: 11,
    description: () => `무한 힘 및 차원 부스트(반물질 차원)의 배율을 제외한 모든 차원 배율과 거듭제곱이 비활성화됩니다. ${specialInfinityGlyphDisabledEffectText()}`,
    goal: DC.E450,
    pelleGoal: DC.E11200,
    goalIncrease: DC.E200,
    pelleGoalIncrease: DC.E1400,
    reward: {
      description: "틱속도 비용 배율 증가를 더욱 감소",
      effect: completions => completions * 0.07,
      formatEffect: value => {
        const total = Math.round(Player.tickSpeedMultDecrease + Effects.sum(EternityChallenge(11).reward)) - value;
        return `-${format(value, 2, 2)} (${formatX(total, 2, 2)} total)`;
      }
    }
  },
  {
    id: 12,
    description: () => (PlayerProgress.realityUnlocked()
      ? `게임이 ×${formatInt(1000)} 느리게 실행되며 다른 모든 게임 속도 효과가 비활성화됩니다. 특정 시간 내에 목표를 달성해야 하거나 도전에 실패합니다. ${specialInfinityGlyphDisabledEffectText()}`
      : `게임이 ×${formatInt(1000)} 느리게 실행됩니다. 특정 시간 내에 목표를 달성해야 하거나 도전에 실패합니다.`),
    goal: DC.E110000,
    pelleGoal: DC.E208000,
    goalIncrease: DC.E12000,
    restriction: completions => Math.max(10 - 2 * completions, 1) / 10,
    checkRestriction: restriction => Time.thisEternity.totalSeconds < restriction,
    formatRestriction: restriction => `${quantify("게임 내 초", restriction, 0, 1)} 이하.`,
    failedRestriction: "(더 이상 느림)",
    reward: {
      description: "무한 차원 비용 배율이 감소됨",
      effect: completions => 1 - completions * 0.008,
      formatEffect: value => `x${formatPow(value, 3, 3)}`
    }
  }
];
