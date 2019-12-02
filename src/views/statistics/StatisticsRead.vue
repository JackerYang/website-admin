<template>
  <div class="statistics-read" v-elResize="redraw">
    <statistics-layout title="阅读数量统计" @selectChange="searchReq" @exportExcel="exportExcel">
      <div class="content">
        <div ref="line"></div>
      </div>
    </statistics-layout>
  </div>
</template>

<script>
// 引入 ECharts 主模块
const echarts = require("echarts/lib/echarts");
// 引入折线图
require("echarts/lib/chart/line");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");
require("echarts/lib/component/legendScroll");

import StatisticsLayout from "@/components/statistics/StatisticsLayout.vue";
import { getReadEcharts, exportRead } from "@/api/api";
import { downloadFile } from "@/libs/util";
export default {
  name: "statistics-read",
  components: {
    StatisticsLayout
  },
  data() {
    return {
      // 折线图
      echartLine: null
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
        content: `确定导出${year}年份的阅读数量？`,
        onOk: () => {
          return new Promise(resolve => {
            downloadFile(exportRead(this.year));
            resolve(true);
            this.$Message.success("导出成功！");
          });
        }
      });
    },

    // 获取数据
    getData(year) {
      getReadEcharts(year).then(res => {
        if (res.data.res) {
          let { list, monthArray } = res.data.data;
          // 实例化
          !this.echartLine && (this.echartLine = echarts.init(this.$refs.line));

          // 展示
          this.echartLine.setOption(this.fillDataLine(list, monthArray));
        }
      });
    },

    /**
     * @desc 填充数据
     * @param {Array} data
     * @param {Array} time
     * @return {Object} option
     */
    fillDataLine(data, time) {
      let optionLine = {
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
        grid: {},
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
      optionLine.legend.data = data.map(item => item.name);
      optionLine.xAxis.data = time;
      optionLine.series = data.map(item => ({
        name: item.name,
        data: item.data,
        type: "line"
      }));

      // 返回option
      return optionLine;
    },

    // 自适应
    redraw() {
      this.echartLine.resize();
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
.statistics-read {
  width: 100%;
  height: 100%;
  .content {
    width: 100%;
    height: 100%;
    padding: 3px;
    & > div {
      width: 100%;
      height: 100%;
      background: #fff;
      overflow: hidden;
      box-shadow: @shadow;
    }
  }
}
</style>
