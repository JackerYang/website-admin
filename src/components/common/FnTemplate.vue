<template>
  <div class="fn-template">
    <div class="head">
      <!-- 栏目名称 -->
      <div class="title">{{ title }}</div>
      <!-- 工具条 -->
      <div class="tools">
        <todo-button
          :cancelText="cancelText"
          :disabled="disabled"
          :okText="okText"
          :isPreview="isPreview"
          @on-save="save"
          @on-cancel="cancel"
          @on-preview="preview"
        ></todo-button>
      </div>
    </div>

    <div class="line">
      <!-- 分割线 -->
    </div>

    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import TodoButton from "@/components/common/TodoButton.vue";
export default {
  name: "fn-template",
  components: {
    TodoButton
  },
  props: {
    title: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    okText: {
      type: String,
      default: "保存"
    },
    isPreview: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    save() {
      this.$emit("on-save");
    },
    cancel() {
      this.$emit("on-cancel");
    },
    preview() {
      this.$emit("on-preview");
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/less/common.less";
.fn-template {
  width: 100%;
  height: 100%;
  padding: 15px;
  background: #fff;
  box-shadow: @shadow;
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 16px;
      font-weight: bold;
    }
  }
  .line {
    width: 100%;
    height: 1px;
    background: #999;
    margin: 15px 0;
    box-shadow: @shadow;
  }
  .content {
    width: 100%;
    height: ~"calc(100% - 62px)";
    overflow-y: auto;
  }
}
</style>
