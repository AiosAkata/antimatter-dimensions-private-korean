<script>
export default {
  name: "RealityAmplifyButton",
  data: () => ({
    isDoomed: false,
    isVisible: false,
    isDisabled: false,
    isActive: false,
    ratio: 1,
    canAmplify: false,
  }),
  computed: {
    tooltip() {
      if (this.isDoomed) return "운명의 현실은 증폭할 수 없습니다";
      if (this.isDisabled) return "셀레스티얼 현실은 증폭할 수 없습니다";
      if (!this.canAmplify) {
        return "실시간을 더 저장하거나 현실을 빠르게 완료하여 증폭합니다";
      }
      return null;
    },
    buttonClass() {
      return {
        "l-reality-amplify-button": true,
        "l-reality-amplify-button--clickable": !this.isDoomed && this.canAmplify,
        "o-enslaved-mechanic-button--storing-time": this.isActive,
      };
    }
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed;
      this.isVisible = Enslaved.isUnlocked;
      this.isDisabled = isInCelestialReality();
      this.isActive = Enslaved.boostReality;
      this.ratio = Enslaved.realityBoostRatio;
      this.canAmplify = Enslaved.canAmplify;
    },
    toggleActive() {
      if (!this.canAmplify) return;
      Enslaved.boostReality = !Enslaved.boostReality;
    }
  }
};
</script>

<template>
  <button
    v-if="isVisible"
    :class="buttonClass"
    :ach-tooltip="tooltip"
    @click="toggleActive"
  >
    <div v-if="isDoomed">
      운명의 현실은 증폭할 수 없습니다.
    </div>
    <div v-else-if="canAmplify">
      <span v-if="isActive">증폭될 예정:</span>
      <span v-else>이 현실 증폭:</span>
      <br>
      모든 보상 ×{{ formatInt(ratio) }}
    </div>
    <div v-else>
      증폭하기에 저장된 실시간이 충분하지 않습니다.
    </div>
  </button>
</template>

<style scoped>

</style>
