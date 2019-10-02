<template>

	<center>
		<div class="container-fluid">
			
			Text: <input type="text" id="imputText" name="fname"><br>
			<button id="start">Start recognition</button>
			<button id="stop">Stop regnognition</button>

		</div>
	</center>


</template>
<script LANGUAGE="JavaScript">



	document.addEventListener('DOMContentLoaded', function() {

		var imputText = document.getElementById('imputText');

		window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
	    let recognition = new window.SpeechRecognition();
	    recognition.interimResults = true;
	    recognition.maxAlternatives = 10;
	    recognition.continuous = true;
	    recognition.onresult = (event) => {
	      let interimTranscript = '';
	      for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
	        let transcript = event.results[i][0].transcript;
	        if (event.results[i].isFinal) {
	        	interimTranscript = '';
	        } else {
	          	interimTranscript += transcript;
	        }
	      }
	      var tempImputValue = imputText.value;
	      imputText.value = tempImputValue + interimTranscript;
	    }

	    document.getElementById("start").addEventListener("click", function() {
			recognition.start();
		});

		document.getElementById("stop").addEventListener("click", function() {
			recognition.stop();
		});
 
	});
    

</script>
<style>


</style>
