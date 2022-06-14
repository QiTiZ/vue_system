<template>
  <div>
    <el-card>
      <!-- 图片上传 -->
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>

      <el-row :gutter="20">
        <el-col
          v-for="item in matreialList"
          :key="item.id"
          style="margin-bottom: 20px; width: 20%"
        >
          <el-card>
            <span>创建时间: {{ item.createTime }}</span>
            <el-divider></el-divider>
            <el-image
              style="width: 185px; height: 250px"
              :src="item.ossUrl"
            ></el-image>
            <el-button type="danger" size="mini">删除</el-button>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      matreialList: []
    }
  },
  created() {
    this.getMatreialList()
  },
  methods: {
    async getMatreialList() {
      const { data: res } = await this.$http.get(
        'material/findMaterialByPage/0/10'
      )

      if (res.code !== 20000) {
        return this.$message.error('获取数据失败')
      }

      this.matreialList = res.data.rows
      console.log(res.data.rows)
    }
  }
}
</script>

<style lang="less" scoped>
.el-row {
  display: flex;
  flex-wrap: wrap;
}

.el-button {
  width: 100px;
  margin-top: 10px;
  margin-left: 85px;
}
</style>
