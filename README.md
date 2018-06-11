# visualizeR
R package to connect R to https://github.com/npellet/visualizer project. R is a very rich and powerfull statistical language supported by a large and dynamic community. It is used in many fields of research, in particular to perform the multivariate analysis in non-targeted analysis. Although the analysis pipeline is fairly complete, a part of the analysis require visual inspection of the results. In that aspect, there is room for improvement. R graphics are not dynamic and cannot be zoomed in and out, as it is possible to do within the scilab<sup><a name="myfootnote1">1</a></sup> or matlab<sup><a name="myfootnote2">2</a></sup> graphical interfaces.

The https://github.com/npellet/visualizer projects provides exactly what R is missing, the opportunity to display any kind of chemical information, rendered molecules, 3D structures, spectra (1D, 2D), among others. The information display can be manipulated readily and several graphs can interact with each other. It is thus possible to link a point in a PCA score plot to a spectra o to a table with its metadata.

The visualizer requires data to be provided as a json file with a specific structure. A second json file contains what is called a "view" and that describes how to display the information. Since the visualizer is an online tool, a webpage, the json files must be served via a webserver to avoid giving the browser access to local files, an unnecessary security hole. There is several manner to achieve this depending on ddd 

## installation

Either clone the repository and build the package locally, or install it directly from R using the nice *devtools* package by Hadley Wickham and coworkers.

```
install.packages("devtools")

library(devtools)

install_github("jwist/visualizeR")
```

## references
<sup>[1](#myfootnote1)</sup>http://www.scilab.org

<sup>[2](#myfootnote2)</sup>https://www.mathworks.com/products/matlab.html
