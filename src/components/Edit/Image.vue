<template>
  <div class="image-content ">
    <div>
      <el-upload
          ref="upload"
          :before-upload="handleBeforeUpload"
          :headers="myHeaders"
          :limit="1"
          :on-success="handleAvatarSuccess1"
          :show-file-list="false"
          action="/file/minio/uploadFile"
          class="upload-demo"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </div>
    <!-- 显示位置 -->
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
    <div class="list">
      <span class="top">Top </span>
      <el-input-number v-model="list.top" :max="99999" :min="30" label="描述文字"></el-input-number>
    </div>
    <div class="list">
      <span class="width">宽度 </span>
      <el-input v-model="list.width" :disabled="true" placeholder="宽度"></el-input>
    </div>
    <div class="list">
      <span class="height">高度 </span>
      <el-input v-model="list.height" :disabled="true" placeholder="高度"></el-input>
    </div>
    <div class="list">
      <span class="loopkey">LoopKey </span>
      <el-input v-model="list.loopKey" placeholder="LoopKey"></el-input>
    </div>
  </div>
</template>

<script>
import { Loading } from 'element-ui';

export default {
  name: 'imageEdit',
  data() {
    return {
      myHeaders: { AuthToken: sessionStorage.getItem("mytoken") },
      list: {
        val: '',
      },
      loadingInstance: null,
    };
  },
  props: {
    data: {
      type: Object,
      default: () => {
      },
    },
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
    }
  },
  methods: {
    handleBeforeUpload(file) {
      let that = this
      that.loadingInstance = Loading.service({
        // 动画中的文字
        text: '加载中',
      });
      // 拿数据方法
      if (file) {
        let reader = new FileReader()
        reader.onload = () => {
          let base64 = event.target.result
          let img = document.createElement('img')
          img.src = base64
          img.onload = function () { // 注意只有onload以后才可以拿到图片信息
            that.list.width = img.width
            that.list.height = img.height
          }
        }
        that.loadingInstance.close();
        reader.readAsDataURL(file)
      }
    },
    handleAvatarSuccess1(res) {
      this.$refs.upload.clearFiles();

      if (res.success) {
        this.list.val = res.data.bucketName + '/' + res.data.fileName;
        this.$emit('updateDataVal', this.list)
        this.$message({
          message: "图片上传成功！",
          type: "success",
        });
      } else {
        this.$message.error("图片上传失败！");
      }
    },
    align(event) {
      this.list.align = event;
    },
  }
}
</script>
<style lang="less" scoped>

.image-content {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 100%;
  overflow: hidden;
  padding: 20px;
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
  width: 70%;
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
