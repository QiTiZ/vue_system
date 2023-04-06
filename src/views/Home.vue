<template>
  <el-container>
    <el-aside :width="isCollapse ? '64px' : '205px'">
      <el-menu :collapse="isCollapse" background-color="#304156" text-color="#bfcbd9" unique-opened
        :router="true" :collapse-transition="false" :default-active="$route.path">
        <el-menu-item index="/welcome" @click="goHome">
          <i class="el-icon-s-home"></i>
          <span slot="title">主页test</span>
        </el-menu-item>
        <el-submenu index="/auth">
          <template slot="title">
            <i class="el-icon-message-solid"></i>
            <span slot="title">权限管理</span>
          </template>
          <el-menu-item index="/auth/user" @click="goUser">
            <i class="el-icon-s-home"></i>
            <span slot="title">账号管理</span>
          </el-menu-item>
          <el-menu-item index="/auth/roles" @click="goRoles">
            <i class="el-icon-s-home"></i>
            <span slot="title">角色管理</span>
          </el-menu-item>
        </el-submenu>
        <!-- 一级菜单 -->
        <el-submenu :index="item.path" v-for="item in menuList" :key="item.id">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item :index="item.path + '/' + subItem.path" v-for="subItem in item.children"
            :key="subItem.id">
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
        <!-- 折叠菜单 -->
        <i :class="defaultFont" @click="foldMenu"></i>
        <breadcrumb></breadcrumb>
        <span>后台管理系统</span>
        <!-- 右侧头像区域 -->
        <div class="header-right">
          <i class="right-icon">
            <el-tooltip class="item" effect="dark" content="源码地址" placement="bottom">
              <a href="https://github.com/QiTiZ/vue_system" class="iconfont icon-github"
                target="_blank"></a>
            </el-tooltip>
            <i class="iconfont icon-wenhao" @click="dialogVisible = true"></i>
            <el-tooltip class="item" effect="dark" :content="
                fullScreenFont === 'iconfont icon-quanping_o'
                  ? '全屏显示'
                  : '退出全屏'
              " placement="bottom">
              <i :class="fullScreenFont" @click="fullScreen"></i>
            </el-tooltip>
          </i>

          <el-popover placement="bottom" width="150" trigger="click">
            <div class="logout">
              <span @click="goPerson">个人中心</span>
              <el-divider></el-divider>
              <span @click="exit">退出账号</span>
            </div>
            <el-avatar :size="50" src="https://pic.imgdb.cn/item/62a3fba609475431292da0f9.jpg"
              slot="reference"></el-avatar>
          </el-popover>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>

    <!-- 后台管理系统说明弹框 -->
    <el-dialog title="后台管理系统说明" :visible.sync="dialogVisible" width="30%">
      <span>
        一直想做一款后台管理系统，看了很多优秀的开源项目但是发现没有合适自己的。于是利用空闲休息时间开始自己写一套后台系统。如此有了姗姗管理系统，它可以用于所有的Web应用程序，如网站管理后台，网站会员中心，CMS，CRM，OA等等，当然，您也可以对它进行深度定制，以做出更强系统。所有前端后台代码封装过后十分精简易上手，出错概率低。系统会陆续更新一些实用功能。
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import axios from 'axios'
import screenfull from 'screenfull'
import breadcrumb from '../components/breadcrumb/index.vue'
export default {
  name: 'Home',
  data() {
    return {
      isCollapse: false,
      menuList: [],
      defaultFont: 'iconfont icon-daohangshouqi',
      fullScreenFont: 'iconfont icon-quanping_o',
      dialogVisible: false,
      isFullscreen: false
    }
  },
  components: {
    breadcrumb
  },
  created() {
    this.getList()
    this.defaulActive = this.$route.path
  },
  methods: {
    // 菜单展开与折叠
    foldMenu() {
      this.isCollapse = !this.isCollapse
      if (this.defaultFont === 'iconfont icon-daohangshouqi') {
        this.defaultFont = 'iconfont icon-daohangzhankai'
      } else {
        this.defaultFont = 'iconfont icon-daohangshouqi'
      }
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
      this.$router.push('/welcome')
    },
    goRoles() {
      this.$router.push('/auth/roles')
    },
    goUser() {
      this.$router.push('/auth/user')
    },
    // 全屏
    fullScreen() {
      screenfull.toggle()
      if (this.fullScreenFont === 'iconfont icon-quanping_o') {
        this.fullScreenFont = 'iconfont icon-quxiaoquanping_o'
      } else {
        this.fullScreenFont = 'iconfont icon-quanping_o'
      }
    },
    // 进入个人中心
    goPerson() {
      this.$router.push('/person/index')
    },
    // 退出账号
    exit() {
      window.sessionStorage.clear()
      this.$router.push('/')
      this.$message.success('退出账号成功')
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

.el-header {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #999;
  margin: 0 !important;
  padding: 0;
  .icon-daohangshouqi,
  .icon-daohangzhankai {
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    align-items: center;
    font-size: 25px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
  .header-right {
    margin-right: 15px;
    display: flex;
    align-items: center;
    .right-icon {
      .iconfont {
        font-size: 30px;
        margin-right: 10px;
      }
    }
  }
  ::v-deep .el-breadcrumb {
    position: absolute;
    left: 70px;
  }
}

::v-deep .el-dialog__header {
  text-align: center;
}

::v-deep .el-dialog {
  border-radius: 15px;
}

.logout {
  text-align: center;
  span {
    display: block;
    width: 150px;
    line-height: 30px;
    font-size: 15px;
    &:hover {
      color: #409eff;
      background-color: #e8f4ff;
    }
  }
}

.el-divider--horizontal {
  margin: 8px 0;
}
</style>
