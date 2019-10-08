<template>
	<div>
		<h1> Report Manager </h1>
		<input id="textBoxNameReport" type="text" placeholder="Enter a name"> </input>
		<button type="button" @click="addReport()" class="btn btn-outline-primary" >Add new report</button>

		<div class="container-fluid" v-for="report in reports" :key="report._id">
			<div class="row">
    			<div class="col">
					<button type="button" class="btn" @click="emitReport(report)">{{ report.name }} </button>
				</div>
				<div class="col">
					<button  class="btn btn-danger" @click="deleteReport(report)">X</button>
					<button  class="btn btn-primary" @click="pdfGenerator(report)">Gen Raport</button>
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
	    	pdfGenerator: function(report){
	    		var doc = new jsPDF()
	    		var cptLine = 5
	    		var interline = 5

	    		doc.setPage(1)
	    		doc.text(report.name, 5, cptLine)
	    		cptLine += interline
	    		report.sections.map(function (section){
	    			cptLine += interline
	    			if(isEnoughtLine(linesInText(section.name) * interline)){ doc.addPage(), cptLine = 5 }
	    			putInPdfText(section.name, 10)
	    			cptLine+= interline
	    			if(isEnoughtLine(linesInText(section.info.text) * interline)){ doc.addPage(), cptLine = 5 }
	    			putInPdfText(section.info.text, 15)
	    			cptLine+= interline
	    			if(isEnoughtLine(linesInText(section.info.note) * interline)){ doc.addPage(), cptLine = 5 }
	    			putInPdfText(section.info.note, 15)
	    			section.info.images.map(function (image) {
	    				if(isEnoughtLine(53)){ doc.addPage(), cptLine = 5 }
	    				doc.addImage('data:image/jpeg;base64,'+ image,"jpeg",15, cptLine, 50, 50)
	    				cptLine += 53
	    			})
	    		})
				doc.save(report.name)

				function isEnoughtLine(line){ return ((line + cptLine) >= doc.internal.pageSize.height)}

				function linesInText(text){
					var linesInText = Math.ceil(text.length / doc.internal.pageSize.width)
					return linesInText
				}
				
				function putInPdfText(text, leftPadding){
					while(text.length > doc.internal.pageSize.width / 3){
						doc.text(text.substring(0,doc.internal.pageSize.width / 3), leftPadding, cptLine)
						cptLine += interline
						text = text.substring(doc.internal.pageSize.width / 3, text.length)
					}
					doc.text(text, 15, cptLine)
					cptLine += interline
				}
	    	}
	    }
	};
</script>


<style>

</style>