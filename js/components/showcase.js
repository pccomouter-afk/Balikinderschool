export function initShowcase(root){
if(!root)return;
const tabs=[...root.querySelectorAll("[data-pick]")];
const slides=[...root.querySelectorAll("[data-slide]")];
const frame=root.querySelector(".env__frame");
const pick=(i)=>{
tabs.forEach((t,k)=>t.setAttribute("aria-pressed",String(k===i)));
slides.forEach((s,k)=>{
s.hidden=k!==i;
s.classList.toggle("is-on",k===i);
});
frame.dataset.tone=tabs[i].dataset.tone;
};
tabs.forEach((t,i)=>t.addEventListener("click",()=>pick(i)));
}
