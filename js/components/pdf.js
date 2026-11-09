const PAGE_W=595;
const PAGE_H=842;
const MARGIN=56;
const LEADING=18;
const latin=(s)=>s.replace(/[\u2018\u2019]/g,"'").replace(/[\u201C\u201D]/g,'"').replace(/[\u2013\u2014]/g,"-").replace(/[^\x20-\x7E\xA0-\xFF]/g,"?");
const esc=(s)=>latin(s).replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)");
function wrap(text,size,width){
const max=Math.floor(width/(size*0.5));
const out=[];
text.split("\n").forEach((para)=>{
let line="";
para.split(" ").forEach((w)=>{
if((line+" "+w).trim().length>max){out.push(line);line=w;}
else line=(line+" "+w).trim();
});
out.push(line);
});
return out;
}
export function buildPdf(title,items,footer){
const pages=[];
let cur=[];
let y=PAGE_H-MARGIN;
const push=(text,size,font)=>{
wrap(text,size,PAGE_W-MARGIN*2).forEach((ln)=>{
if(y<MARGIN+LEADING){pages.push(cur);cur=[];y=PAGE_H-MARGIN;}
cur.push("BT /"+font+" "+size+" Tf "+MARGIN+" "+y+" Td ("+esc(ln)+") Tj ET");
y-=size+6;
});
};
push(title,20,"F2");
y-=8;
items.forEach((it)=>push(it,12,"F1"));
if(footer){y-=10;push(footer,10,"F1");}
pages.push(cur);
const objs=[];
const add=(body)=>{objs.push(body);return objs.length;};
const cat=add("");
const tree=add("");
const f1=add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
const f2=add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");
const kids=[];
pages.forEach((ops)=>{
const stream=ops.join("\n");
const c=add("<< /Length "+stream.length+" >>\nstream\n"+stream+"\nendstream");
const p=add("<< /Type /Page /Parent "+tree+" 0 R /MediaBox [0 0 "+PAGE_W+" "+PAGE_H+"] /Resources << /Font << /F1 "+f1+" 0 R /F2 "+f2+" 0 R >> >> /Contents "+c+" 0 R >>");
kids.push(p+" 0 R");
});
objs[cat-1]="<< /Type /Catalog /Pages "+tree+" 0 R >>";
objs[tree-1]="<< /Type /Pages /Kids ["+kids.join(" ")+"] /Count "+kids.length+" >>";
let out="%PDF-1.4\n";
const offsets=[];
objs.forEach((b,i)=>{offsets.push(out.length);out+=(i+1)+" 0 obj\n"+b+"\nendobj\n";});
const xref=out.length;
out+="xref\n0 "+(objs.length+1)+"\n0000000000 65535 f \n"+offsets.map((o)=>String(o).padStart(10,"0")+" 00000 n \n").join("");
out+="trailer\n<< /Size "+(objs.length+1)+" /Root "+cat+" 0 R >>\nstartxref\n"+xref+"\n%%EOF";
const bytes=new Uint8Array(out.length);
for(let i=0;i<out.length;i++)bytes[i]=out.charCodeAt(i)&255;
return new Blob([bytes],{type:"application/pdf"});
}
export function downloadBlob(blob,name){
const url=URL.createObjectURL(blob);
const a=document.createElement("a");
a.href=url;a.download=name;
document.body.appendChild(a);
a.click();
a.remove();
setTimeout(()=>URL.revokeObjectURL(url),1500);
}
