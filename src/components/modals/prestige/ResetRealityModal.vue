<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "ResetRealityModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      isDoomed: false,
      canReality: false,
    };
  },
  computed: {
    resetTerm() { return this.isDoomed ? "Armageddon" : "Reality"; },
  },
  methods: {
    update() {
      this.isDoomed = Pelle.isDoomed;
      this.canReality = isRealityAvailable();
    },
    handleYesClick() {
      beginProcessReality(getRealityProps(true));
      EventHub.ui.offAll(this);
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="resetReality"
    @confirm="handleYesClick"
  >
    <template #header>
      당신의 {{ resetTerm }}을(를) 리셋하려고 합니다
    </template>
    <div class="c-modal-message__text">
      이것은 당신을 {{ resetTerm }}의 시작으로 리셋하고
      현재 {{ resetTerm }}의 진행으로부터 보상을 받지 않습니다.
      <br>
      <br>
      정말로 이 작업을 수행하시겠습니까?
      <div
        v-if="canReality"
        class="c-has-rewards"
      >
        <br>
        현재 현실의 모든 정상 보상을 완료할 수 있으며, 여기서 리셋하면 받지 않을 것입니다.
        보상을 받으려면 "새로운 현실 만들기" 버튼을 사용하세요.
      </div>
      <br>
    </div>
    <template #confirm-text>
      리셋
    </template>
  </ModalWrapperChoice>
</template>

<style scoped>
.c-has-rewards {
  font-weight: bold;
  font-size: 1.5rem;
  color: var(--color-bad);
}
</style>
