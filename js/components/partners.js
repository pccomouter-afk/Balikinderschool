import {el} from "../foundation/dom.js";
export function renderPartners(host,items){
if(!items.length)return false;
const logos=items.map((p)=>{
const img=el("img",{src:p.logo,alt:p.name,decoding:"async"});
return p.url?el("a",{class:"partners__item",href:p.url,target:"_blank",rel:"noopener","aria-label":p.name},img):el("div",{class:"partners__item"},img);
});
host.replaceChildren(el("div",{class:"partners__row"},...logos));
return true;
}
