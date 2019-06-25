import Vue from 'vue'
import Router from 'vue-router'
import Merchant from '@/components/MerchantBoss/MerchantType'


import types from '@/components/MerchantBoss/TypeMappas'
import MerchantGoods  from '../components/GoodsBoss/GoodsMappas'
import MerchantOrder  from '../components/OrderBoss/OrderMappas'
import login from '@/components/Login'
import register from '@/components/register'
import Users from '../components/UserBoss/UserMappas'




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Merchant',
      component: Merchant
    },
    {
      path: '/types',
      name: 'types',
      component: types
    },
    {
      path: '/goods',
      name: 'MerchantGoods',
      component: MerchantGoods
    },
    {
      path: '/order',
      name: 'MerchantOrder',
      component: MerchantOrder
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    }
  ]
})
