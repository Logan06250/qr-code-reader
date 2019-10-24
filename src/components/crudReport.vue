<template>
	<div style="padding-top: 50px">
		<div style="margin-top: 0px; margin-left: 10px">
			<button type="button" @click="addReport()" class="btn btn-info" > <i class="far fa-edit"></i> Add a report </button>
		</div>
		<div class="alert alert-warning alert-dismissible fade show" role="alert" id="alertDiv">
		  <strong>PDF can't be generated !</strong> <a id="alertText"> </a>
		  <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="closeAlert()">
		    <span aria-hidden="true">&times;</span>
		  </button>
		</div>
		<div class="alert alert-info alert-dismissible fade show" role="alert" id="infoDiv">
		  <strong> <a id="strongAlertText"> </a></strong> <a id="infoText"></a>
		  <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="closeAlert()">
		    <span aria-hidden="true">&times;</span>
		  </button>
		</div>
		<div id="reportDiv" class="input-group" v-for="report in reports" :key="report._id">
		  	<a class="form-control" @click="emitReport(report)"> {{ report.name }} </a>
		  	<div class="input-group-append" id="button-addon4">
		  		<button  class="btn btn-outline-info " @click="emitReportForProperty(report)">Property</button>
		  		<button  class="btn btn-outline-info " @click="pdfGenerator(report)">Get PDF</button>
				<button  class="btn btn-danger" @click="deleteReport(report)"><i class="fas fa-trash-alt"></i></button>
		  	</div>
		</div>
	</div>
</template>

