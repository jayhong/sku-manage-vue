webpackJsonp([6],{EF80:function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"m-authsManage-divisionsManage"},[n("div",{staticClass:"m-authsManage-divisionsManage-header"},[n("el-button",{staticClass:"add_btn",attrs:{type:"primary"},on:{click:e.onAddEvent}},[e._v("新增款式")])],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.rows,stripe:""}},[n("el-table-column",{attrs:{prop:"department_id",label:"ID",width:"80"}}),e._v(" "),n("el-table-column",{attrs:{prop:"department",label:"款式名"}}),e._v(" "),n("el-table-column",{attrs:{prop:"image_url",label:"款式图"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-popover",{attrs:{placement:"right",title:"",trigger:"hover"}},[n("img",{staticStyle:{width:"300px",height:"auto",display:"block"},attrs:{src:t.row.image_url}}),e._v(" "),n("img",{staticStyle:{width:"70px",height:"auto",display:"block"},attrs:{slot:"reference",src:t.row.image_url,alt:t.row.image_url},slot:"reference"})])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"采购链接","min-width":"250"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("a",{staticClass:"buttonText",attrs:{href:t.row.purchase_url,target:"scope.row.purchase_url"}},[e._v(e._s(t.row.purchase_url))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"尺码"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-tag",[e._v("\n            "+e._s(t.row.size)+"\n          ")])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"SKU"},scopedSlots:e._u([{key:"default",fn:function(t){return e._l(t.row.skus,function(t){return n("div",{key:t.index},[n("el-tag",[e._v("\n              "+e._s(t)+"\n            ")])],1)})}}])}),e._v(" "),n("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"text"},nativeOn:{click:function(n){return n.preventDefault(),e.onEditEvent(t.$index)}}},[e._v("\n            编辑\n          ")]),e._v(" "),n("el-button",{attrs:{type:"text"},nativeOn:{click:function(n){return n.preventDefault(),e.onDelEvent(t.$index)}}},[e._v("\n            删除\n          ")])]}}])})],1),e._v(" "),n("el-dialog",{staticClass:"m-authsManage-divisionsManage-dialog",attrs:{"append-to-body":"",title:e.isEdit?"编辑款式":"新增款式",visible:e.showEditDialog},on:{"update:visible":function(t){e.showEditDialog=t}}},[n("el-form",{ref:"itemForm",attrs:{model:e.item,rules:e.rules,"label-position":"right","label-width":"80px"}},[e.isEdit?n("el-form-item",{attrs:{label:"ID"}},[n("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.item.department_id,callback:function(t){e.$set(e.item,"department_id",t)},expression:"item.department_id"}})],1):e._e(),e._v(" "),n("el-form-item",{attrs:{label:"名称",prop:"department"}},[n("el-input",{attrs:{"auto-complete":"off"},model:{value:e.item.department,callback:function(t){e.$set(e.item,"department",t)},expression:"item.department"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"合并款式"}},[n("el-switch",{model:{value:e.item.name_merge,callback:function(t){e.$set(e.item,"name_merge",t)},expression:"item.name_merge"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"款式图"}},[n("el-col",{attrs:{span:24}},[n("el-upload",{attrs:{action:"/v1/inspect/upload/file","list-type":"picture","on-change":e.handleOtherChange,"on-preview":e.handlePreview,"before-remove":e.beforeRemove,"file-list":e.item.image_upload}},[n("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1)],1)],1),e._v(" "),n("el-form-item",{attrs:{label:"采购链接",prop:"purchase_url"}},[n("el-input",{attrs:{"auto-complete":"off"},model:{value:e.item.purchase_url,callback:function(t){e.$set(e.item,"purchase_url",t)},expression:"item.purchase_url"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"尺码",prop:"size"}},[n("el-input",{attrs:{"auto-complete":"off"},model:{value:e.item.size,callback:function(t){e.$set(e.item,"size",t)},expression:"item.size"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"SKU"}},[e._l(e.item.skus,function(t){return n("el-tag",{key:t,attrs:{closable:"","disable-transitions":!1},on:{close:function(n){return e.handleClose(t)}}},[e._v("\n            "+e._s(t)+"\n          ")])}),e._v(" "),e.inputVisible?n("el-input",{ref:"saveTagInput",staticClass:"input-new-sku",attrs:{size:"small"},on:{blur:e.handleInputConfirm},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleInputConfirm(t)}},model:{value:e.inputValue,callback:function(t){e.inputValue=t},expression:"inputValue"}}):n("el-button",{staticClass:"button-new-sku",attrs:{size:"small"},on:{click:e.showInput}},[e._v("+ New Tag")])],2)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.showEditDialog=!1}}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.onDialogComfirm}},[e._v("确 定")])],1)],1)],1)},a=[],s={render:i,staticRenderFns:a};t.a=s},OqtG:function(e,t,n){var i=n("p2a7");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n("FIqI")("8ac0bf14",i,!0,{})},nFrS:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("4650");t.default={data:function(){return{rows:[],item:{image_upload:[]},rules:{department:[{required:!0,message:"请输入款式名称",trigger:"blur"}]},loading:!0,showEditDialog:!1,isEdit:!1,inputVisible:!1,inputValue:""}},methods:{fetchList:function(){var e=this,t=sessionStorage.getItem("ts_user_id");return(0,i.rest)({url:"/v1/inspect/"+t+"/department",headers:{"X-Inspect-Token":sessionStorage.getItem("ts_userToken")},method:"POST"}).then(function(t){e.rows=t.data,e.loading=!1}).catch(function(t){e.$message.error(t.response.data.msg)})},addItem:function(e){var t=this,n=sessionStorage.getItem("ts_user_id");return(0,i.rest)({url:"/v1/inspect/"+n+"/department/add",headers:{"X-Inspect-Token":sessionStorage.getItem("ts_userToken")},method:"POST",data:e}).then(function(e){t.$message({message:"新增款式成功，请在列表中查看！",type:"success"})}).catch(function(e){t.$message.error(e.response.data.msg)})},updateItem:function(e){var t=this,n=sessionStorage.getItem("ts_user_id");return(0,i.rest)({url:"/v1/inspect/"+n+"/department/update",headers:{"X-Inspect-Token":sessionStorage.getItem("ts_userToken")},method:"POST",data:e}).then(function(e){t.$message({message:"编辑款式成功，请在列表中查看！",type:"success"})}).catch(function(e){t.$message.error(e.response.data.msg)})},deleteItem:function(e){var t=this,n=sessionStorage.getItem("ts_user_id");return(0,i.rest)({url:"/v1/inspect/"+n+"/department/del",headers:{"X-Inspect-Token":sessionStorage.getItem("ts_userToken")},method:"POST",data:e}).then(function(e){t.$message({message:"删除款式成功，请在列表中查看！",type:"success"})}).catch(function(e){t.$message.error(e.response.data.msg)})},onAddEvent:function(){this.item={department:"",image_url:"",image_upload:[],purchase_url:"",skus:[]},this.isEdit=!1,this.showEditDialog=!0,this.$refs.itemForm&&this.$refs.itemForm.clearValidate()},handleClose:function(e){this.item.skus.splice(this.item.skus.indexOf(e),1)},showInput:function(){var e=this;this.inputVisible=!0,this.$nextTick(function(t){e.$refs.saveTagInput.$refs.input.focus()})},handleInputConfirm:function(){var e=this.inputValue;e&&this.item.skus.push(e),this.inputVisible=!1,this.inputValue=""},onEditEvent:function(e){this.item={index:e,department_id:this.rows[e].department_id,department:this.rows[e].department,original_name:this.rows[e].department,size:this.rows[e].size,original_size:this.rows[e].size,image_url:this.rows[e].image_url,image_upload:[],purchase_url:this.rows[e].purchase_url,skus:this.rows[e].skus},this.item.image_upload=[{name:"款式图",url:this.rows[e].image_url}],this.isEdit=!0,this.showEditDialog=!0,this.$refs.itemForm&&this.$refs.itemForm.clearValidate()},handleOtherChange:function(e,t){this.item.image_upload=t},handlePreview:function(e){window.open(e.response)},beforeRemove:function(e,t){return this.$confirm("确定移除 "+e.name+"？")},onDialogComfirm:function(){var e=this;this.$refs.itemForm.validate(function(t){if(!t)return!1;if(e.isEdit){if(e.item.department===e.rows[e.item.index].department&&e.item.image_url===e.rows[e.item.index].image_url&&e.item.skus===e.rows[e.item.index].skus&&e.item.purchase_url===e.rows[e.item.index].purchase_url&&0===e.item.image_upload.length)return e.$message("无任何修改！"),!1;0!==e.item.image_upload.length&&(e.item.image_url=e.item.image_upload.map(function(e){return e.response?e.response:e.url})[0],console.log(e.item.image_url)),e.updateItem({department_id:e.item.department_id,department:e.item.department,image_url:e.item.image_url,purchase_url:e.item.purchase_url,skus:e.item.skus,original_name:e.item.original_name,size:e.item.size,original_size:e.item.original_size,name_merge:e.item.name_merge}).then(function(t){e.showEditDialog=!1,e.fetchList()})}else 0!==e.item.image_upload.length&&(e.item.image_url=e.item.image_upload.map(function(e){return e.response?e.response:e.url})[0],console.log(e.item.image_url)),e.addItem(e.item).then(function(t){e.showEditDialog=!1,e.fetchList()})})},onDelEvent:function(e){var t=this;this.$confirm("本次操作将永久删除该款式, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){console.log(t.rows[e].department_id),t.deleteItem({department_id:t.rows[e].department_id}).then(function(e){t.fetchList()})})}},mounted:function(){this.fetchList()}}},oRJB:function(e,t,n){"use strict";function i(e){n("OqtG")}Object.defineProperty(t,"__esModule",{value:!0});var a=n("nFrS"),s=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,function(){return a[e]})}(r);var o=n("EF80"),l=n("C7Lr"),u=i,m=l(s.a,o.a,!1,u,null,null);t.default=m.exports},p2a7:function(e,t,n){t=e.exports=n("UTlt")(!0),t.push([e.i,"\n.m-authsManage-divisionsManage{\n  padding: 20px;\n}\n.m-authsManage-divisionsManage-header{\n  margin-bottom: 20px;\n}\n.m-authsManage-divisionsManage-dialog .el-input {\n  width: 300px;\n}\n.m-authsManage-divisionsManage-dialog .el-form {\n  padding: 20px;\n}\n.el-tag + .el-tag {\n  margin-left: 10px;\n}\n.button-new-sku {\n  margin-left: 10px;\n  height: 32px;\n  line-height: 30px;\n  padding-top: 0;\n  padding-bottom: 0;\n}\n.input-new-sku {\n  width: 90px;\n  margin-left: 10px;\n  vertical-align: bottom;\n}\n","",{version:3,sources:["D:/vue_source/sku-manage/src/modules/authsManage/divisionsManage.vue"],names:[],mappings:";AACA;EACE,cAAc;CACf;AACD;EACE,oBAAoB;CACrB;AACD;EACE,aAAa;CACd;AACD;EACE,cAAc;CACf;AACD;EACE,kBAAkB;CACnB;AACD;EACE,kBAAkB;EAClB,aAAa;EACb,kBAAkB;EAClB,eAAe;EACf,kBAAkB;CACnB;AACD;EACE,YAAY;EACZ,kBAAkB;EAClB,uBAAuB;CACxB",file:"divisionsManage.vue",sourcesContent:["\n.m-authsManage-divisionsManage{\n  padding: 20px;\n}\n.m-authsManage-divisionsManage-header{\n  margin-bottom: 20px;\n}\n.m-authsManage-divisionsManage-dialog .el-input {\n  width: 300px;\n}\n.m-authsManage-divisionsManage-dialog .el-form {\n  padding: 20px;\n}\n.el-tag + .el-tag {\n  margin-left: 10px;\n}\n.button-new-sku {\n  margin-left: 10px;\n  height: 32px;\n  line-height: 30px;\n  padding-top: 0;\n  padding-bottom: 0;\n}\n.input-new-sku {\n  width: 90px;\n  margin-left: 10px;\n  vertical-align: bottom;\n}\n"],sourceRoot:""}])}});
//# sourceMappingURL=6.c2f0849ae039d7f15fc6.js.map