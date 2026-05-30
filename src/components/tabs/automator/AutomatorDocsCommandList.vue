<script>
import AutomatorDocsManPage from "./AutomatorDocsManPage";

export default {
  name: "AutomatorDocsCommandList",
  components: {
    AutomatorDocsManPage
  },
  data() {
    return {
      selectedCommand: -1,
    };
  },
  computed: {
    categoryNames: () => GameDatabase.reality.automator.categoryNames,
    commands: () => GameDatabase.reality.automator.commands,
  },
  methods: {
    commandsInCategory(category) {
      return this.commands.filter(c => c.category === category && c.isUnlocked());
    }
  }
};
</script>

<template>
  <div>
    <div v-if="selectedCommand !== -1">
      <button
        class="c-automator-docs--button l-return-button fas fa-arrow-left"
        @click="selectedCommand = -1"
      />
      명령 목록으로 돌아가기
    </div>
    <AutomatorDocsManPage
      v-if="selectedCommand !== -1"
      :command="commands[selectedCommand]"
    />
    <div
      v-else
      class="c-automator-docs-page"
    >
      밑줄 친 명령을 클릭하면 구문, 사용법 및 기능에 대한 자세한 정보를 볼 수 있습니다.
      <br>
      <br>
      <span>명령 목록:</span>
      <br>
      <div
        v-for="(category, i) in categoryNames"
        :key="i"
      >
        {{ category }} ({{ commandsInCategory(i).length }}개 명령)
        <div
          v-for="command in commandsInCategory(i)"
          :key="command.id"
          class="c-automator-docs-page__link l-command-group"
          @click="selectedCommand = command.id"
        >
          <span v-if="command.isUnlocked()">
            {{ command.keyword }}
          </span>
        </div>
      </div>
      <br>
      <span>
        참고: 각 명령의 구문 설명에서 <u>밑줄 친</u> 입력은 <i>필수</i> 입력이고 [대괄호] 안의 입력은 선택사항입니다 (사용할 경우 대괄호 <i>없이</i> 입력해야 합니다).
        다른 부분은 표시된 그대로 입력해야 합니다. 특별히 명시하지 않은 한 모든 입력은 대소문자를 구분하지 않습니다. 일부 명령은 두 개 이상의 유효한 형식을 가질 수 있으며 별도의 줄에 표시됩니다.
      </span>
    </div>
  </div>
</template>

<style scoped>
.l-command-group {
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
}

.l-return-button {
  width: 4rem;
  height: 2.6rem;
  font-size: 1.8rem;
  margin-left: 2rem;
}
</style>
