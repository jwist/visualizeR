'use strict';var _Mathabs=Math.abs,_Mathmax=Math.max,_Mathmin=Math.min;define(['modules/default/defaultview','src/util/util','src/util/ui','lib/d3/d3.layout.cloud'],function(c,e,f,g){'use strict';function j(){}return j.prototype=$.extend(!0,{},c,{init:function(){this._id=e.getNextUniqueId(),this.dom=f.getSafeElement('div').attr('id',this._id).attr('class','layout-cloud'),this.module.getDomContent().html(this.dom)},blank:{arrayvalue:function(){this.dom.empty()},textvalue:function(){this.dom.empty()}},update:{arrayvalue:function(l){l.get()&&(l=l.get(),Array.isArray(l)&&this.processChart(l))},textvalue:function(l){l.get()&&(l=l.get(),this.processChart(l))}},onActionReceive:{},inDom:function(){this.resolveReady()},onResize:function(){this.layout&&(this.dom.empty(),this.drawChart(),this.refresh())},processChart:function(l){function o(){p.layout.spiral(p.module.getConfiguration('spiral')),p.fontSize=g.scale[p.module.getConfiguration('scale')]().range([10,100]),q.length&&p.fontSize.domain([+q[q.length-1].value||1,+q[0].value]),p.words=[],p.layout.stop().words(q).start()}var q,p=this;p.words=[];var t=/^(i|me|my|myself|we|us|our|ours|ourselves|you|your|yours|yourself|yourselves|he|him|his|himself|she|her|hers|herself|it|its|itself|they|them|their|theirs|themselves|what|which|who|whom|whose|this|that|these|those|am|is|are|was|were|be|been|being|have|has|had|having|do|does|did|doing|will|would|should|can|could|ought|i'm|you're|he's|she's|it's|we're|they're|i've|you've|we've|they've|i'd|you'd|he'd|she'd|we'd|they'd|i'll|you'll|he'll|she'll|we'll|they'll|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|doesn't|don't|didn't|won't|wouldn't|shan't|shouldn't|can't|cannot|couldn't|mustn't|let's|that's|who's|what's|here's|there's|when's|where's|why's|how's|a|an|the|and|but|if|or|because|as|until|while|of|at|by|for|with|about|against|between|into|through|during|before|after|above|below|to|from|up|upon|down|in|out|on|off|over|under|again|further|then|once|here|there|when|where|why|how|all|any|both|each|few|more|most|other|some|such|no|nor|not|only|own|same|so|than|too|very|say|says|said|shall)$/,u=/[!-#%-*,-\/:;?@\[-\]_{}¡§«¶·»¿;·՚-՟։֊־׀׃׆׳״؉؊،؍؛؞؟٪-٭۔܀-܍߷-߹࠰-࠾࡞।॥॰૰෴๏๚๛༄-༒༔༺-༽྅࿐-࿔࿙࿚၊-၏჻፠-፨᐀᙭᙮᚛᚜᛫-᛭᜵᜶។-៖៘-៚᠀-᠊᥄᥅᨞᨟᪠-᪦᪨-᪭᭚-᭠᯼-᯿᰻-᰿᱾᱿᳀-᳇᳓‐-‧‰-⁃⁅-⁑⁓-⁞⁽⁾₍₎〈〉❨-❵⟅⟆⟦-⟯⦃-⦘⧘-⧛⧼⧽⳹-⳼⳾⳿⵰⸀-⸮⸰-⸻、-〃〈-】〔-〟〰〽゠・꓾꓿꘍-꘏꙳꙾꛲-꛷꡴-꡷꣎꣏꣸-꣺꤮꤯꥟꧁-꧍꧞꧟꩜-꩟꫞꫟꫰꫱꯫﴾﴿︐-︙︰-﹒﹔-﹡﹣﹨﹪﹫！-＃％-＊，-／：；？＠［-］＿｛｝｟-･]/g,v=/[ \f\n\r\t\v\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000\u3031-\u3035\u309b\u309c\u30a0\u30fc\uff70]+/g,x=/^(@|https?:|\/\/)/;p.drawChart(),Array.isArray(l)?function(y){q={};for(var z={},A=y.length-1;0<=A;A--){var B=y[A][0],C=y[A][1];if(B!==parseInt(B)&&C===parseInt(C)){var D=B;B=C,C=D}if(x.test(C))return;if(C=C.replace(u,''),t.test(C.toLowerCase()))return;z[C.toLowerCase()]=C,q[C=C.toLowerCase()]=(q[C]||0)+B}q=g.entries(q).sort(function(E,F){return F.value-E.value}),q.forEach(function(E){E.key=z[E.key]}),o()}(l):function(y){q={};var z={};y.split(p.module.getConfigurationCheckbox('oneWordPerLine','oneWordPerLine')?/\n/g:v).forEach(function(A){x.test(A)||(A=A.replace(u,''),t.test(A.toLowerCase())||(z[A.toLowerCase()]=A,q[A=A.toLowerCase()]=(q[A]||0)+1))}),q=g.entries(q).sort(function(A,B){return B.value-A.value}),q.forEach(function(A){A.key=z[A.key]}),o()}(l)},drawChart:function(){function l(x,y){var z=y?_Mathmin(o/_Mathabs(y[1].x-o/2),o/_Mathabs(y[0].x-o/2),p/_Mathabs(y[1].y-p/2),p/_Mathabs(y[0].y-p/2))/2:1;m.words=x;var A=s.selectAll('text').data(m.words,function(D){return D.text.toLowerCase()});A.transition().duration(1e3).attr('transform',function(D){return'translate('+[D.x,D.y]+')rotate('+D.rotate+')'}).style('font-size',function(D){return D.size+'px'}),A.enter().append('text').attr('text-anchor','middle').attr('transform',function(D){return'translate('+[D.x,D.y]+')rotate('+D.rotate+')'}).style('font-size','1px').transition().duration(1e3).style('font-size',function(D){return D.size+'px'}),A.style('font-family',function(D){return D.font}).style('fill',function(D){return n(D.text.toLowerCase())}).text(function(D){return D.text});var B=r.append('g').attr('transform',s.attr('transform')),C=B.node();A.exit().each(function(){C.appendChild(this)}),B.transition().duration(1e3).style('opacity',1e-6).remove(),s.transition().delay(1e3).duration(750).attr('transform','translate('+[o>>1,p>>1]+')scale('+z+')')}var m=this,n=g.scale.category20b(),o=this.width,p=this.height,q=g.select('#'+this._id).append('svg').attr('width',o).attr('height',p).style('display','block'),r=q.append('g'),s=q.append('g').attr('transform','translate('+[o>>1,p>>1]+')'),t=m.module.getConfiguration('fromTo')?_Mathmax(-90,_Mathmin(90,+m.module.getConfiguration('fromTo')[0])):0,u=m.module.getConfiguration('fromTo')?_Mathmax(-90,_Mathmin(90,+m.module.getConfiguration('fromTo')[1])):0,v=0<m.module.getConfiguration('orientation')?m.module.getConfiguration('orientation'):1;m.layout?(m.layout.rotate(function(){return~~(Math.random()*v)*t-u}).size([o,p]).on('end',l),m.layout.stop().start()):m.layout=g.layout.cloud().timeInterval(10).rotate(function(){return~~(Math.random()*v)*t-u}).size([o,p]).fontSize(function(x){return m.fontSize(+x.value)}).text(function(x){return x.key}).on('end',l)}}),j});
