import {el,icon,ICON} from "../foundation/dom.js";
import {resolveRoot} from "../foundation/paths.js";
import {L,t} from "../foundation/i18n.js";
function lightbox(items){
const img=el("img",{alt:""});
const title=el("strong");
const text=el("span");
const count=el("span",{class:"lb__count"});
const prev=el("button",{class:"nav-btn",type:"button","aria-label":"Foto sebelumnya"},icon(ICON.left));
const next=el("button",{class:"nav-btn",type:"button","aria-label":"Foto berikutnya"},icon(ICON.right));
const close=el("button",{class:"btn btn--yellow btn--sm",type:"button",text:"Tutup"});
const dlg=el("dialog",{class:"lb","aria-label":"Tampilan foto"},el("figure",{class:"lb__fig"},img,el("figcaption",{class:"lb__cap"},title,text)),el("div",{class:"lb__bar"},prev,count,next,close));
document.body.appendChild(dlg);
let list=items,i=0,opener=null;
const show=(n)=>{
i=(n+list.length)%list.length;
const g=list[i];
img.src=resolveRoot(g.src);img.alt=g.alt||"";
title.textContent=g.caption||"";text.textContent=g.detail||"";
count.textContent=(i+1)+" / "+list.length;
};
prev.addEventListener("click",()=>show(i-1));
next.addEventListener("click",()=>show(i+1));
close.addEventListener("click",()=>dlg.close());
dlg.addEventListener("click",(e)=>{if(e.target===dlg)dlg.close();});
dlg.addEventListener("keydown",(e)=>{if(e.key==="ArrowLeft")show(i-1);if(e.key==="ArrowRight")show(i+1);});
dlg.addEventListener("close",()=>{if(opener)opener.focus();});
return {open(subset,n,btn){list=subset;opener=btn;show(n);dlg.showModal();}};
}
export function renderGallery(host,items,opts){
const full=opts&&opts.variant==="full";
if(!items.length)return false;
if(!full){
const list=items.slice(0,6);
const figs=list.map((g,i)=>el("figure",{class:"gallery__item gallery__item--"+(i+1)},el("img",{src:g.src,alt:g.alt,decoding:"async"}),g.caption?el("figcaption",{text:g.caption}):null));
host.replaceChildren(el("div",{class:"gallery__grid","data-count":String(list.length)},...figs));
return true;
}
const lb=lightbox(items);
const grid=el("div",{class:"gallery__grid gallery__grid--full"});
const cats=[...new Set(items.map((g)=>g.category).filter(Boolean))];
let active="";
const paint=()=>{
const subset=items.filter((g)=>!active||g.category===active);
grid.replaceChildren(...subset.map((g,n)=>{
const b=el("button",{type:"button","aria-label":L("Buka foto: ","Open photo: ")+t(g.caption||g.alt)},el("img",{src:g.src,alt:g.alt,decoding:"async"}));
b.addEventListener("click",()=>lb.open(subset,n,b));
return el("figure",{class:"gallery__item"},b,g.caption?el("figcaption",{text:g.caption}):null);
}));
};
const nodes=[];
if(cats.length>1){
const btns=["",...cats].map((c)=>{
const b=el("button",{type:"button","aria-pressed":c===""?"true":"false",text:c||"Semua"});
b.addEventListener("click",()=>{active=c;btns.forEach((x)=>x.setAttribute("aria-pressed",String(x===b)));paint();});
return b;
});
nodes.push(el("div",{class:"gal-filter",role:"group","aria-label":"Filter kategori"},...btns));
}
paint();
host.replaceChildren(...nodes,grid);
return true;
}
