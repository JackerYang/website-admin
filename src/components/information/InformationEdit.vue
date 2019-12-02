<template>
  <div class="information-edit">
    <fn-template
      :isPreview="true"
      :title="isAdd ? '信息发布 - 添加' : '信息发布 - 编辑'"
      @on-save="save"
      @on-cancel="cancel"
      @on-preview="preview"
    >
      <div class="edit">
        <a-tabs>
          <a-tab-pane tab="信息" :key="1">
            <div class="base">
              <a-form :form="form">
                <a-form-item v-bind="formItemLayout" label="所属板块：">
                  <a-select
                    placeholder="请选择所属板块"
                    v-decorator="plateDecorator"
                    allowClear
                    showSearch
                    optionFilterProp="children"
                  >
                    <a-select-option
                      v-for="plate in plates"
                      :key="plate.id"
                      :value="plate.id"
                    >{{ plate.plateName }}</a-select-option>
                  </a-select>
                </a-form-item>

                <a-form-item v-bind="formItemLayout" label="标题：">
                  <a-input placeholder="请输入标题" v-decorator="titleDecorator" />
                </a-form-item>

                <a-form-item v-bind="formItemLayout" label="副标题：">
                  <a-input placeholder="请输入副标题" v-decorator="subTitleDecorator" />
                </a-form-item>

                <a-form-item v-bind="formItemLayout" label="信息日期：">
                  <a-date-picker
                    placeholder="请选择信息日期"
                    format="YYYY年MM月DD日"
                    v-decorator="eventDateDecorator"
                    :disabledDate="disabledEndDate"
                  />
                </a-form-item>

                <a-form-item v-bind="formItemLayout" label="是否发布：">
                  <a-select
                    placeholder="请选择是否发布"
                    v-decorator="isPublishDecorator"
                    allowClear
                    showSearch
                    optionFilterProp="children"
                  >
                    <a-select-option :value="1">是</a-select-option>
                    <a-select-option :value="0">否</a-select-option>
                  </a-select>
                </a-form-item>

                <a-form-item v-bind="formItemLayout" label="是否置顶：">
                  <a-select
                    placeholder="请选择是否置顶"
                    v-decorator="isTopDecorator"
                    allowClear
                    showSearch
                    optionFilterProp="children"
                  >
                    <a-select-option :value="1">是</a-select-option>
                    <a-select-option :value="0">否</a-select-option>
                  </a-select>
                </a-form-item>

                <a-form-item v-bind="formItemLayout" label="发布到企业印象：">
                  <a-select
                    placeholder="请选择是否发布到企业印象"
                    v-decorator="orgImpressionDecorator"
                    allowClear
                    showSearch
                    optionFilterProp="children"
                  >
                    <a-select-option :value="1">是</a-select-option>
                    <a-select-option :value="0">否</a-select-option>
                  </a-select>
                </a-form-item>

                <a-form-item v-bind="formItemLayout" label="发布到企业成果：">
                  <a-select
                    placeholder="请选择是否发布到企业成果"
                    v-decorator="orgAchievementDecorator"
                    allowClear
                    showSearch
                    optionFilterProp="children"
                  >
                    <a-select-option :value="1">是</a-select-option>
                    <a-select-option :value="0">否</a-select-option>
                  </a-select>
                </a-form-item>

                <a-form-item v-bind="formItemLayout" label="缩略图：">
                  <upload-img v-decorator="imgPathDecorator"></upload-img>
                </a-form-item>
              </a-form>
            </div>
          </a-tab-pane>
          <a-tab-pane :forceRender="true" tab="内容" :key="2">
            <div class="editor neditor">
              <vue-neditor-wrap v-model="content" @ready="ready" :config="myConfig"></vue-neditor-wrap>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </fn-template>
  </div>
</template>