<script>
	import { Slide } from 'vue-burger-menu'
	
	var db = new PouchDB("reports")
	var remoteDb = new PouchDB("http://localhost:5984/reports")
	var dbUser = new PouchDB("User")
	console.log("Local database created and imported")

	export default{
	    data(){
	        return{
		        reports:[
	        	],
	        	user: []
	    	}
	    },
	    mounted:function(){
	    	this.onloadScript()
	    },
	    methods: {
	    	closeAlert: function () {
	    		document.getElementById("alertDiv").style.display = "none"
	    		document.getElementById("infoDiv").style.display = "none"
	    	},
	    	addReport: function () {
	    		document.getElementById("infoDiv").style.display = "none"
	    		var newReportName = prompt("Enter a name")

	    		var regexp = /[a-zA-Z0-9]+/

	    		try {
		           	var mrt = newReportName.match(regexp).join()
		        }catch(error){
		        	console.log(error)
		        }
		        if(mrt == null){
		        	document.getElementById("strongAlertText").text = "Can't create this report."
		        	document.getElementById("infoText").text = "Name must contain a least one character."
		        	document.getElementById("infoDiv").style.display = "block"
		        } else {
		        	var report = {
					    _id: new Date().toISOString(),
					    name: newReportName,
					    sections: [
						],
						property: [
						],
					}
					db.put(report).then((res) => {
					    console.log("Report inserted")
					    this.reports.push(report)
					}).catch((err) => {
					    console.error(err)
					}).then( e => this.emitReport(report))
		        }
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
				if(this.reports.length == 0){
		        	document.getElementById("strongAlertText").text = "You didn't have any report !"
		        	document.getElementById("infoText").text = "You can create one using the button above this alert."
					document.getElementById("infoDiv").style.display = "block"
				}
	    	},
	    	onloadScript: function() {
	    		db.allDocs({ include_docs: true, descending: true }, (err, doc) => {
				    doc.rows.forEach(e => {
				        this.reports.push(e.doc)
				    });
				    if(doc.rows.length == 0){
			        	document.getElementById("strongAlertText").text = "You didn't have any report !"
			        	document.getElementById("infoText").text = "You can create one using the button above this alert."
				    	document.getElementById("infoDiv").style.display = "block"
				    }
				}).catch((err) => {
				    console.error(err)
				})

				var tempUser = this.user
				dbUser.get("123456789").then(function(doc){
					tempUser.push(doc)
					console.log(doc)
					console.log("User imported")
				}).catch((err) => {
					console.error(err)
				})
				
				db.sync(remoteDb, {
					live: true,
					retry: true
				}).on('change', function (change) {
				}).on('paused', function (info) {
				}).on('active', function (info) {
				}).on('error', function (err) {
				});
			},
	    	emitReport: function(report) {
	    		this.$emit("selected", [1, report])
	    	},
	    	emitReportForProperty: function(report) {
	    		this.$emit("selected", [2, report])
	    	},
	    	pdfGenerator: function(report){

	    		if(this.user[0] == undefined){
	    			document.getElementById("alertText").text = "You should fill informations about your profile before."
	    			document.getElementById("alertDiv").style.display = "block"
	    		}else if(report.property.length == 0){
	    			console.log("yo")
	    			document.getElementById("alertText").text = "You should fill informations about the property before."
	    			document.getElementById("alertDiv").style.display = "block"
	    		} else {

	    			var doc = new jsPDF()
		    		var cptLine = 5
		    		var interline = 5

		    		var currUser = this.user[0]

		    		doc.setPage(1) 	// First page

		    		doc.setTextColor(47,79,79)
		    		doc.setFillColor(31,31,20)
		    		doc.setFontSize(10)
		    		doc.text("Property adress", 75, 163)
		    		doc.text(report.property.propertyAdress, 110, 164)
					doc.rect(105, 160, 95, 60)
					doc.text("Client's name", 80, 228)
					doc.text(report.property.clientName, 110, 229)
					doc.rect(105, 225, 95, 10)
					doc.text("Date of inspection", 72, 243)
					doc.text(report.property.dateOfInspection, 110, 244)
					doc.rect(105, 240, 95, 10)

					doc.setFontSize(40);
					doc.setFontType("bold");

					doc.text("Inspector Gadget", 20,80)
					doc.setTextColor(192,192,192)
					doc.text("Report", 142,80)

	            	doc.addPage() 	// Second page Content

					doc.setFontType("bold")
					doc.setDrawColor(192,192,192)
					doc.setLineWidth(1.5)
					doc.line(40, 35, 200, 35)
					doc.setFontSize(30)
					doc.setTextColor(47,79,79)
	            	doc.text("Content", 40, 30)

	            	doc.setFontType("normal")

	            	doc.setFontSize(15)
	            	doc.text("Introduction to the report", 40, 60)
	            	doc.text("About the inspection", 40, 70)
	            	doc.text("About the property", 40, 80)

	            	doc.setTextColor(192,192,192)
					doc.text("A", 30, 60)
					doc.text("B", 30, 70)
					doc.text("C", 30, 80)

	            	var sectionLine = 1
	            	var letters = ["D", "E", "F", "G", "H", "I", "J", "K", "L"]

	            	report.sections.map(function (section){
	            		doc.setTextColor(47,79,79)
		    			doc.text(section.name, 40, 80 + (10 * sectionLine))
		    			doc.setTextColor(192,192,192)
						doc.text(letters[sectionLine - 1], 30, 80 + (10 * sectionLine))
		    			sectionLine++
		    		})

	            	doc.addPage() 	// Third page Introduction

	            	doc.setFontType("bold")
					doc.setDrawColor(192,192,192)
					doc.setLineWidth(1.5)
					doc.line(40, 35, 200, 35)
					doc.setFontSize(30)
					doc.setTextColor(47,79,79)
	            	doc.text("Introduction to the report", 40, 30)
	            	doc.setTextColor(192,192,192)
	            	doc.setFontSize(50)
					doc.text( "A", 15, 33)

					doc.setTextColor(47,79,79)
					doc.setFontSize(12)

					var splitText = doc.splitTextToSize("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 140)

					doc.text(splitText, 40, 60)

	            	doc.addPage()  // Fourth about the inspection

	            	doc.setFontType("bold")
					doc.setDrawColor(192,192,192)
					doc.setLineWidth(1.5)
					doc.line(40, 35, 200, 35)
					doc.setFontSize(30)
					doc.setTextColor(47,79,79)
	            	doc.text("About the inspection", 40, 30)
	            	doc.setTextColor(192,192,192)
	            	doc.setFontSize(50)
					doc.text( "B", 15, 33)

					doc.setFontSize(12)

					doc.setLineWidth(0.7)
					doc.rect(60, 60, 138, 7)
					doc.rect(60, 73, 138, 7)
					doc.rect(60, 86, 138, 7)
					doc.rect(60, 99, 138, 7)
					doc.rect(60, 112, 138, 7)
					doc.rect(60, 125, 138, 7)
					doc.rect(60, 138, 138, 7)

					doc.setTextColor(47,79,79)
					doc.text( "Firstname ", 20, 65)
					doc.text( "Lastname ", 20, 78)
					doc.text( "Email ", 20, 91)
					doc.text( "Company Name ", 20, 104)
					doc.text( "Company Email ", 20, 117)
					doc.text( "Adress ", 20, 130)
					doc.text( "Phone ", 20, 143)

					doc.setTextColor(0,0,0)
					doc.text( currUser.firstName, 65, 65)
					doc.text( currUser.lastName, 65, 78)
					doc.text( currUser.yourEmail, 65, 91)
					doc.text( currUser.companyName, 65, 104)
					doc.text( currUser.emailCompany, 65, 117)
					doc.text( currUser.address, 65, 130)
					doc.text( currUser.phone, 65, 143)

					doc.addPage()  // Fifth about the property

	            	doc.setFontType("bold")
					doc.setDrawColor(192,192,192)
					doc.setLineWidth(1.5)
					doc.line(40, 35, 200, 35)
					doc.setFontSize(30)
					doc.setTextColor(47,79,79)
	            	doc.text("About the property", 40, 30)
	            	doc.setTextColor(192,192,192)
	            	doc.setFontSize(50)
					doc.text( "C", 15, 33)

					doc.setFontSize(12)

					doc.setLineWidth(0.7)
					doc.rect(60, 60, 138, 7)
					doc.rect(90, 73, 108, 7)
					doc.rect(90, 86, 108, 7)
					doc.rect(90, 99, 108, 7)
					doc.rect(90, 122, 108, 27)

					doc.setTextColor(47,79,79)
					doc.text( "Type of property ", 20, 65)
					doc.text( "Year the property was built ", 20, 78)
					doc.text( "Year the property was extended ", 20, 91)
					doc.text( "Year the property was converted ", 20, 104)
					doc.text( "Information about flats", 20, 127)

					doc.setTextColor(0,0,0)
					doc.text(report.property.typeOfProperty, 65, 65)
					doc.text(report.property.YearThePropertyWasBuilt, 95, 78)
					doc.text(report.property.YearThePropertyWasExtended, 95, 91)
					doc.text(report.property.YearThePropertyWasConverted, 95, 104)
					doc.text(report.property.InformationAboutFlat, 95, 127)

					sectionLine = 1
					report.sections.map(function (section){
	            		doc.addPage()

	            		doc.setFontType("bold")
						doc.setDrawColor(192,192,192)
						doc.setLineWidth(1.5)
						doc.line(40, 35, 200, 35)
						doc.setFontSize(30)
						doc.setTextColor(47,79,79)
		            	doc.text(section.name, 40, 30)
		            	doc.setTextColor(192,192,192)
		            	doc.setFontSize(50)
						doc.text( letters[sectionLine - 1] , 15, 33)

						doc.setFontSize(20)
						doc.setTextColor(47,79,79)
						doc.setFontType("bold")
						doc.text("Informations taken", 40, 50)
						var currLine = 65

						doc.setTextColor(0,0,0)
						doc.setFontSize(12)
						doc.setFontType("normal")
						splitText = doc.splitTextToSize(section.info.text, 140)
						currLine += (splitText.length * 4) + 10
						doc.text(splitText, 40, 65)

						if(isEnoughtLine(currLine)){ 
		    					doc.addPage()
		    					doc.setFontType("bold")
								doc.setDrawColor(192,192,192)
								doc.setLineWidth(1.5)
								doc.line(40, 35, 200, 35)
								doc.setFontSize(30)
								doc.setTextColor(47,79,79)
				            	doc.text(section.name, 40, 30)
				            	doc.setTextColor(192,192,192)
				            	doc.setFontSize(50)
								doc.text( letters[sectionLine - 1] , 15, 33)
								doc.setFontSize(20)
								doc.setTextColor(47,79,79)
								doc.setFontType("bold")
								currLine = 45
		    			}

						doc.setFontSize(20)
						doc.setTextColor(47,79,79)
						doc.setFontType("bold")
						doc.text("Photos", 40, currLine)
						currLine += 15

						section.info.images.map(function (image) {
		    				if(isEnoughtLine(76 + currLine)){ 
		    					doc.addPage()
		    					doc.setFontType("bold")
								doc.setDrawColor(192,192,192)
								doc.setLineWidth(1.5)
								doc.line(40, 35, 200, 35)
								doc.setFontSize(30)
								doc.setTextColor(47,79,79)
				            	doc.text(section.name, 40, 30)
				            	doc.setTextColor(192,192,192)
				            	doc.setFontSize(50)
								doc.text( letters[sectionLine - 1] , 15, 33)
								doc.setFontSize(20)
								doc.setTextColor(47,79,79)
								doc.setFontType("bold")
								currLine = 45
		    				}
		    				doc.addImage(image.src,"jpeg", 40, currLine, 70, 70)

		    				doc.setTextColor(47,79,79)
							doc.setFontSize(10)

							splitText = doc.splitTextToSize(image.text, 75)

							doc.text(splitText, 120, currLine)
							if(splitText.length * 4 > 76) {
								currLine += splitText.length * 5
							} else {
								currLine += 76
							}
		    			})
						splitText = doc.splitTextToSize(section.info.summary, 230)

		    			if(isEnoughtLine(currLine + 35 + (splitText.length * 5))){ 
		    					doc.addPage()
		    					doc.setFontType("bold")
								doc.setDrawColor(192,192,192)
								doc.setLineWidth(1.5)
								doc.line(40, 35, 200, 35)
								doc.setFontSize(30)
								doc.setTextColor(47,79,79)
				            	doc.text(section.name, 40, 30)
				            	doc.setTextColor(192,192,192)
				            	doc.setFontSize(50)
								doc.text( letters[sectionLine - 1] , 15, 33)
								doc.setFontSize(20)
								doc.setTextColor(47,79,79)
								doc.setFontType("bold")
								currLine = 45
		    			}

		    			currLine += 10
						doc.setFontSize(20)
						doc.setTextColor(47,79,79)
						doc.setFontType("bold")
						doc.text("Summary", 40, currLine)
						currLine += 15

						doc.setTextColor(0,0,0)
						doc.setFontSize(12)
						doc.setFontType("normal")
						doc.text(splitText, 40, currLine)
		    			sectionLine++
		    		})
		    		var pdfBase64 = doc.output('datauristring');
		    		
		    		Email.send({
					    Host : "smtp.elasticemail.com",
					    Username : "logan.lamouar@viacesi.fr",
					    Password : "fd94ff19-229b-49bd-afcf-c9649c2f2f87",
					    To : 'logan.lamouar@viacesi.fr',
					    From : "logan.lamouar@viacesi.fr",
					    Subject : "Mail with Attachments",
					    Body : "Mail with Attachments",
					    Attachments : [
						{
							name : "InspectorGadget.pdf",
							data : pdfBase64
						}]
					}).then(function (message) {
						if(message == "OK") {
							alert("We successfully sended your PDF !")
						} else {
							console.log(message)
							alert("There was a problem during mail sending. Please be sure to connect your device to internet ?")
						}
					});

					function isEnoughtLine(line){ 
						return ((line) >= doc.internal.pageSize.height)
					}

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

#alertDiv, #infoDiv {
	margin-top: 10px;
	display: none;
}

#reportDiv {
	margin: 2%;
	margin-top: 4%; 
	width: 96%
}
</style>