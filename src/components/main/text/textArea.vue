<template>
  <div :style="{fontSize: size,marginTop:top}" class="text">
    <span class="left">   {{ list.val || "多行文本" }}</span>
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
    // eslint-disable-next-line vue/return-in-computed-property
    top() {
      if (this.list.top) {
        return this.list.top / 5 + "px";
      }
    },
    size() {
      if (this.list.size === 3) {
        return "12px";
      } else if (this.list.size === 2) {
        return "14px";
      } else {
        return "16px";
      }
    },
  },
};
</script>

<style lang="less" scoped>

.text {

  font-size: 16px;
  margin: 0 20px;
  overflow: hidden;
  word-break: break-all;
  white-space: pre-wrap;
  width: 90%;

  .left {
    position: relative;
    overflow: hidden;
    word-break: break-all;
    white-space: pre-wrap;
    font-size: 13.5px;
    //width: 100%;
    //box-sizing: border-box;

  }
}

</style>
