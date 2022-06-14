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
        <el-table-column label="支付方式" width="180" align="center">
          <template slot-scope="scope">
            <span
              v-if="scope.row.payType === 0"
              class="iconfont icon-weizhifu"
            ></span>
            <span
              v-if="scope.row.payType === 1"
              class="iconfont icon-zhifubao"
              style="color: #06b4fd"
            >
            </span>
            <span
              v-if="scope.row.payType === 2"
              class="iconfont icon-weixinzhifu"
              style="color: #28c326"
            ></span>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" width="180" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0">
              <el-button size="mini" type="danger">待付款</el-button>
            </span>
            <span v-if="scope.row.status === 1">
              <el-button size="mini" type="warning">待发货</el-button>
            </span>
            <span v-if="scope.row.status === 2">
              <el-button size="mini" type="primary" plain>已发货</el-button>
            </span>
            <span v-if="scope.row.status === 3">
              <el-button size="mini" type="success">已完成</el-button>
            </span>
            <span v-if="scope.row.status === 4">
              <el-button size="mini" type="info">已关闭</el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="memberUsername"
          label="用户账户"
          width="180"
          align="center"
        >
        </el-table-column
        ><el-table-column label="订单类型" width="150" align="center">
          <span>
            <el-button type="success" plain size="mini">正常订单</el-button>
          </span>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="lookOrder(scope)">
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
        `order/findOrdersByPage/${this.queryInfo.pageNum}/${this.queryInfo.pageSize}`
      )

      if (res.code !== 20000) {
        return this.$message.error('获取订单列表失败')
      }

      this.orderList = res.data.rows
      this.total = res.data.total

      console.log(res.data.rows)
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
