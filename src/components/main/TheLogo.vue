<template>
  <div class="the-logo">
    <a href>
      <img :src="require('../../assets/img/logo.png')" alt="logo" />
      <h1>官网后台</h1>
    </a>
  </div>
</template>

<script>
export default {
  name: "the-logo"
};
</script>

<style lang="less" scoped>
@import "../../assets/less/common.less";
.the-logo {
  width: 100%;
  height: 48px;
  margin: 16px 0;
  a {
    display: block;
    height: 100%;
    margin: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    img {
      height: 42px;
    }
    h1 {
      width: 112px;
      overflow: hidden;
      margin: 0;
      white-space: nowrap;
      color: #fff;
      transition: @Animation;
    }
  }
}
</style>
