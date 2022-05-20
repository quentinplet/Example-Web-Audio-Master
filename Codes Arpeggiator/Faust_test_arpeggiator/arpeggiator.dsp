import("stdfaust.lib");

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
		  
process = (_) : ( + : ( (delay1) : (pitchshift) ) )~ (*(fdbk)) : *(g) : (panner);