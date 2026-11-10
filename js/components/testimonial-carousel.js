import {el,icon,ICON,reduceMotion} from "../foundation/dom.js";
import {resolveRoot} from "../foundation/paths.js";
const NS="http://www.w3.org/2000/svg";
const AUTOPLAY_MS=7000;
const SWAP_MS=460;
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
let target=0;
let busy=false;
let swapTimer=0;
let timer=0;
let hovering=false;
let focusing=false;
const avatars=items.map((t)=>{
const face=t.photo?el("img",{src:resolveRoot(t.photo),alt:"",decoding:"async"}):silhouette();
return el("button",{class:"ts__avatar",type:"button","aria-label":t.name},face);
});
const slides=items.map((t)=>el("blockquote",{class:"ts__slide"},
el("p",{class:"ts__quote",text:t.quote}),
el("p",{class:"ts__who",text:t.name}),
t.role?el("p",{class:"ts__role caption",text:t.role}):null));
const stack=el("div",{class:"ts__stack"},...slides);
const live=el("p",{class:"sr-only","aria-live":"polite"});
const prev=el("button",{class:"nav-btn",type:"button","aria-label":"Testimoni sebelumnya"},icon(ICON.left));
const next=el("button",{class:"nav-btn",type:"button","aria-label":"Testimoni berikutnya"},icon(ICON.right));
const marks=items.map((t,i)=>el("button",{class:"ts__mark",type:"button","aria-label":"Testimoni "+(i+1)}));
const bar=el("div",{class:"ts__bar"},prev,el("div",{class:"ts__marks"},...marks),next);
const root=el("div",{class:"ts",role:"region","aria-roledescription":"carousel","aria-label":"Testimoni orang tua"},
el("div",{class:"ts__avatars",role:"group","aria-label":"Pilih testimoni"},...avatars),stack,bar,live);
const place=(i)=>{
const rel=(i-active+n)%n;
if(rel===0)return "center";
if(rel===1)return "right";
if(rel===n-1)return "left";
return rel<=n/2?"hidden-right":"hidden-left";
};
const paint=()=>{
avatars.forEach((a,i)=>{
const pos=place(i);
a.dataset.pos=pos;
a.tabIndex=pos==="center"||pos==="left"||pos==="right"?0:-1;
if(i===active)a.setAttribute("aria-current","true");else a.removeAttribute("aria-current");
});
slides.forEach((s,i)=>{
s.classList.toggle("is-active",i===active);
if(i===active)s.removeAttribute("aria-hidden");else s.setAttribute("aria-hidden","true");
});
marks.forEach((m,i)=>{if(i===active)m.setAttribute("aria-current","true");else m.removeAttribute("aria-current");});
};
const canPlay=()=>!reduceMotion()&&!document.hidden&&!hovering&&!focusing&&root.dataset.visible!=="false";
const stop=()=>{window.clearTimeout(timer);timer=0;};
const schedule=()=>{
stop();
if(!canPlay())return;
timer=window.setTimeout(()=>{go(target+1);},AUTOPLAY_MS);
};
const apply=()=>{
const to=target;
if(to===active){schedule();return;}
slides[active].classList.add("is-leaving");
slides[to].classList.remove("is-leaving");
active=to;
paint();
live.textContent=items[active].name;
busy=true;
window.clearTimeout(swapTimer);
swapTimer=window.setTimeout(()=>{
slides.forEach((s,k)=>{if(k!==active)s.classList.remove("is-leaving");});
busy=false;
if(target!==active)apply();
},SWAP_MS);
schedule();
};
const go=(i)=>{
target=(i+n)%n;
if(!busy)apply();
};
prev.addEventListener("click",()=>go(target-1));
next.addEventListener("click",()=>go(target+1));
avatars.forEach((a,i)=>a.addEventListener("click",()=>{if(i!==target)go(i);}));
marks.forEach((m,i)=>m.addEventListener("click",()=>go(i)));
root.addEventListener("keydown",(e)=>{
if(e.key==="ArrowLeft"){e.preventDefault();go(target-1);}
if(e.key==="ArrowRight"){e.preventDefault();go(target+1);}
});
root.addEventListener("pointerenter",(e)=>{if(e.pointerType==="mouse"){hovering=true;stop();}});
root.addEventListener("pointerleave",()=>{hovering=false;schedule();});
root.addEventListener("focusin",(e)=>{if(e.target.matches(":focus-visible")){focusing=true;stop();}});
root.addEventListener("focusout",(e)=>{if(!root.contains(e.relatedTarget)){focusing=false;schedule();}});
document.addEventListener("visibilitychange",schedule);
if("IntersectionObserver" in window){
new IntersectionObserver((entries)=>{
root.dataset.visible=String(entries[0].isIntersecting);
schedule();
},{threshold:0.2}).observe(root);
}
host.replaceChildren(root);
paint();
schedule();
return true;
}
