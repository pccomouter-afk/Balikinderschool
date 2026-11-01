import {el} from "../foundation/dom.js";
import {P,L,onLang,getLang} from "../foundation/i18n.js";
import {events,eventCategories} from "../data/events.js";
import {downloadBlob} from "../components/pdf.js";
const locale=()=>getLang()==="en"?"en-GB":"id-ID";
const catOf=(k)=>eventCategories.find((c)=>c.key===k);
const pad=(n)=>String(n).padStart(2,"0");
const iso=(d)=>d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());
const parse=(s)=>new Date(s+"T00:00:00");
function ics(ev){
const d=ev.date.replace(/-/g,"");
const end=new Date(parse(ev.date));end.setDate(end.getDate()+1);
const e=end.getFullYear()+pad(end.getMonth()+1)+pad(end.getDate());
const clean=(s)=>s.replace(/\\/g,"\\\\").replace(/;/g,"\\;").replace(/,/g,"\\,").replace(/\n/g,"\\n");
return ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Bali Global Kinder School//Calendar//EN","CALSCALE:GREGORIAN","BEGIN:VEVENT","UID:"+d+"-"+ev.cat+"@bgks.demo","DTSTAMP:20260101T000000Z","DTSTART;VALUE=DATE:"+d,"DTEND;VALUE=DATE:"+e,"SUMMARY:"+clean(ev.title.id+" / "+ev.title.en),"DESCRIPTION:"+clean(ev.desc.id+" | "+ev.desc.en+" (demo)"),"LOCATION:"+clean("Bali Global Kinder School, Dalung, Badung"),"END:VEVENT","END:VCALENDAR"].join("\r\n")+"\r\n";
}
export function initPage(){
const grid=document.getElementById("cal-grid");
const title=document.getElementById("cal-title");
const list=document.getElementById("cal-list");
const empty=document.getElementById("cal-empty");
const detail=document.getElementById("cal-detail");
const filters=document.getElementById("cal-filters");
const sideTitle=document.getElementById("cal-side-title");
const now=new Date();
const state={month:new Date(now.getFullYear(),now.getMonth(),1),cat:"all",picked:null};
const visible=()=>events.filter((e)=>state.cat==="all"||e.cat===state.cat);
const monthEvents=()=>visible().filter((e)=>e.date.slice(0,7)===state.month.getFullYear()+"-"+pad(state.month.getMonth()+1));
const showDetail=(ev)=>{
state.picked=ev;
if(!ev){detail.replaceChildren();return;}
const dl=el("button",{class:"btn btn--ghost btn--sm",type:"button",text:L("Tambah ke kalender (.ics)","Add to calendar (.ics)")});
dl.addEventListener("click",()=>downloadBlob(new Blob([ics(ev)],{type:"text/calendar"}),"bgks-"+ev.date+".ics"));
detail.replaceChildren(el("div",{class:"cal__card"},el("span",{class:"nc__cat",text:P(catOf(ev.cat))}),el("h4",{text:P(ev.title)}),el("p",{class:"caption",text:parse(ev.date).toLocaleDateString(locale(),{weekday:"long",day:"numeric",month:"long",year:"numeric"})+(ev.time?" · "+ev.time:"")}),el("p",{text:P(ev.desc)}),dl));
};
const paint=()=>{
const m=state.month;
title.textContent=m.toLocaleDateString(locale(),{month:"long",year:"numeric"});
sideTitle.textContent=L("Acara bulan ini","Events this month");
const first=new Date(m.getFullYear(),m.getMonth(),1);
const days=new Date(m.getFullYear(),m.getMonth()+1,0).getDate();
const evs=monthEvents();
const head=[];
for(let i=0;i<7;i++)head.push(el("span",{class:"vcal__dow",role:"columnheader",text:new Date(2024,0,7+i).toLocaleDateString(locale(),{weekday:"short"})}));
const cells=[];
for(let i=0;i<first.getDay();i++)cells.push(el("span",{class:"vcal__blank","aria-hidden":"true"}));
for(let n=1;n<=days;n++){
const d=new Date(m.getFullYear(),m.getMonth(),n);
const here=evs.filter((e)=>e.date===iso(d));
const b=el("button",{class:"vcal__day cal__day"+(here.length?" has-event":"")+(state.picked&&here.includes(state.picked)?" is-on":""),type:"button",text:String(n),disabled:!here.length,"aria-label":d.toLocaleDateString(locale(),{day:"numeric",month:"long"})+(here.length?": "+here.map((e)=>P(e.title)).join(", "):"")});
if(here.length)b.addEventListener("click",()=>{showDetail(here[0]);paint();});
cells.push(b);
}
grid.replaceChildren(...head,...cells);
list.replaceChildren(...evs.map((ev)=>{
const li=el("li",null);
const b=el("button",{class:"cal__item"+(state.picked===ev?" is-on":""),type:"button"},el("b",{text:String(parseInt(ev.date.slice(8),10))}),el("span",null,el("span",{class:"cal__t",text:P(ev.title)}),el("span",{class:"caption",text:P(catOf(ev.cat))})));
b.addEventListener("click",()=>{showDetail(ev);paint();});
li.appendChild(b);
return li;
}));
empty.hidden=evs.length>0;
[...filters.children].forEach((b)=>b.setAttribute("aria-pressed",String(b.dataset.cat===state.cat)));
};
const buildFilters=()=>{
filters.replaceChildren(...[{key:"all",id:"Semua",en:"All"},...eventCategories].map((c)=>{
const b=el("button",{class:"chip",type:"button","data-cat":c.key,"aria-pressed":"false",text:P(c)});
b.addEventListener("click",()=>{state.cat=c.key;state.picked=null;detail.replaceChildren();paint();});
return b;
}));
};
document.getElementById("cal-prev").addEventListener("click",()=>{state.month=new Date(state.month.getFullYear(),state.month.getMonth()-1,1);state.picked=null;detail.replaceChildren();paint();});
document.getElementById("cal-next").addEventListener("click",()=>{state.month=new Date(state.month.getFullYear(),state.month.getMonth()+1,1);state.picked=null;detail.replaceChildren();paint();});
buildFilters();
paint();
onLang(()=>{buildFilters();const p=state.picked;paint();showDetail(p);});
}
