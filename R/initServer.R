

#' @title checks if server is running and if not starts it
#' @description
#' This functions starts the http server that is necessary to the \code{github.com/npellet/visualizer} to work.
#' If a server is already running (daemon_list is empty), then nothing happens.
#'
#' @param server a server object
#' @return void
#' @examples
#'
#' s <- new("server")
#' #initServer(s)
#'
#' @export

initServer <- function (server, force = FALSE) {

  if (isS4(server)) {

    if (force == FALSE) {
      servr::daemon_stop()
    }

    #if (is.null(servr::daemon_list())) {
      servr::httw(dir = server@rootDir,
                  watch = server@rootDir,
                  port = server@port)

      if (!is.numeric(server@port)) {
        warning("initServer: port is not of type numeric and will be ignored")
        port = 0
      }

    #}
  } else {
    warning("initServer: argument is not of class server, nothing is done")
  }

}


# initServer <- function (directory =  file.path( system.file(package = "visualizeR"), "visu" ),
#                         port = 4574) {
#
#   if (is.null(servr::daemon_list())) {
#     servr::httw(dir = directory,
#                 watch = directory,
#                 port = port)
#
#     if (!is.numeric(port)) {
#       warning("initServer: port is not of type numeric and will be ignored")
#       port = 0
#     }
#
#
#   }
#
# }


