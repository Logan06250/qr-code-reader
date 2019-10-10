<template>
	<div style="padding-top: 14%">
		<div style="margin-top: 0px; margin-left: 10px">
			<button type="button" @click="addReport()" class="btn btn-info" >Add a report</button>
		</div>

		<div class="container-fluid" v-for="report in reports" :key="report._id" style="margin-top: 3px">
			<div class="row">
    			<div class="col">
					<button type="button" class="btn" @click="emitReport(report)">{{ report.name }} </button>
				</div>
				<div class="col">
					<button  class="btn btn-circle btn-danger" @click="deleteReport(report)" style="margin-right: 10px; width: 45px;
    height: 45px; font-size: 15px;">X</button>
					<button  class="btn btn-circle" @click="pdfGenerator()" style="background-color: #2F4558; color: #FFF; width: 45px;
    height: 45px; font-size: 15px;">PDF</button>
				</div>
			</div>
			<br>
		</div>

	</div>
</template>

<script>
	import { Slide } from 'vue-burger-menu'
	
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
	    		var nexReportName = prompt("Enter a name")
	    		var report = {
				    _id: new Date().toISOString(),
				    name: nexReportName,
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
.btn-circle.btn-xl {
    width: 70px;
    height: 70px;
    padding: 10px 16px;
    border-radius: 35px;
    font-size: 24px;
    line-height: 1.33;
}
</style>