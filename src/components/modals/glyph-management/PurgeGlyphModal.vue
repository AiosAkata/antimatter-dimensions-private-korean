<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "PurgeGlyphModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    harsh: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    threshold() {
      return this.harsh ? 1 : 5;
    },
    extraMessage() {
      if (this.glyphsDeleted === 0) return `삭제할 글리프가 없습니다.`;
      if (this.glyphsDeleted === this.glyphsTotal) return `모든 글리프를 삭제합니다.`;
      return `${this.harsh ? `강력한 삭제` : `삭제`}는
        당신의 글리프 중 ${formatInt(this.glyphsDeleted)}/${formatInt(this.glyphsTotal)}를 삭제할 것입니다.`;
    },
    explanation() {
      if (this.harsh) return `강력한 삭제는 인벤토리의 다른 글리프보다 엄격하게 더 나쁜 글리프를 삭제합니다. 예를 들어 글리프가 다른 글리프와 동일한 모든 효과를 가지고 있지만 모든 효과의 값이 더 나쁘면 삭제됩니다.`;
      return `삭제는 다른 글리프보다 엄격하게 더 나쁜 글리프를 삭제하면서 그러한 효과의 전체 세트를 장착할 수 있는 충분한 수를 유지합니다. 이는 강력한 삭제처럼 작동하지만 일반 삭제는 더 나은 5개의 글리프를 찾지 못하면(하나만 아님) 주어진 글리프를 삭제하지 않습니다.`;
    },
    topLabel() {
      return `글리프를 ${this.harsh ? `강력하게 삭제` : `삭제`}하려고 합니다`;
    },

    // These two don't need to be reactive since the modal force-closes itself whenever glyphs change
    glyphsTotal() {
      return Glyphs.inventory.filter(slot => slot !== null).length;
    },
    glyphsDeleted() {
      return Glyphs.autoClean(this.threshold, false);
    },
  },
  methods: {
    handleYesClick() {
      Glyphs.autoClean(this.threshold, true);
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="autoClean"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ topLabel }}
    </template>
    <div class="c-modal-message__text">
      이것은 나중에 사용하고 싶을 정도로 좋은 글리프를 인벤토리에서 삭제할 수 있습니다.
      삭제는 삭제 모드를 기반으로 글리프를 삭제합니다. 정말로 이 작업을 수행하시겠습니까?
      <br>
      <br>
      {{ explanation }}
    </div>
    <br>
    <div class="c-modal-hard-reset-danger">
      {{ extraMessage }}
    </div>
  </ModalWrapperChoice>
</template>
