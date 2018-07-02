'use strict';require.config({shim:{"components/leaflet/dist/leaflet":{exports:'L',init:function(){return this.L.noConflict()}}}}),define(['jquery','modules/default/defaultview','src/util/util','src/util/api','src/util/color','components/leaflet/dist/leaflet','components/leaflet-omnivore/leaflet-omnivore.min'],function(a,b,c,d,f,g,h){'use strict';function j(){this.mapID=c.getNextUniqueId()}function l(q){var r=this.options=a.extend({},l.defaultOptions,q);switch(this.div=a('<div>'),this.kind=r.kind,r.kind){case'image':this.div=a('<img src="'+r.img+'">');break;case'circle':this.div.css('border-radius',r.size);default:this.div.css('background',r.color);}this.div.css({width:this.width,height:this.height})}function n(q){d.killHighlight(this.module.getId()+'_'+q),this.mapLayers.hasOwnProperty(q)&&(this.map.removeLayer(this.mapLayers[q]),delete this.mapLayers[q]),this.mapLayer.hasOwnProperty(q)&&this.map.removeLayer(this.mapLayer[q]),this.mapBounds.hasOwnProperty(q)&&delete this.mapBounds[q],this.updateFit()}function o(q){return Math.floor(1e3*q)}c.loadCss('components/leaflet/dist/leaflet.css');var p=g.Icon.extend({createIcon:function(){this._marker=this.options.marker;var s=this._marker.div[0];return this._setIconStyles(s,'icon'),s},createShadow:function(){return null}});return l.defaultOptions={size:30,color:'rgba(1,1,1,0.5)',kind:'circle'},l.setDefaultOptions=function(q){a.extend(l.defaultOptions,q)},l.prototype={highlight:function(r){r?'image'===this.kind&&this.options.imgHighlight?this.div.attr('src',this.options.imgHighlight):this.div.css('border','solid'):'image'===this.kind&&this.options.imgHighlight?this.div.attr('src',this.options.img):this.div.css('border','none')},get center(){return'image'===this.kind?[this.width/2,this.height]:[this.width/2,this.height/2]},get width(){return this.options.width||this.options.height||this.options.size},get height(){return this.options.height||this.options.width||this.options.size}},a.extend(!0,j.prototype,b,{init:function(){this.mapLayers={},this.mapLayer={},this.mapBounds={},this.dom=a('<div id="'+this.mapID+'"></div>').css({height:'100%',width:'100%'}),this.module.getDomContent().html(this.dom),l.setDefaultOptions({kind:this.module.getConfiguration('markerkind'),color:f.getColor(this.module.getConfiguration('markercolor')),size:parseInt(this.module.getConfiguration('markersize')),img:'components/leaflet/dist/images/marker-icon.png',imgHighlight:'modules/types/chart/maps/leaflet/marker-icon-red.png'}),this.markerjpath=this.module.getConfiguration('markerjpath')},inDom:function(){this.dom.empty();var s=this;this.map=g.map(this.mapID,{zoomAnimation:!1}),this.getTileLayer().addTo(s.map);var t=!0;this.map.on('drag',s.module.controller.moveAction,s),this.map.on('zoomend',function(){return t?void(t=!1):void(s.module.controller.moveAction.call(s),s.module.controller.zoomAction.call(s))});var w,u=[46.522117,6.566144],v=this.module.getConfiguration('mapcenter');w=v?Promise.resolve(v):new Promise(function(x){window.navigator&&window.navigator.geolocation?navigator.geolocation.getCurrentPosition(function(y){x([y.coords.latitude,y.coords.longitude])},function(){x(u)}):x(u)}),w.then(function(x){var y=s.module.getConfiguration('mapzoom')||10;s.map.setView(x,y),s.resolveReady()})},blank:{geojson:n,csv:n,kml:n,gpx:n,wkt:n,topojson:n,point:n},update:{position:function(r){2>r.length||this.map.setView(g.latLng(r[0],r[1]))},geojson:function(r,s){try{var t=r.get(),u=g.geoJson(t,{pointToLayer:(v,w)=>{return g.circleMarker(w,{radius:4,fillColor:'#0074D9',color:'#000000',weight:1,opacity:1,fillOpacity:0.8})},style:(v)=>{return v.properties&&v.properties.style}});this.addGeoJSON(u,s)}catch(v){}this.updateFit(s)},csv:function(r,s){try{this.addGeoJSON(h.csv.parse(r.get()+''),s)}catch(t){}this.updateFit(s)},kml:function(r,s){try{this.addGeoJSON(h.kml.parse(r.get()+''),s)}catch(t){}this.updateFit(s)},gpx:function(r,s){try{this.addGeoJSON(h.gpx.parse(r.get()+''),s)}catch(t){}this.updateFit(s)},wkt:function(r,s){try{this.addGeoJSON(h.wkt.parse(r.get()+''),s)}catch(t){}this.updateFit(s)},topojson:function(r,s){try{this.addGeoJSON(h.topojson.parse(r.get()),s)}catch(t){}this.updateFit(s)},point:function(r,s){var t=g.latLng(r[0],r[1]),u=g.circle(t,20,{color:'#f00',fillColor:'#f00'});this.addLayer(u,s),this.updateFit(s)}},addLayer:function(r,s){r.addTo(this.map),this.mapLayer[s]=r,this.mapBounds[s]=new g.LatLngBounds,this.mapBounds[s].extend(r.getBounds?r.getBounds():r.getLatLng())},addGeoJSON:function(r,s){this.map.addLayer(r),this.mapLayers[s]=r,this.mapBounds[s]=new g.LatLngBounds,r.eachLayer((t)=>{this.addEvents(t,s),this.mapBounds[s].extend(t.getBounds?t.getBounds():t.getLatLng())})},updateFit:function(r){var t,s=this.module.getConfiguration('autofit');if('var'===s)t=this.mapBounds[r];else if('all'===s)for(var u in t=new g.LatLngBounds,this.mapBounds)t.extend(this.mapBounds[u]);t&&t.isValid()&&this.map.fitBounds(t)},onResize:function(){this.map.invalidateSize()},onActionReceive:{position:function(r){var s=this.map.getCenter();(o(r[0])!==o(s.lat)||o(r[1])!==o(s.lng))&&this.map.setView(g.latLng(r[0],r[1]))},zoom:function(r){var s=this.map.getMinZoom(),t=this.map.getMaxZoom();r<s?r=s:r>t&&(r=t),r!==this.map.getZoom()&&this.map.setZoom(r)}},getTileLayer:function(){var r=this.module.getConfiguration('maptiles')||'osm',s={parameters:{}};switch(r){case'hb':s.template='http://toolserver.org/tiles/hikebike/{z}/{x}/{y}.png';break;case'osm':default:s.template='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',s.parameters.attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';}return g.tileLayer(s.template,s.parameters)}}),j});
