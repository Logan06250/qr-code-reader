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
					<button  class="btn btn-circle" @click="pdfGenerator(report)" style="background-color: #2F4558; color: #FFF; width: 45px;
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
	    				doc.addImage(image,"jpeg",15, cptLine, 50, 50)
	    				cptLine += 53
	    			})
	    		})
	    		//doc.output('dataurl')
				//doc.save(report.name)

				var string = doc.output('datauristring');
				var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>"
				var x = window.open();
				x.document.open();
				x.document.write(iframe);
				x.document.close();

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
.btn-circle.btn-xl {
    width: 70px;
    height: 70px;
    padding: 10px 16px;
    border-radius: 35px;
    font-size: 24px;
    line-height: 1.33;
}
</style>