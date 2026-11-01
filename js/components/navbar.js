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
const setOpen=(open)=>{
nav.classList.toggle("is-open",open);
toggle.setAttribute("aria-expanded",String(open));
toggle.setAttribute("aria-label",open?"Tutup menu":"Buka menu");
if(!open)setDrop(false);
};
const hover=window.matchMedia("(hover:hover) and (min-width:1061px)");
toggle.addEventListener("click",()=>setOpen(!nav.classList.contains("is-open")));
dropBtn.addEventListener("click",()=>setDrop(hover.matches?true:!drop.classList.contains("is-open")));
drop.addEventListener("mouseenter",()=>{if(hover.matches)setDrop(true);});
drop.addEventListener("mouseleave",()=>{if(hover.matches)setDrop(false);});
drop.addEventListener("focusout",(e)=>{if(!drop.contains(e.relatedTarget))setDrop(false);});
document.addEventListener("click",(e)=>{if(!drop.contains(e.target))setDrop(false);});
nav.querySelectorAll("a").forEach((a)=>a.addEventListener("click",()=>setOpen(false)));
document.addEventListener("keydown",(e)=>{
if(e.key!=="Escape")return;
if(drop.classList.contains("is-open")){setDrop(false);dropBtn.focus();return;}
if(nav.classList.contains("is-open")){setOpen(false);toggle.focus();}
});
const onScroll=()=>nav.classList.toggle("is-scrolled",window.scrollY>24);
window.addEventListener("scroll",onScroll,{passive:true});
onScroll();
}
