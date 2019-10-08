<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>

  import Home from './components/Home'
  import ManageProfile from './components/ManageProfile'
  import MyReports from './components/MyReports'
  import Report from './components/report'
  import Section from './components/section'
  import CrudReport from './components/crudReport'

  export default {
    name: 'App',
    components: {
      Home,
      ManageProfile,
      MyReports,
      Report,
      Section,
      CrudReport,
    }
  };
</script>

<style type="text/css">
  footer{
    background:#ffffff;
    position:absolute;
    bottom:0;
    width:100%;
  }
</style>
