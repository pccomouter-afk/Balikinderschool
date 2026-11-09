export function renderAccordion(host,items){
host.replaceChildren();
items.forEach((item,i)=>{
const wrap=document.createElement("div");
wrap.className="accordion__item";
const btn=document.createElement("button");
btn.type="button";btn.className="accordion__trigger";
btn.id="acc-btn-"+i;btn.setAttribute("aria-expanded","false");btn.setAttribute("aria-controls","acc-panel-"+i);
const label=document.createElement("span");label.textContent=item.q;
const icon=document.createElement("span");icon.className="accordion__icon";icon.setAttribute("aria-hidden","true");
btn.append(label,icon);
const panel=document.createElement("div");
panel.className="accordion__panel";panel.id="acc-panel-"+i;panel.setAttribute("role","region");panel.setAttribute("aria-labelledby",btn.id);
const inner=document.createElement("div");
const p=document.createElement("p");p.textContent=item.a;
inner.appendChild(p);panel.appendChild(inner);
btn.addEventListener("click",()=>btn.setAttribute("aria-expanded",String(btn.getAttribute("aria-expanded")!=="true")));
wrap.append(btn,panel);host.appendChild(wrap);
});
}
