---
layout: post
title:  "interactive visualization with R"
date:   2019-11-27 20:06:34 -0500
categories: R 
---

Interactive data visualization is a must to develop attractive tools for a broad audience. Here I will show how to use a JavaScript framework to visualize results computed with R. I think it is a good idea to keep computation separated from visualization to make more robust pipelines, hence the idea to use a webpage as a visualization platform.

[`visualizer`][visu-link] is a webpage (a tool) that takes data as input and display them according to a customizable layout (a view, or vista in spanish). [`visualizer`][visu-link] allows to define modules that can display many different types of data and that can be chained to build complex pipelines. Since this package is build with pure JavaScript, code can be added to modules to allow even more complex manipulation of the results.

[`visualizer`][visu-link] needs two files, a data.json file that contains the data or result to be displayed in json format and a view.file that contains the description of how to display the data.

Both those files can be produced by an R script and pushed to the webpage. This is what [`hastaLaVista`][hlv-link] R-package.

A multivariate analysis applied to metabolic profiling is used as a showcase example.

## get started

First install the latest release of [`hastaLaVista`][hlv-link] using devtools. 

{% highlight r %}
devtools::install_github("jwist/hastaLaVista")
{% endhighlight %}

For multivariate analysis I will use [`MetaboMate`][mm-link]. First, make sure that the following [bioconductor][bioc-link] packages are installed.

{% highlight r %}
BiocManager::install(c("MassSpecWavelet", "impute", "pcaMethods"))
devtools::install_github("kimsche/MetaboMate")
{% endhighlight %}



[visu-link]: https://github.com/npellet/visualizer
[hlv-link]: https://github.com/jwist/hastaLaVista
[mm-link]: https://github.com/kimsche/MetaboMate
[bioc-link]: https://bioconductor.org/install/