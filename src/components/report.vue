<template>
	<div>
		<h1> {{ specificReport.name }} report</h1>
		<input id="textBoxNameSection" type="text" value="Enter a name"> </input>
		<button id="createNewSection" type="button" @click="addSection(specificReport)" class="btn btn-primary" >Add new section</button>

		<div class="list-group" v-for="section in specificReport.sections">
			<button type="button" class="list-group-item list-group-item-action">
				{{ section.name }} 
				<span class="badge badge-light" @click="deleteReport(report)">X</span>
			</button> 
		</div>

	</div>
</template>

<script>
	window.db = new PouchDB("reports")
	console.log("Local database created")

	export default {
	   props: ['specificReport'],
	   data() {
	   		return {
	   		}
	   },
	   mounted:function(){
	   },
	   methods: {
	    	addSection: function (specificReport) {
				db.get(specificReport._id).then(function(doc) {
					doc.sections.push({ name: "kitchen2"})
				  	return db.put(doc);
				}).then(function(response) {
				  console.log(response)
				}).catch(function (err) {
				  console.log(err);
				});
	    	}
	    }
	}
</script>

<style>
</style>