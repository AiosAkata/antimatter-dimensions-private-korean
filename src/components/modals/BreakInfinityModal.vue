<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "BreakInfinityModal",
  components: {
    ModalWrapperChoice
  },
  computed: {
    message() {
      const infinity = formatPostBreak(Number.MAX_VALUE, 2);
      return `무한을 돌파하면 ${infinity}을 넘어선 반물질을 획득할 수 있습니다${PlayerProgress.eternityUnlocked()
        ? "." : `. 또한 ${infinity}을 넘어선 숫자를 읽을 수 있게 됩니다.`}
        차원과 틱스피드 업그레이드는 ${infinity} 반물질 이후에 비용이 더 빠르게 증가합니다.
        빅 크런치에서 ${infinity}을 넘어 생산한 반물질을 기반으로 추가 무한 포인트를 획득합니다.\
        ${EternityMilestone.keepAutobuyers.isReached ? "" : `\n또한 무한 돌파 업그레이드를 해금하고 모든\
        일반 도전 자동 구매기를 최대로 설정합니다.`}`.split("\n");
    },
  },
  methods: {
    handleYesClick() {
      breakInfinity();
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    :show-cancel="false"
    @confirm="handleYesClick"
  >
    <template #header>
      무한을 돌파하고 있습니다
    </template>
    <div class="c-modal-message__text">
      <span
        v-for="(line, index) in message"
        :key="index"
      >
        {{ line }} <br>
      </span>
    </div>
    <template #confirm-text>
      돌파
    </template>
  </ModalWrapperChoice>
</template>
