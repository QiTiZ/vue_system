<template>
  <div :style="{
          fontSize: size,
          textAlign: align,
          marginTop:top
        }" class="text">
    <div :style="{left:left}" class="cc">
      {{ list.val || "一行多列" }}
    </div>
    <div :style="{left:left1}" class="cc">
      {{ list.val1 }}
    </div>
    <div :style="{left:left2}" class="cc">
      {{ list.val2 }}
    </div>
    <div :style="{left:left3}" class="cc">
      {{ list.val3 }}
    </div>
    <div :style="{left:left4}" class="cc">
      {{ list.val4 }}
    </div>
  </div>
</template>

<script>
export default {
  name: "",
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
        return this.list.left / 1.79 + "px";
      }
    },
    left1() {
      if (this.list.left1) {
        return this.list.left1 / 1.79 + "px";
      }
    }, left2() {
      if (this.list.left2) {
        return this.list.left2 / 1.79 + "px";
      }
    }, left3() {
      if (this.list.left3) {
        return this.list.left3 / 1.79 + "px";
      }
    }, left4() {
      if (this.list.left4) {
        return this.list.left4 / 1.79 + "px";
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
    // 标题加粗
    bold() {
      if (this.list.bold == 2) {
        return "900";
      } else {
        return "500";
      }
    },
    // 底部分割线
    border() {
      if (this.list.border) {
        return "1px solid #cccccc";
      } else {
        return "";
      }
    },
  },
  methods: {},
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
    width: 21%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 13.5px;

  }
}

</style>