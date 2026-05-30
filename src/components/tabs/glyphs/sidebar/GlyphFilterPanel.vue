<script>
import AutoSacrificeAdvancedTab from "./AutoSacrificeAdvancedTab";
import AutoSacrificeEffectTab from "./AutoSacrificeEffectTab";
import GlyphComponent from "@/components/GlyphComponent";
import SliderComponent from "@/components/SliderComponent";

export default {
  name: "GlyphFilterPanel",
  components: {
    AutoSacrificeEffectTab,
    AutoSacrificeAdvancedTab,
    SliderComponent,
    GlyphComponent
  },
  data() {
    return {
      mode: AUTO_GLYPH_SCORE.LOWEST_SACRIFICE,
      effectCount: 0,
      lockedTypes: GlyphTypes.locked.map(e => e.id),
      advancedType: GLYPH_TYPES[0],
      alchemyUnlocked: false,
      // Note: there are two units at play: strength is from 1..3.5+; rarity is 0..100
      rarityThresholds: GLYPH_TYPES.mapToObject(e => e, () => 0),
      autoRealityForFilter: player.options.autoRealityForFilter,
    };
  },
  computed: {
    modes() {
      return AUTO_GLYPH_SCORE;
    },
    glyphTypes() {
      return GlyphTypes.list.filter(e => !this.lockedTypes.includes(e.id));
    },
    raritySliderProps() {
      return {
        min: 0,
        max: 100,
        width: "18rem",
        valueInDot: true,
        tooltip: "never",
        "dot-width": "2.2rem",
        "dot-height": "1.6rem",
        "dot-class": "c-glyph-sacrifice-options__rarity-slider-handle",
        "bg-class": "c-glyph-sacrifice-options__rarity-slider-bg",
        "process-class": "c-glyph-sacrifice-options__rarity-slider-process",
        style: {
          "margin-left": "1rem",
        }
      };
    },
    glyphIconProps() {
      return {
        size: "3rem",
        "glow-blur": "0.3rem",
        "glow-spread": "0.1rem",
        "text-proportion": 0.66
      };
    },
    questionmarkTooltip() {
      return `모든 글리프 선택에는 점수가 주어지고 선택한 모드를 기반으로 임계값과 비교됩니다.
        가장 높은 점수의 글리프가 선택되지만 임계값 이하이면 여전히 희생됩니다.
        (자세한 내용을 보려면 클릭)`;
    },
    autoRealityTooltip() {
      return `자동 현실이 켜져 있으면 다른 모든 설정을 무시하고 이후 글리프가 보관되지 않으면 즉시 현실로 이동`;
    },
    unlockedModes() {
      return Object.values(this.modes).filter(idx => this.isUnlocked(idx));
    }
  },
  methods: {
    update() {
      this.effectCount = player.reality.glyphs.filter.simple;
      this.mode = AutoGlyphProcessor.scoreMode;
      for (const type of generatedTypes) {
        this.rarityThresholds[type] = AutoGlyphProcessor.types[type].rarity;
      }
      this.lockedTypes = GlyphTypes.locked.map(e => e.id);
      this.alchemyUnlocked = Ra.unlocks.unlockGlyphAlchemy.canBeApplied;
    },
    optionClass(idx) {
      const icon = this.modeIcon(idx);
      return [
        "c-glyph-sacrifice-options__option",
        idx === this.mode
          ? "c-glyph-sacrifice-options__option--active"
          : "c-glyph-sacrifice-options__option--inactive",
        icon
      ];
    },
    modeIcon(idx) {
      switch (idx) {
        case this.modes.LOWEST_SACRIFICE:
          return "fas fa-burn";
        case this.modes.EFFECT_COUNT:
          return "fas fa-list-ul";
        case this.modes.RARITY_THRESHOLD:
          return "fas fa-gem";
        case this.modes.SPECIFIED_EFFECT:
          return "fas fa-tasks";
        case this.modes.EFFECT_SCORE:
          return "fas fa-list-ol";
        case this.modes.LOWEST_ALCHEMY:
          return "fas fa-atom";
        case this.modes.ALCHEMY_VALUE:
          return "fas fa-flask";
        default:
          throw Error("Unrecognized glyph filter mode");
      }
    },
    strengthThreshold(type) {
      return rarityToStrength(this.rarityThresholds[type]);
    },
    advancedTypeSelectStyle(type) {
      const color = GlyphAppearanceHandler.getBorderColor(type.id);
      return type.id === this.advancedType ? {
        color,
        "text-shadow": `0 0 0.25rem ${color}, 0 0 0.5rem ${color}, 0 0 0.75rem ${color}, 0 0 1rem ${color}`,
      } : {};
    },
    setMode(m) {
      AutoGlyphProcessor.scoreMode = m;
      player.reality.hasCheckedFilter = false;
    },
    setRarityThreshold(id, value) {
      AutoGlyphProcessor.types[id].rarity = value;
    },
    setEffectCount(event) {
      const inputValue = event.target.value;
      if (!isNaN(inputValue)) {
        this.effectCount = Math.clamp(inputValue, 0, 8);
        player.reality.glyphs.filter.simple = this.effectCount;
      }
    },
    filterMode(index) {
      return AutoGlyphProcessor.filterModeName(index);
    },
    isUnlocked(index) {
      switch (index) {
        case this.modes.LOWEST_SACRIFICE:
        case this.modes.EFFECT_COUNT:
        case this.modes.RARITY_THRESHOLD:
        case this.modes.SPECIFIED_EFFECT:
        case this.modes.EFFECT_SCORE:
          return true;
        case this.modes.LOWEST_ALCHEMY:
        case this.modes.ALCHEMY_VALUE:
          return this.alchemyUnlocked;
        default:
          throw Error("Unrecognized glyph filter mode");
      }
    },
    // Clicking bumps the rarity over to adjacent thresholds between rarities; normal clicks move to the higher one
    // and shift-clicks move to the lower one. There is a loop-around that makes 100 go to 0 next and vice versa
    bumpRarity(type) {
      const rarityThresholds = GlyphRarities.map(r => strengthToRarity(r.minStrength));
      let newRarity;
      if (ui.view.shiftDown) {
        const lower = rarityThresholds.filter(s => s < this.rarityThresholds[type]);
        newRarity = lower.length === 0 ? 100 : lower.max();
      } else {
        // Note: As the minimum of an empty array is zero, this wraps around to 0% again if clicked at 100% rarity
        newRarity = rarityThresholds.filter(s => s > this.rarityThresholds[type]).min();
      }
      this.setRarityThreshold(type, newRarity);
    },
    showFilterHowTo() {
      ui.view.h2pForcedTab = GameDatabase.h2p.tabs.filter(tab => tab.name === "Advanced Glyph Mechanics")[0];
      Modal.h2p.show();
    },
    getSymbol(type) {
      return CosmeticGlyphTypes[type].currentSymbol.symbol;
    },
    toggleAutoReality() {
      player.options.autoRealityForFilter = !player.options.autoRealityForFilter;
      this.autoRealityForFilter = player.options.autoRealityForFilter;
      player.reality.hasCheckedFilter = false;
    },
    exportFilterSettings() {
      const filter = player.reality.glyphs.filter;
      const serializeType = settings => [settings.rarity, settings.score, settings.effectCount,
        settings.specifiedMask, settings.effectScores.join("/")].join(",");
      const simpleData = [filter.select, filter.simple, filter.trash].join("|");
      const typeData = ALCHEMY_BASIC_GLYPH_TYPES.map(t => serializeType(filter.types[t])).join("|");
      copyToClipboard(GameSaveSerializer.encodeText(`${simpleData}|${typeData}`, "glyph filter"));
      GameUI.notify.info("Filter settings copied to clipboard");
    },
    importFilterSettings() {
      Modal.importFilter.show();
    },
  }
};
</script>

