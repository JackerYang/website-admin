<template>
  <div class="company-achievement-edit">
    <fn-template
      :isPreview="true"
      :title="isAdd ? '企业成果 - 添加' : '企业成果 - 编辑'"
      @on-save="save"
      @on-cancel="cancel"
      @on-preview="visible = true"
    >
      <div class="edit">
        <a-tabs>
          <a-tab-pane tab="信息" :key="1">
            <div class="base">
              <a-form :form="form">
                <a-form-item v-bind="formItemLayout" label="标题：">
                  <a-input placeholder="请输入标题" v-decorator="titleDecorator" />
                </a-form-item>

                <a-form-item v-bind="formItemLayout" label="副标题：">
                  <a-input placeholder="请输入副标题" v-decorator="subTitleDecorator" />
                </a-form-item>

                <a-form-item v-bind="formItemLayout" label="事件日期：">
                  <a-date-picker
                    placeholder="请选择事件日期"
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
                <a-form-item v-bind="formItemLayout" label="选择图片：">
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

    <a-modal
      title="预览"
      width="80vw"
      v-model="visible"
      @ok="visible = false"
      :cancelButtonProps="{ style: {display: 'none'} }"
    >
      <a-row>
        <a-col :span="12">
          <span class="label">是否发布：</span>
          <span>{{ form.getFieldValue("isPublish") === 0 ? '否' : '是' }}</span>
        </a-col>
      </a-row>
      <div class="show">
        <h2>{{ form.getFieldValue("title") }}</h2>
        <hr />
        <p
          class="time"
        >时间：{{ form.getFieldValue("eventDate") && form.getFieldValue("eventDate").format("YYYY年MM月DD日") }}</p>
        <p class="sub">{{ form.getFieldValue("subTitle") }}</p>
        <img
          v-if="form.getFieldValue('imgPath')"
          :src="`${api}/api/image/${form.getFieldValue('imgPath')}`"
        />
        <p v-html="content"></p>
      </div>
    </a-modal>
  </div>
</template>

<script>
import VueNeditorWrap from "vue-neditor-wrap";
const { api, prod_build_url } = require("../../../config");
import FnTemplate from "@/components/common/FnTemplate.vue";
import UploadImg from "@/components/common/UploadImg.vue";
import { editOrgAchievement, getOrgAchievement } from "@/api/api";
import { hasOf, setDecorator } from "@/libs/util";
export default {
  name: "company-achievement-edit",
  components: {
    FnTemplate,
    UploadImg,
    VueNeditorWrap
  },
  computed: {
    isAdd() {
      return !hasOf(this.$route.path, "edit");
    },

    // 表单验证
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
        title: "事件日期"
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
    imgPathDecorator() {
      return setDecorator({ sign: "upload", key: "imgPath", title: "图片" });
    }
  },
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
      content: "",
      visible: false,
      api: api,

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
          editOrgAchievement(obj).then(res => {
            if (res.data.res) {
              this.$Message.success(res.data.msg);
              this.cancel();
            }
          });
        } else {
          this.currentTab = 1;
        }
      });
    },
    cancel() {
      this.$router.push({
        name: "company-achievement"
      });
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
        getOrgAchievement(this.$route.path.split("/").reverse()[0]).then(
          res => {
            if (res.data.res) {
              let {
                title,
                subTitle,
                eventDate,
                isPublish,
                imgPath,
                content
              } = res.data.data;
              this.form.setFieldsValue({
                title,
                subTitle,
                eventDate: this.$moment(eventDate, "YYYY年MM月DD日"),
                isPublish,
                imgPath
              });
              this.content = content;
            }
          }
        );
      }
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  }
};
</script>

<style lang="less">
.company-achievement-edit {
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
          margin: 30px auto;
          height: ~"calc(100% - 60px)";
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
.ant-modal-body {
  .ant-row {
    font-size: 14px;
    .label {
      margin-right: 15px;
    }
  }
  .show {
    text-align: center;
    h2 {
      margin: 20px 0;
    }
    .time {
      font-size: 14px;
      text-align: right;
      color: #ccc;
      margin: 20px 0;
    }
    .sub {
      text-align: center;
      font-size: 16px;
      margin-bottom: 40px;
      font-weight: bold;
    }
    img {
      max-width: 80%;
      margin-bottom: 40px;
    }
    & /deep/ p {
      font-size: 16px;
      margin: 10px 0;
      text-align: left;
      &:first-child {
        margin-top: 50px;
      }
    }
    & /deep/ img {
      max-width: 100%;
    }
  }
}
</style>
