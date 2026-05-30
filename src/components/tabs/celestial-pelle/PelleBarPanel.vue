<script>
import PelleRift from "./PelleRift";

export default {
  name: "PelleBarPanel",
  components: {
    PelleRift
  },
  data() {
    return {
      decayRate: 0,
      isCollapsed: false,
    };
  },
  computed: {
    collapseIcon() {
      return this.isCollapsed
        ? "fas fa-expand-arrows-alt"
        : "fas fa-compress-arrows-alt";
    },
    strikes() {
      return PelleStrikes.all;
    }
  },
  methods: {
    update() {
      this.decayRate = Pelle.riftDrainPercent;
      this.isCollapsed = player.celestials.pelle.collapsed.rifts;
    },
    toggleCollapse() {
      player.celestials.pelle.collapsed.rifts = !this.isCollapsed;
    },
  }
};
</script>

<template>
  <div class="l-pelle-panel-container">
    <div class="c-pelle-panel-title">
      <i
        :class="collapseIcon"
        class="c-collapse-icon-clickable"
        @click="toggleCollapse"
      />
      펠레 타격 및 균열
    </div>
    <div
      v-if="!isCollapsed"
      class="l-pelle-content-container"
    >
      균열은 막대를 클릭하여 활성화할 수 있습니다.
      <span v-if="strikes.length > 1">한 번에 2개 이상의 균열을 활성화할 수 없습니다.</span>
      <br v-else>
      활성화되면 균열은 초당 다른 자원의 {{ formatPercents(decayRate) }}을(를) 소비합니다.
      <br>
      균열 효과는 활성화되지 않은 상태에서도 적용되며 소비된 총량을 기반으로 합니다.
      <b class="o-strike-warning">펠레 타격 패널티는 영구적이며 아마겟돈 이후에도 계속 활성 상태입니다!</b>
      <div class="c-pelle-bar-container">
        <PelleRift
          v-for="strike in strikes"
          :key="strike.config.id"
          :strike="strike"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-collapse-icon-clickable {
  position: absolute;
  top: 50%;
  left: 1.5rem;
  width: 3rem;
  align-content: center;
  transform: translateY(-50%);
  cursor: pointer;
}

.c-pelle-bar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.o-strike-warning {
  color: var(--color-pelle--base);
  font-size: 1.4rem;
}
</style>
