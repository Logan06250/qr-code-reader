<template>
	<div>
		<input id="textBoxNameReport" type="text" value="Enter a name"> </input>
		<button id="createNewReport" type="button" @click="addReport()" class="btn btn-primary" >Add new report</button>

		<div class="list-group" v-for="report in reports" :key="report.id">
			<button type="button" class="list-group-item list-group-item-action"> 
				{{ report.name }} 
				<span class="badge badge-light" @click="deleteReport(report)">X</span>
			</button>


		</div>

	</div>
</template>

<script>
	
	window.db = new PouchDB("reports")
	console.log("Local database created")

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
				    name: document.getElementById("textBoxNameReport").value
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
	    	}
	    }
	};
</script>


<style>

</style>