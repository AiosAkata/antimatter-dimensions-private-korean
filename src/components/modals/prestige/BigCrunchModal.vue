<script>
import ResetModal from "@/components/modals/prestige/ResetModal";

export default {
  name: "BigCrunchModal",
  components: {
    ResetModal
  },
  data() {
    return {
      gainedInfinities: new Decimal(),
      gainedInfinityPoints: new Decimal(),
      startingBoosts: 0,
      startingAM: 10,
      willStartWithGalaxy: false
    };
  },
  computed: {
    isFirstInfinity() {
      return !PlayerProgress.infinityUnlocked();
    },
    message() {
      const info = this.isFirstInfinity ? this.firstInfinityInfo : ``;
      return `무한 돌파 시, 모든 차원, 차원 부스트, 반물질 갤럭시가 초기화됩니다. ${info}`;
    },
    firstInfinityInfo() {
      return `그 대신 무한 포인트(IP)를 획득합니다. 무한 탭에서 찾을 수 있는 여러 업그레이드를 구매할 수 있습니다. 통계 탭에 표시되는 통계인 무한을 한 개 획득하게 됩니다.`;
    },
    ipGainInfo() {
      return `${quantify("무한", this.gainedInfinities, 2, 0)}과 ${quantify("무한 포인트", this.gainedInfinityPoints, 2, 0)}을 획득합니다.`;
    },
    startingResources() {
      const gainedResources = [];
      if (this.startingAM.gte(10)) gainedResources.push(`${quantify("반물질", this.startingAM, 2, 1)}`);
      if (this.startingBoosts > 0) gainedResources.push(`${quantify("차원 부스트", this.startingBoosts)}`);
      if (this.willStartWithGalaxy) gainedResources.push(`${quantify("갤럭시", 1)}`);

      return `다음 무한 돌파는 ${makeEnumeration(gainedResources)}로 시작합니다.`;
    }
  },
  methods: {
    update() {
      this.gainedInfinities = gainedInfinities().round();
      this.gainedInfinityPoints = gainedInfinityPoints().round();
      this.startingBoosts = DimBoost.startingDimensionBoosts;
      this.startingAM = Currency.antimatter.startingValue;
      this.willStartWithGalaxy = InfinityUpgrade.skipResetGalaxy.isBought;
    },
    handleYesClick() {
      bigCrunchResetRequest();
      EventHub.ui.offAll(this);
      if (this.isFirstInfinity) {
        setTimeout(() => Modal.message.show(`이 애니메이션은 매번 수동으로 무한 돌파할 때마다 나타납니다. 비활성화하려면 옵션 탭에서 설정을 찾을 수 있습니다. 게임의 모든 시각 효과는 처음 한 번 본 후 비활성화할 수 있습니다.`, {}, 3), 2000);
      }
    }
  },
};
</script>

<template>
  <ResetModal
    header="무한 돌파를 진행하려고 합니다"
    :message="message"
    :gained-resources="ipGainInfo"
    :starting-resources="startingResources"
    :confirm-fn="handleYesClick"
    :alternate-condition="isFirstInfinity"
    :alternate-text="message"
    :confirm-option="isFirstInfinity ? undefined : 'bigCrunch'"
  />
</template>
