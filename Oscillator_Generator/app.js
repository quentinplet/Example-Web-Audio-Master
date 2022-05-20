"use strict";

var ctx = new AudioContext();

window.onload = function(){
    var onOff = document.getElementById("on-off");
    var span = document.getElementsByTagName("span") [0];
    var osc = false;
    var freqSliderVal = document.getElementsByTagName("input")[1].value;
    var slider1 = document.getElementById("volume");
    var selectedWaveform = "sawtooth";
    var waveformTypes = document.getElementsByTagName('li');
    console.log(freqSliderVal);
    

//fonction setInterval
setInterval (function() {
    
    if (!osc) {
        console.log("Oscillator is stopped. Waiting for oscillator to start");

    } else {

        freqSliderVal = document.getElementsByTagName("input")[1].value;
        osc.frequency.value = freqSliderVal;
        console.log("Oscillator is playing. Frequency value is " + freqSliderVal);
        osc.type = selectedWaveform;
    }
}, 50);

//fonction select for waveform type
function select (){
    var selectedWaveformElement = document.getElementById(this.id);
    selectedWaveform = document.getElementById(this.id).id;
    console.log(selectedWaveform);

    //for loop for selectedWaveFormElement
for (var i =0; i < waveformTypes.length; i+= 1) {
    waveformTypes[i].classList.remove("selected-waveform");
}

selectedWaveformElement.classList.add("selected-waveform");
}
//for loop for waveform type
for (var i = 0; i < waveformTypes.length; i++) {
    waveformTypes[i].addEventListener('click', select);
}


    onOff.addEventListener("click", function (){
        if(!osc) {
        osc = true;
        osc = ctx.createOscillator();
        var amp = ctx.createGain();
        amp.gain.value = 0.1;
        osc.frequency.value = freqSliderVal;
        osc.connect(amp);
        amp.connect(ctx.destination);
        osc.start(ctx.currentTime);
        onOff.value = "stop";
        span.innerHTML = "Click to stop oscillator";
        } else {
            osc.stop(ctx.currentTime);
            osc = false;
            onOff.value = "start";
            span.innerHTML = "Click to start oscillator";
        }
    });
};