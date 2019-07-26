<template>
  <!-- transform: `rotate(${(rotates+1) * -6}deg)`} 转入的秒数变化触发整个秒表的旋转-->
    <ul :class="{ anim: isActive}" :style="{ transform: `rotate(${(rotates+1) * -6}deg)`}" >
      <!--:class="{ hover: index == rotates }" 使当前的秒数有选中效果，即颜色不同-->
      <li  v-for="(item, index) in secondList" :key="index" :class="{ hover: index == rotates }">
        {{item}}
      </li>
    </ul>
</template>

<script>
  export default {
    props: ["second","secondList"],
    data() {
      return {
        rotates:'',
        isActive:false,
      }
    },
    mounted() {
        setTimeout(()=>{
          this.isActive = true;
        },10);

      //this.initData();
    },
    watch: {
      second(val) {
        /*val为转入的秒数*/
        this.rotates = val;
      }
    },
  }
</script>


<style scoped lang="scss">
  .anim{
    z-index: 9;
    /*每个子元素初始位置*/
    @for $i from 1 through 60 {
      li:nth-child(#{$i}) {
        transform: rotate(#{$i * 6deg}) translateX(300px);
        -webkit-transition:transform 1s;/*效果持续一秒*/
        -webkit-animation:fade-in 1s;
      }
    }
  }

</style>
