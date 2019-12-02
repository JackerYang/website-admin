<template>
  <div class="member-edit">
    <fn-template
      :isPreview="true"
      :title="isAdd ? '主要成员 - 添加' : '主要成员 - 编辑'"
      @on-save="save"
      @on-cancel="cancel"
      @on-preview="visible = true"
    >
      <div class="edit">
        <a-tabs>
          <a-tab-pane tab="信息" :key="1">
            <div class="base">
              <a-form :form="form">
                <a-form-item v-bind="formItemLayout" label="姓名：">
                  <a-input placeholder="请输入姓名" v-decorator="nameDecorator" />
                </a-form-item>

                <a-form-item v-bind="formItemLayout" label="出生日期：">
                  <a-date-picker
                    placeholder="请选择出生日期"
                    format="YYYY年MM月DD日"
                    v-decorator="birthdayDecorator"
                    :disabledDate="disabledEndDate"
                  />
                </a-form-item>

                <a-form-item v-bind="formItemLayout" label="工作日期：">
                  <a-date-picker
                    placeholder="请选择工作日期"
                    format="YYYY年MM月DD日"
                    v-decorator="workDateDecorator"
                    :disabledDate="disabledEndDate"
                  />
                </a-form-item>

                <a-form-item v-bind="formItemLayout" label="民族：">
                  <a-select
                    placeholder="请选择民族"
                    v-decorator="nationDecorator"
                    allowClear
                    showSearch
                    optionFilterProp="children"
                  >
                    <a-select-option
                      v-for="nation in nations"
                      :key="nation"
                      :value="nation"
                    >{{ nation }}</a-select-option>
                  </a-select>
                </a-form-item>

                <a-form-item v-bind="formItemLayout" label="政治面貌：">
                  <a-select
                    placeholder="请选择政治面貌"
                    v-decorator="politicCountenanceDecorator"
                    allowClear
                    showSearch
                    optionFilterProp="children"
                  >
                    <a-select-option
                      v-for="politicCountenance in politicCountenances"
                      :key="politicCountenance"
                      :value="politicCountenance"
                    >{{ politicCountenance }}</a-select-option>
                  </a-select>
                </a-form-item>

                <a-form-item v-bind="formItemLayout" label="职称：">
                  <a-input placeholder="请输入职称" v-decorator="titleDecorator" />
                </a-form-item>

                <a-form-item v-bind="formItemLayout" label="上传头像：">
                  <upload-img v-decorator="imgPathDecorator"></upload-img>
                </a-form-item>
              </a-form>
            </div>
          </a-tab-pane>
          <a-tab-pane :forceRender="true" tab="简介" :key="2">
            <div class="editor neditor">
              <vue-neditor-wrap v-model="remark" @ready="ready" :config="myConfig"></vue-neditor-wrap>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </fn-template>

    <a-modal
      title="预览"
      width="60vw"
      v-model="visible"
      @ok="visible = false"
      :cancelButtonProps="{ style: {display: 'none'} }"
    >
      <div class="base">
        <img :src="`${api}/api/image/${form.getFieldValue('imgPath')}`" alt="头像" />
        <div class="info">
          <p>职&emsp;&emsp;称：{{ form.getFieldValue("title") }}</p>
          <p>姓&emsp;&emsp;名：{{ form.getFieldValue("name") }}</p>
          <p>出生日期：{{ form.getFieldValue("birthday") && form.getFieldValue("birthday").format("YYYY年MM月DD日") }}</p>
          <p>工作日期：{{ form.getFieldValue("workDate") && form.getFieldValue("workDate").format("YYYY年MM月DD日") }}</p>
          <p>名&emsp;&emsp;族：{{ form.getFieldValue("nation") }}</p>
          <p>政治面貌：{{ form.getFieldValue("politicCountenance") }}</p>
        </div>
        <div class="introduce clearfloat">
          <p>简&emsp;&emsp;介：</p>
          <div v-html="remark"></div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import VueNeditorWrap from "vue-neditor-wrap";
