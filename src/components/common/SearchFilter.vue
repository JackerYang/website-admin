<template>
  <div
    :class="['search-filter', show ? 'active' : '']"
    ref="search-filter"
    v-if="searchLists.length"
    v-clickOutside="hideContent"
  >
    <div class="show">
      <!-- 输入框 -->
      <template v-if="searchLists[0].key === 'input'">
        <a-input-search
          enterButton
          :placeholder="'查询'+searchLists[0].label"
          v-model.trim="searchLists[0].searchVal"
          @search="save"
        />
      </template>
      <!-- 选择框 -->
      <template v-if="searchLists[0].key === 'select'">
        <a-select
          placeholder="请选择"
          v-model="searchLists[0].searchVal"
          allowClear
          showSearch
          optionFilterProp="children"
        >
          <a-select-option
            v-for="option in searchLists[0].options"
            :key="option.value"
            :value="option.value"
          >{{ option.label }}</a-select-option>
        </a-select>
      </template>
      <!-- 时间框 -->
      <template v-if="searchLists[0].key === 'time'">
        <a-date-picker
          v-if="searchLists[0].option.type === 'date'"
          :showTime="searchLists[0].option.showTime"
          :showToday="false"
          placeholder="日期"
          format="YYYY年MM月DD日"
          :value="searchLists[0].searchVal ? $moment(searchLists[0].searchVal) : null"
          @change="searchLists[0].searchVal = $event ? $moment($event).format('YYYY-MM-DD') : null"
        />
        <a-range-picker
          v-if="searchLists[0].option.type === 'range'"
          :showTime="searchLists[0].option.showTime"
          :showToday="false"
          format="YYYY-MM-DD HH:mm:ss"
          :placeholder="['起', '止']"
          :value="searchLists[0].searchVal ? $moment(searchLists[0].searchVal) : null"
          @change="searchLists[0].searchVal = $event ? $moment($event).format('YYYY-MM-DD HH:mm:ss') : null"
        />
      </template>
      <!-- 查询更多 -->
      <a-tooltip>
        <template slot="title">更多查询条件</template>
        <a-button
          v-if="searchLists.length > 1"
          icon="ellipsis"
          :class="show ? 'on' : ''"
          @click="show = !show"
        ></a-button>
      </a-tooltip>
    </div>

    <div class="items">
      <div class="item" v-for="list, index in searchLists" :key="list.label">
        <!-- 输入框 -->
        <template v-if="list.key === 'input' && index > 0">
          <span class="tip">{{ list.label }}：</span>
          <span class="key">
            <a-input
              v-model.trim="list.searchVal"
              @keydown.enter="save"
              :placeholder="'查询'+list.label"
            />
          </span>
        </template>
        <!-- 选择框 -->
        <template v-if="list.key === 'select' && index > 0">
          <span class="tip">{{ list.label }}：</span>
          <span class="key">
            <a-select
              placeholder="请选择"
              v-model="list.searchVal"
              allowClear
              showSearch
              optionFilterProp="children"
            >
              <a-select-option
                v-for="option in list.options"
                :key="option.value"
                :value="option.value"
              >{{ option.label }}</a-select-option>
            </a-select>
          </span>
        </template>
        <!-- 时间框 -->
        <template v-if="list.key === 'time' && index > 0">
          <span class="tip">{{ list.label }}：</span>
          <span class="key">
            <a-date-picker
              style="width: 150px;"
              v-if="list.option.type === 'date'"
              format="YYYY年MM月DD日"
              :showTime="list.option.showTime"
              :showToday="false"
              placeholder="日期"
              :value="list.searchVal ? $moment(list.searchVal) : null"
              @change="list.searchVal = $event ? $moment($event).format('YYYY-MM-DD') : null"
            />
            <a-range-picker
              v-if="list.option.type === 'range'"
              :showTime="list.option.showTime"
              :showToday="false"
              format="YYYY-MM-DD HH:mm:ss"
              :placeholder="['起', '止']"
              :value="list.searchVal ? $moment(list.searchVal) : null"
              @change="list.searchVal = $event ? $moment($event).format('YYYY-MM-DD HH:mm:ss') : null"
            />
          </span>
        </template>
      </div>
      <div class="btn">
        <a-button size="small" @click="reset(false)">重置</a-button>
        <a-button size="small" type="primary" @click="save">查询</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "search-filter",
  props: {
    searchList: {
      type: Array,
      required: true
    }
  },
  computed: {
    // 当前过滤条件
    searchFilter() {
      return this.$store.state.common.searchFilter;
    }
  },
  data() {
    return {
      show: false,
      searchLists: []
    };
  },
  methods: {
    // 下拉框显示
    showContent() {
      this.show = true;
    },
    // 下拉框隐藏
    hideContent() {
      this.show = false;
    },

    // 提交筛选
    save() {
      this.$store.commit("CHANGE_SEARCH_FILTER", this.searchLists);
      this.$emit("handleSearch", this.searchLists);
      this.hideContent();
    },
    // 重置
    reset(notRequest) {
      this.searchLists = JSON.parse(JSON.stringify(this.searchList));
      this.$store.commit("CHANGE_SEARCH_FILTER", []);
      !notRequest && this.$emit("handleSearch", this.searchLists);
      this.hideContent();
    }
  },
  created() {
    this.searchLists = JSON.parse(JSON.stringify(this.searchList));
    if (this.searchFilter && this.searchFilter[0]) {
      this.searchLists = JSON.parse(JSON.stringify(this.searchFilter));
    }
  }
};
</script>

<style lang="less">
@import "../../assets/less/common.less";
.search-filter {
  position: relative;
  height: 32px;
  .show {
    display: flex;
    align-items: center;
    .ant-btn {
      padding: 0 10px;
      .anticon {
        transition: @Animation;
      }
      &.on {
        .anticon {
          transform: rotate(90deg);
        }
      }
    }
  }
  .items {
    max-height: 0;
    overflow: hidden;
    position: absolute;
    top: 34px;
    z-index: 9;
    background: #fff;
    transition: @Animation;
    box-shadow: @shadow;
    .item {
      width: 300px;
      display: flex;
      align-items: center;
      margin: 5px 0;
      .tip {
        text-align: right;
        width: 100px;
      }
      .key {
        width: 150px;
        margin-left: 15px;
        .ant-select {
          width: 100%;
        }
      }
      &:first-child {
        margin-top: 20px;
      }
    }
    .btn {
      margin: 10px 0 10px 115px;
      .ant-btn {
        margin-right: 15px;
      }
    }
  }
  &.active {
    .items {
      max-height: 600px;
      overflow: auto;
    }
  }
}
</style>
