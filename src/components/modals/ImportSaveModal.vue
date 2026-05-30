<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";
import PrimaryButton from "@/components/PrimaryButton";

const OFFLINE_PROGRESS_TYPE = {
  IMPORTED: 0,
  LOCAL: 1,
  IGNORED: 2,
};

export default {
  name: "ImportSaveModal",
  components: {
    ModalWrapperChoice,
    PrimaryButton
  },
  data() {
    return {
      input: "",
      offlineImport: OFFLINE_PROGRESS_TYPE.IMPORTED,
    };
  },
  computed: {
    saveCheckString() {
      const save = GameSaveSerializer.deserialize(this.input);
      const rawString = GameStorage.checkPlayerObject(save);
      // 길이를 제한하여 특히 심한 오류의 경우 모달이 화면에 너무 커지지 않도록 합니다
      return rawString.length > 300 ? `${rawString.slice(0, 297)}...` : rawString;
    },
    player() {
      return this.saveCheckString === "" ? GameSaveSerializer.deserialize(this.input) : undefined;
    },
    progress() {
      return PlayerProgress.of(this.player);
    },
    fileName() {
      return this.player.options.saveFileName;
    },
    antimatter() {
      return this.player.antimatter || this.player.money;
    },
    infinities() {
      // Infinity count data is stored in either player.infinitied or player.infinities based on if the save is before
      // or after the reality update, and this explicit check is needed as it runs before any migration code.
      const infinityData = this.player.infinitied ? this.player.infinitied : this.player.infinities;
      return new Decimal(infinityData);
    },
    hasInput() {
      return this.input !== "";
    },
    inputIsValid() {
      return this.inputIsValidSave || this.inputIsSecret;
    },
    inputIsValidSave() {
      return this.player !== undefined;
    },
    inputIsSecret() {
      return isSecretImport(this.input) || Theme.isSecretTheme(this.input);
    },
    isFromFuture() {
      return this.player.lastUpdate > Date.now();
    },
    lastOpened() {
      const ms = Date.now() - this.player.lastUpdate;
      return this.isFromFuture
        ? `This save is from ${TimeSpan.fromMilliseconds(-ms).toString()} in the future.`
        : `This save was last opened ${TimeSpan.fromMilliseconds(ms).toString()} ago.`;
    },
    offlineType() {
      // We update here in the computed method instead of elsewhere because otherwise it initializes the text
      // to a wrong or undefined setting
      this.updateOfflineSettings();

      switch (this.offlineImport) {
        case OFFLINE_PROGRESS_TYPE.IMPORTED:
          return "가져온 저장 설정 사용";
        case OFFLINE_PROGRESS_TYPE.LOCAL:
          return "기존 저장 설정 사용";
        case OFFLINE_PROGRESS_TYPE.IGNORED:
          return "오프라인 시간을 시뮬레이션하지 않음";
        default:
          throw new Error("Unrecognized offline progress setting for importing");
      }
    },
    offlineDetails() {
      if (this.offlineImport === OFFLINE_PROGRESS_TYPE.IGNORED) {
        return `저장이 오프라인 진행 없이 가져와집니다.`;
      }
      if (!GameStorage.offlineEnabled) return "이 설정은 가져온 후 오프라인 진행을 적용하지 않습니다.";
      if (this.isFromFuture) return "일관되지 않은 시스템 시간으로 인해 오프라인 진행을 시뮬레이션할 수 없습니다.";

      const durationInMs = Date.now() - this.player.lastUpdate;
      const ticks = GameStorage.maxOfflineTicks(durationInMs);
      return `가져온 후, ${formatInt(ticks)}개의 지속 시간 틱을 시뮬레이션합니다
        각각 ${TimeSpan.fromMilliseconds(durationInMs / ticks).toStringShort()}입니다.`;
    },
    willLoseCosmetics() {
      const currSets = player.reality.glyphs.cosmetics.unlockedFromNG;
      const importedSets = this.player.reality?.glyphs.cosmetics?.unlockedFromNG ?? [];
      return currSets.filter(set => !importedSets.includes(set)).length > 0;
    },
    willLoseSpeedrun() {
      return player.speedrun.isUnlocked && !this.player.speedrun?.isUnlocked;
    }
  },
  mounted() {
    this.$refs.input.select();
  },
  destroyed() {
    // Explicitly setting this to undefined after closing forces the game to fall-back to the stored settings within
    // the player object if this modal is closed - ie. it makes sure actions in the modal don't persist
    GameStorage.offlineEnabled = undefined;
    GameStorage.offlineTicks = undefined;
  },
  methods: {
    changeOfflineSetting() {
      this.offlineImport = (this.offlineImport + 1) % 3;
    },
    updateOfflineSettings() {
      switch (this.offlineImport) {
        case OFFLINE_PROGRESS_TYPE.IMPORTED:
          // These are default values from a new save, used if importing from pre-reality where these props don't exist
          GameStorage.offlineEnabled = this.player.options.offlineProgress ?? true;
          GameStorage.offlineTicks = this.player.options.offlineTicks ?? 1e5;
          break;
        case OFFLINE_PROGRESS_TYPE.LOCAL:
          GameStorage.offlineEnabled = player.options.offlineProgress;
          GameStorage.offlineTicks = player.options.offlineTicks;
          break;
        case OFFLINE_PROGRESS_TYPE.IGNORED:
          GameStorage.offlineEnabled = false;
          break;
      }
    },
    importSave() {
      if (!this.inputIsValid) return;
      this.emitClose();
      GameStorage.import(this.input);
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    :show-cancel="!inputIsValid"
    :show-confirm="false"
  >
    <template #header>
      저장 입력
    </template>
    <input
      ref="input"
      v-model="input"
      type="text"
      class="c-modal-input c-modal-import__input"
      @keyup.enter="importSave"
      @keyup.esc="emitClose"
    >
    <div class="c-modal-import__save-info">
      <div v-if="inputIsSecret">
        ???
      </div>
      <template v-else-if="inputIsValidSave">
        <div v-if="fileName">
          파일 이름: {{ fileName }}
        </div>
        <div>반물질: {{ formatPostBreak(antimatter, 2, 1) }}</div>
        <div v-if="progress.isInfinityUnlocked">
          무한: {{ formatPostBreak(infinities, 2) }}
        </div>
        <div v-if="progress.isEternityUnlocked">
          영원: {{ formatPostBreak(player.eternities, 2) }}
        </div>
        <div v-if="progress.isRealityUnlocked">
          현실: {{ formatPostBreak(player.realities, 2) }}
        </div>
        <div v-if="progress.hasFullCompletion">
          전체 게임 완료: {{ formatInt(player.records.fullGameCompletions) }}
        </div>
        <div class="c-modal-import__warning">
          (현재 저장 파일이 덮어씌워집니다!)
        </div>
        <br>
        <div>
          {{ lastOpened }}
          <div
            class="o-primary-btn"
            @click="changeOfflineSetting"
          >
            오프라인 진행: {{ offlineType }}
          </div>
          <span v-html="offlineDetails" />
        </div>
      </template>
      <div v-else-if="hasInput">
        유효한 저장이 아닙니다:
        <br>
        {{ saveCheckString }}
      </div>
      <div
        v-if="player"
        class="c-modal-hard-reset-danger"
      >
        <div v-if="willLoseCosmetics">
          <br>
          게임 완료로 인한 글리프 화장품 세트는 저장에 연결됩니다.
          <br>
          이 저장을 가져오면 일부 세트를 잃게 됩니다.
        </div>
        <div v-if="willLoseSpeedrun">
          <br>
          이 저장이 스피드런을 잠금 해제하지 않았으므로 스피드런을 할 수 있는 능력을 잃게 됩니다.
        </div>
      </div>
    </div>

    <PrimaryButton
      v-if="inputIsValid"
      class="o-primary-btn--width-medium c-modal-message__okay-btn c-modal__confirm-btn"
      @click="importSave"
    >
      가져오기
    </PrimaryButton>
  </ModalWrapperChoice>
</template>