<template>
<div id = "divSection">
	<center>
		
		<video id="video" width="100" height="100" autoplay></video>
		<button id="snap">Snap Photo</button>
		<canvas id="canvas" width="100" height="100"></canvas>
		<button id="save">Save photo</button>
		
		<img src="" id="tableBanner" />

	</center>

</div>
</template>
<script>


document.addEventListener('DOMContentLoaded', function() {
   		var video = document.getElementById('video');

		// Get access to the camera!
		if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
		    // Not adding `{ audio: true }` since we only want video now
		    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
		        //video.src = window.URL.createObjectURL(stream);
		        video.srcObject = stream;
		        video.play();
		    });
		}
		
		// Elements for taking the snapshot
		var canvas = document.getElementById('canvas');
		var context = canvas.getContext('2d');
		var video = document.getElementById('video');

		// Trigger photo take
		document.getElementById("snap").addEventListener("click", function() {
			context.drawImage(video, 0, 0, 100, 100);
		});



		if ('storage' in navigator && 'estimate' in navigator.storage) {

	    navigator.storage.estimate().then(function(estimate){
               console.log(`Using ${estimate.usage} out of ${estimate.quota} bytes.`);
          });

	     if (localStorage.getItem('imgData') != null) {
	     	var dataImage = localStorage.getItem('imgData');
			bannerImg = document.getElementById('tableBanner');
			bannerImg.src = "data:image/png;base64," + dataImage;
	     }
	    }

	    document.getElementById("save").addEventListener("click", function() {
			bannerImage = document.getElementById('canvas');
			imgData = getBase64Image(bannerImage);
			localStorage.setItem("imgData", imgData);

			var dataImage = localStorage.getItem('imgData');
			bannerImg = document.getElementById('tableBanner');
			bannerImg.src = "data:image/png;base64," + dataImage;

			var doc = new jsPDF()
			doc.text('Hello world!', 10, 10)
			//addImage(var, extension,position X, position Y , 100px , 100px)
			doc.addImage(dataImage,'PNG',15,40,100,100)
			doc.save('a4.pdf')

		});


	   	function getBase64Image(img) {
		    var canvas = document.createElement("canvas");
		    canvas.width = img.width;
		    canvas.height = img.height;

		    var ctx = canvas.getContext("2d");
		    ctx.drawImage(img, 0, 0);

		    var dataURL = canvas.toDataURL("image/png");

		    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
		}

		let CACHE_NAME = 'sw-v1'
			self.addEventListener('install', (event) => {
			  event.waitUntil(
			    caches.open(CACHE_NAME)
			    .then(cache => cache.addAll('./404.html'))
			  )
			})
			self.addEventListener('fetch', (event) => {
			  if (event.request.method === 'GET') {
			    event.respondWith(
			      caches.match(event.request)
			      .then((cached) => {
			        var networked = fetch(event.request)
			          .then((response) => {
			            let cacheCopy = response.clone()
			            caches.open(CACHE_NAME)
			              .then(cache => cache.put(event.request, cacheCopy))
			            return response;
			          })
			          .catch(() => caches.match(offlinePage));
			        return cached || networked;
			      })
			    )
			  }
			  return;
			});

	}, false);

</script>
<style>


</style>