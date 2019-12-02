<template>
  <div class="the-user">
    <a-dropdown v-model="show" placement="bottomCenter">
      <div class="user">
        <a-avatar icon="smile" />
        <span class="user-name">
          <span>{{ user.userName }}</span>
          <a-icon :class="show ? 'on' : ''" type="caret-right" />
        </span>
      </div>
      <a-menu slot="overlay">
        <a-menu-item @click="ivewInfo">用户信息</a-menu-item>
        <a-menu-item @click="changeInfo">修改信息</a-menu-item>
        <a-menu-item @click="visible = true">修改密码</a-menu-item>
        <a-menu-item @click="logout">退出登录</a-menu-item>
      </a-menu>
    </a-dropdown>

    <!-- 修改密码弹出框 -->
    <a-modal :maskClosable="false" :closable="false" v-model="visible" title="修改密码" onOk="handleOk">
      <template slot="footer">
        <a-button key="back" @click="handleCancel">返回</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">保存</a-button>
      </template>
      <a-form v-if="visible" :form="form">
        <a-form-item v-bind="formItemLayout" label="旧密码：">
          <a-input type="password" placeholder="请输入旧密码" v-decorator="oldLoginPwdDecorator" />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="新密码：">
          <a-input type="password" placeholder="请输入新密码" v-decorator="newLoginPwdDecorator" />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="重复新密码：">
          <a-input type="password" placeholder="请输入新密码" v-decorator="reNewLoginPwdDecorator" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { getLoginUser, logout, pwdChange } from "@/api/api";
import { setDecorator } from "@/libs/util";
import { delToken } from "../../libs/token";
export default {
  name: "the-user",
  computed: {
    oldLoginPwdDecorator() {
      return setDecorator({
        sign: "input",
        key: "oldLoginPwd",
        title: "旧密码",
        min: 1,
        max: 50
      });
    },
    newLoginPwdDecorator() {
      return setDecorator({
        sign: "input",
        key: "newLoginPwd",
        title: "新密码",
        min: 1,
        max: 50
      });
    },
    reNewLoginPwdDecorator() {
      return setDecorator({
        sign: "input",
        key: "reNewLoginPwd",
        title: "重复新密码",
        min: 1,
        max: 50,
        customValidator: (rule, value, callback) => {
          if (value !== this.form.getFieldValue("newLoginPwd")) {
            callback("两次输入的新密码不一致");
          } else {
            callback();
          }
        }
      });
    }
  },
  data() {
    return {
      show: false,
      user: {},
      // 修改密码框
      visible: false,
      loading: false,
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      }
    };
  },
  methods: {
    ivewInfo() {
      this.$info({
        title: "用户信息",
        content: (
          <div class="info">
            <a-row>
              <a-col span={8} style={{ textAlign: "right" }}>
                姓名：
              </a-col>
              <a-col span={16}>{this.user.userName}</a-col>
            </a-row>
            <a-row>
              <a-col span={8} style={{ textAlign: "right" }}>
                性别：
              </a-col>
              <a-col span={16}>
                {this.user.userSex === 0
                  ? "男"
                  : this.user.userSex === 1
                  ? "女"
                  : "保密"}
              </a-col>
            </a-row>
            <a-row>
              <a-col span={8} style={{ textAlign: "right" }}>
                登录名：
              </a-col>
              <a-col span={16}>{this.user.loginName}</a-col>
            </a-row>
            <a-row>
              <a-col span={8} style={{ textAlign: "right" }}>
                手机号：
              </a-col>
              <a-col span={16}>{this.user.phone}</a-col>
            </a-row>
          </div>
        ),
        okText: "确定"
      });
    },
    logout() {
      this.$confirm({
        title: "退出确认",
        content: "确认退出当前用户？",
        onOk: () => {
          // logout().then(res => {
          this.$Message.success("登出成功！");
          delToken();
          this.$router.push({ name: "login" });
          // });
        }
      });
    },
    // 修改密码
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true;
          let { oldLoginPwd, newLoginPwd } = values;
          pwdChange({
            oldLoginPwd,
            newLoginPwd
          }).then(res => {
            if (res.data.res) {
              this.$Message.success(res.data.msg);
              this.handleCancel();
              delToken();
              this.$router.push({ name: "login" });
              this.$notification.warning({
                message: "登录过期！",
                description: "密码已修改，请重新登录！"
              });
            }
            this.loading = false;
          });
        }
      });
    },
    handleCancel() {
      this.visible = false;
    },

    // 修改信息
    changeInfo() {
      this.$router.push({
        name: "user-edit",
        params: {
          id: this.user.id
        }
      });
    }
  },
  created() {
    getLoginUser().then(res => {
      if (res.data.res) {
        this.user = res.data.data;
      }
    });
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  }
};
</script>

<style lang="less">
@import "../../assets/less/common.less";
.the-user {
  .user {
    display: flex;
    align-items: center;
    cursor: pointer;
    .ant-avatar {
      background: rgb(158, 163, 219);
    }
    .user-name {
      background: rgba(143, 150, 211, 0.2);
      padding: 2px 8px 2px 25px;
      border-radius: 12px;
      margin-left: -15px;
      span {
        margin-right: 10px;
      }
      .anticon {
        transition: @Animation;
        &.on {
          transform: rotate(90deg);
        }
      }
    }
  }
}
.ant-dropdown {
  z-index: 999 !important;
}
.ant-dropdown-menu-item {
  text-align: center;
}
.info {
  .ant-row {
    margin: 10px 0;
    font-size: 16px;
    .ant-col-16 {
      font-weight: bold;
    }
  }
}
</style>
