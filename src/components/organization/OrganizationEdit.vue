<template>
  <div class="organization-edit">
    <fn-template :title="isAdd ? '组织机构 - 添加' : '组织机构 - 编辑'" @on-save="save" @on-cancel="cancel">
      <div class="edit">
        <a-form :form="form">
          <a-form-item v-bind="formItemLayout" label="机构名称：">
            <a-input placeholder="请输入机构名称" v-decorator="orgNameDecorator" />
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="上级机构：">
            <a-tree-select
              :dropdownStyle="{ maxHeight: '30vh', overflow: 'auto' }"
              showSearch
              labelInValue
              allowClear
              treeNodeFilterProp="label"
              :treeData="treeData"
              placeholder="请选择上级机构"
              treeDefaultExpandAll
              v-decorator="pIdDecorator"
            ></a-tree-select>
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="机构简介：">
            <a-textarea placeholder="请输入机构简介" :rows="4" v-decorator="remarkDecorator" />
          </a-form-item>
        </a-form>
      </div>
    </fn-template>
  </div>
</template>

<script>
import FnTemplate from "@/components/common/FnTemplate.vue";
import { editOrg, getOrg } from "@/api/api";
import { hasOf, setDecorator } from "@/libs/util";
export default {
  name: "organization-edit",
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
        getOrg(id).then(res => {
          if (res.data.res) {
            obj.label = (res.data.data && res.data.data.orgName) || "无";
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
        ? this.$store.getters.getOrgTreeForSelect
        : this.$store.getters.getOrgTreeForSelectFilter;
    },

    // 表单验证
    orgNameDecorator() {
      return setDecorator({
        sign: "input",
        key: "orgName",
        title: "机构名称",
        min: 1,
        max: 50
      });
    },
    pIdDecorator() {
      return setDecorator({
        required: false,
        sign: "select",
        key: "pId",
        title: "上级机构",
        initialValue: this.default
      });
    },
    remarkDecorator() {
      return setDecorator({
        required: false,
        sign: "input",
        key: "remark",
        title: "机构简介",
        min: 0,
        max: 2000
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
          editOrg(obj).then(res => {
            if (res.data.res) {
              this.$Message.success(res.data.msg);
              // 刷新左侧树
              this.$store.dispatch("getOrgTree");
              this.cancel();
            }
          });
        }
      });
    },
    cancel() {
      this.$router.push({
        name: "organization"
      });
    }
  },
  created() {
    if (!this.isAdd) {
      let id = this.$route.path.split("/").reverse()[0];
      this.$store.dispatch("getOrgTree", id);
      getOrg(id).then(res => {
        if (res.data.res) {
          let { orgName, pId, remark } = res.data.data;
          // 根据父级id查询父级名称
          getOrg(pId).then(subRes => {
            if (subRes.data.res) {
              this.form.setFieldsValue({
                orgName,
                pId: {
                  value: pId,
                  label: (subRes.data.data && subRes.data.data.orgName) || "无"
                },
                remark
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
.organization-edit {
  width: 100%;
  height: 100%;
  .edit {
    max-width: 500px;
    margin: 100px auto 0;
  }
}
</style>
