import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index'
import NovelDetails from '../components/NovelDetails.vue'
import Author from '../components/Author'
import UploadNovel from '../components/UploadNovel'
import Read from '../components/Read'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/novel-details/:novel_slug',
    name: 'NovelDetails',
    component: NovelDetails
  },
  {
    path: '/author/:author_slug',
    name: 'Author',
    component: Author
  },
  {
    path: '/upload-novel',
    name: 'UploadNovel',
    component: UploadNovel
  },
  {
    path: '/read/:novel_slug',
    name: 'Read',
    component: Read
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
