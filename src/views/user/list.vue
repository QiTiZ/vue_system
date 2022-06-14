<template>
  <div>
    <el-card>
      <el-table :data="userList" style="width: 100%" border>
        <el-table-column type="index" label="#" width="50" align="center">
        </el-table-column>
        <el-table-column prop="username" label="用户名" align="center">
        </el-table-column>
        <el-table-column label="用户头像" width="150" align="center">
          <template slot-scope="scope">
            <el-avatar :size="60" :src="scope.row.icon" @error="errorHandler">
              <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              />
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="personalizedSignature"
          label="真实姓名"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column label="性别" width="80" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.sex === 0" size="mini" type="primary"
              >男</el-button
            >
            <el-button v-else size="mini" type="success">女</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="电话" width="180" align="center">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="100" align="center">
        </el-table-column>
        <el-table-column
          prop="birthday"
          label="生日"
          width="100"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="createTime"
          label="创建时间"
          width="180"
          align="center"
        >
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
      const { data: res } = await this.$http.get(
        `member/findMembersByPage/${this.queryInfo.pageNum}/${this.queryInfo.pageSize}`
      )
      this.userList = res.data.rows

      this.total = res.data.total
      console.log(this.userList)
    },
    errorHandler() {
      return true
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
</style>
