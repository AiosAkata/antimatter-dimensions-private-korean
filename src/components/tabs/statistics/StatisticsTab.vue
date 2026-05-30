<script>
import { MatterScale } from "./matter-scale";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "StatisticsTab",
  components: {
    PrimaryButton
  },
  data() {
    return {
      isDoomed: false,
      realTimeDoomed: TimeSpan.zero,
      totalAntimatter: new Decimal(0),
      realTimePlayed: TimeSpan.zero,
      timeSinceCreation: 0,
      uniqueNews: 0,
      totalNews: 0,
      secretAchievementCount: 0,
      infinity: {
        isUnlocked: false,
        count: new Decimal(0),
        banked: new Decimal(0),
        projectedBanked: new Decimal(0),
        bankRate: new Decimal(0),
        hasBest: false,
        best: TimeSpan.zero,
        this: TimeSpan.zero,
        thisReal: TimeSpan.zero,
        bestRate: new Decimal(0),
      },
      eternity: {
        isUnlocked: false,
        count: new Decimal(0),
        hasBest: false,
        best: TimeSpan.zero,
        this: TimeSpan.zero,
        thisReal: TimeSpan.zero,
        bestRate: new Decimal(0),
      },
      reality: {
        isUnlocked: false,
        count: 0,
        best: TimeSpan.zero,
        bestReal: TimeSpan.zero,
        this: TimeSpan.zero,
        thisReal: TimeSpan.zero,
        totalTimePlayed: TimeSpan.zero,
        bestRate: new Decimal(0),
        bestRarity: 0,
      },
      matterScale: [],
      lastMatterTime: 0,
      paperclips: 0,
      fullTimePlayed: 0,
    };
  },
  computed: {
    // These are here to avoid extra spaces in-game pre-reality and to get around codefactor 120-char limits in the
    // HTML template due to the fact that adding a linebreak also adds a space
    infinityCountString() {
      const num = this.infinity.count;
      return num.gt(0)
        ? `${this.formatDecimalAmount(num)} ${pluralize("무한", num.floor())}`
        : "무한이 없음";
    },
    eternityCountString() {
      const num = this.eternity.count;
      return num.gt(0)
        ? `${this.formatDecimalAmount(num)} ${pluralize("영원", num.floor())}`
        : "영원이 없음";
    },
    fullGameCompletions() {
      return player.records.fullGameCompletions;
    },
    startDate() {
      return Time.toDateTimeString(player.records.gameCreatedTime);
    },
    saveAge() {
      return TimeSpan.fromMilliseconds(this.timeSinceCreation);
    },
  },
  methods: {
    update() {
      const records = player.records;
      this.totalAntimatter.copyFrom(records.totalAntimatter);
      this.realTimePlayed.setFrom(records.realTimePlayed);
      this.fullTimePlayed = TimeSpan.fromMilliseconds(records.previousRunRealTime + records.realTimePlayed);
      this.uniqueNews = NewsHandler.uniqueTickersSeen;
      this.totalNews = player.news.totalSeen;
      this.secretAchievementCount = SecretAchievements.all.filter(a => a.isUnlocked).length;
      this.timeSinceCreation = Date.now() - player.records.gameCreatedTime;

      const progress = PlayerProgress.current;
      const isInfinityUnlocked = progress.isInfinityUnlocked;
      const infinity = this.infinity;
      const bestInfinity = records.bestInfinity;
      infinity.isUnlocked = isInfinityUnlocked;
      if (isInfinityUnlocked) {
        infinity.count.copyFrom(Currency.infinities);
        infinity.banked.copyFrom(Currency.infinitiesBanked);
        infinity.projectedBanked = new Decimal(0).plusEffectsOf(
          Achievement(131).effects.bankedInfinitiesGain,
          TimeStudy(191)
        );
        infinity.bankRate = infinity.projectedBanked.div(Math.clampMin(33, records.thisEternity.time)).times(60000);
        infinity.hasBest = bestInfinity.time < 999999999999;
        infinity.best.setFrom(bestInfinity.time);
        infinity.this.setFrom(records.thisInfinity.time);
        infinity.bestRate.copyFrom(bestInfinity.bestIPminEternity);
      }

      const isEternityUnlocked = progress.isEternityUnlocked;
      const eternity = this.eternity;
      const bestEternity = records.bestEternity;
      eternity.isUnlocked = isEternityUnlocked;
      if (isEternityUnlocked) {
        eternity.count.copyFrom(Currency.eternities);
        eternity.hasBest = bestEternity.time < 999999999999;
        eternity.best.setFrom(bestEternity.time);
        eternity.this.setFrom(records.thisEternity.time);
        eternity.bestRate.copyFrom(bestEternity.bestEPminReality);
      }

      const isRealityUnlocked = progress.isRealityUnlocked;
      const reality = this.reality;
      const bestReality = records.bestReality;
      reality.isUnlocked = isRealityUnlocked;

      if (isRealityUnlocked) {
        reality.count = Math.floor(Currency.realities.value);
        reality.best.setFrom(bestReality.time);
        reality.bestReal.setFrom(bestReality.realTime);
        reality.this.setFrom(records.thisReality.time);
        reality.totalTimePlayed.setFrom(records.totalTimePlayed);
        // Real time tracking is only a thing once reality is unlocked:
        infinity.thisReal.setFrom(records.thisInfinity.realTime);
        infinity.bankRate = infinity.projectedBanked.div(Math.clampMin(33, records.thisEternity.realTime)).times(60000);
        eternity.thisReal.setFrom(records.thisEternity.realTime);
        reality.thisReal.setFrom(records.thisReality.realTime);
        reality.bestRate.copyFrom(bestReality.RMmin);
        reality.bestRarity = Math.max(strengthToRarity(bestReality.glyphStrength), 0);
      }
      this.updateMatterScale();

      this.isDoomed = Pelle.isDoomed;
      this.realTimeDoomed.setFrom(player.records.realTimeDoomed);
      this.paperclips = player.news.specialTickerData.paperclips;
    },
    formatDecimalAmount(value) {
      return value.gt(1e9) ? format(value, 3) : formatInt(Math.floor(value.toNumber()));
    },
    // Only updates once per second to reduce jitter
    updateMatterScale() {
      if (Date.now() - this.lastMatterTime > 1000) {
        this.matterScale = MatterScale.estimate(Currency.antimatter.value);
        this.lastMatterTime = Date.now();
      }
    },
    realityClassObject() {
      return {
        "c-stats-tab-title": true,
        "c-stats-tab-reality": !this.isDoomed,
        "c-stats-tab-doomed": this.isDoomed,
      };
    }
  },
};
</script>

