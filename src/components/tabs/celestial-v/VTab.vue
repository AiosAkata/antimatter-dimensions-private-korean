<script>
import CelestialQuoteHistory from "@/components/CelestialQuoteHistory";
import GlyphSetPreview from "@/components/GlyphSetPreview";
import PrimaryButton from "@/components/PrimaryButton";
import { V_REDUCTION_MODE } from "@/core/secret-formula";
import VUnlockRequirement from "./VUnlockRequirement";

export default {
  name: "VTab",
  components: {
    CelestialQuoteHistory,
    VUnlockRequirement,
    PrimaryButton,
    GlyphSetPreview
  },
  data() {
    return {
      mainUnlock: false,
      canUnlockCelestial: false,
      totalUnlocks: 0,
      pp: 0,
      showReduction: false,
      runRecords: [],
      runGlyphs: [],
      isFlipped: false,
      wantsFlipped: true,
      isRunning: false,
      hasAlchemy: false,
    };
  },
  computed: {
    mainUnlockDB: () => GameDatabase.celestials.v.mainUnlock,
    celestialUnlockClassObject() {
      return {
        "o-v-milestone": true,
        "o-v-milestone--unlocked": this.canUnlockCelestial,
        "c-v-unlock-button--enabled": this.canUnlockCelestial
      };
    },
    // If V is flipped, change the layout of the grid
    hexGrid() {
      return this.isFlipped && this.wantsFlipped
        ? [
          VRunUnlocks.all[6],
          {},
          {},
          {},
          { isRunButton: true },
          VRunUnlocks.all[7],
          VRunUnlocks.all[8],
          {},
          {}
        ]
        : [
          VRunUnlocks.all[0],
          VRunUnlocks.all[1],
          {},
          VRunUnlocks.all[5],
          { isRunButton: true },
          VRunUnlocks.all[2],
          VRunUnlocks.all[4],
          VRunUnlocks.all[3],
          {}
        ];
    },
    vUnlock: () => VUnlocks.vAchievementUnlock,
    runMilestones() {
      return [
        [
          VUnlocks.shardReduction,
          VUnlocks.adPow,
          VUnlocks.fastAutoEC
        ],
        [
          VUnlocks.autoAutoClean,
          VUnlocks.achievementBH,
          VUnlocks.raUnlock
        ],
      ];
    },
    runButtonClassObject() {
      return {
        "l-v-hexagon": true,
        "c-v-run-button": true,
        "c-v-run-button--running": this.isRunning,
        "c-celestial-run-button--clickable": !this.isDoomed,
        "o-pelle-disabled-pointer": this.isDoomed
      };
    },
    runDescription() {
      return GameDatabase.celestials.descriptions[3].effects().replace(/^\w/u, c => c.toUpperCase());
    },
    isDoomed: () => Pelle.isDoomed,
  },
  methods: {
    update() {
      this.mainUnlock = VUnlocks.vAchievementUnlock.isUnlocked;
      this.canUnlockCelestial = V.canUnlockCelestial;
      this.totalUnlocks = V.spaceTheorems;
      this.pp = Currency.perkPoints.value;
      this.showReduction = VUnlocks.shardReduction.isUnlocked;
      this.runRecords = Array.from(player.celestials.v.runRecords);
      this.runGlyphs = player.celestials.v.runGlyphs.map(gList => Glyphs.copyForRecords(gList));
      this.isFlipped = V.isFlipped;
      this.wantsFlipped = player.celestials.v.wantsFlipped;
      this.isRunning = V.isRunning;
      this.hasAlchemy = Ra.unlocks.unlockGlyphAlchemy.canBeApplied;
    },
    unlockCelestial() {
      if (V.canUnlockCelestial) V.unlockCelestial();
    },
    startRun() {
      if (this.isDoomed) return;
      Modal.celestials.show({ name: "V's", number: 3 });
    },
    has(info) {
      return info.isUnlocked;
    },
    mode(hex) {
      return hex.config.mode === V_REDUCTION_MODE.SUBTRACTION ? "감소" : "분할";
    },
    reductionValue(hex) {
      return hex.config.mode === V_REDUCTION_MODE.SUBTRACTION
        ? formatInt(hex.reduction)
        : format(Decimal.pow10(hex.reduction));
    },
    showRecord(hex) {
      return this.runRecords[hex.id] > 0 || hex.completions > 0;
    },
    reduceGoals(hex) {
      if (!Currency.perkPoints.purchase(hex.reductionCost)) return;
      const steps = hex.config.reductionStepSize ? hex.config.reductionStepSize : 1;
      player.celestials.v.goalReductionSteps[hex.id] += steps;
      for (const unlock of VRunUnlocks.all) {
        unlock.tryComplete();
      }
      V.checkForUnlocks();
    },
    reductionTooltip(hex) {
      return `${quantify("특전", hex.reductionCost, 2, 0)}을 소비하여
        목표를 ${format(hex.config.perReductionStep)}만큼 감소`;
    },
    hexColor(hex) {
      const completions = hex.completions;
      const maxed = hex.config.values.length;
      if (completions === maxed) return "var(--color-v--base)";
      const r = 255 - 5 * completions;
      const g = 255 - 10 * completions;
      const b = 255 - 20 * completions;
      return `rgb(${r},${g},${b})`;
    },
    toggleFlipped() {
      player.celestials.v.wantsFlipped = !this.wantsFlipped;
    },
    createCursedGlyph() {
      Glyphs.giveCursedGlyph();
    }
  }
};
</script>

