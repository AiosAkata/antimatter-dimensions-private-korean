<script>
export default {
  name: "GlyphSortButtonGroup",
  data() {
    return {
      showScoreFilter: false,
    };
  },
  methods: {
    update() {
      this.showScoreFilter = EffarigUnlock.glyphFilter.isUnlocked;
    },
    sortByLevel() {
      Glyphs.sortByLevel();
    },
    sortByPower() {
      Glyphs.sortByPower();
    },
    sortByScore() {
      Glyphs.sortByScore();
    },
    sortByEffect() {
      Glyphs.sortByEffect();
    },
    collapseEmpty() {
      Glyphs.collapseEmptySlots();
    }
  }
};
</script>

<template>
  <div class="o-glyph-inventory-management-group">
    <div class="l-glyph-sacrifice-options__header">
      글리프 정렬:
    </div>
    <button
      class="c-glyph-inventory-option"
      @click="sortByLevel"
    >
      레벨별 정렬
      <div class="c-glyph-inventory-option__tooltip">
        글리프 레벨 감소 순서로 정렬
      </div>
    </button>
    <button
      class="c-glyph-inventory-option"
      @click="sortByPower"
    >
      전력별 정렬
      <div class="c-glyph-inventory-option__tooltip">
        레벨×희귀도 감소 순서로 정렬
      </div>
    </button>
    <button
      class="c-glyph-inventory-option"
      @click="sortByEffect"
    >
      효과별 정렬
      <div class="c-glyph-inventory-option__tooltip">
        효과를 기반으로 글리프 그룹화
      </div>
    </button>
    <button
      v-if="showScoreFilter"
      class="c-glyph-inventory-option"
      @click="sortByScore"
    >
      점수별 정렬
      <div class="c-glyph-inventory-option__tooltip">
        글리프 필터 점수 감소 순서로 정렬
      </div>
    </button>
    <button
      class="c-glyph-inventory-option"
      @click="collapseEmpty"
    >
      빈 공간 축소
      <div class="c-glyph-inventory-option__tooltip">
        모든 글리프를 가장 빠른 빈 슬롯으로 이동
      </div>
    </button>
  </div>
</template>

<style scoped>

</style>
