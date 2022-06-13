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
        path: '/welcome',
        component: () => import('../views/Welcome.vue')
      },
      {
        path: '/product/list',
        meta: { title: '商品列表' },
        component: () => import('../views/goods/list.vue')
      },
      {
        path: '/product/category',
        meta: { title: '商品分类' },
        component: () => import('../views/goods/category.vue')
      },
      {
        path: '/product/brand',
        meta: { title: '品牌管理' },
        component: () => import('../views/goods/brand.vue')
      },
      {
        path: '/order/list',
        meta: { title: '订单列表' },
        component: () => import('../views/order/list.vue')
      },
      {
        path: '/order/back',
        meta: { title: '退单列表' },
        component: () => import('../views/order/back.vue')
      },
      {
        path: '/order/address',
        meta: { title: '地址管理' },
        component: () => import('../views/order/address.vue')
      },
      {
        path: '/user/list',
        meta: { title: '用户列表' },
        component: () => import('../views/user/list.vue')
      },
      {
        path: '/market/list',
        meta: { title: '限时活动' },
        component: () => import('../views/market/list.vue')
      },
      {
        path: '/market/advertisement',
        meta: { title: '广告列表' },
        component: () => import('../views/market/advertisement.vue')
      },
      {
        path: '/content/articleList',
        meta: { title: '文章列表' },
        component: () => import('../views/content/articleList.vue')
      },
      {
        path: '/content/materialList',
        meta: { title: '素材列表' },
        component: () => import('../views/content/materialList.vue')
      },
      {
        path: '/person/index',
        meta: { title: '个人主页' },
        component: () => import('../views/person/index.vue')
      },
      {
        path: '/person/setting',
        meta: { title: '个人设置' },
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
