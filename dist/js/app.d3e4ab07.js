(function(e){function t(t){for(var r,s,o=t[0],l=t[1],u=t[2],f=0,d=[];f<o.length;f++)s=o[f],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&d.push(i[s][0]),i[s]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);c&&c(t);while(d.length)d.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,o=1;o<n.length;o++){var l=n[o];0!==i[l]&&(r=!1)}r&&(a.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},i={app:0},a=[];function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var u=0;u<o.length;u++)t(o[u]);var c=l;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("ImageConverter"),n("Footer")],1)},a=[],s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("div",{attrs:{clas:"row"}},[n("div",{staticClass:"col"},[n("input",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],attrs:{id:"file-input",type:"file",accept:".heic",multiple:""},on:{change:e.previewFiles}}),n("button",{staticClass:"btn btn-primary",attrs:{disabled:e.canConvertAll},on:{click:function(t){return e.runConverter()}}},[e._v(" Convert All ")]),n("button",{staticClass:"btn btn-primary mx-2",attrs:{disabled:e.canDownloadAll},on:{click:function(t){return e.runDownload()}}},[e._v(" Download All ")]),n("button",{staticClass:"btn btn-primary",class:{disabled:!e.canClearAll},attrs:{disabled:!e.canClearAll},on:{click:e.clearFiles}},[e._v(" Clear All ")])])]),0===e.filesArray.length?n("div",{staticClass:"row mt-3"},[n("label",{class:{bolder:e.isDragging},attrs:{for:"file-input"}},[n("div",{staticClass:"drop-area",class:{"drop-area-hover":e.isDragging},attrs:{id:"drop-area"},on:{drop:function(t){return t.preventDefault(),e.dropHandler(t)},dragenter:function(t){e.isDragging=!0},dragleave:function(t){e.isDragging=!1},dragend:function(t){e.isDragging=!1},dragover:function(e){e.preventDefault()}}},[e._v(" Drop .heic files here ")])])]):e._e(),e.hasErrors?n("div",{staticClass:"row mt-3"},[n("p",{staticClass:"error-msg"},[e._v(" * There is "+e._s(e.errors.length)+" files that is not .heic format ")])]):e._e(),e.hasImages?n("div",{staticClass:"row mt-3"},[n("div",{staticClass:"col table-images"},[n("table",{staticClass:"table table-striped table-hover"},[n("tbody",e._l(e.filesArray,(function(t,r){return n("tr",{key:t.key},[n("td",[n("button",{staticClass:"btn btn-danger btn-sm",on:{click:function(t){return e.removeImageFromIndex(r)}}},[e._v(" X ")])]),n("td",[e._v(e._s(t.name))]),n("td",[t.url?n("img",{staticClass:"thumb",attrs:{src:t.url}}):n("button",{staticClass:"btn btn-success",class:{disabled:t.isLoading},attrs:{disabled:t.isLoading},on:{click:function(n){return e.convertImage(t.blob,t.index)}}},[t.isLoading?[e._v("Loading...")]:[e._v("Convert")]],2)]),n("td",[n("a",{staticClass:"btn btn-success",class:{disabled:!t.url},attrs:{href:t.url,download:e.getNewName(t),disabled:!t.url}},[e._v(" Download ")])])])})),0)])])]):n("div",{staticClass:"row main-content bg-light p-5 mt-3"},[n("div",{staticClass:"col text-center"},[e._v("No images found")])])])},o=[],l=(n("a434"),n("159b"),n("1276"),n("ac1f"),n("b0c0"),n("5319"),n("99af"),n("d3b7"),n("2b3d"),n("3ca3"),n("ddb0"),n("4de4"),n("4c45")),u=n.n(l),c=n("c4e3"),f=n.n(c),d=n("21a6"),h=n.n(d),g={name:"ImageConverter",data:function(){return{filesArray:[],isDragging:!1,isDownloading:!1,errors:[],queue:{total:0,todo:[],running:[],complete:[],count:0}}},computed:{isLoadingAny:function(){return this.filesArray.some((function(e){return e.isLoading}))},canClearAll:function(){return this.filesArray.length>0&&!this.isLoadingAny},canDownloadAll:function(){return this.isLoadingAny||!this.hasImagesToDownload||this.isDownloading},canConvertAll:function(){return this.isLoadingAny||!this.hasImages||!this.hasImagesToConvert},hasImages:function(){return this.filesArray.length>0},hasImagesToConvert:function(){return this.filesArray.some((function(e){return!e.newBlob}))},hasImagesToDownload:function(){return this.filesArray.some((function(e){return e.newBlob}))},hasErrors:function(){return this.errors.length>0},canRunNextTask:function(){var e=this.queue,t=e.running,n=e.count,r=e.todo;return t.length<n&&r.length}},methods:{removeImageFromIndex:function(e){this.filesArray.splice(e,1)},clearFiles:function(){this.filesArray=[],this.errors=[]},dropHandler:function(e){this.isDragging=!1,this.bringFilesToArray(e.dataTransfer.files)},previewFiles:function(e){this.bringFilesToArray(e.target.files)},bringFilesToArray:function(e){var t=this;e.forEach((function(e,n){return t.createImageOnList(e,n)}))},runConverter:function(){var e=this,t=[];this.filesArray.forEach((function(n){n.url||t.push({method:e.convertImage,blob:n.blob,index:n.index})})),this.promiseQueue(t,5)},promiseQueue:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;this.queue.total=e.length,this.queue.todo=e,this.queue.running=[],this.queue.complete=[],this.queue.count=t,this.runTask()},runTask:function(){var e=this;while(this.canRunNextTask){var t=this.queue.todo.shift();t.method(t.blob,t.index).then((function(){e.queue.complete.push(e.queue.running.shift()),e.runTask()})),this.queue.running.push(t)}},getImageExtension:function(e){return e.name.split(".").pop()},getNewName:function(e){return e.name.replace(".heic",".jpg")},createImageOnList:function(e,t){var n=this.getImageExtension(e);if("heic"===n){var r={index:t,url:null,isLoading:!1,name:e.name,blob:e,newBlob:null};this.filesArray.push(r)}else this.errors.push("Image '".concat(e.name,"' is '").concat(n,"' format."))},convertImage:function(e,t){var n=this;return new Promise((function(r){n.filesArray[t].isLoading=!0,u()({blob:e,toType:"image/jpeg",quality:.8}).then((function(e){n.filesArray[t].url=URL.createObjectURL(e),n.filesArray[t].newBlob=e})).finally((function(){n.filesArray[t].isLoading=!1,r("success")}))}))},runDownload:function(){var e=this,t=this.filesArray.filter((function(e){return e.newBlob})),n=new f.a,r={};t.forEach((function(t){n.file(e.getNewName(t),t.newBlob,{binary:!0}),r[t.name]=t})),this.isDownloading=!0,n.generateAsync({type:"blob"}).then((function(e){h.a.saveAs(e,"Heic2Jpg.zip")})).finally((function(){e.isDownloading=!1}))}}},b=g,p=(n("b879"),n("2877")),m=Object(p["a"])(b,s,o,!1,null,"74badcf6",null),v=m.exports,y=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},w=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("nav",{staticClass:"navbar fixed-bottom navbar-light bg-light"},[n("div",{staticClass:"container-fluid d-flex justify-content-center"},[n("a",{staticClass:"navbar-brand text-muted small",attrs:{href:"https://www.lucasd.com.br",target:"_blank"}},[e._v(" made by Lucas Souza ")])])])}],A={name:"Footer"},C=A,_=(n("5eaa"),Object(p["a"])(C,y,w,!1,null,"6c8bec06",null)),x=_.exports,D={name:"App",components:{ImageConverter:v,Footer:x}},I=D,T=(n("034f"),Object(p["a"])(I,i,a,!1,null,null,null)),L=T.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(L)}}).$mount("#app")},"5eaa":function(e,t,n){"use strict";n("a354")},"85ec":function(e,t,n){},a354:function(e,t,n){},b031:function(e,t,n){},b879:function(e,t,n){"use strict";n("b031")}});
//# sourceMappingURL=app.d3e4ab07.js.map