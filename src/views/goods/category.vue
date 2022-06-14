<template>
  <el-card>
    <el-table
      :data="categoryList"
      style="width: 100%; margin-bottom: 20px"
      border
      row-key="id"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="name" label="类目" width="180"> </el-table-column>
      <el-table-column label="图片" width="180" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.icon" class="table_img" />
        </template>
      </el-table-column>
      <el-table-column label="是否上架" align="center" width="180">
        <template slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.showStatus === 1">上架 </el-tag>
          <el-tag size="mini" type="warning" v-if="scope.row.showStatus === 2">
            下架
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="180" align="center">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template>
          <span>{{ '2022-06-14 05:21' }}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      categoryList: []
    }
  },
  created() {
    this.$nextTick(() => {
      this.getCategoryList()
    })
  },
  methods: {
    async getCategoryList() {
      const { data: res } = await this.$http.get('category/getAllCategory')

      if (res.code !== 20000) {
        return this.$message.error('获取商品分类失败')
      }

      this.categoryList = res.data.items.map((item) => {
        var obj = item.category
        obj.children = item.children
        return obj
      })

      console.log(this.categoryList)
    }
  }
}
</script>

<style lang="less" scoped>
.table_img {
  width: 50px;
  height: 50px;
}
</style>
