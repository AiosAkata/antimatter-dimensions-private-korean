<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "PreferredTreeModal",
  components: {
    ModalWrapperChoice,
  },
  data() {
    return {
      dimensionPath: null,
      pacePath: null
    };
  },
  computed: {
    dimensionOptions() {
      return {
        "반물질": TIME_STUDY_PATH.ANTIMATTER_DIM,
        "무한": TIME_STUDY_PATH.INFINITY_DIM,
        "시간": TIME_STUDY_PATH.TIME_DIM,
      };
    },
    paceOptions() {
      return {
        "활동": TIME_STUDY_PATH.ACTIVE,
        "수동": TIME_STUDY_PATH.PASSIVE,
        "유휴": TIME_STUDY_PATH.IDLE
      };
    },
    usePriority() {
      return TimeStudy.preferredPaths.dimension.usePriority;
    }
  },
  created() {
    this.dimensionPath = [...TimeStudy.preferredPaths.dimension.path];
    this.pacePath = TimeStudy.preferredPaths.pace.path;
  },
  methods: {
    isPreferred(name) {
      return this.paceOptions[name] === this.pacePath || this.dimensionPath.indexOf(this.dimensionOptions[name]) + 1;
    },
    select(name) {
      if (this.dimensionOptions[name]) {
        if (!this.usePriority || this.dimensionPath.length > 1) this.dimensionPath.shift();
        if (!this.dimensionPath.includes(this.dimensionOptions[name]))
          this.dimensionPath.push(this.dimensionOptions[name]);
      }
      if (this.paceOptions[name]) this.pacePath = this.paceOptions[name];
    },
    confirmPrefs() {
      TimeStudy.preferredPaths.dimension.path = this.dimensionPath;
      TimeStudy.preferredPaths.pace.path = this.pacePath;
    },
    classList(name) {
      const pref = this.isPreferred(name);
      const types = {
        "반물질": "antimatter-dim",
        "무한": "infinity-dim",
        "시간": "time-dim",
        "활동": "active",
        "수동": "passive",
        "유휴": "idle"
      };
      return [
        "o-time-study-selection-btn",
        `o-time-study-${types[name]}--${pref ? "bought" : "available"}`,
        `o-time-study--${pref ? "bought" : "available"}`
      ];
    },
  },
};
</script>

<template>
  <ModalWrapperChoice @confirm="confirmPrefs">
    <h2>차원 분할 선호도</h2>
    <div class="l-modal-split-preferences">
      <button
        v-for="(id, name) in dimensionOptions"
        :key="name"
        :class="classList(name)"
        @click="select(name)"
      >
        <div
          v-if="isPreferred(name)"
          class="l-dim-path-priority o-dim-path-priority"
        >
          {{ isPreferred(name) }}
        </div>
        <div>
          {{ name }}
        </div>
      </button>
    </div>
    <br>
    <h2>페이스 분할 선호도</h2>
    <div class="l-modal-split-preferences">
      <button
        v-for="(id, name) in paceOptions"
        :key="name"
        :class="classList(name)"
        @click="select(name)"
      >
        <div>
          {{ name }}
        </div>
      </button>
    </div>
  </ModalWrapperChoice>
</template>
