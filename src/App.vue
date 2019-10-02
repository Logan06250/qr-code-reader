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
import Report from './components/Report'

export default {
  name: 'App',
  components: {
    Home,
    ManageProfile,
    MyReports,
    Report,
    PageNotFound
  }
}
</script>
