context("testing createView")

source("../../R/readView.R")
source("../../R/saveJSON.R")
source("../../R/createView.R")


test_that('blank view exists', {
  v <- createView()
  expect_is( v, "list")
})
