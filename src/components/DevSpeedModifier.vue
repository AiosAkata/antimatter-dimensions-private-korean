<script>
export default {
  name: "DevSpeedModifier",
  data() {
    return {
      isHidden: false,
      inputValue: "1",
      currentGameSpeed: 1,
      modifiedGameSpeed: 1,
      modifier: 1,
    };
  },
  computed: {
    presetButtons() {
      return [0.001, 0.01, 0.1, 10, 100, 1000];
    },
    modifierDisplay() {
      return this.formatSpeed(this.modifier);
    },
    currentSpeedDisplay() {
      return this.formatSpeed(this.currentGameSpeed);
    },
    modifiedSpeedDisplay() {
      return this.formatSpeed(this.modifiedGameSpeed);
    },
  },
  methods: {
    update() {
      this.currentGameSpeed = getGameSpeedupForDisplay();
      this.modifiedGameSpeed = this.currentGameSpeed * (window.devSpeedModifier || 1);
      this.modifier = window.devSpeedModifier || 1;
    },
    formatSpeed(value) {
      if (value >= 0.001 && value < 10000) {
        return `×${format(value, 3, 3)}`;
      }
      if (value < 0.001) {
        return `×1 / ${format(1 / value, 2)}`;
      }
      return `×${format(value, 2)}`;
    },
    applyInput() {
      const parsed = parseFloat(this.inputValue);
      if (!isNaN(parsed) && parsed > 0) {
        this.setModifier(parsed);
      }
    },
    setModifier(value) {
      // 상한선 1e12: 이보다 크면 totalTimePlayed가 부동소수점 정밀도 한계에 도달해
      // 내부 타이머가 고착되는 문제가 발생함
      const clamped = Math.clamp(value, 1e-6, 1e12);
      window.devSpeedModifier = clamped;
      this.modifier = clamped;
      this.inputValue = String(clamped);
    },
    multiplyModifier(factor) {
      this.setModifier((window.devSpeedModifier || 1) * factor);
    },
    resetModifier() {
      this.setModifier(1);
    },
    onInputKeydown(event) {
      if (event.key === "Enter") this.applyInput();
    },
    toggleHidden() {
      this.isHidden = !this.isHidden;
    },
  },
};
</script>

<template>
  <div class="l-dev-speed-modifier">
    <button
      v-if="isHidden"
      class="c-dev-speed-modifier__show-btn"
      @click="toggleHidden"
    >
      ⏩ Speed
    </button>
    <div
      v-else
      class="c-dev-speed-modifier"
    >
      <div class="c-dev-speed-modifier__header">
        <span class="c-dev-speed-modifier__title">Game Speed Modifier</span>
        <button
          class="c-dev-speed-modifier__hide-btn"
          @click="toggleHidden"
        >
          Hide
        </button>
      </div>

      <div class="c-dev-speed-modifier__info">
        <div class="c-dev-speed-modifier__row">
          <span class="c-dev-speed-modifier__label">Current speed:</span>
          <span class="c-dev-speed-modifier__value">{{ currentSpeedDisplay }}</span>
        </div>
        <div class="c-dev-speed-modifier__row">
          <span class="c-dev-speed-modifier__label">Dev modifier:</span>
          <span class="c-dev-speed-modifier__value c-dev-speed-modifier__value--accent">{{ modifierDisplay }}</span>
        </div>
        <div class="c-dev-speed-modifier__row">
          <span class="c-dev-speed-modifier__label">Effective speed:</span>
          <span class="c-dev-speed-modifier__value c-dev-speed-modifier__value--highlight">{{ modifiedSpeedDisplay }}</span>
        </div>
      </div>

      <div class="c-dev-speed-modifier__input-row">
        <input
          v-model="inputValue"
          class="c-dev-speed-modifier__input"
          type="number"
          min="0.000001"
          max="1000000"
          step="any"
          placeholder="배속 입력"
          @keydown="onInputKeydown"
        >
        <button
          class="c-dev-speed-modifier__apply-btn"
          @click="applyInput"
        >
          Apply
        </button>
      </div>

      <div class="c-dev-speed-modifier__presets">
        <button
          class="c-dev-speed-modifier__reset-btn"
          @click="resetModifier"
        >
          Reset
        </button>
        <div class="c-dev-speed-modifier__preset-grid">
          <button
            v-for="preset in presetButtons"
            :key="preset"
            class="c-dev-speed-modifier__preset-btn"
            @click="multiplyModifier(preset)"
          >
            {{ preset >= 1 ? `×${preset}` : `÷${Math.round(1 / preset)}` }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.l-dev-speed-modifier {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 9999;
  pointer-events: all;
}

.c-dev-speed-modifier__show-btn {
  background: rgba(20, 20, 40, 0.92);
  color: #aaf;
  border: 1px solid #446;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.15s;
}

.c-dev-speed-modifier__show-btn:hover {
  background: rgba(40, 40, 80, 0.98);
}

.c-dev-speed-modifier {
  background: rgba(16, 16, 36, 0.96);
  border: 1px solid #446;
  border-radius: 10px;
  padding: 12px 14px;
  min-width: 220px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.7);
  color: #ccd;
  font-size: 0.82rem;
}

