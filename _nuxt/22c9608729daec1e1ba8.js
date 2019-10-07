(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{315:function(t,n,e){"use strict";e.r(n);e(266),e(26),e(268);var o={data:function(){return{canvasWidth:0,canvasHeight:0,canvasStyle:"",imageWidth:0,imageHeight:0,magnification:1,isShowBgColor:!0,bgColor:"#ffffff",bgColorArray:[255,255,255],bgColorLuminance:this.calcLuminance(255,255,255),isShowBgColorPicker:!0,image:null,isLoadedImage:!1,inputImageUrl:""}},head:function(){return{title:"Pixelart Enlarger"}},computed:{colorPickerFgColor:function(){return this.isBgColorDark?"white":"black"},isBgColorDark:function(){return this.bgColorLuminance<130},bgColorPickerOpenerIcon:function(){return"mdi-arrow-"+(this.isShowBgColorPicker?"up":"down")+"-drop-circle"}},watch:{bgColor:function(t){this.isLoadedImage&&this.drawImage()},isShowBgColor:function(){this.isLoadedImage&&this.drawImage()}},mounted:function(){this.$nuxt.$emit("update-title","Pixelart Enlarger"),this.image=new Image},methods:{calcLuminance:function(t,g,b){return Number.isInteger(t)||(t=255),Number.isInteger(g)||(g=255),Number.isInteger(b)||(b=255),.298912*t+.586611*g+.114478*b},getCanvasContext:function(){return this.$refs.canvas.getContext("2d")},offCanvasSmoothing:function(t){t||(t=this.getCanvasContext()),t.msImageSmoothingEnabled=!1,t.mozImageSmoothingEnabled=!1,t.webkitImageSmoothingEnabled=!1,t.imageSmoothingEnabled=!1},drawImage:function(t,n){if(this.isLoadedImage){void 0===t&&(t=this.canvasWidth),void 0===n&&(n=this.canvasHeight);var e=this.getCanvasContext();e.clearRect(0,0,t,n),this.offCanvasSmoothing(e),this.isShowBgColor&&(e.fillStyle=this.bgColor,e.fillRect(0,0,t,n)),e.drawImage(this.image,0,0,t,n)}},reflectMagnification:function(){var t=this;this.canvasWidth=this.imageWidth*this.magnification,this.canvasHeight=this.imageHeight*this.magnification,this.$nextTick((function(){t.drawImage()}))},setMagnification:function(t){t<1||(this.magnification=t,this.reflectMagnification())},loadImage:function(t){var n=this;this.isLoadedImage=!1;var img=this.image;img.onload=function(t){n.isLoadedImage=!0;var e=img.naturalWidth,o=img.naturalHeight;n.canvasWidth=e,n.canvasHeight=o,n.imageWidth=e,n.imageHeight=o,n.magnification=1,n.$nextTick((function(){n.drawImage()}))},img.src=t},readFile:function(t){var n=this,e=new FileReader;e.onload=function(t){n.loadImage(t.target.result)},e.readAsDataURL(t)},submitUrlInput:function(t){var n=this.inputImageUrl;n&&this.loadImage(n)},onClickCanvas:function(t){if(t.altKey){var n=t.offsetX,e=t.offsetY,data=this.getCanvasContext().getImageData(n,e,1,1).data,o=Number.parseInt(data[0]),r=Number.parseInt(data[1]),c=Number.parseInt(data[2]),l="rgb(".concat(o,", ").concat(r,", ").concat(c,")");this.bgColor=l,this.bgColorArray=[o,r,c]}},unloadImage:function(){this.isLoadImage=!1},onChangeFileInput:function(t){t?this.readFile(t):this.unloadImage()},shiftMagnification:function(t){Number.isInteger(t)&&this.setMagnification(this.magnification+t)},changeBgColor:function(t){this.bgColor=t.hexa,this.bgColorLuminance=this.calcLuminance(t.rgba.r,t.rgba.g,t.rgba.b)}}},r=e(43),c=e(62),l=e.n(c),h=e(308),d=e(316),m=e(309),f=e(312),v=e(214),C=e(317),I=e(236),w=e(310),k=e(239),component=Object(r.a)(o,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-container",[e("v-container",[e("v-row",{attrs:{justify:"center"}},[e("v-col",{attrs:{md:"3"}},[e("v-file-input",{attrs:{placeholder:"画像ファイルを選択してください",outlined:"","hide-details":""},on:{change:t.onChangeFileInput}})],1)],1),t._v(" "),t.isLoadedImage?e("v-row",{staticClass:"mt-3",attrs:{justify:"center"}},[e("span",[t._v(t._s(t.canvasWidth)+"x"+t._s(t.canvasHeight))])]):t._e(),t._v(" "),t.isLoadedImage?e("v-row",{staticClass:"mt-3",attrs:{justify:"center"}},[e("v-col",{attrs:{md:"2"}},[e("v-text-field",{attrs:{type:"number",label:"倍率(1以上の整数)","prepend-icon":"mdi-minus","append-outer-icon":"mdi-plus",error:t.magnification<1},on:{"click:prepend":function(n){return t.shiftMagnification(-1)},"click:append-outer":function(n){return t.shiftMagnification(1)}},model:{value:t.magnification,callback:function(n){t.magnification=t._n(n)},expression:"magnification"}})],1)],1):t._e(),t._v(" "),e("v-row",{staticClass:"mt-3",attrs:{justify:"center"}},[e("v-card",{staticClass:"bgcolor-selector px-2",attrs:{color:t.bgColor}},[e("v-row",{attrs:{align:"center"}},[e("v-col",{staticClass:"pa-1"},[e("v-checkbox",{staticClass:"ma-0 pa-0",attrs:{"input-value":"isShowBgColor","hide-details":"",color:t.colorPickerFgColor,dense:!0,light:!t.isBgColorDark,dark:t.isBgColorDark},on:{change:function(n){t.isShowBgColor=n}},scopedSlots:t._u([{key:"label",fn:function(){return[e("span",{staticStyle:{"white-space":"nowrap"},style:{color:t.colorPickerFgColor}},[t._v("\n                  背景色: "+t._s(t.bgColor)+"\n                ")])]},proxy:!0}])})],1),t._v(" "),e("v-col",{staticClass:"pa-1"},[e("v-icon",{attrs:{color:t.colorPickerFgColor},on:{click:function(n){t.isShowBgColorPicker=!t.isShowBgColorPicker}}},[t._v(t._s(t.bgColorPickerOpenerIcon))])],1)],1)],1)],1),t._v(" "),e("div",[t.isShowBgColorPicker?e("v-color-picker",{staticStyle:{position:"relative",left:"calc(50% - 150px)"},attrs:{value:t.bgColor},on:{"update:color":t.changeBgColor}}):t._e()],1),t._v(" "),t.isLoadedImage?e("div",{staticClass:"mx-auto mt-1",style:{width:t.canvasWidth+"px"}},[e("canvas",{ref:"canvas",style:t.canvasStyle,attrs:{width:t.canvasWidth,height:t.canvasHeight},on:{click:t.onClickCanvas}},[t._v("\n        お使いのブラウザはCanvas APIをサポートしていません。\n        安定した環境で最新のブラウザをご利用ください。\n      ")])]):t._e()],1)],1)}),[],!1,null,null,null);n.default=component.exports;l()(component,{VCard:h.a,VCheckbox:d.a,VCol:m.a,VColorPicker:f.a,VContainer:v.a,VFileInput:C.a,VIcon:I.a,VRow:w.a,VTextField:k.a})}}]);