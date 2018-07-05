
context("testing createView")

test_that('blank view exists', {
  v <- createView()
  expect_is( v, "list")
})

test_that('readView works properly', {
  v <- createView()
  expect_equal( sum( names(v) == c("version", "grid", "modules", "variables", "aliases", "configuration") ), 6)
  expect_is( v$grid$xWidth, "integer")
  expect_equal( v$grid$xWidth, 10)
  expect_is( v$modules, "list")
})
