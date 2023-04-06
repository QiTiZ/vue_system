<template>
  <div id="text">
    <div class="list">
      <span class="top">Top </span>
      <el-input-number v-model="list.top" :max="99999" :min="30" label="描述文字"></el-input-number>
    </div>
    <div class="list">
      <span class="loopkey">LoopKey </span>
      <el-input v-model="list.loopKey" placeholder="LoopKey"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "noneEdit",
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
    size() {
    },
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

.title {
  font-size: 14px;

  :first-child {
    padding-right: 10px;
    color: #969799;
  }
}

.btn {
  display: flex;
  align-items: center;

  .reset {
    margin-right: 10px;
  }
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