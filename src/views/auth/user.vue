<template>
  <div>
    <el-card>
      <el-button type="primary" @click="addDialogVisible = true">新增用户</el-button>

      <!-- 新增角色对话框 -->
      <el-dialog title="提示" :visible.sync="addDialogVisible" width="50%">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
          class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nick_name">
            <el-input v-model="ruleForm.nick_name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item label="选择角色" prop="roleIds">
            <el-select v-model="ruleForm.roleIds" placeholder="请选择商品品牌" multiple>
              <el-option v-for="item in roleSlist" :key="item.id" :label="item.roleName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUsername">确 定</el-button>
        </span>
      </el-dialog>

      <el-divider></el-divider>

      <el-table :data="userList" style="width: 100%" border stripe>
        <el-table-column type="index" label="#" width="50" align="center">
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="150" align="center">
        </el-table-column>
        <el-table-column prop="nick_name" label="昵称" width="150" align="center">
        </el-table-column>
        <el-table-column label="头像" align="center" width="150">
          <template slot-scope="scope">
            <img :src="scope.row.salt" alt="" class="avator">
          </template>
        </el-table-column>
        <el-table-column prop="roles" label="角色" align="center">
        </el-table-column>
        <el-table-column prop="create_time" label="添加时间" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editGoods(scope)">编辑</el-button>
            <el-button size="mini" type="danger" @click="delUsername(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  data() {
    return {
      quertInfo: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      userList: [],
      roleSlist: [],
      addDialogVisible: false,
      visible: false,
      ruleForm: {
        username: '',
        nick_name: '',
        password: '',
        roleIds: []
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        nick_name: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        roleIds: [{ required: true, message: '请选择角色', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getUserList()
    this.getRolesList()
  },
  methods: {
    async getUserList() {
      const { data: res } = await axios.post(
        `http://leju.bufan.cloud/admin/sysAuth/user/findUsersByPage/${this.quertInfo.pageNum}/${this.quertInfo.pageSize}`
      )

      if (res.code !== 20000) {
        return this.$message.error('获取列表失败')
      }
      this.userList = res.data.rows
      this.total = res.data.total
      console.log(this.userList)
    },
    async getRolesList() {
      const { data: res } = await axios.get(
        'http://leju.bufan.cloud/admin/sysAuth/role/findAllRoles'
      )

      if (res.code !== 20000) {
        return this.$message.error('获取权限列表失败')
      }
      this.roleSlist = res.data.items
    },
    async addUsername() {
      const { data: res } = await axios.post(
        'http://leju.bufan.cloud/admin/sysAuth/user/saveUserRoles',
        {
          ...this.ruleForm,
          nickName: this.ruleForm.nick_name
        }
      )
      if (res.code !== 20000) {
        return this.$message.error('新增用户失败')
      }
      this.$message.success('新增用户成功')
      this.addDialogVisible = false
      this.getUserList()
    },
    async delUsername(e) {
      console.log(e)
      const confirmDemo = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
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

      const { data: res } = await axios.delete(
        `http://leju.bufan.cloud/admin/sysAuth/user/removeUser/${e.id}`
      )

      if (res.code !== 20000) {
        return this.$message.error('删除用户失败')
      }
      this.$message.success('删除用户成功')

      this.getUserList()
    }
  }
}
</script>

<style lang='less' scoped>
.avator {
  width: 50px;
  height: 50px;
}

.el-input {
  width: 60%;
}
</style>
