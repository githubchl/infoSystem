<template>
  <ul :class="{anim:isActive}" :style="{ transform: `rotate(${rotates * -51.428}deg)` }">
    <li
      v-for="(item, index) in weekList"
      :key="index"
      :class="{ hover: index == rotates - 1 || index == rotates + 6 }"
    >
      {{ item }}
    </li>
  </ul>
</template>
<script>
export default {
  name: "week",
  props: ["week","weekList"],
  data() {
    return {
      rotates: "",
      isActive:false
    };
  },
  watch: {
    week(val) {
      this.rotates = val;
    }
  },
  mounted() {
    setTimeout(() => {
      this.isActive = true;
    }, 10);
  }
};
</script>

<style scoped lang="scss">
.anim {
  z-index: 5;
  @for $i from 1 through 7 {
    li:nth-child(#{$i}) {
      transform: rotate(#{$i * 51.428deg}) translateX(155px);
      -webkit-transition:transform 1s;
      -webkit-animation:fade-in 1s;
    }
  }
}
</style>
