<template>
<div>
<h1>LOL</h1>
	<button id="try">try</button>
 </div>
</template>
<script type="javascript">
document.addEventListener('DOMContentLoaded', function() { 
document.getElementById("try").addEventListener("click", function() {
	var doc = new jsPDF()
	doc.text('Hello world!', 10, 10)
	doc.save('a4.pdf')
	});
});
</script>
<style>


</style>
