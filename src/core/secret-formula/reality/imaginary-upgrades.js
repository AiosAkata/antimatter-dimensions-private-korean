import { DC } from "../../constants";

const rebuyable = props => {
  props.cost = () => props.initialCost * Math.pow(props.costMult, player.reality.imaginaryRebuyables[props.id]);
  const { effect } = props;
  if (props.isDecimal) props.effect = () => Decimal.pow(effect, player.reality.imaginaryRebuyables[props.id]);
  else props.effect = () => effect * player.reality.imaginaryRebuyables[props.id];
  if (!props.formatEffect) props.formatEffect = value => `+${format(value, 2, 2)}`;
  props.formatCost = value => format(value, 2, 0);
  return props;
};

export const imaginaryUpgrades = [
  rebuyable({
    name: "시간 강화기",
    id: 1,
    initialCost: 3,
    costMult: 60,
    description: () => `시간 증폭기 배율 증가 +${format(0.15, 2, 2)}`,
    effect: 0.15
  }),
  rebuyable({
    name: "복제 강화기",
    id: 2,
    initialCost: 4,
    costMult: 60,
    description: () => `복제 증폭기 배율 증가 +${format(0.15, 2, 2)}`,
    effect: 0.15
  }),
  rebuyable({
    name: "영원 강화기",
    id: 3,
    initialCost: 1,
    costMult: 40,
    description: () => `영원 증폭기 배율 증가 +${format(0.4, 2, 2)}`,
    effect: 0.4
  }),
  rebuyable({
    name: "초광속 강화기",
    id: 4,
    initialCost: 5,
    costMult: 80,
    description: () => `초광속 증폭기 배율 증가 +${format(0.15, 2, 2)}`,
    effect: 0.15
  }),
  rebuyable({
    name: "무한 강화기",
    id: 5,
    initialCost: 1,
    costMult: 30,
    description: () => `무한 증폭기 배율 증가 +${format(0.6, 2, 2)}`,
    effect: 0.6
  }),
  rebuyable({
    name: "타원 물질성",
    id: 6,
    initialCost: 1e4,
    costMult: 500,
    description: () => `현실 기계 상한 증가 ${formatX(1e100)}`,
    effect: 1e100,
    formatEffect: value => `${formatX(value)}`,
    isDecimal: true
  }),
  rebuyable({
    name: "룬 보증",
    id: 7,
    initialCost: 2e5,
    costMult: 500,
    description: () => `글리프 불안정성 시작 레벨 지연 ${formatInt(200)}`,
    effect: 200,
    formatEffect: value => `+${formatInt(value)} 레벨`
  }),
  rebuyable({
    name: "쌍곡선 아페이로곤",
    id: 8,
    initialCost: 1e7,
    costMult: 800,
    description: () => `무한 차원에 ${format("1e100000")}를 곱함`,
    effect: DC.E100000,
    formatEffect: value => `${formatX(value)}`,
    isDecimal: true
  }),
  rebuyable({
    name: "우주 필라멘트",
    id: 9,
    initialCost: 1e9,
    costMult: 1000,
    description: () => `갤럭시 강도 증가`,
    effect: 0.03,
    formatEffect: value => `+${formatPercents(value)}`,
  }),
  rebuyable({
    name: "엔트로피 응축",
    id: 10,
    initialCost: 8e9,
    costMult: 2000,
    description: () => `특이점 획득 증가`,
    effect: 1,
    formatEffect: value => `${formatX(1 + value, 2)}`
  }),
  {
    name: "간섭 의혹",
    id: 11,
    cost: 5e7,
    requirement: () => `총 ${format(1e90)} 유물 파편
      (보유 중 ${format(player.celestials.effarig.relicShards, 2)})`,
    hasFailed: () => false,
    checkRequirement: () => player.celestials.effarig.relicShards >= 1e90,
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER,
    description: "총 반물질을 기반으로 한 시간 차원 파워",
    effect: () => 1 + Math.log10(player.records.totalAntimatter.log10()) / 100,
    formatEffect: value => `${formatPow(value, 0, 4)}`,
    isDisabledInDoomed: true
  },
  {
    name: "환상의 결과",
    id: 12,
    cost: 5e7,
    requirement: () => `단일 글리프 레벨 팩터 가중치 ${formatInt(100)}에서 레벨 ${formatInt(9000)} 글리프 생성`,
    hasFailed: () => false,
    checkRequirement: () => Object.values(player.celestials.effarig.glyphWeights).some(w => w === 100) &&
      gainedGlyphLevel().actualLevel >= 9000,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
    description: "상상 업그레이드 구입 개수를 기반으로 무료 차원부스트 획득",
    effect: () => 2e4 * ImaginaryUpgrades.totalRebuyables,
    formatEffect: value => `${format(value, 1)}`,
    isDisabledInDoomed: true
  },
  {
    name: "정보의 무상성",
    id: 13,
    cost: 5e7,
    requirement: () => `이름없는 자의 현실 내에서 ${format(Number.MAX_VALUE, 2)} 투영된 현실 기계 도달`,
    hasFailed: () => !Enslaved.isRunning,
    // This is for consistency with the UI, which displays an amplified "projected RM" value on the reality button
    checkRequirement: () => Enslaved.isRunning &&
      MachineHandler.uncappedRM.times(simulatedRealityCount(false) + 1).gte(Number.MAX_VALUE),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "구입한 상상 업그레이드를 기반으로 상상 기계 상한 증가",
    effect: () => 1 + ImaginaryUpgrades.totalRebuyables / 20 + ImaginaryUpgrades.totalSinglePurchase / 2,
    formatEffect: value => `${formatX(value, 2, 1)}`,
    isDisabledInDoomed: true
  },
  {
    name: "침입의 회상",
    id: 14,
    cost: 3.5e8,
    formatCost: x => format(x, 1),
    requirement: () => `영원 도전 5 내에서 ${format("1e75000000000")} / 초의 틱스피드 도달`,
    hasFailed: () => false,
    checkRequirement: () => EternityChallenge(5).isRunning && Tickspeed.perSecond.exponent >= 7.5e10,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => `모든 차원 구입당 배율을 ${formatPow(1.5, 0, 1)}로 상향`,
    effect: 1.5,
    isDisabledInDoomed: true
  },
  {
    name: "이상의 제조",
    id: 15,
    cost: 1e9,
    requirement: () => `1차 무한 차원을 보유하지 않고 ${format("1e1500000000000")} 반물질 도달`,
    hasFailed: () => player.requirementChecks.reality.maxID1.gt(0),
    checkRequirement: () => player.requirementChecks.reality.maxID1.eq(0) && player.antimatter.exponent >= 1.5e12,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    // This upgrade lock acts in multiple different conditions, but isn't 100% foolproof and also blocks a few edge
    // cases which technically should be allowed but would be hard to communicate in-game. Forbidden actions are:
    // - Purchasing any ID (edge case: this is acceptable for ID2-8 inside EC2 or EC10)
    // - Purchasing any TD with any amount of EC7 completions (edge case: acceptable within EC1 or EC10)
    // - Entering EC7 with any amount of purchased TD
    description: () => `${
      Pelle.isDoomed ? "해금" : "반물질 차원을 연속체로 변환하고 해금"
    } 라이텔라, 차원의 셀레스티얼`,
  },
  {
    name: "질량 없는 운동량",
    id: 16,
    cost: 3.5e9,
    formatCost: x => format(x, 1),
    requirement: () => `라이텔라의 현실을 ${formatInt(30)}초 이내에 두 번 불안정화`,
    hasFailed: () => false,
    checkRequirement: () => Laitela.maxAllowedDimension <= 6,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "2번째 암흑물질 차원 해금",
  },
  {
    name: "카이랄 진동",
    id: 17,
    cost: 6e9,
    requirement: () => `최소 ${formatInt(20)}개 특이점을 한 번에 자동으로 응축`,
    hasFailed: () => false,
    checkRequirement: () => Singularity.singularitiesGained >= 20 &&
      Currency.darkEnergy.gte(Singularity.cap * SingularityMilestone.autoCondense.effectOrDefault(Infinity)),
    checkEvent: GAME_EVENT.SINGULARITY_RESET_BEFORE,
    description: "3번째 암흑물질 차원 해금",
  },
  {
    name: "차원 대칭",
    id: 18,
    cost: 1.5e10,
    formatCost: x => format(x, 1),
    requirement: () => `총 ${formatInt(80000)}개 갤럭시 보유`,
    hasFailed: () => false,
    checkRequirement: () => Replicanti.galaxies.total + player.galaxies +
      player.dilation.totalTachyonGalaxies >= 80000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "4번째 암흑물질 차원 해금",
  },
  {
    name: "결정론적 방사선",
    id: 19,
    cost: 2.8e10,
    formatCost: x => format(x, 1),
    requirement: () => `이 현실에서 ${formatInt(8)}개를 초과하는 시간 연구를 보유하지 않고 ${formatInt(3.85e6)} 틱스피드 연속체 도달`,
    hasFailed: () => player.requirementChecks.reality.maxStudies > 8,
    checkRequirement: () => player.requirementChecks.reality.maxStudies <= 8 &&
      Tickspeed.continuumValue >= 3.85e6,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    lockEvent: () => `${formatInt(8)}개를 초과하는 시간 연구 구입`,
    description: "암흑물질 소멸 해금"
  },
  {
    name: "진공 가속",
    id: 20,
    cost: 3e12,
    requirement: () => `최소 ${formatPercents(1)}의 연속체 증가 보유`,
    hasFailed: () => false,
    checkRequirement: () => Laitela.matterExtraPurchaseFactor >= 2,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => `반복 가능한 상상 업그레이드용 자동구매기 해금 및 상상 기계를 ${formatInt(10)}배 빠르게 생성`,
    effect: 10,
    isDisabledInDoomed: true
  },
  {
    name: "실존적 제거",
    id: 21,
    cost: 1e13,
    requirement: () => `전체 현실에서 연속체가 비활성화된 상태로 ${format("1e7400000000000")} 반물질 도달`,
    hasFailed: () => !player.requirementChecks.reality.noContinuum,
    checkRequirement: () => player.requirementChecks.reality.noContinuum &&
      Currency.antimatter.value.log10() >= 7.4e12,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    lockEvent: "연속체 활성화",
    description: "소멸 배율 획득이 상상 기계를 기반으로 개선됨",
    effect: () => Math.clampMin(Math.pow(Math.log10(Currency.imaginaryMachines.value) - 10, 3), 1),
    formatEffect: value => `${formatX(value, 2, 1)}`,
    isDisabledInDoomed: true
  },
  {
    name: "완전 종료",
    id: 22,
    cost: 1.5e14,
    formatCost: x => format(x, 1),
    requirement: () => `에파리그의 현실에서 최소 ${formatInt(4)}개의 저주받은 글리프를 장착한 상태로 ${format("1e150000000000")} 반물질 도달`,
    // Note: 4 cursed glyphs is -12 glyph count, but equipping a positive glyph in the last slot is allowed
    hasFailed: () => !Effarig.isRunning || player.requirementChecks.reality.maxGlyphs > -10,
    checkRequirement: () => Effarig.isRunning && player.requirementChecks.reality.maxGlyphs < -10 &&
      Currency.antimatter.value.exponent >= 1.5e11,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: () => `모든 글리프 희생 합계가 ${format(1e100)}로 증가`,
    effect: 1e100,
    isDisabledInDoomed: true
  },
  {
    name: "평면 정화",
    id: 23,
    cost: 6e14,
    requirement: () => `라의 현실에서 최대 ${formatInt(0)}개의 글리프를 장착한 상태로 글리프 레벨 ${formatInt(20000)} 도달`,
    hasFailed: () => !Ra.isRunning || player.requirementChecks.reality.maxGlyphs > 0,
    checkRequirement: () => Ra.isRunning && player.requirementChecks.reality.maxGlyphs <= 0 &&
      gainedGlyphLevel().actualLevel >= 20000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    description: "테세랙트 개수를 기반으로 무료 차원부스트 개수 증가",
    effect: () => Math.floor(0.25 * Math.pow(Tesseracts.effectiveCount, 2)),
    formatEffect: value => `${formatX(value)}`,
    isDisabledInDoomed: true
  },
  {
    name: "절대 무효",
    id: 24,
    cost: 6e14,
    // We unfortunately don't have the UI space to be more descriptive on this button without causing text overflow,
    // so hopefully the additional modals (from the upgrade lock) will mostly communicate the idea that this is under
    // the same conditions as hard V's Post-destination
    requirement: () => `라의 현실에서 완전히 역전된 블랙홀이 있는 상태로 ${formatInt(13000)}개의 반물질 갤럭시 보유`,
    hasFailed: () => !Ra.isRunning || player.requirementChecks.reality.slowestBH > 1e-300,
    checkRequirement: () => Ra.isRunning && player.requirementChecks.reality.slowestBH <= 1e-300 &&
      player.galaxies >= 13000,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    // Three locking events: uninvert, discharge, and entering (but not auto-completing) EC12
    description: "특이점 개수를 기반으로 무료 차원부스트 강도 증가",
    effect: () => Decimal.pow(player.celestials.laitela.singularities, 300),
    formatEffect: value => `${formatX(value, 2, 1)}`,
    isDisabledInDoomed: true
  },
  {
    name: "편재 소멸",
    id: 25,
    cost: 1.6e15,
    formatCost: x => format(x, 1),
    requirement: () => `라이텔라의 현실에서 모든 차원이 비활성화되고 최소 ${formatInt(4)}개의 빈 글리프 슬롯으로 현실 도달`,
    hasFailed: () => !Laitela.isRunning || Laitela.maxAllowedDimension !== 0 ||
      Glyphs.activeWithoutCompanion.length > 1,
    checkRequirement: () => Laitela.isRunning && Laitela.maxAllowedDimension === 0 &&
      Glyphs.activeWithoutCompanion.length <= 1 && TimeStudy.reality.isBought,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
    canLock: true,
    lockEvent: "다른 비동반자 글리프 장착",
    description: "펠레, 반물질의 셀레스티얼 해금",
  },
];
