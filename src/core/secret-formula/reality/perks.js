import { DC } from "../../constants";

export const PERK_FAMILY = {
  ANTIMATTER: "ANTIMATTER",
  INFINITY: "INFINITY",
  ETERNITY: "ETERNITY",
  DILATION: "DILATION",
  REALITY: "REALITY",
  AUTOMATION: "AUTOMATION",
  ACHIEVEMENT: "ACHIEVEMENT",
};

// This function isn't used in-game, see note below for its intended usage
// eslint-disable-next-line no-unused-vars
function vectorToNum(v) {
  return Math.floor(v.x / 5) + 400 * Math.floor(v.y / 5) + 80200;
}

/**
 * In order to reduce boilerplate code and excessive Vector object declarations, the node positions in fixed layouts
 * are specified as numbers which are decoded on-the-fly using positionNumToVector in PerksTab.vue. The function
 * vectorToNum above is the inverse of that function.
 *
 * To make a new preset layout, define vectorToNum in the console, move all the nodes around in-game and then run
 *    Object.values(PerkNetwork.network.body.nodes).filter(n => n.edges.length !== 0).map(v => vectorToNum(v))
 * in the console to get all the current node positions. Then, append the resulting numbers to each layoutPosList
 * array below and make the appripriate entry in PerkLayouts.
 *
 * Note: This encoding/decoding only works properly for coordinates with values between -1000 and 1000, and will
 * be slightly off for vectors whose coordinates aren't divisible by 5
 */
