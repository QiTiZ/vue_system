<template>
  <div>
    <el-card>
      <el-table :data="addressList" style="width: 100%" border stripe>
        <el-table-column type="index" label="#" width="50" align="center">
        </el-table-column>
        <el-table-column
          prop="addressName"
          label="地址名称"
          width="180"
          align="center"
        >
        </el-table-column>

        <el-table-column prop="name" label="收货人" width="120" align="center">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系方式"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column label="地址" width="400" align="center">
          <template slot-scope="scope">
            <span>{{
              scope.row.province +
              scope.row.city +
              scope.row.region +
              scope.row.detailAddress
            }}</span>
          </template>
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
            <el-button size="mini" type="primary" @click="editAddress(scope)"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" @click="delAddress(scope)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      addressList: []
    }
  },
  created() {
    this.getaddressList()
  },
  methods: {
    async getaddressList() {
      const { data: res } = await this.$http.get('companyAddress/addressList')

      if (res.code !== 20000) {
        return this.$message.error('获取订单列表失败')
      }

      this.addressList = res.data.items
      console.log(this.addressList)
      this.total = res.data.total
    }, // pagesize
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getaddressList()
    },
    handleCurrentChange(newNum) {
      this.queryInfo.pageNum = newNum
      this.getaddressList()
    },
    editAddress() {
      this.$message.success('明天写')
    },
    async delAddress(e) {
      const confirmDemo = await this.$confirm(
        '此操作将永久删除该商品, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }
      ).catch((err) => {
        return err
      })

      if (confirmDemo !== 'confirm') {
        return this.$message.info('已取消删除')
      }

      const { data: res } = await this.$http.delete(
        'companyAddress/' + e.row.id
      )

      if (res.code !== 20000) {
        return this.$message.error('删除地址失败')
      }
      this.$message.success('删除地址成功')
      this.getaddressList()
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
