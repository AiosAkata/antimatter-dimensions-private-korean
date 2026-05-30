<script>
import { createEntryInfo } from "./breakdown-entry-info";
import MultiplierBreakdownEntry from "./MultiplierBreakdownEntry";

const MULT_TAB_OPTIONS = [
  { id: 0, key: "AM", text: "반물질 생산" },
  { id: 1, key: "tickspeed", text: "틱 속도" },
  { id: 2, key: "AD", text: "반물질 차원" },
  { id: 3, key: "IP", text: "무한 포인트" },
  { id: 4, key: "ID", text: "무한 차원" },
  { id: 5, key: "infinities", text: "무한" },
  { id: 6, key: "replicanti", text: "복제체 속도" },
  { id: 7, key: "EP", text: "영원 포인트" },
  { id: 8, key: "TD", text: "시간 차원" },
  { id: 9, key: "eternities", text: "영원" },
  { id: 10, key: "DT", text: "확장된 시간" },
  { id: 11, key: "gamespeed", text: "게임 속도" },
];

export default {
  name: "MultiplierBreakdownTab",
  components: {
    MultiplierBreakdownEntry
  },
  data() {
    return {
      availableOptions: [],
      currentID: player.options.multiplierTab.currTab,
    };
  },
  computed: {
    currentKey() {
      return MULT_TAB_OPTIONS.find(opt => opt.id === this.currentID).key;
    },
    resource() {
      return createEntryInfo(`${this.currentKey}_total`);
    },
    resourceSymbols() {
      return GameDatabase.multiplierTabValues[this.currentKey].total.overlay;
    }
  },
  methods: {
    update() {
      this.availableOptions = MULT_TAB_OPTIONS.map(opt => ({
        ...opt,
        isActive: this.checkActiveKey(opt.key)
      })).filter(opt => opt.isActive);
    },
    checkActiveKey(key) {
      const act = GameDatabase.multiplierTabValues[key].total.isActive;
      return typeof act === "function" ? act() : act;
    },
    accessProp(prop) {
      return typeof prop === "function" ? prop() : prop;
    },
    subtabClassObject(option) {
      return {
        "c-multiplier-subtab-btn": true,
        "c-multiplier-subtab-btn--active": option.key === this.currentKey,
      };
    },
    clickSubtab(index) {
      this.currentID = this.availableOptions[index].id;
      player.options.multiplierTab.currTab = MULT_TAB_OPTIONS.find(opt => opt.key === this.currentKey).id;
    }
  }
};
</script>

<template>
  <div class="c-stats-tab">
    <div class="l-multiplier-subtab-btn-container">
      <button
        v-for="(option, index) in availableOptions"
        :key="option.key + option.isActive"
        :class="subtabClassObject(option)"
        @click="clickSubtab(index)"
      >
        {{ option.text }}
      </button>
    </div>
    <div class="c-list-container">
      <span
        v-for="symbol in resourceSymbols"
        :key="symbol"
      >
        <span
          class="c-symbol-overlay"
          v-html="symbol"
        />
      </span>
      <MultiplierBreakdownEntry
        :key="resource.key"
        :resource="resource"
        :is-root="true"
      />
      <div class="c-multiplier-tab-text-line">
        참고: 항목은 서로 다른 값을 가질 수 있는 여러 원본을 포함하는 경우에만 확장 가능합니다.
        예를 들어, 모든 종류의 차원에 동등하게 영향을 미치는 효과는 8개의 동일한 숫자 목록으로 확장되지 않습니다.
        <br>
        <b>
          일부 항목은 완전히 확장되면 렉을 유발할 수 있습니다. 광감성 관련 부작용을 줄이기 위해 크기 조정이 즉시가 아닌 200ms에 걸쳐 발생합니다. 이는 명성 이벤트 이후에 약간의 시각적 이상을 야기할 수 있습니다.
        </b>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-list-container {
  position: relative;
  width: 100rem;
}

.l-multiplier-subtab-btn-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100rem;
  height: calc(4rem - var(--var-border-radius, 0.2rem));
}

.c-multiplier-subtab-btn {
  width: 100%;
  height: 4rem;
  margin: 0 0.5rem -0.1rem;
  z-index: 1;
  text-align: center;
  font-family: Typewriter;
  font-size: 1rem;
  font-weight: bold;
  color: var(--color-text);
  background-color: var(--color-base);
  border: var(--var-border-width, 0.2rem) solid;
  border-radius: var(--var-border-radius, 0.5rem) var(--var-border-radius, 0.5rem) 0 0;
  cursor: pointer;
}

.c-multiplier-subtab-btn--active {
  border-bottom: none;
  padding-bottom: 0.2rem;
  cursor: default;
}

.c-multiplier-tab-text-line {
  color: var(--color-text);
  font-size: 1.3rem;
}

.c-symbol-overlay {
  display: flex;
  width: 100%;
  height: 100%;
  top: -5%;
  position: absolute;
  justify-content: center;
  align-items: center;
  font-size: 40rem;
  color: var(--color-text);
  text-shadow: 0 0 3rem;
  pointer-events: none;
  user-select: none;
  opacity: 0.2;
  z-index: 1;
}
</style>