.c-dev-speed-modifier__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.c-dev-speed-modifier__title {
  font-weight: bold;
  color: #aaf;
  font-size: 0.88rem;
}

.c-dev-speed-modifier__hide-btn {
  background: transparent;
  color: #88a;
  border: 1px solid #446;
  border-radius: 4px;
  padding: 2px 8px;
  cursor: pointer;
  font-size: 0.78rem;
}

.c-dev-speed-modifier__hide-btn:hover {
  background: rgba(80, 80, 140, 0.4);
}

.c-dev-speed-modifier__info {
  margin-bottom: 10px;
}

.c-dev-speed-modifier__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 0;
}

.c-dev-speed-modifier__label {
  color: #99a;
}

.c-dev-speed-modifier__value {
  font-weight: bold;
  color: #dde;
}

.c-dev-speed-modifier__value--accent {
  color: #af8;
}

.c-dev-speed-modifier__value--highlight {
  color: #ffa;
}

.c-dev-speed-modifier__input-row {
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
}

.c-dev-speed-modifier__input {
  flex: 1;
  background: rgba(30, 30, 60, 0.9);
  border: 1px solid #446;
  border-radius: 4px;
  color: #dde;
  padding: 4px 8px;
  font-size: 0.82rem;
  min-width: 0;
}

.c-dev-speed-modifier__input:focus {
  outline: none;
  border-color: #88f;
}

.c-dev-speed-modifier__apply-btn {
  background: rgba(40, 40, 120, 0.8);
  color: #aaf;
  border: 1px solid #446;
  border-radius: 4px;
  padding: 4px 10px;
  cursor: pointer;
  font-size: 0.82rem;
  white-space: nowrap;
}

.c-dev-speed-modifier__apply-btn:hover {
  background: rgba(60, 60, 160, 0.9);
}

.c-dev-speed-modifier__presets {
  display: flex;
  gap: 4px;
  align-items: stretch;
}

.c-dev-speed-modifier__reset-btn {
  flex: 0 0 auto;
  background: rgba(120, 40, 40, 0.8);
  color: #faa;
  border: 1px solid #633;
  border-radius: 4px;
  padding: 3px 10px;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: bold;
  transition: background 0.12s;
}

.c-dev-speed-modifier__reset-btn:hover {
  background: rgba(180, 60, 60, 0.9);
}

.c-dev-speed-modifier__preset-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  flex: 1;
}

.c-dev-speed-modifier__preset-btn {
  background: rgba(30, 30, 60, 0.8);
  color: #aac;
  border: 1px solid #336;
  border-radius: 4px;
  padding: 3px 4px;
  cursor: pointer;
  font-size: 0.75rem;
  text-align: center;
  transition: background 0.12s;
}

.c-dev-speed-modifier__preset-btn:hover {
  background: rgba(50, 50, 100, 0.9);
}
</style>
