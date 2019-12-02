<template>
  <div class="member">
    <fn-content title="主要成员 - 详情" :selectedRowKeys="[]" :btnList="btnList">
      <div class="detail">
        <div class="base">
          <img :src="currentMember.imgPath" alt="头像" />
          <div class="info">
            <p>职&emsp;&emsp;称：{{ currentMember.title }}</p>
            <p>姓&emsp;&emsp;名：{{ currentMember.name }}</p>
            <p>出生日期：{{ currentMember.birthday }}</p>
            <p>工作日期：{{ currentMember.workDate }}</p>
            <p>名&emsp;&emsp;族：{{ currentMember.nation }}</p>
            <p>政治面貌：{{ currentMember.politicCountenance }}</p>
          </div>
          <div class="introduce clearfloat">
            <p>简&emsp;&emsp;介：</p>
            <div v-html="currentMember.remark"></div>
          </div>
        </div>
      </div>
    </fn-content>
  </div>
</template>

<script>
import FnContent from "@/components/common/FnContent.vue";
import { getMember, delMember } from "@/api/api";
export default {
  name: "member",
  components: {
    FnContent
  },
  data() {
    return {
      // 按钮列表
      btnList: [
        {
          label: "返回",
          type: "default",
          icon: "rollback",
          ghost: false,
          condition: 0,
          fn: this.back
        },
        {
          label: "删除",
          type: "danger",
          icon: "delete",
          ghost: false,
          condition: 0,
          fn: this.del
        }
      ],

      currentMember: {}
    };
  },
  methods: {
    // 返回 || 编辑 || 删除
    back() {
      this.$router.push({
        name: "member"
      });
    },
    edit() {
      this.$router.push({
        name: "member-edit",
        params: {
          id: this.$route.path.split("/").reverse()[0]
        }
      });
    },
    del() {
      this.$confirm({
        title: "确定删除？",
        content: (
          <p>
            确定删除当前展示的
            <span style="color: #f00;">1</span>
            位主要成员？
          </p>
        ),
        onOk: () => {
          return new Promise(resolve => {
            delMember([this.$route.path.split("/").reverse()[0]]).then(res => {
              if (res.data.res) {
                this.$Message.success(res.data.msg);
                this.back();
              }
              resolve();
            });
          });
        }
      });
    }
  },
  created() {
    getMember(this.$route.path.split("/").reverse()[0]).then(res => {
      if (res.data.res) {
        this.currentMember = res.data.data;
        this.currentMember.birthday = this.$moment(
          this.currentMember.birthday
        ).format("YYYY年MM月DD日");
        this.currentMember.workDate = this.$moment(
          this.currentMember.workDate
        ).format("YYYY年MM月DD日");
      }
    });
  }
};
</script>

<style lang="less">
@import "../../assets/less/common.less";
.member {
  width: 100%;
  height: 100%;
  .detail {
    @base-width: 700px;
    .base {
      width: @base-width;
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
}
</style>
