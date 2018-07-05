#' An S4 class that contains a visualization
#'
#' @slot baseVisuURL baseURL to the github/npellet/visualizer index.html file
#' @return a visualization object
#' @examples
#'
#' new("visualization")
#'
#' @export

setClass("visualization",
         slots = list(visuServer = "server",
                      viewServer = "server",
                      dataServer = "server",
                      data = "character",
                      view = "character",
                      localServer = "logical"),
         prototype = list(visuServer = new("server"),
                          viewServer = new("server", path = "/view/"),
                          dataServer = new("server", path = "/data/"),
                          data = "data.json",
                          view = "view.json",
                          localServer = TRUE)

)
