
#' This function creates a blank view list object
#'
#' @param name the name of the view that will appears in the browser
#' @return a blank view list object
#' @examples
#' createView()
#' @export

createView <- function( name = "visualizeR" ) {

  v <- readView( "R/blank.view.json" )

  v$configuration$title <- name

  return(v)

}
