<template>
  <ul :class="{anim:isActive}" :style="{ transform: `rotate(${rotates * -30}deg)` }">
    <li
      v-for="(item, index) in monthList"
      :key="index"
      :class="{ hover: index == rotates - 1 }"
    >
      {{ item }}
    </li>
  </ul>
</template>
<script>
  export default {
    name: "month",
    props: ["month","monthList"],
    data() {
      return {
        rotates: "",
        isActive:false
      };
    },
    watch: {
      month(val) {
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
    z-index: 3;
    @for $i from 1 through 12 {
      li:nth-child(#{$i}) {
        transform: rotate(#{$i * 30deg}) translateX(50px);
        -webkit-transition:transform 1s;
        -webkit-animation:fade-in 1s;
      }
    }
  }
</style>
