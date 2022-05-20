import("stdfaust.lib");

at = hslider("v:env/attack", 0.1, 0.001, 5, 0.001);
rel = hslider("v:env/release", 0.5, 0.001, 10, 0.001);
gain = 0.5;
t = button("v:env/bang");
envelop = en.ar(at,rel,t);
impulsion = (os.osc(440)) : * (envelop) *(gain); 

// delay + feedback
n = 524288;
dur = hslider("h:delay/dur", 500, 0, 2000, 1);
fdbk = hslider("h:delay/fdbk", 0, 0, 0.999, 0.001);
d = dur * ma.SR / 1000;
delay1 = de.sdelay(n, 1024, d); 

// transposition
shift = hslider("h:pitchshift/shift", 0, -24, 24, 0.01);
pitchshift = ef.transpose(1024, 1024, shift);

// panoramisation
rate = hslider("h:pan/rate", 0, 0, 1, 0.001);
p = os.osccos(rate) : +(1) : *(0.5);

g = hslider("h:amp/gain", 0.5, 0, 1, 0.01): si.smooth(ba.tau2pole(0.1));

panner = sp.panner(p);
		  
process = (impulsion) : ( + : ( (delay1) : (pitchshift) ) )~ (*(fdbk)) : *(g) : (panner);