import { TimeStudy } from "./normal-time-study";
import { TimeStudyState } from "./time-studies";

export class DilationTimeStudyState extends TimeStudyState {
  constructor(config) {
    super(config, TIME_STUDY_TYPE.DILATION);
  }

  get isBought() {
    return player.dilation.studies.includes(this.id);
  }

  get canBeBought() {
    return this.isAffordable && this.config.requirement();
  }

  get description() {
    return this.config.description;
  }

  get cost() {
    return typeof this.config.cost === "function" ? this.config.cost() : this.config.cost;
  }

  get totalTimeTheoremRequirement() {
    return this.id === 1 ? 12900 : 0;
  }

  purchase(quiet = false) {
    if (this.isBought || !this.canBeBought) return false;
    if (this.id === 1) {
      // ID 1 is the dilation unlock study
      if (!quiet) {
        Tab.eternity.dilation.show();
      }
      if (Perk.autounlockDilation1.canBeApplied) {
        for (const id of [4, 5, 6]) player.dilation.upgrades.add(id);
      }
      if (Perk.autounlockDilation2.canBeApplied) {
        for (const id of [7, 8, 9]) player.dilation.upgrades.add(id);
      }
      if (!Pelle.isDoomed) Currency.tachyonParticles.bumpTo(Perk.startTP.effectOrDefault(0));
      if (Ra.unlocks.unlockDilationStartingTP.canBeApplied && !isInCelestialReality() && !Pelle.isDoomed) {
        Currency.tachyonParticles.bumpTo(getTP(Ra.unlocks.unlockDilationStartingTP.effectOrDefault(0), false));
      }
      TabNotification.dilationAfterUnlock.tryTrigger();
    }
    if (this.id === 6) {
      // ID 6 is the reality unlock study
      if (!PlayerProgress.realityUnlocked()) {
        Modal.message.show(`첫 번째 현실의 현실 기계 획득량은 영원 포인트 ${format("1e6000")} 이상에서 감소하며
          ${format("1e8000")}에서 상한이 걸립니다. 이는 현실 업데이트에서 적용된 밸런스 변경으로,
          ${format("1e6000")} 이상에서 증가하는 시간 차원 비용 등 해당 수치에 도달하는 난이도에
          영향을 주는 요소들 때문입니다.`, {}, 3);
        EventHub.dispatch(GAME_EVENT.REALITY_FIRST_UNLOCKED);
      }
      if (!Perk.autounlockReality.isBought) Tab.reality.glyphs.show();
    }

    player.dilation.studies.push(this.id);
    Currency.timeTheorems.subtract(this.cost);
    return true;
  }
}

DilationTimeStudyState.studies = mapGameData(
  GameDatabase.eternity.timeStudies.dilation,
  config => new DilationTimeStudyState(config)
);

/**
 * @type {DilationTimeStudyState}
 */
TimeStudy.dilation = DilationTimeStudyState.studies[1];

/**
 * @param {number} tier
 * @returns {DilationTimeStudyState}
 */
TimeStudy.timeDimension = function(tier) {
  return DilationTimeStudyState.studies[tier - 3];
};

/**
 * @type {DilationTimeStudyState}
 */
TimeStudy.reality = DilationTimeStudyState.studies[6];

TimeStudy.boughtDilationTS = function() {
  return player.dilation.studies.map(id => DilationTimeStudyState.studies[id]);
};
