

#' Pushes new view.json or data.json to the visualization server
#'
#' @param visualization the visualization to be updated
#' @param type the type of file to be update, view or data
#' @param list the list object that contains the view or data
#' @return an updated visualization object and new data/view.json on the server
#' @examples
#'
#' v <- createView()
#' visu <- new("visualization")
#' push(visu, type="view", v)
#'
#' @seealso \pkg{visualizeR::saveJSON()}
#' @export

push <- function(visualization, type, list) {

  switch (type,
          "view" = {

            path <- paste0(visualization@viewServer@rootDir, visualization@viewServer@path)
            filename <- visualization@view

          },
          "data" ={

            path <- paste0(visualization@dataServer@rootDir, visualization@dataServer@path)
            filename <- visualization@data

          }
  )

  visualizeR::saveJSON(list, path, filename)

}
