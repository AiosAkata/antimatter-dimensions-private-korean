<script>
import RealityUpgradeButton from "./RealityUpgradeButton";

export default {
  name: "RealityUpgradesTab",
  components: {
    RealityUpgradeButton
  },
  computed: {
    upgrades: () => RealityUpgrades.all,
    costScalingTooltip: () => `가격은 ${format(1e30)} RM 위에서 더 빠르게 증가하기 시작하고 ${format(Decimal.NUMBER_MAX_VALUE, 1)} RM 위에서 훨씬 더 빠르게 증가합니다`,
    possibleTooltip: () => `바둑판 무늬 업그레이드는 이 현실에서 해금하기 불가능합니다. 줄무늬 업그레이드는
      여전히 가능합니다.`,
    lockTooltip: () => `이미 조건을 실패하지 않았거나 업그레이드를 해금하지 않은 경우에만 작동합니다.`,
  },
  methods: {
    id(row, column) {
      return (row - 1) * 5 + column - 1;
    }
  }
};
</script>

<template>
  <div class="l-reality-upgrade-grid">
    <div class="c-reality-upgrade-infotext">
      추가 정보를 위해 <i class="fas fa-question-circle" /> 아이콘 위로 마우스를 가져갑니다.
      <br>
      첫 번째 행의 업그레이드는 증가하는 비용으로 끝없이 구매할 수 있습니다
      <span :ach-tooltip="costScalingTooltip">
        <i class="fas fa-question-circle" />
      </span>
      그리고 나머지는 일회용 구매입니다.
      <br>
      일회용 업그레이드에는 완료되면 언제든지 업그레이드를 구매할 수 있는 능력을 영구적으로 해금하는 요구 사항도 있습니다.
      <span :ach-tooltip="possibleTooltip">
        <i class="fas fa-question-circle" />
      </span>
      <br>
      잠금 해제되지 않은 업그레이드는 기본적으로 요구 사항과 효과를 표시합니다. 잠금 해제된 업그레이드는
      효과, 현재 보너스 및 비용을 표시합니다. Shift를 누르고 있으면 이 동작을 바꿉니다.
      <br>
      <i class="fas fa-lock-open" />이 있는 업그레이드를 Shift+클릭하면 게임이
      해금 조건을 실패하게 만드는 이 현실에서는 아무것도 하지 않도록 방지합니다.
      <span :ach-tooltip="lockTooltip">
        <i class="fas fa-question-circle" />
      </span>
      <br>
      구매한 업그레이드의 완료된 각 행은 글리프 레벨을 {{ formatInt(1) }}씩 증가시킵니다.
    </div>
    <div
      v-for="row in 5"
      :key="row"
      class="l-reality-upgrade-grid__row"
    >
      <RealityUpgradeButton
        v-for="column in 5"
        :key="id(row, column)"
        :upgrade="upgrades[id(row, column)]"
      />
    </div>
  </div>
</template>

<style scoped>
.c-reality-upgrade-infotext {
  color: var(--color-text);
  margin: -1rem 0 1.5rem;
}
</style>
