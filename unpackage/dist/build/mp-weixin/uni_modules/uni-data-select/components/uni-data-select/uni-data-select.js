"use strict";const e=require("../../../../common/vendor.js"),t={name:"uni-data-select",mixins:[e.Ws.mixinDatacom||{}],props:{localdata:{type:Array,default:()=>[]},value:{type:[String,Number],default:""},modelValue:{type:[String,Number],default:""},label:{type:String,default:""},placeholder:{type:String,default:"请选择"},emptyTips:{type:String,default:"无选项"},clear:{type:Boolean,default:!0},defItem:{type:Number,default:0},disabled:{type:Boolean,default:!1},format:{type:String,default:""},placement:{type:String,default:"bottom"}},data:()=>({showSelector:!1,current:"",mixinDatacomResData:[],apps:[],channels:[],cacheKey:"uni-data-select-lastSelectedValue"}),created(){this.debounceGet=this.debounce((()=>{this.query()}),300),this.collection&&!this.localdata.length&&this.debounceGet()},computed:{typePlaceholder(){const e=this.placeholder,t={"opendb-stat-app-versions":"版本","opendb-app-channels":"渠道","opendb-app-list":"应用"}[this.collection];return t?e+t:e},valueCom(){return this.modelValue},textShow(){let e=this.current;return e.length>10?e.slice(0,25)+"...":e},getOffsetByPlacement(){switch(this.placement){case"top":return"bottom:calc(100% + 12px);";case"bottom":return"top:calc(100% + 12px);"}}},watch:{localdata:{immediate:!0,handler(e,t){Array.isArray(e)&&t!==e&&(this.mixinDatacomResData=e)}},valueCom(e,t){this.initDefVal()},mixinDatacomResData:{immediate:!0,handler(e){e.length&&this.initDefVal()}}},methods:{debounce(e,t=100){let a=null;return function(...i){a&&clearTimeout(a),a=setTimeout((()=>{e.apply(this,i)}),t)}},query(){this.mixinDatacomEasyGet()},onMixinDatacomPropsChange(){this.collection&&this.debounceGet()},initDefVal(){let e="";if(!this.valueCom&&0!==this.valueCom||this.isDisabled(this.valueCom)){let t;if(this.collection&&(t=this.getCache()),t||0===t)e=t;else{let t="";this.defItem>0&&this.defItem<=this.mixinDatacomResData.length&&(t=this.mixinDatacomResData[this.defItem-1].value),e=t}(e||0===e)&&this.emit(e)}else e=this.valueCom;const t=this.mixinDatacomResData.find((t=>t.value===e));this.current=t?this.formatItemName(t):""},isDisabled(e){let t=!1;return this.mixinDatacomResData.forEach((a=>{a.value===e&&(t=a.disable)})),t},clearVal(){this.emit(""),this.collection&&this.removeCache()},change(e){e.disable||(this.showSelector=!1,this.current=this.formatItemName(e),this.emit(e.value))},emit(e){this.$emit("input",e),this.$emit("update:modelValue",e),this.$emit("change",e),this.collection&&this.setCache(e)},toggleSelector(){this.disabled||(this.showSelector=!this.showSelector)},formatItemName(e){let{text:t,value:a,channel_code:i}=e;if(i=i?`(${i})`:"",this.format){let t="";t=this.format;for(let a in e)t=t.replace(new RegExp(`{${a}}`,"g"),e[a]);return t}return this.collection.indexOf("app-list")>0?`${t}(${a})`:t||`未命名${i}`},getLoadData(){return this.mixinDatacomResData},getCurrentCacheKey(){return this.collection},getCache(t=this.getCurrentCacheKey()){return(e.index.getStorageSync(this.cacheKey)||{})[t]},setCache(t,a=this.getCurrentCacheKey()){let i=e.index.getStorageSync(this.cacheKey)||{};i[a]=t,e.index.setStorageSync(this.cacheKey,i)},removeCache(t=this.getCurrentCacheKey()){let a=e.index.getStorageSync(this.cacheKey)||{};delete a[t],e.index.setStorageSync(this.cacheKey,a)}}};if(!Array){e.resolveComponent("uni-icons")()}Math;const a=e._export_sfc(t,[["render",function(t,a,i,l,o,c){return e.e({a:i.label},i.label?{b:e.t(i.label+"：")}:{},{c:o.current},o.current?{d:e.t(c.textShow)}:{e:e.t(c.typePlaceholder)},{f:o.current&&i.clear&&!i.disabled},o.current&&i.clear&&!i.disabled?{g:e.p({type:"clear",color:"#c0c4cc",size:"24"}),h:e.o(((...e)=>c.clearVal&&c.clearVal(...e)))}:{i:e.p({type:o.showSelector?"top":"bottom",size:"14",color:"#999"})},{j:e.o(((...e)=>c.toggleSelector&&c.toggleSelector(...e))),k:o.showSelector},o.showSelector?{l:e.o(((...e)=>c.toggleSelector&&c.toggleSelector(...e)))}:{},{m:o.showSelector},o.showSelector?e.e({n:e.n("bottom"==i.placement?"uni-popper__arrow_bottom":"uni-popper__arrow_top"),o:0===o.mixinDatacomResData.length},0===o.mixinDatacomResData.length?{p:e.t(i.emptyTips)}:{q:e.f(o.mixinDatacomResData,((t,a,i)=>({a:e.t(c.formatItemName(t)),b:t.disable?1:"",c:a,d:e.o((e=>c.change(t)),a)})))},{r:e.s(c.getOffsetByPlacement)}):{},{s:i.disabled?1:"",t:o.current?1:""})}]]);wx.createComponent(a);
