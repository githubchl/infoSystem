<template>
  <div>

    <Row v-if="!firstUpdate">
      <Col span="6" class="padding-left-001">
        <Button type="primary" class="button1" @click="toAdd">新增资讯</Button>
      </Col>
    </Row>

    <h1>新增资讯</h1>
    <Row>
      <Form ref="formData" :model="formData" :rules="rules" :label-width="100">
        <i-col span="10">
          <FormItem label="资讯标题" prop="title" class="form-item1">
            <i-input type="text" placeholder="资讯标题" v-model="formData.title"></i-input>
          </FormItem>
          <FormItem label="资讯类型" prop="newsType" class="form-item1">
            <i-select placeholder="资讯类型" v-model="formData.newsType">
              <i-option v-for="newsType in newsTypeList" :value="newsType.value">{{newsType.name}}</i-option>
              <!--<Option label="热点" value="1"></Option>-->
            </i-select>
          </FormItem>
          <FormItem label="封面图片" prop="logo" class="form-item1" style="height:60px">
            <Upload
              :headers="headers"
              :show-upload-list="false"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :format="['jpg','jpeg','png']"
              :on-format-error="handleFormatError"
              multiple
              type="drag"
              :action="uploadUrl"
              style="display: inline-block;width:58px;">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="camera" size="20"></Icon>
              </div>
            </Upload>
          </FormItem>
        </i-col>

        <i-col span="14" class="padding-left-001 padding-right-001">
          <div style="width:100%">
            <script id="editor" type="text/plain"></script>
          </div>
        </i-col>
      </Form>
    </Row>

    <div v-if="firstUpdate" style="margin-top: 10px;text-align: center">
      <Button type="primary" @click="handleUpdate()" :loading="loadingStatus"
              style="width: 100px">
        {{ loadingStatus ? '正在上传' : '上传' }}
      </Button>
    </div>

    <div v-else style="margin-top: 10px;text-align: center">
      <Button type="primary" @click="handleUpdate()" :loading="loadingStatus"
              style="width: 100px">
        {{ loadingStatus ? '正在保存' : '保存' }}
      </Button>
      <Button type="error" @click="handleDelete()" :loading="loadingStatus"
              style="width: 100px;margin-left: 50px;">
        {{ loadingStatus ? '正在删除' : '删除' }}
      </Button>
    </div>

  </div>
</template>

