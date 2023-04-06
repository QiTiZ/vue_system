<template>
  <div :style="{marginTop:top}" class="text">
    <span class="left">   {{ list.val || "空白模板，文字不会展示" }}</span>
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
  computed: {
    top() {
      if (this.list.top) {
        return this.list.top / 5 + "px";
      }
    },
  },
  watch: {
    data(newVal) {
      this.list = newVal
    }
  },
  methods: {},
};
</script>

<style lang="less" scoped>

.text {
  margin: 0 20px;

  .left {
    position: relative;
    overflow: hidden;
    font-size: 13.5px;

  }
}

</style>