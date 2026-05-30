export const enslaved = {
  // These entries will be unlocked in no particular order
  progress: {
    hintsUnlocked: {
      id: 0,
      hint: "이름없는 자는 도움을 주고 싶지만, 도움이 오래 걸립니다.",
      condition: () => `${formatInt(5)}시간 이상의 실시간을 현실 내에서 보냈으며 현실을 완료하지 않음;
        현실 외 시간은 ${formatPercents(0.4)}만큼 카운트됩니다. 타이머는 현실이 해금되면 시작되지만 계속 누적됩니다.`,
    },
    ec1: {
      id: 1,
      hint: "이상합니다. 자동 영원 도전 특전이 제대로 작동하지 않는 것 같습니다.",
      condition: () => `${formatInt(5)}번 이상 영원 도전 1의 완료를 한 번에 획득`,
    },
    feelEternity: {
      id: 2,
      hint: "무한이 이 현실에서 평소보다 더 망가진 것 같은데, 그게 고쳐질 수나 있을까요?",
      condition: "무한을 고치려고 시도했지만 대신 무한의 감각(FEEL ETERNITY) 버튼을 찾아서 클릭함",
    },
    ec6: {
      id: 3,
      hint: `일부 도전은 더 어렵지만 대신 뭔가를 강화합니다. 여기서 단순히 일반보다 훨씬 나은 도전이 있을까요?`,
      condition: () => `영원 도전 6을 ${formatInt(5)}번 완료한 후 다시 입장하여
        더 저렴한 복제체 갤럭시를 사용하기 위해`,
    },
    c10: {
      id: 4,
      hint: "8번째 반물질 차원 없이 반물질 갤럭시를 얻을 수 있는 방법이 있을까요?",
      condition: "도전 10을 사용하여 6번째 반물질 차원으로 반물질 갤럭시를 2개 이상 획득",
    },
    secretStudy: {
      id: 5,
      hint: "시간 연구 12? 그게 뭔가요?",
      condition: () => `비밀 시간 연구를 클릭하여 추가로 ${formatInt(100)} 시간 정리를 획득`,
    },
    storedTime: {
      id: 6,
      hint: "이 현실의 특정 부분들이 충분히 기다리면 풍화되는 것 같습니다.",
      condition: "방출하여 이 현실에서 1년 이상의 게임 시간을 확보",
    },
    challengeCombo: {
      id: 7,
      hint: "한 도전을 사용하여 다른 도전의 제한을 우회할 수 있을까요?",
      condition: "영원 도전 6 안에 이미 있는 상태에서 도전 10에 입장",
    },
  },
  // These get unlocked sequentially
  glyphHints: [
    "무한과 팽창 글리프는 너무 제한적으로 보여서 전혀 유용하지 않습니다.",
    "힘과 시간 글리프는 여기서 특히 강력합니다.",
    `에파리그 글리프는 올바른 효과가 있어야만 유용하지만, 없이도 현실을 완료할 수 있습니다.
      복제 글리프는 매우 유용하지만, 반드시 필요한 것은 아니며 힘과 시간만큼 강하지도 않습니다.`
  ]
};
