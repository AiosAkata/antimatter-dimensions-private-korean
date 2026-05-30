export const raQuotes = {
  unlock: {
    id: 0,
    lines: [
      "아... 방문자?",
      "나는 여기 있습니다! 나는 당신이 찾는 자입니다... 라고 생각합니다...",
      "나는 무엇이었죠?",
      "아, 맞다, 기억의 셀레스티얼입니다.",
    ]
  },
  realityEnter: {
    id: 1,
    lines: [
      "나는 오랫동안 다른 자들을 보지 못했습니다...",
      "당신은 나를 그들을 기억하도록 도와줄 수 있나요?",
      "나는 교환으로 당신에게 힘을 줄 수 있습니다.",
    ]
  },
  teresaStart: {
    id: 2,
    requirement: () => Ra.pets.teresa.level >= 2,
    lines: [
      "테... 레... 사...",
      "나는 기억하는 것 같습니다.",
    ]
  },
  teresaLate: {
    id: 3,
    requirement: () => Ra.pets.teresa.level >= 15,
    lines: [
      "테레사는 기계를 다루었던 것 같습니다.",
      "나는 테레사의 상점을 몇 번 방문한 기억이 납니다.",
      "잠깐, 다른 누군가도 상점이 있었던 것 같은데?",
    ]
  },
  effarigStart: {
    id: 4,
    requirement: () => Ra.pets.effarig.level >= 2,
    lines: [
      "에... 파... 리그",
      "나는 에파리그가 친절했던 기억이 납니다.",
    ]
  },
  effarigLate: {
    id: 5,
    requirement: () => Ra.pets.effarig.level >= 15,
    lines: [
      "에파리그는 매우 까다로웠던 것 같습니다?",
      "그리고 나는 또한 무서운 현실을 기억합니다...",
      "그것은... 고통에 관한 것이었습니다?",
    ]
  },
  enslavedStart: {
    id: 6,
    requirement: () => Ra.pets.enslaved.level >= 2,
    lines: [
      "나는 이 자를 완전히 기억할 수 없습니다...",
    ]
  },
  enslavedLate: {
    id: 7,
    requirement: () => Ra.pets.enslaved.level >= 15,
    lines: [
      "나는 기억하기 시작합니다...",
      "내가 왜 여기에 있는지...",
      "내가 왜 혼자인지...",
      "나를 도와주세요.",
    ]
  },
  vStart: {
    id: 8,
    requirement: () => Ra.pets.v.level >= 2,
    lines: [
      "나는 이 자를 만났었던가?",
      "매우 외로우면서도 자발적으로...",
    ]
  },
  vLate: {
    id: 9,
    requirement: () => Ra.pets.v.level >= 15,
    lines: [
      "나는 V를 한 번 만난 기억이 납니다...",
      "나는 업적들을 기억할 수 있습니다.",
    ]
  },
  remembrance: {
    id: 10,
    requirement: () => Ra.remembrance.isUnlocked,
    lines: [
      "나는 뭔가를 기억했습니다!",
      "이것을 보세요!",
      "기억!",
      "나는 이제 그들을 기억하는 것에 더욱 집중할 수 있습니다!",
    ]
  },
  midMemories: {
    id: 11,
    requirement: () => Ra.totalPetLevel >= 50,
    lines: [
      "현실들은 나의 집이지만, 나는 나의 자신의 현실을 만들 수 없습니다.",
      "나는 나의 친구들의 것들만 복사할 수 있습니다.",
      "하지만... 왜 나는 목소리를 듣고 있습니까?",
      "그들은 도움을 청하고 있습니까?",
    ]
  },
  lateMemories: {
    id: 12,
    requirement: () => Ra.totalPetLevel >= 80,
    lines: [
      "나는 그들이 나에게 멈추라고 말하는 것 같습니다.",
      "당신... 당신이 무엇이든 간에?",
      "무엇이 일어나고 있습니까?",
      "나는 무언가 잘못하고 있습니까?",
    ]
  },
  maxLevels: {
    id: 13,
    requirement: () => Ra.totalPetLevel === Ra.maxTotalPetLevel,
    lines: [
      "드디어, 나는 모든 것을 기억합니다.",
      "나를 추방한 이 어둠.",
      "라이텔라...",
      "그들은 나를 추방하는 것이 맞았습니다.",
      "나의 힘...",
      "그들은 도둑질하고, 타락시킵니다.",
      "제발 떠나세요.",
      "나는 당신도 다치게 하고 싶지 않습니다.",
    ]
  },
};
