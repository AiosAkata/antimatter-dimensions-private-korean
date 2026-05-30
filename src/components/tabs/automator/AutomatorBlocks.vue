<script>
import draggable from "vuedraggable";

export default {
  name: "AutomatorBlocks",
  components: {
    draggable
  },
  data() {
    return {
      allBlocks: automatorBlocks.filter(b => !AUTOMATOR_BLOCKS_BLACKLIST.includes(b.cmd)),
      blocks: []
    };
  },
  methods: {
    update() {
      this.blocks = this.allBlocks.filter(b => (b.isUnlocked?.() ?? true));
    },
    clone(block) {
      const b = {
        ...block,
        id: UIID.next()
      };

      if (block.nested && !block.nest) b.nest = [];
      AutomatorData.recalculateErrors();
      return b;
    },
  }
};

const AUTOMATOR_BLOCKS_COMPARISON_OPERATORS = ["<", ">", ">=", "<="];
const AUTOMATOR_BLOCKS_COMPARISON_CURRENCIES = [
  "AM", "IP", "EP", "RM", "INFINITIES", "BANKED INFINITIES", "ETERNITIES", "REALITIES",
  "PENDING IP", "PENDING EP", "PENDING TP", "PENDING RM", "PENDING GLYPH LEVEL",
  "DT", "TP", "RG", "REP", "TT", "TOTAL TT", "SPENT TT", "TOTAL COMPLETIONS", "PENDING COMPLETIONS",
  "EC1 COMPLETIONS", "EC2 COMPLETIONS", "EC3 COMPLETIONS", "EC4 COMPLETIONS",
  "EC5 COMPLETIONS", "EC6 COMPLETIONS", "EC7 COMPLETIONS", "EC8 COMPLETIONS",
  "EC9 COMPLETIONS", "EC10 COMPLETIONS", "EC11 COMPLETIONS", "EC12 COMPLETIONS",
];

const AUTOMATOR_BLOCKS_RESETS = ["INFINITY", "ETERNITY", "REALITY"];

/**
 *  @property {String} cmd          Name of automator command
 *  @property {String} alias        Displayed name of automator command, acting as a more natural-sounding variant. Uses
 *    cmd if undefined.
 *  @property {Array: String} allowedPatterns   Allowed patterns for input types, specified single-capital-letter props
 *  @property {Array: String} [A-Z]             Classes of allowed inputs, to be used in allowedPatterns. Note that
 *    elements which begin with an asterisk are replaced with text inputs upon selection, and single-entry classes will
 *    be automatically replaced with a text input or unmodifiable text as appropriate
 *  @property {Array: String} targets           List of keys to be used for assigning inputs to props of automator
 *    commands. Each entry is associated with the index of the character in allowedPatterns
 *  @property {Boolean} nested      Whether or not the command is the header of a loop in the automator
 *  @property {Boolean} canWait     Whether or not the command can be run in a non-blocking way
 *  @property {Boolean} canRespec   Whether or not the command has an associated respec option
 *  @property {Function @return Boolean} isUnlocked    Function returning the unlock state of the command; if false,
 *    the command will not appear. Assumed to be true if prop is not present
 */
