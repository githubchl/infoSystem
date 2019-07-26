<template>
  <div>
    <div slot="top" class="logo-con">
      <img v-show="!shrink" src="../../images/logo.jpg" key="max-logo"/>
      <img  v-show="shrink" src="../../images/logo-min.jpg" key="min-logo"/>
    </div>
    <Menu theme="dark" active-name="admin" style="width: 100%" @on-select="changeMenu">

      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-paper"/>
          主页
        </template>
        <MenuItem name="home">管理员主页</MenuItem>
      </Submenu>
      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-people"/>
          视频管理
        </template>
        <MenuItem name="video_input">视频录入</MenuItem>
        <MenuItem name="video_list">视频列表</MenuItem>
      </Submenu>
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-stats"/>
          统计分析
        </template>
        <MenuGroup title="使用">
          <MenuItem name="add_news">资讯录入</MenuItem>
          <MenuItem name="news_list">资讯列表</MenuItem>
          <MenuItem name="3-3">时段分析</MenuItem>
        </MenuGroup>
        <MenuGroup title="留存">
          <MenuItem name="3-4">用户留存</MenuItem>
          <MenuItem name="3-5">流失用户</MenuItem>
        </MenuGroup>
      </Submenu>
    </Menu>
  </div>
</template>

<script>
  export default {
    name: "sliding_menu",
    props: ["shrink"],
    data(){
      return{
      }
    },
    methods:{
      changeMenu(active){
        console.log(active);
        this.$router.push({
          name:active
        });
      }
    },
  }
</script>

<style>

</style>
