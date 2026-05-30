<script>
import FullScreenAnimationHandler from "@/core/full-screen-animation-handler";

import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "EnterDilationModal",
  components: {
    ModalWrapperChoice
  },
  computed: {
    message() {
      return `시간을 팽창하면 새로운 영원을 시작하고, 모든 차원 배율의 지수와
        틱속도 배율의 지수가 ${formatPow(0.75, 2, 2)}로 감소합니다. 팽창 중에 영원을 할 수 있다면,
        당신의 타키온 입자는 당신의 최고 반물질과 당신이 가진 타키온 입자
        배수에 기반한 값으로 증가할 것입니다.`;
    },
    entranceLabel() {
      return `당신은 팽창에 진입할 준비가 되어있습니다`;
    },
    EPSinceLabel() {
      if (player.dilation.lastEP.eq(-1)) {
        return "이것은 당신의 첫 번째 팽창입니다";
      }
      if (!isInCelestialReality() && Ra.unlocks.unlockDilationStartingTP.canBeApplied) {
        return `당신은 이미 Teresa의 레벨 ${formatInt(25)} 보상으로 인해
          달성할 수 있는 최대한의 타키온 입자를 가지고 있습니다.`;
      }
      return `당신이 마지막으로 팽창을 완료한 것은 ${format(player.dilation.lastEP, 2, 2)} 영원 포인트입니다.`;
    }
  },
  methods: {
    handleYesClick() {
      if (player.dilation.active) return;
      if (player.options.animations.dilation && !FullScreenAnimationHandler.isDisplaying) {
        // Strike trigger happens within the delayed dilation callback in this function
        animateAndDilate();
      } else {
        startDilatedEternity();
        if (Pelle.isDoomed) PelleStrikes.dilation.trigger();
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
      {{ entranceLabel }}
    </template>
    <div class="c-modal-message__text">
      {{ EPSinceLabel }}
      <br>
      <br>
      {{ message }}
    </div>
    <template #confirm-text>
      진입
    </template>
  </ModalWrapperChoice>
</template>
