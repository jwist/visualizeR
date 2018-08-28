
context("testing utils")

test_that('rep.row works', {
  expect_equal( nrow(rep.row(c(1,2,3), 3)), 3)
})

test_that('rep.col works', {
  expect_equal( ncol(rep.col(c(1,2,3), 3)), 3)
})

