<script>
export default {
  name: "EternityPointsHeader",
  data() {
    return {
      eternityPoints: new Decimal()
    };
  },
  methods: {
    update() {
      this.eternityPoints.copyFrom(Currency.eternityPoints.value.floor());
    }
  }
};
</script>

<template>
  <div class="c-eternity-tab__header">
    당신은
    <span class="c-eternity-tab__eternity-points">{{ format(eternityPoints, 2) }}</span>
    {{ pluralize("영원 포인트", eternityPoints) }}를 가지고 있습니다.
  </div>
</template>

<style scoped>

</style>
