<script>
import FullScreenAnimationHandler from "@/core/full-screen-animation-handler";

import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "ExitDilationModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      tachyonGain: new Decimal(0),
      isDoomed: false
    };
  },
  computed: {
    gainText() {
      if (this.tachyonGain.lte(0)) return `아무것도 획득하지 않습니다`;
      return `${quantify("타키온 입자", this.tachyonGain, 2, 1)}를 획득합니다`;
    },
    isInEC() {
      return Player.anyChallenge instanceof EternityChallengeState;
    },
    confirmText() {
      return this.isDoomed ? "확인" : "퇴출";
    }
  },
  methods: {
    update() {
      // We force-close the modal if dilation is inactive because there are a few edge cases which allow it to be
      // opened while switching between dilated/regular. The only thing this results in is an incorrect TP gain value
      if (!player.dilation.active) this.emitClose();
      this.tachyonGain.copyFrom(getTachyonGain(true));
      this.isDoomed = Pelle.isDoomed;
    },
    handleYesClick() {
      if (!player.dilation.active) return;
      const playAnimation = player.options.animations.dilation && !FullScreenAnimationHandler.isDisplaying;
      if (playAnimation) {
        animateAndUndilate();
      } else {
        eternity(false, false, { switchingDilation: true });
      }
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="dilation"
    @confirm="handleYesClick"
  >
    <template #header>
      <span v-if="isDoomed">
        운명이 정해진 상태에서는 팽창을 빠져나갈 수 없습니다
      </span>
      <span v-else>
        당신은 팽창을 빠져나갈 준비가 되어있습니다
      </span>
    </template>
    <div class="c-modal-message__text">
      <span v-if="isDoomed">
        팽창은 영구적입니다. 당신은 {{ gainText }}하고 현재 영원을 초기화할 것입니다.
      </span>
      <span v-else>
        지금 팽창을 빠져나가면 당신은 {{ gainText }}.
      </span>
      <div v-if="isInEC">
        또한 현재 영원 도전도 빠져나갈 것입니다.
      </div>
      <br>
      진행하시겠습니까?
    </div>
    <template #confirm-text>
      {{ confirmText }}
    </template>
  </ModalWrapperChoice>
</template>
