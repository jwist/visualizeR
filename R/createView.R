
#' This function creates a blank view list object
#'
#' @param name the name of the view that will appears in the browser
#' @return a blank view list object
#' @examples
#'
#' createView()
#'
#' @export

createView <- function( name = "visualizeR" ) {

  path <- file.path( system.file(package = "visualizeR"), "R", "visu", "view", "blank.view.json" )
  #path <- "../../inst/visu/view/blank.view.json"
  v <- readView( path )

  v$configuration$title <- name

  return(v)

}
