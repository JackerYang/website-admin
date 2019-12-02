<template>
  <div class="upload-img">
    <a-upload
      :multiple="true"
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
/**
 * 这个组件主要实现的功能是上传图片。
 * 向这个组件输入类似[{imgPath: XXX}]的数据，其中XXX是图片url，可能是完整路径，也可能是没有前缀的路径
 * 这个组件输出类似[{imgPath: XXX}]的数据，其中XXX是图片url，是没有前缀的路径
 */
const { api } = require("../../../config");
import { uploadImg } from "@/api/api";
export default {
  name: "upload-img",
  props: {
    value: [Array, String]
  },
  model: {
    prop: "value",
    event: "change"
  },
  data() {
    return {
      uploadFileList: [],
      fileList: [],
      previewVisible: false,
      previewImage: ""
    };
  },
  methods: {
    // 移除图片
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);

      let data = newFileList.length
        ? newFileList.map(item => ({ imgPath: item.url }))
        : "";
      this.updateData(data);
    },
    // 上传之前
    beforeUpload(file, fileList) {
      if (!/image\/\w+/.test(file.type)) {
        this.$Message.warning("请上传图片文件！");
        return false;
      }
      this.fileList = [...this.fileList, file];
      if (this.fileList.length - this.uploadFileList.length !== fileList.length)
        return false;
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
      uploadImg(this.fileList.filter(item => item.status !== "done")).then(
        res => {
          if (res && res.data && res.data.res) {
            this.$Message.success("上传成功！");
            let uploaded = this.uploadFileList.map(item => {
              return {
                imgPath: item.url
              };
            });
            let newUpload = res.data.data.map(item => {
              return {
                imgPath: item
              };
            });
            let data = [...uploaded, ...newUpload];
            this.updateData(data);
          } else {
            this.updateData();
          }
        }
      );
    },

    // 更新数据
    updateData(data) {
      this.fileList = [];
      this.uploadFileList = [];
      if (data) {
        let pre = `${api}/api/image?imageName=`;
        let _data = data.map(item => {
          item.imgPath = item.imgPath.replace(pre, "");
          return item;
        });
        this.$emit("change", _data);
      } else {
        this.$emit("change", "");
      }
    }
  },
  watch: {
    value() {
      if (this.value) {
        let pre = `${api}/api/image?imageName=`;

        // 处理有前缀的图片
        let anyHasPre = this.value.some(i => i.imgPath.indexOf(pre) > -1);
        if (anyHasPre) {
          let data = this.value.map(item => ({ imgPath: item.imgPath }));
          this.updateData(data);
          return;
        }

        let newUpload = this.value.map((item, index) => {
          let url = `${pre}${item.imgPath}`;
          return {
            uid: new Date().getTime() + index,
            name:
              item.imgPath.indexOf("/") > -1
                ? item.imgPath.split("/").reverse()[0]
                : item.imgPath.split("\\").reverse()[0],
            status: "done",
            url
          };
        });
        this.fileList = [...this.uploadFileList, ...newUpload];
        this.uploadFileList = [...this.uploadFileList, ...newUpload];
      } else {
        this.fileList = this.uploadFileList;
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
