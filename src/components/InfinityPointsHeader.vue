<script>
export default {
  name: "InfinityPointsHeader",
  data() {
    return {
      infinityPoints: new Decimal(),
      isVisible: false
    };
  },
  methods: {
    update() {
      this.infinityPoints.copyFrom(Currency.infinityPoints);
      this.isVisible = PlayerProgress.infinityUnlocked();
    }
  }
};
</script>

<template>
  <div
    v-show="isVisible"
    class="c-infinity-tab__header"
  >
    당신은
    <span class="c-infinity-tab__infinity-points">{{ format(infinityPoints, 2) }}</span>
    {{ pluralize("무한 포인트", infinityPoints) }}를 가지고 있습니다.
  </div>
</template>

<style scoped>

</style>
