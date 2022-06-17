<template>
  <div>
    <el-card>
      <el-button type="primary" @click="showAddressDialog">新增地址</el-button>

      <el-dialog title="新增地址" :visible.sync="AddDialogVisible" width="50%">
        <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="收货地址">
            <el-cascader size="large" :options="options" v-model="ruleForm.cityCode">
            </el-cascader>
          </el-form-item>
          <el-form-item label="地址名称">
            <el-input v-model="ruleForm.addressName" placeholder="地址名称"></el-input>
          </el-form-item>
          <el-form-item label="收货人姓名">
            <el-input v-model="ruleForm.name" placeholder="收货人姓名"></el-input>
          </el-form-item>
          <el-form-item label="收货人手机号">
            <el-input v-model="ruleForm.phone" placeholder="收货人手机号"></el-input>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model="ruleForm.detailAddress" placeholder="详细地址"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="AddDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addAddress">确 定</el-button>
        </span>
      </el-dialog>

      <el-divider></el-divider>

      <el-table :data="addressList" style="width: 100%" border stripe>
        <el-table-column type="index" label="#" width="50" align="center">
        </el-table-column>
        <el-table-column prop="addressName" label="地址名称" width="180" align="center">
        </el-table-column>

        <el-table-column prop="name" label="收货人" width="120" align="center">
        </el-table-column>
        <el-table-column prop="phone" label="联系方式" width="120" align="center">
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
        <el-table-column prop="createTime" label="创建时间" width="180" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editAddress(scope)">编辑</el-button>
            <el-button size="mini" type="danger" @click="delAddress(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { regionData, CodeToText } from 'element-china-area-data'

export default {
  name: '',
  data() {
    return {
      addressList: [],
      AddDialogVisible: false,
      ruleForm: {
        addressName: '',
        name: '',
        phone: '',
        detailAddress: '',
        cityCode: []
      },
      // 省市区联动地址
      options: regionData // 省市区三级联动data
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
    showAddressDialog() {
      this.AddDialogVisible = true
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
    },

    async addAddress() {
      const { data: res } = await this.$http.post('companyAddress/save', {
        ...this.ruleForm,
        cityCode: this.ruleForm.cityCode.join(','),
        province: CodeToText[this.ruleForm.cityCode[0]],
        city: CodeToText[this.ruleForm.cityCode[1]],
        region: CodeToText[this.ruleForm.cityCode[2]]
      })

      if (res.code !== 20000) {
        return this.$message.error('新增地址失败')
      }
      this.$message.success('新增地址成功')

      this.AddDialogVisible = false
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

.el-input,
.el-cascader {
  width: 60%;
}
</style>
