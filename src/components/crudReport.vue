<template>
	<div>
		<h1> Report Manager </h1>
		<input id="textBoxNameReport" type="text" placeholder="Enter a Name"> </input>
		<button type="button" @click="addReport()" class="btn btn-outline-primary" >Add new report</button>

		<div class="container-fluid" v-for="report in reports" :key="report._id">
			<div class="row">
    			<div class="col">
					<button type="button" class="btn" @click="emitReport(report)">{{ report.name }} </button>
				</div>
				<div class="col">
					<button  class="btn btn-danger" @click="deleteReport(report)">X</button>
					<button  class="btn btn-primary" @click="pdfGenerator()">Gen Raport</button>
				</div>
			</div>
			<br>
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
	    		this.$emit("selected", report)
	    	},
	    	pdfGenerator: function(){
	    		var doc = new jsPDF()
				var companyName = "this is the text"
				doc.text(companyName, 10, 10)
				doc.save('I Love You.pdf')
	    	}
	    }
	};
</script>


<style>

</style>