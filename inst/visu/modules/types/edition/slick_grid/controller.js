'use strict';define(['modules/default/defaultcontroller','src/util/util','lodash','src/util/api','src/util/typerenderer'],function(a,b,c,d,e){'use strict';function f(){}return $.extend(!0,f.prototype,a),f.prototype.moduleInformation={name:'Slick Grid',description:'Table editor based on SlickGrid',author:'Daniel Kostro',date:'14.10.2014',license:'MIT',cssClass:'slickgrid'},f.prototype.configurationStructure=function(){var g=this,h=e.getRendererComboOptions(),i=this.module.model.getjPath('row',!1);return{groups:{group:{options:{type:'list',multiple:!1},fields:{slickCheck:{type:'checkbox',title:'Slick options',options:{editable:'Selectable / Editable',enableAddRow:'Enable add row',autoEdit:'Enable Auto Edit',forceFitColumns:'Force fit Columns',rowNumbering:'Show row number when scrolling',oneUncollapsed:'Maximum One group uncollapsed (per level)',filterColumns:'Enable search header',keepSelected:'Keep selected elements when filtering',backToTop:'Don\'t remember scroll position',forgetLastSelected:'Don\'t remember last selected rows',forgetLastActive:'Don\'t remember last active cell',highlightScroll:'Scroll to highlighted line',collapseGroup:'Collapse groups on start',ignoreMyHighlights:'Ignore highlights from myself'},default:['enableCellNavigation','rowNumbering','forceFitColumns','highlightScroll','forgetLastActive']},copyPaste:{type:'checkbox',title:'Allow copy paste',options:{active:'Yes'},displaySource:{active:'cp'},default:[]},copyPasteOptions:{type:'checkbox',title:'Copy paste options',options:{readOnly:'Read only',newRows:'Paste to new rows when overflowing',noAutoFocus:'Disable auto focus when row selection changes'},displayTarget:['cp'],default:['newRows']},autoColumns:{type:'checkbox',title:'Auto Columns',options:{remove:'Remove row',select:'Select row',reorder:'Reorder'},default:[]},toolbar:{type:'checkbox',title:'Toolbar options',options:{add:'New row',update:'Update row',remove:'Remove row',showHide:'Show/hide column'},default:[]},colorjpath:{type:'combo',title:'Color jPath',options:i,extractValue:b.jpathToArray,insertValue:b.jpathToString},"slick.defaultColumnWidth":{type:'float',title:'Default Column Width'},"slick.rowHeight":{type:'text',title:'Row Height'},"slick.headerRowHeight":{type:'float',title:'Header row height',default:30},"slick.selectionModel":{type:'combo',title:'Selection',options:[{key:'row',title:'Row Selection Model'},{key:'cell',title:'Cell Selection Model'}],default:'row'},idProperty:{type:'text',title:'Id property',default:''},filterType:{type:'combo',title:'Filter script source',options:[{key:'pref',title:'Define in preferences'},{key:'invar',title:'From input variable'}],displaySource:{pref:'p',invar:'i'},default:'pref'},filterRow:{type:'jscode',title:'Filter',default:'// Documentation: https://github.com/NPellet/visualizer/blob/46b40ca86345f8fa313563bf9c6ecb80ba323101/src/modules/types/edition/slick_grid/view.js#L1695-L1735',displayTarget:['p']},customJpaths:{type:'text',title:'Custom jpaths',default:''}}},cols:{options:{type:'table',multiple:!0,title:'Columns'},fields:{name:{type:'text',title:'Column ID (mandatory)'},jpath:{type:'combo',title:'jPath',options:i,extractValue:b.jpathToArray,insertValue:b.jpathToString},editor:{type:'combo',title:'Editor',default:'none',options:[{key:'none',title:'None'},{key:'auto',title:'Based on type'},{key:'string',title:'String'},{key:'number',title:'Number'},{key:'boolean',title:'Boolean'},{key:'color',title:'Color'},{key:'date',title:'Date'},{key:'longtext',title:'Long Text'},{key:'select',title:'Select'}]},forceType:{type:'combo',title:'Force type',default:'',options:h},formatter:{type:'combo',title:'Formatter',options:[{key:'typerenderer',title:'Type Renderer'}],default:'typerenderer'},copyFormatter:{type:'combo',title:'Copy formatter',options:[{key:'default',title:'Default'},{key:'OCLToMolfile',title:'OCL to molfile'}],default:'default'},visibility:{type:'combo',title:'Visibility',options:[{key:'both',title:'Main and Popup'},{key:'main',title:'Main'},{key:'popup',title:'Popup'}],default:'both'},rendererOptions:{type:'text',title:'Renderer Options',default:''},editorOptions:{type:'text',title:'Editor options',default:''},width:{type:'text',title:'Width'},minWidth:{type:'text',title:'Min Width'},maxWidth:{type:'text',title:'Max Width'},hideColumn:{type:'checkbox',title:'Hide column at init',options:{yes:'Yes'},default:[]}}},actionCols:{options:{type:'table',multiple:!0,title:'Action columns'},fields:{name:{type:'text',title:'Column ID (mandatory)'},tooltip:{type:'text',title:'Tooltip'},icon:{type:'text',title:'Icon'},backgroundColor:{type:'spectrum',title:'Background Color',default:[255,255,255,0]},color:{type:'spectrum',title:'Color',default:[0,0,0,1]},action:{type:'text',title:'Action to send'},position:{type:'combo',title:'Position',options:[{key:'begin',title:'Begin'},{key:'end',title:'End'}],default:'end'},clickMode:{type:'combo',title:'Click mode',options:[{key:'text',title:'Text or icon'},{key:'background',title:'Background'}],default:'text'},width:{type:'text',title:'Width'},minWidth:{type:'text',title:'Min Width'},maxWidth:{type:'text',title:'Max Width'}}},groupings:{options:{type:'table',multiple:!0,title:'Groupings'},fields:{getter:{type:'combo',title:'jPath',options:i,extractValue:b.jpathToArray,insertValue:b.jpathToString},groupName:{type:'text',title:'Group Name'}}},actionOutButtons:{options:{type:'table',multiple:!0,title:'Action out buttons'},fields:{actionName:{type:'text',title:'Action name'},buttonTitle:{type:'text',title:'Button title'}}},data:{options:{type:'list',title:'Data'},fields:{saveInView:{type:'checkbox',title:'Save in view',options:{yes:'yes'},displaySource:{yes:'saveInView'},default:[]},varname:{type:'text',title:'Variable name',default:'',displayTarget:['saveInView']},data:{type:'jscode',title:'Data',default:'[]',displayTarget:['saveInView']}}}}}},f.prototype.onBeforeSave=function(g){var h=g.module_specific_config[0].groups.data[0].varname[0],i=g.module_specific_config[0].groups.data[0].saveInView[0].length,j=g.vars_in[0].groups.group[0],k=j[0];h&&i?k&&k.name?k.name=h:j.push({rel:'list',name:h}):!i&&(g.vars_in[0].groups.group[0]=j.filter(function(l){return l.name!==h}))},f.prototype.configAliases={colorjPath:['groups','group',0,'colorjpath',0],slickCheck:['groups','group',0,'slickCheck',0],copyPasteOptions:['groups','group',0,'copyPasteOptions',0],copyPaste:['groups','group',0,'copyPaste',0],"slick.rowHeight":['groups','group',0,'slick.rowHeight',0],"slick.headerRowHeight":['groups','group',0,'slick.headerRowHeight',0],"slick.selectionModel":['groups','group',0,'slick.selectionModel',0],"slick.defaultColumnWidth":['groups','group',0,'slick.defaultColumnWidth',0],idProperty:['groups','group',0,'idProperty',0],filterType:['groups','group',0,'filterType',0],filterRow:['groups','group',0,'filterRow',0],cols:['groups','cols',0],actionCols:['groups','actionCols',0],groupings:['groups','groupings',0],actionOutButtons:['groups','actionOutButtons',0],toolbar:['groups','group',0,'toolbar',0],autoColumns:['groups','group',0,'autoColumns',0],customJpaths:['groups','group',0,'customJpaths',0],saveInView:['groups','data',0,'saveInView',0],data:['groups','data',0,'data',0],varname:['groups','data',0,'varname',0]},f.prototype.references={row:{label:'Row'},list:{label:'Table',type:'array'},script:{label:'Filter script',type:'string'},rows:{label:'Row selection',type:'array'}},f.prototype.variablesIn=['list','script'],f.prototype.actionsIn=$.extend({},a.actionsIn,{hoverRow:'Mimic row hover',selectRow:'Mimic cell click',selectRows:'Set selected rows',unselectRows:'Unselect rows from current selection',scrollToRow:'Scroll to row',unsetActiveRow:'Unset active row',selectRowsAdd:'Add selected rows to current selection',addRow:'Add new row(s)',appendRow:'Append new row(s)',prependRow:'Prepend new row(s)',showColumn:'Show a column',hideColumn:'Hide a column',rerender:'Rerender the grid'}),f.prototype.events={onSelect:{label:'Row clicked',refVariable:['row'],refAction:['row']},onDoubleClick:{label:'Row double clicked',refVariable:['row'],refAction:['row']},onHover:{label:'Row hovered',refVariable:['row'],refAction:['row']},onRowChange:{label:'Row changed',refVariable:['row'],refAction:['row']},onRowNew:{label:'Row added',refVariable:['row'],refAction:['row']},onRowsDelete:{label:'Rows deleted',refVariable:['rows'],refAction:['rows']},onRowActive:{label:'Row activated',refVariable:['row'],refAction:['row']},onRowsSelect:{label:'Rows selected',refVariable:['rows'],refAction:['rows']},onLastSelectedRow:{label:'Last selected row',refVariable:['row'],refAction:['row']}},f.prototype.onLastSelectedRow=function(g,h){this.setVarFromEvent('onLastSelectedRow','row','list',[g]),this.sendActionFromEvent('onLastSelectedRow','row',h)},f.prototype.unselectLastRow=function(){this.createDataFromEvent('onLastSelectedRow','row'),this.sendActionFromEvent('onRowActive','row',null)},f.prototype.onRowsSelected=function(g){g=g.filter(function(h){return!!h}),this.createDataFromEvent('onRowsSelect','rows',g),this.sendActionFromEvent('onRowsSelect','rows',g)},f.prototype.onHover=function(g,h){var i=h[this.module.view.idPropertyName];this.lastHoveredItemId===i||(this.lastHoveredItemId=i,this.setVarFromEvent('onHover','row','list',[g]),this.sendActionFromEvent('onHover','row',h))},f.prototype.onClick=c.throttle(function(g,h){this.lastClickedItem=h,this.setVarFromEvent('onSelect','row','list',[g]),this.sendActionFromEvent('onSelect','row',h)},250,{trailing:!1}),f.prototype.unselectRow=function(){this.createDataFromEvent('onSelect','row'),this.createDataFromEvent('onRowActive','row')},f.prototype.onDoubleClick=function(g,h){this.setVarFromEvent('onDoubleClick','row','list',[g]),this.sendActionFromEvent('onDoubleClick','row',h)},f.prototype.onActive=function(g,h){this.setVarFromEvent('onRowActive','row','list',[g]),this.sendActionFromEvent('onRowActive','row',h)},f.prototype.onRowChange=function(g,h){this.setVarFromEvent('onRowChange','row','list',[g]),this.sendActionFromEvent('onRowChange','row',h)},f.prototype.onRowNew=function(g,h){this.setVarFromEvent('onRowNew','row','list',[g]),this.sendActionFromEvent('onRowNew','row',h)},f.prototype.onRowsDelete=function(g){this.createDataFromEvent('onRowsDelete','rows',g),this.sendActionFromEvent('onRowsDelete','rows',g)},f.prototype.export=function(){return this.module.view.exportToTabDelimited()},f.prototype.sendActionButton=function(g,h){d.doAction(g,h)},f});
