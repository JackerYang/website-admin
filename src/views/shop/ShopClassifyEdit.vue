<template>
  <div class="shop-classify-edit">
    <fn-template :title="isAdd ? '分类管理 - 添加' : '分类管理 - 编辑'" @on-save="save" @on-cancel="cancel">
      <div class="edit">
        <a-form :form="form">
          <a-form-item v-bind="formItemLayout" label="分类名称：">
            <a-input placeholder="请输入分类名称" v-decorator="orgNameDecorator" />
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="上级分类：">
            <a-tree-select
              :dropdownStyle="{ maxHeight: '30vh', overflow: 'auto' }"
              showSearch
              labelInValue
              allowClear
              treeNodeFilterProp="label"
              :treeData="treeData"
              placeholder="请选择上级分类"
              treeDefaultExpandAll
              v-decorator="pIdDecorator"
            ></a-tree-select>
          </a-form-item>
        </a-form>
      </div>
    </fn-template>
  </div>
</template>

<script>
import FnTemplate from "@/components/common/FnTemplate.vue";
import { editShopClassify, getShopClassify } from "@/api/api";
import { hasOf, setDecorator } from "@/libs/util";
export default {
  name: "shop-classify-edit",
  components: {
    FnTemplate
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
        getShopClassify(id).then(res => {
          if (res.data.res) {
            obj.label = res.data.data && res.data.data.typeName;
          }
        });
        return obj;
      } else {
        return null;
      }
    },

    // 结构树数据
    treeData() {
      return this.isAdd
        ? this.$store.getters.getShopClassifyForSelect
        : this.$store.getters.getShopClassifyForSelectFilter;
    },

    // 表单验证
    orgNameDecorator() {
      return setDecorator({
        sign: "input",
        key: "typeName",
        title: "分类名称",
        min: 1,
        max: 50
      });
    },
    pIdDecorator() {
      return setDecorator({
        required: false,
        sign: "select",
        key: "pId",
        title: "上级分类",
        initialValue: this.default
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
            ? {
                ...values,
                pId: values.pId ? values.pId.value : null
              }
            : {
                ...values,
                pId: values.pId ? values.pId.value : null,
                id: Number(this.$route.path.split("/").reverse()[0])
              };
          editShopClassify(obj).then(res => {
            if (res.data.res) {
              this.$Message.success(res.data.msg);
              // 刷新左侧树
              this.$store.dispatch("getShopClassifyTree");
              this.cancel();
            }
          });
        }
      });
    },
    cancel() {
      this.$router.push({
        name: "shop-classify"
      });
    }
  },
  created() {
    // 获取结构树数据
    this.$store.dispatch("getShopClassifyTree");
    if (!this.isAdd) {
      let id = this.$route.path.split("/").reverse()[0];
      this.$store.dispatch("getShopClassifyTree", id);
      getShopClassify(id).then(res => {
        if (res.data.res) {
          let { typeName, pId } = res.data.data;
          // 根据父级id查询父级名称
          getShopClassify(pId).then(subRes => {
            if (subRes.data.res) {
              this.form.setFieldsValue({
                typeName,
                pId: {
                  value: pId,
                  label: (subRes.data.data && subRes.data.data.typeName) || "无"
                }
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
.shop-classify-edit {
  width: 100%;
  height: 100%;
  .edit {
    max-width: 500px;
    margin: 100px auto 0;
  }
}
</style>
