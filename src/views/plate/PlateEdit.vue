<template>
  <div class="plate-edit">
    <fn-template :title="isAdd ? '板块管理 - 添加' : '板块管理 - 编辑'" @on-save="save" @on-cancel="cancel">
      <div class="edit">
        <a-form :form="form">
          <a-form-item v-bind="formItemLayout" label="板块名称：">
            <a-input placeholder="请输入板块名称" v-decorator="plateNameDecorator" />
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="是否启用：">
            <a-select
              placeholder="请选择是否启用"
              v-decorator="isUseDecorator"
              allowClear
              showSearch
              optionFilterProp="children"
            >
              <a-select-option :value="1">是</a-select-option>
              <a-select-option :value="0">否</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="板块图标：">
            <upload-img v-decorator="plateIconDecorator"></upload-img>
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="板块背景：">
            <upload-img v-decorator="plateImgDecorator"></upload-img>
          </a-form-item>
        </a-form>
      </div>
    </fn-template>
  </div>
</template>

<script>
import FnTemplate from "@/components/common/FnTemplate.vue";
import UploadImg from "@/components/common/UploadImg.vue";
import { editPlate, getPlate } from "@/api/api";
import { hasOf, setDecorator } from "@/libs/util";
export default {
  name: "plate-edit",
  components: {
    FnTemplate,
    UploadImg
  },
  computed: {
    isAdd() {
      return !hasOf(this.$route.path, "edit");
    },

    // 表单验证
    plateNameDecorator() {
      return setDecorator({
        sign: "input",
        key: "plateName",
        title: "板块名称",
        min: 1,
        max: 50
      });
    },
    isUseDecorator() {
      return setDecorator({
        sign: "select",
        key: "isUse",
        title: "是否启用",
        initialValue: 1
      });
    },
    plateIconDecorator() {
      return setDecorator({
        sign: "upload",
        key: "plateIcon",
        title: "板块图标"
      });
    },
    plateImgDecorator() {
      return setDecorator({
        sign: "upload",
        key: "plateImg",
        title: "板块背景"
      });
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
          editPlate(obj).then(res => {
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
        name: "plate"
      });
    }
  },
  created() {
    if (!this.isAdd) {
      getPlate(this.$route.path.split("/").reverse()[0]).then(res => {
        if (res.data.res) {
          let { plateName, isUse, plateIcon, plateImg } = res.data.data;
          this.form.setFieldsValue({
            plateName,
            isUse,
            plateIcon,
            plateImg
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

<style lang="less">
.plate-edit {
  width: 100%;
  height: 100%;
  .edit {
    max-width: 500px;
    margin: 100px auto 0;
  }
}
</style>
