npm<template>

  <div>
    <h1>
      资讯列表
    </h1>
    <Table border  :columns="columns1" :data="newsData"></Table>
    <Page class="page-controller" :current.sync="page" :total="count" :pageSize="pageSize" show-total show-elevator
          @on-change="handleGetInfo()"></Page>

    <Modal title="查看图片" v-model="visible">
      <img :src="viewsrc"  style="width: 100%">
    </Modal>

  </div>
</template>

<script>
  import {rootUrl,urlObj} from "../../utils/urlUtils";
  import newsTypeUtils from "../../utils/newsTypeUtils"

  export default {
    name: "news_list",
    data(){
      return{
        page: 1,
        count: 0,
        pageSize: 10,
        columns1: [
          {
            title: '标题',
            key: 'news_title',
          },
          {
            title: '封面图片',
            align: 'center',
            width:'200px',
            render:(h,params) =>{
              return h('Row',
                [ h('a',{
                  attrs:{
                    'title':'点击可查看大图'
                  }
                },[
                  h('Img',{
                    attrs:{
                      'src':this.newsData[params.index].news_pic,
                      'alt':'logo'
                    },
                    style: {
                      width: '40px',
                      height:'40px',
                      marginLeft:'60px',
                      display:'block',
                    },
                    on:{
                      click: () => {
                        this.viewsrc=this.newsData[params.index].news_pic;
                        this.visible=true;
                      }
                    }
                  })
                ])
                ])
            }
          },
          {
            title: '类型',
            key: 'news_type',
            align: "center",
            width: 150
          },
          {
            title: '上传时间',
            key: 'news_time',
            align: "center",
            width: 150
          },
          {
            title: '评论数',
            key: 'news_comment',
            align: "center",
            width: 150,
          },
          {
            title: '操作',
            key: 'news_details',
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
                        name: "add_news",
                        query: {
                          news_id: this.newsData[params.index].id
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
                      let newsId = this.newsData[params.index].id;
                      this.deleteNews(newsId,params.index)
                    }
                  }
                }, '删除'),
              ])
            }
          }
        ],
        newsData: [],
        visible:false,
        viewsrc:'',
      }
    },
    created() {
      this.handleGetInfo();
    },
    methods: {
      handleGetInfo() {
        this.$get(urlObj.newsListUrl + "?page=" + this.page)
          .then((res) => {
            console.log(res);
            if (res.errno == 0) {
              console.log('获取数据成功');
              for (let news of res.data.data) {
                  news.news_pic = rootUrl + news.news_pic;
                  news.news_type = this.changTypeToText(news.news_type);
              }
              this.newsData = res.data.data;
              this.count = res.data.count;
              this.pageSize = res.data.pageSize;
            } else {
              console.log('获取数据失败');
            }

          }).catch((err) => {
          console.log("连接服务器失败");
        });
      },
      changTypeToText(type){
        for (let newsType of newsTypeUtils) {
          if (newsType.value==type){
            return newsType.name;
          }
        }
      },
      deleteNews(news_id, index) {
        console.log(news_id)
        this.$get(urlObj.deleteNewsUrl + "?news_id=" + news_id)
          .then((res) => {
            console.log(res);
            if (res.errno==0){
              this.showSuccessNotice();
              this.newsData.splice(index, 1);
            } else{
              this.showErrorNotice(res.errmsg);
            }

          }).catch((err) => {
          this.showErrorNotice(err.msg);
          console.log("请求失败");
        })
      },
      showSuccessNotice(){
        this.$Notice.success({
          title: '删除成功',
          duration: this.$parent.successTime
        });
      },
      showErrorNotice(msg="删除失败"){
        this.$Notice.error({
          title: '删除失败',
          desc: msg,
          duration: this.$parent.saveFailTime
        });
      },
    }
  }
</script>

<style scoped>

</style>
