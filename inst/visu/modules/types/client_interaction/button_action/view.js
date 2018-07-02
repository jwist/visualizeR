'use strict';define(['jquery','modules/default/defaultview','forms/button','src/util/ui','src/util/typerenderer'],function(a,b,c,d,f){'use strict';function g(){}var h;return a.extend(!0,g.prototype,b,{onResize:function(){var j=this;this.maskOpacity=this.module.getConfiguration('maskOpacity');var k;this.dom=a('<div></div>').css({width:'100%',height:'100%'});var l=this.module.getConfiguration('content'),m=this.module.getConfiguration('contentType'),n=this.module.getConfiguration('toggle');k='toggle'===n&&'off'===this.module.getConfiguration('startState')?this.module.getConfiguration('offLabel'):'toggle'===n&&'on'===this.module.getConfiguration('startState')?this.module.getConfiguration('onLabel'):this.module.getConfiguration('label'),h=function(r,s){var t=Promise.resolve(!0);j.module.getConfigurationCheckbox('askConfirm','yes')&&(t=d.confirm(j.module.getConfiguration('confirmText'),j.module.getConfiguration('okLabel'),j.module.getConfiguration('cancelLabel')));var u=j.module.getConfiguration('toggle');t.then(function(v){v&&(s||'toggle'!==u||l?'toggle'===u&&!l&&(o.setTitle(j.module.getConfiguration('onLabel')),j.setButtonColor(j.module.getConfiguration('onColor'))):(o.setTitle(j.module.getConfiguration('offLabel')),j.setButtonColor(j.module.getConfiguration('offColor'))),j.module.controller.onClick(s))})};var o=new c(k,h,{color:'Grey',disabled:!1,checkbox:'click'!==this.module.getConfiguration('toggle'),value:'on'===this.module.getConfiguration('startState')});this.module.getDomContent().html(this.dom);var n=this.getButtonType();if('button'===n)this.dom.html(o.render().css({position:'absolute',bottom:3}));else if('imageUrl'===n){var p=a('<div><img src="'+l+'"/></div>');p.find('img').css({width:this.width,height:this.height,objectFit:'contain'}),p.css({cursor:'pointer'}),this.dom.html(p),this.dom.css({overflow:'hidden'}),this.dom.on('click',h)}else if('svg'===n){var p=a('<div>');p.append(l),p.css('cursor','pointer'),f.render(p,{type:'svg',value:l}),p.on('click',h),this.dom.html(p)}else if('content'===n){var p=a('<div>');p.append(l),p.css('cursor','pointer'),p.on('click',h),this.dom.html(p)}this.button=o,'button'!==n&&(this.$div=p,this.$mask=a('<div style="position: absolute; width:100%; height: 100%; background-color: rgba(255, 255, 255, 0); pointer-events: none"></div>'),this.dom.prepend(this.$mask)),'toggle'!==n||l||j.setButtonColor(j.module.getConfiguration('offColor')),this.dom.attr('title',j.module.getConfiguration('title')),this.resolveReady()},activate:function(){var j=this.getButtonType();'button'===j?this.activateButton():this.activateMask()},deactivate:function(){var j=this.getButtonType();'button'===j?this.deactivateButton():this.deactivateMask()},toggle:function(){var j=this.getButtonType();'button'===j?this.toggleButton():this.toggleMask()},activateMask(){this.$mask.css({backgroundColor:'rgba(255, 255, 255)',opacity:0}),this.dom.off('click',h),this.dom.on('click',h),this.$div.css({cursor:'pointer'})},deactivateMask(){this.$mask.css({backgroundColor:'rgba(255, 255, 255)',opacity:this.maskOpacity}),this.dom.off('click',h),this.$div.css({cursor:'auto'})},toggleMask(){this.$mask.css('opacity')==this.maskOpacity?this.activateMask():this.deactivateMask()},deactivateButton(){var i=this.dom.find('button');i.attr('disabled',!0),i.css({cursor:'auto',pointerEvent:'none'})},activateButton(){var i=this.dom.find('button');i.removeAttr('disabled'),i.css({cursor:'pointer',pointerEvent:'auto'})},toggleButton(){this.dom.find('button').attr('disabled')?this.activateButton():this.deactivateButton()},setButtonColor:function(j){j='rgba('+j.join(',')+')',this.button.setColorCss(j)},getButtonType:function(){var j=this.module.getConfiguration('contentType');if('content'===j){var k=this.module.getConfiguration('content');if(!k)return'button'}return j},onActionReceive:{activate:function(){this.activate()},deactivate:function(){this.deactivate()},toggle:function(){this.toggle()}}}),g});
