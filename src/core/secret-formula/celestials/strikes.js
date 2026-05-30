import { DC } from "../../constants";
import wordShift from "../../word-shift";

export const pelleStrikes = {
  infinity: {
    id: 1,
    requirementDescription: "무한에 도달합니다.",
    penaltyDescription: () => `반물질 차원이 ${formatPow(0.5, 1, 1)}로 상승합니다.`,
    rewardDescription: () => `${wordShift.wordCycle(PelleRifts.vacuum.name)}를 해금하고 영구 무한 자동구매자를 얻습니다.`,
    rift: () => PelleRifts.vacuum
  },
  powerGalaxies: {
    id: 2,
    requirementDescription: "갤럭시를 강화합니다.",
    penaltyDescription: () => `무한 차원이 ${formatPow(0.5, 1, 1)}로 상승합니다.`,
    rewardDescription: () => `${wordShift.wordCycle(PelleRifts.decay.name)}를 해금합니다.`,
    rift: () => PelleRifts.decay
  },
  eternity: {
    id: 3,
    requirementDescription: "영원에 도달합니다.",
    penaltyDescription: () => `${format(DC.E2000)} 위에서 복제체 속도가 더욱 느려집니다.`,
    rewardDescription: () => `${wordShift.wordCycle(PelleRifts.chaos.name)}를 해금합니다.`,
    rift: () => PelleRifts.chaos
  },
  ECs: {
    id: 4,
    requirementDescription: () => `${formatInt(115)} TT에 도달합니다.`,
    penaltyDescription: () => `영원 도전에서 ${wordShift.wordCycle(PelleRifts.vacuum.name)} 무한 포인트 배수는 ${formatPercents(0.3)}만큼 강하며 목표의 ${formatPercents(0.15)}로 제한됩니다.`,
    rewardDescription: () => `${wordShift.wordCycle(PelleRifts.recursion.name)}를 해금합니다.`,
    rift: () => PelleRifts.recursion
  },
  dilation: {
    id: 5,
    requirementDescription: "시간을 팽창합니다.",
    penaltyDescription: "시간 팽창은 영구적으로 활성화됩니다.",
    rewardDescription: () => `최종전 전반에 시간 팽창 연구를 유지하고, 잔재 획득을 강화하며, ${wordShift.wordCycle(PelleRifts.paradox.name)}를 해금합니다.`,
    rift: () => PelleRifts.paradox
  }
};
