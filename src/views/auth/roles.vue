<template>
  <div>
    <el-card>
      <el-button type="primary" @click="addDialogVisible = true">新增角色</el-button>

      <el-divider></el-divider>

      <el-table :data="roleSlist" style="width: 100%" border stripe>
        <el-table-column type="index" label="#" width="50" align="center">
        </el-table-column>
        <el-table-column prop="roleName" label="角色昵称" width="180" align="center">
        </el-table-column>
        <el-table-column prop="roleCode" label="角色编码" width="180" align="center">
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="添加时间" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editUser(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="delUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 新增角色对话框 -->
      <el-dialog title="提示" :visible.sync="addDialogVisible" width="50%">
        <el-form :model="ruleForm" :rules="rules" ref="addUserFormRef" label-width="100px"
          class="demo-ruleForm">
          <el-form-item label="角色昵称" prop="roleName">
            <el-input v-model="ruleForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色编码" prop="roleCode">
            <el-input v-model="ruleForm.roleCode"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="remark">
            <el-input v-model="ruleForm.remark"></el-input>
          </el-form-item>
          <el-form-item label="选择菜单" prop="permissionIds">
            <el-tree ref="tree" :props="props" :data="menuList" node-key="id"
              :default-checked-keys="defKeys" show-checkbox accordion>
            </el-tree>
          </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editAddUser">取 消</el-button>
          <el-button type="primary" @click="addRoles">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 编辑用户对话框 -->
      <el-dialog title="提示" :visible.sync="editDialogVisible" width="50%">
        <el-form :model="ruleForm" :rules="rules" ref="addUserFormRef" label-width="100px"
          class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickName">
            <el-input v-model="ruleForm.nick_name"></el-input>
          </el-form-item>
          <el-form-item label="选择角色" prop="permissionIds">
            <el-select v-model="ruleForm.permissionIds" placeholder="请选择商品品牌" multiple>
              <el-option v-for="item in roleSlist" :key="item.id" :label="item.roleName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureEditUser">确 定</el-button>
        </span>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  data() {
    return {
      props: {
        label: 'title',
        children: 'children'
      },
      // 默认选中的三级权限 id值
      defKeys: [],
      count: 1,
      roleSlist: [],
      menuList: [],
      isIndeterminate: true,
      checkAll: false,
      addDialogVisible: false,
      editDialogVisible: false,
      visible: false,
      ruleForm: {
        roleName: '',
        roleCode: '',
        remark: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入橘色昵称', trigger: 'blur' }
        ],
        roleCode: [
          { required: true, message: '请输入角色编码', trigger: 'blur' }
        ],
        remark: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getRolesList()
    this.getMenuList()
  },
  methods: {
    async getMenuList() {
      const { data: res } = await axios.get(
        'http://leju.bufan.cloud/admin/sysAuth/index/getInitMenus'
      )

      this.menuList = res.data.permissionList
      console.log(res.data.permissionList)
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
    // 新增角色
    async addRoles() {
      const { data: res } = await axios.post(
        'http://leju.bufan.cloud/admin/sysAuth/role/saveRolePermissions',
        {
          ...this.ruleForm,
          permissionIds: this.$refs.tree.getCheckedKeys()
        }
      )
      if (res.code !== 20000) {
        return this.$message.error('新增角色失败')
      }
      this.$message.success('新增角色成功')
      this.addDialogVisible = false
      this.getRolesList()
    },
    async editUser(e) {
      const { data: res } = await axios.get(
        `http://leju.bufan.cloud/admin/sysAuth/user/${e.id}`
      )

      const user = {
        id: res.data.user.id,
        username: res.data.user.username,
        nick_name: res.data.user.nickName,
        password: e.password,
        permissionIds: [...res.data.user.permissionIds],
        create_time: res.data.user.createTime
      }

      this.ruleForm = user
      this.editDialogVisible = true
    },
    async delUser(e) {
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
    },
    async sureEditUser() {
      const { data: res } = await axios.put(
        'http://leju.bufan.cloud/admin/sysAuth/user/updateUserRoles',
        {
          username: this.ruleForm.username,
          id: this.ruleForm.id,
          nickName: this.ruleForm.nick_name,
          permissionIds: this.ruleForm.permissionIds
        }
      )

      if (res.code !== 20000) {
        return this.$message.error('编辑用户失败')
      }
      this.$message.success('编辑用户成功')
      this.getUserList()
      this.editDialogVisible = false
    },
    editAddUser() {
      this.$refs.addUserFormRef.resetFields()
      this.addDialogVisible = false
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
