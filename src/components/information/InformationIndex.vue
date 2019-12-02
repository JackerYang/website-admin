<template>
  <div class="information-index">
    <fn-table
      title="信息发布"
      :columns="columns"
      :data="tableData"
      :searchList="searchList"
      :btnList="btnList"
      :total="total"
      @pageChange="pageChange"
    ></fn-table>
  </div>
</template>

<script>
import FnTable from "@/components/common/FnTable.vue";
import {
  getInformationList,
  informationPublish,
  informationCancel,
  delInformation,
  getInformation
} from "@/api/api";
export default {
  name: "information-index",
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
          title: "标题",
          dataIndex: "title"
        },
        {
          title: "副标题",
          dataIndex: "subTitle"
        },
        {
          title: "创建人",
          dataIndex: "userName"
        },
        {
          title: "创建日期",
          dataIndex: "_createDate"
        },
        {
          title: "是否置顶",
          dataIndex: "_isTop"
        },
        {
          title: "状态",
          dataIndex: "_isPublish"
        }
      ],
      // 表格数据
      tableData: [],
      total: 0,
      // 搜索列表
      searchList: [
        {
          label: "标题",
          value: "title",
          key: "input"
        },
        {
          label: "副标题",
          value: "subTitle",
          key: "input"
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
          label: "发布",
          type: "default",
          icon: "notification",
          ghost: false,
          condition: 2,
          fn: this.publish
        },
        {
          label: "撤销",
          type: "default",
          icon: "rollback",
          ghost: false,
          condition: 2,
          fn: this.cancel
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
      let obj = {
        ...params,
        plate: params.id
      };
      delete obj.id;
      getInformationList(obj).then(res => {
        if (res.data.res) {
          this.total = res.data.data.total;
          this.tableData = res.data.data.list.map(item => {
            item._createDate = this.$moment(item.createDate).format(
              "YYYY年MM月DD日"
            );
            item._isTop = item.isTop ? "是" : "否";
            item._isPublish = item.isPublish ? "已发布" : "未发布";
            return item;
          });
        }
      });
    },

    // 添加 || 编辑 || 预览 || 删除 || 发布 || 撤销
    add() {
      this.$router.push({
        name: "information-add"
      });
    },
    edit(selectedRowKeys) {
      this.$router.push({
        name: "information-edit",
        params: {
          id: selectedRowKeys[0]
        }
      });
    },
    preview(selectedRowKeys) {
      getInformation(selectedRowKeys[0]).then(res => {
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
            篇文章？
          </p>
        ),
        onOk: () => {
          return new Promise(resolve => {
            delInformation(selectedRowKeys).then(res => {
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
    publish(selectedRowKeys, selectedRows) {
      let len = selectedRowKeys.length;
      let cancelItems = selectedRows.filter(i => i.isPublish === 0);
      let ids = cancelItems.map(i => i.id);
      let cancelLen = cancelItems.length;
      if (cancelLen) {
        this.$confirm({
          title: "确定发布？",
          content: (
            <div>
              <p>
                当前选中了{len}篇文章，其中未发布数量为{cancelLen}
                篇，确定发布这{cancelLen}篇文章？
              </p>
              <p style="color: #999;">已发布的文章不受影响</p>
            </div>
          ),
          onOk: () => {
            return new Promise(resolve => {
              informationPublish(ids).then(res => {
                if (res.data.res) {
                  this.$Message.success(res.data.msg);
                  // 刷新列表
                  this.getData(this.filterCondition);
                }
                resolve();
              });
            });
          }
        });
      } else {
        this.$info({
          title: "无可发布的文章",
          okText: "确定",
          content: (
            <div>
              <p>
                当前选中了{len}
                篇文章，其中未发布数量为0篇，无需执行发布操作！
              </p>
              <p style="color: #999;">无可发布的文章</p>
            </div>
          )
        });
      }
    },
    cancel(selectedRowKeys, selectedRows) {
      let len = selectedRowKeys.length;
      let publishItems = selectedRows.filter(i => i.isPublish === 1);
      let ids = publishItems.map(i => i.id);
      let publishLen = publishItems.length;
      if (publishLen) {
        this.$confirm({
          title: "确定撤销？",
          content: (
            <div>
              <p>
                当前选中了{len}篇文章，其中已发布数量为{publishLen}
                篇，确定撤销这{publishLen}篇文章？
              </p>
              <p style="color: #999;">未发布的文章不受影响</p>
            </div>
          ),
          onOk: () => {
            return new Promise(resolve => {
              informationCancel(ids).then(res => {
                if (res.data.res) {
                  this.$Message.success(res.data.msg);
                  // 刷新列表
                  this.getData(this.filterCondition);
                }
                resolve();
              });
            });
          }
        });
      } else {
        this.$info({
          title: "无可撤销的文章",
          okText: "确定",
          content: (
            <div>
              <p>
                当前选中了{len}
                篇文章，其中已发布数量为0篇，无需执行撤销操作！
              </p>
              <p style="color: #999;">无可撤销的文章</p>
            </div>
          )
        });
      }
    }
  },
  created() {
    this.getData(this.filterCondition);
  }
};
</script>

<style lang="less" scoped>
.information-index {
  width: 100%;
  height: 100%;
}
</style>
