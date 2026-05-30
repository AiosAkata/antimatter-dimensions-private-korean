<script>
import ResetModal from "@/components/modals/prestige/ResetModal";

export default {
  name: "EternityModal",
  components: {
    ResetModal
  },
  data() {
    return {
      exitingEC: false,
      startingIP: new Decimal(),
      gainedEternityPoints: new Decimal(),
      gainedEternities: new Decimal()
    };
  },
  computed: {
    message() {
      return PlayerProgress.eternityUnlocked()
        ? `영원은 성취도, 도전 기록, 그리고 통계 탭의 일반 헤더 아래의 모든 항목을 제외한 모든 것을 초기화합니다.`
        : `영원은 성취도, 도전 기록, 그리고 통계 탭의 일반 헤더 아래의 모든 항목을 제외한 모든 것을 초기화합니다. 또한 영원 포인트 1개를 획득하고 다양한 업그레이드를 해금합니다.`;
    },
    gainedEPOnEternity() {
      return `당신은 영원에서 ${quantify("영원", this.gainedEternities, 2)}과
      ${quantify("영원 포인트", this.gainedEternityPoints, 2)}를 획득할 것입니다.`;
    },
    startWithIP() {
      return this.startingIP.gt(0)
        ? `당신은 다음 영원을 ${quantify("무한 포인트", this.startingIP, 2)}으로 시작할 것입니다.`
        : ``;
    },
    eternityChallenge() {
      const ec = EternityChallenge.current;
      if (ec.isFullyCompleted) {
        return `영원 도전 ${ec.id}는 이미 완전히 완료되었습니다.`;
      }
      if (!Perk.studyECBulk.isBought) {
        return `영원 도전 ${ec.id}의 완료를 1회 획득할 것입니다.`;
      }
      const gainedCompletions = ec.gainedCompletionStatus.gainedCompletions;
      return `영원 도전 ${ec.id}에 대해 ${quantifyInt("회", gainedCompletions)} 완료를 획득할 것입니다.`;
    }
  },
  methods: {
    update() {
      this.exitingEC = EternityChallenge.isRunning;
      this.startingIP = Currency.infinityPoints.startingValue;
      this.gainedEternityPoints = gainedEternityPoints();
      this.gainedEternities = gainedEternities();
    },
    handleYesClick() {
      animateAndEternity();
      EventHub.ui.offAll(this);
    }
  },
};
</script>

<template>
  <ResetModal
    :header="exitingEC ? '영원 도전 완료' : '당신은 영원을 할 준비가 되어있습니다'"
    :message="message"
    :gained-resources="gainedEPOnEternity"
    :starting-resources="startWithIP"
    :confirm-fn="handleYesClick"
    :alternate-condition="exitingEC"
    :alternate-text="exitingEC ? eternityChallenge : undefined"
    confirm-option="eternity"
  />
</template>
