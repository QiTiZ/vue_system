<template>
  <div class="image-content">
    <div class="list">
      <span class="loopkey">Val </span>
      <el-input v-model="list.val" placeholder="Val"></el-input>
    </div>
    <div v-show="heightShow" class="list">
      <span class="height">高度</span>
      <el-input v-model="codeHeight" placeholder="高度"></el-input>
    </div>
    <div class="list">
      <span class="top">Top </span>
      <el-input-number v-model="list.top" :max="99999" :min="30" label="描述文字"></el-input-number>
    </div>
    <div class="list">
      <span class="loopkey">LoopKey </span>
      <el-input v-model="list.loopKey" placeholder="LoopKey"></el-input>
    </div>
    <div class="list">
      <span class="top">大小设置 </span>
      <el-input-number v-model="list.fieldSize" :max="32" :min="1" label="描述文字"></el-input-number>
    </div>
    <div class="list">
      <div class="title">
        <span> 显示位置 </span>
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
</template>

<script>
export default {
  name: 'codeEdit',
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
      heightShow: false
    };
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
    codeHeight: {
      get() {
        if (this.list.fieldSize) {
          this.list.height = this.list.fieldSize * 10 + ''
          return this.list.fieldSize * 10 + ''
        }
      },
      set() {
      }
    }
  },
  watch: {
    data(newVal) {
      this.list = newVal
    },
    val(newVal) {
      console.log(newVal)
    },
  },
  mounted() {
    this.list = this.data;
  },
  methods: {
    //  显示的位置
    align(event) {
      this.list.align = event;
    },
  },
};
</script>

<style lang="less" scoped>
.image-content {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 100%;
  overflow: hidden;
  padding: 20px;

  .desc {
    text-align: center;
    font-size: 12px;
    color: #666;
    margin: 18px 0;
    padding-bottom: 10px;
    border-bottom: 1px dashed #ddd;
  }

  .size {
    text-align: center;
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }

  .add-image {
    width: calc(100% - 20px);
    height: 34px;
    line-height: 34px;
    padding: 0;
    font-size: 12px;
    margin-left: 10px;
    margin-top: 10px;
  }

  .image-list {
    margin: 0;
    padding: 0 10px;
    overflow: auto;

    &::-webkit-scrollbar-thumb {
      background: #dbdbdb;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      background: #f6f6f6;
      border-radius: 10px;
    }

    &::-webkit-scrollbar {
      width: 6px;
    }

    li {
      list-style: none;
      background: #f7f8f9;
      border-radius: 4px;
      padding: 6px 14px 10px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;

      &.disable div {
        pointer-events: none;
        user-select: none;
      }

      .l-info {
        font-size: 12px;
        padding-top: 8px;
        width: calc(100% - 70px);

        p {
          margin: 12px 0 0;
          white-space: nowrap;
          overflow: hidden;
          display: flex;

          .link {
            color: #1b8bff;
            cursor: pointer;
          }

          .text {
            white-space: nowrap;
            text-align: -webkit-auto;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }

      .r-image {
        text-align: right;

        .el-icon-close {
          color: #999;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 6px;
          cursor: pointer;

          &:hover {
            color: red;
          }
        }

        .image-box {
          width: 70px;
          height: 70px;
          border-radius: 5px;
          overflow: hidden;
          position: relative;
          background: #fff;
          display: flex;
          justify-content: center;
          align-items: center;

          &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            opacity: 0;
            transition: all 0.3s;
          }

          span {
            position: absolute;
            top: 50%;
            left: 50%;
            color: #fff;
            transform: translate(-50%, -50%);
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            transition: all 0.3s;
          }

          img {
            max-width: 100%;
          }

          &:hover {
            &::before,
            span {
              opacity: 1;
            }
          }
        }
      }
    }
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