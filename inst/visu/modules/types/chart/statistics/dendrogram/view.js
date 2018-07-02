'use strict';define(['jquery','modules/default/defaultview','src/util/datatraversing','src/util/api','src/util/util','src/util/ui','lib/jit/jit-custom','src/util/tree','src/util/color'],function(a,b,c,d,f,g,h,j,k){'use strict';function l(){this._value={}}function m(n,o,p){Array.isArray(p)&&(n[o]=p)}return a.extend(!0,l.prototype,b,{highlightNode(){},init(){this.dom||(this._id=f.getNextUniqueId(),this.dom=g.getSafeElement('div').attr('id',this._id),this.module.getDomContent().html(this.dom)),this.dom&&this.dom.empty(),this._rgraph&&delete this._rgraph,this._highlighted={},this.updateOptions(),this.resolveReady()},onResize(){this.createDendrogram(),this.updateDendrogram()},getIdHash(n){if(n&&(n.id&&(this._idHash[n.id]=n),Array.isArray(n.children)))for(var o=0;o<n.children.length;o++)this.getIdHash(n.children[o])},blank:{tree(){this._value={},this.updateTree()},newTree(){this._tree=null,this._value={},this.updateTree()},data(){this._data=null,this._value={},this.updateTree()}},update:{tree(n){this._value=a.extend(!0,new DataObject({}),n.get()),this.updateTree()},newTree(n){this._tree=n.get(),this.doAnnotation()},data(n){this._data=n.get(),this.doAnnotation()}},doAnnotation(){if(this._tree){var n=this.getOptions();this._value=j.annotateTree(this._tree,this._data||[],n),this.updateTree()}},updateTree(){if(this._idHash={},this.getIdHash(this._value),!this._rgraph){if(!document.getElementById(this._id))return;this.createDendrogram()}this.updateDendrogram()},getOptions(){var n={},o=this.module.getConfiguration;return m(n,'$color',o('jpathColor')),m(n,'$dim',o('jpathSize')),m(n,'$type',o('jpathShape')),m(n,'label',o('jpathLabel')),n},updateDendrogram(){this._rgraph&&(this._rgraph.loadJSON(this._value),this._value&&(h.Graph.Util.each(this._rgraph.graph,(n)=>{n.name=n.data&&n.data.label?n.data.label:''}),this._rgraph.refresh()))},updateOptions(){var n=this.module.getConfiguration;this._options={nodeSize:n('nodeSize')||1,nodeColor:k.getColor(n('nodeColor'))||'yellow'}},createDendrogram(){var n=this.module.vars_out();if(n&&0!=n.length){var o=(s)=>{this.module.controller.onHover(this._idHash[s.id])},p=(s)=>{this.module.controller.onClick(this._idHash[s.id])},q=this.module.getConfiguration;this.dom.empty();this._options;this._rgraph=new h.RGraph({injectInto:this._id,levelDistance:50,background:{CanvasStyles:{strokeStyle:k.getColor(q('strokeColor'))||'#333',lineWidth:q('strokeWidth')||'1'}},Navigation:{enable:!0,panning:!0,zooming:50},Edge:{overridable:!0,color:k.getColor(q('edgeColor'))||'green',lineWidth:q('edgeWidth')||0.5},Label:{overridable:!0,type:'Native',size:q('labelSize')||10,family:'sans-serif',textAlign:'center',textBaseline:'alphabetic',color:k.getColor(q('labelColor'))||'black'},Node:{CanvasStyles:{shadowColor:'rgb(0, 0, 0)',shadowBlur:0},overridable:!0,type:q('nodeType')||'circle',color:k.getColor(q('nodeColor'))||'yellow',dim:q('nodeSize')||3,height:3,width:3,lineWidth:10},Events:{getRgraph(s){var t=s.srcElement.id.replace(/-.*/,'');return h.existingInstance[t]?h.existingInstance[t]:(t=s.srcElement.parentElement.id.replace(/-.*/,''),h.existingInstance[t])?h.existingInstance[t]:void 0},enable:!0,enableForEdges:!0,type:'Native',onClick(s,t,u){if(s){var w,v=this.getRgraph(u);if(s.collapsed)w=s;else if(s.ignore)for(w=s.getParents()[0];w.ignore;)w=w.getParents()[0];else s.nodeFrom&&(w=s.nodeFrom._depth>s.nodeTo._depth?s.nodeFrom:s.nodeTo,s.nodeFrom.collapsed&&(w=s.nodeFrom),s.nodeTo.collapsed&&(w=s.nodeTo));w?w.collapsed?v.op.expand(w,{type:'animate',duration:500,hideLabels:!1,transition:h.Trans.Quart.easeInOut}):v.op.contract(s.nodeFrom,{type:'animate',duration:500,hideLabels:!0,transition:h.Trans.Quart.easeInOut}):!s.ignore&&p(s)}},onMouseEnter(s,t,u){o(s),this.getRgraph(u).canvas.getElement().style.cursor='pointer'},onMouseLeave(s,t,u){this.getRgraph(u).canvas.getElement().style.cursor=''}},Tips:{enable:!1}}),h.existingInstance=h.existingInstance||{},h.existingInstance[this._id]=this._rgraph}},_doHighlight(n,o){if(!(this._highlighted[n]&&o)&&(this._highlighted[n]||o))for(var p in this._highlighted[n]=o,this._currentValue._atoms)-1<this._currentValue._atoms[p].indexOf(n)&&d.highlight(p,o)}}),l});
