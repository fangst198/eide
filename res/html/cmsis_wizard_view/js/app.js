(function(e){function _(_){for(var a,s,i=_[0],o=_[1],c=_[2],u=0,d=[];u<i.length;u++)s=i[u],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&d.push(r[s][0]),r[s]=0;for(a in o)Object.prototype.hasOwnProperty.call(o,a)&&(e[a]=o[a]);l&&l(_);while(d.length)d.shift()();return n.push.apply(n,c||[]),t()}function t(){for(var e,_=0;_<n.length;_++){for(var t=n[_],a=!0,i=1;i<t.length;i++){var o=t[i];0!==r[o]&&(a=!1)}a&&(n.splice(_--,1),e=s(s.s=t[0]))}return e}var a={},r={app:0},n=[];function s(_){if(a[_])return a[_].exports;var t=a[_]={i:_,l:!1,exports:{}};return e[_].call(t.exports,t,t.exports,s),t.l=!0,t.exports}s.m=e,s.c=a,s.d=function(e,_,t){s.o(e,_)||Object.defineProperty(e,_,{enumerable:!0,get:t})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,_){if(1&_&&(e=s(e)),8&_)return e;if(4&_&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(s.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&_&&"string"!=typeof e)for(var a in e)s.d(t,a,function(_){return e[_]}.bind(null,a));return t},s.n=function(e){var _=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(_,"a",_),_},s.o=function(e,_){return Object.prototype.hasOwnProperty.call(e,_)},s.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],o=i.push.bind(i);i.push=_,i=i.slice();for(var c=0;c<i.length;c++)_(i[c]);var l=o;n.push([0,"chunk-vendors"]),t()})({0:function(e,_,t){e.exports=t("56d7")},"034f":function(e,_,t){"use strict";t("85ec")},"199c":function(module,__webpack_exports__,__webpack_require__){"use strict";var D_Code_Project_TypeScript_cmsis_config_wizard_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("b85c"),core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("a15b"),core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_1__),core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("fb6a"),core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_2__),core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("c740"),core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_3__),core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("2ca0"),core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_4__),core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("ac1f"),core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_5__),core_js_modules_es_regexp_test_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("00b4"),core_js_modules_es_regexp_test_js__WEBPACK_IMPORTED_MODULE_6___default=__webpack_require__.n(core_js_modules_es_regexp_test_js__WEBPACK_IMPORTED_MODULE_6__),core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("99af"),core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_7__),core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("d3b7"),core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_8___default=__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_8__),core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("25f0"),core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_9___default=__webpack_require__.n(core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_9__),_instance,appData={lang:"default",strs:{default:{title:"CMSIS Configuration Wizard","title.btn.save":"Save All","title.btn.open.config":"Open Header"},"zh-cn":{title:"CMSIS 配置向导","title.btn.save":"全部保存","title.btn.open.config":"打开源文件"}},tree:{cmsisObj:[],fileLines:[],modifyList:[],metaProp:{children:"children",label:"name"},cur_item:void 0}};__webpack_exports__["a"]={name:"App",components:{},data:function(){return appData},mounted:function(){var e=this;_instance=this,this.$on("save-status",(function(_){e.dialog.title=_.title||e.title,e.dialog.msg=_.msg,e.dialog.theme=_.success?"success":"danger",e.dialog.visible=!0}))},methods:{getInstance:function(){return _instance},forceUpdate:function(){this.$forceUpdate()},onSave:function(){_instance.$emit("save-all")},onOpenConfig:function(){var e,_;_instance.$emit("open-config",null===(e=this.tree.cur_item)||void 0===e||null===(_=e.location)||void 0===_?void 0:_.start)},notify:function(e){_instance.$notify(e)},message:function(e){_instance.$message(e)},get_str:function(e){return this.strs[this.lang]&&void 0!==this.strs[this.lang][e]?this.strs[this.lang][e]:this.strs["default"][e]||e},get_enum_desc_by_val:function(e,_){var t,a=Object(D_Code_Project_TypeScript_cmsis_config_wizard_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_0__["a"])(e);try{for(a.s();!(t=a.n()).done;){var r=t.value;if(r.val==_)return r.desc}}catch(n){a.e(n)}finally{a.f()}},get_code_by_loc:function(e){return void 0!=e.end&&e.end>=e.start?this.tree.fileLines.slice(e.start,e.end+1).join("\n"):""},cut_long_str:function(e){return e.length>70?"".concat(e.substr(0,67),"..."):e},on_tree_item_modified:function(e){if(void 0!=e.location){var _=this.tree.modifyList.findIndex((function(_){var t,a;return(null===(t=_.location)||void 0===t?void 0:t.start)==(null===(a=e.location)||void 0===a?void 0:a.start)}));-1==_&&this.tree.modifyList.push(e)}},is_hex_number:function(e){return e.toLowerCase().startsWith("0x")},parse_number:function(e){return this.is_hex_number(e)?parseInt(e,16):parseInt(e)},format_input_change:function format_input_change(cmsisObj,val){var disp_inf=cmsisObj.var_disp_inf;if(void 0!=disp_inf.operate){var var_disp_value=val;if(/^(?:\d+|0x[0-9a-f]+)$/i.test(var_disp_value)){var real_val=eval("".concat(this.parse_number(var_disp_value)).concat(disp_inf.operate.operator).concat(disp_inf.operate.val));this.is_hex_number(cmsisObj.var_value)?cmsisObj.var_value="0x".concat(real_val.toString(16)):cmsisObj.var_value=real_val.toString()}}},check_input_range:function(e,_){var t=e.var_range;if(void 0!=t){var a=this.parse_number(_);a>t.end?a=t.end:a<t.start&&(a=t.start),this.is_hex_number(e.var_value)?e.var_value="0x".concat(a.toString(16)):e.var_value=a.toString()}},on_tree_item_actived:function(e){this.tree.cur_item=e}}}},"56d7":function(e,_,t){"use strict";t.r(_);var a=t("b85c"),r=(t("e260"),t("e6cf"),t("cca6"),t("a79d"),t("ac1f"),t("5319"),t("99af"),t("2b0e")),n=function(){var e=this,_=e.$createElement,t=e._self._c||_;return t("div",{attrs:{id:"app"}},[t("el-container",{attrs:{id:"main"}},[t("el-header",{attrs:{id:"header"}},[t("el-row",{staticStyle:{"align-items":"center"},attrs:{gutter:12,type:"flex"}},[t("el-col",{attrs:{span:12}},[t("h3",[e._v(e._s(e.get_str("title")))])]),t("el-col",{staticStyle:{margin:"4px"},attrs:{span:12}},[t("el-row",{attrs:{type:"flex",justify:"end"}},[t("el-button",{attrs:{size:"small",round:""},on:{click:e.onOpenConfig}},[e._v(e._s(e.get_str("title.btn.open.config")))]),t("el-button",{attrs:{size:"small",round:""},on:{click:e.onSave}},[e._v(e._s(e.get_str("title.btn.save")))])],1)],1)],1)],1),t("div",{staticClass:"custom-divider"},[t("el-divider")],1),t("el-main",{attrs:{id:"content"}},[t("el-tree",{attrs:{data:e.tree.cmsisObj,props:e.tree.metaProp},on:{"node-click":e.on_tree_item_actived},scopedSlots:e._u([{key:"default",fn:function(_){var a=_.node,r=_.data;return t("span",{staticClass:"tree-node"},[t("span",[e._v(e._s(e.cut_long_str(a.label)))]),t("span",["section"==r.type||"bool"==r.type?t("div",[t("el-checkbox",{attrs:{"true-label":"1","false-label":"0"},on:{change:function(_){return e.on_tree_item_modified(r)}},model:{value:r.var_value,callback:function(_){e.$set(r,"var_value",_)},expression:"data.var_value"}})],1):"code"==r.type?t("div",[t("el-checkbox",{attrs:{"true-label":"","false-label":"!"},on:{change:function(_){return e.on_tree_item_modified(r)}},model:{value:r.var_value,callback:function(_){e.$set(r,"var_value",_)},expression:"data.var_value"}})],1):"option"==r.type?t("div",[void 0!=r.var_enum?t("div",[t("el-dropdown",{attrs:{trigger:"click"},on:{command:function(_){r.var_value=_,e.on_tree_item_modified(r)}}},[t("span",{staticClass:"el-dropdown-link"},[t("i",{staticClass:"el-icon-arrow-down el-icon--left"}),e._v(e._s(e.get_enum_desc_by_val(r.var_enum,r.var_value))+" ")]),t("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},e._l(r.var_enum,(function(_,a){return t("el-dropdown-item",{key:a,attrs:{command:_.val}},[e._v(" "+e._s(_.desc)+" ")])})),1)],1)],1):void 0!=r.var_disp_value?t("div",[t("input",{directives:[{name:"model",rawName:"v-model",value:r.var_disp_value,expression:"data.var_disp_value"}],attrs:{type:"text",size:"12"},domProps:{value:r.var_disp_value},on:{change:function(_){e.on_tree_item_modified(r),e.format_input_change(r,r.var_disp_value)},input:function(_){_.target.composing||e.$set(r,"var_disp_value",_.target.value)}}})]):void 0!=r.var_range?t("div",[t("input",{directives:[{name:"model",rawName:"v-model",value:r.var_value,expression:"data.var_value"}],attrs:{type:"text",size:"12",min:r.var_range.start,max:r.var_range.end},domProps:{value:r.var_value},on:{change:function(_){e.on_tree_item_modified(r),e.check_input_range(r,r.var_value)},input:function(_){_.target.composing||e.$set(r,"var_value",_.target.value)}}})]):t("div",[t("input",{directives:[{name:"model",rawName:"v-model",value:r.var_value,expression:"data.var_value"}],attrs:{type:"text",size:"12"},domProps:{value:r.var_value},on:{change:function(_){return e.on_tree_item_modified(r)},input:function(_){_.target.composing||e.$set(r,"var_value",_.target.value)}}})])]):"string"==r.type?t("div",[t("input",{directives:[{name:"model",rawName:"v-model",value:r.var_value,expression:"data.var_value"}],attrs:{type:"text",size:"16"},domProps:{value:r.var_value},on:{change:function(_){return e.on_tree_item_modified(r)},input:function(_){_.target.composing||e.$set(r,"var_value",_.target.value)}}})]):e._e()])])}}])})],1),t("el-footer",{attrs:{id:"footer"}},[t("div",{attrs:{id:"footer-cont"}},[t("b",[e._v("Details:")]),void 0!=e.tree.cur_item?t("div",{staticStyle:{"margin-left":"14px"}},[t("p",[e._v(e._s(e.tree.cur_item.name+" "+(e.tree.cur_item.desc||"")))]),e._l(e.tree.cur_item.detail,(function(_,a){return t("p",{key:a},[e._v(e._s(_))])})),void 0!=e.tree.cur_item.var_def_val?t("div",[t("p",[e._v(e._s("Default: "+e.tree.cur_item.var_def_val))])]):e._e(),"code"==e.tree.cur_item.type&&void 0!=e.tree.cur_item.location?t("div",[t("div",[e._v("Code Fragment: ")]),t("pre",{staticStyle:{margin:"0px 8px"}},[e._v("                            "),t("code",[e._v(e._s("\n"+e.get_code_by_loc(e.tree.cur_item.location)))]),e._v("\n                        ")])]):e._e()],2):e._e()])])],1)],1)},s=[],i=t("199c"),o=i["a"],c=(t("034f"),t("2877")),l=Object(c["a"])(o,n,s,!1,null,null,null),u=l.exports,d=t("5c96"),v=t.n(d);t("0fae");r["default"].config.productionTip=!1,r["default"].use(v.a);var p=void 0,f=!1,m=u.data(),g=void 0,b=acquireVsCodeApi();function E(){f||(f=!0,console.log("[cmsis config wizard view] start init and create page ..."),new r["default"]({render:function(e){return e(u)}}).$mount("#app"),p=u.methods.getInstance(),p.$on("save-all",(function(){return h()})),p.$on("open-config",(function(e){return O(e)})),console.log("[cmsis config wizard view] app inited done !"))}function O(e){"number"==typeof e?b.postMessage({type:"cmd",cmd:"open-config",arg:e}):b.postMessage("open-config")}function j(e){u.methods.notify({type:e.success?"success":"error",title:e.success?"Success":"Failed",message:e.msg,position:"bottom-right"})}function h(){if(p){console.log("[cmsis config wizard view] start post data ...");var e=m.tree.modifyList;console.log("[cmsis config wizard view] found ".concat(e.length," times change"));var _,t=/^(\s*#define\s+\w+\s*)(.+)?/,r=Object(a["a"])(e);try{for(r.s();!(_=r.n()).done;){var n=_.value;if("code"==n.type)for(var s=n.location.start;s<=n.location.end;s++)"!"==n.var_value?g[s]="//".concat(g[s]):g[s]=g[s].replace(/^\s*\/{2,}/,"");else{var i=g[n.location.start],o=t.exec(i);o&&o.length>2&&void 0!=o[2]?g[n.location.start]=i.replace(t,"$1".concat(n.var_value)):g[n.location.start]="".concat(i," ").concat(n.var_value)}}}catch(c){r.e(c)}finally{r.f()}b.postMessage(g),console.log("[cmsis config wizard view] post data done !")}else j({success:!1,msg:"App have not inited !"})}function w(e,_){console.log("[cmsis config wizard view] start init data ..."),g=_,m.tree.cmsisObj=e.group,m.tree.fileLines=g,console.log("[cmsis config wizard view] Init data done !")}window.addEventListener("message",(function(e){if(e.data.status){var _={success:e.data.status.success,msg:e.data.status.msg};j(_)}else w(e.data.data,e.data.lines),E()})),document.addEventListener("keydown",(function(e){"s"==e.key.toLowerCase()&&e.ctrlKey&&(e.preventDefault(),h())})),b.postMessage("eide.cmsis_config_wizard.launched")},"85ec":function(e,_,t){}});
//# sourceMappingURL=app.js.map