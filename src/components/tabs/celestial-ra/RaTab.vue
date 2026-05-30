<script>
import CelestialQuoteHistory from "@/components/CelestialQuoteHistory";
import RaPet from "./RaPet";
import RaPetRemembranceButton from "./RaPetRemembranceButton";

export default {
  name: "RaTab",
  components: {
    RaPet,
    RaPetRemembranceButton,
    CelestialQuoteHistory
  },
  data() {
    return {
      memoriesPerChunk: 0,
      showReality: false,
      isRaCapped: false,
      totalLevels: 0,
      showRemembrance: false,
      hasRemembrance: false,
      remembranceReq: 0,
      remembranceMult: 1,
      remembranceNerf: 1,
      petWithRemembrance: "",
      isRunning: false,
      memoryBoosts: "",
    };
  },
  computed: {
    laitelaUnlock: () => Laitela.isUnlocked,
    pets: () => [
      {
        pet: Ra.pets.teresa,
        scalingUpgradeVisible: () => Ra.unlocks.chargedInfinityUpgrades.isUnlocked,
        scalingUpgradeText: () => `${quantifyInt("무한 업그레이드", Ra.totalCharges)}를 충전할 수 있습니다.`,
      },
      {
        pet: Ra.pets.effarig,
        scalingUpgradeVisible: () => AlchemyResources.all.filter(r => r.isUnlocked).length > 0,
        scalingUpgradeText: () => {
          const resources = AlchemyResources.all.filter(r => r.isUnlocked).length;
          return `${quantifyInt("연금술 자원", resources)}을 해금했습니다.`;
        },
      },
      {
        pet: Ra.pets.enslaved,
        scalingUpgradeVisible: () => Ra.unlocks.improvedStoredTime.isUnlocked,
        scalingUpgradeText: () => `저장된 게임 시간
          ${formatX(Ra.unlocks.improvedStoredTime.effects.gameTimeAmplification.effectOrDefault(1), 2)} 및 실시간
          +${formatInt(Ra.unlocks.improvedStoredTime.effects.realTimeCap.effectOrDefault(0) / (1000 * 3600))} 시간`,
      },
      {
        pet: Ra.pets.v,
        scalingUpgradeVisible: () => Ra.unlocks.unlockHardV.isUnlocked,
        scalingUpgradeText: () => {
          const triadCount = Ra.unlocks.unlockHardV.effectOrDefault(0);
          return `${quantifyInt("삼원 연구", triadCount)}를 해금했습니다.`;
        },
      }
    ],
    petStyle() {
      return {
        color: (this.petWithRemembrance === "")
          ? "white"
          : this.pets.find(pet => pet.pet.name === this.petWithRemembrance).pet.color,
      };
    },
    runButtonClassObject() {
      return {
        "c-ra-run-button__icon": true,
        "c-ra-run-button__icon--running": this.isRunning,
        "c-celestial-run-button--clickable": !this.isDoomed,
        "o-pelle-disabled-pointer": this.isDoomed
      };
    },
    runDescription() {
      return GameDatabase.celestials.descriptions[4].effects().replace(/^\w/u, c => c.toUpperCase()).split("\n");
    },
    memoryDescription() {
      return `라의 현실 내에서 셀레스티얼 기억을 위한 기억 청크가
        특정 자원 양에 따라 생성됩니다.`;
    },
    isDoomed: () => Pelle.isDoomed,
  },
  methods: {
    update() {
      this.memoriesPerChunk = Ra.productionPerMemoryChunk;
      this.isRaCapped = Ra.totalPetLevel === 100;
      this.totalLevels = Ra.totalPetLevel;
      this.showRemembrance = Ra.unlocks.effarigUnlock.canBeApplied;
      this.hasRemembrance = Ra.remembrance.isUnlocked;
      this.remembranceReq = Ra.remembrance.requiredLevels;
      this.remembranceMult = Ra.remembrance.multiplier;
      this.remembranceNerf = Ra.remembrance.nerf;
      this.petWithRemembrance = Ra.petWithRemembrance;
      this.isRunning = Ra.isRunning;
      this.memoryBoosts = Ra.memoryBoostResources;
    },
    startRun() {
      if (this.isDoomed) return;
      Modal.celestials.show({ name: "Ra's", number: 4 });
    },
    toggleMode() {
      Ra.toggleMode();
    }
  },
};
</script>

<template>
  <div class="l-ra-celestial-tab">
    <div class="c-ra-memory-header">
      <CelestialQuoteHistory celestial="ra" />
      <div v-if="!isRaCapped">
        각 기억 청크는 초당 기본 1개의 기억을 생성합니다<span v-if="memoriesPerChunk > 1">,
          이는 초당 {{ quantify("기억", memoriesPerChunk, 2, 3) }}으로 증가했습니다</span>.
        <br>
        실시간 저장은 기억 청크 생성을 방지하지만 기억은 여전히 정상적으로 획득됩니다.
        <span v-if="memoriesPerChunk > 1">
          <br>
          이는 {{ memoryBoosts }}으로 인해 증가합니다.
        </span>
      </div>
      <div v-else>
        모든 기억이 반환되었습니다.
      </div>
    </div>
    <div>
      아래의 막대 아래 아이콘에 마우스를 올려 업그레이드 설명을 확인하세요,
      <br>
      그리고 <i class="fas fa-question-circle" /> 아이콘에 마우스를 올려 특정 자원 정보를 확인하세요.
    </div>
    <div class="l-ra-all-pets-container">
      <RaPet
        v-for="(pet, i) in pets"
        :key="i"
        :pet-config="pet"
      />
    </div>
    <div class="l-ra-non-pets">
      <button class="c-ra-run-button">
        <h2 :class="{ 'o-pelle-disabled': isDoomed }">
          <span v-if="isRunning">라의 현실에 있습니다 </span>
          <span v-else>라의 현실 시작 </span>
        </h2>
        <div
          :class="runButtonClassObject"
          @click="startRun"
        >
          <span class="c-ra-run-button__icon__sigil fas fa-sun" />
        </div>
        <span
          v-for="(line, lineId) in runDescription"
          :key="lineId + '-ra-run-desc'"
        >
          {{ line }}
        </span>
        <br>
        <span>
          {{ memoryDescription }}
        </span>
      </button>
      <div
        v-if="showRemembrance && !isRaCapped"
        class="c-ra-remembrance-unlock"
      >
        <h1 :style="petStyle">
          기억
        </h1>
        <span :style="petStyle">
          기억을 가진 셀레스티얼은 {{ formatX(remembranceMult) }} 기억 청크 획득을 얻습니다. 다른
          셀레스티얼은 {{ formatX(remembranceNerf, 1, 1) }} 기억 청크 획득을 얻습니다.
        </span>
        <div
          v-if="hasRemembrance"
          class="c-ra-remembrance-unlock-inner"
        >
          <RaPetRemembranceButton
            v-for="(pet, i) in pets"
            :key="i"
            :pet-config="pet"
          />
        </div>
        <div
          v-else
          class="c-ra-remembrance-unlock-inner"
        >
          총 {{ formatInt(remembranceReq) }}개의 셀레스티얼 기억 레벨을 획득하여 해금됨
          ({{ formatInt(remembranceReq - totalLevels) }}개가 더 필요함)
        </div>
      </div>
    </div>
  </div>
</template>
