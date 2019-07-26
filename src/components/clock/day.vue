<template>
  <ul :class="{anim:isActive}" :style="{ transform: `rotate(${rotates * -11.613}deg)` }">
    <li
      v-for="(item, index) in dayList"
      :key="index"
      :class="{ hover: index == rotates - 1 }"
    >
      {{ item }}
    </li>
  </ul>
</template>
<script>
export default {
  name: "day",
  props: ["day","dayList"],
  data() {
    return {
      rotates: "",
      isActive:false
    };
  },
  watch: {
    day(val) {
      this.rotates = val;
    }
  },
  mounted() {
    setTimeout(()=>{
      this.isActive = true;
    },10);
  }
};
</script>

<style scoped lang="scss">
.anim{
  z-index: 4;
  @for $i from 1 through 31 {
    li:nth-child(#{$i}) {
      transform: rotate(#{$i * 11.6129deg}) translateX(110px);
      -webkit-transition:transform 1s;
      -webkit-animation:fade-in 1s;
    }
  }
}
</style>
