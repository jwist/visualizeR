## ----setup, include = FALSE----------------------------------------------
knitr::opts_chunk$set(
  collapse = TRUE,
  comment = "#>"
)

## ----create_dataset, fig.show='hold'-------------------------------------
library(visualizeR)

data("coffeeNMRSpectra")

ID <- coffeeNMRSpectra$param$catalogID
group <- coffeeNMRSpectra$param$country1
metadata <- data.frame( sapply(coffeeNMRSpectra$param, function(x) x) )
x <- matrix(sapply(I(as.matrix(coffeeNMRSpectra$nmr)), function(x) x), 34, 1610)
x_axis <- as.numeric( colnames(coffeeNMRSpectra$nmr) )

## ----append_data, fig.show='hold'----------------------------------------
d = list()
c <- data.frame(ID = ID,
                group = group,
                color = sapply(group, function(x) getColor2(as.character(x), 'hex')),
                "_highlight" = seq_along(group),
                dataMatrix = I(matrix( c(rbind(repRow(x_axis, nrow(x)), x)), nrow(x), ncol(x)*2)),
                metadata = I(metadata),
                check.names = FALSE
)
d <- appendData(data = d, variableName = "data", variable = c, type = "table")

## ----create_boxplots, fig.show='hold'------------------------------------
imag = NULL
for (i in seq(from=2, to=3220, by=2)) {
  png(tf1 <- tempfile(fileext = ".png"));  boxplot( dataMatrix[,i] ~ group, data = c); dev.off()
  imag[[i/2]] <- paste0("data:image/png;base64,", base64enc::base64encode(tf1))
}
l <- data.frame("_highlight" = seq_along(x_axis),
                #value = paste0("data:image/png;base64,", base64enc::base64encode(tf1)),
                value = unlist(imag),
                check.names = FALSE)
d <- appendData(data = d, variableName = "img", variable = l, type = "table")

## ----check_d_names, fig.show='hold'--------------------------------------
names(d)

## ----push_data, fig.show='hold'------------------------------------------
v <- new("visualization")
v@view <- "spectraExplorer3.view.json"
v@data <- "spectraExplorer3.data.json"
push(v, type="data", d)

## ----check_visualization_object, fig.show='hold'-------------------------
print(v)

## ----visualize, fig.show='hold'------------------------------------------
#visualize(v)

