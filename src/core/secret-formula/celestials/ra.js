export const ra = {
  pets: {
    teresa: {
      id: "teresa",
      name: "테레사",
      color: "#8596ea",
      chunkGain: "영원 포인트",
      memoryGain: "현재 RM",
      requiredUnlock: () => undefined,
      rawMemoryChunksPerSecond: () => 4 * Math.pow(Currency.eternityPoints.value.pLog10() / 1e4, 3),
      memoryProductionMultiplier: () => Ra.unlocks.teresaXP.effectOrDefault(1)
    },
    effarig: {
      id: "effarig",
      name: "에파리그",
      color: "#ea8585",
      chunkGain: "획득한 유물 파편",
      memoryGain: "최고 글리프 레벨",
      requiredUnlock: () => Ra.unlocks.effarigUnlock,
      rawMemoryChunksPerSecond: () => 4 * Math.pow(Effarig.shardsGained, 0.1),
      memoryProductionMultiplier: () => Ra.unlocks.effarigXP.effectOrDefault(1)
    },
    enslaved: {
      id: "enslaved",
      name: "이름없는 자",
      color: "#f1aa7f",
      chunkGain: "시간 파편",
      memoryGain: "총 플레이 시간",
      requiredUnlock: () => Ra.unlocks.enslavedUnlock,
      rawMemoryChunksPerSecond: () => 4 * Math.pow(Currency.timeShards.value.pLog10() / 3e5, 2),
      memoryProductionMultiplier: () => Ra.unlocks.enslavedXP.effectOrDefault(1)
    },
    v: {
      id: "v",
      name: "V",
      color: "#ead584",
      chunkGain: "무한 거듭제곱",
      memoryGain: "총 기억 레벨",
      requiredUnlock: () => Ra.unlocks.vUnlock,
      rawMemoryChunksPerSecond: () => 4 * Math.pow(Currency.infinityPower.value.pLog10() / 1e7, 1.5),
      memoryProductionMultiplier: () => Ra.unlocks.vXP.effectOrDefault(1)
    }
  },
  unlocks: {
    autoTP: {
      id: 0,
      reward: "시간 팽창이 활성화되면 타키온 입자가 즉시 제공됩니다.",
      pet: "teresa",
      level: 1,
      displayIcon: `<span class="fas fa-atom"></span>`,
      disabledByPelle: true
    },
    chargedInfinityUpgrades: {
      id: 1,
      reward: () => `충전된 무한 업그레이드를 해금합니다. ${formatInt(2)}레벨마다 추가 충전된 무한 업그레이드를 얻습니다.`,
      effect: () => Math.min(12, Math.floor(Ra.pets.teresa.level / 2)),
      pet: "teresa",
      level: 2,
      displayIcon: `<span class="fas fa-infinity"></span>`,
      disabledByPelle: true
    },
    teresaXP: {
      id: 2,
      reward: "모든 기억 청크는 현실 기계에 기반한 더 많은 기억을 생성합니다.",
      effect: () => 1 + Math.pow(Currency.realityMachines.value.pLog10() / 100, 0.5),
      pet: "teresa",
      level: 5,
      displayIcon: `Ϟ`
    },
    alteredGlyphs: {
      id: 3,
      reward: "변형된 글리프를 해금합니다. 글리프 희생에 기반한 글리프에 새로운 효과를 부여합니다.",
      pet: "teresa",
      level: 10,
      displayIcon: `<span class="fas fa-bolt"></span>`,
      disabledByPelle: true
    },
    effarigUnlock: {
      id: 4,
      reward: "에파리그의 기억을 해금합니다.",
      pet: "teresa",
      level: 8,
      displayIcon: `Ϙ`
    },
    perkShopIncrease: {
      id: 5,
      reward: "테레사의 특전 포인트 상점에서 구매 상한선이 증가합니다.",
      pet: "teresa",
      level: 15,
      displayIcon: `<span class="fas fa-project-diagram"></span>`
    },
    unlockDilationStartingTP: {
      id: 6,
      reward: `비셀레스티얼 현실에서, 팽창에서 총 반물질의 제곱근에 도달한 것처럼 타키온 입자를 획득합니다. TP 획득에 대한 모든 배수는 팽창 외에서도 소급 적용됩니다.`,
      effect: () => player.records.totalAntimatter.pow(0.5),
      pet: "teresa",
      level: 25,
      displayIcon: `<i class="far fa-dot-circle"></i>`
    },
    extraGlyphChoicesAndRelicShardRarityAlwaysMax: {
      id: 7,
      reward: () => `${formatX(2)} 글리프 선택을 얻고 유물 파편의 글리프 희귀성 보너스는 항상 최대값입니다.`,
      effect: 2,
      pet: "effarig",
      level: 1,
      displayIcon: `<i class="fas fa-grip-horizontal"></i>`
    },
    unlockGlyphAlchemy: {
      id: 8,
      reward: `글리프 연금술을 해금합니다. 글리프 정제로 증가시킬 수 있는 연금술 자원을 추가합니다. 에파리그 레벨을 통해 더 많은 자원을 해금할 수 있습니다. 새로운 현실 탭을 통해 접근할 수 있습니다.`,
      pet: "effarig",
      level: 2,
      displayIcon: `<span class="fas fa-vial"></span>`
    },
    effarigXP: {
      id: 9,
      reward: "모든 기억 청크는 최고 글리프 레벨에 기반한 더 많은 기억을 생성합니다.",
      effect: () => 1 + player.records.bestReality.glyphLevel / 7000,
      pet: "effarig",
      level: 5,
      displayIcon: `<span class="fas fa-clone"></span>`
    },
    glyphEffectCount: {
      id: 10,
      reward: () => `글리프는 항상 ${formatInt(4)}개의 효과를 가지며, 에파리그 글리프는 이제 최대 ${formatInt(7)}개를 가질 수 있습니다.`,
      pet: "effarig",
      level: 10,
      displayIcon: `<span class="fas fa-braille"></span>`
    },
    enslavedUnlock: {
      id: 11,
      reward: "이름없는 자의 기억을 해금합니다.",
      pet: "effarig",
      level: 8,
      displayIcon: `<span class="c-ra-pet-milestones-effarig-link">\uf0c1</span>`
    },
    relicShardGlyphLevelBoost: {
      id: 12,
      reward: "글리프 레벨은 획득한 유물 파편에 기반해 증가합니다.",
      effect: () => 100 * Math.pow(Math.log10(Math.max(Effarig.shardsGained, 1)), 2),
      pet: "effarig",
      level: 15,
      displayIcon: `<span class="fas fa-fire"></span>`
    },
    maxGlyphRarityAndShardSacrificeBoost: {
      id: 13,
      reward: () => `글리프는 항상 ${formatPercents(1)} 희귀성으로 생성되며, 글리프 희생 획득은 유물 파편에 기반한 거듭제곱으로 상승합니다.`,
      effect: () => 1 + Effarig.maxRarityBoost / 100,
      pet: "effarig",
      level: 25,
      displayIcon: `<i class="fas fa-ankh"></i>`
    },
    blackHolePowerAutobuyers: {
      id: 14,
      reward: "블랙홀 거듭제곱 업그레이드 자동구매자를 해금합니다.",
      pet: "enslaved",
      level: 1,
      displayIcon: `<span class="fas fa-circle"></span>`,
      disabledByPelle: true
    },
    improvedStoredTime: {
      id: 15,
      reward: "저장된 게임 시간이 증폭되고 더 많은 실시간을 저장할 수 있으며, 이름없는 자 레벨과 함께 증가합니다.",
      effects: {
        gameTimeAmplification: () => Math.pow(20, Math.clampMax(Ra.pets.enslaved.level, Ra.levelCap)),
        realTimeCap: () => 1000 * 3600 * Ra.pets.enslaved.level,
      },
      pet: "enslaved",
      level: 2,
      displayIcon: `<span class="fas fa-history"></span>`,
      disabledByPelle: true
    },
    enslavedXP: {
      id: 16,
      reward: "모든 기억 청크는 총 플레이 시간에 기반한 더 많은 기억을 생성합니다.",
      effect: () => 1 + Math.log10(player.records.totalTimePlayed) / 200,
      pet: "enslaved",
      level: 5,
      displayIcon: `<span class="fas fa-stopwatch"></span>`
    },
    autoPulseTime: {
      id: 17,
      reward: () => `블랙홀 충전은 이제 게임 속도의 ${formatPercents(0.99)}만 사용하며, 매 ${formatInt(5)} 틱마다 저장된 게임 시간의 ${formatPercents(0.01)}를 자동으로 방출할 수 있습니다.`,
      pet: "enslaved",
      level: 10,
      displayIcon: `<span class="fas fa-expand-arrows-alt"></span>`,
      disabledByPelle: true
    },
    vUnlock: {
      id: 18,
      reward: "V의 기억을 해금합니다.",
      pet: "enslaved",
      level: 8,
      displayIcon: `⌬`
    },
    peakGamespeedDT: {
      id: 19,
      reward: "각 현실에서 최고 게임 속도에 기반해 더 많은 팽창된 시간을 획득합니다.",
      effect: () => Math.max(Math.pow(Math.log10(player.celestials.ra.peakGamespeed) - 90, 3), 1),
      pet: "enslaved",
      level: 15,
      displayIcon: `<span class="fas fa-tachometer-alt"></span>`,
      disabledByPelle: true
    },
    allGamespeedGlyphs: {
      id: 20,
      reward: `모든 기본 글리프는 시간 글리프로부터 증가된 게임 속도 효과를 얻으며, 시간 글리프는 추가 효과를 얻습니다.`,
      pet: "enslaved",
      level: 25,
      displayIcon: `<span class="fas fa-clock"></span>`,
      onUnlock: () => {
        const allGlyphs = player.reality.glyphs.active.concat(player.reality.glyphs.inventory);
        for (const glyph of allGlyphs) {
          Glyphs.applyGamespeed(glyph);
        }
      }
    },
    instantECAndRealityUpgradeAutobuyers: {
      id: 21,
      reward: "구매 가능한 현실 업그레이드가 자동으로 구매되고 자동 영원 도전이 즉시 발생합니다.",
      pet: "v",
      level: 1,
      displayIcon: `<span class="fas fa-sync-alt"></span>`,
      disabledByPelle: true
    },
    autoUnlockDilation: {
      id: 22,
      reward: () => `비셀레스티얼 현실에서, 시간 팽창은 ${formatInt(TimeStudy.dilation.totalTimeTheoremRequirement)} 시간 정리에서 자동으로 무료로 해금됩니다.`,
      pet: "v",
      level: 2,
      displayIcon: `<span class="fas fa-fast-forward"></span>`
    },
    vXP: {
      id: 23,
      reward: "모든 기억 청크는 총 셀레스티얼 레벨에 기반한 더 많은 기억을 생성합니다.",
      effect: () => 1 + Ra.totalPetLevel / 50,
      pet: "v",
      level: 5,
      displayIcon: `<span class="fas fa-book"></span>`
    },
    unlockHardV: {
      id: 24,
      reward: () => `어려운 V 성취를 해금하고 ${formatInt(6)}레벨마다 삼중 연구를 해금합니다. 삼중 연구는 시간 연구 페이지의 하단에 위치합니다.`,
      effect: () => Math.floor(Ra.pets.v.level / 6),
      pet: "v",
      level: 6,
      displayIcon: `<span class="fas fa-trophy"></span>`,
      disabledByPelle: true
    },
    continuousTTBoost: {
      id: 25,
      reward: "시간 정리는 모든 형태의 연속 비차원 생산을 강화합니다.",
      effects: {
        ttGen: () => Math.pow(10, 5 * Ra.theoremBoostFactor()),
        eternity: () => Math.pow(10, 2 * Ra.theoremBoostFactor()),
        infinity: () => Math.pow(10, 15 * Ra.theoremBoostFactor()),
        replicanti: () => Math.pow(10, 20 * Ra.theoremBoostFactor()),
        dilatedTime: () => Math.pow(10, 3 * Ra.theoremBoostFactor()),
        memories: () => 1 + Ra.theoremBoostFactor() / 50,
        memoryChunks: () => 1 + Ra.theoremBoostFactor() / 50,
        autoPrestige: () => 1 + 2.4 * Ra.theoremBoostFactor()
      },
      pet: "v",
      level: 10,
      displayIcon: `<span class="fas fa-university"></span>`,
      disabledByPelle: true
    },
    achievementTTMult: {
      id: 26,
      reward: "성취 배율이 시간 정리 생성에 적용됩니다.",
      effect: () => Achievements.power,
      pet: "v",
      level: 15,
      displayIcon: `<span class="fas fa-graduation-cap"></span>`,
      disabledByPelle: true
    },
    achievementPower: {
      id: 27,
      reward: () => `성취 배율이 ${formatPow(1.5, 1, 1)}로 상승합니다.`,
      effect: 1.5,
      pet: "v",
      level: 25,
      displayIcon: `<i class="fab fa-buffer"></i>`,
      disabledByPelle: true
    }
  }
};