<template>
  <div class="c-stats-tab">
    <div>
      <PrimaryButton onclick="Modal.catchup.show(0)">
        내용 요약 보기
      </PrimaryButton>
      <div class="c-stats-tab-title c-stats-tab-general">
        일반
      </div>
      <div class="c-stats-tab-general">
        <div>총 {{ format(totalAntimatter, 2, 1) }}의 반물질을 생성했습니다.</div>
        <div>{{ realTimePlayed }} 동안 플레이했습니다. (실제 시간)</div>
        <div v-if="reality.isUnlocked">
          당신의 존재는 {{ reality.totalTimePlayed }}의 시간에 걸쳐 있습니다. (게임 시간)
        </div>
        <div>
          저장 파일이 {{ startDate }}에 생성되었습니다 ({{ saveAge }} 전)
        </div>
        <br>
        <div>
          총 {{ quantifyInt("뉴스 메시지", totalNews) }}를 봤습니다.
        </div>
        <div>
          {{ quantifyInt("고유한 뉴스 메시지", uniqueNews) }}를 봤습니다.
        </div>
        <div>
          {{ quantifyInt("비밀 업적", secretAchievementCount) }}을 해제했습니다.
        </div>
        <div v-if="paperclips">
          {{ quantifyInt("쓸모없는 종이 클립", paperclips) }}을 가지고 있습니다.
        </div>
        <div v-if="fullGameCompletions">
          <br>
          <b>
            전체 게임을 {{ quantifyInt("번", fullGameCompletions) }} 완료했습니다.
            <br>
            모든 플레이스루에서 {{ fullTimePlayed }} 동안 플레이했습니다.
          </b>
        </div>
      </div>
      <div>
        <br>
        <div class="c-matter-scale-container c-stats-tab-general">
          <div
            v-for="(line, i) in matterScale"
            :key="i"
          >
            {{ line }}
          </div>
          <br v-if="matterScale.length < 2">
          <br v-if="matterScale.length < 3">
        </div>
      </div>
      <br>
    </div>
    <div
      v-if="infinity.isUnlocked"
      class="c-stats-tab-subheader c-stats-tab-general"
    >
      <div class="c-stats-tab-title c-stats-tab-infinity">
        무한
      </div>
      <div>
        {{ infinityCountString }}<span v-if="eternity.isUnlocked">을 이번 영원에서 달성했습니다</span><span v-else>을 달성했습니다</span>.
      </div>
      <div v-if="infinity.banked.gt(0)">
        {{ formatDecimalAmount(infinity.banked.floor()) }}의
        {{ pluralize("저장된 무한", infinity.banked.floor()) }}을 가지고 있습니다.
      </div>
      <div v-if="infinity.hasBest">
        가장 빠른 무한은 {{ infinity.best.toStringShort() }}입니다.
      </div>
      <div v-else>
        가장 빠른 무한 기록이 없습니다<span v-if="eternity.isUnlocked"> (이번 영원에서)</span>.
      </div>
      <div>
        이번 무한에서 {{ infinity.this.toStringShort() }}를 소비했습니다.
        <span v-if="reality.isUnlocked">
          ({{ infinity.thisReal.toStringShort() }} 실제 시간)
        </span>
      </div>
      <div>
        최고 무한 포인트 분당 획득률<span v-if="eternity.count.gt(0)">(이번 영원)</span>은 {{ format(infinity.bestRate, 2, 2) }}입니다.
      </div>
      <br>
    </div>
    <div
      v-if="eternity.isUnlocked"
      class="c-stats-tab-subheader c-stats-tab-general"
    >
      <div class="c-stats-tab-title c-stats-tab-eternity">
        영원
      </div>
      <div>
        {{ eternityCountString }}<span v-if="reality.isUnlocked">을 이번 현실에서 달성했습니다</span><span v-else>을 달성했습니다</span>.
      </div>
      <div v-if="infinity.projectedBanked.gt(0)">
        영원으로 {{ formatDecimalAmount(infinity.projectedBanked.floor()) }}의
        {{ pluralize("저장된 무한", infinity.projectedBanked.floor()) }}을 획득할 것입니다
        (분당 {{ formatDecimalAmount(infinity.bankRate) }}).
      </div>
      <div v-else-if="infinity.banked.gt(0)">
        영원으로 저장된 무한을 획득하지 못할 것입니다.
      </div>
      <div v-if="eternity.hasBest">
        가장 빠른 영원은 {{ eternity.best.toStringShort() }}입니다.
      </div>
      <div v-else>
        가장 빠른 영원 기록이 없습니다<span v-if="reality.isUnlocked"> (이번 현실에서)</span>.
      </div>
      <div>
        이번 영원에서 {{ eternity.this.toStringShort() }}를 소비했습니다.
        <span v-if="reality.isUnlocked">
          ({{ eternity.thisReal.toStringShort() }} 실제 시간)
        </span>
      </div>
      <div>
        최고 영원 포인트 분당 획득률<span v-if="reality.isUnlocked">(이번 현실)</span>은 {{ format(eternity.bestRate, 2, 2) }}입니다.
      </div>
      <br>
    </div>
    <div
      v-if="reality.isUnlocked"
      class="c-stats-tab-subheader c-stats-tab-general"
    >
      <div :class="realityClassObject()">
        {{ isDoomed ? "파멸한 현실" : "현실" }}
      </div>
      <div>{{ quantifyInt("현실", reality.count) }}을 달성했습니다.</div>
      <div>가장 빠른 게임 시간 현실은 {{ reality.best.toStringShort() }}입니다.</div>
      <div>가장 빠른 실제 시간 현실은 {{ reality.bestReal.toStringShort() }}입니다.</div>
      <div :class="{ 'c-stats-tab-doomed' : isDoomed }">
        이번 {{ isDoomed ? "아마겟돈" : "현실" }}에서 {{ reality.this.toStringShort() }}를 소비했습니다.
        ({{ reality.thisReal.toStringShort() }} 실제 시간)
      </div>
      <div
        v-if="isDoomed"
        class="c-stats-tab-doomed"
      >
        {{ realTimeDoomed.toStringShort() }} 동안 파멸 상태입니다 (실제 시간).
      </div>
      <div>
        최고 현실 기계 분당 획득률은 {{ format(reality.bestRate, 2, 2) }}입니다.
      </div>
      <div>최고 글리프 희귀도는 {{ formatRarity(reality.bestRarity) }}입니다.</div>
      <br>
    </div>
  </div>
</template>

<style scoped>
.c-matter-scale-container {
  height: 5rem;
}

.c-stats-tab-general {
  color: var(--color-text);
}

.c-stats-tab-title {
  font-size: 2rem;
  font-weight: bold;
}

.c-stats-tab-subheader {
  height: 15rem;
}

.c-stats-tab-infinity {
  color: var(--color-infinity);
}

.c-stats-tab-eternity {
  color: var(--color-eternity);
}

.c-stats-tab-reality {
  color: var(--color-reality);
}

.c-stats-tab-doomed {
  color: var(--color-pelle--base);
}
</style>