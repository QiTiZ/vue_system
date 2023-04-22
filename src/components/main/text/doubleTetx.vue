<template>

  <div :style="{ fontSize: size, textAlign: align,marginTop:top }" class="text">
    <div :style="{left:left}" class="cc">
      {{ list.val || "属性1" }}
    </div>

    <div :style="{left:left1}" class="cc">
      {{ list.val1 || "属性2" }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {
      },
    },
  },
  data() {
    return {
      list: {},
    };
  },
  watch: {
    data(newVal) {
      this.list = newVal
    }
  },
  created() {
    this.list = this.data;
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    width() {
      if (this.list.width) {
        return this.list.width + "px";
      }
    },
    // eslint-disable-next-line vue/return-in-computed-property
    height() {
      if (this.list.height) {
        return this.list.height + "px";
      }
    },
    // eslint-disable-next-line vue/return-in-computed-property
    top() {
      if (this.list.top) {
        return this.list.top / 5 + "px";
      }
    },
    // eslint-disable-next-line vue/return-in-computed-property
    left() {
      if (this.list.left) {
        return this.list.left / 1.79 + "px";
      }
    },
    // eslint-disable-next-line vue/return-in-computed-property
    left1() {
      if (this.list.left1) {
        return this.list.left1 / 1.79 + "px";
      }
    },
    //  标题字体大小
    size() {
      if (this.list.size === 3) {
        return "12px";
      } else if (this.list.size === 2) {
        return "14px";
      } else {
        return "16px";
      }
    },
    // 标题显示位置
    // eslint-disable-next-line vue/return-in-computed-property
    align() {
      if (this.list.align === "left") {
        return "left";
      } else if (this.list.align === "center") {
        return "center";
      } else if (this.list.align === "right") {
        return "right";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.text {
  overflow: hidden;
  line-height: 20px;
  margin: 0 20px;
  height: 20px;
  position: relative;

  .cc {
    display: inline-block;
    position: absolute;
    width: 50%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 13.5px;

  }
}
</style>
