
const ctx = new AudioContext();

//User Interface Callbacks
CarrierFrequency.oninput = function(){
    CarrierFrequencyLabel.innerHTML = this.value;
    Carrier.frequency.value = this.value;
}

ModulationDepth.oninput = function(){
    ModulationDepthLabel.innerHTML = this.value;
    Modulator.gain.value = this.value;
}

ModulationFrequency.oninput = function(){
    ModulationFrequencyLabel.innerHTML = this.value;
    ModulatorOsc.frequency.value = this.value;
}

Amplitude.oninput = function() {
    Gain.gain.value = this.value;
    GainLabel.innerHTML = this.value;
}


StartStop.onclick = function(){
    if (ctx.state ==='suspended') ctx.resume();
    else ctx.suspend();
}

var Carrier = new OscillatorNode(ctx,{frequency:CarrierFrequency.value});
var ModulatorOsc = new OscillatorNode(ctx,{frequency:ModulationFrequency.value});
var Modulator = new GainNode(ctx,{gain:ModulationDepth.value});

var Gain = new GainNode(ctx, {gain : 0.2});


Carrier.start();
ModulatorOsc.start();

ModulatorOsc.connect(Modulator);
Modulator.connect(Carrier.frequency);
Carrier.connect(Gain);
Gain.connect(ctx.destination);