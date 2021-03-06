% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/print.visualization.R
\name{print.visualization}
\alias{print.visualization}
\title{S3 method to print visualization objects (S4)}
\usage{
\method{print}{visualization}(x, ...)
}
\arguments{
\item{x}{visualization object}

\item{...}{parameters of the print generic method}
}
\value{
a string of character, a URL
}
\description{
A print method for \emph{visualization} objects
}
\examples{

v <- new("visualization")
print(v)

}
