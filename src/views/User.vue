<template>
  <div class="user">
    <div :class="['left', show ? '' : 'hide']">
      <org-tree v-show="show"></org-tree>
      <p @click="show = !show">
        <a-icon type="left" />
      </p>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>

    <!-- 预览详情框 -->
    <a-modal
      title="预览"
      :visible="visible"
      @ok="$store.commit('SET_VISIBLE', false)"
      @cancel="$store.commit('SET_VISIBLE', false)"
      :cancelButtonProps="{ style: {display: 'none'} }"
    >
      <a-row>
        <a-col :span="12">
          <span class="label">头&emsp;&emsp;像：</span>
          <img width="60" :src="detail.imgPath" />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <span class="label">姓&emsp;&emsp;名：</span>
          <span>{{ detail.userName }}</span>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <span class="label">登&ensp;录&ensp;名：</span>
          <span>{{ detail.loginName }}</span>
        </a-col>
        <a-col :span="12">
          <span class="label">性&emsp;&emsp;别：</span>
          <span>{{ detail.userSex === 0 ? '男' : detail.userSex === 1 ? '女' : '保密' }}</span>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <span class="label">手&ensp;机&ensp;号：</span>
          <span>{{ detail.phone }}</span>
        </a-col>
        <a-col :span="12">
          <span class="label">后台权限：</span>
          <span>{{ detail.haveAuthority === 0 ? '无' : '有' }}</span>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <span class="label">是否客服：</span>
          <span>{{ detail.isCustomerService === 0 ? '否' : '是' }}</span>
        </a-col>
        <a-col :span="12">
          <span class="label">所属机构：</span>
          <span>{{ detail.orgName || detail.orgId && detail.orgId.label }}</span>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
import OrgTree from "@/components/common/OrgTree.vue";
import FnTable from "@/components/common/FnTable.vue";
export default {
  name: "user",
  components: {
    OrgTree,
    FnTable
  },
  computed: {
    visible() {
      return this.$store.state.common.visible;
    },
    detail() {
      return this.$store.state.common.detail;
    }
  },
  data() {
    return {
      // 是否展示次级导航栏
      show: true
    };
  }
};
</script>

<style lang="less" scoped>
@import "../assets/less/common.less";
.user {
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
</style>
