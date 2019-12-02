<template>
  <div class="upload-img">
    <a-upload
      @preview="handlePreview"
      :customRequest="upload"
      listType="picture"
      :fileList="fileList"
      :remove="handleRemove"
      :beforeUpload="beforeUpload"
    >
      <a-button>
        <a-icon type="upload" />上传图片
      </a-button>
    </a-upload>
    <a-modal title="预览图片" :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
const { api } = require("../../../config");
import { uploadImg } from "@/api/api";
export default {
  name: "upload-img",
  props: {
    value: String
  },
  model: {
    prop: "value",
    event: "change"
  },
  data() {
    return {
      fileList: [],
      previewVisible: false,
      previewImage: ""
    };
  },
  methods: {
    // 移除图片
    handleRemove() {
      this.fileList = [];
      this.$emit("change", "");
    },
    // 上传之前
    beforeUpload(file) {
      if (!/image\/\w+/.test(file.type)) {
        this.$Message.warning("请上传图片文件！");
        return false;
      }
      this.fileList = [file];
    },
    // 打开预览
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    // 关闭预览
    handleCancel() {
      this.previewVisible = false;
    },
    // 上传
    upload() {
      let file = this.fileList[0];
      uploadImg(file).then(res => {
        if (res && res.data && res.data.res) {
          this.$Message.success("上传成功！");
          this.$emit("change", res.data.data[0]);
        } else {
          this.fileList = [];
          this.$emit("change", "");
        }
      });
    }
  },
  watch: {
    value() {
      if (this.value) {
        let pre = `${api}/api/image?imageName=`;
        let hasPre = this.value.indexOf(pre) > -1;
        if (hasPre) {
          this.$emit("change", this.value.replace(pre, ""));
          return;
        }

        this.fileList = [
          {
            uid: "0",
            name:
              this.value.indexOf("/") > -1
                ? this.value.split("/").reverse()[0]
                : this.value.split("\\").reverse()[0],
            status: "done",
            url: `${pre}${this.value}`
          }
        ];
      } else {
        this.fileList = [];
      }
    }
  }
};
</script>

<style lang="less" scoped>
.upload-img {
  width: 100%;
}
</style>
