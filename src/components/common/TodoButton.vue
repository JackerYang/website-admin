<template>
  <div class="todo-button">
    <a-button v-if="isPreview" :style="{ width: width, marginRight: space }" @click="preview">预览</a-button>
    <a-button :style="{ width: width, marginRight: space }" @click="cancel">{{ cancelText }}</a-button>
    <a-button
      type="primary"
      :style="{ width: width }"
      :loading="loading"
      :disabled="disabled"
      @click="save"
    >{{ okText }}</a-button>
  </div>
</template>

<script>
export default {
  name: "TodoButton",
  props: {
    okText: {
      type: String,
      default: "保存"
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: "60px"
    },
    space: {
      type: String,
      default: "20px"
    },
    isPreview: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    // 取消
    cancel() {
      this.$emit("on-cancel");
    },
    // 保存
    save() {
      this.$emit("on-save");
    },
    // 预览
    preview() {
      this.$emit("on-preview");
    }
  }
};
</script>

<style lang="less" scoped>
.todo-button {
  height: 32px;
  display: flex;
  align-items: center;
}
</style>
