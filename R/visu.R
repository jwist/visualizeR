
#' Trigger the visualization into the browser
#'
#' Open the visualizer in the browser using the baseURL. The https://github.com/nepellet/visualizer works only
#' online and for security reasons the browser should NOT be allowed to access local file. One option is to
#' use gist.github.com to publish the two required files produced by https://github.com/jwist/visualizeR using the package
#' gistr (see last example). If working with sensitive or large datasets, this option is not recommended. Instead
#' it is possible to serve the data locally with a tiny webserver. Users with full featured webservers such as
#' Apache, Nginx, will find it easy. For users that are not familiar with webservers, a tiny tool can be found at
#' https://github.com/cheminfo/babel-proxy-server.git that will serve the files. This last option requires
#' a working node.js. A final option is to clone and reinstall the full project locally.
#'
#' @param visuURL url of the visualizer instance
#' @param viewURL url of the view
#' @param dataURL url of the data
#' @return void
#' @examples
#' #using options
#' options(baseURL = "https://my.cheminfo.org")
#' options(viewURL = "http://localhost:9898/view.json")
#' options(dataURL = "http://localhost:9898/data.json")
#' visu()
#'
#' #using parameters and local views
#' visu("https://my.cheminfo.org",
#'    "http://localhost:9898/view.json",
#'    "http://localhost:9898/data.json"
#'    )
#'
#' #using views and data stored on gist.github.com
#' visu("https://my.cheminfo.org",
#'    "https://gist.githubusercontent.com/jwist/57512dc74595a7c2b66c3e2bf4e76ba1/raw/test.view.json",
#'    "https://gist.githubusercontent.com/jwist/3354274a2b1762e408af22a8217384d9/raw/data.json"
#'    )
#' @export

visu <- function( visuURL = getOption("visuURL"),
                  viewURL = getOption("viewURL"),
                  dataURL = getOption("dataURL") ){

  vUrl <- paste( visuURL, "?viewURL=",
                 viewURL, "&dataURL=",
                 dataURL, sep = "" );

  utils::browseURL( vUrl )

  warning( vUrl )

}
