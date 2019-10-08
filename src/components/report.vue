<template>
	<div>
		<h1>
			<a  @click="eventEmitter(0)"> <= 
				
				{{ specificReport.name }} report
			</a> 
		</h1>
		<input id="textBoxNameSection" type="text" value="Enter a name"> </input>
		<button type="button" @click="addSection(specificReport)" class="btn btn-outline-primary" >Add new section</button>
		<div class="container-fluid" v-for="section in specificReport.sections">
			<div class="row">
				<div class="col">
					<button type="button" class="btn" @click="eventEmitter(section)">
						{{ section.name }} 
					</button>
				</div>
				<div class="col">
					<button class="btn btn-danger" @click="deleteSection(section)">X</button>
				</div>
			</div>
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
	    		let section = { name: document.getElementById("textBoxNameSection").value, _id: new Date().toISOString(), info: {text: "", note: "", images: []}}
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
	    	eventEmitter: function(section) {
	    		this.$emit("selected", section)
	    	}
	    }
	}
</script>

<style>
</style>