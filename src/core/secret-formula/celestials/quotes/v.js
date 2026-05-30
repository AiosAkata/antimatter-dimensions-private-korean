export const vQuotes = {
  initial: {
    id: 0,
    lines: [
      "정말 한심합니다..."
    ],
  },
  unlock: {
    id: 1,
    lines: [
      "나의 현실에 오신 것을 환영합니다.",
      "당신이 도달할 수 있었다는 것이 놀랍습니다.",
      "결국 이것은 나의 영역이기도 합니다...",
      "모두가 나처럼 위대한 것은 아닙니다.",
    ],
  },
  realityEnter: {
    id: 2,
    lines: [
      "그것 행운을 빕니다!",
      "당신은 그것이 필요할 것입니다.",
      "나의 현실은 완벽합니다. 당신은 실패할 것입니다.",
    ],
  },
  realityComplete: {
    id: 3,
    lines: [
      "아주 빠르네요...",
      "자신을 그렇게 많이 생각하지 마세요.",
      "이것은 단지 시작일 뿐입니다.",
      "당신은 절대 나보다 나을 수 없을 것입니다.",
    ],
  },
  achievement1: {
    id: 4,
    requirement: () => V.spaceTheorems >= 1,
    lines: [
      "겨우 하나? 한심합니다.",
      "당신의 업적은 내 업적에 비하면 창백합니다.",
    ],
  },
  achievement6: {
    id: 5,
    requirement: () => V.spaceTheorems >= 6,
    lines: [
      "이것은 아무것도 아닙니다.",
      "자신을 그렇게 자랑하지 마세요.",
    ],
  },
  hex1: {
    id: 6,
    requirement: () => player.celestials.v.runUnlocks.filter(a => a === 6).length >= 1,
    lines: [
      "지금부터 더 쉬워질 거라고 생각하지 마세요.",
      "그렇게 작은 업적에 대해 무척 자랑스럽네요.",
    ],
  },
  achievement12: {
    id: 7,
    requirement: () => V.spaceTheorems >= 12,
    lines: [
      "당신은 어떻게...",
      "이것은 거의 아무것도 아닙니다!",
      "당신은 모두 완료하지 못할 것입니다.",
    ],
  },
  achievement24: {
    id: 8,
    requirement: () => V.spaceTheorems >= 24,
    lines: [
      "불가능합니다...",
      "내게 얼마나 어려웠는지 후에...",
    ],
  },
  hex3: {
    id: 9,
    requirement: () => player.celestials.v.runUnlocks.filter(a => a === 6).length >= 3,
    lines: [
      "아니... 아니... 아니...",
      "이것은 불가능할 수 없습니다...",
    ],
  },
  allAchievements: {
    id: 10,
    requirement: () => V.spaceTheorems >= 36,
    lines: [
      "나... 당신은 어떻게...",
      "나는 그들을 얻기 위해 매우 열심히 일했습니다...",
      "나는 가장 위대합니다...",
      "아무도 나보다 낫지 않습니다...",
      "아무도... 아무도... 아무 것도-",
    ],
  }
};
