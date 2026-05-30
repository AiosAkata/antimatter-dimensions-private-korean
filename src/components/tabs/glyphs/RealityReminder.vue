<script>
export default {
  name: "RealityReminder",
  data() {
    return {
      canReality: false,
      isVisible: false,
      isExpanded: false,
      ecCount: 0,
      missingAchievements: 0,
      unpurchasedDilationUpgrades: 0,
      currLog10EP: 0,
      cheapestLog10TD: 0,
      multEPLog10Cost: 0,
      purchasableTS: 0,
      hasDilated: 0,
      availableCharges: 0,
    };
  },
  computed: {
    suggestions() {
      const arr = [];
      if (this.purchasableTS > 0) {
        arr.push(`더 많은 시간 연구 구매 (${formatInt(this.purchasableTS)}개 사용 가능)`);
      }
      if (this.missingAchievements > 0) {
        arr.push(`나머지 업적 완료 (${formatInt(this.missingAchievements)}개 남음)`);
      }
      if (this.unpurchasedDilationUpgrades > 0) {
        arr.push(`남은 확장 업그레이드 구매 (${formatInt(this.unpurchasedDilationUpgrades)}개 남음)`);
      }
      if (this.currLog10EP > 1.3 * this.cheapestLog10TD) {
        arr.push(`더 많은 TD 구매 (최저: ${format(Decimal.pow10(this.cheapestLog10TD))} EP)`);
      }
      if (this.currLog10EP > 1.3 * this.multEPLog10Cost) {
        arr.push(`더 많은 ${formatX(5)} EP 구매 (비용: ${format(Decimal.pow10(this.multEPLog10Cost))} EP)`);
      }
      if (this.ecCount < 60) {
        arr.push(`나머지 EC 완료 (완료: ${formatInt(this.ecCount)}/${formatInt(60)})`);
      }
      if (!this.hasDilated) {
        arr.push("확장된 영원 수행");
      }
      if (this.availableCharges > 0) {
        arr.push(`더 많은 무한 업그레이드 충전 (${formatInt(this.availableCharges)}개 사용 가능)`);
      }
      return arr;
    },
    canBeExpanded() {
      return this.canReality && this.suggestions.length !== 0;
    },
    styleObject() {
      const color = (!this.canReality || this.canBeExpanded) ? "var(--color-bad)" : "var(--color-good)";
      // Has both is and canBe in order to force the height back to its minimum size when all suggestions are done
      const height = (this.canBeExpanded && this.isExpanded) ? `${6.5 + 1.5 * this.suggestions.length}rem` : "5rem";
      return {
        color,
        height,
      };
    },
    clickText() {
      return `(클릭하여 ${this.isExpanded ? "축소" : "확장"})`;
    },
    realityReminderClass() {
      return {
        "c-reality-reminder": true,
        "c-reality-reminder-pointer": this.canBeExpanded,
      };
    },
    dropDownIconClass() {
      return this.isExpanded ? "far fa-minus-square" : "far fa-plus-square";
    }
  },
  created() {
    // Collapsing it after every reality resets the height to its fixed minimum value, stopping screen jitter
    this.on$(GAME_EVENT.REALITY_RESET_AFTER, () => this.isExpanded = false);
  },
  methods: {
    update() {
      this.canReality = TimeStudy.reality.isBought;
      this.isVisible = !isInCelestialReality();
      this.ecCount = EternityChallenges.completions;
      this.missingAchievements = Achievements.preReality.countWhere(a => !a.isUnlocked);
      // Repeatable dilation upgrades don't have isBought, but do have boughtAmount
      this.unpurchasedDilationUpgrades = DilationUpgrade.all
        .countWhere(u => (u.isBought === undefined ? u.boughtAmount === 0 : !u.isBought) && !u.config.pelleOnly);
      this.currLog10EP = player.eternityPoints.log10();
      this.cheapestLog10TD = Math.min(...TimeDimensions.all.map(x => x.cost.log10()));
      this.multEPLog10Cost = EternityUpgrade.epMult.cost.log10();
      this.purchasableTS = NormalTimeStudyState.studies.countWhere(s => s && s.canBeBought && !s.isBought);
      this.hasDilated = Perk.startTP.canBeApplied ? player.dilation.lastEP.gt(0)
        : player.dilation.tachyonParticles.gt(0);
      this.availableCharges = Ra.chargesLeft;
    },
    clicked() {
      if (!this.canBeExpanded) return;
      this.isExpanded = !this.isExpanded;
    },
  }
};
</script>

<template>
  <div
    v-if="isVisible"
    :class="realityReminderClass"
    :style="styleObject"
    @click="clicked"
  >
    <span v-if="!canReality">
      시간 연구 트리에서 현실을 아직 해금해야 합니다.
    </span>
    <span v-else-if="suggestions.length === 0">
      현실으로 갈 준비가 되었습니다! 이 현실 내에서 사용 가능한 모든 업그레이드를 해금했습니다.
    </span>
    <span v-else>
      <i :class="dropDownIconClass" />
      현실 전에 할 수 있는 {{ quantifyInt("가지", suggestions.length) }}가 있습니다. {{ clickText }}
      <div
        v-if="isExpanded"
        class="l-suggestions"
      >
        <br>
        <div
          v-for="suggestion in suggestions"
          :key="suggestion"
        >
          {{ suggestion }}
        </div>
      </div>
    </span>
  </div>
</template>

<style scoped>
.l-suggestions {
  font-size: 1rem;
}

.c-reality-reminder-pointer {
  cursor: pointer;
}
</style>
