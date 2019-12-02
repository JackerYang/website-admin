<template>
  <div v-if="showFullScreenBtn" class="full-screen">
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>{{value ? '退出全屏' : '全屏'}}</span>
      </template>
      <a-icon
        @click.native="handleChange"
        :type="value ? 'fullscreen-exit' : 'fullscreen'"
        :style="{fontSize: '24px'}"
      />
    </a-tooltip>
  </div>
</template>

<script>
export default {
  name: "Fullscreen",
  computed: {
    showFullScreenBtn() {
      return window.navigator.userAgent.indexOf("MSIE") < 0;
    }
  },
  data() {
    return {
      value: false
    };
  },
  methods: {
    handleFullscreen() {
      let main = document.body;
      if (this.value) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (main.requestFullscreen) {
          main.requestFullscreen();
        } else if (main.mozRequestFullScreen) {
          main.mozRequestFullScreen();
        } else if (main.webkitRequestFullScreen) {
          main.webkitRequestFullScreen();
        } else if (main.msRequestFullscreen) {
          main.msRequestFullscreen();
        }
      }
    },
    handleChange() {
      this.handleFullscreen();
    }
  },
  mounted() {
    let arr = [
      "fullscreenchange",
      "mozfullscreenchange",
      "webkitfullscreenchange",
      "msfullscreenchange"
    ];
    arr.forEach(item => {
      document.addEventListener(item, () => {
        this.value = !this.value;
      });
    });
  }
};
</script>

<style lang="less" scoped>
.full-screen {
  width: 24px;
  height: 24px;
  line-height: 24px;
  cursor: pointer;
  margin-right: 20px;
}
</style>
