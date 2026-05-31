<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "SpeedrunModeModal",
  components: {
    PrimaryButton,
    ModalWrapperChoice,
  },
  data() {
    return {
      onInfoPage: true,
      name: "",
      confirmPhrase: "",
    };
  },
  computed: {
    willStartRun() {
      return this.confirmPhrase === "Gotta Go Fast!";
    },
  },
  methods: {
    nextPage() {
      this.onInfoPage = false;
    },
    startRun() {
      if (!this.willStartRun) return;
      this.emitClose();
      Speedrun.prepareSave(Speedrun.generateName(this.name));
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    :show-cancel="!onInfoPage && !willStartRun"
    :show-confirm="!onInfoPage && willStartRun"
    confirm-class="o-primary-btn--width-medium c-modal-hard-reset-btn c-modal__confirm-btn"
    @confirm="startRun"
  >
    <template #header>
      스피드런 모드 진입
    </template>
    <div
      v-if="onInfoPage"
      class="c-modal-message__text"
    >
      이 모드는 게임의 특정 지점에 도달했을 때 추가적인 통계를 기록하는 세이브로 시작합니다.
      이 통계는 화면 오른쪽 하단과 통계 탭의 전용 서브탭에서 확인할 수 있습니다.
      <br>
      <br>
      거의 모든 애니메이션과 확인 메시지는 기본적으로 비활성화되어 있지만,
      해당 진행 구간에 도달하기 전까지 언제든지 설정을 변경할 수 있습니다.
      런을 시작하면 반물질이 변할 때까지 게임이 일시정지 상태로 유지되므로,
      시작 전에 모든 설정을 구성할 수 있습니다.
      최적화된 런을 위해 오랜 대기를 피하도록 일부 업적은 무료로 제공됩니다.
      <br>
      <br>
      <i>
        스피드런 모드에는 추가 콘텐츠가 없습니다.
      </i>
      <br>
      <br>
      <PrimaryButton
        class="o-primary-btn--width-medium c-modal-hard-reset-btn c-modal__confirm-btn"
        @click="nextPage"
      >
        계속
      </PrimaryButton>
    </div>
    <div
      v-else
      class="c-modal-message__text"
    >
      아래에 텍스트를 입력하여 스피드런 세이브에 이름을 붙일 수 있습니다.
      이름은 게임 플레이에 영향을 주지 않으며 이 세이브를 식별하는 용도로만 사용됩니다.
      이름을 입력하지 않으면 무작위 이름이 생성됩니다.
      타이머가 시작되기 전이라면 스피드런 정보 박스에서 이름을 클릭하여 변경할 수 있습니다.
      <input
        ref="name"
        v-model="name"
        type="text"
        class="c-modal-input c-modal-hard-reset__input"
        @keyup.esc="emitClose"
      >
      <br>
      <br>
      스피드런 세이브는 일반 세이브처럼 가져오기/내보내기할 수 있습니다.
      스피드런 세이브를 가져오면 세그먼트 런으로 표시됩니다.
      가져오기 없이 진행하면 싱글 세그먼트 런으로 유지됩니다.
      <br>
      <br>
      원하는 경우 런 시작 전에 옵션 탭에서 글리프 RNG 시드를 수정할 수 있습니다.
      <br>
      <br>
      <div class="c-modal-hard-reset-danger">
        스피드런을 시작하면 세이브가 게임 처음으로 초기화됩니다.
        풀게임 클리어 통계, 시각 설정, 오토메이터 스크립트, 글리프 코스메틱 등 일부는 유지되지만,
        그 외에는 엔딩 크레딧 화면에서 재시작을 선택한 것과 동일한 상태가 됩니다.
        확인하려면 아래에 "Gotta Go Fast!"를 입력하여 런을 (재)시작하세요.
      </div>
      <input
        ref="confirmPhrase"
        v-model="confirmPhrase"
        type="text"
        class="c-modal-input c-modal-hard-reset__input"
        @keyup.esc="emitClose"
      >
    </div>
    <template #confirm>
      런 시작!
    </template>
    <template #cancel>
      취소
    </template>
  </ModalWrapperChoice>
</template>