<template>
  <div class="l-v-celestial-tab">
    <CelestialQuoteHistory celestial="v" />
    <div
      v-if="!mainUnlock"
      class="c-v-info-text"
    >
      <v-unlock-requirement
        v-for="req in mainUnlockDB"
        :key="req.name"
        :db-entry="req"
      />
      <div class="l-v-milestones-grid__row">
        <div
          :class="celestialUnlockClassObject"
          @click="unlockCelestial"
        >
          <p>{{ vUnlock.description }}</p>
          <p>{{ vUnlock.rewardText }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <div
        v-if="isFlipped"
        class="c-v-info-text"
      >
        <PrimaryButton
          class="o-primary-btn--subtab-option"
          @click="toggleFlipped"
        >
          <span v-if="wantsFlipped">숨기기</span>
          <span v-else>표시</span>
          하드 V
        </PrimaryButton>
        <PrimaryButton
          class="o-primary-btn--subtab-option l-cursed-glyph-creation"
          @click="createCursedGlyph"
        >
          저주받은 글리프 생성
        </PrimaryButton>
        <br>
        저주받은 글리프는 여기 또는 에파리그 탭에서 만들 수 있습니다.
        <br>
        저주받은 글리프는 글리프 개수와 관련된 모든 요구사항을 위해 {{ formatInt(-3) }}개의 글리프로 계산됩니다.
        <br>
        <span v-if="!isDoomed">블랙홀은 이제 둘 다 영구적인 경우 시간을 늦추는 데 사용할 수 있습니다.</span>
        <br><br>
        각 하드 V-업적은 2개의 V-업적으로 계산되며 {{ formatInt(1) }} 대신 {{ formatInt(2) }}의 공간 정리를 제공합니다.
        <br>
        하드 V-업적의 경우 목표 감소가 훨씬 더 비싸집니다.
      </div>
      <div
        v-if="showReduction"
        class="c-v-info-text"
      >
        {{ quantify("특전", pp, 2, 0) }}을 가지고 있습니다.
      </div>
      <div class="l-v-unlocks-container">
        <li
          v-for="(hex, hexId) in hexGrid"
          :key="hexId + '-v-hex'"
          :style="[hex.isRunButton ? {zIndex: 1} : {zIndex: 0}]"
        >
          <div
            v-if="hex.config"
            class="l-v-hexagon c-v-unlock"
            :style="'background-color: ' + hexColor(hex)"
          >
            <p class="o-v-unlock-name">
              <br v-if="hex.canBeReduced && showReduction">{{ hex.config.name }}
            </p>
            <p
              class="o-v-unlock-desc"
              v-html="hex.formattedDescription"
            />
            <p
              v-if="has(runMilestones[0][0]) && hex.isReduced"
              class="o-v-unlock-goal-reduction"
            >
              목표가 {{ reductionValue(hex) }}만큼 {{ mode(hex) }}됨
            </p>
            <p class="o-v-unlock-amount">
              {{ formatInt(hex.completions) }}/{{ formatInt(hex.config.values.length) }} 완료됨
            </p>
            <div v-if="showRecord(hex)">
              <p class="o-v-unlock-record">
                최고: {{ hex.config.formatRecord(runRecords[hex.id]) }}
              </p>
              <p>
                <GlyphSetPreview
                  :glyphs="runGlyphs[hex.id]"
                  :text="hex.config.name"
                  :text-hidden="true"
                />
              </p>
              <div v-if="hex.canBeReduced && showReduction">
                <div class="l-v-goal-reduction-spacer" />
                <button
                  class="o-primary-btn l-v-reduction"
                  :class="{ 'o-primary-btn--disabled': !hex.canBeReduced || pp < hex.reductionCost }"
                  :ach-tooltip="reductionTooltip(hex)"
                  @click="reduceGoals(hex)"
                >
                  <i class="fas fa-angle-double-down" />
                </button>
              </div>
            </div>
          </div>
          <div
            v-else-if="hex.isRunButton"
            :class="runButtonClassObject"
            @click="startRun()"
          >
            <b
              class="o-v-start-text"
              :class="{ 'o-pelle-disabled': isDoomed }"
            >
              <span v-if="isRunning">V의 현실에 있습니다 </span>
              <span v-else>V의 현실 시작 </span>
            </b>
            <br>
            <div :style="{ 'font-size': hasAlchemy ? '1.2rem' : '' }">
              {{ runDescription }}
            </div>
            <div class="c-v-run-button__line c-v-run-button__line--1" />
            <div class="c-v-run-button__line c-v-run-button__line--2" />
            <div class="c-v-run-button__line c-v-run-button__line--3" />
          </div>
          <div v-else>
            <div class="l-v-hexagon l-placeholder-invisible" />
          </div>
        </li>
      </div>
      <div class="c-v-info-text">
        V-업적은 V의 현실 내에서만 완료할 수 있지만 영구적이며 현실을 떠났다가 다시 들어갈 때 초기화되지 않습니다.
      </div>
      <div class="c-v-info-text">
        {{ formatInt(totalUnlocks) }}개의 V-업적이 완료되었습니다.
        <span v-if="!isDoomed">
          각 완료당 {{ formatInt(1) }}개의 공간 정리를 획득하여
          일반적으로 잠긴 시간 연구를 구매할 수 있습니다.
          <br>
          공간 정리는 자동화기에서 화폐로도 사용할 수 있습니다.
        </span>
      </div>
      <br>
      <div class="l-v-milestones-grid">
        <div
          v-for="(row, rowId) in runMilestones"
          :key="rowId + '-v-ms-row'"
          class="l-v-milestones-grid__row"
        >
          <div
            v-for="(milestone, colId) in row"
            :key="colId + rowId*10 + '-v-ms'"
            class="o-v-milestone"
            :class="{'o-v-milestone--unlocked':
              has(milestone)}"
          >
            <div :class="{ 'o-pelle-disabled': isDoomed }">
              <p>{{ milestone.description }}</p>
              <p>보상: {{ milestone.rewardText }}</p>
              <p v-if="milestone.formattedEffect">
                현재: <b>{{ milestone.formattedEffect }}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.o-v-start-text {
  font-size: 1.5rem;
}

.l-placeholder-invisible {
  opacity: 0;
}

.l-v-goal-reduction-spacer {
  height: 0.8rem;
}

.l-cursed-glyph-creation {
  background: var(--color-effarig--base);
}
</style>
