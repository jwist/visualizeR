'use strict';define(function(){'use strict';var a=window.setInterval,b=window.clearTimeout,c={},d=function(i,j,k,l,m){var n=i;return c[n]&&l&&g(n),c[n]=[i,j,!1,!1,k],m||e(n),n},e=function h(i){(function(j){c[j][3]=window.setTimeout(function(){$.ajax({url:c[j][0],timeout:1200,method:'get',success:function(l){c[j][4](l),h(j)}})},c[j][1])})(i)},f=function(i){c[i]&&window.clearTimeout(c[i][3])},g=function(i){c[i]&&(f(i),delete c[i])};return{start:e,remove:g,erase:g,stop:f,pause:f,create:d,make:d}});