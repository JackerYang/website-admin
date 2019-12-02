<template>
  <div class="shop-record-detail">
    <fn-content title="入库管理 - 入库详情" :btnList="btnList">
      <div class="base">
        <div class="title">基本信息</div>
        <div class="info">
          <span>
            <span>货源：</span>
            <span class="val">{{ allData.productSource }}</span>
          </span>
          <span>
            <span>入库时间：</span>
            <span class="val">{{ allData.createDate }}</span>
          </span>
        </div>
        <div class="info">
          <span>
            <span>备注：</span>
            <span class="val">{{ allData.remark || "无" }}</span>
          </span>
        </div>
      </div>
      <div class="product">
        <div class="title">入库商品</div>
        <div class="items">
          <div class="item" v-for="item in allData.productInboundRecordDetailList" :key="item.id">
            <span class="img">
              <img :src="item.firstProductImgPath" />
            </span>
            <span class="name">{{ item.productName }}</span>
            <span>{{ item.num }}&ensp;件</span>
          </div>
        </div>
      </div>
    </fn-content>
  </div>
</template>

<script>
import FnContent from "@/components/common/FnContent.vue";
import { inBoundRecordDetail } from "@/api/api";
export default {
  name: "shop-record-detail",
  components: {
    FnContent
  },
  data() {
    return {
      allData: {},

      btnList: [
        {
          label: "返回",
          type: "default",
          icon: "left",
          ghost: false,
          condition: 0,
          fn: this.back
        }
      ]
    };
  },
  methods: {
    back() {
      this.$router.push({ name: "shop-record" });
    }
  },
  created() {
    let id = this.$route.path.split("/").reverse()[0];
    inBoundRecordDetail(id).then(res => {
      if (res.data.res) {
        this.allData = res.data.data;
      }
    });
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/less/common.less";
.shop-record-detail {
  width: 100%;
  height: 100%;
  .title {
    height: 40px;
    line-height: 40px;
    background: #efefef;
    padding: 0 20px;
    font-size: 14px;
    font-weight: bold;
    border: 1px solid #d9d9d9;
    border-bottom: none;
  }
  .base {
    width: 100%;
    margin-bottom: 20px;
    .info {
      padding: 15px 20px;
      border: 1px solid #d9d9d9;
      border-top: none;
      & > span {
        margin-right: 30px;
      }
      .val {
        font-weight: bold;
      }
    }
  }
  .product {
    width: 100%;
    .items {
      padding: 20px;
      border: 1px solid #d9d9d9;
      border-top: none;
      transition: @Animation;
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 20px 5px 5px;
        transition: @Animation;
        &:hover {
          background: #a0b8eb49;
        }
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
        &:not(:last-child) {
          border-bottom: 1px solid #efefef;
        }
      }
    }
  }
}
</style>