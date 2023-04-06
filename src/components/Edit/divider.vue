<template>
  <div id="text">
    <div class="list">
      <span class="attribute">分割线样式</span>
      <el-button type="primary" @click="dot">点样式</el-button>
      <el-button type="success" @click="line">横线样式</el-button>
    </div>
    <div class="list">
      <span class="top">Top</span>
      <el-input-number v-model="list.top" :max="99999" :min="30" label="描述文字"></el-input-number>
    </div>
    <div class="list">
      <span class="loopkey">LoopKey</span>
      <el-input v-model="list.loopKey" placeholder="LoopKey"></el-input>
    </div>
    <div style="height: 1px"></div>
  </div>
</template>

<script>
export default {
  name: "dividerEdit",
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
  methods: {
    dot() {
      this.list.val = '.......................................................................................'
      this.$emit('updateDataVal', this.list)
    },
    line() {
      this.list.val = '-------------------------------------------------------------------------'
      this.$emit('updateDataVal', this.list)
    }
  },
};
</script>

<style lang="less" scoped>
#text {
  position: relative;
  padding: 20px;

  p {
    padding: 10px 0;
  }
}

.list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}


.el-input {
  width: 60%;
}

::v-deep .el-input-number .el-input {
  width: 130px;
}

.attribute {
  color: red;
}

.attributeLeft {
  color: #0C92BF;
}

.loopkey {
  color: #2ecc71;
}

.top {
  color: #ab28be;
}
</style>