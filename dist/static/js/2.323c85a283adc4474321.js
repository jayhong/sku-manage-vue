webpackJsonp([2],{"/UdQ":function(e,t,a){var r=a("GMgQ");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("rjj0")("b8e85056",r,!0)},"3h3U":function(e,t,a){var r=a("8WLf");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("rjj0")("31518ee3",r,!0)},"8WLf":function(e,t,a){t=e.exports=a("FZ+f")(!0),t.push([e.i,"\n.m-orderManage-auditDialog .detail-title[data-v-43fb2aac] {\n  line-height: 24px;\n  font-size: 16px;\n  color: #2d2f33;\n  border-bottom: 1px #ddd solid;\n  margin-bottom: 10px;\n  padding: 0 30px;\n}\n.m-orderManage-auditDialog .el-form[data-v-43fb2aac] {\n  padding: 20px;\n}\n.m-orderManage-auditDialog .score_card_panel[data-v-43fb2aac]{\n  border: 2px #ddd dotted;\n  margin-bottom: 20px;\n}\n.m-orderManage-auditDialog .score_card_panel .title[data-v-43fb2aac]{\n  padding: 20px;\n  font-size: 16px;\n  font-weight: bold;\n}\n","",{version:3,sources:["/Users/wilen/wilen/more/Audit/src/modules/orderManage/common/auditDialog.vue"],names:[],mappings:";AACA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,eAAe;EACf,8BAA8B;EAC9B,oBAAoB;EACpB,gBAAgB;CACjB;AACD;EACE,cAAc;CACf;AACD;EACE,wBAAwB;EACxB,oBAAoB;CACrB;AACD;EACE,cAAc;EACd,gBAAgB;EAChB,kBAAkB;CACnB",file:"auditDialog.vue",sourcesContent:["\n.m-orderManage-auditDialog .detail-title[data-v-43fb2aac] {\n  line-height: 24px;\n  font-size: 16px;\n  color: #2d2f33;\n  border-bottom: 1px #ddd solid;\n  margin-bottom: 10px;\n  padding: 0 30px;\n}\n.m-orderManage-auditDialog .el-form[data-v-43fb2aac] {\n  padding: 20px;\n}\n.m-orderManage-auditDialog .score_card_panel[data-v-43fb2aac]{\n  border: 2px #ddd dotted;\n  margin-bottom: 20px;\n}\n.m-orderManage-auditDialog .score_card_panel .title[data-v-43fb2aac]{\n  padding: 20px;\n  font-size: 16px;\n  font-weight: bold;\n}\n"],sourceRoot:""}])},BON9:function(e,t,a){"use strict";function r(e){a("/UdQ")}Object.defineProperty(t,"__esModule",{value:!0});var l=a("4650"),o=a("FeOj"),n=a("2Lwn"),i=a("9Q7Z"),s={components:{"audit-dialog":o.a,"order-table":n.a,"detail-dialog":i.a},data:function(){return{item:{bill_info:{},car:{car_regist:[],drive_license:[],policy:[],evaluation_form:[],key_picture:[],car_picture:[],car_video:[]},customer:{id_card_picture:[],apply_form:[]},finance:{},guarantor:{guarantor_id_card_picture:[]},sign:{},user_info:{},wind_control:{},wind_control_leader:{}},detailDialog:!1,auditDialog:!1}},methods:{getOrderItem:function(e){var t=this,a=sessionStorage.getItem("ts_user_id");return Object(l.a)({url:"/v1/inspect/"+a+"/bill/detail",headers:{"X-Inspect-Token":sessionStorage.getItem("ts_userToken")},method:"GET",params:e}).then(function(e){t.item=e.data.data}).catch(function(e){t.$message.error(e.response.data.msg)})},onCheckEvent:function(e){var t=this;this.getOrderItem({bill_id:e.bill_id}).then(function(){t.detailDialog=!0})},onAuditEvent:function(e){var t=this;this.getOrderItem({bill_id:e.bill_id}).then(function(){t.auditDialog=!0})},onRejectEvent:function(e){var t=this;this.$prompt("驳回（订单号:"+e.bill_id+"）的理由","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputType:"textarea",inputPattern:/\S/,inputErrorMessage:"请输入驳回理由"}).then(function(a){var r=a.value,o=sessionStorage.getItem("ts_user_id");return Object(l.a)({url:"/v1/inspect/"+o+"/wind_control",headers:{"X-Inspect-Token":sessionStorage.getItem("ts_userToken")},method:"POST",data:{bill_id:e.bill_id,reject:r,bill_status:-1}}).then(function(e){t.$message({message:"驳回成功！",type:"success"}),t.$refs.table.reloadList()})}).catch(function(){})},showDetailInAudit:function(){this.detailDialog=!0},onPass:function(e){var t=this,a=sessionStorage.getItem("ts_user_id");return Object(l.a)({url:"/v1/inspect/"+a+"/wind_control",headers:{"X-Inspect-Token":sessionStorage.getItem("ts_userToken")},method:"POST",data:e}).then(function(e){t.$message({message:"审核通过成功！",type:"success"}),t.auditDialog=!1,t.$refs.table.reloadList()}).catch(function(e){t.$message.error(e.response.data.msg)})}}},c=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"m-orderManage-windCtrlAudit"},[a("order-table",{ref:"table",attrs:{noAction:!0},on:{detail:e.onCheckEvent,audit:e.onAuditEvent,reject:e.onRejectEvent}}),e._v(" "),e.auditDialog?a("audit-dialog",{attrs:{target:e.item},on:{detail:e.showDetailInAudit,close:function(t){e.auditDialog=!1},pass:e.onPass}}):e._e(),e._v(" "),e.detailDialog?a("detail-dialog",{attrs:{item:e.item,stage:5},on:{close:function(t){e.detailDialog=!1}}}):e._e()],1)},m=[],u={render:c,staticRenderFns:m},d=u,_=a("VU/8"),p=r,v=_(s,d,!1,p,null,null);t.default=v.exports},FeOj:function(e,t,a){"use strict";function r(e){a("3h3U"),a("wvyQ")}var l=a("JaHG"),o={props:["target"],filters:{levelFilter:function(e){return e>=350&&e<=500?"D级":e>=501&&e<=600?"C级":e>=601&&e<=700?"B级":e>=701&&e<=800?"A级":e>=801&&e<=1e3?"AA级":"未达到评级标准"}},data:function(){var e=this;return{imageUrl:"",visible:!0,item:{score_card:{}},rules:{loan_money:[{type:"number",required:!0,message:"请填写放款金额",trigger:"blur"}],loan_product:[{required:!0,message:"请填写借款产品",trigger:"change"}],loan_type:[{required:!0,message:"请填写借款类型",trigger:"change"}],loan_start:[{type:"string",required:!0,message:"请填写开始时间",trigger:"change"}],loan_time:[{type:"number",required:!0,message:"请填写借款期限",trigger:"blur"},{validator:function(t,a,r){return"1"===e.item.loan_type&&-1===[1,3,6].indexOf(a)?r(new Error("先息后本，借款期限只能为1或3或6个月")):"2"===e.item.loan_type&&-1===[6,12,18,24].indexOf(a)?r(new Error("等额等息，借款期限只能为6或12或18或24个月")):void r()},trigger:"blur"}],contract_fee:[{type:"number",required:!0,message:"请填写信用贷利息",trigger:"blur"}],interest:[{required:!0,message:"请选择利息",trigger:"change"}],credit_interest:[{type:"number",required:!0,message:"请填写信用贷利息",trigger:"blur"}],credit_money:[{type:"number",required:!0,message:"请填写信用贷金额",trigger:"blur"}],mortgage_registration:[{type:"number",required:!0,message:"请填写抵押登记费",trigger:"blur"}],parking_fee:[{type:"number",required:!0,message:"请填写停车费",trigger:"blur"}],check_file_fee:[{type:"number",required:!0,message:"请填写查档费用",trigger:"blur"}],study_fee:[{type:"number",required:!0,message:"请填写考察费",trigger:"blur"}],guarantee:[{type:"number",required:!0,message:"请填写保证金",trigger:"blur"}],gps_fee:[{type:"number",required:!0,message:"请填写GPS拆装费",trigger:"blur"}],gps_server_fee:[{type:"number",required:!0,message:"请填写GPS信息服务费",trigger:"blur"}],procedure_fee:[{type:"number",required:!0,message:"请填写手续费",trigger:"blur"}],car_money:[{type:"number",required:!0,message:"请填写车辆估值",trigger:"blur"}]},products:[{name:"全款车押证",id:"1"},{name:"全款车押车",id:"2"}],types:[{name:"先息后本",id:"1"},{name:"等额等息",id:"2"}],interests1:[{name:"2%",value:.02}],interests2:[{name:"1.58%",value:.0158},{name:"1.48%",value:.0148}],card:{sex:[{name:"男",value:9},{name:"女",value:30}],age:[{name:"18-25岁",value:21},{name:"26-35岁",value:42},{name:"36-45岁",value:70},{name:"46-55岁",value:28},{name:"56-60岁",value:7}],household:[{name:"本市户籍",value:100},{name:"本省内非本市户籍",value:60},{name:"省外户籍（非港澳台地区）",value:40},{name:"港澳台地区",value:10}],marrie_status:[{name:"未婚或其他",value:60},{name:"已婚",value:100},{name:"离异",value:10}],education:[{name:"本科及以上",value:40},{name:"大专",value:24},{name:"高中",value:12},{name:"初中及以下",value:4}],living_status:[{name:"本人或直系亲属名下商品房",value:200},{name:"本人或直系亲属名下小产权房",value:160},{name:"租赁房（商品房或小产权房）",value:100},{name:"租赁房（农民房）",value:60},{name:"公司宿舍",value:20}],family:[{name:"与配偶、子女或父母同住",value:100},{name:"与兄弟姐妹同住",value:60},{name:"其他",value:10}],work:[{name:"自雇人士",value:40},{name:"授薪人士（公司经理级以上管理人员）",value:24},{name:"授薪人士（公司普通员工）",value:12},{name:"无业人员",value:4}],income:[{name:"10000元（含）以内",value:12},{name:"10000元-20000元（含）",value:24},{name:"20000元-30000元（含）",value:36},{name:"30000元-40000元（含）",value:60},{name:"40000元-50000元（含）",value:84},{name:"50000元以上",value:120}],loan_type:[{name:"全款车押证",value:48},{name:"全款车押车",value:80}],car_policy:[{name:"全险（至少包括第三者责任、盗抢、车损及不计免赔）",value:60},{name:"第三者责任、盗抢或车损、不计免赔",value:24},{name:"第三者责任、不计免赔",value:6}],face_review:[{name:"非常好",value:60},{name:"良好",value:42},{name:"一般",value:30},{name:"较差",value:6}]}}},computed:{info:function(){return this.item.wind_control},total_score:function(){var e=0;for(var t in this.item.score_card)"score"!==t&&"total_score"!==t&&(e+=this.item.score_card[t]);return e}},methods:{handlePreview:function(e){window.open(e.response)},handleExceed:function(e,t){this.$message.error("文件个数超出限制！")},handleScoreCardChange:function(e,t){this.item.complex_score_card=t},handleSearchInfoChange:function(e,t){this.item.net_search_info=t},beforeRemove:function(e,t){return this.$confirm("确定移除 "+e.name+"？")},onCheckEvent:function(){this.$emit("detail")},closeEvent:function(){var e=this;this.visible=!1,setTimeout(function(){e.$emit("close")},500)},onPassEvent:function(){var e=this,t=Object(l.a)(this.item);return 0===t.complex_score_card.length?(this.$message("请上传综合评分表！"),!1):(t.complex_score_card=t.complex_score_card[0].response?t.complex_score_card[0].response:t.complex_score_card[0].url,0===t.net_search_info.length?(this.$message("请上传网查资料压缩包！"),!1):(t.net_search_info=t.net_search_info[0].response?t.net_search_info[0].response:t.net_search_info[0].url,void this.$refs.itemForm.validate(function(a){a?e.$emit("pass",t):e.$message("请正确填写表单！")})))}},mounted:function(){this.target.wind_control.wind_control_id?(this.item=this.target.wind_control,""===this.item.net_search_info?this.item.net_search_info=[]:this.item.net_search_info=[{name:"下载链接",url:this.item.net_search_info}],""===this.item.complex_score_card?this.item.complex_score_card=[]:this.item.complex_score_card=[{name:"查看",url:this.item.complex_score_card}],this.item.bill_id=this.target.bill_info.bill_id,this.item.bill_status=2):this.item={bill_id:this.target.bill_info.bill_id,bill_status:2,loan_money:0,status:1,opinion:"无",complex_score_card:[],net_search_info:[],loan_product:null,loan_type:null,loan_start:"2018-01-01",loan_end:"2018-01-01",loan_time:0,contract_fee:0,interest:null,credit_money:0,credit_interest:0,mortgage_registration:0,parking_fee:0,check_file_fee:0,study_fee:0,guarantee:0,gps_fee:0,gps_server_fee:0,procedure_fee:0,car_money:0,score_card:{sex:9,age:21,household:10,marrie_status:10,education:4,living_status:20,family:10,work:4,income:12,loan_type:8,car_policy:6,face_review:30}}}},n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{staticClass:"m-orderManage-auditDialog",attrs:{visible:e.visible,title:"风控专员审核","append-to-body":"",width:"900px"},on:{close:e.closeEvent}},[-1===e.target.wind_control.status?a("el-row",{staticStyle:{padding:"10px 20px",border:"2px red dotted","margin-bottom":"20px"}},[e._v("\n    驳回理由："+e._s(e.target.bill_info.reject)+"\n  ")]):e._e(),e._v(" "),a("div",{staticClass:"detail-title",staticStyle:{"border-bottom":"none"}},[e._v("客户："),a("el-button",{staticStyle:{"font-size":"16px"},attrs:{type:"text"},nativeOn:{click:function(t){t.preventDefault(),e.onCheckEvent(t)}}},[e._v(e._s(e.target.customer.name))])],1),e._v(" "),a("el-form",{ref:"itemForm",attrs:{model:e.item,rules:e.rules,"label-position":"right","label-width":"150px"}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"车辆估价（元）",prop:"car_money"}},[a("el-col",{attrs:{span:14}},[a("el-input-number",{attrs:{"controls-position":"right"},model:{value:e.item.car_money,callback:function(t){e.$set(e.item,"car_money",t)},expression:"item.car_money"}})],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"放款金额（元）",prop:"loan_money"}},[a("el-col",{attrs:{span:14}},[a("el-input-number",{attrs:{"controls-position":"right"},model:{value:e.item.loan_money,callback:function(t){e.$set(e.item,"loan_money",t)},expression:"item.loan_money"}})],1)],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"借款产品",prop:"loan_product"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.item.loan_product,callback:function(t){e.$set(e.item,"loan_product",t)},expression:"item.loan_product"}},e._l(e.products,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"借款类型",prop:"loan_type"}},[a("el-select",{attrs:{placeholder:"请选择"},on:{change:function(t){e.item.interest=null}},model:{value:e.item.loan_type,callback:function(t){e.$set(e.item,"loan_type",t)},expression:"item.loan_type"}},e._l(e.types,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"开始时间",required:""}},[a("el-col",{attrs:{span:14}},[a("el-form-item",{attrs:{prop:"loan_start"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"开始日期","value-format":"yyyy-MM-dd"},model:{value:e.item.loan_start,callback:function(t){e.$set(e.item,"loan_start",t)},expression:"item.loan_start"}})],1)],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"借款期限（月）",prop:"loan_time"}},[a("el-col",{attrs:{span:14}},[a("el-input-number",{attrs:{"controls-position":"right"},model:{value:e.item.loan_time,callback:function(t){e.$set(e.item,"loan_time",t)},expression:"item.loan_time"}})],1)],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"合同金额（元）",prop:"contract_fee"}},[a("el-col",{attrs:{span:14}},[a("el-input-number",{attrs:{"controls-position":"right"},model:{value:e.item.contract_fee,callback:function(t){e.$set(e.item,"contract_fee",t)},expression:"item.contract_fee"}})],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"利息",prop:"interest"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.item.interest,callback:function(t){e.$set(e.item,"interest",t)},expression:"item.interest"}},[e._l(e.interests1,function(t){return"1"===e.item.loan_type?a("el-option",{key:t.value,attrs:{label:t.name,value:t.value}}):e._e()}),e._v(" "),e._l(e.interests2,function(t){return"2"===e.item.loan_type?a("el-option",{key:t.value,attrs:{label:t.name,value:t.value}}):e._e()})],2)],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"信用贷金额（元）",prop:"credit_money"}},[a("el-col",{attrs:{span:14}},[a("el-input-number",{attrs:{"controls-position":"right"},model:{value:e.item.credit_money,callback:function(t){e.$set(e.item,"credit_money",t)},expression:"item.credit_money"}})],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"信用贷利息",prop:"credit_interest"}},[a("el-col",{attrs:{span:14}},[a("el-input-number",{attrs:{"controls-position":"right"},model:{value:e.item.credit_interest,callback:function(t){e.$set(e.item,"credit_interest",t)},expression:"item.credit_interest"}})],1)],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"保证金（元）",prop:"guarantee"}},[a("el-col",{attrs:{span:14}},[a("el-input-number",{attrs:{"controls-position":"right"},model:{value:e.item.guarantee,callback:function(t){e.$set(e.item,"guarantee",t)},expression:"item.guarantee"}})],1)],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"抵押登记费（元）",prop:"mortgage_registration"}},[a("el-col",{attrs:{span:14}},[a("el-input-number",{attrs:{"controls-position":"right"},model:{value:e.item.mortgage_registration,callback:function(t){e.$set(e.item,"mortgage_registration",t)},expression:"item.mortgage_registration"}})],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"停车费（元）",prop:"parking_fee"}},[a("el-col",{attrs:{span:14}},[a("el-input-number",{attrs:{"controls-position":"right"},model:{value:e.item.parking_fee,callback:function(t){e.$set(e.item,"parking_fee",t)},expression:"item.parking_fee"}})],1)],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"查档费用（元）",prop:"check_file_fee"}},[a("el-col",{attrs:{span:14}},[a("el-input-number",{attrs:{"controls-position":"right"},model:{value:e.item.check_file_fee,callback:function(t){e.$set(e.item,"check_file_fee",t)},expression:"item.check_file_fee"}})],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"考察费（元）",prop:"study_fee"}},[a("el-col",{attrs:{span:14}},[a("el-input-number",{attrs:{"controls-position":"right"},model:{value:e.item.study_fee,callback:function(t){e.$set(e.item,"study_fee",t)},expression:"item.study_fee"}})],1)],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"GPS拆装费（元）",prop:"gps_fee"}},[a("el-col",{attrs:{span:14}},[a("el-input-number",{attrs:{"controls-position":"right"},model:{value:e.item.gps_fee,callback:function(t){e.$set(e.item,"gps_fee",t)},expression:"item.gps_fee"}})],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"GPS服务费（元）",prop:"gps_server_fee"}},[a("el-col",{attrs:{span:14}},[a("el-input-number",{attrs:{"controls-position":"right"},model:{value:e.item.gps_server_fee,callback:function(t){e.$set(e.item,"gps_server_fee",t)},expression:"item.gps_server_fee"}})],1)],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"手续费（元）",prop:"procedure_fee"}},[a("el-col",{attrs:{span:14}},[a("el-input-number",{attrs:{"controls-position":"right"},model:{value:e.item.procedure_fee,callback:function(t){e.$set(e.item,"procedure_fee",t)},expression:"item.procedure_fee"}})],1)],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"综合评定表",required:""}},[a("el-col",{attrs:{span:24}},[a("el-upload",{attrs:{action:"/v1/inspect/upload/file","list-type":"picture","on-change":e.handleScoreCardChange,"on-preview":e.handlePreview,"before-remove":e.beforeRemove,"on-exceed":e.handleExceed,limit:1,"file-list":e.item.complex_score_card}},[a("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1)],1)],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"网查资料压缩包",required:""}},[a("el-col",{attrs:{span:24}},[a("el-upload",{attrs:{action:"/v1/inspect/upload/file","on-change":e.handleSearchInfoChange,"on-preview":e.handlePreview,"before-remove":e.beforeRemove,"on-exceed":e.handleExceed,limit:1,"file-list":e.item.net_search_info}},[a("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1)],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"score_card_panel"},[a("div",{staticClass:"title"},[e._v("评分表")]),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"性别",required:""}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.item.score_card.sex,callback:function(t){e.$set(e.item.score_card,"sex",t)},expression:"item.score_card.sex"}},e._l(e.card.sex,function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"得分："}},[a("span",[e._v(e._s(e.item.score_card.sex))])])],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"年龄",required:""}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.item.score_card.age,callback:function(t){e.$set(e.item.score_card,"age",t)},expression:"item.score_card.age"}},e._l(e.card.age,function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"得分："}},[a("span",[e._v(e._s(e.item.score_card.age))])])],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"户籍情况",required:""}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.item.score_card.household,callback:function(t){e.$set(e.item.score_card,"household",t)},expression:"item.score_card.household"}},e._l(e.card.household,function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"得分："}},[a("span",[e._v(e._s(e.item.score_card.household))])])],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"婚姻情况",required:""}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.item.score_card.marrie_status,callback:function(t){e.$set(e.item.score_card,"marrie_status",t)},expression:"item.score_card.marrie_status"}},e._l(e.card.marrie_status,function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"得分："}},[a("span",[e._v(e._s(e.item.score_card.marrie_status))])])],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"教育程度",required:""}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.item.score_card.education,callback:function(t){e.$set(e.item.score_card,"education",t)},expression:"item.score_card.education"}},e._l(e.card.education,function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"得分："}},[a("span",[e._v(e._s(e.item.score_card.education))])])],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"居住状况",required:""}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.item.score_card.living_status,callback:function(t){e.$set(e.item.score_card,"living_status",t)},expression:"item.score_card.living_status"}},e._l(e.card.living_status,function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"得分："}},[a("span",[e._v(e._s(e.item.score_card.living_status))])])],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"家庭情况",required:""}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.item.score_card.family,callback:function(t){e.$set(e.item.score_card,"family",t)},expression:"item.score_card.family"}},e._l(e.card.family,function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"得分："}},[a("span",[e._v(e._s(e.item.score_card.family))])])],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"职业",required:""}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.item.score_card.work,callback:function(t){e.$set(e.item.score_card,"work",t)},expression:"item.score_card.work"}},e._l(e.card.work,function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"得分："}},[a("span",[e._v(e._s(e.item.score_card.work))])])],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"月收入",required:""}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.item.score_card.income,callback:function(t){e.$set(e.item.score_card,"income",t)},expression:"item.score_card.income"}},e._l(e.card.income,function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"得分："}},[a("span",[e._v(e._s(e.item.score_card.income))])])],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"业务类型",required:""}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.item.score_card.loan_type,callback:function(t){e.$set(e.item.score_card,"loan_type",t)},expression:"item.score_card.loan_type"}},e._l(e.card.loan_type,function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"得分："}},[a("span",[e._v(e._s(e.item.score_card.loan_type))])])],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"车辆投保情况",required:""}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.item.score_card.car_policy,callback:function(t){e.$set(e.item.score_card,"car_policy",t)},expression:"item.score_card.car_policy"}},e._l(e.card.car_policy,function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"得分："}},[a("span",[e._v(e._s(e.item.score_card.car_policy))])])],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"客户面审情况",required:""}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.item.score_card.face_review,callback:function(t){e.$set(e.item.score_card,"face_review",t)},expression:"item.score_card.face_review"}},e._l(e.card.face_review,function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"得分："}},[a("span",[e._v(e._s(e.item.score_card.face_review))])])],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"评级："}},[a("span",[e._v(e._s(e._f("levelFilter")(e.total_score)))])])],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"总分："}},[a("span",[e._v(e._s(e.total_score))])])],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"审核意见"}},[a("el-input",{style:{width:"300px"},attrs:{type:"textarea",placeholder:"请输入描述",rows:4},model:{value:e.item.opinion,callback:function(t){e.$set(e.item,"opinion",t)},expression:"item.opinion"}})],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:e.onPassEvent}},[e._v("通 过")]),e._v(" "),a("el-button",{on:{click:function(t){e.visible=!1}}},[e._v("取 消")])],1)],1)},i=[],s={render:n,staticRenderFns:i},c=s,m=a("VU/8"),u=r,d=m(o,c,!1,u,"data-v-43fb2aac",null);t.a=d.exports},GMgQ:function(e,t,a){t=e.exports=a("FZ+f")(!0),t.push([e.i,"\n.m-orderManage-windCtrlAudit{\n  padding: 20px;\n}\n","",{version:3,sources:["/Users/wilen/wilen/more/Audit/src/modules/orderManage/Order.vue"],names:[],mappings:";AACA;EACE,cAAc;CACf",file:"Order.vue",sourcesContent:["\n.m-orderManage-windCtrlAudit{\n  padding: 20px;\n}\n"],sourceRoot:""}])},oTr0:function(e,t,a){t=e.exports=a("FZ+f")(!0),t.push([e.i,"\n.el-upload--text{\n  width: auto;\n  height: auto;\n  border: none;\n}\n","",{version:3,sources:["/Users/wilen/wilen/more/Audit/src/modules/orderManage/common/auditDialog.vue"],names:[],mappings:";AACA;EACE,YAAY;EACZ,aAAa;EACb,aAAa;CACd",file:"auditDialog.vue",sourcesContent:["\n.el-upload--text{\n  width: auto;\n  height: auto;\n  border: none;\n}\n"],sourceRoot:""}])},wvyQ:function(e,t,a){var r=a("oTr0");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("rjj0")("4e268976",r,!0)}});
//# sourceMappingURL=2.323c85a283adc4474321.js.map