<template>
  <div>
    <el-card>
      <!-- 搜索区域 -->
      <el-input placeholder="请输入内容" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>

      <!-- 添加商品按钮 -->
      <el-button class="addGoods" type="primary" @click="addGoods">添加商品</el-button>

      <el-table :data="goodsList" style="width: 100%" border>
        <el-table-column type="index" label="#" width="50" align="center">
        </el-table-column>
        <el-table-column label="商品图片" width="100" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.pic" class="table_img" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" width="180" align="center">
        </el-table-column>
        <el-table-column prop="brandName" label="品牌" width="180" align="center">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="180" align="center">
        </el-table-column>
        <el-table-column prop="weight" label="数量" align="center">
        </el-table-column>
        <el-table-column prop="sort" label="库存" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editGoods(scope)">编辑</el-button>
            <el-button size="mini" type="danger" @click="delGoods(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="queryInfo.pageNum" :page-sizes="[10, 20, 30, 40]"
          :page-size="queryInfo.pageSize" layout="total, sizes, prev, pager, next, jumper"
          :total="total">
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
      goodsList: [],
      queryInfo: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0
    }
  },
  created() {
    this.$nextTick(() => {
      this.getList()
    })
  },
  methods: {
    async getList() {
      const { data: res } = await this.$http.post(
        `/product/productsByPage/${this.queryInfo.pageNum}/${this.queryInfo.pageSize}`
      )
      this.goodsList = res.data.rows

      this.total = res.data.total
    },
    // 编辑商品
    editGoods(e) {
      this.$router.push(`/product/detail/${e.row.id}`)
    },
    // pagesize
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getList()
    },
    handleCurrentChange(newNum) {
      this.queryInfo.pageNum = newNum
      this.getList()
    },
    addGoods() {
      this.$router.push('/product/addDetail')
    },
    async delGoods(e) {
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

      const { data: res } = await this.$http.delete('product/del/' + e.row.id)

      if (res.code !== 20000) {
        return this.$message.error('删除商品失败')
      }
      this.$message.success('删除商品成功')
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
