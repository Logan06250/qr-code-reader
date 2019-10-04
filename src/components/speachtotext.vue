<template>

    <center>
        <div class="container-fluid">
            
            Text: <textarea class="form-control" id="inputText" name="fname"></textarea><br>
            <button @click="start" type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">Start </button>
            <button @click="stop" type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">Stop </button>

        </div>
    </center>


</template>
<script>

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
         var tempInputValue = inputText.value;
       inputText.value =   interimTranscript;
    }


    export default{
    
    methods: {
    
    start(){
        recognition.start();
    },
    stop(){
        recognition.stop();
    }

},};

</script>
<style>


</style>
