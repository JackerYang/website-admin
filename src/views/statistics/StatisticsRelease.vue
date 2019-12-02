<template>
  <div class="statistics-release" v-elResize="redraw">
    <statistics-layout title="发布数量统计" @selectChange="searchReq" @exportExcel="exportExcel">
      <div class="content">
        <div ref="bar" class="bar"></div>
        <div ref="pie" class="pie"></div>
      </div>
    </statistics-layout>
  </div>
</template>

<script>
// 引入 ECharts 主模块
const echarts = require("echarts/lib/echarts");
// 引入柱状图 && 饼状图
require("echarts/lib/chart/bar");
require("echarts/lib/chart/pie");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");
require("echarts/lib/component/legendScroll");
import StatisticsLayout from "@/components/statistics/StatisticsLayout.vue";
import { getReleaseEcharts, exportRelease } from "@/api/api";
import { downloadFile } from "@/libs/util";
export default {
  name: "statistics-release",
  components: {
    StatisticsLayout
  },
  data() {
    return {
      // 柱状图
      echartBar: null,
      // 饼状图
      echartPie: null
    };
  },
  methods: {
    // 搜索
    searchReq({ year }) {
      this.getData(year);
    },

    // 导出
    exportExcel({ year }) {
      this.$confirm({
        title: "导出确认",
        content: `确定导出${year}年份的发布数量？`,
        onOk: () => {
          return new Promise(resolve => {
            downloadFile(exportRelease(this.year));
            resolve(true);
            this.$Message.success("导出成功！");
          });
        }
      });
    },

    /**
     * @desc 填充数据
     * @param {Array} data
     * @param {Array} time
     * @return {Object} option
     */
    fillDataBar(data, time) {
      let optionBar = {
        // 图例 legend
        legend: {
          type: "scroll",
          top: "1%",
          data: []
        },
        // 颜色
        color: [
          "#FF6384",
          "#36A2EB",
          "#FFCE55",
          "#19CAAD",
          "#D6D5B7",
          "#8CC7B5",
          "#D1BA74",
          "#A0EEE1",
          "#E6CEAC",
          "#BEE7E9",
          "#ECAD9E",
          "#BEEDC7",
          "#F4606C"
        ],
        // 提示框
        tooltip: {
          trigger: "axis",
          padding: 5
        },
        // X轴
        xAxis: {
          // 轴名称
          name: "月份",
          // 类型
          type: "category",
          // 坐标轴名称样式
          nameTextStyle: {
            padding: [4, 0, 0, -5]
          },
          // 箭头
          axisLine: {
            symbol: ["none", "arrow"],
            symbolSize: [8, 8],
            symbolOffset: [0, 7]
          },
          // 数据
          data: []
        },
        // Y轴
        yAxis: {
          // 轴名称
          name: "数量",
          // 类型
          type: "value",
          // 坐标轴名称样式
          nameTextStyle: {
            padding: [4, 0, 0, 0]
          }
        },
        // 数据
        series: []
      };

      // 数据填充
      optionBar.legend.data = data.map(item => item.name);
      optionBar.xAxis.data = time;
      optionBar.series = data.map(item => ({
        name: item.name,
        data: item.data,
        type: "bar"
      }));

      // 返回option
      return optionBar;
    },
    fillDataPie(data) {
      let optionPie = {
        // 图例
        legend: {
          type: "scroll",
          top: "1%",
          data: []
        },
        // 提示框
        tooltip: {
          padding: 5,
          trigger: "item"
        },
        // 颜色
        color: [
          "#FF6384",
          "#36A2EB",
          "#FFCE55",
          "#19CAAD",
          "#D6D5B7",
          "#8CC7B5",
          "#D1BA74",
          "#A0EEE1",
          "#E6CEAC",
          "#BEE7E9",
          "#ECAD9E",
          "#BEEDC7",
          "#F4606C"
        ],
        // 数据
        series: [
          {
            name: "总数",
            type: "pie",
            label: {
              formatter: ({ name, value, percent }) => {
                return `${name}\n${percent}%`;
              }
            },
            data: []
          }
        ]
      };

      // 数据填充
      optionPie.legend.data = data.map(item => item.name);
      optionPie.series[0].data = data.map(item => ({
        name: item.name,
        value: item.value
      }));

      // 返回option
      return optionPie;
    },

    // 获取数据
    getData(year) {
      getReleaseEcharts(year).then(res => {
        if (res.data.res) {
          let { list, monthArray } = res.data.data;
          // 实例化
          !this.echartBar && (this.echartBar = echarts.init(this.$refs.bar));
          !this.echartPie && (this.echartPie = echarts.init(this.$refs.pie));

          // 展示
          this.echartBar.setOption(this.fillDataBar(list, monthArray));
          this.echartPie.setOption(this.fillDataPie(list));
        }
      });
    },

    // 自适应
    redraw() {
      this.echartBar.resize();
      this.echartPie.resize();
    }
  },
  mounted() {
    this.getData();
    // 自适应
    window.onresize = this.redraw;
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/less/common.less";
.statistics-release {
  width: 100%;
  height: 100%;
  .content {
    height: 100%;
    display: flex;
    padding: 3px;
    .bar {
      width: 60%;
      height: 100%;
      margin-right: 20px;
      background: #fff;
      box-shadow: @shadow;
    }
    .pie {
      flex: 1;
      height: 100%;
      overflow: hidden;
      background: #fff;
      box-shadow: @shadow;
    }
  }
}
</style>
