
#' Read json objects from https://github.com/npellet/visualizer.
#'
#' @param pathToFile the path to file
#' @return a list object to be manipulated
#' @examples
#' example
#' v <- readView("R/example_spectra_displayer.view.json")
#' @export

readView <- function( pathToFile ) {

  lines <- readLines( pathToFile )

  fromJSON(lines,
                simplifyVector = FALSE,
                simplifyDataFrame = FALSE,
                simplifyMatrix = FALSE
                )

}


