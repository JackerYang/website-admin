<template>
  <div class="the-sort">
    <fn-template :title="currentItem.title + ' - 排序'" @on-save="save" @on-cancel="cancel">
      <div class="sort">
        <draggable v-model="lists" @update="datadragEnd" v-bind="dragOptions" handle=".drag-item">
          <transition-group type="transition" name="flip-list">
            <div v-for="list in lists" :key="list.id" class="drag-item">
              <span>{{list[currentItem.key]}}</span>
              <a-icon class="drag" type="swap" />
            </div>
            <div v-if="!lists.length" class="drag-item none" :key="0">
              <span>暂无数据</span>
              <a-icon type="warning" />
            </div>
          </transition-group>
        </draggable>
      </div>
    </fn-template>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import FnTemplate from "@/components/common/FnTemplate.vue";
import {
  getOrgSortList,
  editOrgSort,
  getUserSortList,
  editUserSort,
  getOrgScenerySortList,
  editOrgScenerySort,
  getMemberSortList,
  editMemberSort,
  getPlateSortList,
  editPlateSort,
  getShopClassifySortList,
  editShopClassifySort
} from "@/api/api";
export default {
  name: "the-sort",
  components: {
    draggable,
    FnTemplate
  },
  computed: {
    treeId() {
      return this.$store.state.common.filterCondition.id;
    }
  },
  data() {
    return {
      lists: [],
      originLists: [],
      dragOptions: {
        animation: 500
      },
      // 当前的排序信息
      currentItem: {}
    };
  },
  methods: {
    datadragEnd(evt) {
      evt.preventDefault();
    },
    save() {
      this.currentItem
        .set({
          oldSortList: this.originLists,
          newSortList: this.lists
        })
        .then(res => {
          if (res.data.res) {
            this.$Message.success(res.data.msg);
            this.currentItem.back === "organization" &&
              this.$store.dispatch("getOrgTree");
            this.currentItem.back === "shop-classify" &&
              this.$store.dispatch("getShopClassifyTree");
            this.cancel();
          }
        });
    },
    cancel() {
      this.$router.push({
        name: this.currentItem.back
      });
    },
    // 初始化事件
    init() {
      const obj = {
        organization: {
          title: "组织机构",
          key: "orgName",
          get: params => getOrgSortList(params),
          set: params => editOrgSort(params),
          back: "organization"
        },
        user: {
          title: "用户管理",
          key: "userName",
          get: params => getUserSortList(params),
          set: params => editUserSort(params),
          back: "user"
        },
        scenery: {
          title: "企业风光",
          key: "title",
          get: params => getOrgScenerySortList(params),
          set: params => editOrgScenerySort(params),
          back: "company-scenery"
        },
        member: {
          title: "主要成员",
          key: "name",
          get: params => getMemberSortList(params),
          set: params => editMemberSort(params),
          back: "member"
        },
        plate: {
          title: "板块管理",
          key: "plateName",
          get: params => getPlateSortList(params),
          set: params => editPlateSort(params),
          back: "plate"
        },
        classify: {
          title: "商品分类",
          key: "typeName",
          get: params => getShopClassifySortList(params),
          set: params => editShopClassifySort(params),
          back: "shop-classify"
        }
      };
      let key = this.$route.path.split("/").reverse()[1];
      this.currentItem = obj[key];
    }
  },
  created() {
    this.init();

    this.currentItem.get(this.treeId).then(res => {
      if (res.data.res) {
        this.lists = res.data.data;
        this.originLists = res.data.data;
      }
    });
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/less/common.less";
.the-sort {
  width: 100%;
  height: 100%;
  .sort {
    width: 400px;
    max-height: ~"calc(100% - 60px)";
    margin: 30px auto 0;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    overflow: auto;
    .drag-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #efefef;
      margin: 5px 0;
      padding: 3px 10px;
      font-size: 16px;
      border-radius: 5px;
      border-left: 5px solid @mainColor;
      cursor: move;
      .drag {
        transform: rotate(270deg);
      }
      &.none {
        border-left-color: #faad14;
        font-style: italic;
        .anticon {
          color: #faad14;
        }
      }
    }
  }
}
</style>
