<template>
  <div id="app">
    <div id="content">
      <router-view/>
    </div>
  </div>
</template>
<script>

  import Home from './components/Home'
  import ManageProfile from './components/ManageProfile'
  import MyReports from './components/MyReports'
  import Report from './components/report'
  import Section from './components/section'
  import CrudReport from './components/crudReport'
  import { Slide } from 'vue-burger-menu'
  import { createWorker } from 'tesseract.js';


  export default {
    name: 'App',
    components: {
      Home,
      ManageProfile,
      MyReports,
      Report,
      Section,
      CrudReport,
      Slide,
      createWorker
    },
    methods: {
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
  #content{
    margin-top: 20px;
  }
</style>
