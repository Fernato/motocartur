"use strict";(self["webpackChunkmotocarturv"]=self["webpackChunkmotocarturv"]||[]).push([[870],{1870:function(l,t,e){e.r(t),e.d(t,{default:function(){return p}});var n=e(3396),i=e(7139);const o={class:"table table-striped table-hover"},d=(0,n._)("th",null,"Cedula",-1),a=(0,n._)("th",null,"Nombre",-1),u=(0,n._)("th",null,"Apellidos",-1),s=(0,n._)("th",null,"Celular",-1),c=(0,n._)("th",null,"Placa",-1),r=(0,n._)("th",null,"Editar",-1),_={key:0},b=["onClick","disabled"],g=["disabled","onClick"];function h(l,t,e,h,k,w){return(0,n.wg)(),(0,n.iD)("div",null,[(0,n._)("table",o,[(0,n._)("thead",null,[(0,n._)("tr",null,[d,a,u,s,c,r,"admin"===l.getPerfil?((0,n.wg)(),(0,n.iD)("th",_,"Eliminar")):(0,n.kq)("",!0)])]),(0,n._)("tbody",null,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(l.getSociosAll,(t=>((0,n.wg)(),(0,n.iD)("tr",{key:t._id},[(0,n._)("td",null,(0,i.zw)(t.cedula),1),(0,n._)("td",null,(0,i.zw)(t.nombre),1),(0,n._)("td",null,(0,i.zw)(t.apellidos),1),(0,n._)("td",null,(0,i.zw)(t.celular),1),(0,n._)("td",null,(0,i.zw)(t.placa),1),(0,n._)("td",null,[(0,n._)("button",{class:"btn btn-secondary",onClick:e=>l.setEdit(t),disabled:l.getIsLoading}," Editar ",8,b)]),(0,n._)("td",null,["admin"===l.getPerfil?((0,n.wg)(),(0,n.iD)("button",{key:0,class:"btn btn-danger",disabled:l.getIsLoading,onClick:e=>l.deleteSocio(t._id)}," Eliminar ",8,g)):(0,n.kq)("",!0)])])))),128))])])])}var k=e(65),w={computed:{...(0,k.Se)("socio",["getSociosAll","getIsLoading"]),...(0,k.Se)("auth",["getPerfil"])},methods:{...(0,k.nv)("socio",["getSocios","deleteSocio"]),...(0,k.OI)("socio",["setEdit"])},created(){this.getSocios()}},m=e(89);const f=(0,m.Z)(w,[["render",h]]);var p=f}}]);
//# sourceMappingURL=870.270b638c.js.map