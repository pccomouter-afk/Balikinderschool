import {el,icon,ICON,reduceMotion} from "../foundation/dom.js";
const pad=(n)=>String(n).padStart(2,"0");
export function renderPlaygroundHome(host,items,options){
const opts=Object.assign({link:null,showSkills:false},options);
const n=items.length;
if(!n)return null;
let current=0;
let running=[];
const word=el("p",{class:"pg__word","aria-hidden":"true",text:items[0].name});
const slides=items.map((it,i)=>el("figure",{class:"pg__slide",hidden:i!==0},el("img",{src:it.image,alt:it.alt,width:640,height:520,decoding:"async"})));
const stage=el("div",{class:"pg__stage"},word,...slides,el("p",{class:"pg__tag",text:"Ilustrasi konsep permainan"}));
const prev=el("button",{class:"pg__btn",type:"button","aria-label":"Permainan sebelumnya"},icon(ICON.up));
const next=el("button",{class:"pg__btn",type:"button","aria-label":"Permainan berikutnya"},icon(ICON.down));
const dots=items.map((it,i)=>el("button",{class:"pg__dot",type:"button","aria-label":"Tampilkan "+it.name,"aria-current":i===0?"true":false}));
const controls=el("div",{class:"pg__controls",role:"group","aria-label":"Pilih permainan"},prev,el("div",{class:"pg__dots"},...dots),next);
const count=el("p",{class:"pg__count",text:pad(1)+" / "+pad(n)});
const name=el("h3",{class:"pg__name",text:items[0].name});
const desc=el("p",{class:"pg__desc",text:items[0].desc});
const skills=el("ul",{class:"pg__skills","aria-label":"Yang dilatih"});
const live=el("p",{class:"sr-only","aria-live":"polite"});
const info=el("div",{class:"pg__now"},count,name,desc,opts.showSkills?skills:null,opts.link?el("a",{class:"btn btn--primary",href:opts.link.href,text:opts.link.label}):null,live);
const root=el("div",{class:"pg","data-accent":items[0].accent,role:"region","aria-roledescription":"pemilih permainan","aria-label":"Pemilih permainan"},el("div",{class:"pg__info"},info),el("div",{class:"pg__wrap"},stage,controls));
const fillSkills=(it)=>{skills.replaceChildren(...it.skills.map((s)=>el("li",{text:s})));};
fillSkills(items[0]);
const anim=(node,frames,ms,ease)=>{
if(reduceMotion())return null;
const a=node.animate(frames,{duration:ms,easing:ease,fill:"both"});
running.push(a);
return a;
};
const go=(target,dir)=>{
if(target===current)return;
running.forEach((a)=>a.finish());
running=[];
const from=slides[current];
const to=slides[target];
const dist=48*dir;
current=target;
to.hidden=false;
const out=anim(from,[{opacity:1,transform:"none"},{opacity:0,transform:"translateY("+(-dist)+"px) scale(.96)"}],320,"cubic-bezier(.4,0,.2,1)");
const inn=anim(to,[{opacity:0,transform:"translateY("+dist+"px) scale(.96)"},{opacity:1,transform:"none"}],450,"cubic-bezier(.2,.8,.2,1)");
const settle=()=>{slides.forEach((s,i)=>{if(i!==current)s.hidden=true;});};
if(out)out.finished.then(()=>{settle();out.cancel();}).catch(()=>{});else settle();
if(inn)inn.finished.then(()=>{inn.cancel();}).catch(()=>{});
const it=items[target];
root.dataset.accent=it.accent;
word.textContent=it.name;
count.textContent=pad(target+1)+" / "+pad(n);
name.textContent=it.name;
desc.textContent=it.desc;
fillSkills(it);
dots.forEach((d,i)=>{if(i===target)d.setAttribute("aria-current","true");else d.removeAttribute("aria-current");});
live.textContent=it.name+", "+(target+1)+" dari "+n;
[word,name,desc,skills].forEach((t)=>anim(t,[{opacity:0,transform:"translateY("+(dir*14)+"px)"},{opacity:1,transform:"none"}],380,"cubic-bezier(.2,.8,.2,1)"));
};
const step=(d)=>go((current+d+n)%n,d);
prev.addEventListener("click",()=>step(-1));
next.addEventListener("click",()=>step(1));
dots.forEach((d,i)=>d.addEventListener("click",()=>go(i,i>current?1:-1)));
root.addEventListener("keydown",(e)=>{
if(e.key==="ArrowUp"||e.key==="ArrowLeft"){e.preventDefault();step(-1);}
if(e.key==="ArrowDown"||e.key==="ArrowRight"){e.preventDefault();step(1);}
});
host.replaceChildren(root);
return {go,step};
}
