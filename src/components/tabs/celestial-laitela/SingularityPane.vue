<script>
export default {
  name: "SingularityPane",
  data() {
    return {
      darkEnergy: 0,
      darkEnergyGainPerSecond: 0,
      singularities: 0,
      singularityCapIncreases: 0,
      canPerformSingularity: false,
      unlockedBulkSingularity: false,
      singularityCap: 0,
      baseTimeToSingularity: 0,
      currentTimeToSingularity: 0,
      extraTimeAfterSingularity: 0,
      singularitiesGained: 0,
      autoSingularityFactor: 0,
      perStepFactor: 0,
      isAutoEnabled: false,
      hasAutoSingularity: false,
      nextLowerStep: 0,
      willCondenseOnDecrease: false,
    };
  },
  computed: {
    isDoomed: () => Pelle.isDoomed,
    singularityFormText() {
      const formText = this.singularitiesGained === 1 ? "모든 암흑 에너지를 특이점으로 변환"
        : `모든 암흑 에너지를 ${quantify("특이점", this.singularitiesGained, 2)}으로 변환`;
      if (this.canPerformSingularity) {
        return `응축 ${formText}`;
      }
      return `${format(this.singularityCap)} 암흑 에너지에 도달하여 ${formText}`;
    },
    singularityWaitText() {
      let singularityTime = this.currentTimeToSingularity;
      if (this.canPerformSingularity) {
        singularityTime += this.extraTimeAfterSingularity;
        if (!this.isAutoEnabled) return "";
        return singularityTime > 0
          ? `(${TimeSpan.fromSeconds(singularityTime).toStringShort()}에 자동 응축)`
          : "(즉시 자동 응축)";
      }
      return `(${TimeSpan.fromSeconds(singularityTime).toStringShort()}에 충분한 암흑 에너지)`;
    },
    baseSingularityTime() {
      return TimeSpan.fromSeconds(this.baseTimeToSingularity).toStringShort();
    },
    additionalSingularityTime() {
      return TimeSpan.fromSeconds(this.extraTimeAfterSingularity).toStringShort();
    },
    manualSingularityRate() {
      const totalTime = this.baseTimeToSingularity;
      return this.formatRate(this.singularitiesGained / totalTime);
    },
    autoSingularityRate() {
      if (this.hasAutoSingularity && !this.isAutoEnabled) return "자동 특이점이 꺼져 있습니다";
      const totalTime = this.baseTimeToSingularity + this.extraTimeAfterSingularity;
      return this.formatRate(this.singularitiesGained / totalTime);
    },
    decreaseTooltip() {
      if (this.singularityCapIncreases === 0) return "한계를 더 이상 감소시킬 수 없습니다!";
      const singularities = this.singularitiesGained / this.perStepFactor;
      return this.willCondenseOnDecrease
        ? `한계를 감소시키면 즉시 자동 응축으로
          ${quantify("특이점", singularities, 2)}을 얻습니다!`
        : null;
    },
    increaseTooltip() {
      return this.singularityCapIncreases >= 50
        ? "한계를 더 이상 증가시킬 수 없습니다!"
        : null;
    }
  },
  methods: {
    update() {
      const laitela = player.celestials.laitela;
      this.darkEnergy = Currency.darkEnergy.value;
      this.darkEnergyGainPerSecond = Currency.darkEnergy.productionPerSecond;
      this.singularities = Currency.singularities.value;
      this.singularityCapIncreases = laitela.singularityCapIncreases;
      this.canPerformSingularity = Singularity.capIsReached;
      this.unlockedBulkSingularity = Currency.singularities.gte(10);
      this.singularityCap = Singularity.cap;
      this.baseTimeToSingularity = Singularity.timePerCondense;
      this.currentTimeToSingularity = Singularity.timeUntilCap;
      this.extraTimeAfterSingularity = Singularity.timeDelayFromAuto;
      this.singularitiesGained = Singularity.singularitiesGained;
      this.autoSingularityFactor = SingularityMilestone.autoCondense.effectOrDefault(Infinity);
      this.perStepFactor = Singularity.gainPerCapIncrease;
      this.isAutoEnabled = player.auto.singularity.isActive && SingularityMilestone.autoCondense.canBeApplied;
      this.hasAutoSingularity = Number.isFinite(this.autoSingularityFactor);
      this.nextLowerStep = this.singularityCap * this.autoSingularityFactor / 10;
      this.willCondenseOnDecrease = this.isAutoEnabled && this.darkEnergy > this.nextLowerStep;
    },
    doSingularity() {
      Singularity.perform();
    },
    increaseCap() {
      Singularity.increaseCap();
    },
    decreaseCap() {
      Singularity.decreaseCap();
    },
    formatRate(rate) {
      if (rate < 1 / 60) return `${format(3600 * rate, 2, 3)} / 시간`;
      if (rate < 1) return `${format(60 * rate, 2, 3)} / 분`;
      return `${format(rate, 2, 3)} / 초`;
    },
    condenseClassObject() {
      return {
        "c-laitela-singularity": true,
        "c-laitela-singularity--active": this.canPerformSingularity && !this.isDoomed,
        "o-pelle-disabled": this.isDoomed,
        "o-pelle-disabled-pointer": this.isDoomed,
      };
    }
  }
};
</script>

