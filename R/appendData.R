
#' This function allows to create, append data to be passed to the https://github.com/npellet/visualizer.
#' Prior to this, the list have to be parsed and stored as a json file. This file can be either stored locally
#' or stored on https://gist.github.com.
#'
#' @param data data, if it exists
#' @param variable new dataset
#' @param variableName name of the dataset. The name of the data must be exposed to the https://github.com/npellet/visualizer
#' using the exposeData.R function.
#' @param type type of the data. The types currently supported are, "1D Y array", "chart", "multiChart".
#' @return a list object with the data
#' @examples
#' x <- seq(from = 0, to = pi, by = 0.1)
#'
#' d <- appendData(variableName = "simpleArray", variable = cos(x), type = "1D Y array")
#' d <- appendData(data = d, variableName = "simpleArray2", variable = sin(x), type = "1D Y array")
#' toJSON(d)
#'
#' chart <- data.frame("x" = x, "y" = cos(3*x), "highlight" = seq_along(x) - 1, "info"= paste0("ID: ", 0:31))
#' d <- appendData(data = d, variableName = "chart", variable = chart, type = "chart")

#' @seealso exposeData.R
#' @export

appendData <- function(data, variable, variableName, type) {
  if (missing(data)) {
    data <- list()
  }

  switch (type,
          "1D Y array" = {
            data[[variableName]] <- variable
          },
          "chart" = {
            data[[variableName]] <- list(type = unbox("chart"),
                                         value = list(
                                           title = unbox("a visualizeR title"),
                                           data = list(list(
                                             info = mapply(
                                               function(x, y)
                                                 list(
                                                   id = unbox(as.character(x)),
                                                   "_hightlight" = list(y)
                                                 ),
                                               variable$info,
                                               variable$highlight,
                                               SIMPLIFY = FALSE
                                             ),
                                             x = variable$x,
                                             y = variable$y
                                           ))
                                         ))
          },
          "multiChart" = {
            data[[variableName]] <- list(type = unbox("chart"),
                                         value = list(
                                           title = unbox("a visualizeR title"),
                                           axis = list("0" = list(type = "bottom", name = "Bottom axis"),
                                                       "1" = list(type = "left", name = "Left axis"),
                                                       "2" = list(type = "right", name = "Right axis")
                                                       ),
                                           data = lapply( variable, function (x) list(
                                             xAxis = 0,
                                             yAxis = 1,
                                             info = mapply(
                                               function(x, y)
                                                 list(
                                                   id = unbox(as.character(x)),
                                                   "_hightlight" = list(y)
                                                 ),
                                               x$chart$info,
                                               x$chart$highlight,
                                               SIMPLIFY = FALSE
                                             ),
                                             x = x$chart$x,
                                             y = x$chart$y,
                                             "_hightlight" = x$chart$highlight,
                                             "options" = x$options
                                             )
                                           )
                                         ))
          })

  return(data)
}


# examples
#  x <- seq(from = 0, to = pi, by = 0.1)
#
#  d <- appendData(variableName = "simpleArray", variable = cos(x), type = "1D Y array")
#  d <- appendData(data = d, variableName = "simpleArray2", variable = sin(x), type = "1D Y array")
# # toJSON(d)
#
#  chart <- data.frame("x" = x, "y" = cos(3*x), "highlight" = seq_along(x) - 1, "info"= paste0("ID: ", 0:31))
#  d <- appendData(data = d, variableName = "chart", variable = chart, type = "chart")
#
# opts = "options" = list(
#   "trackMouseLabelRouding" = 1,
#   "trackMouse" = "false",
#   "lineToZero" = "false",
#   "trackMouseLabel" = "false",
#   "lineColor" = "red",
#   "autoPeakPickingNb" = 4,
#   "markers" = list(
#     "fillColor" = "transparent",
#     "zoom" = 1,
#     "show" = "false",
#     "type" = 1,
#     "strokeColor" = "false",
#     "strokeWidth" = 1
#   ),
#   "lineStyle" = 1,
#   "autoPeakPickingMinDistance" = 10,
#   "label" = "",
#   "autoPeakPicking" = "false",
#   "flip" = "false"
# )
#
#  chart1 <- data.frame("x" = x, "y" = cos(3*x), "highlight" = seq_along(x) - 1, "info"= paste0("cosID: ", 0:31) )
#  chart2 <- data.frame("x" = x, "y" = sin(3*x), "highlight" = seq_along(x) - 1, "info"= paste0("sinID: ", 0:31) )
#  chart = list( list(chart=chart1, options=opts), list(chart=chart2, options=opts))
#  d <- appendData( data = d, variableName = "multiChart", variable = chart, type = "multiChart")
#
# saveJSON(d, "~/data.json")



