export const secretAchievements = [
  {
    id: 11,
    name: "첫 번째는 언제나 공짜",
    description: "이 업적을 클릭하세요."
  },
  {
    id: 12,
    name: "혹시 모르니까",
    get description() { return `새로고침 없이 ${formatInt(100)}번 저장하세요.`; }
  },
  {
    id: 13,
    name: "존중에는 보답이 따른다",
    description: "조의를 표하세요."
  },
  {
    id: 14,
    name: "나도 그래",
    description: "야한 말을 하세요."
  },
  {
    id: 15,
    name: "배럴 롤을 해봐!",
    description: "배럴 롤을 하세요.",
  },
  {
    id: 16,
    name: "고통이 즐겁니?",
    get description() {
      return `영원 이후 "고통스러운" 표기법을 ${formatInt(10)}분(실제 시간) 동안 사용하세요.`;
    },
    checkRequirement: () => AchievementTimers.pain
      .check(PlayerProgress.eternityUnlocked() && Notations.current.isPainful, 600),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 17,
    name: "목숨 30개",
    description: "코나미 코드를 입력하세요."
  },
  {
    id: 18,
    name: "운이 좋다고 생각해? 어때, 이 녀석?",
    get description() {
      return `매초 ${formatInt(1)}/${formatInt(1e5)} 확률로 이 업적을 획득할 수 있습니다.`;
    }
  },
  {
    id: 21,
    name: "현실에서 공부나 해",
    description: "비밀 시간 연구를 구입하세요."
  },
  {
    id: 22,
    name: "튀김",
    get description() { return `이모지 표기법을 사용하는 동안 총 반물질 은하를 ${formatInt(1e5)}개 구입하세요.`; },
    checkRequirement: () => player.requirementChecks.permanent.emojiGalaxies >= 1e5,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER
  },
  {
    id: 23,
    name: "거기 서, 이 범죄자 녀석!",
    description: "콘솔을 여세요."
  },
  {
    id: 24,
    name: "진짜 뉴스",
    description: "클릭 시 무언가 일어나는 뉴스 티커 메시지를 클릭하세요."
  },
  {
    id: 25,
    name: "쉿... 비밀이야",
    description: "비밀 테마를 발견하세요."
  },
  {
    id: 26,
    name: "넌 실패자야",
    get description() {
      return `새로고침 없이 영원 도전을 ${formatInt(10)}번 실패하세요.
      인생을 왜 이렇게 사는 거야...`;
    },
    checkRequirement: (function() {
      let count = 0;
      return () => ++count >= 10;
    }()),
    checkEvent: GAME_EVENT.CHALLENGE_FAILED
  },
  {
    id: 27,
    name: "물질 차원이라고 부르지는 않잖아?",
    description: "무한한 물질을 얻으세요.",
    checkRequirement: () => Currency.matter.gte(Decimal.NUMBER_MAX_VALUE),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 28,
    name: "좋아.",
    description: "모른 척하지 마."
  },
  {
    id: 31,
    name: "RAM을 더 다운받아야 해",
    get description() { return `업데이트 속도를 ${formatInt(200)}ms로 설정하세요.`; }
  },
  {
    id: 32,
    name: "0.001 이하",
    get description() {
      return `최고 무한 또는 영원 시간이 ${format(0.001, 3, 3)}초 이하가 되게 하세요.`;
    },
    checkRequirement: () =>
      Time.bestInfinity.totalMilliseconds <= 1 ||
      Time.bestEternity.totalMilliseconds <= 1,
    checkEvent: [GAME_EVENT.BIG_CRUNCH_AFTER, GAME_EVENT.ETERNITY_RESET_AFTER]
  },
  {
    id: 33,
    name: "건전한 재정적 결정",
    description: "STD 코인 구매 버튼을 클릭하세요."
  },
  {
    id: 34,
    name: "이게 어떻게 작동하는지 알지?",
    description: "시간 연구 트리가 비어있는 상태에서 리스펙하세요."
  },
  {
    id: 35,
    name: "최대 구매에 대해 알려줄까...",
    get description() { return `틱속도 업그레이드를 단품으로 ${formatInt(1e5)}번 구입하세요.`; },
    checkRequirement: () => player.requirementChecks.permanent.singleTickspeed >= 1e5,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 36,
    name: "당신이 없는 동안... 아무 일도 없었어요.",
    description: "오프라인 동안 아무 일도 일어나지 않은 것을 확인하세요."
  },
  {
    id: 37,
    name: "지시를 따랐어",
    description: "지시를 따르세요."
  },
  {
    id: 38,
    name: "칼날 위에서",
    description: "확인 문구를 입력한 후 하드 리셋 창을 닫으세요."
  },
  {
    id: 41,
    name: "그 차원은 존재하지 않아",
    description: "9번째 차원을 구입하려 시도하세요."
  },
  {
    id: 42,
    name: "내 자신이 부끄러워",
    description: "EC12를 사용해 시간을 빠르게 하려 시도하세요."
  },
  {
    id: 43,
    name: "불협화음의 합창",
    description: "장착한 모든 글리프를 음악 글리프로 만드세요.",
    checkRequirement: () => Glyphs.active.length && Glyphs.active.every(x => Glyphs.isMusicGlyph(x)),
    checkEvent: GAME_EVENT.GLYPHS_EQUIPPED_CHANGED
  },
  {
    id: 44,
    name: "이제 만족해?",
    get description() { return `통계 탭을 ${formatInt(15)}분(실제 시간) 동안 응시하세요.`; },
    checkRequirement: () => AchievementTimers.stats.check(Tab.statistics.isOpen, 900),
    checkEvent: GAME_EVENT.GAME_TICK_AFTER
  },
  {
    id: 45,
    name: "이 드래그가 질질 끌리네",
    description: "특전을 1분 동안 드래그하세요.",
    checkRequirement: () => player.requirementChecks.permanent.perkTreeDragging++ / 100 >= 60
  },
  {
    id: 46,
    name: "만일을 위해",
    description: "실제 시간 하루를 저장하세요."
  },
  {
    id: 47,
    name: "ALT+",
    description: "숨길 수 있는 모든 탭을 숨기세요."
  },
  {
    id: 48,
    name: "스택 오버플로우",
    description: "자동화기 오류 수가 줄 수보다 많아지게 하세요."
  },
];
