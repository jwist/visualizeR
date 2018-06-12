
#' Converts the list objects into json files
#'
#' @param object the view list object to be saved
#' @param pathToFile the path to file
#' @return a json file to be passed to the https://github.com/npellet/visualizer
#' @examples
#' example
#' saveJSON(v, "~/view.json")
#' saveJSON( object=exposeData(view=v, data=d), pathToFile="~/view.json")
#' @export

saveJSON <- function( object, pathToFile ) {

  fileConn <- file( pathToFile )

  writeLines(jsonlite::toJSON(object,
                    pretty = TRUE,
                    auto_unbox = TRUE,
                    null = 'null'
                    ),
             fileConn
             )

  close( fileConn )

}


