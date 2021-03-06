import { createRouter, createWebHistory } from 'vue-router'

import ListsView from '../views/ListsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:'lists',
      component: ListsView
    },
    {
      path: '/:collection',
      name:'ListViews',
      component: ()=> import('../views/TasksView.vue')
    }
  ]
})

export default router
