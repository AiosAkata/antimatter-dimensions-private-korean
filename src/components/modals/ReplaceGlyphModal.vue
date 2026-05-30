<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "ReplaceGlyphModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    targetSlot: {
      type: Number,
      required: true
    },
    inventoryIndex: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      target: 0,
      idx: 0,
      isDoomed: false,
    };
  },
  computed: {
    resetTerm() { return this.isDoomed ? "Armageddon" : "Reality"; },
  },
  methods: {
    update() {
      this.target = this.targetSlot;
      this.idx = this.inventoryIndex;
      this.glyph = Glyphs.findByInventoryIndex(this.idx);
      this.isDoomed = Pelle.isDoomed;
    },
    handleYesClick() {
      Glyphs.swapIntoActive(this.glyph, this.targetSlot);
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="glyphReplace"
    @confirm="handleYesClick"
  >
    <template #header>
      글리프를 교체하려고 합니다
    </template>
    글리프를 교체하면 이 {{ resetTerm }}이(가) 다시 시작됩니다.
  </ModalWrapperChoice>
</template>
