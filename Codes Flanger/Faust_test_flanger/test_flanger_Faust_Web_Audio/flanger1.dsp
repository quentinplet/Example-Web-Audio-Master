import("stdfaust.lib");
//4 contrôles pour le flanger
rate = hslider("rate", 0.001, 0.001, 500, 0.001);
depth = hslider("depth", 0.001, 0.001, 5000, 0.001);
shift = hslider("shift", 0, 0, 5000, 1);
fdbk = hslider("fdbk", 0, 0, 1, 0.01);
//
ndel = 524288;
//durée du retard variable en millisecondes
retardvariable = os.osccos(rate) : +(1) : *(0.5) : *(depth) : +(shift);
//conversion de retardvariable en nombre d'échantillons
nsamp = retardvariable / 1000 * ma.SR;
//
//process = _ <: (_, de.fdelay(ndel, nsamp)) : (_, *(fdbk)) : ((_ <:(_,_)), _) : (_, +);
process = _ <: (_, (_ + de.fdelay(ndel, nsamp)) * (fdbk));