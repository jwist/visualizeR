'use strict';define(['jquery','src/header/components/default','src/util/versioning','forms/button','src/util/util','src/util/debug','lib/couchdb/jquery.couch','fancytree','components/ui-contextmenu/jquery.ui-contextmenu.min'],function(a,b,c,d,h,j){'use strict';function k(){}function m(s){var t;t=10===s?'Colons are not allowed in the name.':11===s?'Please select a folder':12===s?'A folder with this name already exists.':401===s?'Wrong username or password.':409===s?'Conflict. An entry with the same name already exists.':503===s?'Service Unavailable.':'Unknown error.',a('#'+this.cssId('error')).text(t).show().delay(3e3).fadeOut()}function n(s){for(var t={data:{__folder:!0},view:{__folder:!0}},u={data:{__folder:!0},view:{__folder:!0}},v=0,w=s.length;v<w;v++){var x=s[v],y=x.id.split(':');y.shift(),'data'===y.shift()?o(t.data,y,x):o(t.view,y,x)}return u.data=q(t.data,''),u.view=q(t.view,''),u}function o(s,t,u){if(0===t.length)p(s,u);else{s.__folder=!0;var v=t.shift();s[v]||(s[v]={}),o(s[v],t,u)}}function p(s,t){s.__name=t.id,s.__rev=t.value.rev}function q(s,t){var u,v;for(var w in t.length?u=v=[]:(v=[{key:'root',title:'root',folder:!0,children:[]}],u=v[0].children,t='root:'),s)if('__folder'!=w&&'__name'!=w&&'__rev'!=w){var x=s[w],y=t+w,z={title:w,key:y};x.__folder?(x.__name&&u.push({id:x.__name,lazy:!0,title:w,key:y,lastRev:x.__rev}),z.folder=!0,z.children=q(x,y+':')):(z.lazy=!0,z.id=x.__name,z.lastRev=x.__rev),u.push(z)}return v}function r(s){return a('#'+this.cssId(s)).val().trim()}return h.inherits(k,b,{initImpl:function(){this.ok=this.loggedIn=!1,this.id=h.getNextUniqueId(),this.options.url&&(a.couch.urlPrefix=this.options.url.replace(/\/$/,''));var t=this.options.database||'visualizer';this.database=a.couch.db(t),this.showError=m.bind(this),this.getFormContent=r.bind(this),this.checkDatabase()},checkDatabase:function(){var t=this;a.couch.info({success:function(){t.ok=!0},error:function(v,w,x){j.error('CouchDB header : database connection error. Code:'+v+'.',x)}})},cssId:function(t){return'ci-couchdb-header-'+this.id+'-'+t},_onClick:function(){this.ok?(this.setStyleOpen(this._open),this._open?(this.createMenu(),this.open()):this.close()):(this.checkDatabase(),j.error('CouchDB header : unreachable database.'))},createMenu:function(){if(this.$_elToOpen)return void(this.loggedIn?this.$_elToOpen.html(this.getMenuContent()):this.$_elToOpen.html(this.getLoginForm()));var t=this;this.$_elToOpen=a('<div>'),this.errorP=a('<p id="'+this.cssId('error')+'" style="color: red;">'),a.couch.session({success:function(v){null===v.userCtx.name?t.$_elToOpen.html(t.getLoginForm()):(t.loggedIn=!0,t.username=v.userCtx.name,t.$_elToOpen.html(t.getMenuContent()))}})},load:function(t,u,v){var w={};w[t.toLowerCase()]={url:this.database.uri+u.data.id+(v?'?rev='+v:'')},c.switchView(w,!0)},save:function(t,u){if(!(1>u.length)){if(-1!==u.indexOf(':'))return this.showError(10);var v=JSON.parse(c['get'+t+'JSON']()),w=this['last'+t+'Node'];if('undefined'==typeof w)return this.showError(11);var x,y;w.node.folder?(x=w.name+':'+u,y=w.node):(x=w.name.replace(/[^:]*$/,u),y=w.node.parent);for(var z=Object.keys(v),A=0,B=z.length;A<B;A++)'_'===z[A].charAt(0)&&delete v[z[A]];v._id=x;var C=!1;x===w.name&&(C=!0,v._rev=w.node.data.lastRev),this.database.saveDoc(v,{success:function(E){C?(w.node.data.lastRev=E.rev,w.node.children&&w.node.load(!0)):(y.addNode({id:E.id,lazy:!0,title:u,key:y.key+':'+u,lastRev:E.rev}),!y.expanded&&y.toggleExpanded())},error:this.showError})}},mkdir:function(t,u){if(!(1>u.length)){if(-1!==u.indexOf(':'))return this.showError(10);var v=this['last'+t+'Node'];if('undefined'==typeof v)return this.showError(11);var w=v.node.folder?v.node:v.node.parent;var x=w.getChildren();if(x)for(var y=0;y<x.length;y++)if(x[y].title===u&&x[y].folder)return this.showError(12);var z=w.addNode({folder:!0,title:u,key:w.key+':'+u});w.expanded||w.toggleExpanded(),a(z.li).find('.fancytree-title').trigger('click')}},login:function(t,u){var v=this;a.couch.login({name:t,password:u,success:function(){v.loggedIn=!0,v.username=t,v.$_elToOpen.html(v.getMenuContent())},error:this.showError})},logout:function(){var t=this;a.couch.logout({success:function(){t.loggedIn=!1,t.username=null,t.$_elToOpen.html(t.getLoginForm())}})},getLoginForm:function(){function t(){return u.login(u.getFormContent('login-username'),u.getFormContent('login-password')),!1}var u=this,v=this.loginForm=a('<div>');return v.append('<h1>Login</h1>'),v.append('<label for="'+this.cssId('login-username')+'">Username </label><input type="text" id="'+this.cssId('login-username')+'" /><br>'),v.append('<label for="'+this.cssId('login-password')+'">Password </label><input type="password" id="'+this.cssId('login-password')+'" />'),v.append(new d('Login',t,{color:'green'}).render()),v.bind('keypress',function(w){if(13===w.charCode)return t()}),v.append(this.errorP),v},getMenuContent:function(){var t=this,u=this.menuContent=a('<div>'),v=a('<div>').append(a('<p>').css('display','inline-block').css('width','50%').append('Click on an element to select it. Double-click to load.')).append(a('<p>').append('Logged in as '+this.username+' ').css('width','50%').css('text-align','right').css('display','inline-block').append(a('<a>Logout</a>').on('click',function(){t.logout()}).css({color:'blue',"text-decoration":'underline',cursor:'pointer'})));u.append(v);var w=a('<tr>').appendTo(a('<table>').appendTo(u)),x={"overflow-y":'auto',height:'200px',width:'300px'},y=a('<td valign="top">').appendTo(w);y.append('<h1>Data</h1>');var z=a('<div>').attr('id',this.cssId('datatree')).css(x);y.append(z),y.append('<p id="'+this.cssId('datadiv')+'">&nbsp;</p>'),y.append(a('<p>').append('<input type="text" id="'+this.cssId('data')+'"/>').append(new d('Save',function(){t.save('Data',t.getFormContent('data'))},{color:'red'}).render()).append(new d('Mkdir',function(){t.mkdir('Data',t.getFormContent('data'))},{color:'blue'}).render())),this.lastDataFolder={name:this.username+':data',node:null};var A=a('<td valign="top">').appendTo(w);A.append('<h1>View</h1>');var B=a('<div>').attr('id',this.cssId('viewtree')).css(x);return A.append(B),A.append('<p id="'+this.cssId('viewdiv')+'">&nbsp;</p>'),A.append(a('<p>').append('<input type="text" id="'+this.cssId('view')+'"/>').append(new d('Save',function(){t.save('View',t.getFormContent('view'))},{color:'red'}).render()).append(new d('Mkdir',function(){t.mkdir('View',t.getFormContent('view'))},{color:'blue'}).render())),this.lastViewFolder={name:this.username+':view',node:null},u.append(this.errorP),this.loadTree(),u},lazyLoad:function(t,u){var v=u.node.data.id,w=a.Deferred();u.result=w.promise(),this.database.openDoc(v,{revs_info:!0,success:function(y){for(var D,z=y._revs_info,A=z.length,B=[],C=0;C<A;C++)if(D=z[C],'available'===D.status){var E={title:'rev '+(A-C),id:y._id,rev:!0,key:D.rev};B.push(E)}w.resolve(B)}})},clickNode:function(t,u,v){if('title'===v.targetType||'icon'===v.targetType){var y,w=v.node,x='',z=t.toLowerCase();if(w.folder){x+=w.key;var A=x.substring(5);y={name:this.username+':'+z+(0<A.length?':'+A:''),node:w}}else{var B;x+=w.key.replace(/:?[^:]*$/,''),w.data.rev&&(B=w.key,w=w.parent),a('#'+this.cssId(z)).val(w.title),y={name:w.data.id,node:w},'fancytreedblclick'===u.type&&this.load(t,w,B)}if(this['last'+t+'Node']=y,a('#'+this.cssId(z+'div')).html('&nbsp;'+x),'fancytreedblclick'===u.type&&!w.folder)return!1}},loadTree:function(){var t=this.lazyLoad.bind(this),u=this.clickNode.bind(this,'Data'),v=this.clickNode.bind(this,'View'),w=this,x={delegate:'span.fancytree-title',menu:[{title:'Delete',cmd:'delete',uiIcon:'ui-icon-trash'}],beforeOpen(y,z){var A=a.ui.fancytree.getNode(z.target);return!A.folder&&void A.setActive()},select(y,z){var A=a.ui.fancytree.getNode(z.target);w.contextClick(A,z.cmd)},createMenu(y){a(y.target).css('z-index',1e3)}};this.database.allDocs({startkey:this.username+':',endkey:this.username+':~',success(y){var z=n(y.rows),A=a('#'+w.cssId('datatree'));A.fancytree({toggleEffect:!1,source:z.data,lazyload:t,click:u,dblclick:u,debugLevel:0}).children('ul').css('box-sizing','border-box'),A.data('ui-fancytree').getNodeByKey('root').toggleExpanded(),A.contextmenu(x);var B=a('#'+w.cssId('viewtree'));B.fancytree({toggleEffect:!1,source:z.view,lazyload:t,click:v,dblclick:v,debugLevel:0}).children('ul').css('box-sizing','border-box'),B.data('ui-fancytree').getNodeByKey('root').toggleExpanded(),B.contextmenu(x)}})},contextClick(s,t){if('delete'===t&&!s.folder){s.data.rev&&(s=s.parent);var u={_id:s.data.id,_rev:s.data.lastRev};this.database.removeDoc(u,{success:function(){s.remove()},error:this.showError})}}}),k});
