<script>
import GlyphComponent from "@/components/GlyphComponent";
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "RealityModal",
  components: {
    PrimaryButton,
    ModalWrapperChoice,
    GlyphComponent,
  },
  data() {
    return {
      firstReality: false,
      hasSpace: true,
      hasChoice: false,
      hasFilter: false,
      glyphs: [],
      bestLevel: 0,
      levelDifference: 0,
      selectedGlyph: undefined,
      canRefresh: false,
      level: 0,
      simRealities: 0,
      realityMachines: new Decimal(),
      shardsGained: 0,
      effarigUnlocked: false,
      willAutoPurge: false,
    };
  },
  computed: {
    firstRealityText() {
      return `현실은 도전 기록과 통계 탭의 일반 헤더 아래에 있는 모든 항목을 제외한 모든 것을 리셋합니다. 첫 번째 ${formatInt(13)}개의 업적 행도 리셋되지만
        ${timeDisplayNoDecimals(30 * 60000)}마다 자동으로 1개의 업적을 다시 받게 됩니다. 또한 영원 포인트를 기반으로 현실 기계를 얻고
        영원 포인트, 복제체, 팽창된 시간을 기반으로 레벨이 정해지는 글리프를 얻으며, 생활의 질 업그레이드에 쓸 특혜 포인트를 받고
        다양한 업그레이드를 해금합니다.`;
    },
    canSacrifice() {
      return RealityUpgrade(19).isEffectActive;
    },
    warnText() {
      if (!this.hasChoice) {
        return `현재 매 현실마다 새 글리프에 대한 선택지가 하나뿐입니다.
          이 모달을 취소하고 START 특혜를 구매하여 여러 글리프 중에서 선택할 수 있는 기능을 해금할 수 있습니다.`;
      }

      if (this.hasFilter && this.selectedGlyph === undefined) {
        return `글리프를 선택하지 않으면 글리프 필터를 사용하여 자동으로 선택됩니다.`;
      }
      return this.selectedGlyph === undefined
        ? `계속하려면 글리프를 선택해야 합니다.`
        : null;
    },
    gained() {
      const gainedResources = [];
      gainedResources.push(`${quantifyInt("Reality", this.simRealities)}`);
      gainedResources.push(`${quantifyInt("Perk Point", this.simRealities)}`);
      gainedResources.push(`${quantify("Reality Machine", this.realityMachines, 2)}`);
      if (this.effarigUnlocked) {
        gainedResources.push(`${quantify("Relic Shard", this.shardsGained, 2)}`);
      }
      return `You will gain ${makeEnumeration(gainedResources)}`;
    },
    levelStats() {
      // Bit annoying to read due to needing >, <, and =, with = needing a different format.
      return `현실에서 레벨 ${formatInt(this.level)} 글리프를 받을 것이며, 이는
        ${this.level === this.bestLevel ? "최고 기록과 같습니다" : `
        최고 기록보다 ${quantifyInt("level", this.levelDifference)}
        ${this.level > this.bestLevel ? "높습니다" : "낮습니다"}`}.`;
    },
    confirmationToDisable() {
      return ConfirmationTypes.glyphSelection.isUnlocked() ? "glyphSelection" : undefined;
    },
    canConfirm() {
      return this.firstReality || this.selectedGlyph !== undefined || this.hasFilter;
    }
  },
  created() {
    this.getGlyphs();
    GlyphSelection.realityProps = getRealityProps(false, false);
  },
  methods: {
    update() {
      this.firstReality = player.realities === 0;
      this.hasChoice = Perk.firstPerk.isEffectActive;
      this.effarigUnlocked = TeresaUnlocks.effarig.canBeApplied;
      this.hasFilter = EffarigUnlock.glyphFilter.isUnlocked;
      this.level = gainedGlyphLevel().actualLevel;
      this.simRealities = 1 + simulatedRealityCount(false);
      this.hasSpace = GameCache.glyphInventorySpace.value >= this.simRealities;
      const simRMGained = MachineHandler.gainedRealityMachines.times(this.simRealities);
      this.realityMachines.copyFrom(simRMGained.clampMax(MachineHandler.distanceToRMCap));
      this.shardsGained = Effarig.shardsGained * (simulatedRealityCount(false) + 1);
      this.willAutoPurge = player.reality.autoAutoClean;
      if (this.firstReality) return;
      for (let i = 0; i < this.glyphs.length; ++i) {
        const currentGlyph = this.glyphs[i];
        const newGlyph = GlyphSelection.glyphList(
          GlyphSelection.choiceCount, gainedGlyphLevel(), { isChoosingGlyph: false }
        )[i];
        if (currentGlyph.level === newGlyph.level) continue;
        currentGlyph.level = newGlyph.level;
        currentGlyph.effects = newGlyph.effects;
      }
      this.bestLevel = player.records.bestReality.glyphLevel;
      this.levelDifference = Math.abs(this.bestLevel - this.level);
    },
    glyphClass(index) {
      return {
        "l-modal-glyph-selection__glyph": true,
        "l-modal-glyph-selection__glyph--selected": this.selectedGlyph === index,
      };
    },
    getGlyphs() {
      this.canRefresh = true;
      this.glyphs = GlyphSelection.upcomingGlyphs;
    },
    select(index) {
      this.selectedGlyph = index;
    },
    confirmModal(sacrifice) {
      if (!this.canConfirm) return;
      if (sacrifice) {
        // Sac isn't passed through confirm so we have to close it manually
        this.emitClose();
      }
      startManualReality(sacrifice, this.selectedGlyph);
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    :option="confirmationToDisable"
    :show-confirm="canConfirm"
    @confirm="confirmModal(false)"
  >
    <template #header>
      현실을 수행하려고 합니다
    </template>
    <div
      v-if="firstReality"
      class="c-modal-message__text"
    >
      {{ firstRealityText }}
    </div>

    <div class="c-modal-message__text">
      {{ gained }}
    </div>
    <div
      v-if="!firstReality"
      class="l-glyph-selection__row"
    >
      <GlyphComponent
        v-for="(glyph, index) in glyphs"
        :key="index"
        :class="glyphClass(index)"
        :glyph="glyph"
        :is-in-modal="true"
        :ignore-modified-level="true"
        :show-sacrifice="canSacrifice"
        @click.native="select(index)"
      />
    </div>
    <div v-if="!firstReality">
      {{ levelStats }}
      <br>
      <b class="o-warning">
        {{ warnText }}
      </b>
    </div>
    <div v-if="simRealities > 1">
      <br>
      이 글리프를 선택한 후 게임은 나머지 현실을 시뮬레이션하고
      <br>
      글리프 필터 설정을 기반으로 자동으로 {{ quantifyInt("글리프", simRealities - 1) }}를 선택합니다.
    </div>
    <div v-if="willAutoPurge">
      <br>
      자동 삭제가 현재 활성화되어 있습니다. 선택한 글리프는
      <br>
      트리거된 후 인벤토리에 나타나지 않을 수 있습니다.
    </div>
    <div
      v-if="!hasSpace"
      class="o-warning"
    >
      <span v-if="simRealities > 1">
        열린 인벤토리 공간보다 더 많은 현실을 시뮬레이션하려고 합니다.
        이로 인해 일부 글리프가 희생될 수 있습니다.
      </span>
      <span v-else>
        사용 가능한 인벤토리 공간이 없습니다. 선택한 글리프는 자동으로
        {{ canSacrifice ? "희생" : "삭제" }}됩니다!
      </span>
    </div>
    <div v-if="confirmationToDisable">
      <br>
      현실 버튼을 Shift+클릭하면 이 모달이 표시되도록 강제할 수 있습니다(비활성화된 경우에도).
    </div>
    <template
      v-if="canSacrifice && canConfirm"
      #extra-buttons
    >
      <PrimaryButton
        class="o-primary-btn--width-medium c-modal-message__okay-btn"
        @click="confirmModal(true)"
      >
        희생
      </PrimaryButton>
    </template>
  </ModalWrapperChoice>
</template>

<style scoped>
.o-warning {
  color: var(--color-infinity);
}
</style>
