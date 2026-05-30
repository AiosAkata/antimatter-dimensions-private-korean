<script>
export default {
  name: "ResetRealityButton",
  data() {
    return {
      canReality: false,
      resetCelestial: false,
      isInCelestialReality: false,
      isDoomed: false,
    };
  },
  computed: {
    resetText() {
      if (this.isDoomed) return "이 아마겟돈 재시작";
      if (this.isInCelestialReality && !this.resetCelestial) return "이 셀레스티얼 조기 종료";
      if (this.isInCelestialReality && this.resetCelestial) return "이 셀레스티얼 재시작";
      return "이 현실 재시작";
    },
  },
  methods: {
    update() {
      this.canReality = TimeStudy.reality.isBought && player.records.thisReality.maxEP.exponent >= 4000;
      this.resetCelestial = player.options.retryCelestial;
      this.isInCelestialReality = isInCelestialReality();
      this.isDoomed = Pelle.isDoomed;
    },
    resetReality() {
      const confirms = player.options.confirmations;
      if (GameEnd.creditsClosed) return;
      if (this.isInCelestialReality) {
        if (confirms.exitChallenge) Modal.exitChallenge.show({
          challengeName: "a Celestial Reality",
          normalName: "Reality",
          hasHigherLayers: false,
          exitFn: () => beginProcessReality(getRealityProps(true))
        });
        else beginProcessReality(getRealityProps(true));
      } else if (confirms.resetReality) Modal.resetReality.show();
      else beginProcessReality(getRealityProps(true));
    },
  }
};
</script>

<template>
  <button
    :class="['l-reset-reality-button',
             'c-reset-reality-button',
             {'c-reset-reality-button-celestial': isInCelestialReality}]"
    @click="resetReality"
  >
    <div class="l-reality-button__contents">
      {{ resetText }}
    </div>
  </button>
</template>

<style scoped>

</style>
