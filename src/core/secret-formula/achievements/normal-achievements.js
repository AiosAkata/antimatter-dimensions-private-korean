import { DC } from "../../constants";

export const normalAchievements = [
  {
    id: 11,
    name: "어딘가에서 시작해야지",
    description: "1번째 반물질 차원을 구입하세요.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 12,
    name: "반물질 100개면 많은 거지",
    description: "2번째 반물질 차원을 구입하세요.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 13,
    name: "하프라이프 3 확인됨",
    description: "3번째 반물질 차원을 구입하세요.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 14,
    name: "L4D: 차원 4개 남음",
    description: "4번째 반물질 차원을 구입하세요.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 15,
    name: "5차원 반물질 펀치",
    description: "5번째 반물질 차원을 구입하세요.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 16,
    name: "9는 살 수 없었어",
    get description() {
      return Enslaved.isRunning
        ? "6번째 반물질 차원을 구입하세요 (어차피 아무 의미도 없겠지만)"
        : "6번째 반물질 차원을 구입하세요.";
    },
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 17,
    name: "운과는 관계없는 업적",
    description: "7번째 반물질 차원을 구입하세요.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 18,
    name: "무한을 향한 90도",
    get description() {
      return Enslaved.isRunning
        ? "8번째 반물질 차원을 구입하세요 (익숙해지지 마세요)"
        : "8번째 반물질 차원을 구입하세요.";
    },
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 21,
    name: "무한을 향해!",
    description: "무한에 도달하세요.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `반물질 ${formatInt(100)}개로 시작합니다.`; },
    effect: 100
  },
  {
    id: 22,
    name: "가짜 뉴스!",
    get description() { return `${formatInt(50)}가지 다른 뉴스 메시지를 접하세요.`; },
    checkRequirement: () => NewsHandler.uniqueTickersSeen >= 50,
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER
  },
  {
    id: 23,
    name: "9번째 차원은 거짓이야",
    get description() { return `8번째 반물질 차원을 정확히 ${formatInt(99)}개 보유하세요.`; },
    checkRequirement: () => AntimatterDimension(8).amount.eq(99),
    get reward() { return `8번째 반물질 차원이 ${formatPercents(0.1)} 더 강해집니다.`; },
    effect: 1.1
  },
  {
    id: 24,
    name: "반물질 대재앙",
    get description() { return `반물질을 ${format(DC.E80)} 이상 보유하세요.`; },
    checkRequirement: () => Currency.antimatter.exponent >= 80,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 25,
    name: "최대 부스트",
    get description() { return `차원 부스트를 ${formatInt(10)}번 구입하세요.`; },
    checkRequirement: () => DimBoost.purchasedBoosts >= 10,
    checkEvent: GAME_EVENT.DIMBOOST_AFTER
  },
  {
    id: 26,
    name: "거대한 벽을 넘었어",
    description: "반물질 은하를 구입하세요.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.GALAXY_RESET_BEFORE
  },
  {
    id: 27,
    name: "이중 은하",
    get description() { return `반물질 은하를 ${formatInt(2)}개 구입하세요.`; },
    checkRequirement: () => player.galaxies >= 2,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER
  },
  {
    id: 28,
    name: "그렇게 해도 의미 없는데...",
    get description() {
      return `1번째 반물질 차원을 ${format(DC.E150)}개 이상 보유한 상태에서 1개만 구입하세요.`;
    },
    checkRequirement: () => AntimatterDimension(1).amount.exponent >= 150,
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
    get reward() { return `1번째 반물질 차원이 ${formatPercents(0.1)} 더 강해집니다.`; },
    effect: 1.1
  },
  {
    id: 31,
    name: "너프를 깜빡했어",
    get description() { return `반물질 차원 배율 중 하나가 ${formatX(DC.E31)}을 초과하게 하세요.`; },
    checkRequirement: () => AntimatterDimensions.all.some(x => x.multiplier.exponent >= 31),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `1번째 반물질 차원이 ${formatPercents(0.05)} 더 강해집니다.`; },
    effect: 1.05
  },
  {
    id: 32,
    name: "신들이 기뻐하다",
    get description() { return `도전 8 외부에서 차원 희생으로 ${formatX(600)} 이상을 획득하세요.`; },
    checkRequirement: () => !NormalChallenge(8).isOnlyActiveChallenge && Sacrifice.totalBoost.gte(600),
    checkEvent: GAME_EVENT.SACRIFICE_RESET_AFTER,
    get reward() {
      return `차원 희생이 더 강해집니다.
      ${Sacrifice.getSacrificeDescription({ "Achievement32": false, "Achievement57": false, "Achievement88": false })} ➜
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": false, "Achievement88": false })}`;
    },
    effect: 0.1,
  },
  {
    id: 33,
    name: "무한이 정말 많네",
    get description() { return `무한에 ${formatInt(10)}번 도달하세요.`; },
    checkRequirement: () => Currency.infinities.gte(10),
    checkEvent: GAME_EVENT.BIG_CRUNCH_AFTER
  },
  {
    id: 34,
    name: "어차피 필요 없었잖아",
    description: "8번째 반물질 차원 없이 무한에 도달하세요.",
    checkRequirement: () => AntimatterDimension(8).totalAmount.eq(0),
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `1~7번째 차원이 ${formatPercents(0.02)} 더 강해집니다.`; },
    effect: 1.02
  },
  {
    id: 35,
    name: "감히 잠을 자다니",
    get description() {
      return PlayerProgress.realityUnlocked()
        ? `${formatInt(6)}시간(실제 시간) 이상 오프라인 상태를 유지하세요.`
        : `${formatInt(6)}시간 이상 오프라인 상태를 유지하세요.`;
    },
    checkRequirement: () => Date.now() - player.lastUpdate >= 21600000,
    checkEvent: GAME_EVENT.GAME_TICK_BEFORE
  },
  {
    id: 36,
    name: "폐소공포증",
    get description() {
      return `반물질 은하 ${formatInt(1)}개만으로 무한에 도달하세요. (반물질 은하는 무한 시 초기화됩니다.)`;
    },
    checkRequirement: () => player.galaxies === 1,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `시작 틱속도를 ${format(1.02, 2, 2)}배로 곱합니다.`; },
    effect: 1 / 1.02
  },
  {
    id: 37,
    name: "엄청 빠르다!",
    get description() { return `${formatInt(2)}시간 이내로 무한에 도달하세요.`; },
    checkRequirement: () => Time.thisInfinityRealTime.totalHours <= 2,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `반물질 ${formatInt(5000)}개로 시작합니다.`; },
    effect: 5000
  },
  {
    id: 38,
    name: "신을 믿지 않아",
    get description() {
      return `차원 희생 없이 반물질 은하를 구입하세요.
        (반물질 은하는 무한 시 초기화됩니다.)`;
    },
    checkRequirement: () => player.requirementChecks.infinity.noSacrifice,
    checkEvent: GAME_EVENT.GALAXY_RESET_BEFORE
  },
  {
    id: 41,
    name: "DLC 불필요",
    get description() { return `무한 업그레이드를 ${formatInt(16)}개 구입하세요.`; },
    checkRequirement: () => player.infinityUpgrades.size >= 16,
    checkEvent: [
      GAME_EVENT.INFINITY_UPGRADE_BOUGHT,
      GAME_EVENT.REALITY_RESET_AFTER,
      GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT
    ],
    get reward() {
      return `새로운 무한 업그레이드 2개 해금 - IP ${formatX(2)} 배율 및 오프라인 IP 생성.`;
    },
  },
  {
    id: 42,
    name: "슈퍼 사닉",
    get description() {
      return `반물질이 ${format(DC.E63)} 이상일 때 초당 반물질 생산량이 현재 반물질을 초과하게 하세요.`;
    },
    checkRequirement: () =>
      Currency.antimatter.exponent >= 63 &&
      Currency.antimatter.productionPerSecond.gt(Currency.antimatter.value),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 43,
    name: "판세가 역전됐어..",
    description:
      "8번째 반물질 차원 배율이 가장 높고, 7번째가 두 번째로 높은 순서가 되게 하세요.",
    checkRequirement: () => {
      const multipliers = Array.range(1, 8).map(tier => AntimatterDimension(tier).multiplier);
      for (let i = 0; i < multipliers.length - 1; i++) {
        if (multipliers[i].gte(multipliers[i + 1])) return false;
      }
      return true;
    },
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `각 반물질 차원이 단계에 비례한 부스트를 얻습니다
      (8번째: ${formatPercents(0.08)}, 7번째: ${formatPercents(0.07)} 등)`;
    }
  },
  {
    id: 44,
    name: "30초 만에 끝",
    get description() {
      return `초당 반물질 생산량이 현재 반물질을 ${formatInt(30)}초 연속으로 초과하게 하세요.`;
    },
    checkRequirement: () => AchievementTimers.marathon1
      .check(Currency.antimatter.productionPerSecond.gt(Currency.antimatter.value), 30),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
  },
  {
    id: 45,
    name: "감자보다 빠르다",
    get description() { return `초당 틱속도가 ${format(DC.E29)}을 초과하게 하세요.`; },
    checkRequirement: () => Tickspeed.current.exponent <= -26,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `시작 틱속도를 ${formatX(1.02, 0, 2)}배로 곱합니다.`; },
    effect: 0.98
  },
  {
    id: 46,
    name: "다차원적",
    get description() { return `8번째를 제외한 모든 반물질 차원을 ${format(DC.E12)}개 이상 보유하세요.`; },
    checkRequirement: () => AntimatterDimension(7).amount.exponent >= 12,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 47,
    name: "무모한 도전자",
    get description() { return `일반 도전을 ${formatInt(3)}개 완료하세요.`; },
    checkRequirement: () => NormalChallenges.all.countWhere(c => c.isCompleted) >= 3,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT],
  },
  {
    id: 48,
    name: "반물질 도전 완료",
    get description() { return `모든 일반 도전 ${formatInt(12)}개를 완료하세요.`; },
    checkRequirement: () => NormalChallenges.all.countWhere(c => !c.isCompleted) === 0,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT],
    get reward() { return `모든 차원이 ${formatPercents(0.1)} 더 강해집니다.`; },
    effect: 1.1
  },
  {
    id: 51,
    name: "한계 돌파",
    description: "무한을 부수세요.",
    checkRequirement: () => player.break,
    checkEvent: [GAME_EVENT.BREAK_INFINITY, GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT],
  },
  {
    id: 52,
    name: "자동화 시대",
    description: "반물질 차원과 틱속도 업그레이드 자동구매기의 간격을 최대로 줄이세요.",
    checkRequirement: () => Autobuyer.antimatterDimension.zeroIndexed.concat(Autobuyer.tickspeed)
      .every(a => a.isUnlocked && a.hasMaxedInterval),
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT]
  },
  {
    id: 53,
    name: "절대로 가치 없음",
    description: "모든 일반 자동구매기의 간격을 최대로 줄이세요.",
    // The upgradeable autobuyers are dimensions, tickspeed, dimension boost,
    // galaxy, and big crunch (the ones you get from normal challenges).
    // We don't count autobuyers which can be upgraded via e.g. perks as upgradeable.
    checkRequirement: () => Autobuyers.upgradeable
      .every(a => a.isUnlocked && a.hasMaxedInterval),
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT]
  },
  {
    id: 54,
    name: "이건 더 빠르다!",
    get description() { return `${formatInt(10)}분 이내로 무한에 도달하세요.`; },
    checkRequirement: () => Time.thisInfinityRealTime.totalMinutes <= 10,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `반물질 ${format(5e5)}개로 시작합니다.`; },
    effect: 5e5
  },
  {
    id: 55,
    name: "영원도 그리 길지 않아",
    get description() { return `${formatInt(1)}분 이내로 무한에 도달하세요.`; },
    checkRequirement: () => Time.thisInfinityRealTime.totalMinutes <= 1,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `반물질 ${format(5e10)}개로 시작합니다.`; },
    effect: 5e10
  },
  {
    id: 56,
    name: "수많은 죽음",
    get description() {
      return `2번째 반물질 차원 자동구매기 도전을 ${formatInt(3)}분 이내로 완료하세요.`;
    },
    checkRequirement: () => NormalChallenge(2).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalMinutes <= 3,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `무한 시작 ${formatInt(3)}분 동안 모든 반물질 차원이 더 강해집니다.`;
    },
    effect: () => Math.max(6 / (Time.thisInfinity.totalMinutes + 3), 1),
    effectCondition: () => Time.thisInfinity.totalMinutes < 3,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 57,
    name: "신들의 선물",
    get description() {
      return `8번째 반물질 차원 자동구매기 도전을 ${formatInt(3)}분 이내로 완료하세요.`;
    },
    checkRequirement: () => NormalChallenge(8).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalMinutes <= 3,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `차원 희생이 더 강해집니다.
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": false, "Achievement88": false })} ➜
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": true, "Achievement88": false })}`;
    },
    effect: 0.1
  },
  {
    id: 58,
    name: "괜찮아.",
    get description() { return `틱속도 자동구매기 도전을 ${formatInt(3)}분 이내로 완료하세요.`; },
    checkRequirement: () => NormalChallenge(9).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalMinutes <= 3,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `반물질 차원 ${formatInt(10)}개 구매 시 배율을 +${formatPercents(0.01)} 증가시킵니다.`;
    },
    effect: 1.01
  },
  {
    id: 61,
    name: "대량 구매",
    get description() {
      return `모든 반물질 차원 자동구매기 대량 구매량을
        ${formatInt(Autobuyer.antimatterDimension.bulkCap)}으로 설정하세요.`;
    },
    checkRequirement: () => Autobuyer.antimatterDimension.zeroIndexed.every(x => x.hasMaxedBulk),
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_TEN_BOUGHT,
      GAME_EVENT.SAVE_CONVERTED_FROM_PREVIOUS_VERSION],
    reward: "차원 자동구매기의 대량 구매량이 무제한이 됩니다."
  },
  {
    id: 62,
    name: "어, 아직도 있어?",
    get description() { return `분당 ${format(DC.E8)} 무한 포인트에 도달하세요.`; },
    checkRequirement: () => Player.bestRunIPPM.exponent >= 8,
    checkEvent: GAME_EVENT.BIG_CRUNCH_AFTER
  },
  {
    id: 63,
    name: "새로운 시작",
    description: "무한 파워 생성을 시작하세요.",
    checkRequirement: () => Currency.infinityPower.gt(1),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 64,
    name: "무피해 클리어",
    description: "일반 도전 중 차원 부스트나 반물질 은하 없이 무한에 도달하세요.",
    checkRequirement: () => player.galaxies === 0 && DimBoost.purchasedBoosts === 0 && NormalChallenge.isRunning,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `1~4번째 반물질 차원이 ${formatPercents(0.25)} 더 강해집니다.`; },
    effect: 1.25
  },
  {
    id: 65,
    name: "별로 어렵지 않네",
    get description() { return `모든 일반 도전 시간의 합이 ${formatInt(3)}분 미만이 되게 하세요.`; },
    checkRequirement: () => Time.challengeSum.totalMinutes < 3,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER],
    get reward() {
      return `도전 중에 한해, 무한 시작 ${formatInt(3)}분 동안 모든 반물질 차원이 더 강해집니다.`;
    },
    effect: () => (Player.isInAnyChallenge ? Math.max(4 / (Time.thisInfinity.totalMinutes + 1), 1) : 1),
    effectCondition: () => Player.isInAnyChallenge && Time.thisInfinity.totalMinutes < 3,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 66,
    name: "감자 제곱보다 빠르다",
    get description() { return `초당 틱속도가 ${format(DC.E58)}을 초과하게 하세요.`; },
    checkRequirement: () => Tickspeed.current.exponent <= -55,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `시작 틱속도를 ${formatX(1.02, 0, 2)}배로 곱합니다.`; },
    effect: 0.98
  },
  {
    id: 67,
    name: "무한 도전",
    description: "무한 도전을 하나 완료하세요.",
    checkRequirement: () => InfinityChallenges.completed.length > 0,
    checkEvent: [GAME_EVENT.INFINITY_CHALLENGE_COMPLETED, GAME_EVENT.REALITY_RESET_AFTER]
  },
  {
    id: 68,
    name: "업적 때문에 또 한 거잖아?",
    get description() {
      return `3번째 반물질 차원 자동구매기 도전을 ${formatInt(10)}초 이내로 완료하세요.`;
    },
    checkRequirement: () => NormalChallenge(3).isOnlyActiveChallenge && Time.thisInfinityRealTime.totalSeconds <= 10,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `1번째 반물질 차원이 ${formatPercents(0.5)} 더 강해집니다.`; },
    effect: 1.5
  },
  {
    id: 71,
    name: "에러 909: 차원을 찾을 수 없음",
    description:
      `2번째 반물질 차원 자동구매기 도전 중 차원 부스트나 반물질 은하 없이
      1번째 반물질 차원 1개만으로 무한에 도달하세요.`,
    checkRequirement: () =>
      NormalChallenge(2).isOnlyActiveChallenge &&
      AntimatterDimension(1).amount.eq(1) &&
      DimBoost.purchasedBoosts === 0 &&
      player.galaxies === 0,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `1번째 반물질 차원이 ${formatInt(3)}배 더 강해집니다.`; },
    effect: 3
  },
  {
    id: 72,
    name: "이 무한을 다 담을 수 없어",
    get description() {
      return `모든 반물질 차원 배율이 ${formatX(Decimal.NUMBER_MAX_VALUE, 1)}을 초과하게 하세요.`;
    },
    checkRequirement: () => AntimatterDimensions.all.every(x => x.multiplier.gte(Decimal.NUMBER_MAX_VALUE)),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `모든 반물질 차원이 ${formatPercents(0.1)} 더 강해집니다.`; },
    effect: 1.1
  },
  {
    id: 73,
    name: "이 업적은 존재하지 않는다",
    get description() { return `반물질을 ${formatPostBreak(DC.D9_9999E9999, 4)} 보유하세요.`; },
    checkRequirement: () => Currency.antimatter.gte(DC.D9_9999E9999),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "현재 반물질에 비례한 배율을 반물질 차원이 획득합니다.",
    effect: () => Currency.antimatter.value.pow(0.00002).plus(1),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 74,
    name: "1초도 낭비하지 않아",
    get description() { return `모든 최고 일반 도전 시간의 합이 ${formatInt(5)}초 미만이 되게 하세요.`; },
    checkRequirement: () => Time.challengeSum.totalSeconds < 5,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER],
    get reward() { return `도전 중에 한해 모든 반물질 차원이 ${formatPercents(0.4)} 더 강해집니다.`; },
    effect: 1.4,
    effectCondition: () => Player.isInAnyChallenge
  },
  {
    id: 75,
    name: "새 차원???",
    description: "4번째 무한 차원을 해금하세요.",
    checkRequirement: () => InfinityDimension(4).isUnlocked,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "업적 보너스가 무한 차원에도 적용됩니다.",
    effect: () => Achievements.power
  },
  {
    id: 76,
    name: "차원마다 하나씩",
    get description() { return `${formatInt(8)}일 동안 플레이하세요.`; },
    checkRequirement: () => Time.totalTimePlayed.totalDays >= 8,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "플레이 시간에 비례한 극히 작은 배율을 반물질 차원에 적용합니다.",
    effect: () => Math.max(Math.pow(Time.totalTimePlayed.totalDays / 2, 0.05), 1),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 77,
    name: "백만도 많은 양이야",
    get description() { return `무한 파워를 ${format(1e6)} 보유하세요.`; },
    checkRequirement: () => Currency.infinityPower.exponent >= 6,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 78,
    name: "눈 깜짝할 사이",
    get description() { return `${formatInt(250)}ms 이내로 무한에 도달하세요.`; },
    checkRequirement: () => Time.thisInfinityRealTime.totalMilliseconds <= 250,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `반물질 ${format(5e25)}개로 시작합니다.`;
    },
    effect: 5e25
  },
  {
    id: 81,
    name: "게임 디자인은 내 열정",
    get description() { return `무한 도전 5를 ${formatInt(15)}초 이내로 클리어하세요.`; },
    checkRequirement: () => InfinityChallenge(5).isRunning && Time.thisInfinityRealTime.totalSeconds <= 15,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE
  },
  {
    id: 82,
    name: "무한 도전 완전 정복",
    get description() { return `모든 무한 도전 ${formatInt(8)}개를 완료하세요.`; },
    checkRequirement: () => InfinityChallenges.completed.length === 8,
    checkEvent: [GAME_EVENT.INFINITY_CHALLENGE_COMPLETED, GAME_EVENT.REALITY_RESET_AFTER],
  },
  {
    id: 83,
    name: "은하 50개를 얻을 수 있다고?!?!",
    get description() { return `반물질 은하를 ${formatInt(50)}개 보유하세요.`; },
    checkRequirement: () => player.galaxies >= 50,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    get reward() { return `반물질 은하 하나당 틱속도가 ${formatPercents(0.05)} 조금 넘게 빨라집니다.`; },
    effect: () => DC.D0_95.pow(player.galaxies),
    formatEffect: value => `${formatX(value.recip(), 2, 2)}`
  },
  {
    id: 84,
    name: "좀 여유가 있어",
    get description() { return `반물질을 ${formatPostBreak("1e35000")} 보유하세요.`; },
    checkRequirement: () => Currency.antimatter.exponent >= 35000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "미사용 반물질이 많을수록 반물질 차원이 더 강해집니다.",
    effect: () => Currency.antimatter.value.pow(0.00002).plus(1),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 85,
    name: "IP가 전부 우리 것",
    get description() { return `빅 크런치로 무한 포인트 ${format(DC.E150)}을 획득하세요.`; },
    checkRequirement: () => gainedInfinityPoints().exponent >= 150,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `무한 포인트에 ${formatX(4)} 추가 배율이 적용됩니다.`; },
    effect: 4
  },
  {
    id: 86,
    name: "시간을 구부릴 수 있어?",
    get description() { return `틱속도 업그레이드당 ${formatX(1000)} 빨라지게 하세요.`; },
    checkRequirement: () => Tickspeed.multiplier.recip().gte(1000),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `모든 은하가 ${formatPercents(0.01)} 더 강해집니다.`; },
    effect: 1.01
  },
  {
    id: 87,
    name: "무한 200만 번",
    get description() { return `무한에 ${format(DC.D2E6)}번 도달하세요.`; },
    checkRequirement: () => Currency.infinities.gt(DC.D2E6),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `${formatInt(5)}초 이상 걸린 무한은
      ${formatX(250)} 더 많은 무한을 줍니다.`;
    },
    effect: 250,
    effectCondition: () => Time.thisInfinity.totalSeconds > 5
  },
  {
    id: 88,
    name: "또 다른 무한 참조",
    get description() {
      return `단 한 번의 차원 희생으로 ${formatX(Decimal.NUMBER_MAX_VALUE, 1, 0)} 배율을 달성하세요.`;
    },
    checkRequirement: () => Sacrifice.nextBoost.gte(Decimal.NUMBER_MAX_VALUE),
    checkEvent: GAME_EVENT.SACRIFICE_RESET_BEFORE,
    get reward() {
      return `차원 희생이 더 강해집니다.
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": true, "Achievement88": false })} ➜
      ${Sacrifice.getSacrificeDescription({ "Achievement32": true, "Achievement57": true, "Achievement88": true })}`;
    },
    effect: 0.1
  },
  {
    id: 91,
    name: "터무니없는 속도",
    get description() {
      return `${formatInt(2)}초 이내로 무한 포인트 ${format(DC.E200)}을 빅 크런치하세요.`;
    },
    checkRequirement: () => gainedInfinityPoints().exponent >= 200 && Time.thisInfinityRealTime.totalSeconds <= 2,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `무한 시작 ${formatInt(5)}초 동안 모든 반물질 차원이 크게 강해집니다.`;
    },
    effect: () => Math.max((5 - Time.thisInfinity.totalSeconds) * 60, 1),
    effectCondition: () => Time.thisInfinity.totalSeconds < 5,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 92,
    name: "아무도 못 막아!",
    get description() {
      return `${formatInt(20)}초 이내로 무한 포인트 ${format(DC.E250)}을 빅 크런치하세요.`;
    },
    checkRequirement: () => gainedInfinityPoints().exponent >= 250 && Time.thisInfinityRealTime.totalSeconds <= 20,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() {
      return `무한 시작 ${formatInt(60)}초 동안 모든 반물질 차원이 크게 강해집니다.`;
    },
    effect: () => Math.max((1 - Time.thisInfinity.totalMinutes) * 100, 1),
    effectCondition: () => Time.thisInfinity.totalMinutes < 1,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 93,
    name: "최대 과부하",
    get description() { return `빅 크런치로 무한 포인트 ${format(DC.E300)}을 획득하세요.`; },
    checkRequirement: () => gainedInfinityPoints().exponent >= 300,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    get reward() { return `무한 포인트에 ${formatX(4)} 추가 배율이 적용됩니다.`; },
    effect: 4
  },
  {
    id: 94,
    name: "4.3333분간의 무한",
    get description() { return `무한 파워를 ${format(DC.E260)} 보유하세요.`; },
    checkRequirement: () => Currency.infinityPower.exponent >= 260,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "무한 파워 획득량이 2배가 됩니다.",
    effect: 2
  },
  {
    id: 95,
    name: "이게 안전한 거야?",
    get description() { return `${formatInt(1)}시간 이내로 복제체를 ${format(Decimal.NUMBER_MAX_VALUE, 1, 0)} 보유하세요.`; },
    get reward() { return `무한 시 복제체와 복제체 은하 ${formatInt(1)}개를 유지합니다.`; },
    checkRequirement: () =>
      (Replicanti.amount.eq(Decimal.NUMBER_MAX_VALUE) || player.replicanti.galaxies > 0) &&
      Time.thisInfinityRealTime.totalHours <= 1,
    checkEvent: GAME_EVENT.REPLICANTI_TICK_AFTER
  },
  {
    id: 96,
    name: "시간은 상대적",
    description: "영원에 도달하세요.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE
  },
  {
    id: 97,
    name: "레고를 밟은 것처럼",
    get description() { return `무한 도전 시간의 합이 ${format(6.66, 2, 2)}초 미만이 되게 하세요.`; },
    checkRequirement: () => Time.infinityChallengeSum.totalSeconds < 6.66,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER],
  },
  {
    id: 98,
    name: "무한으로부터 0도",
    description: "8번째 무한 차원을 해금하세요.",
    checkRequirement: () => InfinityDimension(8).isUnlocked,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 101,
    name: "8이면 충분해",
    description: "1~7번째 반물질 차원을 구입하지 않고 영원에 도달하세요.",
    checkRequirement: () => player.requirementChecks.eternity.onlyAD8,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE
  },
  {
    id: 102,
    name: "영원이 걸린 이정표",
    description: "모든 영원 이정표를 달성하세요.",
    checkRequirement: () => EternityMilestone.all.every(m => m.isReached),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 103,
    name: "이 업적은 존재하지 않는다 II",
    get description() { return `무한 포인트를 ${formatPostBreak(DC.D9_99999E999, 5, 0)} 보유하세요.`; },
    checkRequirement: () => Currency.infinityPoints.exponent >= 1000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `무한 포인트 공식이 개선됩니다. log(x)/${formatInt(308)} ➜ log(x)/${formatFloat(307.8, 1)}`;
    },
    effect: 307.8
  },
  {
    id: 104,
    name: "그건 영원이 아니었어",
    get description() { return `${formatInt(30)}초 이내로 영원에 도달하세요.`; },
    checkRequirement: () => Time.thisEternity.totalSeconds <= 30,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    get reward() { return `영원 시작 시 무한 포인트 ${format(5e25)}개를 가지고 시작합니다.`; },
    effect: 5e25
  },
  {
    id: 105,
    name: "무한한 시간",
    get description() { return `시간 차원으로부터 틱속도 업그레이드를 ${formatInt(308)}개 얻으세요.`; },
    checkRequirement: () => player.totalTickGained >= 308,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "시간 차원이 틱속도에 비례한 배율을 획득합니다.",
    effect: () => Tickspeed.perSecond.pow(0.000005),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 106,
    name: "군집",
    get description() { return `${formatInt(15)}초 이내로 복제체 은하를 ${formatInt(10)}개 얻으세요.`; },
    checkRequirement: () => Replicanti.galaxies.total >= 10 && Time.thisInfinity.totalSeconds <= 15,
    checkEvent: GAME_EVENT.REPLICANTI_TICK_AFTER
  },
  {
    id: 107,
    name: "이것도 공략이 필요해?",
    get description() { return `무한 ${formatInt(10)}번 미만으로 영원에 도달하세요.`; },
    checkRequirement: () => Currency.infinities.lt(10),
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE
  },
  {
    id: 108,
    name: "9도 살 수 있었어",
    get description() { return `복제체 정확히 ${formatInt(9)}개로 영원에 도달하세요.`; },
    checkRequirement: () => Replicanti.amount.round().eq(9),
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE
  },
  {
    id: 111,
    name: "야, 무한을 좋아한다더니...",
    get description() {
      return `최근 ${formatInt(10)}번의 무한이 모두 이전 무한보다 무한 포인트가
      ${format(Decimal.NUMBER_MAX_VALUE, 1, 0)}배 이상 높아야 합니다.`;
    },
    checkRequirement: () => {
      if (player.records.recentInfinities.some(i => i[0] === Number.MAX_VALUE)) return false;
      const infinities = player.records.recentInfinities.map(run => run[2]);
      for (let i = 0; i < infinities.length - 1; i++) {
        if (infinities[i].lt(infinities[i + 1].times(Decimal.NUMBER_MAX_VALUE))) return false;
      }
      return true;
    },
    checkEvent: GAME_EVENT.BIG_CRUNCH_AFTER,
    reward: "차원 부스트 또는 반물질 은하 구입 시 반물질이 초기화되지 않습니다."
  },
  {
    id: 112,
    name: "다시는 안 해",
    get description() { return `무한 도전 시간의 합이 ${formatInt(750)}ms 미만이 되게 하세요.`; },
    checkRequirement: () => Time.infinityChallengeSum.totalMilliseconds < 750,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.REALITY_RESET_AFTER]
  },
  {
    id: 113,
    name: "영원이 새로운 무한",
    get description() { return `${formatInt(250)}ms 이내로 영원에 도달하세요.`; },
    checkRequirement: () => Time.thisEternity.totalMilliseconds <= 250,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    get reward() { return `영원을 ${formatX(2)} 더 많이 획득합니다.`; },
    effect: 2,
  },
  {
    id: 114,
    name: "너는 실수야",
    description: "영원 도전에 실패하세요.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.CHALLENGE_FAILED,
    reward: "희미해져 가는 성취감.",
    effect: () => "Sense of accomplishment (fading)"
  },
  {
    id: 115,
    name: "영원 7개를 얻었으면 좋겠어",
    description: "영원 도전 안에서 무한 도전을 시작하세요.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 116,
    name: "정말 무한을 해야 해?",
    get description() { return `무한 ${formatInt(1)}번만으로 영원에 도달하세요.`; },
    checkRequirement: () => Currency.infinities.lte(1),
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    reward: "무한 횟수에 비례한 무한 포인트 배율을 획득합니다.",
    effect: () => Decimal.pow(Currency.infinitiesTotal.value.clampMin(1), LOG10_2 / 4).powEffectOf(TimeStudy(31)),
    cap: () => Effarig.eternityCap,
    formatEffect: value => {
      // Since TS31 is already accounted for in the effect prop, we need to "undo" it to display the base value here
      const mult = formatX(value, 2, 2);
      return TimeStudy(31).canBeApplied
        ? `${formatX(value.pow(1 / TimeStudy(31).effectValue), 2, 1)} (After TS31: ${mult})`
        : mult;
    }
  },
  {
    id: 117,
    name: "코스트코가 차원 부스트를 팔아!",
    get description() { return `한 번에 차원 부스트를 ${formatInt(750)}개 대량 구매하세요.`; },
    checkRequirement: ([bulk]) => bulk >= 750,
    checkEvent: GAME_EVENT.DIMBOOST_AFTER,
    get reward() {
      return `차원 부스트에서 반물질 차원으로의 배율이 ${formatPercents(0.01)} 높아집니다.`;
    },
    effect: 1.01
  },
  {
    id: 118,
    name: "9000을 넘었어",
    get description() { return `차원 희생 총 배율을 ${formatPostBreak(DC.E9000)} 이상으로 만드세요.`; },
    checkRequirement: () => Sacrifice.totalBoost.exponent >= 9000,
    checkEvent: GAME_EVENT.SACRIFICE_RESET_AFTER,
    reward: `차원 희생이 반물질 차원을 초기화하지 않으며,
      켜져 있으면 자동구매기가 매 틱마다 작동합니다.`,
  },
  {
    id: 121,
    name: "무한 IP가 가능해?",
    get description() { return `무한 포인트를 ${formatPostBreak("1e30008")} 보유하세요.`; },
    checkRequirement: () => Currency.infinityPoints.exponent >= 30008,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 122,
    name: "넌 이미 죽었어.",
    description: "2~8번째 반물질 차원을 구입하지 않고 영원에 도달하세요.",
    checkRequirement: () => player.requirementChecks.eternity.onlyAD1,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE
  },
  {
    id: 123,
    name: "업데이트까지 영원 5번 더",
    get description() { return `고유한 영원 도전 단계를 ${formatInt(50)}번 완료하세요.`; },
    checkRequirement: () => EternityChallenges.completions >= 50,
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER
  },
  {
    id: 124,
    name: "오래 지속되는 관계",
    get description() {
      return `단 하나의 무한 동안 초당 무한 파워 생산량이 현재 무한 파워를
      ${formatInt(60)}초 연속으로 초과하게 하세요.`;
    },
    checkRequirement: () => AchievementTimers.marathon2
      .check(
        !EternityChallenge(7).isRunning &&
        InfinityDimension(1).productionPerSecond.gt(Currency.infinityPower.value),
        60
      ),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 125,
    name: "뒤에서 잔치하는 것처럼",
    get description() {
      return `현재 영원 중 무한을 하지 않고 1번째 반물질 차원도 없이
      무한 포인트 ${format(DC.E90)}에 도달하세요.`;
    },
    checkRequirement: () => Currency.infinityPoints.exponent >= 90 &&
      player.requirementChecks.eternity.noAD1 && Currency.infinities.eq(0),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "이번 무한에서 소비한 시간에 비례한 무한 포인트 배율을 획득합니다.",
    effect() {
      const thisInfinity = Time.thisInfinity.totalSeconds * 10 + 1;
      return DC.D2.pow(Math.log(thisInfinity) * Math.min(Math.pow(thisInfinity, 0.11), 500));
    },
    cap: () => Effarig.eternityCap,
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 126,
    name: "대중음악",
    get description() { return `반물질 은하보다 복제체 은하를 ${formatInt(180)}배 더 많이 보유하세요.`; },
    checkRequirement: () => Replicanti.galaxies.total >= 180 * player.galaxies && player.galaxies > 0,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `복제체 은하가 복제체를 ${formatInt(1)}으로 초기화하는 대신
      ${format(Decimal.NUMBER_MAX_VALUE, 1, 0)}으로 나눕니다.`;
    },
  },
  {
    id: 127,
    name: "또 다른 프레스티지 레이어가 갖고 싶었는데...",
    get description() { return `영원 포인트를 ${format(Decimal.NUMBER_MAX_VALUE, 1, 0)} 보유하세요.`; },
    checkRequirement: () => Currency.eternityPoints.gte(Decimal.NUMBER_MAX_VALUE),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 128,
    name: "어떻게 해야 없애지",
    get description() { return `시간 연구 없이 무한 포인트 ${formatPostBreak("1e22000")}에 도달하세요.`; },
    checkRequirement: () => Currency.infinityPoints.exponent >= 22000 && player.timestudy.studies.length === 0,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "시간 차원이 보유한 시간 연구 수만큼 곱해집니다.",
    effect: () => Math.max(player.timestudy.studies.length, 1),
    formatEffect: value => `${formatX(value)}`
  },
  {
    id: 131,
    name: "윤리적 소비는 없다",
    get description() { return `적립 무한을 ${format(DC.D2E9)} 보유하세요.`; },
    checkRequirement: () => Currency.infinitiesBanked.gt(DC.D2E9),
    checkEvent: [GAME_EVENT.ETERNITY_RESET_AFTER, GAME_EVENT.SAVE_CONVERTED_FROM_PREVIOUS_VERSION],
    get reward() {
      return `무한을 ${formatX(2)} 더 많이 획득하며,
      영원 이후 무한의 ${formatPercents(0.05)}가 적립 무한으로 영구 보존됩니다.`;
    },
    effects: {
      infinitiesGain: 2,
      bankedInfinitiesGain: () => Currency.infinities.value.times(0.05).floor()
    }

  },
  {
    id: 132,
    name: "독특한 눈송이들",
    get description() {
      return `현재 영원 중 복제체 은하를 얻지 않고 반물질 은하를 ${formatInt(569)}개 보유하세요.`;
    },
    checkRequirement: () => player.galaxies >= 569 && player.requirementChecks.eternity.noRG,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    reward: "반물질 은하 수에 비례한 타키온 입자 및 팽창 시간 획득 배율을 얻습니다.",
    effect: () => 1.22 * Math.max(Math.pow(player.galaxies, 0.04), 1),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 133,
    name: "어차피 무한 같은 건 싫었어",
    get description() {
      return `무한 차원이나 IP ${formatX(2)} 배율을 구입하지 않고 무한 포인트 ${formatPostBreak(DC.E200000)}에 도달하세요.`;
    },
    checkRequirement: () =>
      Array.dimensionTiers.map(InfinityDimension).every(dim => dim.baseAmount === 0) &&
      player.IPMultPurchases === 0 &&
      Currency.infinityPoints.exponent >= 200000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "영원 시작 시 모든 무한 도전이 해금 및 완료된 상태로 시작합니다."
  },
  {
    id: 134,
    name: "언제쯤 충분해질까?",
    get description() { return `복제체를 ${formatPostBreak(DC.E18000)} 보유하세요.`; },
    checkRequirement: () => Replicanti.amount.exponent >= 18000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() {
      return `복제체 ${format(replicantiCap(), 1)} 미만에서 복제체를 ${formatInt(2)}배 빠르게 획득합니다.`;
    }
  },
  {
    id: 135,
    name: "감자^286078보다 빠르다",
    get description() { return `초당 틱속도가 ${formatPostBreak("1e8296262")}을 초과하게 하세요.`; },
    checkRequirement: () => Tickspeed.current.exponent <= -8296262,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 136,
    name: "이미 말했잖아, 시간은 상대적이라고",
    description: "시간을 팽창하세요.",
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
  {
    id: 137,
    name: "이제 팽창으로 생각하는군!",
    get description() {
      return `팽창 중 ${formatInt(1)}분 이내로 반물질 ${formatPostBreak("1e260000")}을 보유하세요.`;
    },
    checkRequirement: () =>
      Currency.antimatter.exponent >= 260000 &&
      Time.thisEternity.totalMinutes <= 1 &&
      player.dilation.active,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `팽창 중 팽창 시간과 시간 정리를 ${formatX(2)} 더 획득합니다.`; },
    effect: () => (player.dilation.active ? 2 : 1),
  },
  {
    id: 138,
    name: "이게 없애는 방법이야.",
    get description() {
      return `팽창 중 시간 연구 없이 무한 포인트 ${formatPostBreak("1e26000")}에 도달하세요.`;
    },
    checkRequirement: () =>
      player.timestudy.studies.length === 0 &&
      player.dilation.active &&
      Currency.infinityPoints.exponent >= 26000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "활성 및 유휴 시간 연구 경로에서 시간 연구 131과 133의 단점을 제거합니다."
  },
  {
    id: 141,
    name: "현실로 돌아와",
    description: "새로운 현실을 만드세요.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() {
      return `무한 포인트 획득량 ${formatX(4)}, 반물질 차원 ${formatInt(10)}개 구매 배율 +${format(0.1, 0, 1)} 증가.`;
    },
    effects: {
      ipGain: 4,
      buyTenMult: 0.1
    }
  },
  {
    id: 142,
    name: "이게 어떻게 작동하는 거야?",
    description: "자동화기를 해금하세요.",
    checkRequirement: () => Player.automatorUnlocked,
    checkEvent: [GAME_EVENT.REALITY_RESET_AFTER, GAME_EVENT.REALITY_UPGRADE_BOUGHT, GAME_EVENT.PERK_BOUGHT,
      GAME_EVENT.BLACK_HOLE_UNLOCKED],
    get reward() { return `차원 부스트가 ${formatPercents(0.5)} 더 강해집니다.`; },
    effect: 1.5,
  },
  {
    id: 143,
    name: "야, 리스킨을 좋아한다더니...",
    get description() {
      return `최근 ${formatInt(10)}번의 영원이 모두 이전 영원보다 영원 포인트가
      ${format(Decimal.NUMBER_MAX_VALUE, 1, 0)}배 이상 높아야 합니다.`;
    },
    checkRequirement: () => {
      if (player.records.recentEternities.some(i => i[0] === Number.MAX_VALUE)) return false;
      const eternities = player.records.recentEternities.map(run => run[2]);
      for (let i = 0; i < eternities.length - 1; i++) {
        if (eternities[i].lt(eternities[i + 1].times(Decimal.NUMBER_MAX_VALUE))) return false;
      }
      return true;
    },
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    reward: "은하가 더 이상 차원 부스트를 초기화하지 않습니다."
  },
  {
    id: 144,
    name: "인터스텔라 참조야?",
    description: "블랙홀을 해금하세요.",
    checkRequirement: () => BlackHole(1).isUnlocked,
    checkEvent: GAME_EVENT.BLACK_HOLE_UNLOCKED,
  },
  {
    id: 145,
    name: "이게 맞게 된 거야?",
    description: "블랙홀의 간격이 지속 시간보다 짧아지게 하세요.",
    checkRequirement: () => BlackHoles.list.some(bh => bh.interval < bh.duration),
    checkEvent: GAME_EVENT.BLACK_HOLE_UPGRADE_BOUGHT,
    get reward() { return `블랙홀 간격이 ${formatPercents(0.1)} 짧아집니다.`; },
    effect: 0.9
  },
  {
    id: 146,
    name: "사는 보람",
    description: "모든 특전을 구입하세요.",
    checkRequirement: () => player.reality.perks.size === Perks.all.length,
    checkEvent: GAME_EVENT.PERK_BOUGHT,
    get reward() { return `글리프 희귀도 +${formatPercents(0.01)}.`; },
    effect: 1
  },
  {
    id: 147,
    name: "현실의 지배자",
    description: "모든 현실 업그레이드를 구입하세요.",
    checkRequirement: () => RealityUpgrades.allBought,
    checkEvent: GAME_EVENT.REALITY_UPGRADE_BOUGHT,
    reward: "현실의 천상체, 테레사를 해금합니다."
  },
  {
    id: 148,
    name: "로열 플러시",
    description: "각 기본 글리프 종류를 하나씩 장착한 채로 현실을 수행하세요.",
    checkRequirement: () => BASIC_GLYPH_TYPES
      .every(type => Glyphs.activeList.some(g => g.type === type)),
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    reward: "장착한 서로 다른 글리프 종류 수만큼 획득 글리프 레벨이 증가합니다.",
    effect: () => (new Set(Glyphs.activeWithoutCompanion.map(g => g.type))).size,
    formatEffect: value => `+${formatInt(value)}`
  },
  {
    id: 151,
    name: "어차피 정말 필요 없었잖아",
    get description() {
      return `현재 무한 중 8번째 반물질 차원을 구입하지 않고 반물질 은하를 ${formatInt(800)}개 보유하세요.`;
    },
    checkRequirement: () => player.galaxies >= 800 && player.requirementChecks.infinity.noAD8,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    reward: "업적의 천상체, V를 해금합니다."
  },
  {
    id: 152,
    name: "글리프 더 있어?",
    get description() { return `인벤토리에 글리프를 ${formatInt(100)}개 보유하세요.`; },
    checkRequirement: () => Glyphs.inventoryList.length >= 100,
    checkEvent: GAME_EVENT.GLYPHS_CHANGED
  },
  {
    id: 153,
    name: "\"반물질도 안 중요해\"라고 해야겠네",
    description: "반물질을 생산하지 않고 현실을 수행하세요.",
    checkRequirement: () => player.requirementChecks.reality.noAM,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
  },
  {
    id: 154,
    name: "나는 속도다",
    get description() { return `게임 시간 ${formatInt(5)}초 이내로 현실을 수행하세요.`; },
    checkRequirement: () => Time.thisReality.totalSeconds <= 5,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() { return `매 현실마다 ${formatPercents(0.1)} 확률로 현실 횟수와 특전 포인트가 ${formatX(2)}배가 됩니다.`; },
    effect: 0.1
  },
  {
    id: 155,
    name: "업적 #15983",
    get description() { return `${formatFloat(13.7, 1)}십억 년 동안 플레이하세요.`; },
    checkRequirement: () => Time.totalTimePlayed.totalYears > 13.7e9,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `블랙홀 지속 시간이 ${formatPercents(0.1)} 길어집니다.`; },
    effect: 1.1
  },
  {
    id: 156,
    name: "대학교 중퇴",
    description: "시간 정리를 구입하지 않고 현실을 수행하세요.",
    checkRequirement: () => player.requirementChecks.reality.noPurchasedTT,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() { return `생성되는 시간 정리를 ${formatX(2.5, 0, 1)}배 더 획득하며, 맥도날드™️ 무료 쿠폰도 드립니다.`; },
    effect: 2.5
  },
  {
    id: 157,
    name: "효과가 굉장하다!",
    get description() { return `효과가 ${formatInt(4)}개인 글리프를 얻으세요.`; },
    checkRequirement: () => Glyphs.activeList.concat(Glyphs.inventoryList).map(
      glyph => getGlyphEffectsFromBitmask(glyph.effects, 0, 0)
        .filter(effect => effect.isGenerated).length
    ).max() >= 4,
    checkEvent: GAME_EVENT.GLYPHS_CHANGED
  },
  {
    id: 158,
    name: "야, 구멍 안에 있는 거야?",
    description: "두 블랙홀을 모두 영구적으로 만드세요.",
    checkRequirement: () => BlackHole(1).isPermanent && BlackHole(2).isPermanent,
    checkEvent: GAME_EVENT.BLACK_HOLE_UPGRADE_BOUGHT,
    get reward() { return `블랙홀 파워가 ${formatPercents(0.1)} 증가합니다.`; },
    effect: 1.1
  },
  {
    id: 161,
    name: "그게 네 착각이야",
    get description() { return `팽창 중 반물질을 ${formatPostBreak(DC.E1E8)} 보유하세요.`; },
    checkRequirement: () => Currency.antimatter.exponent >= 100000000 && player.dilation.active,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 162,
    name: "게임 재설치 후 서버 재접속",
    description: "모든 시간 연구를 동시에 보유하세요.",
    checkRequirement: () => player.timestudy.studies.length >= 58,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 163,
    name: "사실 엄청 쉬워! 그냥 약간 불편할 뿐!",
    get description() {
      return `현재 현실에서 게임 시간 ${formatInt(1)}초 미만으로 모든 영원 도전을 ${formatInt(5)}번씩 완료하세요.`;
    },
    checkRequirement: () => EternityChallenges.all.map(ec => ec.completions).min() >= 5 &&
      Time.thisReality.totalSeconds <= 1,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 164,
    name: "무한 곱하기 2",
    get description() { return `무한을 ${format(Decimal.NUMBER_MAX_VALUE, 1)}번 달성하세요.`; },
    checkRequirement: () => Currency.infinitiesTotal.gte(Decimal.NUMBER_MAX_VALUE),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `무한을 ×${formatInt(1024)} 더 획득합니다.`; },
    effect: 1024
  },
  {
    id: 165,
    name: "완벽한 균형",
    get description() { return `모든 글리프 레벨 요소가 동일하게 가중된 상태에서 레벨 ${formatInt(5000)} 글리프를 얻으세요.`; },
    checkRequirement: () => gainedGlyphLevel().actualLevel >= 5000 &&
      ["repl", "dt", "eternities"].every(
        i => player.celestials.effarig.glyphWeights[i] === player.celestials.effarig.glyphWeights.ep),
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    reward: "최적 자동 글리프 레벨 요소 조정을 해금합니다."
  },
  {
    id: 166,
    name: "좋아좋아.",
    get description() { return `정확히 레벨 ${formatInt(6969)}인 글리프를 얻으세요.`; },
    checkRequirement: () => gainedGlyphLevel().actualLevel === 6969,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    get reward() { return `글리프 레벨 +${formatInt(69)}.`; },
    effect: 69
  },
  {
    id: 167,
    name: "레이어 씨? 죄송하지만 목록에 없네요",
    get description() { return `현실 기계를 ${format(Decimal.NUMBER_MAX_VALUE, 1, 0)} 보유하세요.`; },
    checkRequirement: () => Currency.realityMachines.gte(Decimal.NUMBER_MAX_VALUE),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    reward: "현재 현실 기계 수에 비례해 현실 기계를 더 획득합니다.",
    effect: () => Math.clampMin(1, Currency.realityMachines.value.log2()),
    formatEffect: value => `${formatX(value, 2, 2)}`
  },
  {
    id: 168,
    name: "이런, 절반이나 왔어",
    get description() { return `라 천상체 기억 레벨 합계가 ${formatInt(50)}이 되게 하세요.`; },
    checkRequirement: () => Ra.totalPetLevel >= 50,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    get reward() { return `기억을 ${formatPercents(0.1)} 더 획득합니다.`; },
    effect: 1.1
  },
  {
    id: 171,
    name: "신이 기뻐하다",
    description: "희생 가능한 모든 글리프 종류를 최소 한 번씩 희생하세요.",
    checkRequirement: () => Object.values(player.reality.glyphs.sac).every(s => s > 0),
    checkEvent: GAME_EVENT.GLYPHS_CHANGED,
    get reward() { return `글리프 희생이 ${formatX(2)} 더 강해집니다.`; },
    effect: 2,
  },
  {
    id: 172,
    name: "은하수를 여행하는 현실의 안내서",
    get description() {
      return `충전된 무한 업그레이드, 장착된 글리프, 구입한 삼합 연구 없이
      현실 기계 ${format(Decimal.NUMBER_MAX_VALUE, 1)}개를 획득하며 현실을 수행하세요.`;
    },
    checkRequirement: () => MachineHandler.gainedRealityMachines.gte(Decimal.NUMBER_MAX_VALUE) &&
      player.celestials.ra.charged.size === 0 && Glyphs.activeWithoutCompanion.length === 0 &&
      player.requirementChecks.reality.noTriads,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
  },
  {
    id: 173,
    name: "이 업적은 존재하지 않는다 III",
    get description() { return `현실 기계를 ${formatPostBreak(DC.D9_99999E999, 5, 0)} 보유하세요.`; },
    checkRequirement: () => player.reality.realityMachines.gte(DC.D9_99999E999),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 174,
    name: "이미 두 개 있잖아?",
    description: "특이점을 획득하세요.",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.SINGULARITY_RESET_BEFORE
  },
  {
    id: 175,
    name: "최초의 반역사가",
    get description() { return `모든 연금술 자원을 ${formatInt(Ra.alchemyResourceCap)}개씩 보유하세요.`; },
    checkRequirement: () => AlchemyResources.all.every(x => x.amount >= Ra.alchemyResourceCap),
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER,
    get reward() {
      return `시너지즘이 ${formatPercents(1)}를 초과할 수 있으며 모멘텀이 ${formatX(10)} 빠르게 증가합니다.`;
    },
    effect: 10,
  },
  {
    id: 176,
    name: "엄마가 셋까지 셌어",
    description: "암흑 물질 차원을 소멸시키세요.",
  },
  {
    id: 177,
    name: "천상이 걸린 이정표",
    description: "모든 특이점 이정표를 최소 한 번씩 완료하세요.",
    checkRequirement: () => SingularityMilestones.all.every(x => x.completions > 0),
    checkEvent: GAME_EVENT.SINGULARITY_RESET_AFTER,
  },
  {
    id: 178,
    name: "세계의 파괴자",
    get description() { return `반물질 은하를 ${formatInt(100000)}개 보유하세요.`; },
    checkRequirement: () => player.galaxies >= 100000,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
    get reward() { return `모든 은하가 ${formatPercents(0.01)} 더 강해집니다.`; },
    effect: 1.01
  },
  {
    id: 181,
    displayId: 666,
    name: "반물질 차원의 영원",
    description: "현실을 파멸시키세요.",
    checkRequirement: () => Pelle.isDoomed,
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER,
  },
  {
    id: 182,
    name: "한 번 더",
    description: "모든 반물질 차원 자동구매기를 영구적으로 되찾으세요.",
    checkRequirement: () => PelleUpgrade.antimatterDimAutobuyers1.canBeApplied &&
      PelleUpgrade.antimatterDimAutobuyers2.canBeApplied,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 183,
    name: "데자부움",
    description: "파멸 중 무한 도전 5를 완료하세요.",
    checkRequirement: () => Pelle.isDoomed && InfinityChallenge(5).isCompleted,
    checkEvent: GAME_EVENT.INFINITY_CHALLENGE_COMPLETED,
    // Weirdly specific reward? Yes, its V's ST bonus because we forgot to disable it
    // when balancing Pelle and only realised too late.
    get reward() { return `모든 반물질 차원이 ${formatPow(1.0812403840463596, 0, 3)}제곱이 됩니다.`; },
    effect: 1.0812403840463596
  },
  {
    id: 184,
    name: "아웃!",
    description: "세 번째 펠레 스트라이크를 만나세요.",
    checkRequirement: () => PelleStrikes.eternity.hasStrike,
    checkEvent: GAME_EVENT.PELLE_STRIKE_UNLOCKED
  },
  {
    id: 185,
    name: "87년 전",
    description: "네 번째 펠레 스트라이크를 만나세요.",
    checkRequirement: () => PelleStrikes.ECs.hasStrike,
    checkEvent: GAME_EVENT.PELLE_STRIKE_UNLOCKED
  },
  {
    id: 186,
    displayId: 181,
    name: "건강하지 않은 집착",
    description: `파멸 중 시간 연구 181을 구입하세요.`,
  },
  {
    id: 187,
    name: "팽창된 시간의 그것",
    description: "파멸 중 팽창을 해금하세요.",
    checkRequirement: () => PelleStrikes.dilation.hasStrike,
    checkEvent: GAME_EVENT.PELLE_STRIKE_UNLOCKED,
    // We forgot to disable a singularity milestone while balancing Pelle; now it's disabled
    // and this upgrade has the same effect as it used to.
    get reward() {
      return `반복 가능한 팽창 시간 배율 업그레이드당 배율을 ${formatX(1.35, 0, 2)} 증가시킵니다.`;
    },
    effect: 1.35
  },
  {
    id: 188,
    name: "끝",
    description: "게임을 클리어하세요.",
    checkRequirement: () => GameEnd.endState > END_STATE_MARKERS.GAME_END && !GameEnd.removeAdditionalEnd,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
];
