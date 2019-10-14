<template>
	<div style="padding-top: 10%">
		<h3>
			<a  @click="eventEmitter(1)">  
				<i class="fas fa-angle-left"></i>
				{{ specificReport.name }}
			</a>
			<a  @click="eventEmitter(0)">  
				<i class="fas fa-angle-left"></i>
				{{ specificSection.name }}
			</a>  
		</h3>
		<label >Text:</label>
		<span id="save" @click="startDictation('SpeachToText')" class="btn btn-circle btn-danger fas fa-microphone " style="width: 35px;
    height: 35px; font-size: 15px; margin: 10px;" ></span>
     	<input type="text" class="form-control" id="SpeachToText" placeholder="Enter your text here"  style="word-break: break-word">
     	<br>
     	<video ref="video" id="video" width="300" height="300" autoplay></video>
     	<center>
     		<input class="inputfile" name="files" id="files" type="file" accept=".heic, .hevc, .heif, .pdf, .png, .gif, .jpg, .jpeg, .doc, .docx, application/msword, application/pdf" multiple @change="handleFileSelect()" capture>
     		<label id="snap" class="btn btn-circle btn-info" style="width: 80px;
    height: 80px; font-size: 20px; margin: 10px; margin-top: -10px" for="files"> Add Photo</label>
     	</center>
     	<canvas id="canvas" width="100" height="100"></canvas>

     	<br>
		<label >Note:</label>
		<span id="save" @click="startDictation('NoteImput')" class="btn btn-circle btn-danger fas fa-microphone " style="width: 35px;
    height: 35px; font-size: 15px; margin: 10px;" ></span>
     	<input type="text" class="form-control" id="NoteImput" placeholder="Enter your note here"  cols="40" rows="5">
     	<br>
     	<center>
     		<button  id="save" @click="saveButton(specificSection)" class="btn btn-circle btn-info" style="width: 60px;
    height: 60px; font-size: 15px;">Save</button>
     	</center>

     	<ul class="list-group" v-for="image in images" style="margin-top: 20px">
		  <li class="list-group-item d-flex justify-content-between align-items-center">
		  	<img :src="'data:image/png;base64,' + image" class="card-img-top img-responsive">
		    <span class="badge badge-danger badge-pill" @click="deleteImage(image)" style="margin-left: 10px">X</span>
		  </li>
		</ul>
	</div>
</template>

<script>
	window.db = new PouchDB("reports")
	console.log("Local database created")

	import { createWorker } from 'tesseract.js';

	export default {
	   props: ['groupedProps'],
	   data() {
	   		return {
	   			specificReport: 0,
	   			specificSection: 0,
	   			context: 0,
	   			file: 0,
	   			images: []
	   		}
	   },
	   mounted:function(){
	    	this.context = document.getElementById('canvas').getContext('2d')
	    	this.file = document.getElementById('file')

		   	this.video = this.$refs.video;
	        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
	            navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
	            this.video.srcObject = stream;
	           	this.video.play();
	        	});
	    	}
	    	var context = canvas.getContext('2d')
	   		this.specificReport = this.groupedProps[0]
	   		this.specificSection = this.groupedProps[1]
	   		if(this.specificSection.info.text != null && this.specificSection.info.note != null){
	   			document.getElementById("SpeachToText").value = this.specificSection.info.text
	   			document.getElementById("NoteImput").value = this.specificSection.info.note
	   		}
	   		if(this.specificSection.info.images.length != 0){
	   			let tempImages = []
	   			this.specificSection.info.images.map(function(image) {
			    	tempImages.push(image)
			  	});
			  	this.images = tempImages
	   		} 

			const worker = createWorker({
			  logger: m => console.log(m), // Add logger here
			});

			(async () => {
			  await worker.load();
			  await worker.loadLanguage('eng');
			  await worker.initialize('eng');
			  const { data: { text } } = await worker.recognize('data:image/png;base64,' + this.images);
			  var regex = /[a-zA-Z0-9]*<{3,}[a-zA-Z0-9]*/g
			  
			  var mrt = text.match(regex).join()
			  if(mrt != null){
			  	var passportNb = mrt.substring(0, 8)
			  	console.log("Passport Number :" + passportNb)
			  	var nationality = mrt.substring(10, 13)
			  	console.log("Nationality :" + nationality)
			 	var dateOfBirth = mrt.substring(13, 19)
			 	console.log("Date Of Birth :" + dateOfBirth)
			  	var sex = mrt[20]
			  	console.log("Sex :" + sex)
			  	var expirationDate = mrt.substring(21, 27)
			  	console.log("Expiration Date :" + expirationDate)
			  	var personalNb = mrt.substring(28, 42)
			  	console.log("Personal Number :" + personalNb)
			  }
			  await worker.terminate();
			})();
	   	},
	    methods: {
	    	startDictation: function (imputText) {
	    		if (window.hasOwnProperty('webkitSpeechRecognition')) {
			      var recognition = new webkitSpeechRecognition();
			      recognition.continuous = false;
			      recognition.interimResults = false;
			      recognition.lang = "en-US";
			      recognition.start();
			      recognition.onresult = function(e) {
			        document.getElementById(imputText).value += " " + e.results[0][0].transcript;
			        recognition.stop();
			      };
			      recognition.onerror = function(e) {
			        recognition.stop();
			      }
			    }
	    	},
	    	saveButton: function(specificSection) {
	    		let sectionInformation = { text: document.getElementById("SpeachToText").value, note: document.getElementById("NoteImput").value, images: this.images}
	    		this.specificSection.info = sectionInformation
				db.get(this.specificReport._id).then(function(doc) {
					doc.sections.map(function (section) {
						if(section._id == specificSection._id){
							section.info = sectionInformation
						}
					})
					console.log("informations saved")
				  	return db.put(doc);
				}).catch(function (err) {
				  console.log(err);
				});
				this.eventEmitter(0)
	    	},
	    	handleFileSelect: function() {
			  	var file = document.getElementById("files").files[0];
			  	this.getBase64(file)
			},
			getBase64: function (file) {
			   var reader = new FileReader();
			   reader.readAsDataURL(file);

			   var tempImage = this.images

			   reader.onload = function () {
			   	console.log(reader.result)
			     tempImage.push(reader.result.replace(/^data:image\/(png|jpg);base64,/, ""));
			   };
			},
			deleteImage: function (image) {
				let tempVar = this.specificSection
				db.get(this.specificReport._id).then(function(doc) {
					doc.section = doc.sections.map(function (section) {
						if(section._id == tempVar._id){
							section.info.images = section.info.images.filter((value, index) => value != image)
						}
					})
					console.log("Image deleted")
					return db.put(doc)
				}).catch(function (err) {
				  console.log(err);
				});
				this.images.splice(image, 1)
			},
	    	eventEmitter: function(section) {
	    		this.$emit("selected", section)
	    	}
	    }
	}
</script>

<style>

#video, #canvas {
	display: none;
}

.inputfile {
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}
</style>