<script>
import AutomatorDataTransferSingleEntry from "./AutomatorDataTransferSingleEntry";

export default {
  name: "AutomatorDataTransferPage",
  components: {
    AutomatorDataTransferSingleEntry,
  },
  data() {
    return {
      scripts: 0,
    };
  },
  computed: {
    maxScriptCount: () => AutomatorData.MAX_ALLOWED_SCRIPT_COUNT,
  },
  created() {
    this.loadScripts();
    this.on$(GAME_EVENT.AUTOMATOR_SAVE_CHANGED, () => {
      this.loadScripts();
    });
  },
  methods: {
    loadScripts() {
      this.scripts = Object.values(player.reality.automator.scripts).map(script => ({
        id: script.id,
        name: script.name,
      }));
    },
  }
};
</script>

<template>
  <div class="l-panel-padding">
    이 페이지에서는 추가 데이터가 첨부된 스크립트를 가져오고 내보낼 수 있습니다. 인코딩된 텍스트에는 스크립트 내에서 사용되는 모든 시간 연구 프리셋 또는 상수의 데이터도 포함됩니다. 이를 통해 다양한 저장 파일 간에 작동하는 스크립트를 더 쉽게 전송할 수 있지만 연구 프리셋 및 상수의 제한된 공간으로 인해 프로세스 중에 기존 데이터를 덮어써야 할 수 있습니다. 이 페이지에서 내보낸 데이터는 단일 스크립트 데이터를 가져오는 것과 동일한 방식으로 가져옵니다.
    <br>
    <br>
    참고: 주석 내의 상수 이름 또는 전체 연구 구매 명령의 모든 언급도 스크립트 내에서 "사용됨"으로 계산됩니다. 이는 의도적입니다. 주석은 스크립트가 프리셋 또는 상수로 수행하려는 작업을 나타내는 것으로 가정하기 때문입니다.
    <br>
    <br>
    <div
      v-for="(script, id) in scripts"
      :key="id"
    >
      <AutomatorDataTransferSingleEntry
        class="l-entry-margin"
        :script="script"
      />
    </div>
  </div>
</template>

<style scoped>
.l-panel-padding {
  padding: 0.5rem 2rem 1rem 0;
}

.l-entry-margin {
  margin-bottom: 1rem;
}

.c-import-button {
  margin: 1rem 1rem -1rem;
  border-radius: var(--var-border-radius, 0.4rem);
  border-width: var(--var-border-width, 0.2rem);
  cursor: pointer;
}
</style>
