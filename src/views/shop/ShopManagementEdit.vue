<template>
  <div class="shop-management-edit">
    <fn-template
      :isPreview="true"
      :title="isAdd ? '商品管理 - 添加' : '商品管理 - 编辑'"
      @on-save="save"
      @on-cancel="cancel"
      @on-preview="preview"
    >
      <div class="edit">
        <a-tabs>
          <a-tab-pane tab="信息" :key="1">
            <div class="base">
              <a-form :form="form">
                <a-form-item v-bind="formItemLayout" label="所属分类：">
                  <a-tree-select
                    :dropdownStyle="{ maxHeight: '30vh', overflow: 'auto' }"
                    showSearch
                    labelInValue
                    allowClear
                    treeNodeFilterProp="label"
                    :treeData="treeData"
                    placeholder="请选择所属分类"
                    treeDefaultExpandAll
                    v-decorator="productTypeDecorator"
                  ></a-tree-select>
                </a-form-item>

                <a-form-item v-bind="formItemLayout" label="商品名称：">
                  <a-input placeholder="请输入商品名称" v-decorator="productNameDecorator" />
                </a-form-item>

                <a-form-item v-bind="formItemLayout" label="商品价格：">
                  <a-input placeholder="请输入商品价格" type="number" v-decorator="productPriceDecorator" />
                </a-form-item>

                <a-form-item v-bind="formItemLayout" label="是否发布：">
                  <a-select
                    placeholder="请选择是否发布"
                    v-decorator="isPublishDecorator"
                    allowClear
                    showSearch
                    optionFilterProp="children"
                  >
                    <a-select-option :value="1">是</a-select-option>
                    <a-select-option :value="0">否</a-select-option>
                  </a-select>
                </a-form-item>

                <a-form-item v-bind="formItemLayout" label="缩略图：">
                  <upload-img-multiple v-decorator="productImgListDecorator"></upload-img-multiple>
                </a-form-item>
              </a-form>
            </div>
          </a-tab-pane>
          <a-tab-pane :forceRender="true" tab="介绍" :key="2">
            <div class="editor neditor">
              <vue-neditor-wrap v-model="remark" @ready="ready" :config="myConfig"></vue-neditor-wrap>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </fn-template>
  </div>
</template>

<script>
import VueNeditorWrap from "vue-neditor-wrap";
const { api, prod_build_url } = require("../../../config");
import FnTemplate from "@/components/common/FnTemplate.vue";
import UploadImgMultiple from "@/components/common/UploadImgMultiple.vue";
import { getShop, editShop, getShopClassify } from "@/api/api";
import { hasOf, setDecorator } from "@/libs/util";
export default {
  name: "shop-management-edit",
  components: {
    FnTemplate,
    UploadImgMultiple,
    VueNeditorWrap
  },
  computed: {
    isAdd() {
      return !hasOf(this.$route.path, "edit");
    },
    treeData() {
      return this.$store.getters.getShopClassifyForSelect;
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
            obj.label = res.data.typeName;
          }
        });
        return obj;
      } else {
        return null;
      }
    },
    // 表单验证
    productTypeDecorator() {
      return setDecorator({
        sign: "select",
        key: "productType",
        title: "所属分类",
        initialValue: this.default
      });
    },
    productNameDecorator() {
      return setDecorator({
        sign: "input",
        key: "productName",
        title: "商品名称",
        min: 1,
        max: 100
      });
    },
    productPriceDecorator() {
      return setDecorator({
        sign: "input",
        key: "productPrice",
        title: "商品价格",
        customValidator: (rule, value, callback) => {
          //判断字符串是否为数字
          let numberReg = /^[0-9]+.?[0-9]*/;
          if (Number(value) < 0) {
            callback("商品价格不能小于0");
          } else {
            callback();
          }
        }
      });
    },
    isPublishDecorator() {
      return setDecorator({
        sign: "select",
        key: "isPublish",
        title: "是否发布",
        initialValue: 1
      });
    },
    productImgListDecorator() {
      return setDecorator({
        sign: "upload",
        key: "productImgList",
        title: "商品图片"
      });
    }
  },
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
      remark: "",

      editor: "",
      myConfig: {
        // 如果需要上传功能,找后端小伙伴要服务器接口地址
        serverUrl: api + "/api/image/upload",
        // 你的UEditor资源存放的路径,相对于打包后的index.html
        UEDITOR_HOME_URL: prod_build_url + "NEditor/",
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器宽度
        initialFrameWidth: "100%",
        // 关闭自动保存
        enableAutoSave: false
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
                productType: values.productType.value,
                remark: this.remark
              }
            : {
                ...values,
                productType: values.productType.value,
                remark: this.remark,
                id: Number(this.$route.path.split("/").reverse()[0])
              };
          editShop(obj).then(res => {
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
        name: "shop-management"
      });
    },
    // 预览
    preview() {
      this.$store.commit("SET_DETAIL", {
        ...this.form.getFieldsValue(),
        productImgList: this.form.getFieldValue("productImgList")
          ? this.form.getFieldValue("productImgList").map(i => {
              i.imgPath = api + "/api/image?imageName=" + i.imgPath;
              return i;
            })
          : []
      });
      this.$store.commit("SET_VISIBLE", true);
    },

    ready(e) {
      this.editor = e;
      if (!this.isAdd) {
        getShop(this.$route.path.split("/").reverse()[0]).then(res => {
          if (res.data.res) {
            let {
              productType,
              productName,
              productPrice,
              isPublish,
              productImgList,
              remark
            } = res.data.data;
            getShopClassify(productType).then(v => {
              if (v.data.res) {
                this.form.setFieldsValue({
                  productType: {
                    value: productType,
                    label: (v.data.data && v.data.data.typeName) || "无"
                  },
                  productName,
                  productPrice,
                  isPublish,
                  productImgList
                });
                this.remark = remark;
              }
            });
          }
        });
      }
    }
  },
  created() {
    // 获取结构树数据
    this.$store.dispatch("getShopClassifyTree");
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  }
};
</script>

<style lang="less">
.shop-management-edit {
  width: 100%;
  height: 100%;
  .edit {
    width: 100%;
    height: 100%;
    .ant-tabs {
      height: 100%;
      &-content {
        height: ~"calc(100% - 60px)";
        .base {
          max-width: 500px;
          height: ~"calc(100% - 60px)";
          margin: 30px auto;
          overflow: auto;
          .ant-form-item-children {
            width: 100%;
            .ant-calendar-picker {
              width: 100%;
            }
          }
        }
        .editor {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
