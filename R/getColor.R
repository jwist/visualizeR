#' GetColorChart based on character (not used)
#'
#' @param text a text used to pick the color
#' @return a rgba color string
#' @examples
#' getColor("colombia")

getColor <- function(text) {

  t <- sapply(unlist(strsplit(text, NULL)), utf8ToInt)
  l <- length(t) %/% 3
  t <- apply(matrix(t[1:(3*l)], 3, l), 1, mean)
  c <- paste0("rgba(",paste(t, collapse = ","),",1)")
  return(c)

}
