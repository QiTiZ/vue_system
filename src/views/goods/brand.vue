<template>
  <div>
    <el-card>
      <el-table :data="brandList" border style="width: 100%">
        <el-table-column type="index" label="#" width="50" align="center">
        </el-table-column>
        <el-table-column prop="name" label="品牌名称" width="180" align="center">
        </el-table-column>
        <el-table-column label="状态" width="180" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.showStatus" :active-value="1" :inactive-value="0"
              @change="brandStatus(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="LOGO" width="180" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.logo" alt="" srcset="" class="logoImg" />
          </template>
        </el-table-column>

        <el-table-column label="品牌故事" prop="brandStory" width="300" align="center">
        </el-table-column>

        <el-table-column label="创建时间" prop="createTime" width="180" align="center">
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editGoods(scope)">编辑</el-button>
            <el-button size="mini" type="danger" @click="delBrand(scope.row)">删除</el-button>
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
      brandList: []
    }
  },
  created() {
    this.getBrandList()
  },
  methods: {
    async getBrandList() {
      const { data: res } = await this.$http.get('brand/findAllBrand')

      if (res.code !== 20000) {
        return this.$message.error('获取品牌列表失败')
      }
      this.brandList = res.data.items
    },
    async brandStatus(e) {
      const { data: res } = await this.$http.post('brand/switchShowStatus', {
        id: e.id,
        status: e.showStatus
      })

      if (res.code !== 20000) {
        return this.$message.error('切换状态失败')
      }

      this.$message.success('切换状态成功')
    },
    async delBrand(e) {
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

      const { data: res } = await this.$http.delete(`brand/delBrand/${e.id}`)

      if (res.code !== 20000) {
        return this.$message.error('删除品牌失败')
      }

      this.$message.success('删除品牌成功')

      this.getBrandList()
    }
  }
}
</script>

<style lang="less" scoped>
.logoImg {
  width: 100px;
  height: 100px;
}
</style>
