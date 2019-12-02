<template>
  <div class="shop-management-index">
    <fn-table
      title="商品管理"
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
  getShopList,
  shopPublish,
  shopCancel,
  delShop,
  getShop
} from "@/api/api";
export default {
  name: "shop-management-index",
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
          title: "商品图片",
          dataIndex: "firstProductImgPath",
          customRender: record => <img src={record} />,
          width: 100
        },
        {
          title: "商品名称",
          dataIndex: "productName",
          minWidth: 400
        },
        {
          title: "商品价格",
          dataIndex: "productPrice",
          customRender: record => <span>￥{record}</span>,
          minWidth: 100
        },
        {
          title: "商品库存",
          dataIndex: "productStock",
          customRender: record => <span>{record}件</span>,
          minWidth: 100
        },
        {
          title: "所属分类",
          dataIndex: "typeName",
          minWidth: 100
        },
        {
          title: "浏览数量",
          dataIndex: "viewNum",
          minWidth: 100
        },
        {
          title: "创建人",
          dataIndex: "userName",
          minWidth: 80
        },
        {
          title: "状态",
          dataIndex: "_isPublish",
          minWidth: 80
        }
      ],
      // 表格数据
      tableData: [],
      total: 0,
      // 搜索列表
      searchList: [
        {
          label: "商品名称",
          value: "productName",
          key: "input"
        },
        {
          label: "所属分类",
          value: "typeName",
          key: "input"
        },
        {
          label: "发布状态",
          value: "isPublish",
          key: "select",
          options: [
            {
              label: "已发布",
              value: 1
            },
            {
              label: "未发布",
              value: 0
            }
          ]
        },
        {
          label: "价格排序",
          value: "productPrice",
          key: "select",
          options: [
            {
              label: "升序",
              value: "asc"
            },
            {
              label: "降序",
              value: "desc"
            }
          ]
        },
        {
          label: "库存排序",
          value: "productStock",
          key: "select",
          options: [
            {
              label: "升序",
              value: "asc"
            },
            {
              label: "降序",
              value: "desc"
            }
          ]
        },
        {
          label: "浏览数量",
          value: "viewNum",
          key: "select",
          options: [
            {
              label: "升序",
              value: "asc"
            },
            {
              label: "降序",
              value: "desc"
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
        productType: params.id
      };
      delete obj.id;
      getShopList(obj).then(res => {
        if (res.data.res) {
          this.total = res.data.data.total;
          this.tableData = res.data.data.list.map(item => {
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
        name: "shop-management-add"
      });
    },
    edit(selectedRowKeys) {
      this.$router.push({
        name: "shop-management-edit",
        params: {
          id: selectedRowKeys[0]
        }
      });
    },
    preview(selectedRowKeys) {
      getShop(selectedRowKeys[0]).then(res => {
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
            个商品？
          </p>
        ),
        onOk: () => {
          return new Promise(resolve => {
            delShop(selectedRowKeys).then(res => {
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
                当前选中了{len}个商品，其中未发布数量为{cancelLen}
                个，确定发布这{cancelLen}个商品？
              </p>
              <p style="color: #999;">已发布的商品不受影响</p>
            </div>
          ),
          onOk: () => {
            return new Promise(resolve => {
              shopPublish(ids).then(res => {
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
          title: "无可发布的商品",
          okText: "确定",
          content: (
            <div>
              <p>
                当前选中了{len}
                个商品，其中未发布数量为0个，无需执行发布操作！
              </p>
              <p style="color: #999;">无可发布的商品</p>
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
                当前选中了{len}个商品，其中已发布数量为{publishLen}
                个，确定撤销这{publishLen}个商品？
              </p>
              <p style="color: #999;">未发布的商品不受影响</p>
            </div>
          ),
          onOk: () => {
            return new Promise(resolve => {
              shopCancel(ids).then(res => {
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
          title: "无可撤销的商品",
          okText: "确定",
          content: (
            <div>
              <p>
                当前选中了{len}
                个商品，其中已发布数量为0个，无需执行撤销操作！
              </p>
              <p style="color: #999;">无可撤销的商品</p>
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
.shop-management-index {
  width: 100%;
  height: 100%;
}
</style>
