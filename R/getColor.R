#' GetColorChart based on character
#'
#' @param text a text used to pick the color
#' @return a color
#' @examples
#' getColor("colombia")
#' @export

getColor <- function(text) {

  t <- sapply(unlist(strsplit(text, NULL)), utf8ToInt)
  c <- sum(t) %% 165
  c <- rgb(crayola$R[c], crayola$G[c], crayola$B[c], 255, maxColorValue = 255)
  return(c)

}
