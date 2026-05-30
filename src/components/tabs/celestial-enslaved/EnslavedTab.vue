<script>
import BlackHoleChargingSliders from "@/components/tabs/black-hole/BlackHoleChargingSliders";
import CelestialQuoteHistory from "@/components/CelestialQuoteHistory";
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";

export default {
  name: "EnslavedTab",
  components: {
    CelestialQuoteHistory,
    PrimaryButton,
    PrimaryToggleButton,
    BlackHoleChargingSliders
  },
  data: () => ({
    isStoringBlackHole: false,
    isStoringReal: false,
    autoStoreReal: false,
    offlineEnabled: false,
    hasAutoRelease: false,
    isRunning: false,
    completed: false,
    storedBlackHole: 0,
    storedReal: 0,
    storedRealEffiency: 0,
    storedRealCap: 0,
    autoRelease: false,
    autoReleaseSpeed: 0,
    unlocks: [],
    buyableUnlocks: [],
    quote: "",
    currentSpeedUp: 0,
    hintsUnlocked: false,
    canModifyGameTimeStorage: false,
    canChangeStoreTime: false,
    canChangeStoreRealTime: false,
    canDischarge: false,
    canAutoRelease: false,
    hasNoCharge: true,
    hasReachedCurrentCap: false,
  }),
  computed: {
    storedRealEfficiencyDesc() {
      return formatPercents(this.storedRealEffiency);
    },
    storedRealCapDesc() {
      return timeDisplayShort(this.storedRealCap);
    },
    unlocksInfo() {
      return ENSLAVED_UNLOCKS;
    },
    nerfedBlackHoleTime() {
      return Enslaved.storedTimeInsideEnslaved(this.storedBlackHole);
    },
    realityTitle() {
      if (this.isRunning) return "이름없는 자의 현실 내부에 있습니다";
      return "이름없는 자의 현실 시작";
    },
    runButtonClassObject() {
      return {
        "c-enslaved-run-button__icon": true,
        "c-enslaved-run-button__icon--running": this.isRunning,
        "c-celestial-run-button--clickable": !this.isDoomed,
        "o-pelle-disabled-pointer": this.isDoomed
      };
    },
    runDescription() {
      return GameDatabase.celestials.descriptions[2].effects().split("\n");
    },
    realTimeButtonText() {
      if (!this.offlineEnabled) return "오프라인 진행이 비활성화됨";
      if (this.autoStoreReal) return "오프라인 시간 저장됨";
      return "오프라인 시간은 생산에 사용됨";
    },
    // Use this here since Nameless has a fairly non-standard character, and SFCs don't support using \uf0c1
    enslavedSymbol: () => Enslaved.symbol,
    isDoomed: () => Pelle.isDoomed,
    storeGameTimeClass() {
      return {
        "o-enslaved-mechanic-button": true,
        "o-enslaved-mechanic-button--clickable": this.canModifyGameTimeStorage,
        "o-enslaved-mechanic-button--storing-time": this.isStoringBlackHole,
        "l-fixed-setting": !this.canModifyGameTimeStorage,
        "o-pelle-disabled": this.isDoomed
      };
    },
    storeRealTimeClass() {
      return {
        "o-enslaved-mechanic-button": true,
        "o-enslaved-mechanic-button--clickable": !this.isDoomed,
        "o-enslaved-mechanic-button--storing-time": this.isStoringReal,
        "l-fixed-setting": !this.canChangeStoreRealTime,
        "o-pelle-disabled": this.isDoomed
      };
    },
    dischargeClass() {
      return {
        "o-enslaved-mechanic-button": true,
        "o-enslaved-mechanic-button--clickable": !this.isDoomed,
        "l-fixed-setting": !this.canDischarge || this.hasNoCharge,
        "o-pelle-disabled": this.isDoomed
      };
    },
    doomedDisabledClass() {
      return { "o-pelle-disabled": this.isDoomed };
    },
    mechanicButtonClass() {
      return {
        "o-enslaved-mechanic-button": true,
        "o-enslaved-mechanic-button--clickable": !this.isDoomed
      };
    }
  },
  watch: {
    autoRelease(newValue) {
      player.celestials.enslaved.isAutoReleasing = newValue;
    }
  },
  methods: {
    update() {
      this.isStoringBlackHole = Enslaved.isStoringGameTime;
      this.storedBlackHole = player.celestials.enslaved.stored;
      this.isStoringReal = Enslaved.isStoringRealTime;
      this.autoStoreReal = player.celestials.enslaved.autoStoreReal;
      this.offlineEnabled = player.options.offlineProgress;
      this.hasAutoRelease = Ra.unlocks.autoPulseTime.canBeApplied;
      this.isRunning = Enslaved.isRunning;
      this.completed = Enslaved.isCompleted && !this.isDoomed;
      this.storedReal = player.celestials.enslaved.storedReal;
      this.storedRealEffiency = Enslaved.storedRealTimeEfficiency;
      this.storedRealCap = Enslaved.storedRealTimeCap;
      this.unlocks = Array.from(player.celestials.enslaved.unlocks);
      this.buyableUnlocks = Object.values(ENSLAVED_UNLOCKS).map(x => Enslaved.canBuy(x));
      this.quote = Enslaved.quote;
      this.autoRelease = player.celestials.enslaved.isAutoReleasing;
      this.autoReleaseSpeed = Enslaved.isAutoReleasing ? Enslaved.autoReleaseSpeed : 0;
      this.currentSpeedUp = Enslaved.currentBlackHoleStoreAmountPerMs;
      this.hintsUnlocked = EnslavedProgress.hintsUnlocked.hasProgress;
      this.canModifyGameTimeStorage = Enslaved.canModifyGameTimeStorage;
      this.canChangeStoreTime = Enslaved.canModifyGameTimeStorage;
      this.canChangeStoreRealTime = Enslaved.canModifyRealTimeStorage;
      this.canDischarge = Enslaved.canRelease(false);
      this.canAutoRelease = Enslaved.canRelease(true);
      this.hasNoCharge = player.celestials.enslaved.stored === 0;
      this.hasReachedCurrentCap = this.storedReal === this.storedRealCap;
    },
    toggleStoreBlackHole() {
      Enslaved.toggleStoreBlackHole();
    },
    toggleStoreReal() {
      Enslaved.toggleStoreReal();
    },
    toggleAutoStoreReal() {
      if (!this.offlineEnabled) return;
      Enslaved.toggleAutoStoreReal();
    },
    useStored() {
      Enslaved.useStoredTime(false);
    },
    timeDisplayShort(ms) {
      return timeDisplayShort(ms);
    },
    timeUntilBuy(price) {
      return Math.max((price - this.storedBlackHole) / this.currentSpeedUp, 0);
    },
    buyUnlock(info) {
      Enslaved.buyUnlock(info);
    },
    startRun() {
      if (this.isDoomed) return;
      Modal.celestials.show({ name: "The Nameless Ones'", number: 2 });
    },
    hasUnlock(info) {
      return Enslaved.has(info);
    },
    canBuyUnlock(info) {
      // This (rather than just using Enslaved.canBuy(info) and removing this.buyableUnlocks)
      // is needed for proper reactivity of button styles (e.g., if you get a level 5000 glyph
      // while on the Nameless tab).
      return this.buyableUnlocks[info.id];
    },
    unlockClassObject(info) {
      return {
        "o-enslaved-shop-button--bought": this.hasUnlock(info),
        "o-enslaved-shop-button--available": this.canBuyUnlock(info)
      };
    },
    glitchStyle(x) {
      const xScale = 15 / 27;
      const yScale = 5;
      const dx = (x - 13) * xScale + (Math.random() * 2 - 1) * 0.85;
      const dy = (Math.random() * 2 - 1) * yScale;
      const height = (Math.pow(Math.random(), 1.5) + 0.25) * 3 * yScale;
      return {
        transform: `translate(${dx}rem, ${dy}rem)`,
        height: `${height}rem`,
      };
    }
  },
};
</script>

