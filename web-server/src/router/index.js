import Vue from 'vue'
import Router from 'vue-router'
import mainContent from '@/components/mainContent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainContent',
      component: mainContent
    }
  ]
})
