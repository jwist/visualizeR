


getColor <- function(text) {

  t <- sapply(unlist(strsplit(text, NULL)), utf8ToInt)
  l <- length(t) %/% 3
  t <- apply(matrix(t[1:(3*l)], 3, l), 1, mean)
  c <- paste0("rgba(",paste(t, collapse = ","),",1)")
  return(c)

}

getColor2 <- function(text) {

  t <- sapply(unlist(strsplit(text, NULL)), utf8ToInt)
  c <- sum(t) %% 165
  c <- paste0("rgba(", crayola$R[c], ",", crayola$G[c], ",", crayola$B[c],",1)")
  return(c)

}

x <- cbind(as.matrix(coffeeMulti$nmrBin))
rep.row<-function(x,n){
  matrix(rep(x,each=n),nrow=n)
}

rep.col<-function(x,n){
  matrix(rep(x,each=n), ncol=n, byrow=TRUE)
}
