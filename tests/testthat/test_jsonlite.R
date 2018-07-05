
context("testing jsonlite behavior")

#source("../../R/readView.R")
#source("../../R/saveJSON.R")


test_that('blank view exists', {
  expect_true(system("ls ../../inst/visu/view/test.view.json") == 0)
  expect_true(system("ls ../../inst/visu/view/blank.view.json") == 0)
})

test_that('data integrity', {
  v <- readView("../../inst/visu/view/blank.view.json")
  expect_that(length(v), equals(6))
  expect_that(v[[1]], equals("2.93.0"))
})

test_that('import export with jsonlite', {
  v <- readView("../../inst/visu/view/test.view.json")
  saveJSON(v, "viewTestThat.json")
  expect_true(system("diff viewTestThat.json ../../inst/visu/view/test.view.json") == 0)
  expect_is(v$variables[[1]]$jpath, "list")
})