export const perks = {
  firstPerk: {
    id: 0,
    label: "시작",
    family: PERK_FAMILY.REALITY,
    get description() {
      return `현실 연구에서 성취 요구사항 제거
      및 현실에서 ${formatInt(4)}개의 다른 글리프 중 선택 가능.`;
    },
    effect: 4,
    layoutPosList: [76596, 80200, 80600, 80200, 80188, 67769],
  },
  startAM: {
    id: 10,
    label: "초반반물질",
    family: PERK_FAMILY.ANTIMATTER,
    get description() {
      return `매번 초기화마다 ${format(5e130)} 반물질로 시작.`;
    },
    bumpCurrency: () => Currency.antimatter.bumpTo(5e130),
    effect: 5e130,
    layoutPosList: [76559, 80600, 80199, 80600, 82191, 75745],
  },
  startIP1: {
    id: 12,
    label: "초반무한포인트1",
    family: PERK_FAMILY.INFINITY,
    get description() {
      return `매 영원 및 현실마다 ${format(5e15)} 무한 포인트로 시작.`;
    },
    bumpCurrency: () => Currency.infinityPoints.bumpTo(5e15),
    effect: 5e15,
    layoutPosList: [74523, 80599, 79798, 80599, 82594, 91322],
  },
  startIP2: {
    id: 13,
    label: "초반무한포인트2",
    family: PERK_FAMILY.INFINITY,
    get description() {
      return `매 영원 및 현실마다 ${format(5e130)} 무한 포인트로 시작.`;
    },
    bumpCurrency: () => Currency.infinityPoints.bumpTo(5e130),
    effect: 5e130,
    layoutPosList: [62111, 80598, 79797, 80998, 82597, 91690],
  },
  startEP1: {
    id: 14,
    label: "초반영원포인트1",
    family: PERK_FAMILY.ETERNITY,
    get description() {
      return `매 현실마다 ${formatInt(10)} 영원 포인트로 시작.`;
    },
    bumpCurrency: () => Currency.eternityPoints.bumpTo(10),
    effect: 10,
    automatorPoints: 5,
    shortDescription: () => `${formatInt(10)} EP로 시작`,
    layoutPosList: [88915, 80999, 79398, 80598, 82197, 103734],
  },
  startEP2: {
    id: 15,
    label: "초반영원포인트2",
    family: PERK_FAMILY.ETERNITY,
    get description() {
      return `매 현실마다 ${format(5000)} 영원 포인트로 시작.`;
    },
    bumpCurrency: () => Currency.eternityPoints.bumpTo(5000),
    effect: 5000,
    layoutPosList: [92484, 81398, 78998, 80597, 82200, 102193],
  },
  startEP3: {
    id: 16,
    label: "초반영원포인트3",
    family: PERK_FAMILY.ETERNITY,
    get description() {
      return `매 현실마다 ${format(5e9)} 영원 포인트로 시작.`;
    },
    bumpCurrency: () => Currency.eternityPoints.bumpTo(5e9),
    effect: 5e9,
    automatorPoints: 10,
    shortDescription: () => `${format(5e9)} EP로 시작`,
    layoutPosList: [96459, 81798, 78997, 80596, 82203, 106224],
  },
  startTP: {
    id: 17,
    label: "초반타키온",
    family: PERK_FAMILY.DILATION,
    get description() {
      return `팽창 해금 후 ${formatInt(10)} 타키온 입자 획득.`;
    },
    effect: () => (Enslaved.isRunning ? 1 : 10),
    automatorPoints: 5,
    shortDescription: () => `${formatInt(10)} TP로 시작`,
    layoutPosList: [102120, 81399, 79399, 80197, 81800, 109376],
  },
  antimatterNoReset: {
    id: 30,
    label: "반물질무초기화",
    family: PERK_FAMILY.ANTIMATTER,
    description: `차원부스트 및 반물질 갤럭시는 더 이상 반물질, 반물질 차원, 틱스피드 또는 차원 희생을 초기화하지 않음.`,
    layoutPosList: [85343, 81000, 79799, 80199, 82194, 92553],
  },
  studyPassive: {
    id: 31,
    label: "수동통과",
    family: PERK_FAMILY.ETERNITY,
    get description() {
      return `시간 연구 122를 ${formatX(50)} 영원 포인트로 개선하고 시간 연구 142를 ${formatX(DC.E50)} 무한 포인트로 개선.
        ${Pelle.isDoomed ? "" : `추가로 시간 연구 132는 복제체를 ${format(3)}배 빠르게 합니다.`}`;
    },
    layoutPosList: [67054, 79400, 80999, 80202, 78594, 52589],
  },
  autounlockEU1: {
    id: 40,
    label: "영원업그레이드1",
    family: PERK_FAMILY.ETERNITY,
    description: `영원을 보유하면 영원 업그레이드의 첫 번째 행을 자동으로 무료 해금.`,
    layoutPosList: [89407, 80601, 80201, 79800, 80591, 73007],
  },
  autounlockEU2: {
    id: 41,
    label: "영원업그레이드2",
    family: PERK_FAMILY.ETERNITY,
    get description() {
      return `영원 업그레이드의 두 번째 행이 원래 가격의 ${formatX(1e10)}배 저렴하게 자동으로 구입됨.`;
    },
    layoutPosList: [103008, 81001, 80202, 79400, 80594, 81867],
  },
  autounlockDilation1: {
    id: 42,
    label: "팽창업그레이드1",
    family: PERK_FAMILY.DILATION,
    description: "팽창 해금 후 팽창 업그레이드의 두 번째 행을 자동으로 무료 해금.",
    layoutPosList: [119833, 81801, 79403, 79398, 80200, 97510],
  },
  autounlockDilation2: {
    id: 43,
    label: "팽창업그레이드2",
    family: PERK_FAMILY.DILATION,
    description: "팽창 해금 후 팽창 업그레이드의 세 번째 행을 자동으로 무료 해금.",
    layoutPosList: [124260, 82201, 79003, 79397, 80203, 85513],
  },
  autounlockDilation3: {
    id: 44,
    label: "자동시간정리생성",
    family: PERK_FAMILY.DILATION,
    description: "수동적인 시간 정리 생성 팽창 업그레이드를 구입할 수 있게 되면 자동으로 구입.",
    automatorPoints: 5,
    shortDescription: () => "TT 생성 자동구매",
    layoutPosList: [124289, 82601, 79002, 79396, 80206, 72282],
  },
  autounlockTD: {
    id: 45,
    label: "자동시간차원",
    family: PERK_FAMILY.DILATION,
    description: "시간 차원 5-8을 구입할 수 있게 되면 자동으로 해금.",
    automatorPoints: 5,
    shortDescription: () => "TD 5-8 자동해금",
    layoutPosList: [127117, 82600, 79001, 79796, 80209, 61869],
  },
  autounlockReality: {
    id: 46,
    label: "자동현실",
    family: PERK_FAMILY.REALITY,
    get description() {
      return `${format(DC.E4000)} 영원 포인트를 보유하고 시간 차원 8을 해금하면 현실을 자동으로 해금.`;
    },
    automatorPoints: 10,
    shortDescription: () => "현실 자동해금",
    layoutPosList: [124343, 83000, 79000, 79795, 80212, 71046],
  },
  bypassIDAntimatter: {
    id: 51,
    label: "무한차원반물질제거",
    family: PERK_FAMILY.INFINITY,
    description: "무한 차원은 더 이상 반물질 요구사항이 없음.",
    layoutPosList: [51317, 80998, 79397, 80997, 82600, 104489],
  },
  bypassTGReset: {
    id: 52,
    label: "시간획득초기화제거",
    family: PERK_FAMILY.DILATION,
    description: "2번 구입 가능한 팽창 업그레이드가 더 이상 팽창된 시간을 초기화하지 않음.",
    layoutPosList: [116568, 81800, 79801, 79798, 81400, 112677],
  },
  bypassECDilation: {
    id: 53,
    label: "팽창초기화제거",
    family: PERK_FAMILY.DILATION,
    description: "시간 팽창 해금에서 영원 도전 11, 영원 도전 12 및 총 시간 정리 요구사항 제거.",
    automatorPoints: 5,
    shortDescription: () => `팽창 해금은 TT만 필요`,
    layoutPosList: [129011, 81802, 80203, 80198, 80600, 109116],
  },
  bypassEC1Lock: {
    id: 54,
    label: "영도1제거",
    family: PERK_FAMILY.ETERNITY,
    description: "시간 연구 181에서 영원 도전 1 요구사항 제거.",
    layoutPosList: [64284, 79000, 81399, 80603, 78597, 44167],
  },
  bypassEC2Lock: {
    id: 55,
    label: "영도2제거",
    family: PERK_FAMILY.ETERNITY,
    description: "시간 연구 181에서 영원 도전 2 요구사항 제거.",
    layoutPosList: [55463, 78999, 80998, 80602, 78197, 48944],
  },
  bypassEC3Lock: {
    id: 56,
    label: "영도3제거",
    family: PERK_FAMILY.ETERNITY,
    description: "시간 연구 181에서 영원 도전 3 요구사항 제거.",
    layoutPosList: [75475, 79001, 81400, 80203, 78997, 47822],
  },
  bypassEC5Lock: {
    id: 57,
    label: "영도5제거",
    family: PERK_FAMILY.ETERNITY,
    description: "시간 연구 62에서 영원 도전 5 요구사항 제거.",
    layoutPosList: [70626, 79800, 81000, 80201, 78591, 62607],
  },
  autocompleteEC1: {
    id: 60,
    label: "자동완료영도1",
    family: PERK_FAMILY.AUTOMATION,
    get description() {
      return `매 ${formatInt(60)}분(실시간)마다 영원 도전 1개 자동 완료.
              영원 도전은 순차적으로 완료되며, 다음 영원 도전으로 진행하기 전에 모든 이전 영원 도전이 완전히 완료되어야 함.`;
    },
    effect: 60,
    automatorPoints: 5,
    shortDescription: () => `매 ${formatInt(60)}분마다 영원 도전 자동완료`,
    layoutPosList: [90660, 79402, 81002, 79803, 79397, 46664],
  },
  autocompleteEC2: {
    id: 61,
    label: "자동완료영도2",
    family: PERK_FAMILY.AUTOMATION,
    get description() {
      return `매 ${formatInt(40)}분(실시간)마다 영원 도전 1개 자동 완료.
        (${formatInt(20)}분 감소)`;
    },
    effect: 40,
    layoutPosList: [95485, 79002, 81402, 79804, 79400, 53486],
  },
  autocompleteEC3: {
    id: 62,
    label: "자동완료영도3",
    family: PERK_FAMILY.AUTOMATION,
    get description() {
      return `매 ${formatInt(20)}분(실시간)마다 영원 도전 1개 자동 완료.
        (${formatInt(20)}분 감소)`;
    },
    effect: 20,
    automatorPoints: 10,
    shortDescription: () => `매 ${formatInt(20)}분마다 영원 도전 자동완료`,
    layoutPosList: [96311, 78602, 81401, 80204, 79403, 61903],
  },
  studyActiveEP: {
    id: 70,
    label: "활성경로",
    family: PERK_FAMILY.ETERNITY,
    description: "활성 경로 배율이 항상 최대화됨.",
    layoutPosList: [56633, 79399, 80599, 80601, 78194, 58565],
  },
  studyIdleEP: {
    id: 71,
    label: "수동경로",
    family: PERK_FAMILY.ETERNITY,
    get description() {
      return `수동 경로 배율이 이 무한/영원에서 ${formatInt(15)}분을 보낸 것처럼 시작.`;
    },
    effect: 15,
    layoutPosList: [80248, 79401, 81001, 79802, 78994, 56239],
  },
  studyECRequirement: {
    id: 72,
    label: "영도요구제거",
    family: PERK_FAMILY.ETERNITY,
    description: "영원 도전 해금을 위한 비-시간 정리 요구사항 제거.",
    automatorPoints: 10,
    shortDescription: () => "영도 보조 요구사항 제거",
    layoutPosList: [62714, 78600, 81398, 80604, 78600, 40599],
  },
  studyECBulk: {
    id: 73,
    label: "영도대량완료",
    family: PERK_FAMILY.ETERNITY,
    description:
      `더 높은 완료 목표에 도달하면 한 번에 영원 도전의 여러 층위를 완료할 수 있음.`,
    automatorPoints: 15,
    shortDescription: () => "영도 대량 완료",
    layoutPosList: [62741, 78200, 81397, 81004, 78603, 41435],
  },
  retroactiveTP1: {
    id: 80,
    label: "타키온입자1",
    family: PERK_FAMILY.DILATION,
    get description() {
      return `3번 구입 가능한 팽창 업그레이드를 구입할 때
        현재 타키온 입자량에 ${formatFloat(1.5, 1)}을 곱함.`;
    },
    effect: 1.5,
    layoutPosList: [111739, 81799, 79800, 79797, 81403, 115434],
  },
  retroactiveTP2: {
    id: 81,
    label: "타키온입자2",
    family: PERK_FAMILY.DILATION,
    get description() {
      return `3번 구입 가능한 팽창 업그레이드를 구입할 때
        현재 타키온 입자량에 ${formatInt(2)}를 곱함.`;
    },
    effect: 2,
    layoutPosList: [103757, 82199, 79401, 80196, 81406, 117382],
  },
  retroactiveTP3: {
    id: 82,
    label: "타키온입자3",
    family: PERK_FAMILY.DILATION,
    get description() {
      return `3번 구입 가능한 팽창 업그레이드를 구입할 때
        현재 타키온 입자량에 ${formatFloat(2.5, 1)}을 곱함.`;
    },
    effect: 2.5,
    layoutPosList: [96175, 82599, 79400, 80195, 81409, 116540],
  },
  retroactiveTP4: {
    id: 83,
    label: "타키온입자4",
    family: PERK_FAMILY.DILATION,
    get description() {
      return `3번 구입 가능한 팽창 업그레이드를 구입할 때
        현재 타키온 입자량에 ${formatInt(3)}을 곱함.`;
    },
    effect: 3,
    automatorPoints: 10,
    shortDescription: () => `${formatX(3)} TP 업그레이드가 소급 적용됨`,
    layoutPosList: [86984, 82598, 78999, 80595, 81412, 114103],
  },
  autobuyerDilation: {
    id: 100,
    label: "팽창자동구매기",
    family: PERK_FAMILY.AUTOMATION,
    description: "반복 가능한 팽창 업그레이드용 자동구매기 해금.",
    automatorPoints: 5,
    shortDescription: () => "팽창 업그레이드 자동구매기",
    layoutPosList: [117401, 81401, 79802, 79799, 80597, 96672],
  },
  autobuyerFasterID: {
    id: 101,
    label: "빠른무한자동구매",
    family: PERK_FAMILY.AUTOMATION,
    get description() {
      return `무한 차원 자동구매기가 ${formatX(3)}배 빠르게 작동.`;
    },
    effect: 1 / 3,
    automatorPoints: 5,
    shortDescription: () => "더 빠른 무한 자동구매기",
    layoutPosList: [74095, 80199, 80198, 81000, 82997, 77720],
  },
  autobuyerFasterReplicanti: {
    id: 102,
    label: "빠른복제자동구매",
    family: PERK_FAMILY.AUTOMATION,
    get description() {
      return `복제체 자동구매기가 ${formatX(3)}배 빠르게 작동.`;
    },
    effect: 1 / 3,
    automatorPoints: 5,
    shortDescription: () => "더 빠른 복제 자동구매기",
    layoutPosList: [57685, 80198, 80197, 80999, 83000, 79297],
  },
  autobuyerFasterDilation: {
    id: 103,
    label: "빠른팽창자동구매",
    family: PERK_FAMILY.AUTOMATION,
    get description() {
      return `팽창 업그레이드 자동구매기가 ${formatX(3)}배 빠르게 작동.`;
    },
    effect: 1 / 3,
    automatorPoints: 5,
    shortDescription: () => "더 빠른 팽창 자동구매기",
    layoutPosList: [113895, 82602, 79402, 79395, 80609, 72715],
  },
  ttBuySingle: {
    id: 104,
    label: "시간정리자동구매",
    family: PERK_FAMILY.AUTOMATION,
    description: "매 틱마다 단일 시간 정리를 구입하는 시간 정리 자동구매기 해금.",
    automatorPoints: 5,
    shortDescription: () => "단일 TT 자동구매기",
    layoutPosList: [44631, 79398, 80598, 81001, 77797, 57325],
  },
  ttFree: {
    id: 105,
    label: "시간정리무료",
    family: PERK_FAMILY.AUTOMATION,
    get description() {
      return `시간 정리 구입 시 더 이상 반물질, 무한 포인트 또는 영원 포인트를 소비하지 않음.`;
    },
    layoutPosList: [33840, 78998, 80597, 81002, 77800, 67309],
  },
  ttBuyMax: {
    id: 106,
    label: "최대시간정리",
    family: PERK_FAMILY.AUTOMATION,
    get description() {
      return `시간 정리 자동구매기를 최대 시간 정리를 구입하도록 업그레이드.`;
    },
    automatorPoints: 10,
    shortDescription: () => "최대 TT 자동구매기",
    layoutPosList: [25055, 78598, 80997, 81003, 77803, 65739],
  },
  dilationAutobuyerBulk: {
    id: 107,
    label: "팽창대량자동구매",
    family: PERK_FAMILY.AUTOMATION,
    get description() {
      return `팽창 업그레이드 자동구매기가 한 번에 3배 많은 팽창 업그레이드를 구입.`;
    },
    effect: 3,
    automatorPoints: 5,
    shortDescription: () => "팽창 자동구매기 대량",
    layoutPosList: [127384, 81400, 79803, 79399, 81000, 103048],
  },
  achievementGroup1: {
    id: 201,
    label: "성취그룹1",
    family: PERK_FAMILY.ACHIEVEMENT,
    get description() {
      return `성취 타이머를 ${formatInt(20)}분으로 단축
        (${formatInt(10)}분 감소).`;
    },
    effect: 10,
    automatorPoints: 5,
    shortDescription: () => `더 빠른 성취: 매 ${formatInt(20)}분`,
    layoutPosList: [65386, 80201, 80601, 79801, 79791, 81371],
  },
  achievementGroup2: {
    id: 202,
    label: "성취그룹2",
    family: PERK_FAMILY.ACHIEVEMENT,
    get description() {
      return `성취 타이머를 ${formatInt(12)}분으로 단축
        (${formatInt(8)}분 감소).`;
    },
    effect: 8,
    layoutPosList: [54976, 80202, 80602, 79401, 79794, 93780],
  },
  achievementGroup3: {
    id: 203,
    label: "성취그룹3",
    family: PERK_FAMILY.ACHIEVEMENT,
    get description() {
      return `성취 타이머를 ${formatInt(6)}분으로 단축
        (${formatInt(6)}분 감소).`;
    },
    effect: 6,
    layoutPosList: [44168, 80602, 80603, 79402, 79797, 83005],
  },
  achievementGroup4: {
    id: 204,
    label: "성취그룹4",
    family: PERK_FAMILY.ACHIEVEMENT,
    get description() {
      return `성취 타이머를 ${formatInt(2)}분으로 단축
        (${formatInt(4)}분 감소).`;
    },
    effect: 4,
    layoutPosList: [33760, 81002, 81003, 79403, 79800, 95422],
  },
  achievementGroup5: {
    id: 205,
    label: "성취유지",
    family: PERK_FAMILY.ACHIEVEMENT,
    get description() {
      return `처음 ${formatInt(13)}개 행의 성취를 즉시 해금
        하고 현실이 더 이상 초기화하지 않음.`;
    },
    automatorPoints: 10,
    shortDescription: () => "현실에서 성취 유지",
    layoutPosList: [23353, 81402, 81403, 79404, 79803, 84639],
  }
};

