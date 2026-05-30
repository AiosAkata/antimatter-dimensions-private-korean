<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "AntimatterGalaxyModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    bulk: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      newGalaxies: 0,
      keepAntimatter: false,
      perkANRBought: false,
      keepDimBoost: false
    };
  },
  computed: {
    topLabel() {
      if (this.bulk) return `${quantifyInt("반물질 갤럭시", this.newGalaxies)}를 구매하려고 합니다`;
      return `반물질 갤럭시를 구매하려고 합니다`;
    },
    message() {
      const resetResouces = [];
      if (Pelle.isDoomed) resetResouces.push("반물질", "반물질 차원", "Tickspeed");
      if (!this.perkANRBought) resetResouces.push("반물질 차원", "Tickspeed");
      if (!this.keepDimBoost) resetResouces.push("차원 부스트");
      if (!this.keepAntimatter && !this.perkANRBought) resetResouces.push("반물질");
      const resetList = makeEnumeration(resetResouces);
      let tickspeedFixed = "";
      if (InfinityChallenge(3).isRunning) {
        tickspeedFixed = `무한 도전 ${InfinityChallenge(3).id}`;
      } else if (Ra.isRunning) {
        tickspeedFixed = `${Ra.displayName}의 현실`;
      }
      const tickspeedInfo = (tickspeedFixed === "")
        ? "Tickspeed 업그레이드에 약간의 부스트가 적용됩니다."
        : `${tickspeedFixed}에 있기 때문에 Tickspeed 업그레이드의 부스트가 적용되지 않습니다.`;
      const message = (resetList === "")
        ? `이 작업은 아무것도 초기화하지 않으며, ${tickspeedInfo}`
        : `이 작업은 ${resetList}를 초기화합니다. 그러나 ${tickspeedInfo}`;

      if (this.bulk) return `${quantifyInt("반물질 갤럭시", this.newGalaxies)}를 구매하시겠습니까? ${message}`;
      return `반물질 갤럭시를 구매하시겠습니까? ${message}`;
    }
  },
  created() {
    this.on$(GAME_EVENT.DIMBOOST_AFTER, () =>
      (BreakInfinityUpgrade.autobuyMaxDimboosts.isBought ? undefined : this.emitClose()));
  },
  methods: {
    update() {
      if (this.bulk) {
        const req = Galaxy.requirement;
        const dim = AntimatterDimension(req.tier);
        const bulk = bulkBuyBinarySearch(dim.totalAmount, {
          costFunction: x => Galaxy.requirementAt(x).amount,
          cumulative: false,
        }, player.galaxies);
        if (bulk) {
          this.newGalaxies = Galaxy.buyableGalaxies(Math.round(dim.totalAmount.toNumber())) - player.galaxies;
        }
      }
      this.keepAntimatter = Achievement(111).isUnlocked;
      this.perkANRBought = Perk.antimatterNoReset.canBeApplied;
      this.keepDimBoost = (Achievement(143).isUnlocked && !Pelle.isDoomed) ||
        PelleUpgrade.galaxyNoResetDimboost.canBeApplied;
    },
    handleYesClick() {
      requestGalaxyReset(this.bulk);
      EventHub.ui.offAll(this);
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="antimatterGalaxy"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ topLabel }}
    </template>

    <div class="c-modal-message__text">
      {{ message }}
    </div>
  </ModalWrapperChoice>
</template>
