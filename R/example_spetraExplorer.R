# example of spectra explorer

data("coffeeSpectra")

country <- coffeeSpectra$param$country

c <- data.frame(catalogID = coffeeSpectra$param$catalogID,
                country = country,
                species = coffeeSpectra$param$species,
                color = sapply(country, function(x) getColor2(as.character(x))), # can be made faster using levels
                "_hightlight" = seq_along(country),
                y = I(x)
)
d <- appendData(data = d, variableName = "metadata", variable = c, type = "table")


c <- data.frame(f = paste0("spectra", 1:34),
                color = sapply(country, function(x) getColor2(as.character(x))), # can be made faster using levels
                "_hightlight" = seq_along(country)
)
d <- appendData(data = d, variableName = "index", variable = c, type = "table")



dd <- data.frame("x"=I(as.matrix(x)), "country"=country)


pca <- prcomp(dd$x)

pc <- c(1,2)
COLOR <- c(2:4)
ev <- c(round(pca$sdev[pc[1]]/sum(pca$sdev)*100,0),
        round(pca$sdev[pc[2]]/sum(pca$sdev)*100,0),
        round(pca$sdev[pc[3]]/sum(pca$sdev)*100,0))
plot(pca$x[,pc[1]], pca$x[,pc[2]], col=COLOR[d$country], cex=0.7,
     xlab=paste0("PC ", pc[1], " (", ev[pc[1]], "%)"),
     ylab=paste0("PC ", pc[2], " (", ev[pc[2]], "%)"))
legend("topright", legend=levels(country), col=COLOR, pch=1)

opts = list(
  "trackMouseLabelRouding" = 1,
  "trackMouse" = "false",
  "lineToZero" = "false",
  "trackMouseLabel" = "false",
  "lineColor" = "red",
  "autoPeakPickingNb" = 4,
  "markers" = list(
    "fillColor" = "transparent",
    "zoom" = 1,
    "show" = "false",
    "type" = 1,
    "strokeColor" = "false",
    "strokeWidth" = 1
  ),
  "lineStyle" = 1,
  "autoPeakPickingMinDistance" = 10,
  "label" = "",
  "autoPeakPicking" = "false",
  "flip" = "false"
)

style <- list(fill = "black", shape = "circle", cx = 0, cy = 0, r = 3, height = "5px", width = "5px", stroke = "transparent")


chart1 <- data.frame("x" = pca$x[,1],
                     "y" = pca$x[,2],
                     "highlight" = seq_along(country) - 1,
                     "info"= paste0("catalogID: ", coffeeMulti$nmrParam$catalogID),
                     "group" = as.numeric( country )
)
chart2 <- data.frame("x" = pca$x[,1],
                     "y" = pca$x[,3],
                     "highlight" = seq_along(country) - 1,
                     "info"= paste0("catalogID: ", coffeeMulti$nmrParam$catalogID),
                     "group" = as.numeric( country )
)
chart = list( list(chart=chart1, options=opts), list(chart=chart2, options=opts))
d <- appendData( data = d, variableName = "multiChart", variable = chart, type = "multiChart")
d <- appendData( data = d, variableName = "score", variable = chart1, type = "chart")


saveJSON(d, "~/data.json")
