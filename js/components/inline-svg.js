const cache=new Map();
let uid=0;
function namespace(svg,prefix){
const ids=[...svg.querySelectorAll("[id]")].map((n)=>n.id);
if(!ids.length)return;
const map=new Map(ids.map((id)=>[id,prefix+id]));
svg.querySelectorAll("[id]").forEach((n)=>{n.id=map.get(n.id);});
const fix=(v)=>v.replace(/url\(#([^)]+)\)/g,(m,id)=>map.has(id)?"url(#"+map.get(id)+")":m);
svg.querySelectorAll("*").forEach((n)=>{
[...n.attributes].forEach((a)=>{
if((a.name==="href"||a.name==="xlink:href")&&a.value.startsWith("#")&&map.has(a.value.slice(1)))n.setAttribute(a.name,"#"+map.get(a.value.slice(1)));
else if(a.value.includes("url(#"))n.setAttribute(a.name,fix(a.value));
});
});
svg.querySelectorAll("style").forEach((s)=>{s.textContent=fix(s.textContent);});
}
async function fetchSvg(src){
if(!cache.has(src)){
cache.set(src,fetch(src).then((r)=>{if(!r.ok)throw new Error(String(r.status));return r.text();}));
}
return cache.get(src);
}
export async function inlineOne(img){
const src=img.getAttribute("src");
if(!src)return null;
try{
const text=await fetchSvg(new URL(src,document.baseURI).href);
const doc=new DOMParser().parseFromString(text,"image/svg+xml");
const svg=doc.documentElement;
if(!svg||svg.nodeName.toLowerCase()!=="svg"||doc.querySelector("parsererror"))return null;
const node=document.importNode(svg,true);
namespace(node,"s"+(++uid)+"-");
node.removeAttribute("width");node.removeAttribute("height");
if(img.className)node.setAttribute("class",img.className);
const alt=img.getAttribute("alt");
if(alt){node.setAttribute("role","img");node.setAttribute("aria-label",alt);}
else node.setAttribute("aria-hidden","true");
node.setAttribute("focusable","false");
const w=img.getAttribute("width"),h=img.getAttribute("height");
if(w&&h)node.style.aspectRatio=w+" / "+h;
img.replaceWith(node);
node.dispatchEvent(new CustomEvent("svg:inlined",{bubbles:true}));
return node;
}catch(err){
return null;
}
}
export function inlineSvgs(root){
const imgs=[...(root||document).querySelectorAll("img[data-inline-svg]")];
return Promise.all(imgs.map(inlineOne));
}
