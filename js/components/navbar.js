export function initNavbar(page){
const nav=document.getElementById("site-nav");
const toggle=nav.querySelector(".nav__toggle");
const key=({"berita-detail":"berita","jadwalkan-kunjungan":"kontak",kalender:"berita"})[page]||page;
const link=nav.querySelector('[data-nav="'+key+'"]');
const drop=nav.querySelector("[data-drop]");
const dropBtn=drop.querySelector(".nav__drop-btn");
if(link){
link.setAttribute("aria-current","page");
if(drop.contains(link))dropBtn.setAttribute("data-current","");
}
const setDrop=(open)=>{
drop.classList.toggle("is-open",open);
dropBtn.setAttribute("aria-expanded",String(open));
};
const lang=nav.querySelector("[data-lang-root]");
const langBtn=lang.querySelector(".lang__btn");
const langOpts=[...lang.querySelectorAll(".lang__opt")];
const setLang=(open)=>{
lang.classList.toggle("is-open",open);
langBtn.setAttribute("aria-expanded",String(open));
};
const setOpen=(open)=>{
nav.classList.toggle("is-open",open);
toggle.setAttribute("aria-expanded",String(open));
toggle.setAttribute("aria-label",open?"Tutup menu":"Buka menu");
if(!open){setDrop(false);setLang(false);}
};
const focusOpt=(i)=>langOpts[(i+langOpts.length)%langOpts.length].focus();
langBtn.addEventListener("click",()=>{
const open=!lang.classList.contains("is-open");
setLang(open);
if(open)setDrop(false);
});
langBtn.addEventListener("keydown",(e)=>{
if(e.key!=="ArrowDown"&&e.key!=="ArrowUp")return;
e.preventDefault();
e.stopPropagation();
setLang(true);
setDrop(false);
focusOpt(e.key==="ArrowDown"?0:-1);
});
lang.addEventListener("keydown",(e)=>{
const i=langOpts.indexOf(document.activeElement);
if(i<0)return;
if(e.key==="ArrowDown"){e.preventDefault();focusOpt(i+1);}
else if(e.key==="ArrowUp"){e.preventDefault();focusOpt(i-1);}
else if(e.key==="Home"){e.preventDefault();focusOpt(0);}
else if(e.key==="End"){e.preventDefault();focusOpt(-1);}
else if(e.key==="Tab")setLang(false);
});
langOpts.forEach((o)=>o.addEventListener("click",()=>{
setLang(false);
if(nav.classList.contains("is-open")){setOpen(false);toggle.focus();}
else langBtn.focus();
}));
lang.addEventListener("focusout",(e)=>{if(e.relatedTarget&&!lang.contains(e.relatedTarget))setLang(false);});
document.addEventListener("click",(e)=>{if(!lang.contains(e.target))setLang(false);});
const hover=window.matchMedia("(hover:hover) and (min-width:1061px)");
toggle.addEventListener("click",()=>setOpen(!nav.classList.contains("is-open")));
dropBtn.addEventListener("click",()=>{setDrop(hover.matches?true:!drop.classList.contains("is-open"));setLang(false);});
drop.addEventListener("mouseenter",()=>{if(hover.matches)setDrop(true);});
drop.addEventListener("mouseleave",()=>{if(hover.matches)setDrop(false);});
drop.addEventListener("focusout",(e)=>{if(!drop.contains(e.relatedTarget))setDrop(false);});
document.addEventListener("click",(e)=>{if(!drop.contains(e.target))setDrop(false);});
nav.querySelectorAll("a").forEach((a)=>a.addEventListener("click",()=>setOpen(false)));
document.addEventListener("keydown",(e)=>{
if(e.key!=="Escape")return;
if(lang.classList.contains("is-open")){setLang(false);langBtn.focus();return;}
if(drop.classList.contains("is-open")){setDrop(false);dropBtn.focus();return;}
if(nav.classList.contains("is-open")){setOpen(false);toggle.focus();}
});
const onScroll=()=>nav.classList.toggle("is-scrolled",window.scrollY>24);
window.addEventListener("scroll",onScroll,{passive:true});
onScroll();
}
