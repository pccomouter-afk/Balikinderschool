import {el,icon,ICON,reduceMotion} from "../foundation/dom.js";
import {L,onLang} from "../foundation/i18n.js";
import {resolveRoot} from "../foundation/paths.js";
export function renderTeachers(host,items){
const n=items.length;
if(!n)return false;
let active=0;
const cards=items.map((t)=>el("figure",{class:"tc__card"},el("img",{src:resolveRoot(t.photo),alt:t.name,decoding:"async"})));
const track=el("div",{class:"tc__track"},...cards);
const name=el("h3",{class:"tc__name"});
const role=el("p",{class:"tc__role"});
const bio=el("p",{class:"tc__bio muted"});
const text=el("div",{class:"tc__text","aria-live":"polite"},name,role,bio);
const prev=el("button",{class:"nav-btn",type:"button","aria-label":"Pengajar sebelumnya"},icon(ICON.left));
const next=el("button",{class:"nav-btn",type:"button","aria-label":"Pengajar berikutnya"},icon(ICON.right));
const count=el("p",{class:"tc__count caption"});
const bar=el("div",{class:"tc__bar"},prev,count,next);
const root=el("div",{class:"tc",role:"region","aria-roledescription":"carousel","aria-label":"Profil pengajar",tabIndex:0},track,text,bar);
const paint=()=>{
cards.forEach((c,i)=>{
const rel=(i-active+n)%n;
let pos="hidden";
if(rel===0)pos="center";
else if(rel===1)pos="right";
else if(rel===n-1)pos="left";
c.dataset.pos=pos;
c.setAttribute("aria-hidden",pos==="center"?"false":"true");
});
const t=items[active];
name.textContent=t.name;
role.textContent=t.role||"";
bio.textContent=t.bio||"";
bio.hidden=!t.bio;
count.textContent=(active+1)+L(" dari "," of ")+n;
if(!reduceMotion())text.animate([{opacity:0,transform:"translateY(10px)"},{opacity:1,transform:"none"}],{duration:300,easing:"cubic-bezier(.2,.8,.2,1)"});
};
const go=(d)=>{active=(active+d+n)%n;paint();};
prev.addEventListener("click",()=>go(-1));
next.addEventListener("click",()=>go(1));
cards.forEach((c,i)=>c.addEventListener("click",()=>{if(c.dataset.pos==="left")go(-1);if(c.dataset.pos==="right")go(1);}));
root.addEventListener("keydown",(e)=>{if(e.key==="ArrowLeft"){e.preventDefault();go(-1);}if(e.key==="ArrowRight"){e.preventDefault();go(1);}});
let x0=null;
track.addEventListener("pointerdown",(e)=>{x0=e.clientX;});
track.addEventListener("pointerup",(e)=>{
if(x0===null)return;
const dx=e.clientX-x0;
x0=null;
if(Math.abs(dx)>40)go(dx<0?1:-1);
});
track.addEventListener("pointercancel",()=>{x0=null;});
host.replaceChildren(root);
paint();
onLang(paint);
return true;
}
