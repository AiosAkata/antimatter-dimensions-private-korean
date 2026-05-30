<script>
export default {
  name: "AutomatorErrorPage",
  data() {
    return {
      errors: [],
    };
  },
  methods: {
    update() {
      this.errors = AutomatorData.currentErrors();
    },
    scrollToLine(line) {
      AutomatorScroller.scrollToLine(line);
      AutomatorHighlighter.updateHighlightedLine(line, LineEnum.Error);
    }
  }
};
</script>

<template>
  <div class="c-automator-docs-page">
    <div v-if="errors.length === 0">
      스크립트 오류를 찾을 수 없습니다!
    </div>
    <div v-else>
      <b>스크립트에 다음 {{ quantify("error", errors.length) }}이(가) 있습니다:</b>
      <br>
      <span
        v-for="(error, i) in errors"
        :key="i"
      >
        <b>{{ error.startLine }}번 줄:</b>
        <button
          v-tooltip="'줄로 이동'"
          class="c-automator-docs--button fas fa-arrow-circle-right"
          @click="scrollToLine(error.startLine)"
        />
        <div class="c-automator-docs-page__indented">
          {{ error.info }}
        </div>
        <div class="c-automator-docs-page__indented">
          <i>제안된 해결책: {{ error.tip }}</i>
        </div>
      </span>
      <i>
        참고: 경우에 따라 오류가 오토메이터가 스크립트의 나머지 부분을 제대로 스캔하지 못하게 할 수 있습니다.
        이로 인해 이전 줄의 다른 오류로 인해 일부 오류가 "사라질" 수 있거나
        내부 블록(예: IF 또는 WHILE 명령)이 있는 명령의 오류가 올바르게 형식이 지정된 이후 명령에 오류가 나타날 수 있습니다.
        또한 오류의 원인이 명확하지 않아서 제안된 수정 사항 중 일부가 잠재적으로 오도할 수 있습니다.
      </i>
    </div>
  </div>
</template>

<style scoped>

</style>
