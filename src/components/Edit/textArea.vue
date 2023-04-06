<template>
  <div id="text">
    <div class="list">
      <span class="attribute">内容</span>
      <el-input
          v-model="list.val"
          :rows="10"
          placeholder="请输入内容"
          type="textarea">
      </el-input>
    </div>

    <div class="list">
      <span class="top">Top </span>
      <el-input-number v-model="list.top" :max="99999" :min="30" label="描述文字"></el-input-number>
    </div>
    <div class="list">
      <span class="loopkey">LoopKey </span>
      <el-input v-model="list.loopKey" placeholder="LoopKey"></el-input>
    </div>
    <div style="height: 1px"></div>
    <p class="division"></p>
    <div class="details">
      <!-- 标题文字大小 -->
      <!--      <div class="list">-->
      <!--        <div class="title">-->
      <!--          <span>标题大小 </span>-->
      <!--          <span>{{-->
      <!--              list.size == 1-->
      <!--                  ? "大(16号)"-->
      <!--                  : list.size == 2-->
      <!--                      ? "中(14号)"-->
      <!--                      : "小(12号)"-->
      <!--            }}-->
      <!--          </span>-->
      <!--        </div>-->
      <!--        <div class="btn">-->
      <!--          <el-radio-group v-model="list.size" @change="size">-->
      <!--            <el-tooltip class="item" content="大(16号)" effect="dark" placement="bottom">-->
      <!--              <el-radio-button :label="1">A</el-radio-button>-->
      <!--            </el-tooltip>-->
      <!--            <el-tooltip class="item" content="中(14号)" effect="dark" placement="bottom">-->
      <!--              <el-radio-button :label="2">A</el-radio-button>-->
      <!--            </el-tooltip>-->
      <!--            <el-tooltip class="item" content="小(12号)" effect="dark" placement="bottom">-->
      <!--              <el-radio-button :label="3">A</el-radio-button>-->
      <!--            </el-tooltip>-->
      <!--          </el-radio-group>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "textAreaEdit",
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

.el-textarea {
  width: 83%;
}
</style>