<template>
  <div class="l-glyph-sacrifice-options c-glyph-sacrifice-options l-glyph-sidebar-panel-size">
    <div class="c-glyph-sacrifice-options c-glyph-sacrifice-options-container">
      <div class="c-filter-extra-btns c-top-left">
        <i
          v-tooltip="'필터 설정 내보내기'"
          class="fas fa-file-export l-top-left-btn"
          @click="exportFilterSettings"
        />
        <i
          v-tooltip="'필터 설정 가져오기'"
          class="fas fa-file-import l-top-left-btn"
          @click="importFilterSettings"
        />
      </div>
      <div class="c-filter-extra-btns c-top-right">
        <i
          v-tooltip="autoRealityTooltip"
          class="fas fa-recycle l-top-right-btn"
          :class="{ 'o-quick-reality' : autoRealityForFilter }"
          @click="toggleAutoReality"
        />
        <i
          v-tooltip="questionmarkTooltip"
          class="fas fa-question-circle l-top-right-btn o-borderless"
          @click="showFilterHowTo"
        />
      </div>
      현재 필터 모드:
      <br>
      {{ filterMode(mode) }}
      <br>
      <div class="c-glyph-filter-mode-container">
        <div
          v-for="index in unlockedModes"
          :key="index"
          :class="optionClass(index)"
          @click="setMode(index)"
        >
          <div class="c-glyph-sacrifice-options__option__tooltip">
            {{ filterMode(index) }}
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="mode === modes.LOWEST_SACRIFICE"
      class="c-glyph-sacrifice-options__advanced"
    >
      <br>
      글리프 점수는 타입을 기반으로 할당됩니다. 총 글리프 희생 값이 가장 적은 타입에 속하는 글리프에 우선순위가 부여됩니다.
      <br>
      <br>
      이 모드는 글리프를 보관하지 않으며 선택한 글리프를 항상 희생합니다.
    </div>
    <div
      v-if="mode === modes.EFFECT_COUNT"
      class=" c-glyph-sacrifice-options__advanced"
    >
      <br>
      글리프는 적어도
      <input
        ref="effectCount"
        type="number"
        min="0"
        max="8"
        class="c-auto-sac-effect-tab__input"
        :value="effectCount"
        @blur="setEffectCount"
      >
      개의 효과가 있어야 선택됩니다. 희귀한 글리프가 동점에서 선호됩니다.
    </div>
    <div
      v-if="mode === modes.RARITY_THRESHOLD"
      class="l-glyph-sacrifice-options__rarity-sliders"
    >
      <span class="c-glyph-sacrifice-options__advanced">
        이 임계값보다 희귀도가 낮은 모든 글리프는 희생됩니다.
      </span>
      <div
        v-for="type in glyphTypes"
        :key="type.id"
        class="l-glyph-sacrifice-options__rarity-slider-div"
      >
        <span @click="bumpRarity(type.id)">
          <GlyphComponent
            :glyph="{type: type.id, strength: strengthThreshold(type.id) }"
            v-bind="glyphIconProps"
            class="o-clickable"
          />
        </span>
        <SliderComponent
          v-bind="raritySliderProps"
          :value="rarityThresholds[type.id]"
          :width="'100%'"
          @input="setRarityThreshold(type.id, $event)"
        />
      </div>
    </div>
    <div
      v-if="mode === modes.SPECIFIED_EFFECT"
      class="c-glyph-sacrifice-options__advanced"
    >
      <div>
        글리프 타입:
        <span
          v-for="type in glyphTypes"
          :key="type.id"
          v-tooltip="type.id.capitalize()"
          class="l-glyph-sacrifice-options__advanced-type-select c-glyph-sacrifice-options__advanced-type-select"
          :style="advancedTypeSelectStyle(type)"
          @click="advancedType=type.id"
        >
          {{ getSymbol(type.id) }}
        </span>
      </div>
      <br>
      <div class="l-glyph-sacrifice-options__rarity-slider-div">
        <span @click="bumpRarity(advancedType)">
          <GlyphComponent
            :glyph="{type: advancedType, strength: strengthThreshold(advancedType) }"
            v-bind="glyphIconProps"
            class="o-clickable"
          />
        </span>
        <SliderComponent
          v-bind="raritySliderProps"
          :value="rarityThresholds[advancedType]"
          :width="'100%'"
          @input="setRarityThreshold(advancedType, $event)"
        />
      </div>
      <template v-for="type in glyphTypes">
        <AutoSacrificeEffectTab
          v-show="type.id === advancedType"
          :key="type.id"
          :glyph-type="type.id"
        />
      </template>
    </div>
    <div
      v-if="mode === modes.EFFECT_SCORE"
      class="c-glyph-sacrifice-options__advanced"
    >
      <div>
        글리프 타입:
        <span
          v-for="type in glyphTypes"
          :key="type.id"
          v-tooltip="type.id.capitalize()"
          class="l-glyph-sacrifice-options__advanced-type-select c-glyph-sacrifice-options__advanced-type-select"
          :style="advancedTypeSelectStyle(type)"
          @click="advancedType=type.id"
        >
          {{ getSymbol(type.id) }}
        </span>
      </div>
      <br>
      <template v-for="type in glyphTypes">
        <AutoSacrificeAdvancedTab
          v-show="type.id === advancedType"
          :key="type.id"
          :glyph-type="type.id"
        />
      </template>
    </div>
    <div
      v-if="mode === modes.LOWEST_ALCHEMY"
      class="c-glyph-sacrifice-options__advanced"
    >
      <br>
      글리프 점수는 현재 연금술 자원 총합을 기반으로 할당됩니다. 가장 낮은 관련 연금술 자원 합계를 가진 글리프 타입에 우선순위가 부여됩니다.
      <br>
      <br>
      이 모드는 글리프를 보관하지 않습니다.
    </div>
    <div
      v-if="mode === modes.ALCHEMY_VALUE"
      class="c-glyph-sacrifice-options__advanced"
    >
      <br>
      글리프에는 <i>현재</i> 정제 값을 기반으로 타입별 자원 한도를 고려하여 값이 할당됩니다. 가장 많은 연금술 자원 가치가 있는 글리프에 우선순위가 부여됩니다. 한도에 도달하게 하는 글리프는 효율적으로 가치가 낮습니다.
      <br>
      <br>
      이 모드는 글리프를 보관하지 않습니다.
    </div>
  </div>
</template>

<style scoped>
.o-clickable {
  cursor: pointer;
}

.c-filter-extra-btns {
  position: absolute;
  display: flex;
  flex-direction: row;
  top: 0;
  z-index: 2;
  font-size: 1.3rem;
}

.c-top-left {
  right: calc(100% - 6rem);
  color: var(--color-reality-dark);
}

.c-top-right {
  left: calc(100% - 5rem);
}

.l-top-left-btn {
  cursor: pointer;
  border: var(--var-border-width, 0.2rem) solid;
  border-radius: var(--var-border-radius, 0.2rem);
  width: 2.5rem;
  margin: 0.5rem 0 0 0.5rem;
  padding: 0.5rem;
}

.l-top-right-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: var(--var-border-width, 0.2rem) solid;
  border-radius: var(--var-border-radius, 0.2rem);
  width: 2rem;
  height: 2rem;
  margin: 0.5rem 0.5rem 0 0;
  padding: 0.2rem;
}

.o-borderless {
  border: none;
}

.o-quick-reality {
  background: var(--color-good);
}
</style>
