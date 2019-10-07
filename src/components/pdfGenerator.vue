<template>
<div>
	<center>
		<h1>Generate a PDF with Hello world inside</h1>
		<button class="btn btn-danger" @click="Generate">try me if you dare</button>
 	</center>
 </div>
</template>
<script>
export default{
	methods :{
		Generate (){
			var doc = new jsPDF()
			var companyName = "CompanyName"
			doc.text("CompanyName", 10, 10)
			doc.save('I Love You.pdf')
		}
	}
};
</script>
<style>

</style>
