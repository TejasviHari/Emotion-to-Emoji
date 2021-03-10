Webcam.set({
    width:300,
    height:300,
   image_format:'png',
   png_quality:90
});

camera=document.getElementById("camera")

Webcam.attach("#camera");
console.log("Webcam loaded");
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("captured").innerHTML='<img id="captured_img" src="'+data_uri+'"/>';
});

}

console.log("ml5 version is ",ml5.version);


classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/9_B3xd16W/model.json',modelLoaded)


function modelLoaded(){
    console.log("Model Loaded");
}


function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="The first prediction is"+prediction_1;
    speak_data_2="And the second prediction is "+prediction_2;
    var utterThis=new SpeechSynthesisUtterance (speak_data_1+speak_data_2);
    synth.speak(utterThis);
}


function predict() { 
    img = document.getElementById('captured_img');
     classifier.classify(img, gotResult);
     }

function gotResult(error,results){
    if (error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name_2").innerHTML=results[1].label;
     ///label 1 emojis///
     if(results[0].label=="happy"){
         document.getElementById("update_emoji").innerHTML="&#128512;"; 
     }   
     if(results[0].label=="sad"){
        document.getElementById("update_emoji").innerHTML="&#128532;"; 
    }  
    if(results[0].label=="angry"){
        document.getElementById("update_emoji").innerHTML="&#128545;"; 
    }   
/////end//
///label 2 emojis/////
if(results[1].label=="happy"){
    document.getElementById("update_emoji2").innerHTML="&#128512;"
}
if(results[1].label=="sad"){
    document.getElementById("update_emoji2").innerHTML="&#128532;"
}
if(results[1].label=="angry"){
    document.getElementById("update_emoji2").innerHTML="&#128545;"
}
    }
}
