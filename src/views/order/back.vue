<template>
  <div>
    <el-card>
      <el-table :data="orderList" style="width: 100%" border stripe>
        <el-table-column type="index" label="#" width="50" align="center">
        </el-table-column>
        <el-table-column
          prop="orderSn"
          label="订单编号"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column label="退单状态" width="120" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 3">
              <el-button size="mini" type="info" plain>已拒绝</el-button>
            </span>
            <span v-if="scope.row.status === 2">
              <el-button size="mini" type="primary" plain>已完成</el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="reason"
          label="退单原因"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="productName"
          label="商品名称"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="handleNote"
          label="商家备注"
          width="130"
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
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              class="el-icon-aim"
              @click="lookOrder(scope)"
            >
              查看订单
            </el-button>
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
      orderList: [],
      queryInfo: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    async getOrderList() {
      const { data: res } = await this.$http.post(
        `orderReturn/findReturnApply/${this.queryInfo.pageNum}/${this.queryInfo.pageSize}`
      )

      if (res.code !== 20000) {
        return this.$message.error('获取订单列表失败')
      }

      this.orderList = res.data.rows
      console.log(this.orderList)
      this.total = res.data.total
    }, // pagesize
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getOrderList()
    },
    handleCurrentChange(newNum) {
      this.queryInfo.pageNum = newNum
      this.getOrderList()
    },
    lookOrder() {
      this.$message.success('明天写')
    }
  }
}
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 30px;
}

::v-deep .el-table .cell {
  line-height: 32px;
}
</style>
