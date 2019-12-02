<template>
  <div class="login">
    <div class="container">
      <div class="top">
        <img src="~@/assets/img/login-logo.png" alt="logo" />
        <span>官网管理后台</span>
        <p>这是一个官网后台管理系统的入口，请使用账号密码登录。</p>
      </div>
      <div class="main">
        <a-form :form="form" @submit="handleSubmit">
          <a-form-item>
            <a-input size="large" v-decorator="userNameDecorator" placeholder="账号">
              <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input size="large" v-decorator="passwordDecorator" type="password" placeholder="密码">
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button size="large" :loading="loading" type="primary" html-type="submit" block>登录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import { setDecorator } from "../libs/util";
import { login } from "@/api/api";
import { setToken } from "@/libs/token";
export default {
  name: "login",
  computed: {
    userNameDecorator() {
      return setDecorator({
        sign: "input",
        key: "loginName",
        title: "账号",
        min: 1,
        max: 50
      });
    },
    passwordDecorator() {
      return setDecorator({
        sign: "input",
        key: "loginPwd",
        title: "密码",
        min: 1,
        max: 50
      });
    }
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true;
          login(values).then(res => {
            if (res.data.res) {
              setToken(res.data.data);
              this.$Message.success("登录成功！");
              this.$router.push({ name: "home" });
            }
            this.loading = false;
          });
        }
      });
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  }
};
</script>

<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  .container {
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 url(~@/assets/img/background.svg) no-repeat 50%;
    background-size: 100%;
    padding: 20vh 0 0;
    position: relative;
    .top {
      text-align: center;
      img {
        height: 60px;
      }
      span {
        font-size: 30px;
        margin-left: 10px;
        font-weight: bolder;
        vertical-align: middle;
      }
      p {
        color: #999;
        margin: 10px 0;
      }
    }
    .main {
      width: 360px;
      margin: 50px auto 0;
      .ant-btn {
        margin-top: 10vh;
      }
    }
  }
}
</style>
