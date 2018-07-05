

#' Pushes new view.json or data.json to the visualization server
#'
#' @param visualization the visualization to be updated
#' @param type the type of file to be update, view or data
#' @param list the list object that contains the view or data
#' @return an updated visualization object and new data/view.json on the server
#' @examples
#' example
#' saveJSON(v, "~/view.json")
#' saveJSON( object=exposeData(view=v, data=d), pathToFile="~/view.json")
#' @export

push <- function(visualization, type, list) {
  switch (type,
    "view" = {
      fileName = visualization@view
    },
    "data" ={
      fileName = visualization@data
    }
  )
return(fileName)
}
