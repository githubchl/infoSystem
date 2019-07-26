<template>
  <div>
    <h1>
      视频列表
    </h1>
    <Table border :columns="columns1" :data="videoData" ></Table>
    <Page class="page-controller" :current.sync="page" :total="count" :pageSize="pageSize" show-total show-elevator @on-change="handleGetInfo()" ></Page>
  </div>
</template>

<script>
  import {rootUrl,urlObj} from "../../utils/urlUtils";

  export default {
    name: "video_list",
    data() {
      return {
        page: 1,
        count: 0,
        pageSize: 10,
        columns1: [
          {
            title: '标题',
            key: 'video_title'
          },
          {
            title: '播放地址',
            key: 'video_url'
          },
          {
            title: '上传时间',
            key: 'video_time',
            align: "center",
            width: 150
          },
          {
            title: '评论数',
            key: 'video_comment',
            align: "center",
            width: 150,
          },
          {
            title: '操作',
            key: 'video_details',
            align: "center",
            width: 150,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "video_details",
                        params: {
                          index:params.index,//必须加一个变量
                          video: this.videoData[params.index]
                        }
                      });
                    }
                  }
                }, '详情'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      let videoId = this.videoData[params.index].id;
                      this.deleteVideo(videoId,params.index)
                    }
                  }
                }, '删除'),
              ])
            }
          }
        ],
        videoData: []
      }
    },
    created() {
      this.handleGetInfo();
    },
    methods:{
      handleGetInfo(){
        this.$get(urlObj.videoListUrl+"?page="+this.page)
          .then((res) => {
            console.log(res);
            if (res.errno==0){
              console.log('获取数据成功');
              for (let video of res.data.data) {
                if (video.video_type == 2) {
                  video.video_url = rootUrl + video.video_url;
                }
              }
              this.videoData = res.data.data;
              this.count = res.data.count;
              this.pageSize = res.data.pageSize;
            } else{
              console.log('获取数据失败');
            }

          }).catch((err) => {
          console.log("连接服务器失败");
        });
      },
      deleteVideo(videoId,index){
        console.log(videoId)
        this.$get(urlObj.deleteVideoUrl+"?video_id="+videoId)
          .then((res)=>{
            console.log(res);
            this.videoData.splice(index,1);
          }).catch((err)=>{
            console.log("请求失败");
        })
      }
    }
  }
</script>

<style>

</style>
