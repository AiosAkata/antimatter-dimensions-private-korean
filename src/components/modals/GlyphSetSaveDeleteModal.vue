<script>
import GlyphSetPreview from "@/components/GlyphSetPreview";
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "GlyphSetSaveDeleteModal",
  components: {
    ModalWrapperChoice,
    GlyphSetPreview
  },
  props: {
    glyphSetId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      glyphSet: []
    };
  },
  methods: {
    update() {
      this.glyphSet = Glyphs.copyForRecords(player.reality.glyphs.sets[this.glyphSetId].glyphs);
    },
    handleYesClick() {
      player.reality.glyphs.sets[this.glyphSetId].glyphs = [];
      EventHub.dispatch(GAME_EVENT.GLYPH_SET_SAVE_CHANGE);
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="deleteGlyphSetSave"
    @confirm="handleYesClick"
  >
    <template #header>
      이 글리프 세트 삭제
    </template>
    <div class="c-modal-message__text">
      이 글리프 세트를 삭제할 의도를 확인하십시오:
      <GlyphSetPreview
        :is-in-modal="true"
        :glyphs="glyphSet"
      />
      이것은 실제 글리프에 영향을 주지 않으며 저장된 프리셋만 영향을 줍니다.
    </div>
    <template #confirm-text>
      삭제
    </template>
  </ModalWrapperChoice>
</template>
