<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "ImportTimeStudyConstants",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      constantNames: [],
      willImport: [],
    };
  },
  computed: {
    presets: () => player.timestudy.presets.filter(p => p.studies !== ""),
    names() {
      // Study presets can contain non-alphanumeric characters, which aren't allowed in constants,
      // so we replace all of those with underscores. This alone can however result in duplicate names due
      // to multiple different characters being mapped to underscores, so we also include the preset index
      return this.presets.map((p, index) => `TSPreset${index + 1}__${p.name.replaceAll(/[^a-zA-Z_0-9]/gu, "_")}`);
    }
  },
  methods: {
    update() {
      this.constantNames = [...player.reality.automator.constantSortOrder];
      this.updateImportStatus();
    },
    importConstants() {
      for (let index = 0; index < this.presets.length; index++) {
        AutomatorBackend.modifyConstant(this.names[index], this.presets[index].studies);
      }
    },
    hasConflict(constantName) {
      return this.constantNames.includes(constantName);
    },
    updateImportStatus() {
      let availableSlots = AutomatorData.MAX_ALLOWED_CONSTANT_COUNT - this.constantNames.length;
      this.willImport = [];
      for (let index = 0; index < this.names.length; index++) {
        if (this.hasConflict(this.names[index])) {
          this.willImport.push(true);
        } else if (availableSlots > 0) {
          this.willImport.push(true);
          availableSlots--;
        } else this.willImport.push(false);
      }
    },
    missedImports() {
      return this.willImport.countWhere(x => !x);
    },
    // Shorten the string to less than 55 characters for UI purposes - but we shorten the middle since the
    // beginning and end are both potentially useful to see
    shortenString(str) {
      if (str.length < 55) return str;
      return `${str.substring(0, 12)}...${str.substring(str.length - 40, str.length)}`;
    }
  }
};
</script>

<template>
  <ModalWrapperChoice
    @confirm="importConstants"
  >
    <template #header>
      시간 연구 프리셋을 상수로 가져오기
    </template>
    <div class="c-modal-message__text">
      이 모달을 확인하면 저장된 모든 시간 연구 프리셋을 새로운 자동화기 상수로 가져올 것입니다.
      아래는 가져올 모든 유효한 프리셋이며, 포함된 연구의 시작과 끝이 표시됩니다. 상수 이름 형식의 제한으로 인해
      일부 이름이 변경될 수 있습니다.
      <br>
      <br>
      <div
        v-for="i in presets.length"
        :key="i"
        :class="{ 'l-not-imported' : !willImport[i-1] }"
      >
        이름: {{ presets[i-1].name }} ➜ <b>{{ names[i-1] }}</b>
        <br>
        {{ shortenString(presets[i-1].studies) }}
        <span
          v-if="hasConflict(names[i-1])"
          class="l-warn-text"
        >
          <br>
          기존 상수를 덮어쓸 것입니다!
        </span>
        <br>
        <br>
      </div>
      <div
        v-if="missedImports() > 0"
        class="l-warn-text"
      >
        {{ quantify("프리셋", missedImports()) }}은(는) 상수 수 제한으로 인해
        이 목록에서 가져올 수 없습니다.
      </div>
    </div>
    <template #confirm-text>
      모두 가져오기
    </template>
  </ModalWrapperChoice>
</template>

<style scoped>
.l-warn-text {
  font-weight: bold;
  color: var(--color-bad);
}

.l-not-imported {
  color: var(--color-disabled);
}
</style>
