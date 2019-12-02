<template>
  <div class="tool-button">
    <div class="row" v-if="isNormal">
      <a-button-group>
        <a-button
          v-for="btn in btnList"
          :key="btn.label"
          :type="btn.type"
          :icon="btn.icon"
          :ghost="btn.ghost"
          :disabled="btn.condition == 0 ? false : btn.condition == 1 ? selectedRowKeys.length != 1 : selectedRowKeys.length < 1"
          @click="btn.fn(selectedRowKeys, selectedRows)"
        >{{ btn.label }}</a-button>
      </a-button-group>
    </div>

    <div class="col" v-else>
      <a-dropdown>
        <a-menu slot="overlay">
          <a-menu-item
            v-for="btn in btnList"
            :key="btn.label"
            :disabled="btn.condition == 0 ? false : btn.condition == 1 ? selectedRowKeys.length != 1 : selectedRowKeys.length < 1"
            @click="btn.fn(selectedRowKeys, selectedRows)"
          >
            <a-icon :type="btn.icon" />
            {{ btn.label }}
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 15px">
          操作
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "tool-button",
  props: {
    btnList: {
      type: Array,
      required: true
    },
    selectedRowKeys: {
      type: Array,
      required: true
    },
    selectedRows: {
      type: Array,
      default: () => []
    },
    isNormal: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="less" scoped>
.tool-button {
  height: 32px;
  overflow: hidden;
  .row {
    margin-left: 15px;
  }
}
</style>
