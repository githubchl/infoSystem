<template>
  <ul :class="{anim:isActive}" :style="{ transform: `rotate(${rotates * -15}deg)` }">
    <li
      v-for="(item, index) in hourList"
      :key="index"
      :class="{ hover: (index == rotates ||  index == rotates-12)}"
    >
      {{ item }}
    </li>
  </ul>
</template>
<script>
export default {
  name: "hour",
  props: ["hour","hourList"],
  data() {
    return {
      rotates: "",
      isActive:false
    };
  },
  watch: {
    hour(val) {
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
  z-index: 7;
  @for $i from 1 through 24 {
    li:nth-child(#{$i}) {
      transform: rotate(#{$i * 15-15deg}) translateX(195px);
      -webkit-transition:transform 1s;
      -webkit-animation:fade-in 1s;
    }
  }
}
</style>
