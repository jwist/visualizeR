
#' repeat a row when needed to match other matrix dimension (not exported)
#'
#' @param x a vector to be repeated
#' @param n number ot time to repeat the vector
#' @return a matrix
#' @examples
#' rep.row(c(1,2,3), 2)

rep.row <- function(x,n){
  matrix(rep(x,each=n),nrow=n)
}
