<template>
  <div class="login">
    <!-- 头像区域 -->
    <div class="avator">
      <el-avatar :size="150" src="https://pic.imgdb.cn/item/62a3fba609475431292da0f9.jpg">
      </el-avatar>
    </div>

    <!-- 登录表格区域 -->
    <div class="login_form">
      <el-form :model="ruleForm" :rules="rules" ref="loginFormRef" label-width="0px">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user-solid" v-model="ruleForm.username"
            placeholder="Username"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input type="password" show-password prefix-icon="el-icon-lock"
            v-model="ruleForm.password" placeholder="Password"></el-input>
        </el-form-item>
      </el-form>

      <el-button type="primary" @click="goHome">Login</el-button>
    </div>
  </div>
</template>

<script>
// http://leju.bufan.cloud/admin/sysAuth/user/saveUserRoles
export default {
  name: '',
  data() {
    return {
      // 登录表单数据绑定对象
      ruleForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {},
  methods: {
    goHome() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return ''

        const { data: res } = await this.$http.post(
          'index/login',
          this.ruleForm
        )

        if (res.success === 'false') {
          return this.$message.error('登录失败')
        }

        this.$message.success('登录成功')

        window.sessionStorage.setItem('token', res.data.token)

        this.$router.push('/welcome')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  position: relative;
  background-color: #2d3a4b;
}

.avator {
  position: absolute;
  left: 50%;
  top: 30%;
  z-index: 999;
  transform: translate(-50%, -50%);
}

.login_form {
  position: absolute;
  padding: 0 15px;
  left: 50%;
  top: 52%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  border: 1px solid #fff;
  width: 430px;
  height: 270px;
  .el-form {
    margin-top: 90px;
  }
  ::v-deep .el-input__inner {
    background-color: #283443;
    color: #fff;
    border: 1px solid #555;
  }
  .el-button {
    width: 100%;
  }
}
</style>
