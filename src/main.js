// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import store from "./vuex/store"
import 'iview/dist/styles/iview.css';
import {fetch, post} from './utils/httpUtils.js'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import './style/common.css'
import Cookies from 'js-cookie';


Vue.use(VueVideoPlayer);


Vue.prototype.$get = fetch;
Vue.prototype.$post = post;

Vue.use(iView);

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  console.log(from.name);
  let account_name = Cookies.get("account_name");//cookie
  if (to.name == "login" && !from.name && account_name) {
    //自动登录
    next({name: 'home'});//前往主页
  }
  if (to.name !== 'login' && !account_name) {//如果没有登录并且前往的页面不是登录页面
    next({name: 'login'});//前往登录页面
  } else {
    console.log("next");
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
