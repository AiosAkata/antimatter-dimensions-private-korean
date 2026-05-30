export const dilationTimeStudies = [
  {
    id: 1,
    description: "시간 팽창 해제",
    cost: 5000,
    requirement: () => {
      const ttRequirement = Currency.timeTheorems.max.gte(TimeStudy.dilation.totalTimeTheoremRequirement);
      if (Ra.unlocks.autoUnlockDilation.canBeApplied &&
          ttRequirement &&
          !isInCelestialReality() && !Pelle.isDoomed
      ) {
        return true;
      }
      const tsRequirement = [231, 232, 233, 234].some(id => TimeStudy(id).isBought);
      if (Perk.bypassECDilation.canBeApplied) return tsRequirement;
      const ecRequirement = EternityChallenge(11).isFullyCompleted && EternityChallenge(12).isFullyCompleted;
      return tsRequirement && ecRequirement && ttRequirement;
    }
  },
  {
    id: 2,
    description: "5번째 시간 차원 해제",
    cost: 1e6,
    requirement: () => PlayerProgress.dilationUnlocked()
  },
  {
    id: 3,
    description: "6번째 시간 차원 해제",
    cost: 1e7,
    requirement: () => TimeStudy.timeDimension(5).isBought
  },
  {
    id: 4,
    description: "7번째 시간 차원 해제",
    cost: 1e8,
    requirement: () => TimeStudy.timeDimension(6).isBought
  },
  {
    id: 5,
    description: "8번째 시간 차원 해제",
    cost: 1e9,
    requirement: () => TimeStudy.timeDimension(7).isBought
  },
  {
    id: 6,
    description: () => (Pelle.isDoomed
      ? "운명의 현실에서 벗어날 수 없습니다"
      : "현실 해제"),
    cost: 1,
    requirement: () => TimeStudy.timeDimension(8).isBought &&
      player.records.thisReality.maxEP.exponent >= 4000 &&
      (Perk.firstPerk.isBought || Achievements.preReality.every(a => a.isUnlocked)) &&
      !Pelle.isDoomed
  }
];
