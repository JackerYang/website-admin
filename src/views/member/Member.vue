<template>
  <div class="member">
    <fn-content
      title="主要成员"
      :searchList="searchList"
      :btnList="btnList"
      :selectedRowKeys="selectedRowKeys"
      @handleSearch="handleSearch"
    >
      <div class="members">
        <a-checkbox-group v-model="selectedRowKeys">
          <a-checkbox v-for="member in members" :key="member.id" :value="member.id">
            <div class="item">
              <div class="title">{{ member.title }}</div>
              <div class="main">
                <img :src="member.imgPath" />
                <div class="info">
                  <p>{{ member.name }}</p>
                  <p>{{ member.birthday }}生</p>
                  <p>{{ member.nation }}</p>
                  <p>{{ member.politicCountenance }}</p>
                  <p>{{ member.workDate }}工作</p>
                  <p @click.stop="viewDetail(member.id)" class="more">
                    <span>阅读全部</span>
                    <a-icon type="caret-right" />
                  </p>
                </div>
              </div>
            </div>
          </a-checkbox>
          <a-checkbox style="z-index: -1;" v-for="n in 4" :key="n.id"></a-checkbox>
        </a-checkbox-group>
        <the-empty v-if="!members.length">
          <div class="item"></div>
        </the-empty>
      </div>
    </fn-content>
  </div>
</template>

<script>
import FnContent from "@/components/common/FnContent.vue";
import TheEmpty from "@/components/common/TheEmpty.vue";
import { getMemberList, delMember } from "@/api/api";
export default {
  name: "member",
  components: {
    FnContent,
    TheEmpty
  },
  data() {
    return {
      searchList: [
        {
          label: "姓名",
          value: "name",
          key: "input"
        },
        {
          label: "职称",
          value: "title",
          key: "input"
        },
        {
          label: "民族",
          value: "nation",
          key: "select",
          options: [
            {
              label: "汉族",
              value: "汉族"
            },
            {
              label: "维吾尔族",
              value: "维吾尔族"
            },
            {
              label: "傣族",
              value: "傣族"
            },
            {
              label: "回族",
              value: "回族"
            }
          ]
        },
        {
          label: "政治面貌",
          value: "politicCountenance",
          key: "select",
          options: [
            {
              label: "中共党员",
              value: "中共党员"
            },
            {
              label: "共青团员",
              value: "共青团员"
            },
            {
              label: "群众",
              value: "群众"
            }
          ]
        }
      ],
      // 按钮列表
      btnList: [
        {
          label: "新建",
          type: "default",
          icon: "plus",
          ghost: false,
          condition: 0,
          fn: this.add
        },
        {
          label: "编辑",
          type: "default",
          icon: "edit",
          ghost: false,
          condition: 1,
          fn: this.edit
        },
        {
          label: "删除",
          type: "danger",
          icon: "delete",
          ghost: false,
          condition: 2,
          fn: this.del
        },
        {
          label: "排序",
          type: "default",
          icon: "sort-ascending",
          ghost: false,
          condition: 0,
          fn: this.sort
        }
      ],
      members: [],
      selectedRowKeys: []
    };
  },
  methods: {
    // 筛选
    handleSearch(item) {
      this.selectedRowKeys = [];
      this.getData(item);
    },

    // 获取数据
    getData(params) {
      getMemberList(params).then(res => {
        if (res.data.res) {
          this.members = res.data.data.map(item => {
            item.birthday = this.$moment(item.birthday).format(
              "YYYY年MM月DD日"
            );
            item.workDate = this.$moment(item.workDate).format(
              "YYYY年MM月DD日"
            );
            return item;
          });
        }
      });
    },

    // 添加 || 编辑 || 删除 || 排序 || 查看详情
    add() {
      this.$router.push({
        name: "member-add"
      });
    },
    edit() {
      this.$router.push({
        name: "member-edit",
        params: {
          id: this.selectedRowKeys[0]
        }
      });
    },
    del() {
      this.$confirm({
        title: "确定删除？",
        content: (
          <p>
            确定删除当前选中的
            <span style="color: #f00;">{this.selectedRowKeys.length}</span>
            位主要成员？
          </p>
        ),
        onOk: () => {
          return new Promise(resolve => {
            delMember(this.selectedRowKeys).then(res => {
              if (res.data.res) {
                this.$Message.success(res.data.msg);
                this.getData();
              }
              resolve();
            });
          });
        }
      });
    },
    sort() {
      this.$router.push({
        name: "member-sort"
      });
    },
    viewDetail(id) {
      this.$router.push({
        name: "member-detail",
        params: {
          id
        }
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="less">
@import "../../assets/less/common.less";
.member {
  width: 100%;
  height: 100%;
  .members {
    width: 100%;
    height: 100%;
    .ant-checkbox-group {
      width: 100%;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      .ant-checkbox-wrapper {
        position: relative;
        border: 2px solid transparent;
        padding: 5px;
        min-width: 320px;
        transition: @Animation;
        width: 24%;
        margin: 0 0 10px 0;
        &.ant-checkbox-wrapper-checked {
          border: 2px solid @mainColor;
        }
        .ant-checkbox {
          position: absolute;
          right: 12px;
          top: 12px;
          & + span {
            padding: 0;
            margin: 0;
          }
        }
        .item {
          width: 100%;
          height: 100%;
          .title {
            height: 30px;
            line-height: 30px;
            padding: 0 15px;
            background: rgba(247, 212, 135, 0.5);
            border-left: 5px solid #f00;
            margin-bottom: 10px;
          }
          .main {
            width: 100%;
            img {
              float: left;
              width: 120px;
              height: 170px;
              padding: 5px;
              border: 1px solid #ccc;
              margin-right: 15px;
            }
            .info {
              height: 170px;
              position: relative;
              p {
                font-size: 14px;
                margin: 5px 0;
              }
              .more {
                position: absolute;
                bottom: 0;
                right: 0;
                font-size: 14px;
                color: #999;
                cursor: pointer;
                .ivu-icon {
                  font-size: 22px;
                  position: relative;
                  top: -1px;
                }
                &:hover {
                  color: @mainColor;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
