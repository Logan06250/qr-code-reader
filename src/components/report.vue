<template>
	<div>
		
		<h1> <a class="list-group-item list-group-item-action" @click="goBack(0)"> <= {{ specificReport.name }} report</a> </h1>
		<input id="textBoxNameSection" type="text" value="Enter a name"> </input>
		<button id="createNewSection" type="button" @click="addSection(specificReport)" class="btn btn-primary" >Add new section</button>

		<div class="list-group" v-for="section in specificReport.sections">
			<button type="button" class="list-group-item list-group-item-action">
				{{ section.name }} 
				<span class="badge badge-light" @click="deleteSection(section)">X</span>
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
	    		let section = { name: document.getElementById("textBoxNameSection").value, _id: new Date().toISOString()}
				db.get(specificReport._id).then(function(doc) {
					doc.sections.push(section)
					specificReport.sections.push(section)
				  	return db.put(doc);
				  	console.log("Section added")
				}).catch(function (err) {
				  console.log(err);
				});
	    	},
	    	deleteSection: function (section) {
				db.get(this.specificReport._id).then(function(doc){
					doc.sections = doc.sections.filter((value, index) => value._id != section._id)
					return db.put(doc)
					console.log("Section deleted")
				}).catch((err) => {
					console.error(err)
				})
				this.specificReport.sections = this.specificReport.sections.filter((value, index) => value._id != section._id)
	    	},
	    	goBack: function(report) {
	    		this.$emit("selected", report)
	    	}
	    }
	}
</script>

<style>
</style>