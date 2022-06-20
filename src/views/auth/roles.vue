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
          <el-form-item label="选择菜单">
            <el-tree ref="tree" :props="props" :data="menuList" node-key="id"
              :default-checked-keys="defKeys" show-checkbox accordion>
            </el-tree>
          </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addAddUser">取 消</el-button>
          <el-button type="primary" @click="addRoles">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 编辑角色对话框 -->
      <el-dialog title="提示" :visible.sync="editDialogVisible" width="50%">
        <el-form :model="ruleForm" :rules="rules" ref="editUserFormRef" label-width="100px"
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
          <el-form-item label="选择菜单">
            <el-tree ref="tree" :props="props" :data="menuList" node-key="id"
              :default-checked-keys="ruleForm.permissionIds" show-checkbox accordion>
            </el-tree>
          </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editRoleDia">取 消</el-button>
          <el-button type="primary" @click="sureEditRole">确 定</el-button>
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
      ruleForm: {},
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
        `http://leju.bufan.cloud/admin/sysAuth/role/findRolePermissions/${e.id}`
      )

      console.log(res)

      this.ruleForm = res.data.role
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
        `http://leju.bufan.cloud/admin/sysAuth/role/removeRole/${e.id}`
      )

      if (res.code !== 20000) {
        return this.$message.error('删除角色失败')
      }
      this.$message.success('删除角色成功')

      this.getRolesList()
    },
    async sureEditRole() {
      const { data: res } = await axios.put(
        'http://leju.bufan.cloud/admin/sysAuth/role/updateRolePermissions',
        {
          remark: this.ruleForm.remark,
          id: this.ruleForm.id,
          roleCode: this.ruleForm.roleCode,
          roleName: this.ruleForm.roleName,
          permissionIds: this.ruleForm.permissionIds
        }
      )

      if (res.code !== 20000) {
        return this.$message.error('编辑用户失败')
      }
      this.$message.success('编辑用户成功')
      this.getRolesList()
      this.editDialogVisible = false
    },
    addAddUser() {
      this.$refs.addUserFormRef.resetFields()
      this.addDialogVisible = false
    },
    editRoleDia() {
      this.$refs.editUserFormRef.resetFields()
      this.editDialogVisible = false
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
