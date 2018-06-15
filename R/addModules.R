
#' @title Add modules to view list
#' @description This function adds module to a view list object
#'
#' @param view the view list object to be modified
#' @param type the type of module to be added. The types currently supported are spectra_displayer.
#' @return modified view object list
#' @examples
#' v <- createView( name = "visualizeR" )
#' v <- addModule( view = v, type="spectra_displayer")
#' @export

addModule <- function( view, type ) {

  switch (type,
          "spectra_displayer" = {

            m <- readView("R/modules/spectra_displayer.view.json")$modules
            view$modules[[ length(view$modules) + 1 ]] <- m

            }
          )

  return(view)

}


