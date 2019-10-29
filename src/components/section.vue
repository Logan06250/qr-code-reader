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

		<canvas id="canvas"></canvas>
		<label id="cmnLabel">Text:</label>

		<span id="save" @click="startDictation('SpeachToText')" class="btn btn-circle btn-outline-danger fas fa-microphone" ></span>
		<label id="SpeachToTextlabel"  class="badge badge-danger" ></label>

     	<textarea type="text" class="form-control text-justify" id="SpeachToText" placeholder="Enter your text here" rows="5"> </textarea>
     	<br>
     	<video ref="video" id="video" width="100%" height="100%" autoplay></video>
     	<center>
     		<input class="inputfile" name="files" id="files" type="file" @change="loadImage()">
     		<label id="snap" class="btn btn-lg btn-block btn-info" for="files"> Add Photo</label>
     	</center>
     	<br>
     	<center>
	    	<div class="row">
		  		<div class="col-md-6" v-for="image in images">
					<div class="card border-secondary">

						<div :id="image._id + 'markerControls'" class="input-group">
							<input type="text" :id="image._id + 'name'" class="form-control" placeholder="Photo's name" :value="image.name">
							
								<div :id="image._id + 'editingPhotoDiv'">
									<button @click="addText(image)" class="btn btn-outline-info" style="margin-left: 5px"> <i class="fas fa-font"></i> </button>
							    	<button @click="addArrow(image)" class="btn btn-outline-info"> <i class="fas fa-arrow-right"></i> </button>
								</div>
								<div :id="image._id + 'validatingPhotoDiv'" style="display: none">
									<button @click="deleteMarker(image)" class="btn btn-danger" style="margin-left: 5px"> <i class="fas fa-trash-alt"></i></button>
							    	<button @click="render(image)" class="btn btn-success"> <i class="fas fa-check"></i> </button>
								</div>
							
						</div>

					  	<img :src="'data:image/png;base64,' + image.src" class="card-img-top rounded" :id="image._id + 'img'">
					  	<div class="card-body">
						  	<label class="card-title">Photo information:</label>
						  	<span id="save" @click="startDictation(image._id + 'text')" class="btn btn-circle btn-outline-danger fas fa-microphone" ></span>
						  	<label :id="image._id + 'text' + 'label'"  class="badge badge-danger" ></label>
						  	<div>
						  		<textarea type="text" :id="image._id + 'text'" class="form-control text-justify" rows="5" placeholder="Enter your text here"> {{ image.text }} </textarea>
						  	</div>
						    <button href="#" id="deleteImageButton" class="btn btn-block btn-danger" @click="deleteImage(image)"><i class="fas fa-trash-alt"></i></button>
					  	</div>
					</div>
				</div>
			</div>
		</center>
		<br>
		<label id="cmnLabel">Summary:</label>
		<span id="save" @click="startDictation('summaryImput')" class="btn btn-circle btn-outline-danger fas fa-microphone"></span>
		<label id="summaryImputlabel"  class="badge badge-danger" ></label>

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
	   			images: [],
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
			  	for(let i = 0; i < this.specificSection.info.images.length; i++){
			  		this.images.push({
	   					_id: this.specificSection.info.images[i]._id,
		    			src: this.specificSection.info.images[i].src,
		    			text: this.specificSection.info.images[i].text,
		    			name: this.specificSection.info.images[i].name,
		    			marker: null
	   				})
			  	}
	   		} 
	   	},
	    methods: {
	    	startDictation: function (imputText) {
	    		if (window.hasOwnProperty('webkitSpeechRecognition')) {
			      var recognition = new webkitSpeechRecognition();
			      document.getElementById(imputText + "label").innerHTML = ""
			      recognition.stop();

			      recognition.continuous = false;
			      recognition.interimResults = false;
			      recognition.lang = "en-US";
			      recognition.start();
			      document.getElementById(imputText + "label").innerHTML = "listening..."
			      recognition.onresult = function(e) {
			        document.getElementById(imputText).value += " " + e.results[0][0].transcript;
			        document.getElementById(imputText + "label").innerHTML = ""
			        recognition.stop();
			      };
			      recognition.onerror = function(e) {
			      	document.getElementById(imputText + "label").innerHTML = ""
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
		    				src: document.getElementById(image._id + 'img').src.replace(/^data:image\/(png|jpg);base64,/, ""),
		    				text: document.getElementById(image._id + 'text').value,
		    				name: document.getElementById(image._id + 'name').value
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
				this.images.map(function (image) {
					try {
						if(image.marker.close) {
							image.marker.close()
						}	
					}catch(err) {
						console.log(err)
					}
				})
				
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
				this.images.map(function (image) {
					try {
						if(image.marker.close) {
							image.marker.close()
						}	
					}catch(err) {
						console.log(err)
					}
				})
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
	    	},
			addArrow: function(image) {
			    if (image.marker) {
			    	image.marker.open();
			        image.marker.addMarker(markerjs.ArrowMarker);
			        document.getElementById(image._id + "editingPhotoDiv").style.display = "none"
			        document.getElementById(image._id + "validatingPhotoDiv").style.display = ""
			    } else {
			    	var img = document.getElementById(image._id + 'img')
	   				image.marker = new markerjs.MarkerArea(img);
	   				image.marker.open();
			        image.marker.addMarker(markerjs.ArrowMarker);
			        document.getElementById(image._id + "editingPhotoDiv").style.display = "none"
			        document.getElementById(image._id + "validatingPhotoDiv").style.display = ""
			    }
			},
			addText: function(image) {
				if (image.marker) {
					image.marker.open();
			        image.marker.addMarker(markerjs.TextMarker);
			        document.getElementById(image._id + "editingPhotoDiv").style.display = "none"
			        document.getElementById(image._id + "validatingPhotoDiv").style.display = ""
			    } else {
			    	var img = document.getElementById(image._id + 'img')
	   				image.marker = new markerjs.MarkerArea(img);
	   				image.marker.open();
			        image.marker.addMarker(markerjs.TextMarker);
			        document.getElementById(image._id + "editingPhotoDiv").style.display = "none"
			        document.getElementById(image._id + "validatingPhotoDiv").style.display = ""
			    }
			},
			deleteMarker: function(image) {
			    if (image.marker) {
			        image.marker.deleteActiveMarker();
			        document.getElementById(image._id + "editingPhotoDiv").style.display = "inline"
			        document.getElementById(image._id + "validatingPhotoDiv").style.display = "none"
			    }
			    image.marker.close()
			},
			render: function(image) {
				var tempDataUrl = ""

			    if (image.marker) {
			        image.marker.render((dataUrl) => {
			            document.getElementById(image._id + 'img').src = dataUrl
			        });
			        document.getElementById(image._id + "editingPhotoDiv").style.display = "inline"
			        document.getElementById(image._id + "validatingPhotoDiv").style.display = "none"
			    }
			    image.marker.close()

			},
			loadImage: function() {
		        var input, file, fr, img;
		        var imgToPush = this.images

		        if (typeof window.FileReader !== 'function') {
		            write("The file API isn't supported on this browser yet.");
		            return;
		        }

		        input = document.getElementById('files');
		        if (!input) {
		            write("Um, couldn't find the imgfile element.");
		        }
		        else if (!input.files) {
		            write("This browser doesn't seem to support the `files` property of file inputs.");
		        }
		        else if (!input.files[0]) {
		            write("Please select a file before clicking 'Load'");
		        }
		        else {
		            file = input.files[0];
		            fr = new FileReader();
		            fr.onload = createImage;
		            fr.readAsDataURL(file);

		        }
		        function createImage() {
		            img = new Image();
		            img.onload = imageLoaded;
		            img.src = fr.result;
		        }
		        function imageLoaded() {
		            var canvas = document.getElementById("canvas")
		            canvas.width = img.width;
		            canvas.height = img.height;
		            var ctx = canvas.getContext("2d");
		            ctx.drawImage(img,0,0);
		            imgToPush.push({src: canvas.toDataURL("image/png").replace(/^data:image\/(png|jpg);base64,/, ""), text: "", _id: new Date().toISOString()})

		        }
		        function write(msg) {
		            var p = document.createElement('p');
		            p.innerHTML = msg;
		            document.body.appendChild(p);
		        }
		    }
	    }
	}
</script>

<style>

	#video, #canvas{
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