import {reduceMotion} from "../foundation/dom.js";
export function initDrawLines(){
const lines=[...document.querySelectorAll("[data-draw]")];
if(!lines.length)return;
if(reduceMotion()||!("IntersectionObserver" in window)){lines.forEach((n)=>n.classList.add("is-drawn"));return;}
const io=new IntersectionObserver((entries)=>{
entries.forEach((e)=>{if(!e.isIntersecting)return;e.target.classList.add("is-drawn");io.unobserve(e.target);});
},{threshold:.4});
lines.forEach((n)=>io.observe(n));
}
