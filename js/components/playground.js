import {el,icon,ICON} from "../foundation/dom.js";
const pad=(n)=>String(n).padStart(2,"0");
export function renderPlayground(host,items,options){
const opts=Object.assign({link:null},options);
const n=items.length;
if(!n)return null;
let current=0;
const slides=items.map((it,i)=>el("img",{class:"pgx__img"+(i===0?" is-on":""),src:it.image,alt:it.alt,width:640,height:520,decoding:"async","aria-hidden":i===0?false:"true"}));
const badge=el("span",{class:"pgx__badge",text:pad(1)});
const stage=el("div",{class:"pgx__stage"},...slides,badge,el("span",{class:"pgx__tag",text:"Ilustrasi konsep"}));
const thumbs=items.map((it,i)=>el("button",{class:"pgx__thumb",type:"button","data-id":it.id,"data-accent":it.accent,"aria-pressed":String(i===0)},
el("span",{class:"pgx__thumb-img"},el("img",{src:it.image,alt:"",width:640,height:520,decoding:"async"})),
el("span",{class:"pgx__thumb-name"},el("b",{text:pad(i+1)}),el("span",{text:it.name}))));
const list=el("div",{class:"pgx__thumbs",role:"group","aria-label":"Pilih permainan"},...thumbs);
const count=el("p",{class:"pgx__count",text:pad(1)+" / "+pad(n)});
const name=el("h3",{class:"pgx__name",text:items[0].name});
const desc=el("p",{class:"pgx__desc",text:items[0].desc});
const skills=el("ul",{class:"pgx__skills","aria-label":"Yang dilatih"});
const prev=el("button",{class:"pg__btn",type:"button","aria-label":"Permainan sebelumnya"},icon(ICON.left));
const next=el("button",{class:"pg__btn",type:"button","aria-label":"Permainan berikutnya"},icon(ICON.right));
const live=el("p",{class:"sr-only","aria-live":"polite"});
const panel=el("div",{class:"pgx__panel"},count,name,desc,el("p",{class:"pgx__label",text:"Yang dilatih"}),skills,
el("div",{class:"pgx__nav"},prev,next,opts.link?el("a",{class:"btn btn--primary btn--go",href:opts.link.href,text:opts.link.label}):null),
live);
const root=el("div",{class:"pgx","data-accent":items[0].accent,role:"region","aria-roledescription":"pemilih permainan","aria-label":"Pemilih permainan"},
el("div",{class:"pgx__visual"},stage,el("p",{class:"pgx__hint",text:"Pilih salah satu permainan untuk melihat apa yang dilatih anak."}),list),panel);
const fill=(it)=>skills.replaceChildren(...it.skills.map((s)=>el("li",{text:s})));
fill(items[0]);
const select=(i)=>{
if(i===current)return;
current=i;
const it=items[i];
slides.forEach((s,k)=>{s.classList.toggle("is-on",k===i);if(k===i)s.removeAttribute("aria-hidden");else s.setAttribute("aria-hidden","true");});
thumbs.forEach((t,k)=>t.setAttribute("aria-pressed",String(k===i)));
root.dataset.accent=it.accent;
badge.textContent=pad(i+1);
count.textContent=pad(i+1)+" / "+pad(n);
name.textContent=it.name;
desc.textContent=it.desc;
fill(it);
live.textContent=it.name+", "+(i+1)+" dari "+n;
panel.classList.remove("is-swap");
void panel.offsetWidth;
panel.classList.add("is-swap");
};
const step=(d)=>select((current+d+n)%n);
thumbs.forEach((t,i)=>{
t.addEventListener("click",()=>select(i));
t.addEventListener("keydown",(e)=>{
const move={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[e.key];
if(!move)return;
e.preventDefault();
const k=(i+move+n)%n;
thumbs[k].focus();
select(k);
});
});
prev.addEventListener("click",()=>step(-1));
next.addEventListener("click",()=>step(1));
host.replaceChildren(root);
return {select,step};
}