export const automatorBlocks = [
  {
    cmd: "STUDIES RESPEC",
    alias: "RESPEC TIME STUDIES"
  }, {
    cmd: "STUDIES LOAD",
    alias: "LOAD STUDY PRESET",
    allowedPatterns: ["AB"],
    A: ["ID", "NAME"],
    B: ["*"],
    targets: ["singleSelectionInput", "singleTextInput"],
    canWait: true
  }, {
    cmd: "STUDIES PURCHASE",
    alias: "PURCHASE STUDIES",
    allowedPatterns: ["A"],
    A: ["*"],
    targets: ["singleTextInput"],
    canWait: true
  }, {
    cmd: "INFINITY",
    canWait: true
  }, {
    cmd: "ETERNITY",
    canRespec: true,
    canWait: true
  }, {
    cmd: "REALITY",
    canRespec: true,
    canWait: true,
    isUnlocked: () => RealityUpgrade(25).isBought
  }, {
    cmd: "UNLOCK",
    allowedPatterns: ["AB", "C"],
    A: ["EC"],
    B: ["*"],
    C: ["DILATION"],
    targets: ["singleSelectionInput", "singleTextInput"],
    canWait: true
  }, {
    cmd: "START",
    allowedPatterns: ["AB", "C"],
    A: ["EC"],
    B: ["*"],
    C: ["DILATION"],
    targets: ["singleSelectionInput", "singleTextInput"],
  }, {
    cmd: "AUTO",
    alias: "CHANGE AUTOBUYER SETTING",
    allowedPatterns: ["AB"],
    A: AUTOMATOR_BLOCKS_RESETS,
    B: ["ON", "OFF", "* AUTOBUYER SETTING"],
    targets: ["singleSelectionInput", "singleTextInput"],
  }, {
    cmd: "BLACK HOLE",
    alias: "TURN BLACK HOLE",
    allowedPatterns: ["A"],
    A: ["ON", "OFF"],
    targets: ["singleSelectionInput"],
    isUnlocked: () => BlackHole(1).isUnlocked
  }, {
    cmd: "STORE GAME TIME",
    alias: "SET GAME TIME STORAGE TO",
    allowedPatterns: ["A"],
    A: ["ON", "OFF", "USE"],
    targets: ["singleSelectionInput"],
    isUnlocked: () => Enslaved.isUnlocked
  }, {
    cmd: "NOTIFY",
    alias: "GAME NOTIFICATION:",
    allowedPatterns: ["A"],
    A: ["*"],
    targets: ["singleTextInput"],
  }, {
    cmd: "COMMENT",
    alias: "NOTE:",
    allowedPatterns: ["A"],
    A: ["*"],
    targets: ["singleTextInput"],
  }, {
    cmd: "WAIT",
    alias: "PAUSE AUTOMATOR UNTIL",
    allowedPatterns: ["A", "DE", "BCB"],
    A: AUTOMATOR_BLOCKS_RESETS,
    B: [...AUTOMATOR_BLOCKS_COMPARISON_CURRENCIES, "* SPECIFIED CONSTANT"],
    C: AUTOMATOR_BLOCKS_COMPARISON_OPERATORS,
    D: ["BLACK HOLE"],
    E: ["OFF", "BH1", "BH2"],
    targets: ["genericInput1", "compOperator", "genericInput2"]
  }, {
    cmd: "PAUSE",
    alias: "PAUSE AUTOMATOR FOR",
    allowedPatterns: ["A"],
    A: ["*"],
    targets: ["singleTextInput"],
  }, {
    cmd: "IF",
    alias: "ENTER BLOCK IF",
    allowedPatterns: ["ABA"],
    A: [...AUTOMATOR_BLOCKS_COMPARISON_CURRENCIES, "* SPECIFIED CONSTANT"],
    B: AUTOMATOR_BLOCKS_COMPARISON_OPERATORS,
    targets: ["genericInput1", "compOperator", "genericInput2"],
    nested: true
  }, {
    cmd: "UNTIL",
    alias: "REPEAT BLOCK UNTIL",
    allowedPatterns: ["A", "BCB"],
    A: AUTOMATOR_BLOCKS_RESETS,
    B: [...AUTOMATOR_BLOCKS_COMPARISON_CURRENCIES, "* SPECIFIED CONSTANT"],
    C: AUTOMATOR_BLOCKS_COMPARISON_OPERATORS,
    targets: ["genericInput1", "compOperator", "genericInput2"],
    nested: true
  }, {
    cmd: "WHILE",
    alias: "REPEAT BLOCK WHILE",
    allowedPatterns: ["ABA"],
    A: [...AUTOMATOR_BLOCKS_COMPARISON_CURRENCIES, "* SPECIFIED CONSTANT"],
    B: AUTOMATOR_BLOCKS_COMPARISON_OPERATORS,
    targets: ["genericInput1", "compOperator", "genericInput2"],
    nested: true
  }, {
    cmd: "BLOB"
  }, {
    cmd: "STOP",
    alias: "STOP EXECUTION"
  }
];
const AUTOMATOR_BLOCKS_BLACKLIST = ["BLOB"];

export const automatorBlocksMap = automatorBlocks.mapToObject(b => b.cmd, b => b);
</script>

<template>
  <draggable
    class="o-drag-cancel-region"
    group="code-blocks"
    ghost-class="null-block"
    draggable=".draggable-blocks"
  >
    <p>
      이 블록들을 왼쪽 영역으로 드래그 앤 드롭하세요! 블록들은 참조 페이지의 명령과 일치하는 이름을 가지고 있지만 배치 후에 더 자연스러운 방식으로 설명하기 위해 모양이 바뀔 수 있습니다.
      블록이 이런 방식으로 변경되면 대체 텍스트가 드래그할 때 도구 설명으로 표시됩니다.
    </p>
    <br>
    <p>
      <span class="c-automator-input-optional">갈색</span> 입력은 선택사항이고 <span class="c-automator-input-required">청록색</span> 입력은 필수입니다.
      <span class="c-automator-block-row-error">빨간색</span> 입력은 오류를 발생시키며 스크립트를 실행하기 전에 변경되어야 합니다. 자세한 내용은 스크립팅 정보 패널을 확인하세요.
    </p>
    <p>
      * 로 시작하는 드롭다운 메뉴의 옵션은 텍스트 상자로 대체됩니다. 텍스트 상자 오른쪽의 <i class="fa-solid fa-circle-xmark" /> 를 클릭하여 다시 드롭다운으로 변경할 수 있습니다.
    </p>
    <draggable
      class="block-container"
      :list="blocks"
      :group="{ name: 'code-blocks', pull: 'clone', put: false }"
      :sort="false"
      :clone="clone"
    >
      <div
        v-for="block in blocks"
        :key="block.id"
        v-tooltip="block.alias"
        class="o-automator-command o-automator-block-list draggable-blocks"
      >
        {{ block.cmd }}
      </div>
    </draggable>
    <p>
      참고: 블록과 그 내용은 명령이 텍스트 모드에 입력된 것처럼 문자 제한에 포함됩니다.
    </p>
  </draggable>
</template>

<style scoped>
.block-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 1rem 0;
}

.o-automator-block-list {
  display: flex;
  width: 8.7rem;
  text-align: center;
  height: 5.5rem;
  font-size: 1.2rem;
  justify-content: center;
  align-items: center;
}

.o-drag-cancel-region {
  width: 100%;
  height: 100%;
}

.null-block {
  display: none;
  visibility: hidden;
}
</style>