<template>
  <div class="c-laitela-singularity-container">
    <div>
      <h2>
        {{ quantify("특이점", singularities, 2) }}을 가지고 있습니다
      </h2>
      <button
        :class="condenseClassObject()"
        @click="doSingularity"
      >
        <h2>
          {{ singularityFormText }}
        </h2>
        <br v-if="singularityWaitText !== ''">
        <h2>
          {{ singularityWaitText }}
        </h2>
      </button>
    </div>
    <div v-if="singularities !== 0">
      <div class="o-laitela-matter-amount">
        {{ format(darkEnergy, 2, 4) }} 암흑 에너지를 가지고 있습니다. (+{{ format(darkEnergyGainPerSecond, 2, 4) }}/초)
      </div>
      <div v-if="unlockedBulkSingularity">
        <button
          class="c-laitela-singularity__cap-control"
          :class="{ 'c-laitela-singularity__cap-control--available' : singularityCapIncreases > 0 }"
          :ach-tooltip="decreaseTooltip"
          @click="decreaseCap"
        >
          특이점 한계 감소.
        </button>
        <button
          class="c-laitela-singularity__cap-control"
          :class="{ 'c-laitela-singularity__cap-control--available' : singularityCapIncreases < 50 }"
          :ach-tooltip="increaseTooltip"
          @click="increaseCap"
        >
          특이점 한계 증가.
        </button>
        <br>
        각 단계는 필요한 암흑 에너지를 {{ formatX(10) }}배로 증가시키고,
        <br>
        획득한 특이점을 {{ formatX(perStepFactor) }}배로도 증가시킵니다.
      </div>
      <div v-else>
        <br>
        {{ format(10) }}개의 특이점에 도달하여
        <br>
        대량 특이점을 해금합니다.
        <br>
      </div>
      <br>
      응축하는 데 걸리는 총 시간<span v-if="hasAutoSingularity"> (자동)</span>:
      {{ baseSingularityTime }}
      <span v-if="hasAutoSingularity && autoSingularityFactor !== 1">
        (+{{ additionalSingularityTime }})
      </span>
      <br>
      <span v-if="hasAutoSingularity && autoSingularityFactor !== 1">수동 </span>
      특이점 획득 속도: {{ manualSingularityRate }}
      <br>
      <span v-if="hasAutoSingularity && autoSingularityFactor !== 1">
        자동 특이점 획득 속도: {{ autoSingularityRate }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.c-laitela-singularity__cap-control {
  margin: 0 0.3rem 1rem;
}
</style>
