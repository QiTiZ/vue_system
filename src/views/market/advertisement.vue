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
      <el-button class="addGoods" type="primary" @click="addGoods">
        新增广告
      </el-button>

      <el-table :data="goodsList" style="width: 100%" border>
        <el-table-column type="index" label="#" width="50" align="center">
        </el-table-column>
        <el-table-column label="商品图片" width="130" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.pic" class="table_img" />
          </template>
        </el-table-column>
        <el-table-column label="广告时间" width="270" align="center">
          <template slot-scope="scope">
            <div>开始时间: {{ scope.row.startTime }}</div>
            <div>结束时间: {{ scope.row.endTime }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="广告名称"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="clickCount"
          label="点击数"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="orderCount"
          label="下单数"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column label="轮播位置" align="center" width="100">
          <span>首页轮播</span>
        </el-table-column>
        <el-table-column label="链接地址" align="center" width="180">
          <span>www.baidu.com</span>
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
      const { data: res } = await this.$http.get('advertise/adsList')
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
