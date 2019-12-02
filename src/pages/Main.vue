<template>
  <div class="Main">
    <!-- 左侧导航栏 -->
    <div ref="left-nav" :class="['left-nav', collapsed ? 'collapsed' : '']">
      <the-logo></the-logo>
      <nav-menu :collapsed="collapsed"></nav-menu>
    </div>

    <!-- 除了导航栏的右侧内容 -->
    <div class="right-main">
      <!-- 头部 -->
      <div class="main-header">
        <div class="left">
          <a-tooltip>
            <template slot="title">{{ collapsed ? '展开' : '收起' }}</template>
            <a-icon
              class="trigger"
              :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="collapsed = !collapsed"
            />
          </a-tooltip>

          <a-tooltip>
            <template slot="title">{{ fixed ? '取消固定' : '固定' }}</template>
            <a-icon type="pushpin" :class="[fixed ? 'fixed' : 'fix']" @click="fixed = !fixed" />
          </a-tooltip>
        </div>
        <div class="right">
          <full-screen></full-screen>
          <the-user></the-user>
          <to-website></to-website>
        </div>
      </div>

      <!-- 内容 -->
      <div class="main-content">
        <!-- <bread-crumb class="main-content-bread"></bread-crumb> -->
        <router-view class="main-content-views"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { on, off } from "@/libs/tools";
import FullScreen from "@/components/main/FullScreen.vue";
import BreadCrumb from "@/components/main/BreadCrumb.vue";
import TheUser from "@/components/main/TheUser.vue";
import NavMenu from "@/components/main/NavMenu.vue";
import TheLogo from "@/components/main/TheLogo.vue";
import ToWebsite from "@/components/main/ToWebsite.vue";
export default {
  name: "Main",
  components: {
    FullScreen,
    BreadCrumb,
    TheUser,
    NavMenu,
    TheLogo,
    ToWebsite
  },
  data() {
    return {
      // 导航栏缩放
      collapsed: false,
      fixed: true,

      // 展开的菜单栏
      openKeys: [],
      // 选中的菜单栏
      selectedKeys: []
    };
  },
  computed: {
    // 导航栏数据
    menuList() {
      return this.$store.getters.menuList;
    }
  },
  methods: {
    showNav() {
      !this.fixed && (this.collapsed = false);
    },
    hideNav() {
      !this.fixed && (this.collapsed = true);
    }
  },
  mounted() {
    on(this.$refs["left-nav"], "mouseenter", this.showNav);
    on(this.$refs["left-nav"], "mouseleave", this.hideNav);
  },
  beforeDestroy() {
    off(this.$refs["left-nav"], "mouseenter", this.showNav);
    off(this.$refs["left-nav"], "mouseleave", this.hideNav);
  }
};
</script>

<style lang="less" scoped>
@import "../assets/less/common.less";
.Main {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  .left-nav {
    width: 200px;
    z-index: 12;
    background: @navBgColor;
    transition: @Animation;
    // 收缩后的样式
    &.collapsed {
      width: @collapsedWidth;
    }
  }
  .right-main {
    flex: 1;
    height: 100%;
    overflow: hidden;
    background: @contentBgColor;
    .main-header {
      background: #fff;
      box-shadow: @shadow;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 10;
      height: 54px;
      .left {
        .trigger {
          font-size: 18px;
          padding: 0 24px;
          cursor: pointer;
          transition: color 0.3s;
          &:hover {
            color: #1890ff;
          }
        }
        .fix {
          padding: 3px;
          font-size: 18px;
          border-radius: 3px;
          cursor: pointer;
        }
        .fixed {
          color: #fff;
          padding: 3px;
          font-size: 18px;
          border-radius: 3px;
          background: #1890ff;
          cursor: pointer;
        }
      }
      .right {
        display: flex;
        align-items: center;
      }
    }
    .main-content {
      width: 100%;
      height: ~"calc(100% - 54px)";
      .main-content-views {
        width: ~"calc(100% - 40px)";
        height: ~"calc(100% - 40px)";
        margin: 20px;
      }
    }
  }
}
</style>