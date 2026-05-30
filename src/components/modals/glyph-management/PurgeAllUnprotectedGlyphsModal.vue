<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "PurgeAllUnprotectedGlyphsModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      isRefining: false,
      isSacrificing: false,
    };
  },
  computed: {
    refiningSacrificingOrDeleting() {
      if (this.isRefining) return `정제`;
      if (this.isSacrificing) return `희생`;
      return `삭제`;
    },
    topLabel() {
      return `모든 보호되지 않은 글리프를 ${this.refiningSacrificingOrDeleting}하려고 합니다`;
    },
    message() {
      return `정말로 인벤토리의 모든 보호되지 않은 글리프를 ${this.refiningSacrificingOrDeleting}하시겠습니까?`;
    },
    extraMessage() {
      if (this.glyphsDeleted === 0) return `삭제할 글리프가 없습니다.`;
      if (this.glyphsDeleted === this.glyphsTotal) {
        return `모든 글리프를 ${this.refiningSacrificingOrDeleting}합니다.`;
      }
      return `이것은 당신의 글리프 중 ${formatInt(this.glyphsDeleted)}/${formatInt(this.glyphsTotal)}를 ${this.refiningSacrificingOrDeleting}할 것입니다.`;
    },

    // These two don't need to be reactive since the modal force-closes itself whenever glyphs change
    glyphsTotal() {
      return Glyphs.inventory.filter(slot => slot !== null).length;
    },
    glyphsDeleted() {
      return Glyphs.autoClean(0, false);
    },
  },
  methods: {
    update() {
      this.isRefining = GlyphSacrificeHandler.isRefining;
      this.isSacrificing = GlyphSacrificeHandler.canSacrifice;
    },
    handleYesClick() {
      Glyphs.deleteAllUnprotected();
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="sacrificeAll"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ topLabel }}
    </template>
    <div class="c-modal-message__text">
      {{ message }}
    </div>
    <br>
    <div class="c-modal-hard-reset-danger">
      {{ extraMessage }}
    </div>
  </ModalWrapperChoice>
</template>
