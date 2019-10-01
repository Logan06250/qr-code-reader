<template>
  <div id="app">

    <router-view/>
  </div>
</template>
<script>
import Home from './components/Home'
import ManageProfile from './components/ManageProfile'
import MyReports from './components/MyReports'
import PageNotFound from './components/PageNotFound'

export default {
  name: 'App',
  components: {
    Home,
    ManageProfile,
    MyReports,
    PageNotFound
  }
}
</script>
