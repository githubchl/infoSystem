<style lang="scss">
  @import "../style/main";
</style>
<template>
  <div>

    <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px'}">
      <!--侧边栏-->
      <sliding-menu :shrink="shrink" ></sliding-menu>
    </div>

    <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
      <div class="main-header">

        <!--<div class="navicon-con">
          <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text"
                  @click="toggleClick">
            <Icon type="md-menu" size="32"/>
          </Button>
        </div>-->


        <div class="user-dropdown-menu-con">
          <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
              <a href="javascript:void(0)" style="width: 270px;">
                <span class="main-user-name" style="width: auto;">{{ account_name }}
                  <Icon type="md-arrow-dropdown" size="20" />
                </span>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem name="loginout" divided>退出登录</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Row>
        </div>



      </div>

      <!-- <div class="tags-con padding-left-001">
         <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
       </div>-->

    </div>


    <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </div>
</template>
<script>
  import slidingMenu from "./menu/sliding_menu"
  import Cookies from 'js-cookie';
  export default {
    data() {
      return {
        theme2: 'light',
        shrink: false,
        account_name: '超级管理员',
        isFullScreen: false,
      }
    },

    components: {
      slidingMenu,
    },
    computed: {
      avatorPath() {
        return localStorage.avatorImgPath;
      },
    },
    methods: {
      handleClickUserDropdown(name) {
        if (name === 'ownSpace') {
          util.openNewPage(this, 'ownspace_index');
          this.$router.push({
            name: 'ownspace_index'
          });
        } else if (name === 'loginout') {
          // 退出登录

          /*this.$store.commit('logout', this);
          this.$store.commit('clearOpenedSubmenu');*/

          Cookies.remove("account_name");
          /*localStorage.clear();
          sessionStorage.clear();*/
          this.$router.replace({
            name: 'login'
          });
        }
      },

      toggleClick() {
        this.shrink = !this.shrink;
      },
    }
  }
</script>

