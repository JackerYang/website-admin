<template>
  <div class="shop-layout">
    <div :class="['left', show ? '' : 'hide']">
      <classify-tree v-show="show"></classify-tree>
      <p @click="show = !show">
        <a-icon type="left" />
      </p>
    </div>
    <div class="right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ClassifyTree from "@/components/shop/ClassifyTree.vue";
export default {
  name: "shop-layout",
  components: {
    ClassifyTree
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
@import "../../assets/less/common.less";
.shop-layout {
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
