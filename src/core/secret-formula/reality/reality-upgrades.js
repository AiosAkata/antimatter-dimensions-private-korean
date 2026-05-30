import { DC } from "../../constants";

const rebuyable = props => {
  props.cost = () => getHybridCostScaling(
    player.reality.rebuyables[props.id],
    1e30,
    props.initialCost,
    props.costMult,
    props.costMult / 10,
    DC.E309,
    1e3,
    props.initialCost * props.costMult
  );
  const { effect } = props;
  props.effect = () => Math.pow(
    effect + ImaginaryUpgrade(props.id).effectOrDefault(0),
    player.reality.rebuyables[props.id] * getAdjustedGlyphEffect("realityrow1pow"));
  props.description = () => props.textTemplate.replace("{value}",
    ImaginaryUpgrade(props.id).effectValue === 0
      ? formatInt(effect)
      : format(effect + ImaginaryUpgrade(props.id).effectValue, 2, 2));
  props.formatEffect = value => formatX(value, 2, 0);
  props.formatCost = value => format(value, 2, 0);
  return props;
};


export const realityUpgrades = [
  rebuyable({
    name: "시간 증폭기",
    id: 1,
    initialCost: 1,
    costMult: 30,
    textTemplate: "팽창된 시간을 {value}배 빠르게 획득",
    effect: 3
  }),
  rebuyable({
    name: "복제 증폭기",
    id: 2,
    initialCost: 1,
    costMult: 30,
    textTemplate: "복제체를 {value}배 빠르게 획득",
    effect: 3
  }),
  rebuyable({
    name: "영원 증폭기",
    id: 3,
    initialCost: 2,
    costMult: 30,
    textTemplate: "영원을 {value}배 더 많이 획득",
    effect: 3
  }),
  rebuyable({
    name: "초광속 증폭기",
    id: 4,
    initialCost: 2,
    costMult: 30,
    textTemplate: "타키온을 {value}배 더 많이 획득",
    effect: 3
  }),
  rebuyable({
    name: "무한 증폭기",
    id: 5,
    initialCost: 3,
    costMult: 50,
    textTemplate: "무한을 {value}배 더 많이 획득",
    effect: 5
  }),
  {
    name: "우주적으로 복제",
    id: 6,
    cost: 15,
    requirement: "복제체 갤럭시를 사용하지 않고 첫 번째 영원을 수동으로 완료",
    // Note that while noRG resets on eternity, the reality-level check will be false after the first eternity.
    // The noRG variable is eternity-level as it's also used for an achievement check
    hasFailed: () => !(player.requirementChecks.eternity.noRG && player.requirementChecks.reality.noEternities),
    checkRequirement: () => player.requirementChecks.eternity.noRG && player.requirementChecks.reality.noEternities,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    lockEvent: "복제체 갤럭시 획득",
    description: "복제체 속도가 복제체 갤럭시 개수를 기반으로 배율됨",
    effect: () => 1 + Replicanti.galaxies.total / 50,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "무한하게 구성",
    id: 7,
    cost: 15,
    requirement: "반물질 갤럭시 최대 1개로 첫 번째 무한을 완료",
    hasFailed: () => !(player.galaxies <= 1 && player.requirementChecks.reality.noInfinities),
    checkRequirement: () => player.galaxies <= 1 && player.requirementChecks.reality.noInfinities,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    canLock: true,
    lockEvent: "다른 반물질 갤럭시 획득",
    description: "무한 획득이 반물질 갤럭시 개수를 기반으로 강화됨",
    effect: () => 1 + player.galaxies / 30,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "역설적으로 달성",
    id: 8,
    cost: 15,
    requirement: "자동 성취 없이 수동으로 영원",
    hasFailed: () => player.reality.gainedAutoAchievements,
    checkRequirement: () => !player.reality.gainedAutoAchievements,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    // We don't have lockEvent because the modal can never show up for this upgrade
    description: "타키온 입자 획득이 성취 배율을 기반으로 강화됨",
    effect: () => Math.sqrt(Achievements.power),
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "언어적으로 확장",
    id: 9,
    cost: 15,
    requirement: () => `${format("1e4000")} 영원 포인트를 위해 영원하면서 레벨 ${formatInt(3)}+ 단일 글리프만 사용`,
    hasFailed: () => {
      const invalidEquippedGlyphs = Glyphs.activeWithoutCompanion.length > 1 ||
        (Glyphs.activeWithoutCompanion.length === 1 && Glyphs.activeWithoutCompanion[0].level < 3);
      const hasValidGlyphInInventory = Glyphs.inventory.countWhere(g => g && g.level >= 3) > 0;
      return invalidEquippedGlyphs || (Glyphs.activeWithoutCompanion.length === 0 && !hasValidGlyphInInventory);
    },
    checkRequirement: () => Currency.eternityPoints.exponent >= 4000 &&
      Glyphs.activeWithoutCompanion.length === 1 && Glyphs.activeWithoutCompanion[0].level >= 3,
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    canLock: true,
    // There are two locking events - equipping a glyph with too low a level, and equipping a second glyph
    description: "글리프 슬롯 추가 획득",
    effect: () => 1
  },
  {
    name: "존재론적으로 연장",
    id: 10,
    cost: 15,
    requirement: () => `최소 ${formatPostBreak(DC.E400)} 무한 포인트로 첫 수동 영원 완료`,
    hasFailed: () => !player.requirementChecks.reality.noEternities,
    checkRequirement: () => Currency.infinityPoints.exponent >= 400 &&
      player.requirementChecks.reality.noEternities,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    lockEvent: "영원",
    bypassLock: () => Currency.infinityPoints.exponent >= 400,
    description: () => `매 현실마다 ${formatInt(100)} 영원으로 시작 (현재 현실에도 적용)`,
    automatorPoints: 15,
    shortDescription: () => `${formatInt(100)} 영원으로 시작`,
    effect: () => 100
  },
  {
    name: "무한의 흐름",
    id: 11,
    cost: 50,
    requirement: () => `${format(Currency.infinitiesBanked.value, 2)}/${format(DC.E12)} 저장된 무한`,
    checkRequirement: () => Currency.infinitiesBanked.exponent >= 12,
    checkEvent: [GAME_EVENT.ETERNITY_RESET_AFTER, GAME_EVENT.REALITY_FIRST_UNLOCKED],
    description: "매초 무한을 통해 정상적으로 획득할 무한의 10%를 획득",
    automatorPoints: 5,
    shortDescription: () => `지속적인 무한 생성`,
    effect: () => gainedInfinities().times(0.1),
    formatEffect: value => `${format(value)} per second`
  },
  {
    name: "아는 존재",
    id: 12,
    cost: 50,
    requirement: () => `영원 도전 1을 완료하지 않고 ${format(DC.E70)} 영원 포인트를 위해 영원`,
    hasFailed: () => EternityChallenge(1).completions !== 0,
    checkRequirement: () => Currency.eternityPoints.exponent >= 70 && EternityChallenge(1).completions === 0,
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    canLock: true,
    lockEvent: "영원 도전 1 완료",
    description: "현실 및 시간 정리 개수를 기반으로 한 영원 포인트 배율",
    effect: () => Currency.timeTheorems.value
      .minus(DC.E3).clampMin(2)
      .pow(Math.log2(Math.min(Currency.realities.value, 1e4))).clampMin(1),
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "원격 기계적 과정",
    id: 13,
    cost: 50,
    requirement: () => `시간 차원 5-8 없이 ${format(DC.E4000)} 영원 포인트를 위해 영원`,
    hasFailed: () => !Array.range(5, 4).every(i => TimeDimension(i).amount.equals(0)),
    checkRequirement: () => Currency.eternityPoints.exponent >= 4000 &&
      Array.range(5, 4).every(i => TimeDimension(i).amount.equals(0)),
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    canLock: true,
    lockEvent: "4번째 TD 위의 시간 차원 구입",
    description: () => `영원 자동구매기 개선 및 시간 차원 자동구매기 및 ${formatX(5)} EP 해금`,
    automatorPoints: 10,
    shortDescription: () => `TD 및 ${formatX(5)} EP 자동구매기, 개선된 영원 자동구매기`,
  },
  {
    name: "영원의 흐름",
    id: 14,
    cost: 50,
    requirement: () => `${format(Currency.eternities.value, 2)}/${format(1e7)} 영원`,
    checkRequirement: () => Currency.eternities.gte(1e7),
    checkEvent: [GAME_EVENT.ETERNITY_RESET_AFTER, GAME_EVENT.REALITY_FIRST_UNLOCKED],
    description: "현실 개수와 동일한 영원 획득 (초당)",
    automatorPoints: 5,
    shortDescription: () => `지속적인 영원 생성`,
    effect: () => Currency.realities.value * Ra.unlocks.continuousTTBoost.effects.eternity.effectOrDefault(1),
    formatEffect: value => `${format(value)} per second`
  },
  {
    name: "역설적인 영원",
    id: 15,
    cost: 50,
    requirement: () => `${formatX(5)} 영원 포인트 업그레이드를 구입하지 않고 ${format(DC.E10)} 영원 포인트 보유`,
    hasFailed: () => player.epmultUpgrades !== 0,
    checkRequirement: () => Currency.eternityPoints.exponent >= 10 && player.epmultUpgrades === 0,
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    canLock: true,
    lockEvent: () => `${formatX(5)} EP 업그레이드 구입`,
    description: () => `${formatX(5)} 영원 포인트 배율을 기반으로 타키온 입자 획득 강화`,
    effect: () => Math.max(Math.sqrt(Decimal.log10(EternityUpgrade.epMult.effectValue)) / 9, 1),
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "희귀도의 불일치",
    id: 16,
    cost: 1500,
    requirement: () => `흔하지 않거나 더 나은 희귀도의 글리프 ${formatInt(4)}개를 장착한 현실
      (${formatInt(Glyphs.activeWithoutCompanion.countWhere(g => g && g.strength >= 1.5))} 장착)`,
    hasFailed: () => {
      const availableGlyphs = Glyphs.inventory.countWhere(g => g && g.strength >= 1.5);
      const equipped = Glyphs.activeWithoutCompanion.countWhere(g => g.strength >= 1.5);
      const availableSlots = Glyphs.activeSlotCount - Glyphs.activeList.length;
      return equipped + Math.min(availableGlyphs, availableSlots) < 4;
    },
    checkRequirement: () => Glyphs.activeWithoutCompanion.countWhere(g => g.strength >= 1.5) === 4,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    description: "글리프 희귀도 공식 개선",
    effect: 1.3,
    formatCost: value => format(value, 1, 0)
  },
  {
    name: "효능의 이중성",
    id: 17,
    cost: 1500,
    requirement: () => `각각 최소 ${formatInt(2)}개 효과를 가진 글리프 ${formatInt(4)}개를 장착한 현실
      (${formatInt(Glyphs.activeWithoutCompanion.countWhere(g => g && countValuesFromBitmask(g.effects) >= 2))}
      장착)`,
    hasFailed: () => {
      const availableGlyphs = Glyphs.inventory.countWhere(g => g && countValuesFromBitmask(g.effects) >= 2);
      const equipped = Glyphs.activeWithoutCompanion.countWhere(g => countValuesFromBitmask(g.effects) >= 2);
      const availableSlots = Glyphs.activeSlotCount - Glyphs.activeList.length;
      return equipped + Math.min(availableGlyphs, availableSlots) < 4;
    },
    checkRequirement: () => Glyphs.activeWithoutCompanion.countWhere(g => countValuesFromBitmask(g.effects) >= 2) === 4,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    description: () => `글리프에 추가 효과를 얻을 ${formatPercents(0.5)} 확률`,
    effect: 0.5,
    formatCost: value => format(value, 1, 0)
  },
  {
    name: "영원의 측정",
    id: 18,
    cost: 1500,
    requirement: () => `각각 레벨 ${formatInt(10)} 이상의 글리프 ${formatInt(4)}개를 장착한 현실
      (${formatInt(Glyphs.activeWithoutCompanion.countWhere(g => g && g.level >= 10))} 장착)`,
    hasFailed: () => {
      const availableGlyphs = Glyphs.inventory.countWhere(g => g && g.level >= 10);
      const equipped = Glyphs.activeWithoutCompanion.countWhere(g => g.level >= 10);
      const availableSlots = Glyphs.activeSlotCount - Glyphs.activeList.length;
      return equipped + Math.min(availableGlyphs, availableSlots) < 4;
    },
    checkRequirement: () => Glyphs.activeWithoutCompanion.countWhere(g => g.level >= 10) === 4,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    description: "영원 개수가 글리프 레벨을 강화",
    effect: () => Math.max(Math.sqrt(Currency.eternities.value.plus(1).log10()) * 0.45, 1),
    formatCost: value => format(value, 1, 0)
  },
  {
    name: "강화하기 위해 탐색",
    id: 19,
    cost: 1500,
    requirement: () => `한 번에 총 ${formatInt(30)}개 이상의 글리프 보유
      (보유 중 ${formatInt(Glyphs.allGlyphs.countWhere(g => g.type !== "companion"))})`,
    hasFailed: () => Glyphs.allGlyphs.countWhere(g => g.type !== "companion") < 30,
    checkRequirement: () => Glyphs.allGlyphs.countWhere(g => g.type !== "companion") >= 30,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    description: "글리프를 희생하여 영구적 보너스 획득 (Shift + 클릭)",
    formatCost: value => format(value, 1, 0)
  },
  {
    name: "특이점의 동등성",
    id: 20,
    cost: 1500,
    requirement: () => `첫 블랙홀 해금`,
    hasFailed: () => !BlackHole(1).isUnlocked && Currency.realityMachines.lt(100),
    checkRequirement: () => BlackHole(1).isUnlocked,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "다른 블랙홀 해금",
    automatorPoints: 10,
    shortDescription: () => `두 번째 블랙홀`,
    formatCost: value => format(value, 1, 0)
  },
  {
    name: "우주 복합체",
    id: 21,
    cost: 100000,
    requirement: () => `모든 유형의 총 갤럭시 ${formatInt(Replicanti.galaxies.total + player.galaxies +
      player.dilation.totalTachyonGalaxies)}/${formatInt(2800)}`,
    checkRequirement: () =>
      Replicanti.galaxies.total + player.galaxies + player.dilation.totalTachyonGalaxies >= 2800,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => `원격 반물질 갤럭시 스케일링이 ${formatInt(1e5)} 갤럭시로 이동`,
    effect: 1e5
  },
  {
    name: "시간적 초월",
    id: 22,
    cost: 100000,
    requirement: () => `${format(Currency.timeShards.value, 1)}/${format(DC.E28000)} 시간 파편`,
    checkRequirement: () => Currency.timeShards.exponent >= 28000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "이 현실에서 보낸 날짜를 기반으로 한 시간 차원 배율",
    effect: () => Decimal.pow10(Math.pow(1 + 2 * Math.log10(Time.thisReality.totalDays + 1), 1.6)),
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "복제 신속성",
    id: 23,
    cost: 100000,
    requirement: () => `게임 시간 ${formatInt(15)}분 이내에 현실 도달
      (가장 빠름: ${Time.bestReality.toStringShort()})`,
    hasFailed: () => Time.thisReality.totalMinutes >= 15,
    checkRequirement: () => Time.thisReality.totalMinutes < 15,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    description: "복제체 속도가 가장 빠른 게임 시간 현실을 기반으로 강화됨",
    effect: () => 15 / Math.clamp(Time.bestReality.totalMinutes, 1 / 12, 15),
    cap: 180,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "합성 상징주의",
    id: 24,
    cost: 100000,
    requirement: () => `글리프를 장착하지 않고 ${formatInt(5000)} 현실 기계를 위해 현실`,
    hasFailed: () => Glyphs.activeWithoutCompanion.length > 0,
    checkRequirement: () => MachineHandler.gainedRealityMachines.gte(5000) &&
      Glyphs.activeWithoutCompanion.length === 0,
    canLock: true,
    lockEvent: "비동반자 글리프 장착",
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    description: "글리프 슬롯 추가 획득",
    effect: () => 1
  },
  {
    name: "노력 없는 존재",
    id: 25,
    cost: 100000,
    requirement: () => `${format(DC.E11111)} EP 도달 (최고: ${format(player.records.bestReality.bestEP, 2)} EP)`,
    checkRequirement: () => player.records.bestReality.bestEP.exponent >= 11111,
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    description: "현실 자동구매기 및 자동화 명령어 해금",
    automatorPoints: 100,
    shortDescription: () => `현실 자동구매기`,
  },
];
