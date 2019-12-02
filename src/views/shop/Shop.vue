<template>
  <div class="shop">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "shop"
};
</script>

<style lang="less" scoped>
@import "../../assets/less/common.less";
.shop {
  width: 100%;
  height: 100%;
}
</style>
