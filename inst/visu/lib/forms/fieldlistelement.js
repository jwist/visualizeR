'use strict';define(['./fieldelement'],function(a){'use strict';var b=function(){};return b.defaultOptions={},b.prototype=new a,b.prototype.makeDuplicator=function(){var c=this,d=$('<span>+</span>').addClass('form-duplicator form-duplicator-add').on('click',function(){c.groupElement.duplicateFieldElement(c).done(function(){c.groupElement.updateDom()})}),e=$('<span>-</span>').addClass('form-duplicator form-duplicator-remove').on('click',function(){c.groupElement.removeFieldElement(c),c.groupElement.updateDom()});return this.duplicatorDom=$('<div />').addClass('form-duplicator-wrapper').append(d).append(e),this.duplicatorDom},b});