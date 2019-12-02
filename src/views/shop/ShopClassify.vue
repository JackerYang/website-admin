<template>
  <div class="shop-classify">
    <shop-layout>
      <router-view></router-view>
    </shop-layout>
  </div>
</template>

<script>
import ShopLayout from "@/components/shop/ShopLayout.vue";
export default {
  name: "shop-classify",
  components: {
    ShopLayout
  }
};
</script>

<style lang="less" scoped>
.shop-classify {
  width: 100%;
  height: 100%;
}
</style>
