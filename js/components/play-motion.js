import {reduceMotion} from "../foundation/dom.js";
const LIVELY_MS=2600;
export function initPlayMotion(stage){
if(!stage)return;
let timer=0;
if("IntersectionObserver" in window){
new IntersectionObserver((entries)=>{
stage.dataset.motion=entries[0].isIntersecting?"running":"paused";
},{rootMargin:"120px 0px"}).observe(stage);
}
stage.addEventListener("pointerdown",(e)=>{
if(e.pointerType==="mouse"||reduceMotion())return;
stage.classList.add("is-lively");
window.clearTimeout(timer);
timer=window.setTimeout(()=>stage.classList.remove("is-lively"),LIVELY_MS);
});
}
