<template>
  <div class="count">
    <div class="Dot">{{ count }}</div>
  </div>
</template>

<script>
import anime from "animejs";

export default {
  props: ["count"],
  watch: {
    count(newValue, oldValue) {
      const countAnimation = {
        count: oldValue,
      };
      anime({
        targets: [".count", countAnimation],
        count: newValue,
        rotateX: [0, 180, 180, 0],
        scale: [1, 4, 4, 1],
        duration: 400,
      });
    },
  },
};
</script>

<style scoped>
.Dot {
  background: red;
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
}

.count {
  display: block;
  position: relative;
  transition: transform 0.4s;
  backface-visibility: hidden;
}

.count-enter {
  transform: scale(4) rotateX(0.5turn);
}

.count-enter-active {
  transform: rotateX(0);
}

.count-leave {
  top: 0;
  position: absolute;
  transform: rotateX(0);
}

.count-leave-active {
  transform: scale(4) rotateX(0.5turn);
}
</style>
