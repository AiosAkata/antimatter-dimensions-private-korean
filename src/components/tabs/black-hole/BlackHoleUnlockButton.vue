<script>
export default {
  name: "BlackHoleUnlockButton",
  data() {
    return {
      canBeUnlocked: false,
    };
  },
  computed: {
    classObject() {
      return {
        "c-reality-upgrade-btn--unavailable": !this.canBeUnlocked
      };
    },
  },
  methods: {
    update() {
      this.canBeUnlocked = BlackHoles.canBeUnlocked;
    },
    unlock() {
      BlackHoles.unlock();
      this.$emit("blackholeunlock");
    }
  }
};
</script>

<template>
  <button
    :class="classObject"
    class="l-reality-upgrade-btn c-reality-upgrade-btn c-reality-upgrade-btn--black-hole-unlock"
    @click="unlock"
  >
    블랙홀 해제
    <br>
    비용: {{ formatInt(100) }} 현실 기계
  </button>
</template>

<style scoped>

</style>
