/**
 * @desc 自定义插件（指令）v-xxx
 */

const directive = {
  install: Vue => {
    // 监控元素宽和高
    Vue.directive("elResize", {
      bind(el, binding) {
        setTimeout(() => {
          let origin = document.defaultView.getComputedStyle(el);
          let width = origin.width;
          let height = origin.height;
          function get() {
            let style = document.defaultView.getComputedStyle(el);
            if (width !== style.width || height !== style.height) {
              binding.value({ width, height });
            }
            width = style.width;
            height = style.height;
          }
          el.__myResize__ = setInterval(get, 500);
        }, 1000);
      },
      unbind(el) {
        clearInterval(el.__myResize__);
      }
    });

    // 监控元素宽和高
    Vue.directive("elLtWidth", {
      bind(el, binding) {
        function get() {
          let width = document.defaultView.getComputedStyle(el).width;
          binding.value({ width });
        }
        el.__myLtWidth__ = setInterval(get, 500);
      },
      unbind(el) {
        clearInterval(el.__myLtWidth__);
      }
    });

    // 点击其他元素
    Vue.directive("clickOutside", {
      bind(el, binding) {
        function documentHandler(e) {
          if (el.contains(e.target)) {
            return false;
          }
          if (binding.expression) {
            binding.value(e);
          }
        }
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener("click", documentHandler);
      },
      unbind(el) {
        document.removeEventListener("click", el.__vueClickOutside__);
        delete el.__vueClickOutside__;
      }
    });
  }
};

export default directive;
