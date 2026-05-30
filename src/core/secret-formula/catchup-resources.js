import { DC } from "../constants";

export const catchupResources = [
  {
    name: "반물질 차원",
    id: 0,
    requiredStage: PROGRESS_STAGE.PRE_INFINITY,
    description: `각 반물질 차원은 한 단계 낮은 차원을 지속적으로 생산합니다.
      가장 낮은 반물질 차원은 반물질을 생산합니다.`
  },
  {
    name: "틱속도 업그레이드",
    id: 1,
    openH2pEntry: "Tickspeed",
    requiredStage: PROGRESS_STAGE.PRE_INFINITY,
    description: `틱속도 업그레이드는 반물질 차원이 다른 반물질 차원 또는 반물질을
      마치 시간이 더 빨리 흐르는 것처럼 생산하게 합니다.`
  },
  {
    name: "자동구매기",
    id: 2,
    requiredStage: PROGRESS_STAGE.PRE_INFINITY,
    description: `자동구매기는 게임에 내장된 기능으로, 구입 가능할 때
      반물질 차원 업그레이드를 자동으로 구입합니다.`
  },
  {
    name: "차원 부스트",
    id: 3,
    requiredStage: PROGRESS_STAGE.PRE_INFINITY,
    description: `차원 부스트는 가장 높은 반물질 차원의 수가 일정량에 도달한 후
      모든 반물질 차원과 틱속도를 초기화하여 얻습니다. 반물질 차원에 배율을 부여합니다.`
  },
  {
    name: "반물질 은하",
    id: 4,
    requiredStage: PROGRESS_STAGE.PRE_INFINITY,
    description: `반물질 은하는 반물질 차원과 차원 부스트를 초기화하여 얻습니다.
      틱속도 업그레이드의 효과를 복리 방식으로 향상시킵니다.`
  },
  {
    name: "무한",
    id: 5,
    requiredStage: PROGRESS_STAGE.EARLY_INFINITY,
    description: () => `무한은 첫 번째 주요 초기화 레이어입니다. 반물질 ${format(Number.MAX_VALUE, 2)}에 도달하면
      지금까지의 모든 것을 초기화하는 대신 새로운 콘텐츠와 자원이 해금됩니다.`
  },
  {
    name: "무한 포인트",
    id: 6,
    openH2pEntry: "Infinity",
    requiredStage: PROGRESS_STAGE.EARLY_INFINITY,
    description: `무한 포인트는 첫 번째 무한을 완료한 후의 주요 자원입니다.
      무한 초기화를 거쳐도 유지되는 기능에 사용할 수 있습니다.`
  },
  {
    name: "일반 도전",
    id: 7,
    openH2pEntry: "Normal Challenges",
    requiredStage: PROGRESS_STAGE.EARLY_INFINITY,
    description: () => `도전은 더 어려운 조건에서 반물질 ${format(Number.MAX_VALUE, 2)}에 도달하도록 요구합니다.
      도전을 완료하면 자동구매기를 업그레이드할 수 있습니다.`
  },
  {
    name: "무한 돌파",
    id: 8,
    requiredStage: PROGRESS_STAGE.BREAK_INFINITY,
    description: () => `빅 크런치 자동구매기를 최대로 업그레이드하면 반물질이
      ${format(Number.MAX_VALUE, 2)}를 초과할 수 있게 되며, 더 많은 반물질일수록 더 많은 무한 포인트를 얻습니다.`
  },
  {
    name: "무한 차원",
    id: 9,
    requiredStage: PROGRESS_STAGE.BREAK_INFINITY,
    description: `무한 차원도 반물질 차원처럼 계단식으로 생산합니다. 가장 낮은 단계의
      무한 차원이 무한 파워를 생산하며, 이는 모든 반물질 차원에 큰 배율을 적용합니다.`
  },
  {
    name: "무한 도전",
    id: 10,
    requiredStage: PROGRESS_STAGE.BREAK_INFINITY,
    description: () => `무한 도전은 반물질 목표가 ${format(Number.MAX_VALUE, 2)}를 초과하는 새로운 도전입니다.
      완료하면 업그레이드와 생산 부스트를 보상으로 받습니다.`
  },
  {
    name: "복제체",
    id: 11,
    requiredStage: PROGRESS_STAGE.REPLICANTI,
    description: () => `복제체는 시간이 지남에 따라 스스로를 생산하는 자원으로, 모든 무한 차원에 배율을 부여합니다.
      복제체가 ${format(Number.MAX_VALUE, 2)}에 도달하면 ${formatInt(1)}로 초기화하는 대신
      반물질 은하 비용을 올리지 않는 추가 은하를 얻을 수 있습니다. 또한 매 무한마다 초기화됩니다.`
  },
  {
    name: "영원",
    id: 12,
    requiredStage: PROGRESS_STAGE.EARLY_ETERNITY,
    description: () => `영원은 두 번째 주요 초기화 레이어입니다. 무한 포인트 ${format(Number.MAX_VALUE, 2)}에 도달하면
      지금까지의 모든 것을 초기화하는 대신 새로운 콘텐츠와 자원에 접근할 수 있습니다.`
  },
  {
    name: "영원 포인트",
    id: 13,
    openH2pEntry: "Eternity",
    requiredStage: PROGRESS_STAGE.EARLY_ETERNITY,
    description: `영원 포인트는 첫 번째 영원을 완료한 후의 주요 자원이며,
      영원 완료 시점의 무한 포인트 양에 비례해 획득합니다.`
  },
  {
    name: "시간 연구",
    id: 14,
    requiredStage: PROGRESS_STAGE.EARLY_ETERNITY,
    description: `시간 연구는 스킬 트리와 유사한 업그레이드 모음으로,
      자원 손실 없이 매 영원마다 자유롭게 재분배할 수 있습니다.
      트리의 일부 구간에서는 특정 연구들을 동시에 선택하는 것이 제한됩니다.`
  },
  {
    name: "영원 이정표",
    id: 15,
    requiredStage: PROGRESS_STAGE.EARLY_ETERNITY,
    description: `영원 이정표는 영원 횟수를 늘리기만 하면 해금되는 내장 자동화 및 편의 기능입니다.
      해금하는 데 어떠한 자원도 소비하지 않습니다.`
  },
  {
    name: "시간 차원",
    id: 16,
    requiredStage: PROGRESS_STAGE.EARLY_ETERNITY,
    description: `시간 차원도 계단식으로 서로를 생산하며, 가장 낮은 단계는 시간 파편을 생산합니다.
      시간 파편은 반물질로 구매하는 틱속도 업그레이드 비용을 올리지 않는 추가 틱속도 업그레이드를 제공합니다.`
  },
  {
    name: "영원 도전",
    id: 17,
    requiredStage: PROGRESS_STAGE.ETERNITY_CHALLENGES,
    description: `영원 도전은 완료를 위해 도달해야 하는 무한 포인트 목표가 있는 변형 영원입니다.
      최대 다섯 번 완료할 수 있으며, 반복할수록 더 어려워지는 대신 점점 강력한 보상을 제공합니다.`
  },
  {
    name: "시간 팽창",
    id: 18,
    requiredStage: PROGRESS_STAGE.EARLY_DILATION,
    description: () => `시간 팽창은 틱속도와 모든 차원 배율이 크게 감소하는 변형 영원입니다.
      팽창 영원을 완료하면 타키온 입자를 얻습니다.`
  },
  {
    name: "타키온 입자",
    id: 19,
    openH2pEntry: "Time Dilation",
    requiredStage: PROGRESS_STAGE.EARLY_DILATION,
    description: () => `타키온 입자는 파밍할 수 없는 자원으로, 팽창 영원에서 더 많은 반물질을 얻어야만
      보유량을 늘릴 수 있습니다. 타키온 입자는 팽창 시간을 생산합니다.`
  },
  {
    name: "현실",
    id: 20,
    requiredStage: PROGRESS_STAGE.EARLY_REALITY,
    description: () => `현실은 세 번째이자 마지막 주요 초기화 레이어입니다. 영원 포인트 ${format(DC.E4000)}에 도달하면
      지금까지의 모든 것을 초기화하는 대신 새로운 콘텐츠 해금과 새 자원 접근권을 얻습니다.`
  },
  {
    name: "현실 기계",
    id: 21,
    openH2pEntry: "Reality",
    requiredStage: PROGRESS_STAGE.EARLY_REALITY,
    description: `현실 기계는 첫 번째 현실을 완료한 후의 주요 자원입니다.
      현실 완료 시점의 영원 포인트 양에 비례해 지급됩니다.`
  },
  {
    name: "특전",
    id: 22,
    requiredStage: PROGRESS_STAGE.EARLY_REALITY,
    description: `특전은 영원 이정표와 유사하게 편의와 자동화에 초점을 맞춘 해금 가능한 기능입니다.
      매 현실마다 얻는 특전 포인트를 사용해 구입합니다.`
  },
  {
    name: "글리프",
    id: 23,
    requiredStage: PROGRESS_STAGE.EARLY_REALITY,
    description: `글리프는 현실 사이에만 해제할 수 있는 장착형 업그레이드입니다.
      매 현실마다 무작위로 생성된 여러 글리프 중 하나를 선택할 수 있으며,
      선택지의 평균 품질은 해당 현실에서 일부 자원이 얼마나 높이 도달했는지에 따라 결정됩니다.`
  },
  {
    name: "자동화기",
    id: 24,
    openH2pEntry: "Automator Overview",
    requiredStage: PROGRESS_STAGE.EARLY_REALITY,
    description: `자동화기는 스크립팅 언어를 사용하는 내장 기능으로,
      충분한 업그레이드와 특전이 있으면 현실을 손대지 않고도 완료할 수 있게 해줍니다.`
  },
  {
    name: "블랙홀",
    id: 25,
    requiredStage: PROGRESS_STAGE.EARLY_REALITY,
    description: `블랙홀은 주기적인 사이클로 게임 전체를 더 빠르게 실행합니다.
      이는 지금까지의 모든 것에 영향을 미치며, 해당 시간만큼 게임을 열어두는 것과 비슷한 결과를 냅니다.`
  },
  {
    name: "테레사",
    id: 26,
    requiredStage: PROGRESS_STAGE.TERESA,
    description: `테레사는 첫 번째 셀레스티얼로, 글리프 희생에 큰 부스트를 주는 더 어려운 현실을 가지고 있습니다.
      현실을 더 쉽게 테스트하고 자동화하는 데 초점을 맞춘 업그레이드를 해금합니다.`
  },
  {
    name: "에파릭",
    id: 27,
    requiredStage: PROGRESS_STAGE.EFFARIG,
    description: `에파릭은 두 번째 셀레스티얼로, 글리프를 제한하고 점증하는 너프가 있지만
      새로운 초기화 레이어에 도달할 때마다 보상을 줍니다.
      유물 파편이라는 새 자원으로 구매하는, 수많은 글리프를 자동으로 선택·필터링하는 업그레이드를 해금합니다.`
  },
  {
    name: "이름 없는 자들",
    id: 28,
    openH2pEntry: "Nameless Ones",
    requiredStage: PROGRESS_STAGE.ENSLAVED,
    description: `이름 없는 자들은 세 번째 셀레스티얼로, 수많은 너프를 가진 극도로 가혹한 현실을 가지고 있지만,
      이겨내는 방법을 알아낸 자들에게 테서랙트를 해금합니다.
      또한 블랙홀을 수정하여 시간을 저장할 수 있게 합니다.`
  },
  {
    name: "저장된 시간",
    id: 29,
    openH2pEntry: "Nameless Ones",
    requiredStage: PROGRESS_STAGE.ENSLAVED,
    description: `블랙홀은 두 가지 방식으로 시간을 저장할 수 있습니다.
      충전하면 가속된 시간을 보관했다가 나중에 한 번에 빠르게 앞으로 이동할 수 있습니다.
      실제 시간을 저장하면 실제 시간을 사용해 현실을 시뮬레이션하거나(해당 현실의 자원을 배율로 지급)
      오프라인 진행의 대체재로 활용할 수 있습니다.`
  },
  {
    name: "테서랙트",
    id: 30,
    requiredStage: PROGRESS_STAGE.ENSLAVED,
    description: `무한 차원은 무한정 구매할 수 없으며 8번째를 제외한 모든 차원에 구매 횟수 상한이 있습니다.
      각 테서랙트는 이 상한을 큰 폭으로 영구 증가시킵니다.`
  },
  {
    name: "V",
    id: 31,
    requiredStage: PROGRESS_STAGE.V,
    description: `V는 네 번째 셀레스티얼로, 테레사의 현실과 유사하지만 특정 자원 이정표에 도달해야만
      보상을 받는 변형 현실을 가집니다. 경로 제한 없이 추가 시간 연구를 구매할 수 있는
      공간 정리라는 새로운 자원을 제공합니다.`
  },
  {
    name: "라",
    id: 32,
    requiredStage: PROGRESS_STAGE.RA,
    description: `라는 다섯 번째 셀레스티얼로, 내부 자원 총량에 기반해 기억 조각이라는 자원을 생산하는
      변형 현실을 가집니다. 이전 네 셀레스티얼의 업그레이드와 테마를 개선하고,
      자동화와 편의의 빈틈을 채우는 데 집중합니다.`
  },
  {
    name: "기억",
    id: 33,
    openH2pEntry: "Ra",
    requiredStage: PROGRESS_STAGE.RA,
    description: `라는 이전 네 셀레스티얼을 지배하며, 기억 조각 수에 따라 시간이 지남에 따라 기억을 생산합니다.
      이 기억은 이전 셀레스티얼들의 레벨을 올려 특정 레벨 도달 시 업그레이드를 제공하는 데 사용됩니다.`
  },
  {
    name: "충전된 무한 업그레이드",
    id: 34,
    openH2pEntry: "Ra",
    requiredStage: PROGRESS_STAGE.RA,
    description: `테레사의 기억으로 무한 업그레이드를 충전할 수 있으며,
      비슷한 효과를 유지하면서 크게 강화됩니다. 충전된 업그레이드는 현실 사이에만 변경할 수 있습니다.`
  },
  {
    name: "글리프 연금술",
    id: 35,
    requiredStage: PROGRESS_STAGE.RA,
    description: `에파릭의 기억으로 글리프 연금술이 해금되며, 글리프 희생의 변형된 방식으로 다양한 소형 부스트를 줍니다.
      글리프를 포기해 얻은 자원은 효과를 완전히 업그레이드하기 위해 반응을 통해 조합해야 합니다.`
  },
  {
    name: "증폭된 블랙홀",
    id: 36,
    openH2pEntry: "Ra",
    requiredStage: PROGRESS_STAGE.RA,
    description: `이름 없는 자들의 기억으로 충전이 증폭되어 저장되는 게임 시간이 실제 경과한 게임 시간보다 커집니다.
      이제 방전도 반복 및 자동으로 할 수 있습니다.`
  },
  {
    name: "더 어려운 V",
    id: 37,
    openH2pEntry: "Ra",
    requiredStage: PROGRESS_STAGE.RA,
    description: `V의 기억으로 더 어려운 목표와 삼합 연구라는 새로운 시간 연구 세트가 있는
      V의 원래 현실의 변형 버전이 해금됩니다.`
  },
  {
    name: "상상의 기계",
    id: 38,
    requiredStage: PROGRESS_STAGE.IMAGINARY_MACHINES,
    description: () => `상상의 기계는 현실 기계 ${format(DC.E1000)}에 도달하면 해금되는 새로운 자원입니다.
      역대 최고 현실에서 얻었을 현실 기계 수에 따라 결정되는 상한까지 수동적으로 생산됩니다.`
  },
  {
    name: "라이텔라",
    id: 39,
    requiredStage: PROGRESS_STAGE.LAITELA,
    description: `라이텔라는 여섯 번째 셀레스티얼로, 변형된 완료 조건이 있고 얼마나 빨리 도달하느냐에 따른
      점증 보상을 주는 현실을 가집니다. 주로 암흑 물질이라는 자원과 관련된 새 기능을 해금합니다.`
  },
  {
    name: "연속체",
    id: 40,
    requiredStage: PROGRESS_STAGE.LAITELA,
    description: `연속체는 반물질 차원이 실제로 구매하지 않고도 분수 단위의 업그레이드를 구매한 것처럼
      생산할 수 있게 하는 변형된 생산 방식입니다.`
  },
  {
    name: "암흑 물질 차원",
    id: 41,
    openH2pEntry: "Lai'tela",
    requiredStage: PROGRESS_STAGE.LAITELA,
    description: `암흑 물질 차원은 연속이 아닌 틱 기반 시스템으로 작동하는 계단식 생산 구조입니다.
      가장 낮은 단계가 암흑 물질을 생산하며 모든 단계가 암흑 에너지를 생산합니다.`
  },
  {
    name: "차원 초기화 메커니즘",
    id: 42,
    openH2pEntry: "Lai'tela",
    requiredStage: PROGRESS_STAGE.LAITELA,
    description: `암흑 물질 차원을 초기화하는 방법은 두 가지입니다.
      소멸은 모든 차원을 초기화하는 대신 모든 암흑 물질 차원에 영구 배율을 부여합니다.
      승천은 단일 차원의 생산을 증가시키지만 해당 차원의 간격을 초기화합니다.`
  },
  {
    name: "특이점",
    id: 43,
    requiredStage: PROGRESS_STAGE.LAITELA,
    description: `암흑 에너지를 사용해 특이점을 생산할 수 있으며, 총 특이점 수에 비례한 부스트를 줍니다.
      특이점을 생산할 때 응축 임계값을 초과하는 암흑 에너지는 낭비됩니다.`
  },
  {
    name: "펠레",
    id: 44,
    requiredStage: PROGRESS_STAGE.PELLE,
    description: `펠레는 일곱 번째이자 마지막 셀레스티얼로, 게임을 영구적으로 파멸시켜
      탈출할 수 없는 매우 어려운 변형 현실에 던져 넣습니다.`
  },
  {
    name: "아마겟돈",
    id: 45,
    openH2pEntry: "Pelle",
    requiredStage: PROGRESS_STAGE.PELLE,
    description: `아마겟돈은 펠레 전용 초기화로 언제든 실행할 수 있습니다.
      파멸 현실의 처음으로 진행을 초기화하는 대신 현실 파편을 생산하는 잔재를 얻습니다.`
  },
  {
    name: "펠레 스트라이크와 균열",
    id: 46,
    openH2pEntry: "Pelle Strikes",
    requiredStage: PROGRESS_STAGE.PELLE,
    description: `펠레 내에서 특정 이정표에 도달하면 스트라이크가 발생해 파멸 현실에 또 다른 너프를 영구 적용합니다.
      모든 스트라이크에는 균열이 동반되는데, 이는 다른 자원을 소모해 부스트를 받는 메커니즘입니다.
      이는 영구적으로 유지되며 아마겟돈 이후에도 해금 상태를 유지합니다.`
  },
];
