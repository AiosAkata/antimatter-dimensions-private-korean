export const eternityMilestones = {
  autobuyerIPMult: {
    eternities: 1,
    reward: "무한 포인트 배율 자동구매기 잠금 해제",
    pelleUseless: true
  },
  keepAutobuyers: {
    eternities: 2,
    reward: "영원을 시작할 때 모든 일반 도전 완료, 모든 일반 자동구매기 및 무한 돌파"
  },
  autobuyerReplicantiGalaxy: {
    eternities: 3,
    reward: "복제체 갤럭시 자동구매기 잠금 해제"
  },
  keepInfinityUpgrades: {
    eternities: 4,
    reward: "영원을 시작할 때 모든 무한 업그레이드",
    givenByPelle: () => PelleUpgrade.keepInfinityUpgrades.isBought,
    pelleUseless: true
  },
  bigCrunchModes: {
    eternities: 5,
    reward: "더 많은 빅 크런치 자동구매기 옵션 잠금 해제"
  },
  autoEP: {
    eternities: 6,
    reward: () => {
      const EPmin = getOfflineEPGain(TimeSpan.fromMinutes(1).totalMilliseconds);
      const em200 = getEternitiedMilestoneReward(TimeSpan.fromHours(1).totalMilliseconds,
        EternityMilestone.autoEternities.isReached).gt(0);
      const em1000 = getInfinitiedMilestoneReward(TimeSpan.fromHours(1).totalMilliseconds,
        EternityMilestone.autoInfinities.isReached).gt(0);
      if (!player.options.offlineProgress) return `이 마일스톤은 오프라인 영원 포인트 생성을 제공하지만 오프라인 진행 상황은
        현재 비활성화됨`;
      const effectText = (em200 || em1000) ? "비활성" : `현재 ${format(EPmin, 2, 2)} 영원 포인트/분`;
      return `오프라인 중에 이전
        영원에서 최고의 영원 포인트의 ${formatPercents(0.25)}를 분당 얻음 (${effectText})`;
    },
    activeCondition: () => (player.options.offlineProgress
      ? `다른 오프라인 마일스톤
        (${formatInt(200)} 또는 ${formatInt(1000)})이 활성화되지 않는 한 활성화됨`
      : ""),
  },
  autoIC: {
    eternities: 7,
    reward: `무한 도전을 잠금 해제하자마자 완료하고
      차원 희생 자동구매기를 유지`,
    pelleUseless: true
  },
  keepBreakUpgrades: {
    eternities: 8,
    reward: "영원을 시작할 때 모든 무한 돌파 업그레이드",
    givenByPelle: () => PelleUpgrade.keepBreakInfinityUpgrades.isBought,
    pelleUseless: true
  },
  autobuyMaxGalaxies: {
    eternities: 9,
    reward: "최대 반물질 갤럭시 구매 자동구매기 모드 잠금 해제"
  },
  unlockReplicanti: {
    eternities: 10,
    reward: "복제체가 잠금 해제된 상태로 시작",
    givenByPelle: () => PelleUpgrade.replicantiStayUnlocked.isBought,
    pelleUseless: true
  },
  autobuyerID1: {
    eternities: 11,
    reward: "1번째 무한 차원 자동구매기 잠금 해제",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID2: {
    eternities: 12,
    reward: "2번째 무한 차원 자동구매기 잠금 해제",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID3: {
    eternities: 13,
    reward: "3번째 무한 차원 자동구매기 잠금 해제",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID4: {
    eternities: 14,
    reward: "4번째 무한 차원 자동구매기 잠금 해제",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID5: {
    eternities: 15,
    reward: "5번째 무한 차원 자동구매기 잠금 해제",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID6: {
    eternities: 16,
    reward: "6번째 무한 차원 자동구매기 잠금 해제",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID7: {
    eternities: 17,
    reward: "7번째 무한 차원 자동구매기 잠금 해제",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerID8: {
    eternities: 18,
    reward: "8번째 무한 차원 자동구매기 잠금 해제",
    givenByPelle: () => PelleUpgrade.IDAutobuyers.isBought,
    pelleUseless: true
  },
  autoUnlockID: {
    eternities: 25,
    reward: "무한 차원에 도달하면 자동으로 잠금 해제됨"
  },
  unlockAllND: {
    eternities: 30,
    reward: "모든 반물질 차원을 구매 가능한 상태로 시작"
  },
  replicantiNoReset: {
    eternities: 40,
    reward: `복제체 갤럭시가 더 이상 반물질, 반물질 차원,
      틱속도, 차원 희생 또는 차원 부스트를 초기화하지 않음`,
    pelleUseless: true
  },
  autobuyerReplicantiChance: {
    eternities: 50,
    reward: "복제체 확률 업그레이드 자동구매기 잠금 해제",
    givenByPelle: () => PelleUpgrade.replicantiAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerReplicantiInterval: {
    eternities: 60,
    reward: "복제체 간격 업그레이드 자동구매기 잠금 해제",
    givenByPelle: () => PelleUpgrade.replicantiAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerReplicantiMaxGalaxies: {
    eternities: 80,
    reward: "최대 복제체 갤럭시 업그레이드 자동구매기 잠금 해제",
    givenByPelle: () => PelleUpgrade.replicantiAutobuyers.isBought,
    pelleUseless: true
  },
  autobuyerEternity: {
    eternities: 100,
    reward: "영원을 위한 자동구매기 잠금 해제"
  },
  autoEternities: {
    eternities: 200,
    reward: () => {
      if (!player.options.offlineProgress) return `이 마일스톤은 오프라인에서 영원을 생성하지만 오프라인
        진행 상황은 현재 비활성화됨`;
      const eternities = getEternitiedMilestoneReward(TimeSpan.fromHours(1).totalMilliseconds,
        player.eternities.gte(200));
      // As far as I can tell, using templates here as Codefactor wants would lead to nested templates,
      // which seems messy to say the least.
      const realTime = PlayerProgress.seenAlteredSpeed() ? " 실시간" : "";
      // eslint-disable-next-line prefer-template
      return `오프라인 중에 영원을 최고 속도의 ${formatPercents(0.5)}${realTime} 영원 속도로 얻음 ` +
        (eternities.gt(0) ? `(현재 ${format(eternities, 2, 2)}/시간)` : "(비활성)");
    },
    activeCondition: () => (player.options.offlineProgress
      ? `모든 도전 및 팽창 외부에 있어야 하며 영원 자동구매기는 영원 포인트 0에서 영원으로 설정되어야 함.
        이 마일스톤의 효과는 ${formatInt(33)}ms로 제한됨.`
      : ""),
      pelleUseless: true
  },
  autoInfinities: {
    eternities: 1000,
    reward: () => {
      if (!player.options.offlineProgress) return `이 마일스톤은 오프라인에서 무한을 생성하지만 오프라인
        진행 상황은 현재 비활성화됨`;
      const infinities = getInfinitiedMilestoneReward(TimeSpan.fromHours(1).totalMilliseconds,
        player.eternities.gte(1000));
      // eslint-disable-next-line prefer-template
      return `오프라인 중에 이 영원에서 최고의 무한/시간과 같은 무한을 ${formatPercents(0.5)}
        얻음 ` +
        (infinities.gt(0) ? `(현재 ${format(infinities, 2, 2)}/시간)` : "(비활성)");
    },
    activeCondition: () => (player.options.offlineProgress
      ? `일반/무한 도전 외부에 있어야 하고 EC4 및 EC12 외부에 있어야 하며,
        빅 크런치 자동구매기는 켜져 있어야 하고 시간 모드로 ${formatInt(5)}초 이하로 설정되어야 하며,
        영원 자동구매기는 꺼져 있어야 함.`
      : ""),
      pelleUseless: true
  }
};
