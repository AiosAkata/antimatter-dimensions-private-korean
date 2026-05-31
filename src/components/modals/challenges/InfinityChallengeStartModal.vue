<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "InfinityChallengeStartModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    challenge() {
      return InfinityChallenge(this.id);
    },
    challengeIsCompleted() {
      return this.challenge.isCompleted;
    },
    message() {
      return `빅 크런치(가능한 경우)를 수행하고 도전의 모든 제한 및 수정 사항이 활성화된 상태로 새 무한을 시작합니다.
    도전을 완료${this.challengeIsCompleted ? "" : "하고 보상을 받으"}려면,
    도전 목표인 ${format(InfinityChallenge(this.id).goal)} 반물질에 도달해야 합니다.
    업그레이드에 관계없이 차원 부스트나 갤럭시 없이 시작합니다.`;
    },
    entranceLabel() {
      return `무한 도전 ${this.id}에 입장하려고 합니다`;
    },
    reward() {
      let rewardDescription = this.challenge._config.reward.description;
      if (typeof rewardDescription === "function") {
        rewardDescription = rewardDescription();
      }
      return `이 도전의 보상: ${rewardDescription}`;
    },
    condition() {
      let conditionOfChallenge = this.challenge._config.description;
      if (typeof conditionOfChallenge === "function") {
        conditionOfChallenge = conditionOfChallenge();
      }
      return `이 무한 도전 안에서는, ${conditionOfChallenge}`;
    }
  },
  created() {
    this.on$(GAME_EVENT.ETERNITY_RESET_AFTER, this.emitClose);
    this.on$(GAME_EVENT.REALITY_RESET_AFTER, this.emitClose);
  },
  methods: {
    handleYesClick() {
      this.challenge.start();
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="challenges"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ entranceLabel }}
    </template>
    <div class="c-modal-message__text">
      {{ message }}
      <br><br>
      {{ condition }}
    </div>
    <div
      v-if="!challengeIsCompleted"
      class="c-modal-message__text"
    >
      <br>
      {{ reward }}
    </div>
    <template #confirm-text>
      시작
    </template>
  </ModalWrapperChoice>
</template>
