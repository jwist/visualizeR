
#' GetColorChart based on character
#'
#' @param text a text used to pick the color
#' @return a rgba color string
#' @examples
#' getColor2("colombia")
#' @export

getColor2 <- function(text, colorFormat='rgb') {

  t <- sapply(unlist(strsplit(text, NULL)), utf8ToInt)
  c <- sum(t) %% 165
  if(colorFormat == 'rgb'){
    c <- paste0("rgba(", crayola$R[c], ",", crayola$G[c], ",", crayola$B[c],",1)")
  } else {
    c <- sprintf('#%s',paste(as.hexmode(c(crayola$R[c],crayola$G[c],crayola$B[c])),collapse = ''))
  }
  return(c)

}
