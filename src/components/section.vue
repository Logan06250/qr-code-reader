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
     	<input type="text" class="form-control" id="SpeachToText" placeholder="Enter your text here" value="Enter some text here" style="word-break: break-word">
     	<br>
     	<video ref="video" id="video" width="300" height="300" autoplay></video>
     	<center>
     		<button id="snap" class="btn btn-circle btn-info" style="width: 80px;
    height: 80px; font-size: 15px; margin: 10px; margin-top: -10px" v-on:click="snap()">Photo</button>
     	</center>
     	<canvas id="canvas" width="100" height="100"></canvas>


     	<ul class="list-group" v-for="image in images">
		  <li class="list-group-item d-flex justify-content-between align-items-center">
		  	<img :src="'data:image/png;base64,' + image" class="card-img-top img-responsive">
		    <span class="badge badge-danger badge-pill" @click="deleteImage(image)" style="margin-left: 10px">X</span>
		  </li>
		</ul>

     	<br>
		<label >Note:</label>
     	<input type="text" class="form-control" id="NoteImput" placeholder="Enter your note here" value="Enter some text here" cols="40" rows="5">
     	<br>
     	<center>
     		<button  id="save" @click="saveButton(specificSection)" class="btn btn-circle btn-info" style="width: 60px;
    height: 60px; font-size: 15px; margin: 10px; margin-top: -10px">Save</button>
     	</center>
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
	   			video: 0,
	   			images: []
	   		}
	   },
	   mounted:function(){
	    	this.context = document.getElementById('canvas').getContext('2d')
	    	this.video = document.getElementById('video')

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
	   	},
	    methods: {
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
	    	snap: function() {
	    		this.images.push(this.getBase64Image(this.video))
	    	},
	    	getBase64Image: function (img) {
			    var canvas = document.createElement("canvas");
			    canvas.width = img.width;
			    canvas.height = img.height;
			    var ctx = canvas.getContext("2d");
			    ctx.drawImage(img, 0, 0, 300, 300);
			    var dataURL = canvas.toDataURL("image/png");
			    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
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
</style>