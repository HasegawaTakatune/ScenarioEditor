import{d as M,r as p,o as z,q as h,c as L,I as R,x as K,m as _,s as e,J as o,K as c,L as u,M as w,N as k,O as v,t as j,P as B}from"./entry.d2bdb6e8.js";const q=M({name:"ClientOnly",inheritAttrs:!1,props:["fallback","placeholder","placeholderTag","fallbackTag"],setup($,{slots:m,attrs:U}){const y=p(!1);return z(()=>{y.value=!0}),f=>{var I;if(y.value)return(I=m.default)==null?void 0:I.call(m);const x=m.fallback||m.placeholder;if(x)return x();const C=f.fallback||f.placeholder||"",V=f.fallbackTag||f.placeholderTag||"span";return h(V,U,C)}}}),H={class:"header"},Q=e("h1",null,"シナリオ編集",-1),W={class:"d-flex"},X={class:"edit-input"},Y=e("label",{for:"fileName"},"ファイル名 ",-1),Z={class:"edit-input"},ee=e("label",{for:"title"},"タイトル ",-1),te={class:"edit-input"},ne=e("label",{for:"chapterNo"},"チャプター番号 ",-1),le={class:"edit-input"},oe=e("label",{for:"firstBackgroundImagePath"},"背景画像ファイル名 ",-1),ae={class:"edit-input"},se=e("label",{for:"bgmPath"},"BGMファイル名 ",-1),ie={class:"edit-input"},ce=e("label",{for:"nextChapter"},"次のチャプター名 ",-1),de={class:"edit-input"},ue=e("label",{for:"keepScene"},"前のシーンを維持する ",-1),re=e("p",null,"シナリオ",-1),pe={class:"edit-input"},_e=e("label",null,"BGMを止める",-1),he=["onUpdate:modelValue"],me={class:"edit-input"},fe=e("label",null,"立ち絵全消し",-1),be=["onUpdate:modelValue"],ge={class:"edit-input"},ke=e("label",null,"話しているキャラクターID ",-1),ve=["onUpdate:modelValue"],ye=["onUpdate:modelValue","onInput"],xe=["value"],Pe={class:"edit-input"},Ue=e("label",null,"メッセージ ",-1),Ce=["onUpdate:modelValue"],Ve={class:"edit-input"},Ie=e("label",null,"音声ファイル名 ",-1),je=["onUpdate:modelValue"],Be=["onClick"],we=["onInput"],Ne={class:"edit-input"},Se=e("label",null,"背景画像ファイル名 ",-1),Me=["onUpdate:modelValue"],$e=["onClick"],Ee=["onInput"],Ge={class:"edit-input"},Oe=e("label",null,"BGMファイル名 ",-1),Ae=["onUpdate:modelValue"],De=["onClick"],Fe=["onInput"],Je={class:"edit-input"},Te=e("label",null,"SEファイル名 ",-1),ze=["onUpdate:modelValue"],Le=["onClick"],Re=["onInput"],Ke=e("p",null,"キャラクター",-1),qe={class:"edit-input"},He=e("label",null,"キャラクタ名 ",-1),Qe=["onUpdate:modelValue"],We={class:"edit-input"},Xe=e("label",null,"キャラクターID ",-1),Ye=["onUpdate:modelValue"],Ze={class:"edit-input"},et=e("label",null,"キャラクター画像ファイル名 ",-1),tt=["onUpdate:modelValue"],nt=["onClick"],lt=["onInput"],ot={class:"edit-input"},at=e("label",null,"座標 ",-1),st=["onUpdate:modelValue"],it=["value"],ct={class:"edit-input"},dt=e("label",null,"キャラ移動 ",-1),ut=["onUpdate:modelValue"],rt=["value"],pt={class:"edit-input"},_t=e("label",null,"キャラエフェクト ",-1),ht=["onUpdate:modelValue"],mt=["value"],ft=["onClick"],bt=["onClick"],gt=["onClick"],vt=M({__name:"index",setup($){const m=p(),U=p(),y=p(),f=p(),x=p(),C=p(),V=p(),I=[{label:"-",value:""},{label:"左端",value:{x:-9,y:0,z:0}},{label:"左",value:{x:-6,y:0,z:0}},{label:"中央",value:{x:-3,y:0,z:0}},{label:"右",value:{x:0,y:0,z:0}},{label:"右端",value:{x:3,y:0,z:0}}],E=[{label:"-",value:""},{label:"右入場",value:"enter-right"},{label:"左入場",value:"enter-left"},{label:"右退場",value:"leave-right"},{label:"左退場",value:"leave-left"}],G=[{label:"-",value:""},{label:"黒いオーラ",value:"black-aura"}],N=p(),s=p({fileName:"",title:"",chapterNo:0,backgroundImagePath:"",bgmPath:"",nextChapter:"",keepScene:!1,scenario:[]}),S=L(()=>{var l;let i=[];return(l=s.value.scenario)==null||l.forEach(r=>{const t=r.characters.filter(d=>typeof d.id=="string"&&d.id!=""&&!i.find(n=>n.value==d.id)).map(d=>({label:d.name,value:d.id}));i=i.concat(t)}),i});function O(i){s.value.scenario.splice(i,1)}function A(){s.value.scenario.push({name:"",message:"",talkingCharacterId:"",characters:[]})}function D(i,l){i.characters=i.characters.filter((r,t)=>t!=l)}function F(i){i.push({id:"",position:"",moveEffect:"",effect:""})}function J(){let i="";/\.json$/.test(s.value.fileName)?i=s.value.fileName:i=`${s.value.fileName}.json`;const l=JSON.stringify(s.value,null,"  "),r=new Blob([l],{type:"application/json"}),t=URL.createObjectURL(r),d=document.createElement("a");d.setAttribute("href",t),d.setAttribute("download",i),d.click(),d.remove()}function T(i){const l=i.target.files[0];i.file=null;const r=new FileReader;r.readAsText(l),r.onload=function(t){var n;const d=JSON.parse((n=t.target)==null?void 0:n.result);s.value=d}}p(0);function b(i){const r=i.target.files[0].name;return i.target.files=null,r}return(i,l)=>{const r=q;return _(),R(r,null,{default:K(()=>[e("div",H,[Q,e("div",W,[e("button",{class:"d-block btn-mg-x btn-mg-bottom",onClick:J}," シナリオファイル出力 "),e("button",{class:"d-block btn-mg-x btn-mg-bottom",onClick:l[0]||(l[0]=t=>o(N).click())}," シナリオファイル読込 "),e("input",{type:"file",name:"upload-json",id:"upload-json",ref_key:"uploadJson",ref:N,onInput:T,hidden:""},null,544)]),e("button",{class:"d-block btn-mg-x btn-mg-bottom",onClick:A}," シナリオ追加 "),e("div",X,[Y,c(e("input",{id:"fileName",type:"text",class:"","onUpdate:modelValue":l[1]||(l[1]=t=>o(s).fileName=t),placeholder:".json"},null,512),[[u,o(s).fileName]])])]),e("div",null,[e("div",Z,[ee,c(e("input",{id:"title",type:"text",class:"","onUpdate:modelValue":l[2]||(l[2]=t=>o(s).title=t)},null,512),[[u,o(s).title]])]),e("div",te,[ne,c(e("input",{id:"chapterNo",type:"number",class:"","onUpdate:modelValue":l[3]||(l[3]=t=>o(s).chapterNo=t)},null,512),[[u,o(s).chapterNo]])]),e("div",le,[oe,c(e("input",{id:"firstBackgroundImagePath",type:"text",class:"","onUpdate:modelValue":l[4]||(l[4]=t=>o(s).backgroundImagePath=t),placeholder:".png .jpg .jpeg"},null,512),[[u,o(s).backgroundImagePath]]),e("button",{class:"btn-mg-x",onClick:l[5]||(l[5]=t=>o(m).click())}," ファイル選択 "),e("input",{ref_key:"refFirstBackgroundImagePath",ref:m,type:"file",accept:".png,.jpg,.jpeg",onInput:l[6]||(l[6]=t=>o(s).backgroundImagePath=b(t)),hidden:""},null,544)]),e("div",ae,[se,c(e("input",{id:"bgmPath",type:"text",class:"","onUpdate:modelValue":l[7]||(l[7]=t=>o(s).bgmPath=t),placeholder:".wav"},null,512),[[u,o(s).bgmPath]]),e("button",{class:"btn-mg-x",onClick:l[8]||(l[8]=t=>o(U).click())}," ファイル選択 "),e("input",{ref_key:"refFirstBGMPath",ref:U,type:"file",accept:".wav",onInput:l[9]||(l[9]=t=>o(s).bgmPath=b(t)),hidden:""},null,544)]),e("div",ie,[ce,c(e("input",{id:"nextChapter",type:"text",class:"","onUpdate:modelValue":l[10]||(l[10]=t=>o(s).nextChapter=t)},null,512),[[u,o(s).nextChapter]])]),e("div",de,[ue,c(e("input",{id:"keepScene",type:"checkbox",name:"keepScene","onUpdate:modelValue":l[11]||(l[11]=t=>o(s).keepScene=t)},null,512),[[w,o(s).keepScene]])])]),(_(!0),h(v,null,k(o(s).scenario,(t,d)=>(_(),h("div",{key:d,class:"edit-wrapper border-color-blue-300 bg-color-blue-100"},[re,e("div",pe,[_e,c(e("input",{type:"checkbox","onUpdate:modelValue":n=>t.isCharacterAllKill=n},null,8,he),[[w,t.isCharacterAllKill]])]),e("div",me,[fe,c(e("input",{type:"checkbox","onUpdate:modelValue":n=>t.isStopBGM=n},null,8,be),[[w,t.isStopBGM]])]),e("div",ge,[ke,c(e("input",{type:"text","onUpdate:modelValue":n=>t.name=n},null,8,ve),[[u,t.name]]),c(e("select",{name:"talkingCharacterId",class:"w-10per","onUpdate:modelValue":n=>t.talkingCharacterId=n,onInput:n=>{const g=o(S).find(a=>a.value==n.target.value);g&&(t.name=g.label)}},[(_(!0),h(v,null,k(o(S),(n,g)=>(_(),h("option",{key:g,value:n.value},j(n.label),9,xe))),128))],40,ye),[[B,t.talkingCharacterId]])]),e("div",Pe,[Ue,c(e("textarea",{name:"message",cols:"50",rows:"5","onUpdate:modelValue":n=>t.message=n},null,8,Ce),[[u,t.message]])]),e("div",Ve,[Ie,c(e("input",{type:"text",class:"","onUpdate:modelValue":n=>t.voicePath=n,placeholder:".wav"},null,8,je),[[u,t.voicePath]]),e("button",{class:"btn-mg-x",onClick:n=>o(f)[d].click()}," ファイル選択 ",8,Be),e("input",{ref_for:!0,ref_key:"refVoicePath",ref:f,type:"file",accept:".wav",onInput:n=>t.voicePath=b(n),hidden:""},null,40,we)]),e("div",Ne,[Se,c(e("input",{type:"text",class:"","onUpdate:modelValue":n=>t.backgroundImagePath=n,placeholder:".png .jpg .jpeg"},null,8,Me),[[u,t.backgroundImagePath]]),e("button",{class:"btn-mg-x",onClick:n=>o(y)[d].click()}," ファイル選択 ",8,$e),e("input",{ref_for:!0,ref_key:"refBackgroundImagePath",ref:y,type:"file",accept:".png,.jpg,.jpeg",onInput:n=>t.backgroundImagePath=b(n),hidden:""},null,40,Ee)]),e("div",Ge,[Oe,c(e("input",{type:"text",class:"","onUpdate:modelValue":n=>t.bgmPath=n,placeholder:".wav"},null,8,Ae),[[u,t.bgmPath]]),e("button",{class:"btn-mg-x",onClick:n=>o(x)[d].click()}," ファイル選択 ",8,De),e("input",{ref_for:!0,ref_key:"refBGMPath",ref:x,type:"file",accept:".wav",onInput:n=>t.bgmPath=b(n),hidden:""},null,40,Fe)]),e("div",Je,[Te,c(e("input",{type:"text",class:"","onUpdate:modelValue":n=>t.sePath=n,placeholder:".wav"},null,8,ze),[[u,t.sePath]]),e("button",{class:"btn-mg-x",onClick:n=>o(C)[d].click()}," ファイル選択 ",8,Le),e("input",{ref_for:!0,ref_key:"refSEPath",ref:C,type:"file",accept:".wav",onInput:n=>t.sePath=b(n),hidden:""},null,40,Re)]),Ke,(_(!0),h(v,null,k(t.characters,(n,g)=>(_(),h("div",{key:g,class:"edit-wrapper border-color-blue-600 bg-color-blue-400"},[e("div",qe,[He,c(e("input",{type:"text",class:"","onUpdate:modelValue":a=>n.name=a},null,8,Qe),[[u,n.name]])]),e("div",We,[Xe,c(e("input",{type:"text",class:"","onUpdate:modelValue":a=>n.id=a},null,8,Ye),[[u,n.id]])]),e("div",Ze,[et,c(e("input",{type:"text",class:"","onUpdate:modelValue":a=>n.imagePath=a,placeholder:".png .jpg .jpeg"},null,8,tt),[[u,n.imagePath]]),e("button",{class:"btn-mg-x",onClick:a=>o(V)[d].click()}," ファイル選択 ",8,nt),e("input",{ref_for:!0,ref_key:"refCharacterImagePath",ref:V,type:"file",accept:".png,.jpg,.jpeg",onInput:a=>n.imagePath=b(a),hidden:""},null,40,lt)]),e("div",ot,[at,c(e("select",{name:"position",class:"","onUpdate:modelValue":a=>n.position=a},[(_(),h(v,null,k(I,(a,P)=>e("option",{value:a.value,key:P},j(a.label),9,it)),64))],8,st),[[B,n.position]])]),e("div",ct,[dt,c(e("select",{name:"moveEffect",class:"","onUpdate:modelValue":a=>n.moveEffect=a},[(_(),h(v,null,k(E,(a,P)=>e("option",{value:a.value,key:P},j(a.label),9,rt)),64))],8,ut),[[B,n.moveEffect]])]),e("div",pt,[_t,c(e("select",{name:"effect",class:"","onUpdate:modelValue":a=>n.effect=a},[(_(),h(v,null,k(G,(a,P)=>e("option",{value:a.value,key:P},j(a.label),9,mt)),64))],8,ht),[[B,n.effect]])]),e("button",{class:"d-block btn-mg-x btn-mg-bottom btn-right",onClick:a=>D(t,g)}," キャラクター削除 ",8,ft)]))),128)),e("button",{class:"d-block btn-mg-x btn-mg-bottom btn-left",onClick:n=>F(t.characters)}," キャラクター追加 ",8,bt),e("button",{class:"d-block btn-mg-x btn-mg-bottom btn-right",onClick:n=>O(d)}," シナリオ削除 ",8,gt)]))),128))]),_:1})}}});export{vt as default};