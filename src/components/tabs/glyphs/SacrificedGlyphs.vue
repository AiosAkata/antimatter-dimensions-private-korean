<script>
import { DC } from "@/core/constants";

import TypeSacrifice from "./TypeSacrifice";

export default {
  name: "SacrificedGlyphs",
  components: {
    TypeSacrifice
  },
  data() {
    return {
      anySacrifices: false,
      hasDragover: false,
      hasAlteration: false,
      hideAlteration: false,
      maxSacrifice: 0,
      teresaMult: 0,
      lastMachinesTeresa: new Decimal(0),
    };
  },
  computed: {
    types: () => GLYPH_TYPES.filter(type => type !== "cursed" && type !== "companion"),
    lastMachines() {
      return this.lastMachinesTeresa.lt(DC.E10000)
        ? `${quantify("현실 기계", this.lastMachinesTeresa, 2)}`
        : `${quantify("허수 기계", this.lastMachinesTeresa.dividedBy(DC.E10000), 2)}`;
    },
    dropDownIconClass() {
      return this.hideAlteration ? "far fa-plus-square" : "far fa-minus-square";
    },
    isDoomed() {
      return Pelle.isDoomed;
    },
    addThreshold() {
      return GlyphAlteration.additionThreshold;
    },
    empowerThreshold() {
      return GlyphAlteration.empowermentThreshold;
    },
    boostThreshold() {
      return GlyphAlteration.boostingThreshold;
    },
    cosmeticTypes: () => CosmeticGlyphTypes,
    addStyle() {
      return { color: GlyphAlteration.baseAdditionColor() };
    },
    empowerStyle() {
      return { color: GlyphAlteration.baseEmpowermentColor() };
    },
    boostStyle() {
      return { color: GlyphAlteration.baseBoostColor() };
    },
    hasSeenRealityGlyph() {
      return player.reality.glyphs.createdRealityGlyph;
    }
  },
  created() {
    this.on$(GAME_EVENT.GLYPH_VISUAL_CHANGE, () => {
      this.$recompute("cosmeticTypes");
    });
  },
  methods: {
    update() {
      this.anySacrifices = GameCache.logTotalGlyphSacrifice !== 0;
      this.hasAlteration = Ra.unlocks.alteredGlyphs.canBeApplied;
      this.hideAlteration = player.options.hideAlterationEffects;
      this.maxSacrifice = GlyphSacrificeHandler.maxSacrificeForEffects;
      this.teresaMult = Teresa.runRewardMultiplier;
      this.lastMachinesTeresa.copyFrom(player.celestials.teresa.lastRepeatedMachines);
    },
    dragover(event) {
      if (Pelle.isDoomed) return;
      if (!event.dataTransfer.types.includes(GLYPH_MIME_TYPE)) return;
      event.preventDefault();
      this.hasDragover = true;
    },
    dragleave(event) {
      if (
        this.isDoomed ||
        !event.relatedTarget ||
        !event.relatedTarget.classList ||
        event.relatedTarget.classList.contains("c-current-glyph-effects") ||
        event.relatedTarget.classList.contains("c-sacrificed-glyphs__header") ||
        event.relatedTarget.classList.contains("l-sacrificed-glyphs__type") ||
        event.relatedTarget.classList.contains("l-sacrificed-glyphs__type-symbol") ||
        event.relatedTarget.classList.contains("l-sacrificed-glyphs__type-amount") ||
        event.relatedTarget.classList.contains("c-sacrificed-glyphs__type-new-amount") ||
        event.relatedTarget.classList.length === 0) return;
      this.hasDragover = false;
    },
    drop(event) {
      if (this.isDoomed || !event.dataTransfer.types.includes(GLYPH_MIME_TYPE)) return;
      const id = parseInt(event.dataTransfer.getData(GLYPH_MIME_TYPE), 10);
      if (isNaN(id)) return;
      const glyph = Glyphs.findById(id);
      if (!glyph) return;
      GlyphSacrificeHandler.sacrificeGlyph(glyph, true);
      this.hasDragover = false;
    },
    toggleAlteration() {
      player.options.hideAlterationEffects = !player.options.hideAlterationEffects;
    },
    glyphSymbol(type) {
      return this.cosmeticTypes[type].currentSymbol.symbol;
    }
  }
};
</script>

<template>
  <div
    class="c-current-glyph-effects l-current-glyph-effects"
    :class="{'c-sacrificed-glyphs--dragover': hasDragover}"
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="drop"
  >
    <div class="l-sacrificed-glyphs__help">
      <span
        v-if="isDoomed"
        class="pelle-current-glyph-effects"
      >
        운명에 빠져있을 때는 글리프를 희생할 수 없습니다.
      </span>
      <span v-else>
        <div>글리프를 여기로 드래그하거나 Shift+클릭하여 희생합니다.</div>
        <div>확인은 옵션에서 비활성화하거나 Ctrl을 누르고 있으면 됩니다.</div>
      </span>
    </div>
    <div v-if="hasAlteration">
      <span
        class="c-altered-glyphs-toggle-button"
        @click="toggleAlteration"
      >
        <i :class="dropDownIconClass" />
        <b> 변형된 글리프</b>
      </span>
      <br>
      <div v-if="hideAlteration">
        (세부정보 숨겨짐, 클릭하여 표시)
      </div>
      <div v-else>
        글리프 타입의 총 희생 값이 다음 이상일 때<br>
        글리프 타입의 효과 중 하나가 개선됩니다:
        <br><br>
        <b>
          <span :style="addStyle">{{ format(addThreshold) }} - 추가 부작용</span>
          <br>
          <span :style="empowerStyle">{{ format(empowerThreshold) }} - 공식 급격히 개선</span>
          <br>
          <span :style="boostStyle">{{ format(boostThreshold) }} - 글리프 희생에 따른 부스트</span>
        </b>
        <br><br>
        글리프 희생의 모든 효과는 {{ format(maxSacrifice) }}에 도달하면 더 이상 증가할 수 없습니다.
      </div>
    </div>
    <br>
    <div class="c-sacrificed-glyphs__header">
      글리프 희생 부스트:
    </div>
    <div v-if="anySacrifices && !isDoomed">
      <div v-if="teresaMult > 1">
        글리프 희생 값에 {{ formatX(teresaMult, 2, 2) }}의 배율이 적용됩니다;
        테레사는 마지막으로 {{ lastMachines }}에서 완료되었습니다.
        <span v-if="hasSeenRealityGlyph">
          현실 글리프는 이 배율의 영향을 받지 않으며 변형된 효과가 없습니다.
        </span>
      </div>
      <template v-for="type in types">
        <TypeSacrifice
          :key="type + glyphSymbol(type)"
          :type="type"
          :has-dragover="hasDragover"
        />
      </template>
    </div>
    <div
      v-else-if="isDoomed"
      class="pelle-current-glyph-effects"
    >
      운명에 빠져있을 때는 글리프 희생으로 인한 모든 부스트가 비활성화됩니다. 변형된 글리프로 인한 효과 변화 포함.
    </div>
    <div v-else>
      아직 희생한 글리프가 없습니다!
    </div>
  </div>
</template>

<style scoped>

</style>
