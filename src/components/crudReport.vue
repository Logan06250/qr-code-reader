<template>
	<div>
		<h1> Report Manager </h1>
		<input id="textBoxNameReport" type="text" value="Enter a name"> </input>
		<button id="createNewReport" type="button" @click="addReport()" class="btn btn-primary" >Add new report</button>

		<div class="list-group" v-for="report in reports" :key="report._id">
			<button type="button" class="list-group-item list-group-item-action" @click="emitReport(report)"> 
				{{ report.name }} 
				<span class="badge badge-light" @click="deleteReport(report)">X</span>
			</button> 


		</div>

	</div>
</template>

<script>
	
	window.db = new PouchDB("reports")
	console.log("Local database created and imported")

	export default{
	    data(){
	        return{
		        reports:[
	        	]
	    	}
	    },
	    mounted:function(){
	    	this.onloadScript()
	    },
	    methods: {
	    	addReport: function () {
	    		var report = {
				    _id: new Date().toISOString(),
				    name: document.getElementById("textBoxNameReport").value,
				    sections: [
					    { name: "kitchen" , dimention: 5 , wall: 2 },
					    { name: "bedRoom" , dimention: 50 , wall: 20 },
					]
				}
				db.put(report).then((res) => {
				    console.log("Report inserted")
				    this.reports.push(report)
				}).catch((err) => {
				    console.error(err)
				})
	    	},
	    	deleteReport: function (report) {
				var del = this.reports.indexOf(report)
				db.get(report._id).then(function(doc){
					return db.remove(doc)

					console.log("Report deleted")
				}).catch((err) => {
					console.error(err)
				})
				this.reports.splice(del, 1)
	    	},
	    	onloadScript: function() {
	    		db.allDocs({ include_docs: true, descending: true }, (err, doc) => {
				    doc.rows.forEach(e => {
				        this.reports.push(e.doc)
				    });
				}).catch((err) => {
				    console.error(err)
				})
	    	},
	    	emitReport: function(report) {
	    		console.log(report)
	    		this.$emit("selected", report)
	    	}
	    }
	};
</script>


<style>

</style>