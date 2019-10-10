<template>
	<center>
		<div class="container-fluid">
			<h1>Inspector Gadget</h1>
			<br>
			<img src= "../assets/logo.png" class="img-fluid">
			<br>
			<br>
		</div>
		<div class="container-fluid">
          <form>
              <button type="button" class="btn btn-info btn-circle fas fa-user" onclick="window.location.href= '#/ManageProfile'" style="margin-right: 20px"></button>
              <button type="button" class="btn btn-info btn-circle fa fa-list" onclick="window.location.href= '#/MyReports'" ></button>
          </form>
        </div>
	</center>


</template>
<script LANGUAGE="JavaScript">

</script>
<style>

.btn-circle.btn-xl {
    width: 70px;
    height: 70px;
    padding: 10px 16px;
    border-radius: 35px;
    font-size: 24px;
    line-height: 1.33;
}

.btn-circle {
    width: 110px;
    height: 110px;
    padding: 6px 0px;
    border-radius: 50%;
    text-align: center;
    font-size: 12px;
    line-height: 1.42857;
    font-size: 50px;
}

</style>
