% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/read_data.R
\name{read_data}
\alias{read_data}
\title{load data from csv files produced with}
\usage{
read_data(filepath)
}
\arguments{
\item{filepath}{the visualization to be updated}
}
\value{
an X matrix, a vector for x axis, a vector with expnos and a vector with expnames
}
\description{
load data from csv files produced with
}
\examples{

path <- file.path( system.file(package = "visualizeR"), "visu", "data", "data.csv" )
read_data(path)

}
