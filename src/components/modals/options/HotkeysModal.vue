<script>
import ModalWrapper from "@/components/modals/ModalWrapper";

export default {
  name: "HotkeysModal",
  components: {
    ModalWrapper
  },
  data() {
    return {
      updateIndicies: [],
      visible: [],
      timeStudyUnlocked: false,
      glyphSacUnlocked: false,
      isElectron: false
    };
  },
  computed: {
    moreShiftKeyInfo() {
      const shiftKeyFunctions = [];
      if (this.timeStudyUnlocked) {
        shiftKeyFunctions.push("시간 연구를 구매할 때 그 지점까지 모두 구매하기");
        shiftKeyFunctions.push("시간 연구 트리 저장하기");
      }
      if (this.glyphSacUnlocked) {
        shiftKeyFunctions.push("글리프 정제하기");
      }
      const shiftKeyInfo = makeEnumeration(shiftKeyFunctions);
      return (shiftKeyInfo === "")
        ? ""
        : `Shift를 누르고 있을 수 있습니다 ${shiftKeyInfo}.`;
    },
    hotkeyCount() {
      return shortcuts.length;
    },
    shortcutNames() {
      return shortcuts.map(x => x.name);
    },
    shortcutKeys() {
      return shortcuts.map(x => x.keys.map(key => this.format(key)));
    }
  },
  created() {
    for (let i = 0; i < this.hotkeyCount; i++) {
      const visible = shortcuts[i].visible;
      if (typeof visible === "function") {
        this.updateIndicies.push(i);
      } else {
        this.visible[i] = visible;
      }
    }
  },
  methods: {
    update() {
      for (const index of this.updateIndicies) {
        this.$set(this.visible, index, shortcuts[index].visible());
      }
      const progress = PlayerProgress.current;
      this.timeStudyUnlocked = progress.isEternityUnlocked;
      this.glyphSacUnlocked = RealityUpgrade(19).isBought;

      // ElectronRuntime is a global which only exists on Steam (throws a ReferenceError on web)
      try {
        this.isElectron = ElectronRuntime.isActive;
      } catch {
        this.isElectron = false;
      }
    },
    format(x) {
      switch (x) {
        case "mod":
          return "CTRL/⌘";
        default:
          return x.toUpperCase();
      }
    }
  },
};
</script>

<template>
  <ModalWrapper>
    <template #header>
      단축키 목록
    </template>
    <span class="c-modal-hotkeys l-modal-hotkeys">
      <div class="l-modal-hotkeys__column">
        <div class="l-modal-hotkeys-row">
          <span class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name">1개 차원 구매</span>
          <kbd>SHIFT</kbd><kbd>1</kbd>-<kbd>SHIFT</kbd><kbd>8</kbd>
        </div>
        <div class="l-modal-hotkeys-row">
          <span class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name">10개 차원 구매</span>
          <kbd>1</kbd>-<kbd>8</kbd>
        </div>
        <div
          v-for="index in hotkeyCount"
          :key="index"
        >
          <span
            v-if="visible[index - 1]"
            class="l-modal-hotkeys-row"
          >
            <span class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name">{{ shortcutNames[index - 1] }}</span>
            <kbd
              v-for="(key, i) in shortcutKeys[index - 1]"
              :key="i"
            >
              {{ key }}
            </kbd>
          </span>
        </div>
      </div>
      <div class="l-modal-hotkeys__column l-modal-hotkeys__column--right">
        <div class="l-modal-hotkeys-row">
          <span class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name">수정자 키</span>
          <kbd>SHIFT</kbd>
        </div>
        <span class="c-modal-hotkeys__shift-description">
          Shift는 특정 항목에 대한 추가 정보를 표시하고 특정 버튼의 기능을 조정하는 수정자 키입니다.
          <br>
          {{ moreShiftKeyInfo }}
        </span>
        <br>
        <div class="l-modal-hotkeys-row">
          <span class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name">자동구매기 제어</span>
          <kbd>ALT</kbd>
        </div>
        <span class="c-modal-hotkeys__shift-description">
          Alt는 해당 자동구매기를 가진 모든 키와 함께 누르면 해당 자동구매기를 토글하는 수정자 키입니다.
          <br>
          Alt와 Shift를 함께 누르면 반물질 차원 및 틱 속도 자동구매기에 대해 단일 구매 또는 최대 구매를 토글할 수 있습니다.
        </span>
        <br>
        <div class="l-modal-hotkeys-row">
          <span class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name">탭 이동</span>
          <div>
            <kbd>←</kbd><kbd>↓</kbd><kbd>↑</kbd><kbd>→</kbd>
          </div>
        </div>
        <span class="c-modal-hotkeys__shift-description">
          화살표 키를 사용하면 게임의 페이지를 순환합니다.
          위/아래 화살표는 탭을 순환하고,
          왼쪽/오른쪽 화살표는 해당 탭의 서브탭을 순환합니다.
        </span>
        <br>
        <div class="l-modal-hotkeys-row">
          <span class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name">숫자판 지원</span>
        </div>
        <span class="c-modal-hotkeys__shift-description">
          기술적인 이유로 숫자판 키를 누르면 가능하면 10개의 차원을 구매하지만, <kbd>SHIFT</kbd>와 함께 숫자판 키를 누르면 단일 차원을 구매하지 않습니다. 대신 기기에 따라 페이지 스크롤이나 게임 탭 변경을 야기할 수 있습니다. <kbd>ALT</kbd>는 계속 예상대로 작동합니다.
        </span>
        <template v-if="isElectron">
          <br>
          <div class="l-modal-hotkeys-row">
            <span class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name">윈도우 줌</span>
            <kbd>-</kbd><kbd>0</kbd><kbd>+</kbd>
          </div>
          <span class="c-modal-hotkeys__shift-description">
            줌 레벨을 조정하려면 <kbd>ctrl</kbd>을 누르고 <kbd>-</kbd> 또는 <kbd>+</kbd>를 눌러 줌을 감소하거나 증가합니다. <kbd>ctrl</kbd><kbd>0</kbd>은 줌을 100%로 재설정합니다.
          </span>
          <br>
          <div class="l-modal-hotkeys-row">
            <span class="c-modal-hotkeys-row__name l-modal-hotkeys-row__name">전체 화면</span>
            <kbd>F10</kbd>
          </div>
          <span class="c-modal-hotkeys__shift-description">
            전체 화면으로 들어가거나 나가려면 <kbd>F10</kbd>을 누릅니다.
          </span>
        </template>
      </div>
    </span>
  </ModalWrapper>
</template>

<style scoped>
.l-modal-hotkeys__column {
  display: flex;
  flex-direction: column;
  width: 28rem;
}

.l-modal-hotkeys__column--right {
  margin-left: 1rem;
}

.c-modal-hotkeys {
  font-size: 1.25rem;
}

.l-modal-hotkeys {
  display: flex;
  flex-direction: row;
}

.l-modal-hotkeys-row {
  display: flex;
  flex-direction: row;
  line-height: 1.6rem;
  padding-bottom: 0.3rem;
}

.c-modal-hotkeys-row__name {
  text-align: left;
}

.l-modal-hotkeys-row__name {
  flex: 1 1 auto;
}

.c-modal-hotkeys__shift-description {
  text-align: left;
  font-size: 1rem;
}
</style>
