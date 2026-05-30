<script>
import GlyphSetPreview from "@/components/GlyphSetPreview";

export default {
  name: "GlyphPeek",
  components: {
    GlyphSetPreview
  },
  data() {
    return {
      glyphs: [],
      level: 0,
      canPeek: false,
      isVisible: false,
      canSacrifice: false,
    };
  },
  created() {
    this.on$(GAME_EVENT.REALITY_RESET_AFTER, this.refreshGlyphs);
    this.refreshGlyphs();
  },
  methods: {
    update() {
      this.canSacrifice = GlyphSacrificeHandler.canSacrifice;
      // Hide this before first reality since then it'll confuse the player,
      // and due to pre-selected first glyph might well be incorrect anyway.
      this.isVisible = !Pelle.isDoomed && PlayerProgress.realityUnlocked();
      this.canPeek = TimeStudy.reality.isBought;
      if (gainedGlyphLevel().actualLevel !== this.level) {
        this.refreshGlyphs();
      }
    },
    refreshGlyphs() {
      this.canRefresh = true;
      this.glyphs = GlyphSelection.upcomingGlyphs;
      for (const glyph of this.glyphs) Glyphs.applyGamespeed(glyph);
      this.level = gainedGlyphLevel().actualLevel;
    },
    showModal() {
      Modal.glyphShowcasePanel.show({
        name: "Potential Glyphs for this Reality",
        glyphSet: this.glyphs,
        closeEvent: GAME_EVENT.REALITY_RESET_AFTER,
        isGlyphSelection: true,
        showSetName: false,
      });
    }
  }
};
</script>

<template>
  <div
    v-if="isVisible"
    class="c-glyph-peek"
  >
    <div
      v-if="canPeek"
      class="l-glyph-set-preview"
      @click="showModal"
    >
      <GlyphSetPreview
        :show-name="false"
        :text="'예정된 글리프 선택:'"
        :glyphs="glyphs"
        :ignore-modified-level="true"
        :show-sacrifice="canSacrifice"
        :flip-tooltip="true"
        :sort="false"
      />
      (클릭하여 세부정보 보기)
    </div>
    <div v-else>
      현실 연구 구매하여
      <br>
      이 현실의 글리프 선택지를 확인합니다
    </div>
  </div>
</template>

<style scoped>

</style>