export const perkConnections = (function() {
  const p = perks;
  // First item is the start, other items are the ends
  const groups = [
    [p.firstPerk, p.achievementGroup1, p.startAM, p.autounlockEU1, p.bypassEC5Lock],
    [p.startAM, p.antimatterNoReset, p.startIP1],
    [p.antimatterNoReset, p.startEP1],
    [p.startIP1, p.startIP2, p.startEP1, p.autobuyerFasterID],
    [p.startIP2, p.bypassIDAntimatter, p.autobuyerFasterReplicanti],
    [p.startEP1, p.startEP2, p.startTP],
    [p.startEP2, p.startEP3],
    [p.startTP, p.startEP1, p.retroactiveTP1],
    [p.autounlockEU1, p.autounlockEU2],
    [p.autounlockEU2, p.autounlockEU1, p.autobuyerDilation],
    [p.autounlockDilation1, p.autounlockDilation2],
    [p.autounlockDilation2, p.autounlockDilation3],
    [p.autounlockDilation3, p.autobuyerFasterDilation, p.autounlockTD],
    [p.autounlockTD, p.autounlockReality],
    [p.bypassTGReset, p.autobuyerDilation, p.retroactiveTP1],
    [p.bypassEC1Lock, p.bypassEC2Lock, p.bypassEC3Lock, p.studyECRequirement],
    [p.bypassEC2Lock, p.studyActiveEP, p.bypassEC1Lock],
    [p.bypassEC3Lock, p.studyIdleEP, p.bypassEC1Lock],
    [p.bypassEC5Lock, p.studyActiveEP, p.studyIdleEP, p.studyPassive],
    [p.studyPassive, p.bypassEC1Lock],
    [p.autocompleteEC1, p.autocompleteEC2],
    [p.autocompleteEC2, p.autocompleteEC3],
    [p.studyActiveEP, p.bypassEC2Lock, p.ttBuySingle],
    [p.studyIdleEP, p.bypassEC3Lock, p.autocompleteEC1],
    [p.studyECRequirement, p.studyECBulk],
    [p.retroactiveTP1, p.bypassTGReset, p.startTP, p.retroactiveTP2],
    [p.retroactiveTP2, p.retroactiveTP3],
    [p.retroactiveTP3, p.retroactiveTP4],
    [p.autobuyerDilation, p.autounlockEU2, p.autounlockDilation1,
      p.bypassECDilation, p.bypassTGReset, p.dilationAutobuyerBulk],
    [p.autobuyerFasterID],
    [p.ttBuySingle, p.ttFree],
    [p.ttFree, p.ttBuyMax],
    [p.achievementGroup1, p.achievementGroup2],
    [p.achievementGroup2, p.achievementGroup3],
    [p.achievementGroup3, p.achievementGroup4],
    [p.achievementGroup4, p.achievementGroup5],
  ];
  const connections = {};
  for (const perk of Object.values(perks)) {
    const connectedPerks = [];
    const directConnections = groups.find(g => g[0] === perk);
    if (directConnections !== undefined) {
      connectedPerks.push(...directConnections.slice(1));
    }
    const indirectConnections = groups
      .filter(g => g.slice(1).some(groupPerk => groupPerk === perk))
      .map(g => g[0]);
    connectedPerks.push(...indirectConnections);
    connections[perk.id] = [...new Set(connectedPerks.map(connectedPerk => connectedPerk.id))];
  }
  return connections;
}());
