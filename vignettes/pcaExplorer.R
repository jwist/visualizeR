## ----setup, include = FALSE----------------------------------------------
knitr::opts_chunk$set(
  collapse = TRUE,
  comment = "#>"
)

## ---- fig.show='hold'----------------------------------------------------
Elements <- t(array(c(1,0,0,0,0,1,0,0,0,0,1,1), dim = c(4,3)))
noise <- matrix(runif(24) * 0.5, 3, 8)
Compositions <- t(array(c(1,0,0, 0,1,0, 0,0,1, 1,1,0, 1,0,1, 0,1,1, 1,1,1, 0,0,0), dim = c(3,8)))
labels <- c("100", "010", "001", "110", "101", "011", "111", "000")

## ---- fig.show='hold', fig.width = 2.2, fig.height=1---------------------
par(mar=c(0,2,0,0))
barplot(Elements[1,])
barplot(Elements[2,])
barplot(Elements[3,])

## ---- echo=FALSE, results='asis'-----------------------------------------
knitr::kable(Compositions)

## ---- fig.show='hold'----------------------------------------------------
M <- Compositions %*% Elements
knitr::kable(M)

## ---- fig.show='hold'----------------------------------------------------
SM <- scale(M)
SVD <- svd(SM)
# max(abs(SM - t(SVD$v %*% diag(SVD$d) %*% t(SVD$u)))) # difference 

## ---- fig.show='hold'----------------------------------------------------
Maprox <- t(SVD$v[,1:2] %*% diag(SVD$d[1:2]) %*% t(SVD$u[,1:2]))
ERR <- max(abs(SM - Maprox))

## ---- fig.show='hold', fig.width = 2.2-----------------------------------
scores <- SM %*% SVD$v[,1:3]
par(mar=c(4,4,1,1))
plot(scores[,1], scores[,2])
plot(scores[,1], scores[,3])
plot(scores[,2], scores[,3])

## ---- fig.show='hold'----------------------------------------------------
EXVAR <- sapply(SVD$d,function(x){100*x/sum(SVD$d)})
CUMVAR <- cumsum(EXVAR)
par(mar=c(4,4,1,0))
barplot(CUMVAR, ylab = "cum.variance %", xlab = "# of comp.")

## ---- fig.show='hold', fig.width=1.6, fig.height=1-----------------------
for (i in 1:8) {
  par(mar=c(1,0,1,0))
 barplot(SVD$u[i,1:3]) 
}

## ---- fig.show='hold', fig.width=1.6, fig.height=1-----------------------
for (i in 1:4) {
 par(mar=c(1,0,1,0))
 barplot(SVD$v[,i]) 
}

## ---- fig.show='hold'----------------------------------------------------
cbind(labels, scores)
SVD$d

## ---- fig.show='hold'----------------------------------------------------
Elements <- t(array(c(1,0,0,0,0,1,0,0,0,0,1,1), dim = c(4,3)))
Compositions <- t(array(c(1,2,0.1, 1,2.05,0.1, 1,2.1,0.1, 2,1,0.82, 1.9,1,0.9, 1.99,1,0.8, 1.06,2,0.05, 1,2,0.12, 2,1,1, 2,0.9,0.8), dim = c(3,10)))
M <- Compositions %*% Elements
SM <- scale(M)
SVD <- svd(SM)
scores <- SM %*% SVD$v[,1:2]
par(mar=c(4,4,1,1))
plot(scores[,1], scores[,2])

## ---- echo=FALSE, results='asis'-----------------------------------------
knitr::kable(Compositions)

## ---- fig.show='hold'----------------------------------------------------
EXVAR <- sapply(SVD$d,function(x){100*x/sum(SVD$d)})
CUMVAR <- cumsum(EXVAR)
par(mar=c(4,4,1,0))
barplot(CUMVAR, ylab = "cum.variance %", xlab = "# of comp.")

## ---- fig.show='hold', fig.width=1.6, fig.height=1-----------------------
for (i in 1:4) {
  par(mar=c(1,0,1,0))
 barplot(SVD$v[,i]) 
}

## ---- fig.show='hold'----------------------------------------------------
Elements <- t(array(c(1,0,0,0,0,1,0,0,0,0,1,1), dim = c(4,3)))
Compositions <- t(array(c(1,0,0, 0,1,0, 0,0,1, 1,1,0, 1,0,1, 0,1,1, 1,1,1, 0,0,0), dim = c(3,8)))
M <- Compositions %*% Elements

## ---- fig.show='hold'----------------------------------------------------
C <- cor(M)
S <- eigen(C)
scores <- M %*% S$vectors[,1:2]
par(mar=c(4,4,1,1))
plot(scores[,1], scores[,2])

## ---- fig.show='hold'----------------------------------------------------
pca <- prcomp(M, scale = TRUE)
pca
pc <- c(1,2)
ev <- c(round(pca$sdev[pc[1]]/sum(pca$sdev)*100,0),
        round(pca$sdev[pc[2]]/sum(pca$sdev)*100,0),
        round(pca$sdev[pc[3]]/sum(pca$sdev)*100,0))
