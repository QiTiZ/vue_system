import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/product/list',
        component: () => import('../views/goods/list.vue')
      },
      {
        path: '/product/category',
        component: () => import('../views/goods/category.vue')
      },
      {
        path: '/product/brand',
        component: () => import('../views/goods/brand.vue')
      },
      {
        path: '/order/list',
        component: () => import('../views/order/list.vue')
      },
      {
        path: '/order/back',
        component: () => import('../views/order/back.vue')
      },
      {
        path: '/order/address',
        component: () => import('../views/order/address.vue')
      },
      {
        path: '/user/list',
        component: () => import('../views/user/list.vue')
      },
      {
        path: '/market/list',
        component: () => import('../views/market/list.vue')
      },
      {
        path: '/market/advertisement',
        component: () => import('../views/market/advertisement.vue')
      },
      {
        path: '/content/articleList',
        component: () => import('../views/content/articleList.vue')
      },
      {
        path: '/content/materialList',
        component: () => import('../views/content/materialList.vue')
      },
      {
        path: '/person/index',
        component: () => import('../views/person/index.vue')
      },
      {
        path: '/person/setting',
        component: () => import('../views/person/setting.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 解决 Avoided redundant navigation to current location
// 保存下来push方法 将来我们还会用到原push方法进行路由跳转
const originPush = VueRouter.prototype.push

// 接下来我们重写push|replace方法
// 第一个参数location参数像原push方法声明跳转的地方 resolve和reject传递成功与失败

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    // 如果成功 调用原来的push方法
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

// 全局路由导航守卫
router.beforeEach((to, form, next) => {
  if (to.path === '/') return next()

  // 获取token
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('/')
  next()
})

export default router
