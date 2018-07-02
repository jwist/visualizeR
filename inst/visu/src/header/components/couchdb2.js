'use strict';define(['jquery','lodash','src/util/api','src/util/ui','src/header/components/default','src/util/versioning','forms/button','src/util/util','forms/form','src/util/couchdbAttachments','src/util/uploadUi','src/util/debug','file-saver','lib/couchdb/jquery.couch','fancytree','components/ui-contextmenu/jquery.ui-contextmenu.min','jquery-ui/ui/widgets/autocomplete'],function(c,h,j,k,o,p,q,r,s,t,u,w){'use strict';function z(){}function A(H,I){for(var J={},K=0;K<H.length;K++){var L=H[K],M=B(L);c.extend(!0,J,M)}return C(J,'',I)}function B(H){for(var I=H.value.flavors,J={},K=J,L=0;L<I.length-1;L++)K=K[I[L]]={__folder:!0};return K[I[I.length-1]]={__name:I.join(':'),__doc:H.doc,__data:H.value.data,__view:H.value.view,__meta:H.value.meta,__public:H.value.isPublic},J}function C(H,I,J){var K,L;for(var M in I.length?K=L=[]:(L=[{key:J,title:J,folder:!0,children:[]}],K=L[0].children,I=J+':'),H)if(0!==M.indexOf('__')){var N=H[M],O=I+M,P={title:M,key:O};N.__folder?(N.__name&&K.push({doc:N.__doc,hasData:N.__data,hasView:N.__view,hasMeta:N.__meta,isPublic:N.__public,lazy:!0,title:M,key:O}),P.folder=!0,P.children=C(N,O+':',J)):(P.lazy=!0,P.doc=N.__doc,P.hasData=N.__data,P.hasView=N.__view,P.hasMeta=N.__meta,P.isPublic=N.__public),K.push(P)}return L}function D(H,I){for(var M,J=H.join(':'),K=0,L=I.length;K<L;K++)if(M=I[K].value.flavors.join(':'),J===M)return!0;return!1}var E=r.getNextUniqueId(),F=/^[a-zA-Z0-9]+$/,G=52428800;return r.inherits(z,o,{initImpl:function(){var I=this;c(document).keydown(function(K){if((K.ctrlKey||K.metaKey)&&!K.altKey&&83==K.which){K.preventDefault();var L=p.lastLoaded.view.url,M=/\/([^/]+)\/view\.json$/,N=M.exec(L),O=N[1],P=[];if(!I.ftree)return void k.showNotification('Cannot save, couchdb tree not loaded yet','info');if(I.ftree.visit(function(R){P.push(R)}),P=P.filter(function(R){return!R.folder&&R.data.doc&&R.data.doc._id===O}),!P.length)return;var Q=h.template('<table>\n    <tr>\n        <td style="vertical-align: top;"><b>Document id</b></td>\n        <td><%= doc._id %></td>\n    </tr>\n    <tr>\n        <td style="vertical-align: top;"><b>Flavor</b></td>\n        <td><%= flavor %></td>\n    </tr>\n    <tr>\n        <td style="vertical-align: top;"><b>Name</b></td>\n        <td><% print(flavors[flavors.length-1]) %></td>\n    </tr>\n    <tr>\n        <td style="vertical-align: top;"><b>Location</b></td>\n        <td><li><% print(flavors.join(\'</li><li>\')) %></li></td>\n    </tr>\n</table>');k.dialog(Q({doc:P[0].data.doc,flavor:I.flavor,flavors:P[0].data.doc.flavors[I.flavor]}),{width:'400px',buttons:{"Save View":function(){c(this).dialog('close'),I.saveNode('View',P[0]).then(function(){k.showNotification('View saved','success')},function(S){k.showNotification(I.getErrorContent(S.status),'error')})},"Save Data":function(){c(this).dialog('close'),I.saveNode('Data',P[0]).then(function(){k.showNotification('Data saved','success')},function(S){k.showNotification(I.getErrorContent(S.status),'error')})},"Save Both":function(){c(this).dialog('close'),I.saveNode('View',P[0]).then(function(){k.showNotification('View saved','success'),I.saveNode('Data',P[0]).then(function(){k.showNotification('Data saved','success')},function(S){k.showNotification(I.getErrorContent(S.status),'error')})},function(S){k.showNotification(I.getErrorContent(S.status),'error')})}}})}}),this.ok=this.loggedIn=this.ready=!1,this.options.beforeUrl?this.beforeUrl():this.ready=!0,this.id=r.getNextUniqueId(),this.options.loginMethods=this.options.loginMethods||['couchdb'],this.options.url&&(c.couch.urlPrefix=this.options.url.replace(/\/$/,'')),this.url=c.couch.urlPrefix;var J=this.db=this.options.database||'visualizer';this.dbUrl=this.url+'/'+J,this.database=c.couch.db(J),c.ui.fancytree.debugLevel=0,this.checkDatabase()},beforeUrl:function(){var I=this,J=this.options.beforeUrl;c.ajax({type:'GET',url:J,success:function(){w.info('CouchDB: beforeUrl success'),I.ready=!0},error:function(L){w.info('CouchDB: beforeUrl error',L),I.ready=!0}})},getErrorContent:function(I){var J;return J='number'==typeof I?10===I?'Colons are not allowed in the name.':11===I?'Please select a folder':12===I?'A folder with this name already exists.':20===I?'Document already has this flavor':21===I?'Path already used by another document':401===I?'Wrong username or password.':409===I?'Conflict. An entry with the same name already exists.':503===I?'Service Unavailable.':'Unknown error.':I,J},showError:function(I,J){var K='red';2===J&&(K='green');var L=this.getErrorContent(I,J);this.errorP.text(L).css('color',K).show().delay(3e3).fadeOut()},getFormContent:function(I){return c('#'+this.cssId(I)).val().trim()},setFormContent:function(I,J){c('#'+this.cssId(I)).val(J)},checkDatabase:function(){var I=this;c.couch.info({success:function(){I.ok=!0},error:function(K,L,M){w.error('CouchDB header : database connection error. Code:'+K+'.',M)}})},cssId:function(I){return'ci-couchdb-header-'+this.id+'-'+I},changeFlavor:function(I){return F.test(I)?void(this.flavor=I,this.setFormContent('flavor-input',I),this.loadFlavor()):this.showError('Flavor name must be alphanumeric.')},_onClick:function(){this.ok&&this.ready?(this.setStyleOpen(this._open),this._open?(this.createMenu(),this.errorP.hide(),this.open()):this.close()):this.ok?k.showNotification('Couchdb button not ready'):(this.checkDatabase(),w.error('CouchDB header : unreachable database.'))},createMenu:function(I){if(this.$_elToOpen||(this.$_elToOpen=c('<div>').css('width',560),this.errorP=c('<p id="'+this.cssId('error')+'">'),I=!0),I){var J=this;c.couch.session({success:function(L){null===L.userCtx.name?J.openMenu('login'):(J.loggedIn=!0,J.username=L.userCtx.name,J.openMenu('tree'))}})}else this.loggedIn?this.openMenu('tree'):this.openMenu('login')},openMenu:function(I){switch(I){case this.lastMenu:return;case'tree':this.$_elToOpen.html(this.getMenuContent()),this.lastMenu='tree';break;case'login':this.$_elToOpen.html(this.getLoginForm()),this.lastMenu='login';break;default:}},load:function(I,J){var K={};I.data.hasData&&(K.data={url:this.database.uri+I.data.doc._id+'/data.json'+(J?'?rev='+J:'')}),I.data.hasView&&(K.view={url:this.database.uri+I.data.doc._id+'/view.json'+(J?'?rev='+J:'')}),p.switchView(K,!0,{withCredentials:!0}),this.lastKeyLoaded=I.key},saveMeta:function(I){var J=this,K=J.currentDocument,L=K.data.doc;I&&I.keywords&&I.keywords.value&&(L.keywords=I.keywords.value),L._attachments['meta.json']={content_type:'application/json',data:btoa(unescape(encodeURIComponent(JSON.stringify(I))))},J.database.saveDoc(L,{success:function(N){L._rev=N.rev,K.data.hasMeta=!0,K.children&&K.load(!0),J.showError('meta saved.',2)},error:function(){J.showError.apply(J,arguments)}})},saveNode:function(I,J){var K=this;if(!J){var L='Cannot save node (undefined)';return this.showError(L),Promise.reject(L)}var M=J.data.doc,N=p['get'+I+'JSON']();return M._attachments[I.toLowerCase()+'.json']={content_type:'application/json',data:btoa(unescape(encodeURIComponent(N)))},Promise.resolve(K.database.saveDoc(M,{success:function(){J.data['has'+I]=!0,J.children&&J.load(!0),K.showError(I+' saved.',2)},error:function(){K.showError.apply(K,arguments)}}))},save:function(I,J){if(!(1>J.length)){if(-1!==J.indexOf(':'))return this.showError(10);var K=p['get'+I+'JSON'](),L=this.lastNode;if('undefined'==typeof L)return this.showError(11);var N,M=L.node.getChildren();if(M)for(var O=0;O<M.length;O++)if(M[O].title===J){N=M[O];break}var P,Q=this;if(N&&!N.folder)return P=N.data.doc,P._attachments[I.toLowerCase()+'.json']={content_type:'application/json',data:btoa(unescape(encodeURIComponent(K)))},Promise.resolve(Q.database.saveDoc(P,{success:function(){N.data['has'+I]=!0,N.children&&N.load(!0),Q.showError(I+' saved.',2)},error:function(){Q.showError.apply(Q,arguments)}}));var R={},S=[];L.key&&(S=L.node.key.split(':'),S.shift()),S.push(J),R[this.flavor]=S,P={flavors:R,name:this.username,_attachments:{}},P._attachments[I.toLowerCase()+'.json']={content_type:'application/json',data:btoa(unescape(encodeURIComponent(K)))},this.database.saveDoc(P,{success:function(U){P._id=U.id,P._rev=U.rev;var V={doc:P,lazy:!0,title:J,key:L.node.key+':'+J};V['has'+I]=!0,L.node.addNode(V),L.node.expanded||L.node.toggleExpanded(),Q.showError(I+' saved.',2)}})}},mkdir:function(I){if(!(1>I.length)){if(-1!==I.indexOf(':'))return this.showError(10);var J=this.lastNode;if('undefined'==typeof J)return this.showError(11);var K=J.node.folder?J.node:J.node.parent;var L=K.getChildren();if(L)for(var M=0;M<L.length;M++)if(L[M].title===I&&L[M].folder)return this.showError(12);var N=K.addNode({folder:!0,title:I,key:K.key+':'+I});K.expanded||K.toggleExpanded(),c(N.li).find('.fancytree-title').trigger('click')}},login:function(I,J){var K=this;c.couch.login({name:I,password:J,success:function(){K.loggedIn=!0,K.username=I,K.openMenu('tree')},error:function(){K.showError.apply(K,arguments)}})},logout:function(){var I=this,J=Promise.resolve(c.couch.logout({success:function(){I.loggedIn=!1,I.username=null,I.openMenu('login')}}));J.catch(function(K){401===K.status&&(window.location=window.location.href)})},renderLoginMethods:function(){function I(){return J.login(J.getFormContent('login-username'),J.getFormContent('login-password')),!1}for(var J=this,K=this.openLogin.bind(this),L=0;L<this.options.loginMethods.length;L++)switch(this.options.loginMethods[L]){case'google':c('<a href=" '+this.url+'/auth/google">Google login</a><br/>').appendTo(this.loginForm).on('click',K);break;case'github':c('<a href=" '+this.url+'/auth/github">Github login</a><br/>').appendTo(this.loginForm).on('click',K);break;case'facebook':c('<a href=" '+this.url+'/auth/facebook">Facebook login</a><br/>').appendTo(this.loginForm).on('click',K);break;case'couchdb':this.loginForm.append('<div> Couchdb Login </div>'),this.loginForm.append('<label for="'+this.cssId('login-username')+'">Username </label><input type="text" id="'+this.cssId('login-username')+'" /><br>'),this.loginForm.append('<label for="'+this.cssId('login-password')+'">Password </label><input type="password" id="'+this.cssId('login-password')+'" /><br><br>'),this.loginForm.append(new q('Login',I,{color:'green'}).render()),this.loginForm.bind('keypress',function(M){if(13===M.charCode)return I()});}},openLogin:function(I){I.preventDefault();var J=I.currentTarget.href,K=window.open(J+'?close=true','CI_Couch_Login','menubar=no');clearInterval(this._loginWinI);var L=this;this._loginWinI=window.setInterval(function(){K.closed&&(L.createMenu(!0),clearInterval(L._loginWinI))},100)},getLoginForm:function(){var I=this.loginForm=c('<div>');return I.append('<h1>Login</h1>'),this.renderLoginMethods(),I.append(this.errorP),I},getMenuContent:function(){function I(){var Q=K.getFormContent('flavor-input');K.flavor!==Q&&K.changeFlavor(Q)}var K=this,L=this.menuContent=c('<div>'),M=c('<div>').append(c('<p>').css('display','inline-block').css('width','50%').append('Click on an element to select it. Double-click to load.')).append(c('<p>').append('Logged in as '+this.username+' ').css('width','50%').css('text-align','right').css('display','inline-block').append(c('<a>Logout</a>').on('click',function(){K.logout()}).css({color:'blue',"text-decoration":'underline',cursor:'pointer'})));L.append(M);var N=c('<input type="text" value="'+this.flavor+'" id="'+this.cssId('flavor-input')+'">');this.database.view('flavor/list',{success:function(R){K.flavorList=R.rows.length?R.rows[0].value:['default'],N.autocomplete({appendTo:'#ci-visualizer',minLength:0,source:K.flavorList}).on('autocompleteselect',function(S,T){var U=T.item.value;K.flavor!==U&&K.changeFlavor(U),N.blur()}).on('keypress',function(S){13===S.keyCode&&(I(),N.blur())})},error:function(R){w.warn(R)},key:this.username}),L.append(c('<p><span>Flavor : </span>').append(N).append(new q('Switch',I,{color:'red'}).setTooltip('Switch flavor!').render()));c('<div>').attr('id',this.cssId('tree')).css({"overflow-y":'auto',height:'200px',width:'300px'}).appendTo(L);return this.makePublicButton=new q('Make Public',function(){k.confirm('You are about to make your view public. This action is irreversible. It will enable anybody to access the saved view and data. Do you want to proceed?','Proceed','Cancel').then(function(Q){if(Q&&K.currentDocument){var R=K.currentDocument,S=R.data.doc;S.isPublic=!0,K.database.saveDoc(S,{success:function(U){S._rev=U.rev,R.data.isPublic=!0,K.updateButtons(),R.children&&R.load(!0),K.showError('The view was made public',2)},error:function(){K.showError.apply(K,arguments)}})}})},{color:'red'}),L.append(c('<div style="width:560px; height:35px;">').append('<input type="text" id="'+this.cssId('docName')+'"/>').append(new q('Edit Meta',function(){K.metaData()},{color:'blue'}).render()).append(new q('Save data',function(){K.save('Data',K.getFormContent('docName'))},{color:'red'}).render()).append(new q('Save view',function(){K.save('View',K.getFormContent('docName'))},{color:'red'}).render()).append(new q('Mkdir',function(){K.mkdir(K.getFormContent('docName'))},{color:'blue'}).render()).append(this.errorP)),L.append('<hr>').append(this.makePublicButton.render().hide()).append(new q('Upload',function(){if(K.currentDocument){var Q=K.dbUrl+'/'+K.currentDocument.data.doc._id,R=new t(Q);R.fetchList().then(function(S){u.uploadDialog(S,{mode:'couch',docUrl:Q}).then(function(T){if(T){j.loading(E,'Uploading files...');var U=h.partition(T,function(ha){return ha.toDelete});var V=U[0];U=h.partition(U[1],function(ha){return ha.size<G});var W=U[1],X=U[0];X.sort(function(ha,ia){return ha.size<ia.size?1:ha.size===ia.size?0:-1});var ba,Y=[],Z=[],aa=0;for(ba=0;ba<X.length;ba++)aa+=X[ba].size,aa<G?Z.push(X[ba]):(Y.push(Z),Z=[X[ba]],aa=X[ba].size);Z.length&&Y.push(Z);var ca=Promise.resolve();ca=ca.then(function(){return R.remove(h.map(V,'name'))});for(var da=function(ia){ca=ca.then(function(){return R.upload(W[ia])})},ea=0;ea<W.length;ea++)da(ea);for(var fa=function(ia){ca=ca.then(function(){return R.inlineUploads(Y[ia])})},ga=0;ga<Y.length;ga++)fa(ga);ca.then(function(){j.stopLoading(E),K.showError('Files uploaded successfully',2)},function(ha){j.stopLoading(E),K.showError('Files upload failed (at least partially)'),w.error(ha.message,ha.stack)}),ca.then(function(){K.loadFlavor()})}})})}},{color:'green'}).render()),this.loadFlavor(),L},updateButtons:function(){var I=this.currentDocument,J=this.makePublicButton.getDom();I&&I.data&&!I.data.isPublic&&J?J.show():J&&J.hide()},getMetaForm:function(I){var J=this,K=I.data.doc;return new Promise(function(L){c.ajax({url:J.database.uri+K._id+'/meta.json',type:'GET',dataType:'json',error:function(N){w.warn('Could not get meta data...',N),L({})},success:function(N){L(J.processMetaForm(N))}})})},processMetaForm:function(I){var J={sections:{metadata:[{sections:{keywords:[]}}]}};for(var K in I){var L={};L.contentType=[I[K].type],L.keyword=[K],'text'===I[K].type?(L.contentText=[I[K].value],L.contentHtml=['']):'html'===I[K].type&&(L.contentHtml=[I[K].value],L.contentText=['']),J.sections.metadata[0].sections.keywords.push({sections:{},groups:{group:[L]}})}return J},metaData:function(){var I=this;if(!this.currentDocument)return void I.showError('No document selected');var J=k.dialog({width:'80%',autoPosition:!0,title:'Edit Metadata'}),L=new s({});L.init({onValueChanged:function(){}}),L.setStructure({sections:{metadata:{options:{title:'Metadata',icon:'info_rhombus'},sections:{keywords:{options:{multiple:!0,title:'Key/Value Metadata'},groups:{group:{options:{type:'list',multiple:!0},fields:{contentType:{type:'combo',options:[{key:'text',title:'Text'},{key:'html',title:'html'}],title:'Content type',displaySource:{text:'t',html:'h'},default:'text'},keyword:{type:'text',title:'Key'},contentText:{type:'jscode',mode:'text',title:'Value',displayTarget:['t']},contentHtml:{type:'wysiwyg',title:'Value',default:' ',displayTarget:['h']}}}}}}}}}),L.onStructureLoaded().done(function(){var N;N=I.currentDocument.data.hasMeta?I.getMetaForm(I.currentDocument):Promise.resolve({}),N.then(function(O){L.fill(O)})}),L.addButton('Cancel',{color:'blue'},function(){J.dialog('close')}),L.addButton('Save',{color:'green'},function(){var M=L.getValue();I.saveMeta(I.getMetaFromForm(M)),J.dialog('close')}),L.onLoaded().done(function(){J.html(L.makeDom(1,0)),L.inDom()})},getMetaFromForm:function(I){I=DataObject.check(I,!0);var J={},K=I.getChildSync(['sections','metadata',0,'sections','keywords']);if(K)for(var M,L=0;L<K.length;L++)M=K.getChildSync([L,'groups','group',0]),'text'===M.contentType[0]?J[M.keyword[0]]={type:'text',value:M.contentText[0]}:'html'===M.contentType[0]&&(J[M.keyword[0]]={type:'html',value:M.contentHtml[0]});return J},lazyLoad:function(I,J){var K=J.node.data.doc._id,L=c.Deferred();J.result=L.promise(),this.database.openDoc(K,{revs_info:!0,success:function(N){for(var S,O=N._revs_info,P=O.length,Q=[],R=0;R<P;R++)if(S=O[R],'available'===S.status){var T={title:'rev '+(P-R),id:N._id,rev:S.rev,key:J.node.key};Q.push(T)}L.resolve(Q)}})},clickNode:function(I,J){var K,M,O,L=K=J.node,N=L.key.indexOf(':');if(O=0<=N?L.key.substring(N+1):'',L.folder)this.currentDocument=null;else{var P;L.data.rev&&(P=L.data.rev,L=L.parent),K=L.parent,this.currentDocument=L,c('#'+this.cssId('docName')).val(L.title),this.updateButtons(),'fancytreedblclick'===I.type&&this.load(L,P)}return(M={key:O,node:K},this.lastNode=M,'fancytreedblclick'!==I.type||L.folder)&&void 0},loadFlavor:function(){var I=this.lazyLoad.bind(this),J=this.clickNode.bind(this),K=this,L={delegate:'span.fancytree-title',menu:[{title:'Delete',cmd:'delete',uiIcon:'ui-icon-trash'},{title:'New flavor',cmd:'newflavor',uiIcon:'ui-icon-newwin'},{title:'Rename',cmd:'rename',uiIcon:'ui-icon-folder-collapsed'},{title:'Flavors',cmd:'flavors',children:[]}],beforeOpen:function(O,P){var Q=c.ui.fancytree.getNode(P.target);if(Q.folder)return!1;var R=c('#'+K.cssId('tree')),S=Object.keys(Q.data.doc.flavors);if(1===S.length)R.contextmenu('setEntry','delete','Delete'),R.contextmenu('showEntry','flavors',!1);else{for(var T=Array(S.length),U=0;U<S.length;U++)T[U]={title:S[U],cmd:'flavor'},S[U]===K.flavor&&(T[U].disabled=!0);R.contextmenu('setEntry','delete','Delete flavor'),R.contextmenu('setEntry','flavors',{title:'Flavors',children:T}),R.contextmenu('showEntry','flavors',!0)}Q.setActive()},select:function(O,P){var Q=c.ui.fancytree.getNode(P.target);K.contextClick(Q,P.cmd,P)},createMenu:function(O){c(O.target).css('z-index',1e4)}},M={preventVoidMoves:!0,preventRecursiveMoves:!0,autoExpandMS:300,dragStart:function(O){return!O.folder&&!O.data.rev},dragEnter:function(O){return!!O.folder},dragDrop:function(O,P){var Q=P.otherNode;if(O===Q.parent)return!1;var R=O.key.substring(K.flavor.length+1);R+=R.length?':'+Q.title:Q.title;var S=R.split(':');K.database.view('flavor/docs',{success:function(U){return D(S,U.rows)?K.showError(21):void(Q.data.doc.flavors[K.flavor]=S,K.database.saveDoc(Q.data.doc,{success:function(){Q.moveTo(O,P.hitMode)},error:function(){K.showError.apply(K,arguments)}}))},error:function(U){w.warn(U)},key:[K.flavor,K.username],include_docs:!1})}};this.database.list('flavor/sort','docs',{key:[this.flavor,this.username],include_docs:!0},{success:function(O){var P=A(O,K.flavor),Q=c('#'+K.cssId('tree'));Q.fancytree({toggleEffect:!1,extensions:['dnd'],dnd:M,source:[],lazyLoad:I,dblclick:J,debugLevel:0,activate:J}).children('ul').css('box-sizing','border-box');var R=Q.data('ui-fancytree').getTree();if(K.ftree=R,R.reload(P),R.getNodeByKey(K.flavor).toggleExpanded(),Q.contextmenu(L),K.lastKeyLoaded&&R.activateKey(K.lastKeyLoaded),K.currentDocument){var S=K.currentDocument.data.doc._id,T=h.find(O,function(V){return V.id===S});if(T){var U=h.flatten([K.flavor,T.value.flavors]).join(':');R.activateKey(U)}}},error:function(O){w.warn(O)}})},contextClick:function(I,J,K){var L=this;if(!I.folder)if('delete'===J)I.data.rev&&(I=I.parent),delete I.data.doc.flavors[this.flavor],c.isEmptyObject(I.data.doc.flavors)?(I.data.doc._deleted=!0,this.database.saveDoc(I.data.doc,{success:function(){L.showError('Document deleted.',2),I.remove()},error:function(){L.showError.apply(L,arguments)}})):this.database.saveDoc(I.data.doc,{success:function(){L.showError('Flavor deleted.',2),I.remove()},error:function(){L.showError.apply(L,arguments)}});else if('rename'===J)k.dialog('New name : <input type="text" id="'+this.cssId('newname')+'" value="'+I.title+'" />',{buttons:{Save:function(){var O=c(this),P=I.data.doc,Q=L.getFormContent('newname'),R=P.flavors[L.flavor],S=R[R.length-1];R[R.length-1]=Q,L.database.view('flavor/docs',{success:function(U){return D(R,U.rows)?(R[R.length-1]=S,L.showError(21)):void L.database.saveDoc(P,{success:function(){I.key=I.key.replace(/[^:]+$/,Q),I.setTitle(Q),O.dialog('destroy'),L.setFormContent('docName',Q)},error:function(W){w.warn(W)}})},error:function(U){w.warn(U)},key:[L.flavor,L.username],include_docs:!1})},Cancel:function(){c(this).dialog('destroy')}}});else if('newflavor'===J){var M=c('<div>').html('Flavor :');k.dialog(M,{buttons:{Save:function(){var O=c(this),P=I.data.doc,Q=L.getFormContent('newflavorname');if(P.flavors[Q])L.showError(20);else{var R=P.flavors[L.flavor];L.database.view('flavor/docs',{success:function(T){return D(R,T.rows)?L.showError(21):void(P.flavors[Q]=R,L.database.saveDoc(P,{success:function(){L.showError('Flavor '+Q+' successfully added.',2),O.dialog('destroy')},error:function(V){w.warn(V)}}))},error:function(T){w.warn(T)},key:[Q,L.username],include_docs:!1})}},Cancel:function(){c(this).dialog('destroy')}},title:'New flavor'}),M.append(c('<input type="text" id="'+this.cssId('newflavorname')+'" />').autocomplete({appendTo:'#ci-visualizer',minLength:0,source:L.flavorList}))}else if('flavor'===J)L.changeFlavor(K.item.text());else if('flavors'===J);else w.warn('Context menu action "'+J+'" not implemented !')}}),Object.defineProperty(z.prototype,'flavor',{get:function(){return this._flavor?this._flavor:this._flavor=window.sessionStorage.getItem('ci-visualizer-pouchdb2-flavor')||'default'},set:function(I){this._flavor=I,window.sessionStorage.setItem('ci-visualizer-pouchdb2-flavor',I)}}),z});
