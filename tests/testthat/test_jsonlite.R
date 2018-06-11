
context("testing jsonlite behavior")

source("../../R/readView.R")
source("../../R/saveJSON.R")


test_that('data integrity', {
  v <- readView("../../R/views/blank.view.json")
  expect_that(length(v), equals(6))
  expect_that(v[[1]], equals("2.93.0"))
})

test_that('import export with jsonlite', {
  v <- readView("../../R/views/test.view.json")
  saveJSON(v, "viewTestThat.json")
  expect_true(system("diff viewTestThat.json ../../R/views/test.view.json") == 0)
  expect_is(v$variables[[1]]$jpath, "list")
})




