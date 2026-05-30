<script>
import AutomatorDefineSingleEntry from "./AutomatorDefineSingleEntry";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "AutomatorDefinePage",
  components: {
    AutomatorDefineSingleEntry,
    PrimaryButton,
  },
  data() {
    return {
      constants: [],
      count: 0,
      refreshConstants: false,
    };
  },
  computed: {
    maxConstantCount() {
      return AutomatorData.MAX_ALLOWED_CONSTANT_COUNT;
    },
    maxNameLength() {
      return AutomatorData.MAX_ALLOWED_CONSTANT_NAME_LENGTH;
    },
    maxValueLength() {
      return AutomatorData.MAX_ALLOWED_CONSTANT_VALUE_LENGTH;
    },
    hasConstants() {
      return this.constants.length > 1 || this.constants[0] !== "";
    }
  },
  created() {
    // This key-swaps the container for all the constants in order to force a re-render when externally changed
    this.on$(GAME_EVENT.AUTOMATOR_CONSTANT_CHANGED, () => {
      this.refreshConstants = true;
      this.$nextTick(() => this.refreshConstants = false);
    });
  },
  methods: {
    update() {
      const existingValues = player.reality.automator.constantSortOrder;
      this.count = existingValues.length;
      this.constants = this.count < this.maxConstantCount ? [...existingValues, ""] : [...existingValues];
    },
    deleteAllConstants() {
      if (this.hasConstants) Modal.clearAutomatorConstants.show();
    },
    importPresets() {
      Modal.importTSConstants.show();
    },
  }
};
</script>

<template>
  <div class="l-panel-padding">
    이 패널에서는 숫자 또는 시간 연구 가져오기 문자열 대신 사용할 수 있는 대소문자를 구분하는 상수 값을 정의할 수 있습니다. 이러한 정의는 모든 스크립트에서 공유되며 최대 {{ maxConstantCount }}개의 정의된 상수로 제한됩니다. 또한 상수 이름과 값은 각각 {{ maxNameLength }}와 {{ maxValueLength }}글자로 제한됩니다. 상수에 대한 변경사항은 현재 실행 중인 스크립트가 재시작될 때까지 적용되지 않습니다.
    <br>
    <br>
    사용 예제로 <b>first 🠈 11,21,22,31,32,33</b>을(를) 정의하면
    <b>studies purchase first</b>를 사용하여 처음 세 행의 모든 시간 연구를 구매할 수 있습니다.
    <br>
    <br>
    <PrimaryButton
      v-tooltip="hasConstants ? null : '삭제할 유효한 상수가 없습니다!'"
      class="c-delete-margin o-primary-btn--subtab-option"
      :class="{ 'o-primary-btn--disabled' : !hasConstants }"
      @click="deleteAllConstants"
    >
      모든 상수 삭제
    </PrimaryButton>
    <br>
    <br>
    <PrimaryButton
      class="c-delete-margin o-primary-btn--subtab-option"
      @click="importPresets"
    >
      시간 연구 프리셋 가져오기
    </PrimaryButton>
    <div
      :key="count + refreshConstants"
      class="l-definition-container"
    >
      <AutomatorDefineSingleEntry
        v-for="(constant, i) in constants"
        :key="i"
        :constant="constant"
      />
    </div>
  </div>
</template>

<style scoped>
.c-delete-margin {
  margin: 0;
}

.l-panel-padding {
  padding: 0.5rem 2rem 0 0;
}

.l-definition-container {
  display: flex;
  flex-direction: column;
  border: solid 0.1rem var(--color-automator-docs-font);
  border-radius: var(--var-border-radius, 0.5rem);
  padding: 0.5rem;
  margin-top: 1rem;
}
</style>
