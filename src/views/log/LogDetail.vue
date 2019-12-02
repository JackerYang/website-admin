<template>
  <div class="log-detail">
    <fn-content title="日志详情" :btnList="btnList">
      <div class="base">
        <div class="title">基本信息</div>
        <div class="info">
          <a-row>
            <a-col :span="12">
              <span>操&ensp;作&ensp;人：</span>
              <span class="val">{{ allData.userName }}</span>
            </a-col>
            <a-col :span="12">
              <span>操作时间：</span>
              <span class="val">{{ allData.createDate }}</span>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <span>操作类型：</span>
              <span class="val">{{ allData.logType }}</span>
            </a-col>
            <a-col :span="12">
              <span>操作结果：</span>
              <span class="val">{{ allData.logResult ? '成功' : '失败' }}</span>
            </a-col>
          </a-row>
        </div>
      </div>
      <div class="log-content">
        <div class="title">操作内容</div>
        <div class="content">{{ allData.content }}</div>
      </div>
    </fn-content>
  </div>
</template>

<script>
import FnContent from "@/components/common/FnContent.vue";
import { getLogDetail } from "@/api/api";
export default {
  name: "log-detail",
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
      this.$router.push({ name: "log" });
    }
  },
  created() {
    let id = this.$route.path.split("/").reverse()[0];
    getLogDetail(id).then(res => {
      if (res.data.res) {
        this.allData = res.data.data;
      }
    });
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/less/common.less";
.log-detail {
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
  .log-content {
    width: 100%;
    .content {
      padding: 20px;
      border: 1px solid #d9d9d9;
      border-top: none;
    }
  }
}
</style>