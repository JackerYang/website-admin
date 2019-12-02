<template>
  <div class="user-edit">
    <fn-template
      :isPreview="true"
      :title="isAdd ? '用户管理 - 添加' : '用户管理 - 编辑'"
      @on-save="save"
      @on-cancel="cancel"
      @on-preview="preview"
    >
      <div class="edit">
        <a-form :form="form">
          <a-form-item v-bind="formItemLayout" label="所属机构：">
            <a-tree-select
              :dropdownStyle="{ maxHeight: '30vh', overflow: 'auto' }"
              showSearch
              labelInValue
              treeNodeFilterProp="label"
              allowClear
              :treeData="treeData"
              placeholder="请选择所属机构"
              treeDefaultExpandAll
              v-decorator="orgIdDecorator"
            ></a-tree-select>
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="姓名：">
            <a-input placeholder="请输入姓名" v-decorator="userNameDecorator" />
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="性别：">
            <a-select
              v-decorator="userSexDecorator"
              placeholder="请选择性别"
              allowClear
              showSearch
              optionFilterProp="children"
            >
              <a-select-option :value="-1">- 保密 -</a-select-option>
              <a-select-option :value="0">男</a-select-option>
              <a-select-option :value="1">女</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="登录名：">
            <a-input placeholder="请输入登录名" v-decorator="loginNameDecorator" />
          </a-form-item>

          <a-form-item v-if="isAdd" v-bind="formItemLayout" label="密码：">
            <a-input type="password" placeholder="请输入密码" v-decorator="loginPwdDecorator" />
          </a-form-item>

          <a-form-item v-if="isAdd" v-bind="formItemLayout" label="重复密码：">
            <a-input type="password" placeholder="请输入密码" v-decorator="loginRePwdDecorator" />
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="手机号：">
            <a-input placeholder="请输入手机号" v-decorator="phoneDecorator" />
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="权限：">
            <a-select
              v-decorator="haveAuthorityDecorator"
              placeholder="请选择权限"
              allowClear
              showSearch
              optionFilterProp="children"
            >
              <a-select-option :value="0">无权限</a-select-option>
              <a-select-option :value="1">有权限</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="是否客服：">
            <a-select
              v-decorator="isCustomerServiceDecorator"
              placeholder="请选择是否任职客服"
              allowClear
              showSearch
              optionFilterProp="children"
            >
              <a-select-option :value="0">否</a-select-option>
              <a-select-option :value="1">是</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="用户头像：">
            <upload-img v-decorator="imgPathDecorator"></upload-img>
          </a-form-item>
        </a-form>
      </div>
    </fn-template>
  </div>
</template>

<script>
const { api } = require("../../../config");
import FnTemplate from "@/components/common/FnTemplate.vue";
import UploadImg from "@/components/common/UploadImg.vue";
import { editUser, getUser, getOrg, isUserExist } from "@/api/api";
import { hasOf, setDecorator } from "@/libs/util";
export default {
  name: "user-edit",
  components: {
    FnTemplate,
    UploadImg
  },
  computed: {
    isAdd() {
      return !hasOf(this.$route.path, "edit");
    },

    default() {
      let id = this.$store.state.common.filterCondition.id;
      if (id) {
        let obj = {
          value: id,
          label: ""
        };
        getOrg(id).then(res => {
          if (res.data.res) {
            obj.label = res.data.orgName;
          }
        });
        return obj;
      } else {
        return null;
      }
    },

    // 结构树数据
    treeData() {
      return this.$store.getters.getOrgTreeForSelect;
    },

    // 表单验证
    orgIdDecorator() {
      return setDecorator({
        sign: "select",
        key: "orgId",
        title: "所属机构",
        initialValue: this.default
      });
    },
    userNameDecorator() {
      return setDecorator({
        sign: "input",
        key: "userName",
        title: "姓名",
        min: 1,
        max: 50
      });
    },
    userSexDecorator() {
      return setDecorator({ sign: "select", key: "userSex", title: "性别" });
    },
    loginNameDecorator() {
      return setDecorator({
        sign: "input",
        key: "loginName",
        title: "登录名",
        min: 1,
        max: 50
      });
    },
    loginPwdDecorator() {
      return setDecorator({
        sign: "input",
        key: "loginPwd",
        title: "密码",
        min: 1,
        max: 50
      });
    },
    loginRePwdDecorator() {
      return setDecorator({
        sign: "input",
        key: "loginRePwd",
        title: "密码",
        min: 1,
        max: 50,
        customValidator: (rule, value, callback) => {
          if (!value || value === this.form.getFieldValue("loginPwd")) {
            callback();
          } else {
            callback("两次输入的密码不一致");
          }
        }
      });
    },
    phoneDecorator() {
      return setDecorator({
        required: false,
        sign: "input",
        key: "phone",
        title: "手机号",
        customPattern: /^1[3456789]\d{9}$/
      });
    },
    haveAuthorityDecorator() {
      return setDecorator({
        sign: "select",
        key: "haveAuthority",
        title: "权限",
        initialValue: 0
      });
    },
    isCustomerServiceDecorator() {
      return setDecorator({
        sign: "select",
        key: "isCustomerService",
        title: "是否任职客服",
        initialValue: 0
      });
    },
    imgPathDecorator() {
      return setDecorator({ sign: "upload", key: "imgPath", title: "图片" });
    }
  },
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      }
    };
  },
  methods: {
    // 保存
    save() {
      this.form.validateFields((err, values) => {
        if (!err) {
          let obj = this.isAdd
            ? {
                ...values,
                orgId: values.orgId.value
              }
            : {
                ...values,
                orgId: values.orgId.value,
                id: Number(this.$route.path.split("/").reverse()[0])
              };
          editUser(obj).then(res => {
            if (res.data.res) {
              this.$Message.success(res.data.msg);
              this.cancel();
            }
          });
        }
      });
    },
    // 取消
    cancel() {
      this.$router.push({
        name: "user"
      });
    },
    // 预览
    preview() {
      this.$store.commit("SET_DETAIL", {
        ...this.form.getFieldsValue(),
        imgPath:
          api + "/api/image?imageName=" + this.form.getFieldValue("imgPath")
      });
      this.$store.commit("SET_VISIBLE", true);
    }
  },
  created() {
    if (!this.isAdd) {
      getUser(this.$route.path.split("/").reverse()[0]).then(res => {
        if (res.data.res) {
          let {
            orgId,
            userName,
            userSex,
            loginName,
            loginPwd,
            phone,
            haveAuthority,
            isCustomerService,
            imgPath
          } = res.data.data;
          // 根据父级id查询父级名称
          getOrg(orgId).then(subRes => {
            if (subRes.data.res) {
              this.form.setFieldsValue({
                orgId: {
                  value: orgId,
                  label: subRes.data.data.orgName
                },
                userName,
                userSex,
                loginName,
                loginPwd,
                loginRePwd: loginPwd,
                phone,
                haveAuthority,
                isCustomerService,
                imgPath
              });
            }
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
.user-edit {
  width: 100%;
  height: 100%;
  .edit {
    max-width: 500px;
    margin: 50px auto 0;
  }
}
.ant-modal-body {
  .ant-row {
    font-size: 14px;
    .label {
      display: inline-block;
      text-align-last: justify;
      margin-right: 15px;
    }
  }
}
</style>
