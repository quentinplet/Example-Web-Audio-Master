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

StartStop.onclick = function(){
    if (ctx.state ==='suspended') ctx.resume();
    else ctx.suspend();

}

const Carrier = new OscillatorNode(ctx);
const ModulatorOsc = new OscillatorNode(ctx,{frequency:100, type:'square'});
const Modulator = ctx.createGain();
var AM = ctx.createGain();
Carrier.start();
ModulatorOsc.start();
ModulatorOsc.connect(Modulator);
Modulator.connect(AM.gain);
Carrier.connect(AM);
AM.connect(ctx.destination);