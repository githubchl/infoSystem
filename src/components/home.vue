<template>
  <div>
    <h1 style="text-align: left;margin-left: 20px;">
      欢迎回来
    </h1>
    <div v-if="isActive" class="anim-t home">
      <second :second="second" :secondList="secondList"/>
      <minute :minute="minute" :minuteList="minuteList"/>
      <hour :hour="hour" :hourList="hourList"/>
      <day :day="day" :dayList="dayList"/>
      <week :week="week" :weekList="weekList"/>
      <month :month="month" :monthList="monthList"/>

      <!--这里是年份-->
      <ul>
        <li class="anim-year hover">
          {{year}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import timeUtils from "../utils/timeUtils"

  import second from "@/components/clock/second.vue";
  import minute from "@/components/clock/minute.vue";
  import hour from "@/components/clock/hour.vue";
  import day from "@/components/clock/day.vue";
  import week from "@/components/clock/week.vue";
  import month from "@/components/clock/month.vue";

  export default {
    name: 'home',
    data() {
      return {
        secondList:timeUtils.second,
        minuteList:timeUtils.minute,
        hourList:timeUtils.hour,
        dayList:timeUtils.day,
        weekList:timeUtils.week,
        monthList:timeUtils.month,
        second: "",
        minute: "",
        hour: "",
        day: "",
        week: "",
        month: "",
        year: "",
        isActive: false,

      }
    },
    components: {
      second,
      minute,
      hour,
      day,
      week,
      month,
    },
    mounted() {
      this.start();
    },
    methods: {
      start() {
        //页面渲染完的一秒后才显示时钟，这样才能有出场旋转动画
        setTimeout(() => {
          this.isActive = true;
        }, 1000);
        //刷新时间，每隔一秒调用一次
        setInterval(() => {
          let data = new Date();
          this.second = data.getSeconds();
          this.minute = data.getMinutes();
          this.hour = data.getHours();
          this.week = data.getDay();
          this.day = data.getDate();
          this.month = data.getMonth() + 1;
          this.year = data.getFullYear();
        }, 1000);
      },
    },
    computed: {},
  }
</script>


<style lang="scss">
  .home {
    overflow: hidden;
    ul {
      list-style-type: none;
      padding: 0;
      margin: auto;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      height: 20px;
      width: 60px;
      text-align: center;
      transition: 0.1s 0.1s ease-out;/*时钟跳动效果（淡出，效果比较好），最大值不能大于1*/

      li {
        position: absolute;
        height: 20px;
        width: 60px;
        color: black;
        text-align: center;
        font-size: 12px;
        line-height: 20px;

        &.hover {
          color: chocolate;
        }
      }
    }
  }

  .anim-year {
    -webkit-animation: rotate-fade-in 1s;
  }

  .anim-t {
    -webkit-animation: fade-in 1s;
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    /*初始状态 透明度为0*/
    40% {
      opacity: 0.6;
    }
    /*过渡状态 透明度为0.4*/
    100% {
      opacity: 1;
    }
    /*结束状态 透明度为1*/
  }

  @keyframes rotate-fade-in {
    0% {
      opacity: 0;
      -webkit-transform: rotate(0deg);
    }
    /*初始状态 透明度为0*/
    40% {
      opacity: 0.6;
    }
    /*过渡状态 透明度为0.4*/
    100% {
      opacity: 1;
      -webkit-transform: rotate(360deg);
    }
    /*结束状态 透明度为1*/
  }

</style>
