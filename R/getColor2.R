
#' GetColorChart based on character
#'
#' @param text a text used to pick the color
#' @return a rgba color string
#' @examples
#' getColor2("colombia")
#' @export

getColor2 <- function(text) {

  t <- sapply(unlist(strsplit(text, NULL)), utf8ToInt)
  c <- sum(t) %% 165
  c <- paste0("rgba(", crayola$R[c], ",", crayola$G[c], ",", crayola$B[c],",1)")
  return(c)

}
