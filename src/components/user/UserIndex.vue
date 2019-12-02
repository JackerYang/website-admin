<template>
  <div class="user-index">
    <fn-table
      title="用户管理"
      :columns="columns"
      :data="tableData"
      :total="total"
      :searchList="searchList"
      :btnList="btnList"
      @pageChange="pageChange"
    ></fn-table>
  </div>
</template>

<script>
import FnTable from "@/components/common/FnTable.vue";
import { getUserList, delUser, getUser } from "@/api/api";
export default {
  name: "user-index",
  components: {
    FnTable
  },
  computed: {
    // 所有过滤条件
    filterCondition() {
      return this.$store.state.common.filterCondition;
    }
  },
  data() {
    return {
      // 表格列
      columns: [
        {
          title: "姓名",
          dataIndex: "userName"
        },
        {
          title: "性别",
          dataIndex: "_userSex"
        },
        {
          title: "登录名",
          dataIndex: "loginName"
        },
        {
          title: "所属机构",
          dataIndex: "orgName"
        },
        {
          title: "后台权限",
          dataIndex: "_haveAuthority"
        }
      ],
      // 表格数据
      tableData: [],
      total: 0,
      // 搜索列表
      searchList: [
        {
          label: "姓名",
          value: "userName",
          key: "input"
        },
        {
          label: "性别",
          value: "userSex",
          key: "select",
          options: [
            {
              label: "保密",
              value: -1
            },
            {
              label: "男",
              value: 0
            },
            {
              label: "女",
              value: 1
            }
          ]
        },
        {
          label: "登录名",
          value: "loginName",
          key: "input"
        },
        {
          label: "所属机构",
          value: "orgName",
          key: "input"
        },
        {
          label: "后台权限",
          value: "haveAuthority",
          key: "select",
          options: [
            {
              label: "无权限",
              value: 0
            },
            {
              label: "有权限",
              value: 1
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
          label: "预览",
          type: "default",
          icon: "eye",
          ghost: false,
          condition: 1,
          fn: this.preview
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
      ]
    };
  },
  methods: {
    // page改变 || pageSize改变 || 搜索
    pageChange() {
      this.getData(this.filterCondition);
    },

    // 获取数据
    getData(params) {
      getUserList({
        ...params,
        orgId: params.id
      }).then(res => {
        if (res.data.res) {
          this.total = res.data.data.total;
          this.tableData = res.data.data.list.map(item => {
            item._userSex =
              item.userSex === 0 ? "男" : item.userSex === -1 ? "保密" : "女";
            item._haveAuthority =
              item.haveAuthority === 0 ? "无权限" : "有权限";
            return item;
          });
        }
      });
    },

    // 添加 || 编辑 || 预览 || 删除 || 排序
    add() {
      this.$router.push({
        name: "user-add"
      });
    },
    edit(selectedRowKeys) {
      this.$router.push({
        name: "user-edit",
        params: {
          id: selectedRowKeys[0]
        }
      });
    },
    preview(selectedRowKeys) {
      getUser(selectedRowKeys[0]).then(res => {
        if (res.data.res) {
          this.$store.commit("SET_DETAIL", res.data.data);
          this.$store.commit("SET_VISIBLE", true);
        }
      });
    },
    del(selectedRowKeys) {
      this.$confirm({
        title: "确定删除？",
        content: (
          <p>
            确定删除当前选中的
            <span style="color: #f00;">{selectedRowKeys.length}</span>
            个用户？
          </p>
        ),
        onOk: () => {
          return new Promise(resolve => {
            delUser(selectedRowKeys).then(res => {
              if (res.data.res) {
                this.$Message.success(res.data.msg);
                // 刷新列表
                this.$store.commit("CHANGE_FILTER_CONDITION", {
                  ...this.filterCondition,
                  page: 1
                });
                this.getData(this.filterCondition);
              }
              resolve();
            });
          });
        }
      });
    },
    sort() {
      this.$router.push({
        name: "user-sort"
      });
    }
  },
  created() {
    this.getData(this.filterCondition);
  }
};
</script>

<style lang="less" scoped>
.user-index {
  width: 100%;
  height: 100%;
}
</style>
