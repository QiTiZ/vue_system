<template>
    <div class="text" :style="{  marginTop:top }">
      <span class="left">   {{ list.val || '--------' }}</span>
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
    val: {
      type: String,
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
    },
    val(newVal) {
      this.list.val = newVal
      this.$forceUpdate()
    }
  },
  computed: {
    top() {
      if (this.list.top) {
        return this.list.top / 5 + "px";
      }
    },
  },
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
    font-size: 13.5px;
  }
}
</style>