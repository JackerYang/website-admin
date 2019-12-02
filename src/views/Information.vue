<template>
  <div class="information">
    <div :class="['left', show ? '' : 'hide']">
      <information-nav v-show="show"></information-nav>
      <p @click="show = !show">
        <a-icon type="left" />
      </p>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>

    <!-- 预览 -->
    <a-modal
      title="预览"
      width="80vw"
      :visible="visible"
      @ok="$store.commit('SET_VISIBLE', false)"
      @cancel="$store.commit('SET_VISIBLE', false)"
      :cancelButtonProps="{ style: {display: 'none'} }"
    >
      <a-row>
        <a-col :span="8">
          <span class="label">是否发布：</span>
          <span>{{ detail.isPublish === 0 ? '否' : '是' }}</span>
        </a-col>
        <a-col :span="8">
          <span class="label">是否置顶：</span>
          <span>{{ detail.isTop === 0 ? '否' : '是' }}</span>
        </a-col>
        <a-col :span="8">
          <span class="label">所属板块：</span>
          <span>{{ detail.plate && plates.filter(p => p.id === detail.plate)[0].plateName }}</span>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <span class="label">同步到企业印象：</span>
          <span>{{ detail.orgImpression === 0 ? '否' : '是' }}</span>
        </a-col>
        <a-col :span="8">
          <span class="label">同步到企业成果：</span>
          <span>{{ detail.orgAchievement === 0 ? '否' : '是' }}</span>
        </a-col>
      </a-row>

      <div class="show">
        <h2>{{ detail.title }}</h2>
        <hr />
        <p class="time">时间：{{ detail.eventDate }}</p>
        <p class="sub">{{ detail.subTitle }}</p>
        <img v-if="detail.imgPath" :src="detail.imgPath" />
        <p v-html="detail.content"></p>
      </div>
    </a-modal>
  </div>
</template>

<script>
import InformationNav from "@/components/information/InformationNav.vue";
import FnTable from "@/components/common/FnTable.vue";
export default {
  name: "information",
  components: {
    InformationNav,
    FnTable
  },
  computed: {
    plates() {
      return this.$store.state.information.plateList;
    },
    visible() {
      return this.$store.state.common.visible;
    },
    detail() {
      return this.$store.state.common.detail;
    }
  },
  data() {
    return {
      show: true
    };
  }
};
</script>

<style lang="less" scoped>
@import "../assets/less/common.less";
.information {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  .left {
    width: 240px;
    height: 100%;
    background: #fff;
    box-shadow: @shadow;
    margin: 0 15px 0 0;
    transition: @Animation;
    z-index: 2;
    position: relative;
    & > p {
      width: 20px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      background: #efefef;
      cursor: pointer;
      position: absolute;
      right: 0;
      top: 50%;
      margin-top: -40px;
      transition: @Animation;
      border-radius: 20px 0 0 20px;
      .anticon {
        transition: @Animation;
        font-size: 18px;
      }
    }
    &.hide {
      width: 0px;
      cursor: pointer;
      & > p {
        right: -20px;
        background: #fff;
        border-radius: 0 20px 20px 0;
        .anticon {
          transform: rotate(180deg);
        }
      }
      & + .right {
        width: ~"calc(100% - 35px)";
      }
    }
  }
  .right {
    position: absolute;
    right: 0;
    width: ~"calc(100% - 255px)";
    height: 100%;
    transition: @Animation;
  }
}
.ant-modal-body {
  .ant-row {
    font-size: 14px;
    .label {
      margin-right: 15px;
    }
  }
  .show {
    text-align: center;
    h2 {
      margin: 20px 0;
    }
    .time {
      font-size: 14px;
      text-align: right;
      color: #ccc;
      margin: 20px 0;
    }
    .sub {
      text-align: center;
      font-size: 16px;
      margin-bottom: 40px;
      font-weight: bold;
    }
    img {
      max-width: 80%;
      margin-bottom: 40px;
    }
    & /deep/ p {
      font-size: 16px;
      margin: 10px 0;
      text-align: left;
      &:first-child {
        margin-top: 50px;
      }
    }
    & /deep/ img {
      max-width: 100%;
    }
  }
}
</style>
