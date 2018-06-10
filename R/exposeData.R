
#' This function parse the datasets present in the data list object and configure the view list object accordingly.
#' For the view to be able to access the data in the https://github.com/npellet/visualizer it is necessary fot the data to
#' be exposed.
#'
#' @param view view list object that should be modified
#' @param data data list object with datasets to be exposed
#' @return a modified view list object with correct variable configuration
#' @examples
#' reset variables in view
#' v$variables <- list()
#' creste new variables
#' v <- exposeData(view=v, data=d)
#' @export


exposeData <- function(view, data) {

  m <- lapply(names(data), function(x)   list( varname = unbox(x), jpath = list(x) ))
  view$variables[[ length(view$variables) + 1 ]] <- m

  return(view)

}


