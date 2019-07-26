<template>
  <div>
    <h1>视频录入</h1>
    <!--表单-->
    <div class="form-div">
      <Form class="form" :model="formData" :label-width="80">
        <FormItem label="标题" prop="video_title">
          <Input type="text" placeholder="视频标题" v-model="formData.title"></Input>
        </FormItem>

        <FormItem label="类型" prop="video_type">
          <Select placeholder="上传类型" v-model="formData.type" @on-change="typeChange">
            <Option label="上传本地视频" :value="2"></Option>
            <Option label="上传网络视频地址" :value="1"></Option>
          </Select>
        </FormItem>

        <FormItem v-if="formData.type===1" label="地址" prop="type_name">
          <Input type="text" placeholder="视频地址" v-model="formData.url"></Input>
        </FormItem>

        <FormItem v-if="formData.type===2" label="选择视频">
          <Upload class="upload" ref="uploadVideo" :before-upload="handleUpload" :data="uploadData" :action="uploadUrl"
                  :on-success="updateSuccess" :on-error="uploadError"
                  :on-format-error="handleFormatError" :show-upload-list="false">
            <Button type="primary" icon="android-upload" size="large" class="button2">选择视频
            </Button>
            <span v-if="file !== null">已选择: {{ file.name }}</span>
          </Upload>
        </FormItem>

        <div style="margin-top: 10px;text-align: center">
          <Button type="primary" @click="handleUpdate()" :disabled="isDisabled" :loading="loadingStatus"
                  style="width: 100px">
            {{ loadingStatus ? '正在上传' : '上传' }}
          </Button>
        </div>

      </Form>
    </div>


  </div>
</template>

<script>
  import {urlObj} from "../../utils/urlUtils";
  import {formatDateToStr} from "../../utils/dateUtils"

  export default {
    name: "video_input",
    inject: ['reload'],
    data() {
      return {

        loadingStatus: false,
        file: null,
        uploadData: {
          videoTitle: "",
          videoTime: "",
          videoType: null,
          videoUrl: ''
        },
        formData: {
          title: '',
          type: '',
          url: ''
        },
        headers: {},
        uploadUrl: '',
      }
    },
    mounted() {
      console.log("mounted-input");
      this.uploadUrl =  urlObj.uploadVideoUrl;
    },
    computed: {
      isDisabled() {
        return !((this.formData.title) && (this.formData.type) && (this.formData.url || this.file))
      }
    },
    methods: {
      typeChange(value) {
        if (value == 2) {//选择本地视频
          this.formData.url = '';
        } else {
          this.file = null;
        }
        console.log(formatDateToStr(new Date(), "MM-dd hh:mm"));

      },
      handleUpload(file) {
        this.file = file;
        return false;
      },
      //上传文件修改成功
      updateSuccess(res, file) {
        console.log("updateSuccess");
        console.log(res);
        this.loadingStatus = false;
        if (res.errno) {
          this.$Notice.error({
            title: '上传文件出错',
            desc: file.name + '<br/>' + res.errmsg,
            duration: this.$parent.saveFailTime
          });
        } else {
          this.$Notice.success({
            title: '成功上传文件',
            desc: file.name,
            duration: this.$parent.successTime
          });
          //重新加载页面
          this.reload();
        }
        //this.$parent.reload();
      },
      //上传文件失败
      uploadError(error, file) {
        this.loadingStatus = false;
        this.$Notice.error({
          title: '上传文件出错',
          desc: file.name,
          duration: this.$parent.saveFailTime
        });
        //this.handleGetInfo();
      },
      //上传格式
      handleFormatError(file) {
        this.$Notice.warning({
          title: '请上传apk文件',
          desc: file.name,
          duration: this.$parent.warningTime
        });
      },
      handleUpdate() {
        this.loadingStatus = true;

        this.uploadData.videoTitle = this.formData.title;
        this.uploadData.videoTime = formatDateToStr(new Date(), "MM-dd hh:mm");
        this.uploadData.videoType = this.formData.type;
        if (this.file) {
          this.$refs.uploadVideo.post(this.file);
        } else {
          this.uploadData.videoUrl = this.formData.url;
          this.$post(this.uploadUrl, this.uploadData)
            .then((res) => {
              this.loadingStatus = false;
              console.log('请求成功');
              if (res.errno == 0) {
                this.$Notice.success({
                  title: '成功上传',
                  desc: "成功上传网络资源",
                  duration: this.$parent.successTime
                });
                this.reload();
              } else {
                this.$Notice.error({
                  title: '上传出错',
                  desc: res.msg,
                  duration: this.$parent.saveFailTime
                });
              }
              console.log(res);
            }).catch((err) => {
            this.loadingStatus = false;
            console.log('请求失败');
            this.$Notice.error({
              title: '上传文件出错',
              desc: err.msg,
              duration: this.$parent.saveFailTime
            });
          });
        }


      }
    }
  }
</script>

<style>

</style>
