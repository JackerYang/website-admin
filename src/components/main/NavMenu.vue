<template>
  <div class="nav-menu">
    <ul :class="['menu', collapsed ? 'collapsed' : '']">
      <template v-for="list in menuList">
        <!-- 一级菜单 没有二级菜单 -->
        <li
          :title="list.title"
          v-if="!list.children || !list.children.length"
          :class="['menu-item', selectedKeys === list.pathname ? 'active' : '']"
          @click="jump(list)"
        >
          <a-icon :type="list.icon" />
          <span>{{ list.title }}</span>
        </li>

        <!-- 有二级菜单 -->
        <li
          v-else
          :class="['menu-subItem', openKeys === list.pathname ? 'active' : '']"
          @click="toggle(list)"
        >
          <!-- 展示的一级菜单 -->
          <span class="menu-item">
            <a-icon :type="list.icon" />
            <span>{{ list.title }}</span>
          </span>

          <!-- 下拉箭头 -->
          <a-icon class="arrow" type="down" />

          <!-- 二级菜单 -->
          <ul class="menu-sub">
            <li
              :title="subList.title"
              v-for="subList in list.children"
              :key="subList.title"
              :class="['menu-item', selectedKeys === subList.pathname ? 'active' : '']"
              @click.stop="jump(subList)"
            >
              <a-icon :type="subList.icon" />
              <span>{{ subList.title }}</span>
            </li>
          </ul>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import { hasOf } from "@/libs/util";
export default {
  name: "nav-menu",
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 导航栏数据
    menuList() {
      return this.$store.getters.menuList;
    }
  },
  data() {
    return {
      /**
       * 字符串存值，只存在一个选中的菜单，一个展开的菜单
       * 如需要同时展开多个菜单，需要改为数组Array
       */
      // 展开的菜单栏
      openKeys: "",
      // 选中的菜单栏
      selectedKeys: ""
    };
  },
  methods: {
    // 跳转路由
    jump({ pathname }) {
      // 待修改 =============================== start ===============================
      // 每次切换栏目，把搜索条件至为初始值，检索框状态至为空
      this.$store.commit("CHANGE_SEARCH_FILTER", []);
      this.$store.commit("CHANGE_FILTER_CONDITION", {
        page: 1,
        pageSize: 10,
        id: null
      });
      // 待修改 =============================== end ===============================

      this.$router.push({ name: pathname });
    },

    // 二级菜单栏闭合、展开
    toggle({ pathname }) {
      this.openKeys = this.openKeys === pathname ? "" : pathname;
    },

    // 导航栏初始化
    initFn() {
      let name = this.$route.name;

      this.openKeys = "";

      // 展开正确的菜单栏
      if (hasOf(name, "-")) {
        this.openKeys = name.split("-")[0];
      }

      // 选中正确的菜单栏
      let res = name.match(/-index|-add|-edit|-sort|-detail|-storage/);
      if (res) {
        this.selectedKeys = name.slice(0, -res[0].length);
      } else {
        this.selectedKeys = name;
      }
    }
  },
  watch: {
    $route() {
      this.initFn();
    }
  },
  created() {
    this.initFn();
  }
};
</script>

<style lang="less" scoped>
/*
 * class api
 */

// @paddingLeft 左内边距，也是二级菜单相对于一级菜单的缩进值
// @paddingRight 右内边距
// @space 图标距离汉字的间距
// @itemHeight 菜单栏高度
// @normalColor 正常颜色，未选中的颜色
// @normalBgColor 二级菜单背景颜色
// @activeColor 选中的颜色
// @activeBgColor 选中的背景颜色

// menu 菜单栏根元素的类名
//   menu-item 修饰的子元素只有icon和span，用于一级菜单的类名
//     icon
//     span
//   menu-subItem 有子菜单的一级菜单的类名，与menu-item同级
//     menu-item
//       icon
//       span
//     arrow 下拉箭头
//     menu-sub 二级菜单的内容
//       menu-item
//         icon
//         span

@import "../../assets/less/common.less";
@paddingLeft: 22px;
@paddingRight: 18px;
@space: 10px;
@itemHeight: 40px;
@normalColor: #aaa;
@normalBgColor: #000;
@activeColor: #fff;
@activeBgColor: @mainColor;

.nav-menu {
  width: 100%;
  height: ~"calc(100% - 80px)";
  overflow-y: auto;
  .menu {
    width: 100%;
    &-item {
      width: 100%;
      padding: 0 @paddingRight 0 @paddingLeft;
      color: @normalColor;
      height: @itemHeight;
      line-height: @itemHeight;
      overflow: hidden;
      cursor: pointer;
      .anticon {
        font-size: 14px;
        margin-right: @space;
        transition: @Animation;
      }
      // 菜单选中样式
      &.active {
        background: @activeBgColor;
        color: @activeColor;
      }
    }
    &-subItem {
      width: 100%;
      position: relative;
      color: @normalColor;
      cursor: pointer;
      & > .menu-item {
        display: block;
      }
      .arrow {
        font-size: 10px;
        position: absolute;
        right: 16px;
        top: 15px;
        transition: @Animation;
      }
      .menu-sub {
        max-height: 0;
        overflow: hidden;
        background: @normalBgColor;
        transition: @Animation;
        .menu-item {
          display: block;
          padding-left: @paddingLeft * 2;
        }
      }
      transition: @Animation;
      // 二级菜单展开样式
      &.active {
        & > .menu-item {
          color: @activeColor;
        }
        .arrow {
          transform: rotate(180deg);
          color: @activeColor;
        }
        .menu-sub {
          max-height: 200px;
        }
      }
    }
    // 收缩样式
    &.collapsed {
      .menu-item {
        .anticon {
          margin-right: 0;
        }
      }
      .menu-subItem {
        .arrow {
          font-size: 8px;
          right: 8px;
        }
        .menu-sub {
          .menu-item {
            padding-left: @paddingLeft;
          }
        }
      }
    }
  }
}
</style>
