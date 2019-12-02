<template>
  <div class="bread-crumb">
    <a-breadcrumb>
      <a-breadcrumb-item v-for="list in breadcrumbList" :key="list.title">
        <router-link :to="{name: list.pathname}">
          <a-icon :type="list.icon" />
          <span>{{ list.title }}</span>
        </router-link>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "bread-crumb",
  computed: {
    // 导航栏数据
    menuList() {
      return this.$store.getters.menuList;
    },
    // 面包屑数据
    breadcrumbList() {
      let path = this.$route.path.slice(1);
      let name = this.$route.name;
      let res = [];
      this.menuList.forEach(item => {
        if (path.indexOf(item.path) > -1) {
          if (item.children && item.children.length) {
            res.push({
              ...item,
              pathname: ""
            });
            item.children.forEach(subItem => {
              if (path.indexOf(subItem.path) > -1) {
                res.push(subItem);
              }
            });
          } else {
            res.push(item);
          }
        }
      });

      // 添加后缀，添加 | 修改 | 排序
      if (path.indexOf("add") > -1) {
        res.push({
          icon: "plus",
          path: "/" + path,
          pathname: name,
          title: "添加"
        });
      } else if (path.indexOf("edit") > -1) {
        res.push({
          icon: "edit",
          path: "/" + path,
          pathname: name,
          title: "编辑"
        });
      } else if (path.indexOf("sort") > -1) {
        res.push({
          icon: "sort-ascending",
          path: "/" + path,
          pathname: name,
          title: "排序"
        });
      } else if (path.indexOf("detail") > -1) {
        res.push({
          icon: "home",
          path: "/" + path,
          pathname: name,
          title: "详情"
        });
      } else if (path.indexOf("storage") > -1) {
        res.push({
          icon: "home",
          path: "/" + path,
          pathname: name,
          title: "入库"
        });
      }

      return res;
    }
  }
};
</script>

<style lang="less" scoped>
.bread-crumb {
  width: 100%;
  height: 50px;
  padding: 0 20px;
  .ant-breadcrumb {
    height: 50px;
    line-height: 50px;
  }
}
</style>