par(mar=c(4,4,1,1))
plot(pca$x[,pc[1]], pca$x[,pc[2]], col=labels, cex=0.7,
     xlab=paste0("PC ", pc[1], " (", ev[pc[1]], "%)"),
     ylab=paste0("PC ", pc[2], " (", ev[pc[2]], "%)"))

## ---- include=FALSE------------------------------------------------------
#gist_create("/home/jul/git/visualizeR_root/visualizerExamples/datasets/pureElements.csv", description='pureElements testset for visualizeR/spectraExplorer', browse = FALSE)
#gist_create("/home/jul/git/visualizeR_root/visualizerExamples/datasets/classMatrix.csv", description='classMatrix testset for visualizeR/spectraExplorer', browse = FALSE)
#gist_create("/home/jul/git/visualizeR_root/visualizerExamples/datasets/classVector.csv", description='classVector testset for visualizeR/spectraExplorer', browse = FALSE)

pureElements <- read.csv2('https://gist.githubusercontent.com/jwist/f65ee06ad11186d28dd52e0b66af135a/raw/ad4a0dcf05a0c6c5d8bf569efe8eb0fa0ab99ba5/pureElements.csv', sep = ',', dec = '.', header = FALSE)
classMatrix <- read.csv2('https://gist.githubusercontent.com/jwist/208b86aec0d130a979fa2ea0b78b9a10/raw/172b76aec0c67c93e3ef7fae6888425de2183261/classMatrix.csv', sep = ',', dec = '.', header = FALSE)
classVector <- factor(read.csv2('https://gist.githubusercontent.com/jwist/1908d524b9e60657c9a8c4582457b2e5/raw/1efbd11f08673b75879f768a7db3f34b68e247e3/classVector.csv', sep = ',', dec = ',', header = FALSE))

## ---- fig.show='hold', fig.width=6.8, fig.height=2-----------------------
par(mar=c(2,2,1,1))

for (i in 1:3) {
  plot(as.numeric(pureElements[i,]), type='l', col = 1, main = paste("compound", i), xlab = "ppm", ylab = "relative intensity")
}

par(mar=c(2,2,1,1))
plot(as.numeric(pureElements[1,]), type='l', col = 1, main = "mixture", xlab = "ppm", ylab = "relative intensity")
lines(as.numeric(pureElements[2,]), col = 2)
lines(as.numeric(pureElements[3,]), col = 3)

## ---- fig.show='hold'----------------------------------------------------
#gist_create("/home/jul/git/visualizeR_root/visualizerExamples/datasets4/compositionMatrix.csv", description='compositionMatrix testset 4 for visualizeR/spectraExplorer', browse = FALSE)
compositionMatrix <- read.csv2('https://gist.githubusercontent.com/jwist/f53e5bfde74e59ff1b4fdef7e546807c/raw/222eb1b2985f62137abfb23211f028c6d5cd050d/compositionMatrix.csv', sep = ',', dec = '.', header = FALSE)
colnames(compositionMatrix) <- c("c1", "c2", "c3")
knitr::kable(head(compositionMatrix[,1:3]))

## ---- fig.show='hold', fig.width=2.2, fig.height=2-----------------------
par(mar=c(2,2,1,1))
for (i in 1:3) {
  boxplot(compositionMatrix[,i] ~ classVector)
}

## ---- fig.show='hold', fig.width=2.2, fig.height=2-----------------------
par(mar=c(2,2,1,1))
F <- as.logical(as.numeric(classVector)-1)
for (i in 1:3) {
  plot(density(compositionMatrix[F,i]), main = "")
  lines(density(compositionMatrix[-F,i]), col=2)
}

## ---- fig.show='hold'----------------------------------------------------
#gist_create("/home/jul/git/visualizeR_root/visualizerExamples/datasets4/dataset.csv", description='dataset4 testset for visualizeR/spectraExplorer', browse = FALSE)

dataset <- read.csv2('https://gist.githubusercontent.com/jwist/c6c3d2c953db5217d5f93543b6f1ff37/raw/22277726f079e2e22af28a0eeccf75288e61439a/dataset.csv', sep = ',', dec = '.', header = FALSE)

## ---- fig.show='hold', fig.width=3.4, fig.height=3.4---------------------
pc <- c(1,2)
COLOR <- classVector
pca <- prcomp(dataset)
par(mar=c(4,4,1,1))
plot(pca$x[,pc[1]], pca$x[,pc[2]], col=COLOR, cex=0.7,
     xlab=paste0("PC ", pc[1], " (", ev[pc[1]], "%)"),
     ylab=paste0("PC ", pc[2], " (", ev[pc[2]], "%)"))

## ---- fig.show='hold', fig.width=6.8, fig.height=2-----------------------
op <- par(mar=c(2,2,1,1))
plot(pca$rotation[,1], type='l', ylim=range(pca$rotation[,1:3]))
plot(pca$rotation[,2], type='l', col=2)
plot(pca$rotation[,3], type='l', col=3)
par(op)

