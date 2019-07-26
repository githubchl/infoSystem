<template>
  <div>
    <!--<div>
      {{$store.state.count}}
    </div>
    <div>
      <button @click="handleAddClick(10)">增加</button>
      <button @click="handleReduceClick(10)">减少</button>
      <button @click="handleActionsAdd(10)">增加</button>
      <button @click="handleActionsReduce(10)">减少</button>
    </div>-->

  </div>
</template>

<script>
  export default {
    name: "analyze_add_user",
    methods:{
      handleAddClick(n){
        this.$store.commit('mutationsAddCount',n);
      },
      handleReduceClick(n){
        this.$store.commit('mutationsReduceCount',n);
      },
      handleActionsAdd(n){
        this.$store.dispatch('actionsAddCount',n)
      },
      handleActionsReduce(n){
        this.$store.dispatch('actionsReduceCount',n);
        console.log("通过getter获取:"+this.$store.getters.getterCount);
        console.log("直接获取:"+this.$store.state.count);
      }
    }
  }
</script>

<style scoped>

</style>
