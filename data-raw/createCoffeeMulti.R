# this script builds a clean dataset for demos from old coffee files
# these data were originally recorded at our lab at Universidad del Valle, Cali, Colombia
# by Julien Wist, Jessica Medina and Victoria Andrea Arana

load('data-raw/coffeeMulti.rda')
load('data-raw/ppm.binned.rda')

colnames(coffeeMulti$nmrBin) <- round(ppm.binned,3)

param <- coffeeMulti$nmrParam
irms <- coffeeMulti$irms$mean
nmr <- coffeeMulti$nmrBin
gc <- coffeeMulti$gc[,5:11]

coffeeSpectra <-data.frame(param = param, irms = irms, nmr = nmr, gc = gc)

devtools::use_data(coffeeSpectra)



