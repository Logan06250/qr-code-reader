<template>
  <div id="app">
    <router-view/>
    <footer>
      <center>
        <div class="container-fluid">
          <form>
              <input type="button" class="btn btn-primary" value="<-" onclick="window.location.href= '#/'">
              <button type="button" class="btn btn-primary" onclick="window.location.href= '#/ManageProfile'" >Manage Profile</button>
              <button type="button" class="btn btn-primary" onclick="window.location.href= '#/MyReports'" >My Reports</button>
              <button type="button" class="btn btn-primary" onclick="window.location.href= '#/Sectiontest'" >Szectiontest</button>
          </form>
        </div>
      </center>
    </footer>
  </div>
</template>
<script>
  import Home from './components/Home'
  import ManageProfile from './components/ManageProfile'
  import MyReports from './components/MyReports'
  import PageNotFound from './components/PageNotFound'
  import Report from './components/Report'
  import Sectiontest from './components/Sectiontest'


  export default {
    name: 'App',
    components: {
      Home,
      ManageProfile,
      MyReports,
      Report,
      Sectiontest,
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
