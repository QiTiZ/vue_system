<template>
  <div>
    <el-card>
      <!-- 搜索区域 -->
      <el-input
        placeholder="请输入内容"
        v-model="input3"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>

      <!-- 添加商品按钮 -->
      <el-button class="addGoods" type="primary" @click="addGoods"
        >添加活动</el-button
      >

      <el-table :data="goodsList" style="width: 100%" border>
        <el-table-column type="index" label="#" width="50" align="center">
        </el-table-column>
        <el-table-column label="商品图片" width="130" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.pic" class="table_img" />
          </template>
        </el-table-column>
        <el-table-column label="活动时间" width="270" align="center">
          <template slot-scope="scope">
            <div>开始时间:{{ scope.row.promotionStartTime }}</div>
            <div>结束时间:{{ scope.row.promotionEndTime }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="brandName"
          label="品牌名称"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="price" label="价格" width="100" align="center">
        </el-table-column>
        <el-table-column
          prop="productCategoryName"
          label="类别"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
          width="180"
        >
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="delGoods(scope)"
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
      goodsList: [],
      input3: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const { data: res } = await this.$http.get(
        'homeRecommend/findAllRecommends'
      )
      this.goodsList = res.data.items

      console.log(this.goodsList)
    },
    // 编辑商品
    editGoods(e) {
      console.log(e)
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
      this.$message.success('明天写')
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
