import {school,waLink} from "../data/school.js";
import {L,onLang} from "../foundation/i18n.js";
const val=(form,name)=>(form.elements[name]?.value||"").trim();
function compose(form){
const topics=[...form.querySelectorAll('input[name="topik"]:checked')].map((c)=>c.parentNode.querySelector("span").textContent.toLowerCase());
const lines=[
L("Halo Bali Global Kinder School, saya ","Hello Bali Global Kinder School, I am ")+val(form,"orangtua")+L(", orang tua dari ",", the parent of ")+val(form,"anak")+L(" (usia "," (age ")+val(form,"usia")+").",
L("Saya ingin menanyakan informasi pendaftaran","I would like to ask about enrollment")+(topics.length?L(", terutama tentang: ",", especially about: ")+topics.join(", "):"")+"."
];
const extra=val(form,"pesan");
if(extra)lines.push(extra);
lines.push(L("Nomor yang dapat dihubungi: ","Contact number: ")+val(form,"kontak")+".");
lines.push(L("Terima kasih.","Thank you."));
return lines.join("\n");
}
async function copyText(text,area){
try{
await navigator.clipboard.writeText(text);
return true;
}catch(err){
area.focus();
area.select();
try{return document.execCommand("copy");}catch(e){return false;}
}
}
export function initEnquiryForm(){
const form=document.getElementById("enquiry-form");
if(!form)return;
const result=document.getElementById("enquiry-result");
const area=document.getElementById("enquiry-message");
const status=document.getElementById("enquiry-status");
const copy=document.getElementById("enquiry-copy");
const wa=document.getElementById("enquiry-wa");
const ig=document.getElementById("enquiry-ig");
const edit=document.getElementById("enquiry-edit");
ig.href=school.instagram;
form.noValidate=true;
const RULES={orangtua:(v)=>v.length>=2||L("Tuliskan nama orang tua atau wali.","Enter the parent or guardian name."),kontak:(v)=>/^\+?[0-9][0-9\s-]{7,16}$/.test(v)||L("Masukkan nomor telepon yang valid, misalnya 0812 3456 7890.","Enter a valid phone number, for example 0812 3456 7890."),anak:(v)=>v.length>=2||L("Tuliskan nama anak.","Enter the child name."),usia:(v)=>v.length>=1||L("Tuliskan usia anak.","Enter the child age.")};
const check=(name)=>{
const input=form.elements[name];
const field=input.closest(".field");
const res=RULES[name](input.value.trim());
let err=field.querySelector(".field__error");
if(res!==true){
if(!err){err=document.createElement("p");err.className="field__error";err.id=name+"-err";field.appendChild(err);}
err.textContent=res;field.classList.add("field--err");field.classList.remove("field--ok");
input.setAttribute("aria-invalid","true");input.setAttribute("aria-describedby",err.id);
return false;
}
if(err)err.remove();
field.classList.remove("field--err");field.classList.add("field--ok");
input.removeAttribute("aria-invalid");input.removeAttribute("aria-describedby");
return true;
};
Object.keys(RULES).forEach((n)=>form.elements[n].addEventListener("blur",()=>check(n)));
Object.keys(RULES).forEach((n)=>form.elements[n].addEventListener("input",()=>{if(form.elements[n].closest(".field--err"))check(n);}));
form.addEventListener("submit",(e)=>{
e.preventDefault();
const bad=Object.keys(RULES).filter((n)=>!check(n));
if(bad.length){form.elements[bad[0]].focus();return;}
const text=compose(form);
area.value=text;
const link=waLink(text);
if(link){wa.href=link;wa.hidden=false;}
form.hidden=true;
result.hidden=false;
status.textContent="";
result.scrollIntoView({behavior:"smooth",block:"start"});
area.focus({preventScroll:true});
});
copy.addEventListener("click",async()=>{
const ok=await copyText(area.value,area);
status.textContent=ok?L("Pesan sudah disalin. Tempel pesan di percakapan dengan sekolah.","Message copied. Paste it into your chat with the school."):L("Pesan belum dapat disalin otomatis. Pilih teks lalu salin secara manual.","Could not copy automatically. Select the text and copy it manually.");
});
edit.addEventListener("click",()=>{
result.hidden=true;
form.hidden=false;
form.scrollIntoView({behavior:"smooth",block:"start"});
});
onLang(()=>{
Object.keys(RULES).forEach((n)=>{if(form.elements[n].closest(".field--err"))check(n);});
if(!result.hidden){area.value=compose(form);const l=waLink(area.value);if(l)wa.href=l;}
});
const body=document.body;
form.addEventListener("focusin",()=>body.classList.add("is-typing"));
form.addEventListener("focusout",()=>body.classList.remove("is-typing"));
}
