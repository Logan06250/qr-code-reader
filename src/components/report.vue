<template>
	<div style="padding-top: 45px">
		<h3>
			<a @click="eventEmitter(0)">  
				<i class="fas fa-angle-left"></i>
				{{ specificReport.name }}
			</a> 
		</h3>
		<div style="margin-top: 0px; margin-left: 10px">
			<button type="button" @click="addSection(specificReport)" class="btn btn-info" ><i class="far fa-edit"></i> Add a section</button>
		</div>
		<div class="alert alert-info alert-dismissible fade show" role="alert" id="infoDiv">
			<strong><a id="strongAlertText"></a></strong> <a id="alertText"> You can create sections using the button above this alert.</a>
		  <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="closeAlert()">
		    <span aria-hidden="true">&times;</span>
		  </button>
		</div>
		<div class="input-group" v-for="section in specificReport.sections" id="sectionDiv">
		  	<a class="form-control" @click="eventEmitter(section)"> {{ section.name }}  </a>
		  	<div class="input-group-append" id="button-addon4">
				<button  class="btn btn-danger" @click="deleteSection(section)"><i class="fas fa-trash-alt"></i></button>
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
	   		db.get(this.specificReport._id).then(function(doc) {
				if(doc.sections.length == 0){
					document.getElementById("strongAlertText").text = "You didn't have any section !"
		        	document.getElementById("alertText").text = "You can create one using the button above this alert."
				   	document.getElementById("infoDiv").style.display = "block"
				}
			}).catch(function (err) {
				  console.log(err);
			});
	  	},
	   	methods: {
	   		closeAlert: function () {
	    		document.getElementById("infoDiv").style.display = "none"

	    	},
	    	addSection: function (specificReport) {
	    		document.getElementById("infoDiv").style.display = "none"
	    		var newSectionName = prompt("Enter a name")
	    		var regexp = /[a-zA-Z0-9]+/

	    		try {
		           	var mrt = newSectionName.match(regexp).join()
		        }catch(error){
		        	console.log(error)
		        }
		        if(mrt == null){
		        	document.getElementById("strongAlertText").text = "Can't create this section."
		        	document.getElementById("alertText").text = "Name must contain a least one character."
		        	document.getElementById("infoDiv").style.display = "block"
		        } else {
		        	let section = { name: newSectionName, _id: new Date().toISOString(), info: {text: "", note: "", images: []}}
					db.get(specificReport._id).then(function(doc) {
						doc.sections.push(section)
						specificReport.sections.push(section)
					  	return db.put(doc);
					  	console.log("Section added")
					}).catch(function (err) {
					  	console.log(err);
					}).then( e => this.eventEmitter(section))
		        }
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
				if(this.specificReport.sections.length == 0){
					document.getElementById("strongAlertText").text = "You didn't have any section !"
		        	document.getElementById("alertText").text = "You can create one using the button above this alert."
					document.getElementById("infoDiv").style.display = "block"
				}
	    	},
	    	eventEmitter: function(section) {
	    		this.$emit("selected", section)
	    	}
	    }
	}
</script>

<style>

	#infoDiv {
		margin-top: 10px;
		display: none;
	}

	#sectionDiv {
		margin: 2%;
		margin-top: 4%; 
		width: 96%
	}
</style>