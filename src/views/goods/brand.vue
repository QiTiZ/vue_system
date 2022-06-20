<template>
  <div>
    <el-card>
      <el-button type="primary" @click="dialogVisible = true">新增品牌</el-button>
      <!-- 新增品牌提示框 -->
      <el-dialog title="新增品牌" :visible.sync="dialogVisible" width="60%">
        <el-form :model="brandForm" :rules="rules" ref="addBrandFormRef" label-width="100px"
          class="demo-brandForm">
          <el-form-item label="品牌名称" prop="name">
            <el-input v-model="brandForm.name" placeholder="请输入品牌名称"></el-input>
          </el-form-item>
          <el-form-item label="品牌故事" prop="brandStory">
            <el-input v-model="brandForm.brandStory" placeholder="请输入品牌故事"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch v-model="brandForm.showStatus" :active-value="1" :inactive-value="0">
            </el-switch>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editAddBrand">取 消</el-button>
          <el-button type="primary" @click="addBrand">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 编辑品牌提示框 -->
      <el-dialog title="编辑品牌" :visible.sync="editDialogVisible" width="60%">
        <el-form :model="brandForm" :rules="rules" ref="brandForm" label-width="100px"
          class="demo-brandForm">

          <el-form-item label="品牌名称" prop="name">
            <el-input v-model="brandForm.name" placeholder="请输入品牌名称"></el-input>
          </el-form-item>
          <el-form-item label="品牌故事">
            <el-input v-model="brandForm.brandStory" placeholder="请输入品牌故事"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch v-model="brandForm.showStatus" :active-value="1" :inactive-value="0">
            </el-switch>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-input v-model="brandForm.createTime" placeholder="请输入日期时间">
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editBrand">确 定</el-button>
        </span>
      </el-dialog>

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
            <el-button size="mini" type="primary" @click="showEditDialog(scope.row)">编辑</el-button>
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
      brandList: [],
      dialogVisible: false,
      editDialogVisible: false,
      brandForm: {
        id: '',
        name: '',
        brandStory: '',
        createTime: '',
        showStatus: 1
      },
      rules: {
        name: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      }
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
    },
    async addBrand() {
      const { data: res } = await this.$http.post(
        'brand/addBrand',
        this.brandForm
      )

      if (res.code !== 20000) {
        return this.$message.error('新增品牌失败')
      }
      this.$message.success('新增品牌成功')

      this.dialogVisible = false
      this.getBrandList()
    },
    editAddBrand() {
      this.$refs.addBrandFormRef.resetFields()
      this.dialogVisible = false
    },
    showEditDialog(e) {
      this.editDialogVisible = true

      const editBrandList = {
        id: e.id,
        name: e.name,
        brandStory: e.brandStory,
        showStatus: e.showStatus,
        createTime: e.createTime
      }

      this.brandForm = editBrandList
    },
    async editBrand() {
      const { data: res } = await this.$http.post(
        'brand/updateBrand',
        this.brandForm
      )

      if (res.code !== 20000) {
        return this.$message.error('编辑品牌失败')
      }
      this.$message.success('编辑品牌成功')
      this.editDialogVisible = false

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
.el-button {
  margin-bottom: 15px;
}
</style>