## ---- fig.show='hold', fig.width=3.4, fig.height=3.4---------------------
noise <- matrix(runif(768 * 6), 6, 768)
pureElements <- pureElements + noise * 1e8
M <- as.matrix(compositionMatrix) %*% as.matrix(pureElements)

## ---- fig.show='hold', fig.width=6.8, fig.height=2-----------------------
par(mar=c(2,2,1,1))

for (i in 1:3) {
  plot(as.numeric(pureElements[i,]), type='l', col = 1, main = paste("compound", i), xlab = "ppm", ylab = "relative intensity")
}

## ---- fig.show='hold', fig.width=3.4, fig.height=3.4---------------------
pc <- c(1,2)
COLOR <- classVector
pca <- prcomp(M, scale. = TRUE)
par(mar=c(2,2,1,1))
plot(pca$x[,pc[1]], pca$x[,pc[2]], col=COLOR, cex=0.7,
     xlab=paste0("PC ", pc[1], " (", ev[pc[1]], "%)"),
     ylab=paste0("PC ", pc[2], " (", ev[pc[2]], "%)"))

## ---- fig.show='hold', fig.width=6.8, fig.height=2-----------------------
op <- par(mar = c(2,2,1,1))
plot(pca$rotation[,1] * pca$scale, type='l', ylim=range(pca$rotation[,1:3]*max(abs(pca$scale))))
lines(as.numeric(pureElements[2,])/100 - 2e7, col = 'gray')
plot(pca$rotation[,2] * pca$scale, type='l', col=2)
lines(as.numeric(pureElements[2,])/100 - 2e7, col = 'gray')
plot(pca$rotation[,3] * pca$scale, type='l', col=3)
lines(as.numeric(pureElements[2,])/100 - 2e7, col = 'gray')
par(op)

## ---- fig.show='hold', fig.width=6.8, fig.height=4-----------------------
par(mar=c(2,2,1,1))
plot(pca$rotation[,1] * pca$scale, pca$rotation[,2] * pca$scale, col = 'gray')
text(pca$rotation[,1] * pca$scale, pca$rotation[,2] * pca$scale, seq_along(pca$scale), cex = 0.6)

## ---- fig.show='hold', fig.width=6.8, fig.height=2-----------------------
par(mar=c(2,2,1,1))
plot(as.numeric(pureElements[2,])/100 - 2e7, col = 'gray', type = 'l')
abline(v = 115, col = 'green')
abline(v = 265)
abline(v = 272)
abline(v = 648)
abline(v = 672)
abline(v = 681)

## ---- fig.show='hold', fig.width=3.4, fig.height=3.4---------------------
FF <- sample(1:1000,25)
M <-M[FF,]
classVector <- classVector[FF]

## ---- echo = FALSE, fig.show='hold', fig.width=3.4, fig.height=3.4-------
pc <- c(1,2)
COLOR <- classVector
pca <- prcomp(M, scale. = TRUE)
par(mar=c(2,2,1,1))
plot(pca$x[,pc[1]], pca$x[,pc[2]], col=COLOR, cex=0.7,
     xlab=paste0("PC ", pc[1], " (", ev[pc[1]], "%)"),
     ylab=paste0("PC ", pc[2], " (", ev[pc[2]], "%)"))

## ---- echo = FALSE, fig.show='hold', fig.width=6.8, fig.height=2---------
op <- par(mar = c(2,2,1,1)) ## we might want to multiply the loadings by the sqrt of eign (which are pca$sdev)
plot(pca$rotation[,1] * pca$scale, type='l', ylim=range(pca$rotation[,1:3]*max(abs(pca$scale))))
lines(as.numeric(pureElements[2,])/100 - 2e7, col = 'gray')
plot(pca$rotation[,2] * pca$scale, type='l', col=2)
lines(as.numeric(pureElements[2,])/100 - 2e7, col = 'gray')
plot(pca$rotation[,3] * pca$scale, type='l', col=3)
lines(as.numeric(pureElements[2,])/100 - 2e7, col = 'gray')
par(op)

## ---- echo = FALSE, fig.show='hold', fig.width=6.8, fig.height=4---------
par(mar=c(2,2,1,1))
plot(pca$rotation[,1] * pca$scale, pca$rotation[,2] * pca$scale, col = 'gray')
text(pca$rotation[,1] * pca$scale, pca$rotation[,2] * pca$scale, seq_along(pca$scale), cex = 0.6)

## ---- echo = FALSE, fig.show='hold', fig.width=6.8, fig.height=2---------
par(mar=c(2,2,1,1))
plot(as.numeric(pureElements[2,])/100 - 2e7, col = 'gray', type = 'l')
abline(v = 115, col = 'green')
abline(v = 265)
abline(v = 272)
abline(v = 648)
abline(v = 672)
abline(v = 681)

