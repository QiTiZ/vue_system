<template>
  <div>
    <el-card>
      <el-table :data="userList" style="width: 100%" border>
        <el-table-column type="index" label="#" width="50" align="center">
        </el-table-column>
        <el-table-column prop="title" label="文章标题" align="center">
        </el-table-column>
        <el-table-column label="文章图片" width="150" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.coverImg" class="coverImg" />
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="添加时间"
          width="220"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="author"
          label="文章作者"
          width="130"
          align="center"
        >
        </el-table-column>

        <el-table-column label="文章是否展示" width="150" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isShow"
              :active-value="1"
              :inactive-value="0"
              @change="showStatus(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="内容" width="130" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.editorType === 0">前端开发</el-tag>
            <el-tag v-if="scope.row.editorType === 1">后端开发</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editGoods(scope)"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" @click="delGoods(scope)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      userList: [],
      queryInfo: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const { data: res } = await this.$http.post(
        `productArticle/findArticles/${this.queryInfo.pageNum}/${this.queryInfo.pageSize}`
      )
      this.userList = res.data.rows

      this.total = res.data.total
      console.log(this.userList)
    },
    async showStatus(e) {
      console.log(e)
      const { data: res } = await this.$http.post(
        'productArticle/changeShowStatus',
        {
          id: e.id,
          isShow: e.isShow
        }
      )

      if (res.code !== 20000) {
        return this.$message.error('切换状态失败')
      }
      this.$message.success('切换状态成功')
    },
    // pagesize
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getList()
    },
    handleCurrentChange(newNum) {
      this.queryInfo.pageNum = newNum
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>
.table_img {
  width: 70px;
  height: 70px;
}

.el-input-group {
  width: 30%;
  margin-bottom: 15px;
}

.addGoods {
  margin-left: 30px;
}

.coverImg {
  width: 100px;
  height: 100px;
}
</style>
