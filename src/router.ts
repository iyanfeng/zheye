import { createRouter, createWebHistory } from 'vue-router'
import store from './store'
// import { useStore } from 'vuex'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Column from './views/ColumnDetail.vue'
import CreatePosts from './views/CreatePost.vue'
const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home
  },
  {
    path: '/login',
    component: Login,
    name: 'login',
    meta: {
      redirect: true
    }
  },
  {
    name: 'Column',
    path: '/column/:id',
    component: Column
  },
  {
    name: 'CreatePosts',
    path: '/creat',
    component: CreatePosts,
    meta: {
      requiresAuth: true
    }
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.isLogin) {
    next({ path: '/login' })
  } else if (to.meta.redirect && store.state.user.isLogin) {
    next({ path: '/' })
  } else {
    next()
  }
})
export default router
