#' S4 method to visualize visualization objects
#'
#' A visualize method for \emph{visualization} objects. If \emph{object@localServer} is TRUE, then this
#' function will trigger a local instance of \pkg{servr} server.
#'
#' @param v visualization object
#' @return void
#' @examples
#'
#' v<- new("visualization")
#' visualize(v)
#'
#' @export

setMethod("visualize",
          c(v = "visualization"),
          function(v) {

            if (v@localServer == TRUE) {
              initServer(v@visuServer)
            }

            utils::browseURL( print(v) )
          }
)