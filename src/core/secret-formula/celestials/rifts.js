import { DC } from "../../constants";
import wordShift from "../../word-shift";

export const pelleRifts = {
  vacuum: {
    id: 1,
    key: "vacuum",
    name: ["Vacuum", "Hollow", "Void"],
    drainResource: "IP",
    baseEffect: x => `IP gain ${formatX(x, 2, 2)}`,
    additionalEffects: () => [PelleRifts.vacuum.milestones[2]],
    strike: () => PelleStrikes.infinity,
    percentage: totalFill => Math.log10(totalFill.plus(1).log10() * 10 + 1) ** 2.5 / 100,
    percentageToFill: percentage => Decimal.pow(10,
      Decimal.pow(10, (percentage * 100) ** (1 / 2.5)).div(10).minus(0.1)
    ).minus(1),
    effect: totalFill => {
      if (player.challenge.eternity.current !== 0) {
        const chall = EternityChallenge.current;
        const goal = chall.goalAtCompletions(chall.gainedCompletionStatus.totalCompletions);
        return totalFill.plus(1).pow(0.1).min(goal.pow(0.15));
      }
      return totalFill.plus(1).pow(0.33);
    },
    currency: () => Currency.infinityPoints,
    galaxyGeneratorThreshold: 1000,
    milestones: [
      {
        resource: "vacuum",
        requirement: 0.04,
        description: "감소된 레벨과 희귀성으로 단일 기본 글리프를 장착할 수 있습니다."
      },
      {
        resource: "vacuum",
        requirement: 0.06,
        description: () => `복제체의 상한을 제거하고 해금과 업그레이드를 ${formatX(1e130)} 더 저렴하게 만듭니다.`,
        effect: () => 1e130
      },
      {
        resource: "vacuum",
        requirement: 0.4,
        description: () => `${wordShift.wordCycle(PelleRifts.vacuum.name)} also affects EP gain`,
        effect: () => Decimal.pow(4, PelleRifts.vacuum.totalFill.log10() / 2 / 308 + 3),
        formatEffect: x => `EP gain ${formatX(x, 2, 2)}`
      },
    ],
    galaxyGeneratorText: "There is not enough space left for more, you must fill in the $value"
  },
  decay: {
    id: 2,
    key: "decay",
    name: ["Decay", "Collapse", "Disarray"],
    drainResource: "Replicanti",
    spendable: true,
    baseEffect: x => `Replicanti speed ${formatX(x, 2, 2)}`,
    additionalEffects: () => [PelleRifts.decay.milestones[0], PelleRifts.decay.milestones[2]],
    strike: () => PelleStrikes.powerGalaxies,
    // 0 - 1
    percentage: totalFill => totalFill.plus(1).log10() * 0.05 / 100,
    // 0 - 1
    percentageToFill: percentage => Decimal.pow(10, 20 * percentage * 100).minus(1),
    effect: totalFill => (PelleRifts.chaos.milestones[0].canBeApplied
      ? Decimal.sqrt(2000 + 1) : Decimal.sqrt(totalFill.plus(1).log10() + 1)),
    currency: () => Currency.replicanti,
    galaxyGeneratorThreshold: 1e7,
    milestones: [
      {
        resource: "decay",
        requirement: 0.2,
        description: "첫 번째 구매 가능한 펠레 업그레이드는 1차 무한 차원에도 영향을 줍니다.",
        effect: () => {
          const x = player.celestials.pelle.rebuyables.antimatterDimensionMult;
          return Decimal.pow(1e50, x - 9);
        },
        formatEffect: x => `1st Infinity Dimension ${formatX(x, 2, 2)}`
      },
      {
        resource: "decay",
        requirement: 0.6,
        description: () => `복제체가 ${format(DC.E1300)}을 초과하면,
          모든 갤럭시는 ${formatPercents(0.1)} 더 효과적입니다.`,
        effect: () => (Replicanti.amount.gt(DC.E1300) ? 1.1 : 1)
      },
      {
        resource: "decay",
        requirement: 1,
        description: "총 균열 이정표에 기반한 최대 복제체 갤럭시를 증가시킵니다.",
        effect: () => {
          const x = PelleRifts.totalMilestones();
          return x ** 2 - 2 * x;
        },
        formatEffect: x => `Max RG count +${formatInt(x)}`
      },
    ],
    galaxyGeneratorText: "There's not enough antimatter to form new Galaxies, you need to reverse the $value"
  },
  chaos: {
    id: 3,
    key: "chaos",
    name: ["Chaos", "Disorder", "Impurity"],
    drainResource: ["Decay", "Collapse", "Disarray"],
    baseEffect: x => `Time Dimensions ${formatX(x, 2, 2)}`,
    strike: () => PelleStrikes.eternity,
    percentage: totalFill => totalFill / 10,
    percentageToFill: percentage => 10 * percentage,
    effect: totalFill => {
      const fill = totalFill > 6.5
        ? (totalFill - 6.5) / 7 + 6.5
        : totalFill;
      return Decimal.pow(6, Decimal.pow(6, Decimal.pow(6, fill / 10 + 0.1)).minus(6))
        .div(1e5)
        .plus(Decimal.pow(10, fill / 10 + 0.1));
    },
    currency: () => ({
      get value() {
        return PelleRifts.decay.percentage;
      },
      set value(val) {
        const spent = PelleRifts.decay.percentage - val;
        player.celestials.pelle.rifts.decay.percentageSpent += spent;
      }
    }),
    galaxyGeneratorThreshold: 1e9,
    milestones: [
      {
        resource: "chaos",
        requirement: 0.09,
        description: () => `${wordShift.wordCycle(PelleRifts.decay.name)} \
        effect is always maxed and milestones always active`
      },
      {
        resource: "chaos",
        requirement: 0.15,
        description: "글리프는 새로운 펠레 고유 효과를 얻습니다.",
      },
      {
        resource: "chaos",
        requirement: 1,
        description: () => `영원에서 획득한 EP의 ${formatPercents(0.01)}를 매초 획득합니다.`,
      },
    ],
    galaxyGeneratorText: "Your Galaxies are too fragmented, you must stabilize the $value"
  },
  recursion: {
    id: 4,
    key: "recursion",
    name: ["Recursion", "Dispersion", "Destruction"],
    drainResource: "EP",
    baseEffect: x => `EP formula: log(x)/${formatInt(308)} ➜ log(x)/${formatFloat(308 - x.toNumber(), 2)}`,
    additionalEffects: () => [PelleRifts.recursion.milestones[0], PelleRifts.recursion.milestones[1]],
    strike: () => PelleStrikes.ECs,
    percentage: totalFill => totalFill.plus(1).log10() ** 0.4 / 4000 ** 0.4,
    percentageToFill: percentage => Decimal.pow(10, percentage ** 2.5 * 4000).minus(1),
    effect: totalFill => new Decimal(58 * totalFill.plus(1).log10() ** 0.2 / 4000 ** 0.2),
    currency: () => Currency.eternityPoints,
    galaxyGeneratorThreshold: 1e10,
    milestones: [
      {
        resource: "recursion",
        requirement: 0.10,
        description: "차원 부스트는 영원 도전 완료에 기반해 더 강력합니다.",
        effect: () => Math.max(100 * EternityChallenges.completions ** 2, 1) *
          Math.max(1e4 ** (EternityChallenges.completions - 40), 1),
        formatEffect: x => `Dimension Boost power ${formatX(x, 2, 2)}`
      },
      {
        resource: "recursion",
        requirement: 0.15,
        description: "무한 차원은 영원 도전 완료에 기반해 더 강합니다.",
        effect: () => Decimal.pow("1e1500", ((EternityChallenges.completions - 25) / 20) ** 1.7).max(1),
        formatEffect: x => `Infinity Dimensions ${formatX(x)}`
      },
      {
        resource: "recursion",
        requirement: 1,
        description: "갤럭시 생성기를 영구적으로 해금합니다.",
      },
    ],
    galaxyGeneratorText: "Creating more Galaxies is unsustainable, you must focus the $value to allow more"
  },
  paradox: {
    id: 5,
    key: "paradox",
    name: ["Paradox", "Contradiction", "Fallacy"],
    drainResource: "Dilated Time",
    baseEffect: x => `All Dimensions ${formatPow(x, 2, 3)}`,
    additionalEffects: () => [PelleRifts.paradox.milestones[2]],
    strike: () => PelleStrikes.dilation,
    percentage: totalFill => totalFill.plus(1).log10() / 100,
    percentageToFill: percentage => Decimal.pow10(percentage * 100).minus(1),
    effect: totalFill => new Decimal(1 + totalFill.plus(1).log10() * 0.004),
    currency: () => Currency.dilatedTime,
    galaxyGeneratorThreshold: 1e5,
    milestones: [
      {
        resource: "paradox",
        requirement: 0.15,
        description: "시간 차원 5-8은 훨씬 저렴하며, 더 많은 팽창 업그레이드를 해금합니다.",
        // FIXME: Not a great solution
        onStateChange: () => {
          updateTimeDimensionCosts();
        }
      },
      {
        resource: "paradox",
        requirement: 0.25,
        description: () => `팽창된 시간 획득이 타키온 입자로 ${formatPow(1.4, 1, 1)}됩니다.`,
        effect: 1.4
      },
      {
        resource: "paradox",
        requirement: 0.5,
        description: "팽창 구매 가능 구매 횟수는 무한 거듭제곱 전환 비율을 개선합니다.",
        effect: () => Math.min(
          1.1075 ** (Object.values(player.dilation.rebuyables).sum() - 60),
          712
        ),
        formatEffect: x => `Infinity Power Conversion ${formatX(x, 2, 2)}`
      },
    ],
    galaxyGeneratorText: "It should be possible to create more, but Pelle has restricted you. Disregard the $value"
  }
};
