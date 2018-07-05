context("testing server objects and methods")


test_that('check number of slots in server object', {
  expect_equal(length(slotNames(s)), 5)
})

test_that('check print.server S3 method', {
  expect_equal(length(print(s)), 1)
  expect_is(print(s), "character")
})

test_that('check print.server S3 method', {
  expect_equal(length(print(s)), 1)
  expect_is(print(s), "character")
})
