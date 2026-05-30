<script>
import SelectedEffectToggle from "./SelectedEffectToggle";

export default {
  name: "AutoSacrificeEffectTab",
  components: {
    SelectedEffectToggle
  },
  props: {
    glyphType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      effectCount: 0,
    };
  },
  computed: {
    typeConfig() {
      return GlyphTypes[this.glyphType];
    },
    autoSacrificeSettings() {
      return AutoGlyphProcessor.types[this.glyphType];
    },
    effects() {
      return this.typeConfig.effects;
    },
    descStyle() {
      return {
        "color": GlyphAppearanceHandler.getBorderColor(this.glyphType),
        "border-color": this.typeConfig.color
      };
    },
    questionmarkTooltip() {
      return `글리프 점수는 희귀도에서 누락된 각 효과에 대해 ${formatInt(200)}을(를) 뺀 값입니다.
        지정된 희귀도보다 적은 글리프는 희생됩니다. 지정된 것 이외의 추가 효과는
        글리프 점수를 증가시키지 않습니다.`;
    }
  },
  methods: {
    update() {
      this.effectCount = this.autoSacrificeSettings.effectCount;
    },
    setEffectCount(event) {
      const inputValue = event.target.value;
      if (!isNaN(inputValue)) {
        this.autoSacrificeSettings.effectCount = Math.clamp(inputValue, 0, 8);
      }
    }
  }
};
</script>

<template>
  <div class="c-glyph-sacrifice-options__advanced">
    <div>
      <span
        v-tooltip="questionmarkTooltip"
        class="o-questionmark"
      >
        ?
      </span>
      선택된 글리프는 적어도
      <input
        ref="effectCount"
        type="number"
        min="0"
        max="8"
        class="c-auto-sac-effect-tab__input"
        :value="effectCount"
        @blur="setEffectCount"
      >
      개의 효과가 있어야 하며, 다음 효과의 <i>모두</i>를 포함해야 합니다:
    </div>
    <div
      v-for="effect in effects"
      :key="effect.id"
      class="l-auto-sac-type-tab__row-wrapper"
    >
      <SelectedEffectToggle
        class="c-auto-sac-type-tab__effect-desc l-specified-effect-tab__effect-desc"
        :effect="effect"
        :glyph-type="glyphType"
        :style="descStyle"
      />
    </div>
    개별 효과를 켜고 끄려면 클릭
  </div>
</template>

<style scoped>

</style>
