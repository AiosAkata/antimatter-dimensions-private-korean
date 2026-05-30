<script>
import PrimaryButton from "@/components/PrimaryButton";
import TimeDimensionRow from "./ClassicTimeDimensionRow";

export default {
  name: "ClassicTimeDimensionsTab",
  components: {
    PrimaryButton,
    TimeDimensionRow
  },
  data() {
    return {
      totalUpgrades: 0,
      multPerTickspeed: 0,
      tickspeedSoftcap: 0,
      timeShards: new Decimal(0),
      upgradeThreshold: new Decimal(0),
      shardsPerSecond: new Decimal(0),
      incomeType: "",
      areAutobuyersUnlocked: false,
      showLockedDimCostNote: true,
    };
  },
  computed: {
    costIncreases: () => TimeDimension(1).costIncreaseThresholds,
  },
  methods: {
    update() {
      this.showLockedDimCostNote = !TimeDimension(8).isUnlocked && player.realities >= 1;
      this.totalUpgrades = player.totalTickGained;
      this.multPerTickspeed = FreeTickspeed.multToNext;
      this.tickspeedSoftcap = FreeTickspeed.softcap;
      this.timeShards.copyFrom(Currency.timeShards);
      this.upgradeThreshold.copyFrom(FreeTickspeed.fromShards(Currency.timeShards.value).nextShards);
      this.shardsPerSecond.copyFrom(TimeDimension(1).productionPerRealSecond);
      this.incomeType = EternityChallenge(7).isRunning ? "Eighth Infinity Dimensions" : "Time Shards";
      this.areAutobuyersUnlocked = Autobuyer.timeDimension(1).isUnlocked;
    },
    maxAll() {
      tryUnlockTimeDimensions();
      maxAllTimeDimensions();
    },
    toggleAllAutobuyers() {
      toggleAllTimeDims();
    }
  }
};
</script>

<template>
  <div class="l-time-dim-tab l-centered-vertical-tab">
    <div class="c-subtab-option-container">
      <PrimaryButton
        class="o-primary-btn--subtab-option"
        @click="maxAll"
      >
        모두 최대
      </PrimaryButton>
      <PrimaryButton
        v-if="areAutobuyersUnlocked"
        class="o-primary-btn--subtab-option"
        @click="toggleAllAutobuyers"
      >
        모든 자동구매기 전환
      </PrimaryButton>
    </div>
    <div>
      <p>
        당신은
        <span class="c-time-dim-description__accent">{{ format(timeShards, 2, 1) }}</span> 시간 조각에서
        <span class="c-time-dim-description__accent">{{ formatInt(totalUpgrades) }}</span>개의 틱속도 업그레이드를 획득했습니다.
      </p>
      <p>
        다음 틱속도 업그레이드는
        <span class="c-time-dim-description__accent">{{ format(upgradeThreshold, 2, 1) }}</span>에서이고,
        <span class="c-time-dim-description__accent">{{ formatX(multPerTickspeed, 2, 2) }}</span>씩 증가합니다
        획득한 틱속도 업그레이드마다.
      </p>
    </div>
    <div>
      각 추가 업그레이드의 요구량은 {{ formatInt(tickspeedSoftcap) }}개 틱속도 업그레이드 이상에서 증가하기 시작합니다.
    </div>
    <div>
      당신은 초당 {{ format(shardsPerSecond, 2, 0) }}개의 {{ incomeType }}을 얻고 있습니다.
    </div>
    <div class="l-dimensions-container">
      <TimeDimensionRow
        v-for="tier in 8"
        :key="tier"
        :tier="tier"
        :are-autobuyers-unlocked="areAutobuyersUnlocked"
      />
    </div>
    <div>
      시간 차원 비용은 {{ format(costIncreases[0], 2, 2) }}개와
      {{ format(costIncreases[1]) }}개 영원 포인트에서 증가하고,
      <br>
      {{ format(costIncreases[2]) }}개 영원 포인트 이후에 훨씬 빠르게 증가합니다.
      <br>
      <div v-if="showLockedDimCostNote">
        시프트를 누르고 있으면 잠금 해제된 시간 차원의 영원 포인트 비용을 볼 수 있습니다.
      </div>
      {{ format(1e8) }} 이상에서 구매된 8번째 시간 차원은 배율을 더 이상 증가시키지 않습니다.
    </div>
  </div>
</template>
