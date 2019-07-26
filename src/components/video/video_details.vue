<template>
  <div>
    <h1>视频详情</h1>
    <h3 class="margin-bottom-10" style="margin-left: 10%;">{{videoData.video_title}}</h3>
      <video-player class="video-player vjs-custom-skin" style="width: 80%;margin-left: 10%;" ref="videoPlayer" :playsinline="true"
                    :options="playerOptions"></video-player>

    <div class="bottom-info-div">
      <span>上传时间：{{videoData.video_time}}</span>
      <span>视频类别：{{videoData.video_type==2?'本地视频':'网络视频'}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "video_details",
    data() {
      return {
        videoData: {},
        aa: 10,
        playerOptions: {
          playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: true, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: true, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "",
            src: "" //视频url地址 http://127.0.0.1:8360/static/video/5杀.mp4
          }],
          //poster: "../../static/image/thumb_1_1380_460_20181009043014983386.jpg", //你的封面地址
          // width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: true,
            fullscreenToggle: true  //全屏按钮
          }
        }
      }
    },
    created() {
      console.log("mounted");
      this.videoData = this.$route.params.video;
      this.playerOptions.sources[0].src = this.videoData.video_url;
    },


  }
</script>

<style>

</style>
