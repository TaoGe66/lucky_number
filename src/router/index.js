import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'

Vue.use(Router)

export default new Router({
  routes: [
  	{
  		path: '/',
      redirect:'index',
  	},
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/cart',
      component: resolve => require(['@/pages/cart-number.vue'], resolve)
    },
    // {
    //   path: '/phone',
    //   component: resolve => require(['@/pages/phone-number.vue'], resolve)
    // },
    {
      path: '/card',
      component: resolve => require(['@/pages/card-number.vue'], resolve)
    },
    // {
    //   path: '/birthday',
    //   component: resolve => require(['@/pages/birthday-number.vue'], resolve)
    // },
    // {
    //   path: '/marry',
    //   component: resolve => require(['@/pages/marry-number.vue'], resolve)
    // },
  ]
})
