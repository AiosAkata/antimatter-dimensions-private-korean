<script>
import ModalWrapper from "@/components/modals/ModalWrapper";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "RealityGlyphCreationModal",
  components: {
    ModalWrapper,
    PrimaryButton
  },
  data() {
    return {
      isDoomed: false,
      realityGlyphLevel: 0,
      // This contains an array where each entry is an array looking like [4000, "realitygalaxies"]
      possibleEffects: [],
    };
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed;
      this.realityGlyphLevel = AlchemyResource.reality.effectValue;
      const realityEffectConfigs = GlyphEffects.all
        .filter(eff => eff.glyphTypes.includes("reality"))
        .sort((a, b) => a.bitmaskIndex - b.bitmaskIndex);
      const minRealityEffectIndex = realityEffectConfigs.map(cfg => cfg.bitmaskIndex).min();
      this.possibleEffects = realityEffectConfigs
        .map(cfg => [realityGlyphEffectLevelThresholds[cfg.bitmaskIndex - minRealityEffectIndex], cfg.id]);
    },
    createRealityGlyph() {
      if (GameCache.glyphInventorySpace.value === 0) {
        Modal.message.show("No available inventory space; Sacrifice some Glyphs to free up space.",
          { closeEvent: GAME_EVENT.GLYPHS_CHANGED });
        return;
      }
      Glyphs.addToInventory(GlyphGenerator.realityGlyph(this.realityGlyphLevel));
      AlchemyResource.reality.amount = 0;
      player.reality.glyphs.createdRealityGlyph = true;
      this.emitClose();
    },
    formatGlyphEffect(effect) {
      if (this.realityGlyphLevel < effect[0]) return `(Requires Glyph level ${formatInt(effect[0])})`;
      const config = GlyphEffects[effect[1]];
      const value = config.effect(this.realityGlyphLevel, rarityToStrength(100));
      const effectTemplate = config.singleDesc;
      return effectTemplate.replace("{value}", config.formatEffect(value));
    }
  },
};
</script>

<template>
  <ModalWrapper>
    <template #header>
      현실 글리프 생성
    </template>
    <div class="c-reality-glyph-creation">
      <div>
        레벨 {{ formatInt(realityGlyphLevel) }} 현실 글리프를 생성합니다.
        희귀도는 항상 {{ formatPercents(1) }}이며
        현재 현실 자원 양(모두 소비됨)에 따라 레벨이 조정됩니다. 다른 모든 연금술 자원은 영향을 받지 않습니다.
        현실 글리프는 고유한 효과를 가지며 일부는 더 높은 레벨의 글리프에서만 사용 가능합니다.
        현실 글리프는 모든 메모리 청크 획득을 증가시키기 위해 희생할 수도 있습니다. 에파리그 글리프처럼
        동시에 1개 이상을 장착할 수 없습니다.
      </div>
      <div class="o-available-effects-container">
        <div class="o-available-effects">
          사용 가능한 효과:
        </div>
        <div
          v-for="(effect, index) in possibleEffects"
          :key="index"
        >
          {{ formatGlyphEffect(effect) }}
        </div>
      </div>
      <PrimaryButton
        v-if="isDoomed"
        :enabled="false"
      >
        파멸한 상태에서 현실 글리프를 생성할 수 없습니다
      </PrimaryButton>
      <PrimaryButton
        v-else-if="realityGlyphLevel !== 0"
        @click="createRealityGlyph"
      >
        현실 글리프 생성!
      </PrimaryButton>
      <PrimaryButton
        v-else
        :enabled="false"
      >
        현실 글리프 레벨은 {{ formatInt(0) }}보다 높아야 합니다
      </PrimaryButton>
    </div>
  </ModalWrapper>
</template>

<style scoped>
.o-available-effects-container {
  margin: 1.5rem 0 2rem;
}

.o-available-effects {
  font-weight: bold;
}
</style>
