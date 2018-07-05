#' An S4 class for server
#'
#' @slot baseURL the url or IP of the server
#' @slot port the port to which the server listen
#' @slot path the path relative to the server root directory
#' @slot protocole a protocole
#' @return an url object
#' @examples
#'
#' new("server")
#'
#' @export

setClass("server",
         slots = list(baseURL = "character",
                      port = "numeric",
                      path = "character",
                      protocole ="character",
                      rootDir = "character"),
         prototype = list( baseURL = "127.0.0.1",
                           port = 5474,
                           path = "/",
                           protocole = "http://",
                           rootDir = file.path( system.file(package = "visualizeR"), "visu" ))

)
