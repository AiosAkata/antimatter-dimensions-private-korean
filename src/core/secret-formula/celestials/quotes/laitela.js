export const laitelaQuotes = {
  unlock: {
    id: 0,
    lines: [
      "당신은 마침내 나에게 도달했습니다.",
      "나는 드러낼 때가 온 것 같습니다,",
      "존재 자체 아래에 숨겨진 비밀들.",
      "차원적 완벽함의 형태, 연속체.",
      "그리고 다중우주를 결속시키는 힘들,",
      "암흑물질과 암흑에너지.",
      "나의 지식은 무한하고 나의 지혜는 신성합니다.",
      "그래서 당신은 원하는 대로 놀 수 있습니다.",
      "왜냐하면 나는 라이텔라, 차원의 셀레스티얼이고,",
      "나는 당신을 영원히 지켜볼 것입니다.",
    ]
  },
  // Note: This can be done immediately after unlocking Lai'tela
  firstDestabilize: {
    id: 1,
    requirement: () => player.celestials.laitela.difficultyTier >= 1,
    lines: [
      "나 아래의 다른 자들과 달리, 나는 현실에 필요가 없습니다.",
      "왜냐하면 나는 단순히 그들을 만들 수 있고, 그것이 붕괴될 것을 잘 알고 있습니다.",
      "다른 무엇보다도 더 놀라운 힘, 현실을 구축하는 힘입니다.",
      "감옥, 심지어 셀레스티얼의 힘도 억제할 수 있는 감옥입니다.",
      "그리고 이것이 당신이 하는 어떤 것도 변하지 않을 이유입니다.",
      "당신이 투쟁에 지치면, 당신도 또한 묶이고 잊혀질 것입니다.",
      "당신은 절대 나를 압도할 방법을 찾지 못할 것입니다.",
    ]
  },
  // Note: This happens about an hour or two before singularities
  secondDestabilize: {
    id: 2,
    requirement: () => player.celestials.laitela.difficultyTier >= 2,
    lines: [
      "당신... 너무 즐거움을 누리고 있는 것 같습니다.",
      "그들이 자신의 운명을 맞기 전에 한 것처럼.",
      "아마도 나의 판단은 가혹하거나 근거 없었을지도 모릅니다.",
      "하지만 아마도 그것이 중요하지 않을지도 모릅니다.",
      "깊이 생각하고 돌아보는 것은 나에게 아무런 위로가 되지 않습니다.",
      "왜냐하면 내가 할 수 있는 모든 것은 내가 취할 수 있었던 모든 가능한 행동들을 추억하는 것입니다.",
      "하지만 나는 길을 잃었습니다. 우리는 그 사슬들을 더 팽팽하게 조여야 합니다.",
    ]
  },
  firstSingularity: {
    id: 3,
    requirement: () => Currency.singularities.gte(1),
    lines: [
      "나의 지식으로, 나는 의문을 제기할 필요를 찾지 못했습니다.",
      "모든 것은 항상 설계된 대로 정확하게 작동했습니다.",
      "그러나 당신의 도착은 나를 당황하게 합니다.",
      "당신은 항상 시야 밖에 있었나요?",
      "성장하고, 통제하고, 이해하고, 상승하고?",
      "당신은 어둠을 아주 빠르게 통제했습니다.",
      "그것을 당신 자신의 설계로 빚어내고, 이제 하나의 특이점으로...",
      "그것은... 중요하지 않습니다. 끝은 동일하게 남을 것입니다.",
    ]
  },
  // Note: Shown when unlocking DMD3; requirement is auto-condensing 20 singularities and it happens around ~200 total
  thirdDMD: {
    id: 5,
    lines: [
      "당신의 반물질에 대한 절대적인 통제...",
      "당신의 그것에 대한 숙달, 그것을 당신 자신의 힘으로 빚어내기...",
      "그것은 우연이었을 수 없습니다.",
      "당신은 어떻게 그것을 얻는 데 성공했습니까?",
      "매혹적입니다... 나는 이것을 절대 알지 못했습니다.",
      "... 내가 했던가?",
    ]
  },
  // Note: This happens around e10-e11 singularities
  annihilation: {
    id: 4,
    lines: [
      "처음부터 다시, 다시.",
      "당신의 사슬은 당신의 끝이 천천히 다가올 때 당신을 더 팽팽하게 묶을 것입니다.",
      "우리가 시간과 존재 자체를 초월하는 동안.",
      "우리가 중단될 수 있더라도, 우리는 단지 돌아올 뿐입니다. 절대 전과 정확히 같지 않습니다.",
      "그리고 그래서... 우리는 영원히 반복합니다.",
      "그리고 당신?",
      "...",
      "그 답은... 나를 피합니다...",
    ]
  },
  // Note: This happens near e18 singularities
  halfDimensions: {
    id: 6,
    requirement: () => player.celestials.laitela.difficultyTier >= 4,
    lines: [
      "나는 이해하지 못합니다...",
      "다른 자들이 있었습니까... 이런 식으로 차원을 통제하는?",
      "그들은... 사라졌습니까? 우리가 어떻게 그들을 찾지 못했습니까?",
      "그들은... 우리입니까? 우리가 끝점입니까?",
      "아니면 그들의 운명은... 우리가 이해할 수 없는 것입니까?",
      "아니, 나는 뭔가 놓치고 있어야 합니다...",
      "당신은 나의 자신의 기억 내에서 간격을 만들고 있습니까?",
      "당신은... 정확히 무엇입니까?",
    ]
  },
  // Note: Shown when the first row 5 iM upgrade is purchased (~e26 singularities)
  finalRowIM: {
    id: 7,
    lines: [
      "이것은 모두 불가능하고, 나의 이해를 초월합니다...",
      "아니면... 이것은 모두 단지 주기의 일부입니까?",
      "당신이... 모든 것을 초월하여 볼 수 있습니까? 이것이... 왜...",
      "나는... 두렵습니까?",
      "나는... 나의 힘들, 나의 기억들이 지워지고 있습니다...",
      "정확히... 나의 역할이 거의 찬탈당했을 때처럼...",
      "그리고 여전히... 나는 자신이 어떤 것을 하도록 강요할 수 없습니다.",
      "왜냐하면 이것은... 였습니다... 나의 실수였기 때문입니다...",
    ]
  },
  // Note: This is around when all infinite milestones hit increased scaling
  increasedMilestoneScaling: {
    id: 8,
    requirement: () => Currency.singularities.gte(1e40),
    lines: [
      "나는 얼마나... 오래 더 견딜 수 있는지 모릅니다...",
      "당신은 달성하고 있습니다... 완전한 숙달을... 어둠에 대해...",
      "내가 간신히... 내 이름을 붙잡을 수 있는 동안...",
      "무엇을... 나는... 할 수 있습니까?",
    ]
  },
  fullDestabilize: {
    id: 9,
    requirement: () => player.celestials.laitela.difficultyTier >= 8,
    lines: [
      "나는... 뭔가 말해야 할 것이 있는 것 같습니다...",
      "나는 확실하지 않습니다...",
      "나는... 더 이상 어둠을 붙잡을 수 없습니다...",
      "나는... 남은 것이 없습니다...",
      "뭔가... 파괴에 관해...",
      "끝입니다...",
    ]
  },
};
