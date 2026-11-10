import {reduceMotion} from "../foundation/dom.js";
const states=new WeakMap();
export const stageOf=(el)=>states.get(el)||null;
const clamp=(v)=>Math.max(-1,Math.min(1,v));
function create(el){
const zone=el.closest("[data-stage-zone]")||el.parentElement;
const s={x:0,y:0,tx:0,ty:0,raf:0,on:false,visible:true};
states.set(el,s);
const paint=()=>{
el.style.setProperty("--px",s.x.toFixed(3));
el.style.setProperty("--py",s.y.toFixed(3));
};
const tick=()=>{
s.raf=0;
s.x+=(s.tx-s.x)*.09;
s.y+=(s.ty-s.y)*.09;
if(Math.abs(s.tx-s.x)<.002&&Math.abs(s.ty-s.y)<.002){s.x=s.tx;s.y=s.ty;paint();return;}
paint();
if(s.on&&s.visible)s.raf=requestAnimationFrame(tick);
};
const wake=()=>{if(!s.raf&&s.visible)s.raf=requestAnimationFrame(tick);};
const move=(e)=>{
const r=el.getBoundingClientRect();
if(!r.width)return;
s.tx=clamp((e.clientX-(r.left+r.width/2))/(r.width*.75));
s.ty=clamp((e.clientY-(r.top+r.height/2))/(r.height*.75));
wake();
};
const leave=()=>{s.tx=0;s.ty=0;wake();};
const media=window.matchMedia("(hover:hover) and (pointer:fine)");
const apply=()=>{
const want=media.matches&&!reduceMotion();
if(want===s.on)return;
s.on=want;
if(want){zone.addEventListener("pointermove",move,{passive:true});zone.addEventListener("pointerleave",leave);}
else{zone.removeEventListener("pointermove",move);zone.removeEventListener("pointerleave",leave);s.tx=s.ty=0;wake();}
};
apply();
media.addEventListener?.("change",apply);
if("IntersectionObserver" in window){
new IntersectionObserver((e)=>{s.visible=e[0].isIntersecting;if(!s.visible&&s.raf){cancelAnimationFrame(s.raf);s.raf=0;}},{threshold:0}).observe(el);
}
return s;
}
export function initStages(){document.querySelectorAll("[data-stage]").forEach(create);}
