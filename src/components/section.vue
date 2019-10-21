<template>
	<div style="padding-top: 45px">
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
		<label id="cmnLabel">Text:</label>

		<span id="save" @click="startDictation('SpeachToText')" class="btn btn-circle btn-outline-danger fas fa-microphone" ></span>
     	<textarea type="text" class="form-control text-justify" id="SpeachToText" placeholder="Enter your text here" rows="5"> </textarea>
     	<br>
     	<video ref="video" id="video" width="100%" height="100%" autoplay></video>
     	<center>
     		<input class="inputfile" name="files" id="files" type="file" accept=".heic, .hevc, .heif, .pdf, .png, .gif, .jpg, .jpeg, .doc, .docx, application/msword, application/pdf" multiple @change="handleFileSelect()" capture>
     		<label id="snap" class="btn btn-lg btn-block btn-info" for="files"> Add Photo</label>
     	</center>
     	<br>
     	<center>
	    	<div class="row">
		  		<div class="col-md-6" v-for="image in images">
					<div class="card border-secondary">
					  	<img :src="'data:image/png;base64,' + image.src" class="card-img-top rounded ">
					  	<div class="card-body">
						  	<label class="card-title">Photo information:</label>
						  	<span id="save" @click="startDictation(image._id)" class="btn btn-circle btn-outline-danger fas fa-microphone" ></span>
						  	<div>
						  		<textarea type="text" :id="image._id" class="form-control text-justify" rows="5" placeholder="Enter your text here"> {{ image.text }} </textarea>
						  	</div>
						    <button href="#" id="deleteImageButton" class="btn btn-block btn-danger" @click="deleteImage(image)">Delete the photo</button>
					  	</div>
					</div>
				</div>
			</div>
		</center>
		<canvas id="canvas" width="100" height="100"></canvas>
		<br>
		<label id="cmnLabel">Summary:</label>
		<span id="save" @click="startDictation('summaryImput')" class="btn btn-circle btn-outline-danger fas fa-microphone"></span>
     	<textarea type="text" class="form-control text-justify" id="summaryImput" placeholder="Enter your sumary here" rows="5"> </textarea>
		<button  id="saveButton" @click="saveButton(specificSection)" class="btn btn-lg btn-block btn-info">Save all informations</button>
	</div>
</template>

<script>
	window.db = new PouchDB("reports")
	console.log("Local database created")

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
	   		if(this.specificSection.info.text != null && this.specificSection.info.summary != null){
	   			document.getElementById("SpeachToText").value = this.specificSection.info.text
	   			document.getElementById("summaryImput").value = this.specificSection.info.summary
	   		}
	   		if(this.specificSection.info.images.length != 0){
	   			let tempImages = []
	   			this.specificSection.info.images.map(function(image) {
			    	tempImages.push(image)
			  	});
			  	this.images = tempImages
	   		} 
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

	    		var imagesToPush = []

	    		this.images.map(function (image) {
	    			imagesToPush.push(
	    				{
		    				_id: image._id,
		    				src: image.src,
		    				text: document.getElementById(image._id).value
	    				}	
	    			)
	    		})
	    		let sectionInformation = { text: document.getElementById("SpeachToText").value, summary: document.getElementById("summaryImput").value, images: imagesToPush }
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
			     tempImage.push({src: reader.result.replace(/^data:image\/(png|jpg);base64,/, ""), text: "", _id: new Date().toISOString()});
			   };
			},
			deleteImage: function (image) {
				let thisSectionId = this.specificSection._id
				db.get(this.specificReport._id).then(function(doc) {
					doc.section = doc.sections.map(function (section) {
						if(section._id == thisSectionId){
							section.info.images = section.info.images.filter((value, index) => value._id != image._id)
						}
					})
					console.log("Image deleted")
					return db.put(doc)
				}).catch(function (err) {
				  console.log(err);
				});
				var delImage = this.images.indexOf(image)
				this.images.splice(delImage, 1)
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

	#saveButton, #deleteImageButton {
		margin-top: 10px;
	}
	.inputfile {
		width: 0.1px;
		height: 0.1px;
		opacity: 0;
		overflow: hidden;
		position: absolute;
		z-index: -1;
	}
	.card {
		text-align: left;
		width: 96%; 
		margin-top: 2%;
	}

	.fa-microphone {
		width: 35px !important;
	    height: 35px; 
	    font-size: 15px; 
	    margin: 10px;
	}

	#cmnLabel {
		margin-left: 5px;
	}
</style>