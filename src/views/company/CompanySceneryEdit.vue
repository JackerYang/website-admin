<template>
  <div class="company-scenery-edit">
    <fn-template :title="isAdd ? '企业风光 - 添加': '企业风光 - 编辑'" @on-save="save" @on-cancel="cancel">
      <div class="edit">
        <a-form :form="form">
          <a-form-item v-bind="formItemLayout" label="标题：">
            <a-input placeholder="请输入标题" v-decorator="titleDecorator" />
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="选择图片：">
            <upload-img v-decorator="imgPathDecorator"></upload-img>
          </a-form-item>
        </a-form>
      </div>
    </fn-template>
  </div>
</template>

<script>
import FnTemplate from "@/components/common/FnTemplate.vue";
import UploadImg from "@/components/common/UploadImg.vue";
import { getOrgScenery, editOrgScenery } from "@/api/api";
import { hasOf, setDecorator } from "@/libs/util";
export default {
  name: "company-scenery-edit",
  components: {
    FnTemplate,
    UploadImg
  },
  computed: {
    isAdd() {
      return !hasOf(this.$route.path, "edit");
    },

    // 表单验证
    titleDecorator() {
      return setDecorator({
        required: false,
        sign: "input",
        key: "title",
        title: "标题",
        min: 0,
        max: 100
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
    save() {
      this.form.validateFields((err, values) => {
        if (!err) {
          let obj = this.isAdd
            ? values
            : {
                ...values,
                id: Number(this.$route.path.split("/").reverse()[0])
              };
          editOrgScenery(obj).then(res => {
            if (res.data.res) {
              this.$Message.success(res.data.msg);
              this.cancel();
            }
          });
        }
      });
    },
    cancel() {
      this.$router.push({
        name: "company-scenery"
      });
    }
  },
  created() {
    if (!this.isAdd) {
      getOrgScenery(this.$route.path.split("/").reverse()[0]).then(res => {
        if (res.data.res) {
          let { title, imgPath } = res.data.data;
          this.form.setFieldsValue({
            title,
            imgPath
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
.company-scenery-edit {
  width: 100%;
  height: 100%;
  .edit {
    max-width: 500px;
    margin: 100px auto 0;
  }
}
</style>
