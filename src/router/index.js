import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main'

Vue.use(Router)

/*
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: resolve => {
        require(['@/components/login.vue'], resolve);
      }
    },
    {
      path: '/main',
      name: 'main',
      component: main,
      redirect: "/admin/home"
    },
    {
      path: '/admin',
      name: "admin",
      component: main,
      children: [
        {
          path: "home",
          name: 'home',
          component: resolve => {
            require(['@/components/home.vue'], resolve);
          }
        }
      ]
    },
    {
      path: '/video',
      nama: "video",
      component: main,
      children: [
        {
          path: 'list',
          name: 'video_list',
          component: resolve => {
            require(['../components/video/video_list.vue'], resolve);
          }
        },
        {
          path: 'input',
          name: 'video_input',
          component: resolve => {
            require(['../components/video/video_input.vue'], resolve);
          }
        },
        {
          path: 'details/:index',
          name: 'video_details',
          component: resolve => {
            require(['../components/video/video_details.vue'], resolve);
          }
        },
      ]
    },
    {
      path: '/analyze',
      name: 'analyze',
      component: main,
      children: [{
        path: "add_user",
        name: "add_user",
        component: resolve => {
          require(['../components/analyze/analyze_add_user.vue'],resolve)
        }
      }]
    },
    {
      path:'/news',
      name:"news",
      component:main,
      children:[{
        path:"add_news",
        name:"add_news",
        component:resolve=>{
          require(['../components/news/add_news.vue'],resolve)
        }
      },
        {
          path:"news_list",
          name:"news_list",
          component:resolve=>{
            require(['../components/news/news_list.vue'],resolve);
          }
        }
      ]
    }
  ]
})
*/

import login from '@/components/login.vue';
import home from '@/components/home.vue';
import video_list from '../components/video/video_list.vue';
import video_input from '../components/video/video_input.vue';
import video_details from '../components/video/video_details.vue';
import analyze_add_user from '../components/analyze/analyze_add_user.vue';
import news_list from '../components/news/news_list.vue';
import add_news from '../components/news/add_news.vue';


export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/main',
      name: 'main',
      component: main,
      redirect: "/admin/home"
    },
    {
      path: '/admin',
      name: "admin",
      component: main,
      children: [
        {
          path: "home",
          name: 'home',
          component: home,
          meta: {
            keepAlive: true
          }
        }
      ]
    },
    {
      path: '/video',
      nama: "video",
      component: main,
      children: [
        {
          path: 'list',
          name: 'video_list',
          component:video_list,
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'input',
          name: 'video_input',
          component: video_input,
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'details/:index',
          name: 'video_details',
          component: video_details,
          meta: {
            keepAlive: true
          }
        },
      ]
    },
    {
      path: '/analyze',
      name: 'analyze',
      component: main,
      children: [{
        path: "add_user",
        name: "add_user",
        component: analyze_add_user,
        meta: {
          keepAlive: true
        }
      }]
    },
    {
      path:'/news',
      name:"news",
      component:main,
      children:[{
        path:"add_news",
        name:"add_news",
        component:add_news,
        meta: {
          keepAlive: false
        }
      },
        {
          path:"news_list",
          name:"news_list",
          component:news_list,
          meta: {
            keepAlive: true
          }
        }
      ]
    }
  ]
})