const { api, prod_build_url } = require("../../../config");
import FnTemplate from "@/components/common/FnTemplate.vue";
import UploadImg from "@/components/common/UploadImg.vue";
import { getMember, editMember } from "@/api/api";
import { hasOf, setDecorator } from "@/libs/util";
export default {
  name: "member-edit",
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
    nameDecorator() {
      return setDecorator({
        sign: "input",
        key: "name",
        title: "姓名",
        min: 1,
        max: 50
      });
    },
    birthdayDecorator() {
      return setDecorator({
        required: false,
        sign: "select",
        key: "birthday",
        title: "出生日期"
      });
    },
    workDateDecorator() {
      return setDecorator({
        required: false,
        sign: "select",
        key: "workDate",
        title: "工作日期"
      });
    },
    nationDecorator() {
      return setDecorator({
        required: false,
        sign: "select",
        key: "nation",
        title: "民族"
      });
    },
    politicCountenanceDecorator() {
      return setDecorator({
        required: false,
        sign: "select",
        key: "politicCountenance",
        title: "政治面貌"
      });
    },
    titleDecorator() {
      return setDecorator({
        required: false,
        sign: "input",
        key: "title",
        title: "职称",
        max: 250
      });
    },
    imgPathDecorator() {
      return setDecorator({ sign: "upload", key: "imgPath", title: "头像" });
    }
  },
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
      remark: "",
      // 民族
      nations: [
        "汉族",
        "满族",
        "蒙古族",
        "回族",
        "藏族",
        "维吾尔族",
        "苗族",
        "彝族",
        "壮族",
        "布依族",
        "侗族",
        "瑶族",
        "白族",
        "土家族",
        "哈尼族",
        "哈萨克族",
        "傣族",
        "黎族",
        "傈僳族",
        "佤族",
        "畲族",
        "高山族",
        "拉祜族",
        "水族",
        "东乡族",
        "纳西族",
        "景颇族",
        "柯尔克孜族",
        "土族",
        "达斡尔族",
        "仫佬族",
        "羌族",
        "布朗族",
        "撒拉族",
        "毛南族",
        "仡佬族",
        "锡伯族",
        "阿昌族",
        "普米族",
        "朝鲜族",
        "塔吉克族",
        "怒族",
        "乌孜别克族",
        "俄罗斯族",
        "鄂温克族",
        "德昂族",
        "保安族",
        "裕固族",
        "京族",
        "塔塔尔族",
        "独龙族",
        "鄂伦春族",
        "赫哲族",
        "门巴族",
        "珞巴族",
        "基诺族"
      ],
      politicCountenances: [
        "中共党员",
        "中共预备党员",
        "共青团员",
        "民革党员",
        "民盟盟员",
        "民建会员",
        "民进会员",
        "农工党党员",
        "致公党党员",
        "九三学社社员",
        "台盟盟员",
        "无党派人士",
        "群众"
      ],
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
                birthday: values["birthday"]
                  ? values["birthday"].format("YYYY-MM-DD")
                  : null,
                workDate: values["workDate"]
                  ? values["workDate"].format("YYYY-MM-DD")
                  : null,
                remark: this.remark
              }
            : {
                ...values,
                birthday: values["birthday"]
                  ? values["birthday"].format("YYYY-MM-DD")
                  : null,
                workDate: values["workDate"]
                  ? values["workDate"].format("YYYY-MM-DD")
                  : null,
                remark: this.remark,
                id: Number(this.$route.path.split("/").reverse()[0])
              };
          editMember(obj).then(res => {
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
        name: "member"
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
        getMember(this.$route.path.split("/").reverse()[0]).then(res => {
          if (res.data.res) {
            let {
              name,
              birthday,
              workDate,
              nation,
              politicCountenance,
              title,
              imgPath,
              remark
            } = res.data.data;
            this.form.setFieldsValue({
              name,
              birthday: this.$moment(birthday, "YYYY年MM月DD日"),
              workDate: this.$moment(workDate, "YYYY年MM月DD日"),
              nation,
              politicCountenance,
              title,
              imgPath
            });
            this.remark = remark;
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
.member-edit {
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
  .base {
    width: 100%;
    margin: 50px auto;
    position: relative;
    border-radius: 10px;
    box-shadow: 1px 1px 3px #ccc, -1px 1px 3px #ccc;
    padding: 40px;
    img {
      width: 150px;
      height: 210px;
      position: absolute;
      top: 40px;
      right: 40px;
    }
    .info {
      font-size: 16px;
      p {
        line-height: 30px;
        margin: 5px 0;
      }
    }
    .introduce {
      font-size: 16px;
      margin-top: 20px;
      border-top: 1px solid #ccc;
      padding-top: 20px;
      p {
        line-height: 30px;
        float: left;
      }
      div {
        width: ~"calc(100% - 5em)";
        float: right;
        text-align: justify;
      }
    }
  }
}
</style>

