webpackJsonp([15],{"+L1C":function(e,t,n){t=e.exports=n("FZ+f")(!0),t.push([e.i,"\n.m-authsManage-groupsManage-header{\n  margin-bottom: 20px;\n}\n.m-authsManage-groupsManage-dialog .el-input {\n  width: 300px;\n}\n.m-authsManage-groupsManage-dialog .el-form {\n  padding: 20px;\n}\n","",{version:3,sources:["/Users/wilen/wilen/more/Audit/src/modules/authsManage/groupsManage.vue"],names:[],mappings:";AACA;EACE,oBAAoB;CACrB;AACD;EACE,aAAa;CACd;AACD;EACE,cAAc;CACf",file:"groupsManage.vue",sourcesContent:["\n.m-authsManage-groupsManage-header{\n  margin-bottom: 20px;\n}\n.m-authsManage-groupsManage-dialog .el-input {\n  width: 300px;\n}\n.m-authsManage-groupsManage-dialog .el-form {\n  padding: 20px;\n}\n"],sourceRoot:""}])},Ho3e:function(e,t,n){var a=n("+L1C");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("rjj0")("f79afae0",a,!0)},eRWB:function(e,t,n){"use strict";function a(e){n("Ho3e")}Object.defineProperty(t,"__esModule",{value:!0});var o=n("4650"),s={data:function(){return{dict:{},cols:[{prop:"group_id",label:"ID",width:80},{prop:"group_name",label:"名称"},{prop:"company_name",label:"所属公司"}],rows:[],item:{},rules:{group_name:[{required:!0,message:"请输入分组名称",trigger:"blur"}],company_id:[{type:"number",required:!0,message:"请选择所属公司",trigger:"change"}]},loading:!0,showEditDialog:!1,isEdit:!1}},methods:{fetchDict:function(){var e=this,t=sessionStorage.getItem("ts_user_id");Object(o.a)({url:"/v1/inspect/"+t+"/dict",headers:{"X-Inspect-Token":sessionStorage.getItem("ts_userToken")},method:"GET"}).then(function(t){e.dict=t.data}).catch(function(t){e.$message.error(t.response.data.msg)})},fetchList:function(){var e=this,t=sessionStorage.getItem("ts_user_id");Object(o.a)({url:"/v1/inspect/"+t+"/group",headers:{"X-Inspect-Token":sessionStorage.getItem("ts_userToken")},method:"GET"}).then(function(t){e.rows=t.data,e.loading=!1}).catch(function(t){e.$message.error(t.response.data.msg)})},addItem:function(e){var t=this,n=sessionStorage.getItem("ts_user_id");return Object(o.a)({url:"/v1/inspect/"+n+"/group/add",headers:{"X-Inspect-Token":sessionStorage.getItem("ts_userToken")},method:"POST",data:e}).then(function(e){t.$message({message:"新增分组成功，请在列表中查看！",type:"success"})}).catch(function(e){t.$message.error(e.response.data.msg)})},updateItem:function(e){var t=this,n=sessionStorage.getItem("ts_user_id");return Object(o.a)({url:"/v1/inspect/"+n+"/group/update",headers:{"X-Inspect-Token":sessionStorage.getItem("ts_userToken")},method:"POST",data:e}).then(function(e){t.$message({message:"编辑分组成功，请在列表中查看！",type:"success"})}).catch(function(e){t.$message.error(e.response.data.msg)})},deleteItem:function(e){var t=this,n=sessionStorage.getItem("ts_user_id");return Object(o.a)({url:"/v1/inspect/"+n+"/group/del",headers:{"X-Inspect-Token":sessionStorage.getItem("ts_userToken")},method:"POST",data:e}).then(function(e){t.$message({message:"删除分组成功，请在列表中查看！",type:"success"})}).catch(function(e){t.$message.error(e.response.data.msg)})},onAddEvent:function(){this.item={group_name:"",company_id:null},this.isEdit=!1,this.showEditDialog=!0,this.$refs.itemForm&&this.$refs.itemForm.clearValidate()},onEditEvent:function(e){this.item={index:e,group_id:this.rows[e].group_id,group_name:this.rows[e].group_name,company_id:this.rows[e].company_id},this.isEdit=!0,this.showEditDialog=!0,this.$refs.itemForm&&this.$refs.itemForm.clearValidate()},onDialogComfirm:function(){var e=this;this.$refs.itemForm.validate(function(t){if(!t)return!1;if(e.isEdit){if(e.item.group_name===e.rows[e.item.index].group_name&&e.item.company_id===e.rows[e.item.index].company_id)return e.$message("无任何修改！"),!1;e.updateItem({group_id:e.item.group_id,group_name:e.item.group_name,company_id:e.item.company_id}).then(function(t){e.showEditDialog=!1,e.fetchList()})}else e.addItem(e.item).then(function(t){e.showEditDialog=!1,e.fetchList()})})},onDelEvent:function(e){var t=this;this.$confirm("本次操作将永久删除该公司, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.deleteItem({group_id:t.rows[e].group_id}).then(function(e){t.fetchList()})})}},mounted:function(){this.fetchDict(),this.fetchList()}},i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"m-authsManage-groupsManage"},[n("div",{staticClass:"m-authsManage-groupsManage-header"},[n("el-button",{staticClass:"add_btn",attrs:{type:"primary"},on:{click:e.onAddEvent}},[e._v("新增部门")])],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.rows,stripe:""}},[e._l(e.cols,function(e){return n("el-table-column",{key:e.prop,attrs:{prop:e.prop,label:e.label,width:e.width}})}),e._v(" "),n("el-table-column",{attrs:{label:"操作",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"text"},nativeOn:{click:function(n){n.preventDefault(),e.onEditEvent(t.$index)}}},[e._v("\n          编辑\n        ")]),e._v(" "),n("el-button",{attrs:{type:"text"},nativeOn:{click:function(n){n.preventDefault(),e.onDelEvent(t.$index)}}},[e._v("\n          删除\n        ")])]}}])})],2),e._v(" "),n("el-dialog",{staticClass:"m-authsManage-groupsManage-dialog",attrs:{"append-to-body":"",title:e.isEdit?"编辑分组":"新增分组",visible:e.showEditDialog},on:{"update:visible":function(t){e.showEditDialog=t}}},[n("el-form",{ref:"itemForm",attrs:{model:e.item,rules:e.rules,"label-position":"right","label-width":"80px"}},[e.isEdit?n("el-form-item",{attrs:{label:"ID"}},[n("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.item.group_id,callback:function(t){e.$set(e.item,"group_id",t)},expression:"item.group_id"}})],1):e._e(),e._v(" "),n("el-form-item",{attrs:{label:"名称",prop:"group_name"}},[n("el-input",{attrs:{"auto-complete":"off"},model:{value:e.item.group_name,callback:function(t){e.$set(e.item,"group_name",t)},expression:"item.group_name"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"所属公司",prop:"company_id"}},[n("el-select",{attrs:{placeholder:"请选择"},model:{value:e.item.company_id,callback:function(t){e.$set(e.item,"company_id",t)},expression:"item.company_id"}},e._l(e.dict.company,function(e){return n("el-option",{key:e.company_id,attrs:{label:e.company_name,value:e.company_id}})}))],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.showEditDialog=!1}}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.onDialogComfirm}},[e._v("确 定")])],1)],1)],1)},r=[],u={render:i,staticRenderFns:r},l=u,c=n("VU/8"),d=a,m=c(s,l,!1,d,null,null);t.default=m.exports}});
//# sourceMappingURL=15.b48eb3ea5e2afe4eb736.js.map