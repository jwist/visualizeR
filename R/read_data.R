
#' load data from csv files produced with
#'
#' @param filepath the visualization to be updated
#' @return an X matrix, a vector for x axis, a vector with expnos and a vector with expnames
#' @examples
#'
#' path <- file.path( system.file(package = "visualizeR"), "visu", "data", "data.csv" )
#' read_data(path)
#'
#' @export

read_data <- function(filepath) {
  data <- read.csv2(filepath, sep = ",", dec = ".", header = TRUE, check.names = FALSE)
  ID <- data[,1]
  expno <- data[,2]
  data <- data[,3:ncol(data)]
  ppm <- as.numeric(colnames(data))
  X <- apply(data, 2, function(x) x)
  return(list(ID=ID, expno=expno, ppm=ppm, X=X))
}