<script>
  import '../../../static/UE/ueditor.config.js'
  import '../../../static/UE/ueditor.all.js'
  import '../../../static/UE/lang/zh-cn/zh-cn.js'
  import '../../../static/UE/135editor.js'
  import {rootUrl, urlObj} from "../../utils/urlUtils";
  import {formatDateToStr} from "../../utils/dateUtils"
  import newsTypeUtils from "../../utils/newsTypeUtils"


  export default {
    name: "add_news",
    inject: ['reload'],
    data() {
      return {
        firstUpdate: true,
        loadingStatus: false,
        uploadUrl: urlObj.uploadLogoUrl,
        headers: {},
        inputError: false,
        file: null,
        uploadData: {
          newsId:'',
          newsTitle: "",
          newsTime: "",
          newsType: null,
          logoUrl: '',
          richText: '',
        },
        formData: {
          title: '',
          newsType: '',
          logo: '',
        },
        //输入验证
        rules: {
          title: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
        },
        newsTypeList: [],
      }
    },
    mounted() {
      console.log("mounted")
      console.log(this.$route.query.news_id);
      this.newsTypeList = newsTypeUtils;
      this.uploadData.newsId = this.$route.query.news_id;
      if (this.uploadData.newsId) {
        this.getNewsDetails();
      }{
        this.init();
      }
    },
    methods: {
      init() {
        const _this = this;
        UE.delEditor('editor');
        this.editor = UE.getEditor('editor', this.config); // 初始化UE
        this.editor.addListener("ready", function () {
          if (_this.editor_content !== '') {
            _this.editor.setContent(_this.editor_content); // 确保UE加载完成后，放入内容。
          }
        });
      },
      getNewsDetails() {
        this.$get(urlObj.getNewsDetailsUrl + "?news_id=" + this.uploadData.newsId)
          .then((res) => {
            console.log(res);
            if (res.errno == 0) {
              this.firstUpdate = false;
              this.formData.title = res.data.news_title;
              this.formData.newsType = res.data.news_type;
              console.log("this.formData.newsType=" + this.formData.newsType);
              this.formData.logo = res.data.news_pic;
              this.editor_content = res.data.rich_text;
              this.init();
            } else {
              //this.showErrorNotice("获取详细信息失败", res.errmsg);
            }
          }).catch((err) => {
          //this.showErrorNotice("获取详细信息失败", err.msg);
        });

      },
      handleUpdate() {
        console.log("handleUpdate")
        this.$refs.formData.validate((valid) => {
          if (valid) {
            this.loadingStatus = true;
            console.log("校验通过..");
            this.appenUploadData();
            console.log(this.uploadData);
            this.$post(urlObj.uploadNewsUrl, this.uploadData)
              .then((res) => {
                this.loadingStatus = false;
                console.log(res);
                if (res.errno == 0) {
                  this.showSuccessNotice();
                  if (res.data.news_id){
                    this.uploadData.newsId = res.data.news_id;
                  }

                  this.firstUpdate = false;
                } else {
                  this.showErrorNotice("上传失败", res.errmsg);

                }
              }).catch((err) => {
              this.showErrorNotice("上传失败", err.msg);
            });
          } else {
            this.loadingStatus = false;
            console.log("校验不通过")
          }
        });
      },
      handleDelete() {
        console.log(this.uploadData.newsId);
        this.$get(urlObj.deleteNewsUrl + "?news_id=" + this.uploadData.newsId)
          .then((res) => {
            console.log(res);
            if (res.errno == 0) {
              this.showSuccessNotice("删除成功");
              this.reload();
            } else {
              this.showErrorNotice("删除失败", res.errmsg);
            }

          }).catch((err) => {
          this.showErrorNotice("删除失败", err.msg);
          console.log("请求失败");
        })
      },
      showSuccessNotice(title = "上传成功") {
        this.$Notice.success({
          title: title,
          duration: this.$parent.successTime
        });
      },
      showErrorNotice(title, msg = "请求失败") {
        this.$Notice.error({
          title: title,
          desc: msg,
          duration: this.$parent.saveFailTime
        });
      },
      appenUploadData() {
        this.uploadData.newsTitle = this.formData.title;
        this.uploadData.newsType = this.formData.newsType;
        this.uploadData.logoUrl = this.formData.logo;
        this.uploadData.newsTime = formatDateToStr(new Date(), "MM-dd hh:mm");
        this.uploadData.richText = this.editor.getContent();
      },
      //上传文件成功
      uploadSuccess(res, file) {
        console.log(res);
        if (res.errno) {
          this.$Notice.error({
            title: '上传失败',
            desc: res.errmsg,
            duration: this.$parent.saveFailTime
          });
        } else {
          this.formData.logo = res.data;
          this.$Notice.success({
            title: '上传成功',
            desc: file.name,
            duration: this.$parent.successTime
          });
        }
      },
      //上传文件失败
      uploadError(error, file) {
        this.$Notice.error({
          title: '上传失败',
          desc: file,
          duration: this.$parent.saveFailTime
        });
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        });
      },
      toAdd(){
        this.formData = {};
        this.uploadData = {};
        this.editor.setContent('');
        this.firstUpdate = true;
      }
    }
  }
</script>

<style>
  .edui-editor {
    width: 100%;
  }

  .edui-editor-iframeholder {
    height: 448px !important
  }

  .edui-button.edui-for-135editor .edui-button-wrap .edui-button-body .edui-icon {
    background-image: url("http://static.135editor.com/img/icons/editor-135-icon.png") !important;
    background-size: 85%;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>
