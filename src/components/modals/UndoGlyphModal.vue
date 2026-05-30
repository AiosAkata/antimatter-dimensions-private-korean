<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "UndoGlyphModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      showStoredGameTime: false,
    };
  },
  methods: {
    update() {
      this.showStoredGameTime = Enslaved.isUnlocked;
    },
    realityInvalidate() {
      this.emitClose();
      Modal.message.show("Glyph Undo can only undo with a Reality!",
        { closeEvent: GAME_EVENT.REALITY_RESET_AFTER });
    },
    handleYesClick() {
      this.emitClose();
      Glyphs.undo();
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="glyphUndo"
    @confirm="handleYesClick"
  >
    <template #header>
      글리프 장착을 취소하려고 합니다
    </template>
    <div
      class="c-modal-message__text c-text-wrapper"
    >
      마지막으로 장착한 글리프가 제거됩니다.
      현실이 리셋되지만 일부는 장착 시의 상태로 복구됩니다:
      <br>
      <div class="c-text-wrapper">
        <br>- 반물질, 무한 포인트, 영원 포인트
        <br>- 시간 팽창 업그레이드, 타키온 입자, 팽창된 시간
        <br>- 시간 이론 및 영원 도전 완료
        <br>- 시간 차원 및 현실 해금
        <br>- 현재 무한/영원/현실의 시간
        <span v-if="showStoredGameTime"><br>- 저장된 게임 시간</span>
      </div>
      <br>
      특정 항목에 대한 특수 요구사항을 무효화하면(예: 반물질 생성 없이 현실 완료에 대한 업적), 취소 후에도 유효하지 않은 상태로 유지됩니다. 이 경우 취소를 사용하지 않고 단일 현실에서 조건을 완료해야 합니다.
    </div>
  </ModalWrapperChoice>
</template>

<style scoped>
.c-text-wrapper {
  text-align: left;
}
</style>