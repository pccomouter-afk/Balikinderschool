import {school,waForPage} from "../data/school.js";
import {resolveRoot} from "../foundation/paths.js";
import {L} from "../foundation/i18n.js";
const topics=[
{keys:["lokasi","alamat","dimana","di mana","peta","arah","kunjung","datang","location","address","where","map","direction","visit","parking","parkir"],text:["Alamat yang tercantum di situs ini: "+school.address+". Halaman Kontak memuat peta dan petunjuk arah. Untuk berkunjung, pilih jadwal di halaman Jadwalkan Kunjungan.","The address listed on this site: "+school.address+". The Contact page has a map and directions. To visit, pick a time on the Schedule a Visit page."],link:[["Jadwalkan Kunjungan","Schedule a Visit"],"pages/jadwalkan-kunjungan.html"]},
{keys:["fasilitas","ruang","lingkungan","facility","facilities","classroom","campus"],text:["Halaman Fasilitas memuat daftar pertanyaan kunjungan dan gambaran lingkungan belajar. Daftarnya bisa disalin, dibagikan lewat WhatsApp, atau diunduh sebagai PDF.","The Facilities page has a visit question list and an overview of the learning environment. You can copy the list, share it on WhatsApp, or download it as a PDF."],link:[["Buka Fasilitas","Open Facilities"],"pages/fasilitas.html"]},
{keys:["faq","pertanyaan umum","common question"],text:["Pertanyaan umum orang tua dikelompokkan di halaman FAQ dan dapat dicari serta difilter.","Common parent questions are grouped on the FAQ page, where you can search and filter them."],link:[["Buka FAQ","Open FAQ"],"pages/faq.html"]},
{keys:["biaya","harga","bayar","spp","tarif","fee","fees","price","cost","tuition"],text:["Rincian biaya disampaikan langsung oleh sekolah sesuai kelompok belajar. Tanyakan lewat WhatsApp tanpa komitmen apa pun.","Fee details are shared directly by the school according to the learning group. Ask on WhatsApp without any commitment."],link:[["Informasi Pendaftaran","Enrollment Information"],"pages/pendaftaran.html"]},
{keys:["usia","umur","tahun","age","old"],text:["Sekolah melayani anak usia dini. Kelompok usia yang tepat dijelaskan sekolah saat konsultasi, bisa lewat formulir pendaftaran atau WhatsApp.","The school serves early childhood. The right age group is explained by the school during a consultation, through the enrollment form or WhatsApp."],link:[["Buka halaman Pendaftaran","Open the Enrollment page"],"pages/pendaftaran.html"]},
{keys:["daftar","pendaftaran","registrasi","masuk","enroll","enrol","register","admission","apply"],text:["Buka halaman Pendaftaran untuk melihat alur awal dan menyiapkan pesan minat pendaftaran. Informasi resmi tetap dikonfirmasi oleh pihak sekolah.","Open the Enrollment page to see the first steps and prepare an enrollment inquiry. Official information is still confirmed by the school."],link:[["Buka halaman Pendaftaran","Open the Enrollment page"],"pages/pendaftaran.html"]},
{keys:["program","kelas","belajar","kurikulum","kegiatan","class","learn","curriculum","activity","activities"],text:["Halaman Program Belajar memberi gambaran umum kegiatan belajar anak usia dini, contoh jadwal harian, dan area perkembangan. Ketentuan terbaru dikonfirmasi langsung oleh sekolah.","The Learning Programs page gives an overview of early childhood learning activities, a sample daily schedule, and development areas. Current details are confirmed directly by the school."],link:[["Buka Program Belajar","Open Learning Programs"],"pages/program-belajar.html"]},
{keys:["main","bermain","ayunan","perosotan","taman","balok","jungkitan","panjat","mangkok","tempat duduk","playground","play","swing","slide","seesaw"],text:["Dunia Bermain menampilkan ilustrasi konsep permainan yang bisa dijelajahi. Gambarnya bukan dokumentasi fasilitas sekolah.","Play World shows concept illustrations of games you can explore. The pictures are not documentation of school facilities."],link:[["Buka Dunia Bermain","Open Play World"],"pages/dunia-bermain.html"]},
{keys:["kalender","jadwal","acara","calendar","schedule","event"],text:["Halaman Kalender memuat contoh agenda dan acara sekolah dengan navigasi bulan.","The Calendar page lists sample school agendas and events with month navigation."],link:[["Buka Kalender","Open Calendar"],"pages/kalender.html"]},
{keys:["kontak","hubungi","admin","whatsapp","telepon","instagram","contact","phone","call"],text:["Cara tercepat adalah WhatsApp di 08388621176, atau lewat Instagram resmi Bali Global Kinder School.","The quickest way is WhatsApp at 08388621176, or through the official Bali Global Kinder School Instagram."],link:[["Buka Kontak","Open Contact"],"pages/kontak.html"]},
{keys:["kenal","tentang","sekolah","profil","guru","about","school","teacher","profile"],text:["Mulai dari halaman Tentang Sekolah untuk membaca profil, filosofi Learn, Play, Grow, dan tim pendidik.","Start with the About the School page to read the profile, the Learn, Play, Grow philosophy, and the teaching team."],link:[["Buka Tentang Sekolah","Open About the School"],"pages/tentang.html"]}
];
const fallback={text:["Maaf, saya belum punya jawaban untuk pertanyaan itu. Silakan hubungi admin sekolah lewat WhatsApp agar mendapat informasi yang tepat.","Sorry, I do not have an answer to that yet. Please contact the school admin on WhatsApp for accurate information."],link:[["Instagram resmi","Official Instagram"],school.instagram]};
function reply(q){
const s=q.toLowerCase();
return topics.find((t)=>t.keys.some((k)=>s.includes(k)))||fallback;
}
const bi=(pair,tag)=>{
const n=document.createElement(tag||"span");
n.dataset.id=pair[0];n.dataset.en=pair[1];
n.textContent=L(pair[0],pair[1]);
return n;
};
const reduce=()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export function initChatbot(){
const toggle=document.getElementById("chat-toggle");
const panel=document.getElementById("chat-panel");
const log=document.getElementById("chat-log");
const form=document.getElementById("chat-form");
const input=document.getElementById("chat-input");
const wa=document.getElementById("chat-wa");
const waNote=document.getElementById("chat-wa-note");
const quickToggle=document.getElementById("chat-quick-toggle");
const chips=document.getElementById("chat-chips");
const setWa=()=>{const link=waForPage(document.body.dataset.page);if(link){wa.href=link;wa.hidden=false;waNote.hidden=true;}};
setWa();
document.addEventListener("bgks:lang",setWa);
let busy=false;
let hideTimer=0;
let typingTimer=0;
const queue=[];
const nearBottom=()=>log.scrollHeight-log.scrollTop-log.clientHeight<80;
const toBottom=()=>{log.scrollTo({top:log.scrollHeight,behavior:reduce()?"auto":"smooth"});};
const make=(who)=>{
const m=document.createElement("div");
m.className="chat__msg chat__msg--"+who;
return m;
};
const anchorOf=(anchor)=>{
const a=bi(anchor[0],"a");a.href=resolveRoot(anchor[1]);
if(/^https?:/.test(anchor[1])){a.target="_blank";a.rel="noopener";}
return a;
};
const add=(who,text,anchor)=>{
const stick=who==="user"||nearBottom();
const m=make(who);
if(Array.isArray(text))m.appendChild(bi(text));else m.textContent=text;
if(anchor)m.appendChild(anchorOf(anchor));
log.appendChild(m);
if(stick)toBottom();
return m;
};
const setQuick=(open)=>{
quickToggle.setAttribute("aria-expanded",String(open));
chips.hidden=!open;
};
const typing=()=>{
const m=make("bot");
m.classList.add("chat__msg--typing");
m.setAttribute("role","status");
m.setAttribute("aria-label","Asisten sedang mengetik");
for(let i=0;i<3;i++){const d=document.createElement("span");d.className="chat__dot";d.setAttribute("aria-hidden","true");m.appendChild(d);}
const stick=nearBottom();
log.appendChild(m);
if(stick)toBottom();
return m;
};
const reveal=(r,done)=>{
const stick=nearBottom();
const m=make("bot");
const shown=document.createElement("span");
const rest=document.createElement("span");
rest.className="chat__rest";
rest.setAttribute("aria-hidden","true");
const full=L(r.text[0],r.text[1]);
rest.textContent=full;
m.append(shown,rest);
log.appendChild(m);
if(stick)toBottom();
const finish=()=>{
m.replaceChildren(bi(r.text),anchorOf(r.link));
if(stick||nearBottom())toBottom();
done();
};
if(reduce()){finish();return;}
const words=full.split(" ");
const step=Math.max(1,Math.ceil(words.length/28));
let i=0;
const tick=()=>{
i=Math.min(words.length,i+step);
shown.textContent=words.slice(0,i).join(" ");
rest.textContent=(i<words.length?" ":"")+words.slice(i).join(" ");
if(nearBottom())log.scrollTop=log.scrollHeight;
if(i>=words.length){finish();return;}
typingTimer=window.setTimeout(tick,34);
};
tick();
};
const next=()=>{
if(busy||!queue.length)return;
busy=true;
const text=queue.shift();
add("user",text);
setQuick(false);
const t=typing();
const r=reply(text);
typingTimer=window.setTimeout(()=>{
t.remove();
reveal(r,()=>{busy=false;next();});
},reduce()?0:650);
};
const ask=(q)=>{
const text=q.trim();
if(!text)return;
queue.push(text);
next();
};
const setOpen=(open)=>{
window.clearTimeout(hideTimer);
toggle.setAttribute("aria-expanded",String(open));
if(open){
panel.hidden=false;
void panel.offsetWidth;
panel.classList.add("is-open");
input.focus({preventScroll:true});
log.scrollTop=log.scrollHeight;
}else{
panel.classList.remove("is-open");
hideTimer=window.setTimeout(()=>{panel.hidden=true;},reduce()?0:220);
}
};
const isOpen=()=>panel.classList.contains("is-open");
add("bot",["Halo! Saya asisten BGKS. Saya menjawab pertanyaan umum dengan jawaban yang sudah disiapkan. Untuk informasi resmi, hubungi pihak sekolah.","Hello! I am the BGKS assistant. I answer common questions with prepared answers. For official information, please contact the school."]);
toggle.addEventListener("click",()=>setOpen(!isOpen()));
panel.querySelector(".chat__close").addEventListener("click",()=>{setOpen(false);toggle.focus();});
document.addEventListener("keydown",(e)=>{if(e.key==="Escape"&&isOpen()){setOpen(false);toggle.focus();}});
quickToggle.addEventListener("click",()=>setQuick(chips.hidden));
panel.querySelectorAll(".chat__chip").forEach((c)=>c.addEventListener("click",()=>ask(c.textContent)));
form.addEventListener("submit",(e)=>{e.preventDefault();const v=input.value;input.value="";ask(v);});
}
