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
  import Sectiontest from './components/Sectiontest'
  import SpecificReport from './components/SpecificReport'
  import CrudReport from './components/crudReport'



  export default {
    name: 'App',
    components: {
      Home,
      ManageProfile,
      MyReports,
      Sectiontest,
      SpecificReport,
      CrudReport,
      PageNotFound
    }
  }
</script>

<style type="text/css">
  footer{
    background:#ffffff;
    position:absolute;
    bottom:0;
    width:100%;
  }
</style>
