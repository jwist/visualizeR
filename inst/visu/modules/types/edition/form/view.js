'use strict';define(['jquery','modules/default/defaultview','forms/form'],function(a,b,c){'use strict';function d(){}return a.extend(!0,d.prototype,b,{init:function(){this.dom=a('<div />'),this.module.getDomContent().html(this.dom),this.callback=null},inDom:function(){var k,g=this,h=this.module.getConfiguration('structure'),i=this.module.getConfiguration('tpl_file'),j=this.module.getConfiguration('tpl_html');try{k=JSON.parse(h)}catch(n){return}if(this.module.getConfigurationCheckbox('options','defaultTpl')){var l=new c({});return l.init({onValueChanged:g.onChange.bind(g)}),l.setStructure(k),l.onStructureLoaded().done(function(){l.fill()}),void l.onLoaded().done(function(){g.dom.html(l.makeDom(1)),l.inDom()})}var m;m=i?a.get(i,{}):j,a.when(m).done(function(n){var o=new c({});o.init({onValueChanged:g.onChange.bind(g)}),o.setStructure(k),o.onStructureLoaded().done(function(){o.fill({})}),o.onLoaded().done(function(){o.setTpl(n),g.dom.html(o.makeDomTpl()),o.inDom(),g.resolveReady()})})},onChange:function(g,h){this.module.controller.dataChanged(h)}}),d});
