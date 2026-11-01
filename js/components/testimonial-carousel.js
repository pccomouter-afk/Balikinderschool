import {el,icon,ICON,reduceMotion} from "../foundation/dom.js";
import {resolveRoot} from "../foundation/paths.js";
const NS="http://www.w3.org/2000/svg";
const silhouette=()=>{
const svg=document.createElementNS(NS,"svg");
svg.setAttribute("viewBox","0 0 100 100");svg.setAttribute("aria-hidden","true");svg.setAttribute("class","ts__ph");
const head=document.createElementNS(NS,"circle");head.setAttribute("cx","50");head.setAttribute("cy","38");head.setAttribute("r","18");
const body=document.createElementNS(NS,"path");body.setAttribute("d","M16 100C16 74 31 62 50 62S84 74 84 100Z");
svg.append(head,body);
return svg;
};
export function renderTestimonials(host,items){
const n=items.length;
if(!n)return false;
let active=0;
const avatars=items.map((t,i)=>{
const face=t.photo?el("img",{src:resolveRoot(t.photo),alt:t.name,decoding:"async"}):silhouette();
return el("button",{class:"ts__avatar",type:"button","aria-label":"Lihat testimoni "+t.name},face);
});
const quote=el("p",{class:"ts__quote"});
const who=el("p",{class:"ts__who"});
const role=el("p",{class:"ts__role caption"});
const body=el("blockquote",{class:"ts__body","aria-live":"polite"},quote,who,role);
const prev=el("button",{class:"nav-btn",type:"button","aria-label":"Testimoni sebelumnya"},icon(ICON.left));
const next=el("button",{class:"nav-btn",type:"button","aria-label":"Testimoni berikutnya"},icon(ICON.right));
const marks=items.map((t,i)=>el("button",{class:"ts__mark",type:"button","aria-label":"Testimoni "+(i+1)}));
const bar=el("div",{class:"ts__bar"},prev,el("div",{class:"ts__marks"},...marks),next);
const root=el("div",{class:"ts",role:"region","aria-roledescription":"carousel","aria-label":"Testimoni orang tua"},el("div",{class:"ts__avatars",role:"group","aria-label":"Pilih testimoni"},...avatars),body,bar);
const paint=()=>{
const t=items[active];
quote.textContent=t.quote;
who.textContent=t.name;
role.textContent=t.role||"";
role.hidden=!t.role;
avatars.forEach((a,i)=>{
const rel=(i-active+n)%n;
let pos="hidden";
if(rel===0)pos="center";
else if(rel===1)pos="right";
else if(rel===n-1)pos="left";
a.dataset.pos=pos;
a.tabIndex=pos==="hidden"?-1:0;
if(i===active)a.setAttribute("aria-current","true");else a.removeAttribute("aria-current");
});
marks.forEach((m,i)=>{if(i===active)m.setAttribute("aria-current","true");else m.removeAttribute("aria-current");});
if(!reduceMotion())body.animate([{opacity:0,transform:"translateY(12px)"},{opacity:1,transform:"none"}],{duration:380,easing:"cubic-bezier(.2,.8,.2,1)"});
};
const set=(i)=>{active=(i+n)%n;paint();};
prev.addEventListener("click",()=>set(active-1));
next.addEventListener("click",()=>set(active+1));
avatars.forEach((a,i)=>a.addEventListener("click",()=>set(i)));
marks.forEach((m,i)=>m.addEventListener("click",()=>set(i)));
host.replaceChildren(root);
paint();
return true;
}