<template>
  <div class="l-enslaved-celestial-tab">
    <CelestialQuoteHistory celestial="enslaved" />
    <div
      v-if="hasAutoRelease && canAutoRelease"
      class="c-subtab-option-container"
    >
      <PrimaryToggleButton
        v-model="autoRelease"
        class="o-primary-btn--subtab-option"
        label="블랙홀 맥동:"
      />
    </div>
    <div class="l-enslaved-celestial-tab--inner">
      <div class="l-enslaved-run-container">
        <div v-if="hasUnlock(unlocksInfo.RUN)">
          <div class="c-enslaved-run-button">
            <div
              class="c-enslaved-run-button__title"
              :class="doomedDisabledClass"
            >
              {{ realityTitle }}
            </div>
            <div v-if="completed">
              <b>(완료됨)</b>
            </div>
            <div
              :class="runButtonClassObject"
              @click="startRun"
            >
              <div class="c-enslaved-run-button__icon__sigil">
                {{ enslavedSymbol }}
              </div>
              <div
                v-for="x in (isRunning ? 25 : 0)"
                :key="x"
                class="c-enslaved-run-button__icon__glitch"
                :style="glitchStyle(x)"
              />
            </div>
            <div
              v-for="line in runDescription"
              :key="line"
              class="c-enslaved-run-description-line"
            >
              {{ line }}
            </div>
            <b>보상: 무한 차원 한계를 증가시킬 수 있는 하이퍼큐브 해금
              (무한 차원 탭 참조)</b>
          </div>
        </div>
      </div>
      <div class="l-enslaved-upgrades-column">
        <PrimaryButton
          v-if="hintsUnlocked"
          class="o-primary-btn"
          onclick="Modal.enslavedHints.show()"
        >
          현실을 더 자세히 살펴보기...
        </PrimaryButton>
        <div class="l-enslaved-top-container">
          <div class="l-enslaved-top-container__half">
            충전 중일 때 게임 속도 배율은 {{ hasAutoRelease ? "감소" : "비활성화" }}되고,
            잃은 속도는 저장된 게임 시간으로 변환됩니다. 블랙홀을 방전하면 시간을 건너뛸 수 있습니다. 저장된 게임 시간은 특정 업그레이드를 해금하는 데도 사용됩니다.
            <button
              :class="storeGameTimeClass"
              @click="toggleStoreBlackHole"
            >
              <div
                class="o-enslaved-stored-time"
                :class="doomedDisabledClass"
              >
                {{ timeDisplayShort(storedBlackHole) }}
              </div>
              <div>
                {{ isStoringBlackHole ? "블랙홀 충전 중": "블랙홀 충전" }}
              </div>
            </button>
            <button
              :class="dischargeClass"
              @click="useStored"
            >
              <span>블랙홀 방전</span>
              <p v-if="isRunning">
                이 현실에서 {{ timeDisplayShort(nerfedBlackHoleTime) }}
              </p>
            </button>
          </div>
          <div class="l-enslaved-top-container__half">
            실시간을 저장하면 모든 생산이 완전히 중단되고 게임 속도가 {{ formatInt(0) }}로 설정됩니다.
            저장된 실시간을 사용하여 현실을 "증폭"할 수 있고, 반복 실행을 시뮬레이션할 수 있습니다.
            증폭된 현실은 일반 현실이 주는 모든 보상을 제공합니다.
            <button
              :class="[storeRealTimeClass,
                       {'l-fixed-setting': hasReachedCurrentCap}]"
              @click="toggleStoreReal"
            >
              <div class="o-enslaved-stored-time">
                {{ timeDisplayShort(storedReal) }}
              </div>
              <div>
                {{ isStoringReal ? "실시간 저장 중": "실시간 저장" }}
              </div>
            </button>
            <button
              :class="[mechanicButtonClass,
                       {'o-enslaved-mechanic-button--storing-time': autoStoreReal && offlineEnabled,
                        'l-fixed-setting': !canChangeStoreRealTime || !offlineEnabled},
                       doomedDisabledClass]"
              @click="toggleAutoStoreReal"
            >
              {{ realTimeButtonText }}
            </button>
            <div>
              효율성: {{ storedRealEfficiencyDesc }}
            </div>
            <div>
              최대 저장 실시간: {{ storedRealCapDesc }}
            </div>
          </div>
        </div>
        <BlackHoleChargingSliders />
        <br>
        <div class="l-enslaved-shop-container">
          <button
            v-for="unlock in unlocksInfo"
            :key="unlock.id"
            class="o-enslaved-shop-button"
            :class="unlockClassObject(unlock)"
            @click="buyUnlock(unlock)"
          >
            {{ unlock.description() }}
            <div v-if="!hasUnlock(unlock)">
              비용: {{ timeDisplayShort(unlock.price) }}
            </div>
            <span v-if="isStoringBlackHole && !hasUnlock(unlock) && timeUntilBuy(unlock.price) > 0">
              획득까지 시간: {{ timeDisplayShort(timeUntilBuy(unlock.price)) }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-enslaved-run-description-line {
  margin-bottom: 1rem;
}

.l-fixed-setting {
  cursor: pointer;
  pointer-events: none;
  filter: brightness(70%);
}
</style>