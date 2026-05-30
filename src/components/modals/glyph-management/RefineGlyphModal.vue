<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "RefineGlyphModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    idx: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      resourceAmount: 0,
      resourceUnlocked: false,
      gain: 0,
      after: 0,
      cap: 0,
      confirmedRefine: false
    };
  },
  computed: {
    glyph() {
      return Glyphs.findByInventoryIndex(this.idx);
    },
    resource() {
      return GlyphSacrificeHandler.glyphAlchemyResource(this.glyph);
    },
    resourceName() {
      return this.resource.name;
    },
  },
  methods: {
    update() {
      const resource = this.resource;
      this.resourceAmount = resource.amount;
      this.resourceUnlocked = resource.isUnlocked;
      this.gain = GlyphSacrificeHandler.glyphRefinementGain(this.glyph);
      this.cap = GlyphSacrificeHandler.glyphEffectiveCap(this.glyph);

      this.after = this.resourceAmount + this.gain;

      const newGlyph = Glyphs.findByInventoryIndex(this.idx);
      if (this.glyph !== newGlyph && !this.confirmedRefine) {

        // Why is confirmedRefine here: refer to SacrificeGlyphModal.vue

        this.emitClose();
        Modal.message.show("The selected Glyph changed position or was otherwise changed!");
      }
    },
    handleYesClick() {
      this.confirmedRefine = true;
      GlyphSacrificeHandler.refineGlyph(this.glyph);
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="glyphRefine"
    @confirm="handleYesClick"
  >
    <template #header>
      글리프를 정제하려고 합니다
    </template>
    <div
      v-if="resourceUnlocked"
      class="c-modal-message__text"
    >
      글리프를 정제하면 글리프가 인벤토리에서 제거되며,
      {{ resourceName }} 연금술 자원이 {{ format(resourceAmount, 2, 2) }}에서 {{ format(after, 2, 2) }}로 증가합니다.
      이 글리프는 {{ resourceName }} 자원을 최대 {{ format(cap, 2, 2) }}까지 늘릴 수 있습니다.
    </div>
    <div
      v-else
      class="c-modal-message__text"
    >
      이 글리프의 자원을 아직 해금하지 않았기 때문에 {{ resourceName }} 연금술 자원을 얻을 수 없습니다.
      여전히 정제할 수 있지만 아무 일도 일어나지 않습니다. 대신 글리프를 희생하는 것을 고려해 보세요.
    </div>
  </ModalWrapperChoice>
</template>
