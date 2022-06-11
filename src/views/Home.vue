<template>
  <div>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '205px'">
        <el-menu
          :collapse="isCollapse"
          background-color="#304156"
          text-color="#bfcbd9"
          unique-opened
          :collapse-transition="false"
          :default-active="defaultActive"
        >
          <el-menu-item index="1" @click="goHome">
            <i class="el-icon-s-home"></i>
            <span slot="title">主页</span>
          </el-menu-item>
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState(item.path + '/' + subItem.path)"
            >
              <template slot="title">
                <!-- 图标 -->
                <i :class="subItem.hidden === true ? '' : subItem.icon"></i>
                <!-- 文本 -->
                <span>{{ subItem.hidden === true ? '' : subItem.title }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-button @click="foldMenu">展开</el-button>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  data() {
    return {
      isCollapse: false,
      menuList: [],
      activePath: '',
      defaultActive: '1'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 菜单展开与折叠
    foldMenu() {
      this.isCollapse = !this.isCollapse
    },
    async getList() {
      const { data: res } = await axios.get(
        'http://leju.bufan.cloud/admin/sysAuth/index/getInitMenus'
      )

      const mapList = res.data.permissionList.map((item) => {
        return {
          id: item.id,
          name: item.title,
          path: item.path,
          icon: item.icon,
          children: item.children
        }
      })

      this.menuList = mapList
    },
    goHome() {
      this.$router.push('/home')
    },
    // 路由跳转
    saveNavState(e) {
      this.$router.push(e)
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu {
  border-right: '';
  height: 100%;
}
.el-submenu .el-menu-item {
  height: auto;
}
</style>
