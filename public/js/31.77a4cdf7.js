"use strict";(self["webpackChunkmotocarturv"]=self["webpackChunkmotocarturv"]||[]).push([[31],{6031:function(e,o,t){t.r(o),t.d(o,{default:function(){return u}});var r=t(3396),n=t(9242);const a=["disabled"];function s(e,o,t,s,c,d){return(0,r.wg)(),(0,r.iD)("form",{onSubmit:o[3]||(o[3]=(0,n.iM)(((...e)=>d.AddEgreso&&d.AddEgreso(...e)),["prevent"]))},[(0,r._)("div",null,[(0,r.wy)((0,r._)("input",{type:"date",name:"fecha",class:"form-control mt-3",placeholder:"Fecha",autoComplete:"off","onUpdate:modelValue":o[0]||(o[0]=e=>c.egreso.fecha=e)},null,512),[[n.nr,c.egreso.fecha]]),(0,r.wy)((0,r._)("input",{type:"text",name:"descripcion",class:"form-control mt-3",placeholder:"Descripcion",autoComplete:"off","onUpdate:modelValue":o[1]||(o[1]=e=>c.egreso.descripcion=e)},null,512),[[n.nr,c.egreso.descripcion]]),(0,r.wy)((0,r._)("input",{type:"number",name:"monto",class:"form-control mt-3",placeholder:"Monto",autoComplete:"off","onUpdate:modelValue":o[2]||(o[2]=e=>c.egreso.monto=e)},null,512),[[n.nr,c.egreso.monto]]),(0,r._)("button",{class:"btn btn-primary form-control mt-2",type:"submit",disabled:e.getIsLoading}," Guardar ",8,a)])],32)}var c=t(65),d={data(){return{egreso:{}}},computed:{...(0,c.Se)("egreso",["getIsLoading"])},methods:{...(0,c.nv)("egreso",["addEgreso"]),async AddEgreso(){var e={cedula:this.egreso.cedula,fecha:this.egreso.fecha,descripcion:this.egreso.descripcion,monto:this.egreso.monto};await this.addEgreso(e)}}},l=t(89);const i=(0,l.Z)(d,[["render",s]]);var u=i}}]);
//# sourceMappingURL=31.77a4cdf7.js.map