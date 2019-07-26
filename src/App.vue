<template>
  <div id="app" class="app-main">
    <router-view v-if="alive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      alive: true,
    }
  },
  provide(){
    return{
      reload:this.reload
    }
  },
  methods:{
    //刷新
    reload() {
      console.log("reload")
      this.alive = false;
      this.$nextTick(function() {
        this.alive = true;
      })
    },
  }
}
</script>

<style>
  html,body{
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
  }
  .app-main{
    width: 100%;
    height: 100%;
  }
</style>
