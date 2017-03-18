angular.module('starter', ['ionic'])
.controller('AppCtrl', function($scope) {
  $scope.data = {
    speechText: ''
  };
  $scope.recognizedText = '';

  $scope.speakText = function() {
    if(window.cordova){
      TTS.speak({
           text: $scope.data.speechText,
           locale: 'en-GB',
           rate: 1.5
       }, function () {
           // Do Something after success
       }, function (reason) {
           // Handle the error case
       });

    } else {
    var speech = new SpeechSynthesisUtterance($scope.data.speechText);
    speech.lang = 'en-US';
    speechSynthesis.speak(speech);
    }
  };

  $scope.record = function() {
    var recognition = new SpeechRecognition();
    recognition.onresult = function(event) {
        if (event.results.length > 0) {
            $scope.recognizedText = event.results[0][0].transcript;
            $scope.$apply()
        }
    };
    recognition.start();
  };
});
