import { DC } from "../../constants";

export const infinityChallenges = [
  {
    id: 1,
    description: `모든 일반 도전 제한이 동시에 활성화됩니다. 다만 틱속도(C9) 및 빅 크런치(C12) 도전은 제외됩니다.`,
    goal: DC.E650,
    isQuickResettable: true,
    reward: {
      description: () => `완료된 각 무한 도전마다 모든 무한 차원에 ${formatX(1.3, 1, 1)}`,
      effect: () => Math.pow(1.3, InfinityChallenges.completed.length),
      formatEffect: value => formatX(value, 1, 1)
    },
    unlockAM: DC.E2000,
  },
  {
    id: 2,
    description: () => `8번째 반물질 차원을 획득하면 차원 희생이 매 ${formatInt(400)}밀리초마다 자동으로 발생합니다.`,
    goal: DC.E10500,
    isQuickResettable: false,
    reward: {
      description: () => `차원 희생 자동구매기 및 더 강력한 차원 희생
        ${Sacrifice.getSacrificeDescription({ "InfinityChallenge2isCompleted": false })} ➜
        ${Sacrifice.getSacrificeDescription({ "InfinityChallenge2isCompleted": true })}`,
    },
    unlockAM: DC.E11000,
  },
  {
    id: 3,
    description: () =>
      `틱속도 업그레이드는 항상 ${formatX(1)}입니다. 틱속도 업그레이드를 구매할 때마다, 반물질 갤럭시에 따라 증가하는 모든 반물질 차원에 대한 정적 배율을 대신 얻습니다.`,
    goal: DC.E5000,
    isQuickResettable: false,
    effect: () => Decimal.pow(1.05 + (player.galaxies * 0.005), player.totalTickBought),
    formatEffect: value => formatX(value, 2, 2),
    reward: {
      description: `반물질 갤럭시와 틱속도 구매에 기반한 반물질 차원 배율`,
      effect: () => (Laitela.continuumActive
        ? Decimal.pow(1.05 + (player.galaxies * 0.005), Tickspeed.continuumValue)
        : Decimal.pow(1.05 + (player.galaxies * 0.005), player.totalTickBought)),
      formatEffect: value => formatX(value, 2, 2),
    },
    unlockAM: DC.E12000,
  },
  {
    id: 4,
    description: () =>
      `가장 최근에 구매한 반물질 차원의 생산량만 정상입니다. 다른 모든 반물질 차원은 더 적게 생산됩니다(${formatPow(0.25, 2, 2)}).`,
    goal: DC.E13000,
    isQuickResettable: true,
    effect: 0.25,
    reward: {
      description: () => `모든 반물질 차원 배율이 배율${formatPow(1.05, 2, 2)}이 됩니다`,
      effect: 1.05
    },
    unlockAM: DC.E14000,
  },
  {
    id: 5,
    description:
      `반물질 차원 1-4를 구매하면 더 저렴한 AD 비용이 증가합니다.
      반물질 차원 5-8을 구매하면 더 비싼 AD 비용이 증가합니다.`,
    goal: DC.E16500,
    isQuickResettable: true,
    reward: {
      description: () =>
        `모든 갤럭시가 ${formatPercents(0.1)} 더 강력하며 이들과 차원 부스트의 요구사항을 ${formatInt(1)}만큼 감소시킵니다`,
      effect: 1.1
    },
    unlockAM: DC.E18000,
  },
  {
    id: 6,
    description: () =>
      `적어도 ${formatInt(1)}개의 2번째 반물질 차원을 획득하면 지수적으로 증가하는 물질이 모든 반물질 차원의 배율을 나눕니다.`,
    goal: DC.D2E22222,
    isQuickResettable: true,
    effect: () => Currency.matter.value.clampMin(1),
    formatEffect: value => `/${format(value, 1, 2)}`,
    reward: {
      description: "틱속도에 기반한 무한 차원 배율",
      effect: () => Tickspeed.perSecond.pow(0.0005),
      formatEffect: value => formatX(value, 2, 2)
    },
    unlockAM: DC.E22500,
  },
  {
    id: 7,
    description: () => {
      // Copied from DimBoost.power; this is the base amount before any multipliers. Post-eternity this isn't
      // necessarily 2.5x by the time the player sees this challenge; it's probably most accurate to say what it
      // currently is, and this phrasing avoids 10x ➜ 10x with the old description.
      const mult = Effects.max(
        2,
        InfinityUpgrade.dimboostMult,
        InfinityChallenge(7).reward,
        TimeStudy(81)
      );
      return `반물질 갤럭시를 구매할 수 없습니다. 기본 차원 부스트 배율은 최대 ${formatX(10)}로 증가합니다. (현재 기본 배율: ${formatX(mult, 2, 1)})`;
    },
    goal: DC.E10000,
    isQuickResettable: false,
    effect: 10,
    reward: {
      description: () => `차원 부스트 배율은 최소 ${formatX(4)}로 증가합니다`,
      effect: 4
    },
    unlockAM: DC.E23000,
  },
  {
    id: 8,
    description: () =>
      `AD 생산량은 시간이 지남에 따라 빠르고 지속적으로 감소합니다. 반물질 차원 또는 틱속도 업그레이드를 구매하면 생산량을 ${formatPercents(1)}로 초기화한 후 다시 감소하기 시작합니다.`,
    goal: DC.E27000,
    isQuickResettable: true,
    effect: () => DC.D0_8446303389034288.pow(
      Math.max(0, player.records.thisInfinity.time - player.records.thisInfinity.lastBuyTime)),
    reward: {
      description:
        "1번째 및 8번째 AD 배율에 기반한 AD 2-7에 대한 배율을 얻습니다.",
      effect: () => AntimatterDimension(1).multiplier.times(AntimatterDimension(8).multiplier).pow(0.02),
      formatEffect: value => formatX(value, 2, 2)
    },
    unlockAM: DC.E28000,
  },
];
