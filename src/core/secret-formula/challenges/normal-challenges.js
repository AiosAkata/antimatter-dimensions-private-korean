import { DC } from "../../constants";

// I tried to make it relatively simple to add more locks; the idea is that you give it a value here
// and then it's all handled in the backend
// If you need to lock a challenge, set lockedAt to a new Decimal variable reflective of a desired number of Infinities
// They will always be unlocked post-eternity

export const normalChallenges = [
  {
    id: 1,
    legacyId: 1,
    isQuickResettable: false,
    description() {
      return PlayerProgress.eternityUnlocked()
        ? "도전 외부에서 처음으로 무한을 도달하세요."
        : "처음으로 무한을 도달하세요.";
    },
    name: "1번째 반물질 차원 자동구매기",
    reward: "업그레이드 가능한 1번째 반물질 차원 자동구매기",
    lockedAt: DC.D0,
  },
  {
    id: 2,
    legacyId: 2,
    isQuickResettable: false,
    description:
      () => "반물질 차원이나 틱속도 업그레이드를 구입하면 모든 반물질 차원의 생산이 중단됩니다. " +
      `생산은 ${formatInt(3)}분에 걸쳐 점진적으로 정상으로 돌아옵니다.`,
    name: "2번째 반물질 차원 자동구매기",
    reward: "업그레이드 가능한 2번째 반물질 차원 자동구매기",
    lockedAt: DC.D0,
  },
  {
    id: 3,
    legacyId: 3,
    isQuickResettable: false,
    description:
      `1번째 반물질 차원이 크게 약해지지만, 상한이 없는 지수적으로 증가하는 배율을 얻습니다.
        이 배율은 차원 부스트와 반물질 은하 이후에 재설정됩니다.`,
    name: "3번째 반물질 차원",
    reward: "업그레이드 가능한 3번째 반물질 차원 자동구매기",
    lockedAt: DC.D0,
  },
  {
    id: 4,
    legacyId: 8,
    isQuickResettable: false,
    description: "반물질 차원을 구입하면 자동으로 더 낮은 등급의 모든 반물질 차원이 지워집니다. " +
      "부스트 없는 희생 같은 것입니다.",
    name: "4번째 반물질 차원 자동구매기",
    reward: "업그레이드 가능한 4번째 반물질 차원 자동구매기",
    lockedAt: DC.D0,
  },
  {
    id: 5,
    legacyId: 6,
    isQuickResettable: false,
    description:
      () => `틱속도 구입 배율이 ${formatX(1.1245, 0, 3)} 대신 ${formatX(1.080, 0, 3)}에서 시작합니다.`,
    name: "5번째 반물질 차원 자동구매기",
    reward: "업그레이드 가능한 5번째 반물질 차원 자동구매기",
    lockedAt: DC.D0,
  },
  {
    id: 6,
    legacyId: 10,
    isQuickResettable: false,
    description: () => `각 반물질 차원을 업그레이드하려면 반물질 대신 그보다 ${formatInt(2)}단계 아래의 반물질 차원이 필요합니다. ` +
      "반물질 차원 가격이 수정됩니다.",
    name: "6번째 반물질 차원 자동구매기",
    reward: "업그레이드 가능한 6번째 반물질 차원 자동구매기",
    lockedAt: DC.D0,
  },
  {
    id: 7,
    legacyId: 9,
    isQuickResettable: false,
    description: () =>
      `${formatInt(10)}개의 반물질 차원을 구매한 배율이 ${formatX(1)}로 감소합니다. 이는 차원 부스트당 ${formatX(0.2, 1, 1)}씩 증가하며,
        최대 ${formatX(2)}이고, 어떤 업그레이드의 영향도 받지 않습니다.`,
    name: "7번째 반물질 차원 자동구매기",
    reward: "업그레이드 가능한 7번째 반물질 차원 자동구매기",
    lockedAt: DC.D0,
  },
  {
    id: 8,
    legacyId: 11,
    isQuickResettable: false,
    description: `차원 부스트는 배율을 제공하지 않으며 반물질 은하를 구입할 수 없습니다. 차원 희생은 반물질과 모든 반물질 차원을 재설정하지만,
      훨씬 더 강한 배율을 부여합니다.`,
    name: "8번째 반물질 차원 자동구매기",
    reward: "업그레이드 가능한 8번째 반물질 차원 자동구매기",
    lockedAt: DC.D0,
  },
  {
    id: 9,
    legacyId: 5,
    isQuickResettable: true,
    description: () => `틱속도 업그레이드를 구입하거나 반물질 차원 ${formatInt(10)}개를 구입할 때마다, ` +
      "같은 비용의 다른 모든 것이 다음 비용 단계로 증가합니다.",
    name: "틱속도 자동구매기",
    reward: "업그레이드 가능한 틱속도 자동구매기",
    lockedAt: DC.D0,
  },
  {
    id: 10,
    legacyId: 4,
    isQuickResettable: false,
    description: () => `반물질 차원이 ${formatInt(6)}개만 있습니다. 차원 부스트와 ` +
      "반물질 은하의 비용이 수정됩니다.",
    name: "자동화된 차원 부스트",
    reward: "차원 부스트 자동구매기",
    lockedAt: DC.D16,
  },
  {
    id: 11,
    legacyId: 12,
    isQuickResettable: true,
    description: () => `2번째 반물질 차원이 최소 ${formatInt(1)}개 이상일 때 상승하는 일반 물질이 있습니다. ` +
      "이것이 당신의 반물질을 초과하면, 보너스를 주지 않고 차원 부스트를 수행합니다.",
    name: "자동화된 반물질 은하",
    reward: "반물질 은하 자동구매기",
    lockedAt: DC.D16,
  },
  {
    id: 12,
    legacyId: 7,
    isQuickResettable: false,
    description: () => `각 반물질 차원은 ${formatInt(1)} 대신 그보다 ${formatInt(2)}단계 아래의 차원을 생산합니다.
      1번째와 2번째 차원은 반물질을 생산합니다.
      2번째, 4번째, 6번째 차원은 보상으로 더 강해집니다.`,
    name: "자동화된 빅 크런치",
    reward: "빅 크런치 자동구매기",
    lockedAt: DC.D16,
  }
];
