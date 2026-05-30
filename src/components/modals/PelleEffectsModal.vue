<script>
import ModalWrapper from "@/components/modals/ModalWrapper";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "PelleEffectsModal",
  components: {
    PrimaryButton,
    ModalWrapper,
  },
  computed: {
    nerfs() {
      return [
        // Numerical nerfs and disabled boosts
        "펠레 업그레이드를 통해 해금된 모든 것은 정상적으로 해금될 수 없습니다",
        "모든 파멸 전 IP 및 EP 승수가 비활성화됩니다",
        "가장 빠른 무한성 속도를 기반으로 한 IP 생성이 비활성화됩니다",
        "모든 파멸 전 복제체 속도 승수가 비활성화됩니다",
        `복제체는 ${format(Number.MAX_VALUE, 2)} 이상에서 훨씬 더 느리게 진행됩니다`,
        "대부분의 영원 도전이 더 어려워집니다",
        `모든 갤럭시는 ${formatPercents(0.5)}만큼만 효과적입니다`,
        `반물질 차원 승수는 ${formatInt(10)}으로 나뉩니다`,
        "업적 승수 및 많은 업적 보상이 비활성화됩니다",
        "모든 무한 및 영원 승수와 생성이 비활성화됩니다",
        "검은 구멍이 비활성화됩니다",
        `현실 업그레이드 "시간 초월"이 비활성화됩니다`,

        // Initial QoL and automation
        "업적 21을 제외한 시작 자원을 증가시키는 모든 보상이 비활성화됩니다",
        "자원이 리셋되는 것을 방지하는 모든 보상이 비활성화됩니다",
        "해금 비용을 줄이는 특혜 보상은 ECR 그룹을 제외하고 비활성화되었습니다",
        "자동 무한 및 영원 도전이 비활성화됩니다",
        "모든 차원 및 무한 전 자동 구매자는 펠레를 통해 재획득할 때까지 비활성화됩니다",
        "시간 이론 자동 구매자가 비활성화됩니다",
        "시간 팽창 이후와 관련된 모든 자동화가 비활성화됩니다",

        // Time studies + Dilation
        "일 수를 기반으로 시간 차원으로의 영원 업그레이드는 이 아마겟돈 시간을 기반으로 합니다",
        `${formatX(2)} 구매 가능을 제외한 모든 파멸 전 팽창된 시간 승수가 비활성화됩니다`,
        "모든 타키온 입자 승수가 비활성화됩니다",
        "팽창 업그레이드를 제외한 모든 파멸 전 시간 이론 생성 효과가 비활성화됩니다",

        // Glyphs
        "글리프 장착이 재획득할 때까지 비활성화됩니다",
        `글리프 레벨이 낮아지고 희귀도가 ${formatPercents(0)}으로 설정됩니다`,
        "글리프 희생, 변형, 연금술의 효과가 모두 비활성화됩니다",

        // Celestial features
        "다른 셀레스티얼 현실에 진입할 수 없습니다",
        "음악 글리프를 구매할 수 없습니다",
        "에파리그의 모든 보상이 비활성화됩니다",
        "시간 저장과 관련된 모든 기능이 비활성화됩니다",
        "V의 모든 보상이 비활성화됩니다",
        `라의 테레사 레벨 ${formatInt(1)} 효과가 비활성화됩니다`,
        "무한 업그레이드를 충전할 수 없습니다",
        "삼중항 연구 및 우주 이론이 비활성화됩니다",
        "상상 업그레이드는 DMD 및 셀레스티얼 해금과 관련된 것을 제외하고 비활성화됩니다",
        "연속체 및 특이점 보상이 비활성화됩니다"
      ];
    }
  }
};
</script>

<template>
  <ModalWrapper>
    <template #header>
      파멸에서 비활성화되고 약화된 효과 목록
    </template>
    <div class="pelle-effects-container">
      <p
        v-for="(nerf, idx) in nerfs"
        :key="idx"
      >
        {{ nerf }}
      </p>
    </div>
    <PrimaryButton
      class="o-primary-btn--width-medium c-modal-message__okay-btn c-modal__confirm-btn"
      @click="emitClose"
    >
      확인
    </PrimaryButton>
  </ModalWrapper>
</template>

<style scoped>
.pelle-effects-container {
  overflow-y: scroll;
  height: 40rem;
}

p {
  margin-bottom: 1rem;
}
</style>
