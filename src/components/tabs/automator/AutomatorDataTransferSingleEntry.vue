<script>
export default {
  name: "AutomatorDataTransferSingleEntry",
  props: {
    script: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      presets: [],
      constants: [],
      hidePresets: true,
      hideConstants: true,
    };
  },
  computed: {
    presetData: () => player.timestudy.presets,
    constantData: () => player.reality.automator.constants,
    hasPresets() {
      return (this.presets?.length ?? 0) !== 0;
    },
    hasConstants() {
      return (this.constants?.length ?? 0) !== 0;
    },
  },
  methods: {
    update() {
      this.presets = AutomatorBackend.getUsedPresets(this.script.id);
      this.constants = AutomatorBackend.getUsedConstants(this.script.id);
    },
    iconClass(state) {
      return state ? "far fa-plus-square" : "far fa-minus-square";
    },
    exportData(id) {
      const toExport = AutomatorBackend.exportFullScriptData(id);
      if (toExport) {
        copyToClipboard(toExport);
        GameUI.notify.automator(`Exported all data associated with "${this.script.name}" to your clipboard`, 6000);
      } else {
        GameUI.notify.error("Could not export data from blank Automator script!");
      }
    }
  }
};
</script>

<template>
  <div class="l-entry-padding">
    <button
      v-tooltip="'전체 스크립트 데이터 내보내기'"
      class="l-button-margin fas fa-file-export"
      @click="exportData(script.id)"
    />
    <b>스크립트 이름: {{ script.name }}</b>
    <br>
    <span v-if="hasPresets">
      <span
        :class="iconClass(hidePresets)"
        @click="hidePresets = !hidePresets"
      />
      {{ quantifyInt("인식된 연구 프리셋", presets.length) }}을(를) 참조합니다
      <span v-if="!hidePresets">
        <div
          v-for="id in presets"
          :key="id"
        >
          <span v-if="presetData[id].name">"{{ presetData[id].name }}" (슬롯 {{ id + 1 }}):</span>
          <span v-else>프리셋 슬롯 {{ id + 1 }}:</span>
          <br>
          <div class="l-value-padding">
            <span v-if="presetData[id].studies">{{ presetData[id].studies }}</span>
            <i v-else>빈 연구 프리셋</i>
          </div>
        </div>
      </span>
    </span>
    <span v-else>
      연구 프리셋을 참조하지 않습니다.
    </span>
    <br>
    <span v-if="hasConstants">
      <span
        :class="iconClass(hideConstants)"
        @click="hideConstants = !hideConstants"
      />
      {{ quantifyInt("정의된 상수", constants.length) }}을(를) 참조합니다
      <span v-if="!hideConstants">
        <div
          v-for="name in constants"
          :key="name"
        >
          "{{ name }}":
          <br>
          <div class="l-value-padding">
            {{ constantData[name] }}
          </div>
        </div>
      </span>
    </span>
    <span v-else>
      정의된 상수를 참조하지 않습니다.
    </span>
  </div>
</template>

<style scoped>
.l-entry-padding {
  border: solid 0.1rem var(--color-automator-docs-font);
  border-radius: var(--var-border-radius, 0.5rem);
  overflow-wrap: break-word;
  padding: 1rem 1.5rem;
}

.l-value-padding {
  padding-left: 1.5rem;
}

.l-button-margin {
  margin-right: 1rem;
}
</style>
