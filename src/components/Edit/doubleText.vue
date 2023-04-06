<template>
  <div id="text">
    <div class="list">
      <span class="attribute">属性一</span>
      <el-input v-model="list.val" maxlength="50" placeholder="请输入内容"></el-input>
    </div>
    <div class="list">
      <span class="attributeLeft">Left1 </span>
      <el-input-number v-model="list.left" :max="600" :min="0" label="描述文字"></el-input-number>
    </div>
    <div class="list">
      <span class="attribute">属性二</span>
      <el-input v-model="list.val1" maxlength="50" placeholder="请输入内容"></el-input>
    </div>
    <div class="list">
      <span class="attributeLeft">Left2</span>
      <el-input-number v-model="list.left1" :max="600" :min="0" label="描述文字"></el-input-number>
    </div>
    <div class="list">
      <span class="top">TOP </span>
      <el-input-number v-model="list.top" :max="99999" :min="30" label="描述文字"></el-input-number>
    </div>
    <div class="list">
      <span class="loopkey">LoopKey </span>
      <el-input v-model="list.loopKey" placeholder="请输入LoopKey"></el-input>
    </div>
    <div style="height: 1px"></div>
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
      <!-- 显示位置 -->
      <div class="list">
        <div class="title">
          <span>显示位置 </span>
          <span>
            {{ showPlace }}
          </span>
        </div>
        <div class="btn">
          <el-radio-group v-model="list.align" @change="align">
            <el-tooltip class="item" content="居左显示" effect="dark" placement="bottom">
              <el-radio-button label="left"><i class="el-icon-s-fold"></i></el-radio-button>
            </el-tooltip>
            <el-tooltip class="item" content="居中显示" effect="dark" placement="bottom">
              <el-radio-button label="center">
                <i class="el-icon-s-operation"></i>
              </el-radio-button>
            </el-tooltip>
            <el-tooltip class="item" content="居右显示" effect="dark" placement="bottom">
              <el-radio-button label="right">
                <i class="el-icon-s-operation"></i>
              </el-radio-button>
            </el-tooltip>
          </el-radio-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "doubleTextEdit",
  props: {
    data: {
      type: Object,
      default: () => {
      },
    },
  },
  data() {
    return {
      list: {
        left1: 300
      },
    };
  },
  created() {
    this.list = this.data;
  },
  computed: {
    showPlace() {
      if (this.list.align === 'left') {
        return '居左显示'
      } else if (this.list.align === 'center') {
        return '居中显示'
      } else if (this.list.align === 'right') {
        return '居右显示'
      } else {
        return '居左显示'
      }
    },
  },
  methods: {
    align(event) {
      this.list.align = event;
    },
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