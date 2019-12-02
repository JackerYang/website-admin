<template>
  <div class="shop-management-storage">
    <fn-template title="入库管理 - 商品入库" @on-save="save" @on-cancel="cancel">
      <a-form :form="form">
        <a-form-item v-bind="formItemLayout" label="货源：">
          <a-input placeholder="请输入货源" v-decorator="productSourceDecorator" />
        </a-form-item>

        <a-form-item v-bind="formItemLayout" label="备注：">
          <a-textarea
            placeholder="请输入备注"
            v-decorator="remarkDecorator"
            :autosize="{minRows: 2, maxRows: 2}"
          />
        </a-form-item>

        <a-form-item v-bind="formItemLayout" label="商品：">
          <div class="select">
            <!-- 分类 -->
            <a-tree-select
              @change="selectClassify"
              :dropdownStyle="{ maxHeight: '30vh', overflow: 'auto' }"
              showSearch
              labelInValue
              treeNodeFilterProp="label"
              allowClear
              :treeData="treeData"
              placeholder="商品分类"
              treeDefaultExpandAll
              v-model="selectedClassify"
            ></a-tree-select>
            <!-- 商品 -->
            <a-select
              @change="selectProduct"
              v-model="selectedProduct"
              placeholder="选择商品"
              allowClear
            >
              <a-select-option v-for="p in allProduct" :key="p.id" :value="p.id">{{ p.productName }}</a-select-option>
            </a-select>
            <!-- 数量 -->
            <span class="count">{{ allProduct.length }} 个结果</span>
          </div>
          <div class="items">
            <div class="item" v-for="item in productList" :key="item.id">
              <div class="pro">
                <span class="img">
                  <img :src="item.firstProductImgPath" />
                </span>
                <span class="name">{{ item.productName }}</span>
                <span>
                  <a-input-number v-model="item.num" :min="1" />&ensp;件
                </span>
              </div>
              <a-icon class="close" @click="delItem(item.id)" type="close" />
            </div>
            <div style="text-align: center;" v-if="!productList.length">
              <span>请选择需要入库的商品！</span>
            </div>
          </div>
        </a-form-item>
      </a-form>
    </fn-template>
  </div>
</template>

<script>
import FnTemplate from "@/components/common/FnTemplate.vue";
import {
  getShopList,
  inBoundShop,
  getShopClassifyTree,
  getShopClassify
} from "@/api/api";
import { setDecorator } from "@/libs/util";
export default {
  name: "shop-management-storage",
  components: {
    FnTemplate
  },
  computed: {
    // 表单验证
    productSourceDecorator() {
      return setDecorator({
        sign: "input",
        key: "productSource",
        title: "货源",
        min: 1,
        max: 30
      });
    },
    remarkDecorator() {
      return setDecorator({
        required: false,
        sign: "input",
        key: "remark",
        title: "备注"
      });
    },
    // 商品分类
    treeData() {
      return this.$store.getters.getShopClassifyForSelect;
    }
  },
  data() {
    return {
      // 入库商品
      productList: [],

      // 所有商品
      allProduct: [],

      selectedProduct: undefined,
      selectedClassify: null,

      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      }
    };
  },
  methods: {
    // 获取商品数据
    getData(productType) {
      getShopList({ productType }).then(res => {
        if (res.data.res) {
          this.allProduct = res.data.data;
        }
      });
    },
    // 选择商品分类
    selectClassify(obj) {
      obj ? this.getData(obj.value) : this.getData();
      this.selectedProduct = undefined;
    },
    // 选择商品
    selectProduct(id) {
      if (this.productList.filter(p => p.id === id).length) {
        this.$Message.warning("该商品已添加！");
        return;
      }
      let products = JSON.parse(JSON.stringify(this.allProduct));
      let product = products.filter(p => p.id === id)[0];
      if (!product) {
        return;
      }
      product.num = 1;
      this.productList.push(product);
    },

    delItem(id) {
      this.productList.forEach((item, index) => {
        if (item.id === id) {
          if (this.selectedProduct === id) {
            this.selectedProduct = undefined;
          }
          this.productList.splice(index, 1);
        }
      });
    },

    // 保存
    save() {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.productList.length) {
            let products = this.productList.map(i => ({
              productId: i.id,
              num: i.num
            }));
            inBoundShop({
              ...values,
              productInboundRecordDetailList: products
            }).then(res => {
              if (res.data.res) {
                this.$Message.success(res.data.msg);
                this.cancel();
              }
            });
          } else {
            this.$Message.warning("请选择需要入库的商品！");
          }
        }
      });
    },
    cancel() {
      this.$router.push({
        name: "shop-record"
      });
    }
  },
  created() {
    let id = this.$store.state.common.filterCondition.id;
    if (id) {
      getShopClassify(id).then(res => {
        if (res.data.res) {
          this.selectedClassify = {
            value: id,
            label: res.data.typeName
          };
          this.getData(id);
        }
      });
    } else {
      this.getData();
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/less/common.less";
.shop-management-storage {
  width: 100%;
  height: 100%;
  background: #fff;
  box-shadow: @shadow;
  .select {
    .ant-select {
      width: ~"calc(50% - 40px)";
      margin-right: 10px;
    }
    .count {
      color: #999;
    }
  }
  .items {
    transition: @Animation;
    padding: 20px 0;
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px;
      width: 100%;
      position: relative;
      &:hover {
        background: #efefef;
        .close {
          display: block;
        }
      }
      .pro {
        width: ~"calc(100% - 40px)";
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .img {
          width: 60px;
          height: 60px;
          padding: 1px;
          border: 1px solid #ccc;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .name {
          width: ~"calc(100% - 200px)";
          font-size: 14px;
          line-height: 24px;
        }
      }
      &:not(:last-child) {
        border-bottom: 1px solid #f1f1f1;
      }
      .close {
        display: none;
        position: absolute;
        right: 0px;
        top: 0px;
        width: 15px;
        height: 15px;
        color: #fff;
        background: rgb(240, 80, 80);
        cursor: pointer;
      }
    }
  }
}
</style>