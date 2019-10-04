import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ManageProfile from '@/components/ManageProfile'
import MyReports from '@/components/MyReports'
import Sectiontest from '@/components/Sectiontest'
import PageNotFound from '@/components/PageNotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/ManageProfile',
      name: 'ManageProfile',
      component: ManageProfile
    },
    {
      path: '/MyReports',
      name: 'MyReports',
      component: MyReports
    },
    {
      path: '/Sectiontest',
      name: 'Sectiontest',
      component: Sectiontest
    },
    {
      path: '**',
      name: 'PageNotFound',
      component: PageNotFound
    }
    
    
  ]
})