<script>
import FnTemplate from "@/components/common/FnTemplate.vue";
import UploadImg from "@/components/common/UploadImg.vue";
import { getInformation, editInformation } from "@/api/api";
import { hasOf, setDecorator } from "@/libs/util";
const { api, prod_build_url } = require("../../../config");
import VueNeditorWrap from "vue-neditor-wrap";
export default {
  name: "information-edit",
  components: {
    FnTemplate,
    UploadImg,
    VueNeditorWrap
  },
  computed: {
    isAdd() {
      return !hasOf(this.$route.path, "edit");
    },
    plates() {
      return this.$store.state.information.plateList;
    },

    default() {
      return this.$store.state.common.filterCondition.id;
    },

    // 表单验证
    plateDecorator() {
      return setDecorator({
        sign: "select",
        key: "plate",
        title: "所属板块",
        initialValue: this.default
      });
    },
    titleDecorator() {
      return setDecorator({
        sign: "input",
        key: "title",
        title: "标题",
        min: 1,
        max: 100
      });
    },
    subTitleDecorator() {
      return setDecorator({
        required: false,
        sign: "input",
        key: "subTitle",
        title: "副标题",
        min: 1,
        max: 50
      });
    },
    eventDateDecorator() {
      return setDecorator({
        sign: "select",
        key: "eventDate",
        title: "信息日期"
      });
    },
    isPublishDecorator() {
      return setDecorator({
        sign: "select",
        key: "isPublish",
        title: "是否发布",
        initialValue: 1
      });
    },
    isTopDecorator() {
      return setDecorator({
        sign: "select",
        key: "isTop",
        title: "是否置顶",
        initialValue: 0
      });
    },
    orgImpressionDecorator() {
      return setDecorator({
        sign: "select",
        key: "orgImpression",
        title: "是否发布到企业印象",
        initialValue: 1
      });
    },
    orgAchievementDecorator() {
      return setDecorator({
        sign: "select",
        key: "orgAchievement",
        title: "是否发布到企业成果",
        initialValue: 1
      });
    },
    imgPathDecorator() {
      return setDecorator({
        required: false,
        sign: "upload",
        key: "imgPath",
        title: "缩略图"
      });
    }
  },
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
      content: "",

      editor: "",
      myConfig: {
        // 如果需要上传功能,找后端小伙伴要服务器接口地址
        serverUrl: api + "/api/image/upload",
        // 你的UEditor资源存放的路径,相对于打包后的index.html
        UEDITOR_HOME_URL: prod_build_url + "NEditor/",
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器宽度
        initialFrameWidth: "100%",
        // 关闭自动保存
        enableAutoSave: false
      }
    };
  },
  methods: {
    save() {
      this.form.validateFields((err, values) => {
        if (!err) {
          let obj = this.isAdd
            ? {
                ...values,
                eventDate: values["eventDate"].format("YYYY-MM-DD"),
                content: this.content
              }
            : {
                ...values,
                eventDate: values["eventDate"].format("YYYY-MM-DD"),
                content: this.content,
                id: Number(this.$route.path.split("/").reverse()[0])
              };
          editInformation(obj).then(res => {
            if (res.data.res) {
              this.$Message.success(res.data.msg);
              this.cancel();
            }
          });
        }
      });
    },
    cancel() {
      this.$router.push({
        name: "information"
      });
    },

    // 预览
    preview() {
      this.$store.commit("SET_DETAIL", {
        ...this.form.getFieldsValue(),
        eventDate: this.form.getFieldValue("eventDate")
          ? this.form.getFieldValue("eventDate").format("YYYY-MM-DD")
          : null,
        imgPath:
          api + "/api/image?imageName=" + this.form.getFieldValue("imgPath")
      });
      this.$store.commit("SET_VISIBLE", true);
    },

    disabledEndDate(endValue) {
      if (endValue.valueOf() <= new Date().getTime()) {
        return false;
      }
      return true;
    },

    ready(e) {
      this.editor = e;
      if (!this.isAdd) {
        getInformation(this.$route.path.split("/").reverse()[0]).then(res => {
          if (res.data.res) {
            let {
              plate,
              title,
              subTitle,
              eventDate,
              isPublish,
              isTop,
              orgAchievement,
              orgImpression,
              imgPath,
              content
            } = res.data.data;
            this.form.setFieldsValue({
              plate,
              title,
              subTitle,
              eventDate: this.$moment(eventDate, "YYYY年MM月DD日"),
              isPublish,
              isTop,
              orgAchievement,
              orgImpression,
              imgPath
            });
            this.content = content;
          }
        });
      }
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  }
};
</script>

<style lang="less">
.information-edit {
  width: 100%;
  height: 100%;
  .edit {
    width: 100%;
    height: 100%;
    .ant-tabs {
      height: 100%;
      &-content {
        height: ~"calc(100% - 60px)";
        .base {
          max-width: 500px;
          height: ~"calc(100% - 60px)";
          margin: 30px auto;
          overflow: auto;
          .ant-form-item-children {
            width: 100%;
            .ant-calendar-picker {
              width: 100%;
            }
          }
        }
        .editor {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
