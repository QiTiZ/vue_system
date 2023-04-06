<template>
  <div :style="{fontSize: size,textAlign: align,marginTop:top}" class="text">
    <div :style="{left:left}" class="cc"> {{ list.val }}</div>
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
  created() {
    this.list = this.data;
  },
  watch: {
    data(newVal) {
      this.list = newVal
    }
  },
  computed: {
    width() {
      if (this.list.width) {
        return this.list.width + "px";
      }
    },
    height() {
      if (this.list.height) {
        return this.list.height + "px";
      }
    },
    top() {
      if (this.list.top) {
        return this.list.top / 5 + "px";
      }
    },
    left() {
      if (this.list.left) {
        return this.list.left / 1.72 + "px";
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
  methods: {},
};
</script>

<style lang="less" scoped>

.text {
  line-height: 20px;
  margin: 0 20px;
  height: 20px;
  position: relative;

  .cc {
    display: inline-block;
    position: relative;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 13.5px;
  }
}
</style>