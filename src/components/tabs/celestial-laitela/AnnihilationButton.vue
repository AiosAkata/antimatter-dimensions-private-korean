<script>
export default {
  name: "AnnihilationButton",
  data() {
    return {
      darkMatter: new Decimal(0),
      darkMatterMult: 0,
      darkMatterMultGain: 0,
      autobuyerUnlocked: false,
      annihilationButtonVisible: false,
      matterRequirement: 0,
      darkMatterMultRatio: 0,
      autoAnnihilationInput: player.auto.annihilation.multiplier,
      isEnabled: true,
    };
  },
  computed: {
    annihilationInputStyle() {
      return { "background-color": this.isEnabled ? "" : "var(--color-bad)" };
    }
  },
  methods: {
    update() {
      this.darkMatter.copyFrom(Currency.darkMatter);
      this.darkMatterMult = Laitela.darkMatterMult;
      this.darkMatterMultGain = Laitela.darkMatterMultGain;
      this.autobuyerUnlocked = Autobuyer.annihilation.isUnlocked;
      this.annihilationButtonVisible = Laitela.canAnnihilate || this.autobuyerUnlocked;
      this.matterRequirement = Laitela.annihilationDMRequirement;
      this.darkMatterMultRatio = Laitela.darkMatterMultRatio;
      this.isEnabled = player.auto.annihilation.isActive;
    },
    annihilate() {
      Laitela.annihilate();
    },
    handleAutoAnnihilationInputChange() {
      const float = parseFloat(this.autoAnnihilationInput);
      if (isNaN(float)) {
        this.autoAnnihilationInput = player.auto.annihilation.multiplier;
      } else {
        player.auto.annihilation.multiplier = float;
      }
    }
  }
};
</script>

<template>
  <div class="l-laitela-annihilation-container">
    <button
      v-if="darkMatter.lt(matterRequirement)"
      class="l-laitela-annihilation-button"
    >
      소멸은 {{ format(matterRequirement, 2) }} 암흑 물질이 필요합니다
    </button>
    <button
      v-else
      class="l-laitela-annihilation-button c-laitela-annihilation-button"
      @click="annihilate"
    >
      <b>암흑 물질 차원 소멸</b>
    </button>
    <br>
    <br>
    <span v-if="darkMatterMult > 1">
      모든 암흑 물질 차원에 대한 현재 배율: <b>{{ formatX(darkMatterMult, 2, 2) }}</b>
      <br>
      <br>
      소멸은 암흑 물질과 암흑 물질 차원의 양을 초기화하지만, 또한
      <b>+{{ format(darkMatterMultGain, 2, 2) }}</b>를 소멸 배율에 추가합니다.
      <br>
      (<b>{{ formatX(darkMatterMultRatio, 2, 2) }}</b> 이전 배율에서)
      <span v-if="autobuyerUnlocked">
        <br>
        <br>
        다음을 추가할 때 자동 소멸
        <input
          v-model="autoAnnihilationInput"
          type="text"
          :style="annihilationInputStyle"
          class="c-small-autobuyer-input c-laitela-annihilation-input"
          @change="handleAutoAnnihilationInputChange()"
        >
        배율로.
      </span>
    </span>
    <span v-else>
      소멸은 암흑 물질과 암흑 물질 차원의 양을 초기화하지만, 모든 암흑 물질 차원에 대한
      <b>{{ formatX(1 + darkMatterMultGain, 2, 2) }}</b>의 영구적인 배율을 제공합니다.
    </span>
  </div>
</template>
