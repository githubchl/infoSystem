<style scoped lang="scss">
  @import '../style/login.scss';
</style>
<template>
  <div class="login">
    <div class="login-panel">
      <Card>
        <p slot="title" style="text-align: center">
          信息录入系统
        </p>
        <div class="login-form">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="userName">
              <Input  v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit" type="primary" long>登录</Button>
            </FormItem>
          </Form>
          <p v-if="showError" class="error-tips">{{tips}}</p>
          <p v-else class="login-tips">{{tips}}</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  import {urlObj} from "../utils/urlUtils"
  import Cookies from 'js-cookie';

  export default {
    data() {
      return {
        form: {
          userName: '',
          password: ''
        },
        rules: {
          userName: [
            {required: true, message: '账号不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        },
        tips: "输入用户名和密码",
        showError: false//是否显示错误提示
      }
    },
    methods: {
      handleSubmit() {

        console.log(this.$refs);
        this.$refs.loginForm.validate((val) => {
          if (val) {
            this.showError = false;

            let loginData = {
              userName: this.form.userName,
              password: this.form.password
            }
            this.$post(urlObj.loginUrl, loginData)
              .then((res) => {
                const errno = res.errno;
                if (errno==0){
                  Cookies.set('account_name', this.form.userName, {expires: 7});//cookie保存7天
                  sessionStorage.setItem('account_name',this.form.userName);
                  this.$router.replace({
                    name:"home"
                  });
                } else{
                  this.showError = true;
                  this.tips = res.errmsg;
                }
              }).catch((err => {
              this.showError = true;
              this.tips = "请求服务器失败";
            }));
          } else {
            console.log("失败")
          }
        });
      }
    }
  }
</script>


