<script>
export default {
  name: "AutomatorDocsTemplateList",
  data() {
    return {
      isBlock: false,
      blockTemplates: [],
      selectedTemplateID: -1,
    };
  },
  computed: {
    templates: () => GameDatabase.reality.automator.templates.scripts,
    pasteText() {
      return this.isBlock
        ? `오토메이터로 드래그할 수 있는 특수 블록을 생성합니다. 배치하고 싶은 위치에 끌어다 놓으면 템플릿에 필요한 모든 개별 블록이 자동으로 채워집니다.`
        : `템플릿을 텍스트로 클립보드에 복사합니다. 원하는 위치에 템플릿 텍스트를 오토메이터에 직접 붙여넣을 수 있습니다.`;
    }
  },
  methods: {
    update() {
      this.isBlock = player.reality.automator.type === AUTOMATOR_TYPE.BLOCK;
      this.blockTemplates = AutomatorData.blockTemplates;
    },
    showModal(template) {
      Modal.automatorScriptTemplate.show(template);
    },
    unpackTemplateBlocks(event) {
      const templateBlocks = this.blockTemplates[this.selectedTemplateID].blocks;
      const beforeBlocks = BlockAutomator.lines.slice(0, event.newIndex);
      // Note that slice will also pick up the Vue observer, so we need to remove that as well
      const afterBlocks = BlockAutomator.lines.slice(event.newIndex).filter(b => b.cmd);

      // Remap IDs, in case the template gets added more than once
      const maxExistingID = Math.max(...BlockAutomator._idArray.filter(id => id));
      const minTemplateID = Math.min(...templateBlocks.map(b => b.id));
      const blocksToAdd = [];
      for (const block of templateBlocks) {
        blocksToAdd.push({
          ...block,
          id: block.id + maxExistingID - minTemplateID + 1
        });
      }
      BlockAutomator.lines = beforeBlocks;
      BlockAutomator.lines.push(...blocksToAdd);
      BlockAutomator.lines.push(...afterBlocks);
      BlockAutomator.updateIdArray();
    },
    setIndex(index) {
      this.selectedTemplateID = index;
    }
  }
};
</script>

<template>
  <div>
    이 템플릿을 사용하면 오토메이터 내에서 더 일반적인 작업을 수행할 수 있습니다. 수동으로 작성한 스크립트보다 약간 느릴 수 있지만 사용하기 위해 이전 프로그래밍 경험이 필요하지 않습니다. 이 버튼 중 하나를 클릭하면 입력 필드가 있는 프롬프트가 열려서 오토메이터에 배치할 템플릿이 생성됩니다.
    <button
      v-for="template in templates"
      :key="template.name"
      class="o-primary-btn c-automator-docs-template--button l-automator__button"
      @click="showModal(template)"
    >
      템플릿: {{ template.name }}
    </button>
    현재 {{ isBlock ? "블록" : "텍스트" }} 편집기를 사용 중이므로 이 패널은 {{ pasteText }}.
    <br>
    <br>
    <draggable
      v-if="isBlock"
      :key="blockTemplates.length"
      class="template-container"
      :list="blockTemplates"
      :group="{ name: 'code-blocks', pull: 'clone', put: false }"
      :sort="false"
      @end="unpackTemplateBlocks"
    >
      <div
        v-for="(template, i) in blockTemplates"
        :key="i"
        class="o-automator-command o-automator-block-list draggable-blocks"
        @dragstart="setIndex(i)"
      >
        {{ template.name }}
      </div>
    </draggable>
  </div>
</template>

<style scoped>
.c-automator-docs-template--button {
  margin: 0.4rem;
  border-radius: var(--var-border-radius, 0.4rem);
  border-width: var(--var-border-width, 0.2rem);
  cursor: pointer;
}

.template-container {
  display: flex;
  flex-direction: column;
}
</style>
