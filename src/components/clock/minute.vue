<template>
  <ul :class="{anim:isActive}" :style="{ transform: `rotate(${(rotates * -6)-6}deg)` }">
    <li
      v-for="(item, index) in minuteList"
      :key="index"
      :class="{ hover: (index == rotates) }"
    >
      {{ item }}
    </li>
  </ul>
</template>
<script>
  export default {
    name: "minute",
    props: ["minute","minuteList"],
    data() {
      return {
        rotates: "",
        isActive:false
      };
    },
    watch: {
      minute(val) {
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
  .anim {
    z-index: 8;
    @for $i from 1 through 60 {
      li:nth-child(#{$i}) {
        transform: rotate(#{$i * 6deg}) translateX(245px);
        -webkit-transition:transform 1s;
        -webkit-animation:fade-in 1s;
      }
    }
  }
</style>
