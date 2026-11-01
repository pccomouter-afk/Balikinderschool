import {stageOf} from "./stage.js";

const reduce=()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const webgl2=()=>{try{return !!document.createElement("canvas").getContext("webgl2");}catch(err){return false;}};
const token=(n,d)=>getComputedStyle(document.documentElement).getPropertyValue(n).trim()||d;
let threeP=null;
const loadThree=()=>threeP||(threeP=import("../vendor/three.module.min.js"));
const clamp01=(v)=>Math.max(0,Math.min(1,v));
const easeOut=(t)=>1-Math.pow(1-t,3);
const easeBack=(t)=>{const c1=1.7,c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2);};
const TAU=Math.PI*2;
function shade(hex,k){
const n=parseInt(hex.slice(1),16);
const f=(c)=>Math.max(0,Math.min(255,Math.round(k<0?c*(1+k):c+(255-c)*k)));
return "rgb("+f(n>>16)+","+f((n>>8)&255)+","+f(n&255)+")";
}
function canvas(w,h){const c=document.createElement("canvas");c.width=w;c.height=h;return [c,c.getContext("2d")];}
function starPath(g,cx,cy,R,r){g.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rad=i%2?r:R;g.lineTo(cx+Math.cos(a)*rad,cy+Math.sin(a)*rad);}g.closePath();}
function faceTexture(THREE,{bg,mark,size=256}){
const [c,g]=canvas(size,size);
g.fillStyle=bg;g.fillRect(0,0,size,size);
const cx=size/2,cy=size/2,k=size/256;
const draw=(fill,dy)=>{
g.fillStyle=fill;
if(mark==="star"){starPath(g,cx,cy+dy,84*k,38*k);g.fill();}
else if(mark==="circle"){g.beginPath();g.arc(cx,cy+dy,70*k,0,TAU);g.fill();}
else if(mark==="triangle"){g.beginPath();g.moveTo(cx,cy-76*k+dy);g.lineTo(cx+78*k,cy+58*k+dy);g.lineTo(cx-78*k,cy+58*k+dy);g.closePath();g.fill();}
else{g.font="700 "+Math.round(176*k)+"px Outfit, 'DM Sans', system-ui, sans-serif";g.textAlign="center";g.textBaseline="middle";g.fillText(mark,cx,cy+dy+8*k);}
};
draw(shade(bg,-.26),7*k);
draw("#FFF8EF",0);
const t=new THREE.CanvasTexture(c);
t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;
return t;
}
function ballTexture(THREE,cols){
const [c,g]=canvas(512,256);
const w=512/cols.length;
cols.forEach((col,i)=>{g.fillStyle=col;g.fillRect(i*w,0,w+1,256);});
const t=new THREE.CanvasTexture(c);
t.colorSpace=THREE.SRGBColorSpace;t.wrapS=THREE.RepeatWrapping;t.anisotropy=4;
return t;
}
function blobTexture(THREE){
const [c,g]=canvas(128,128);
const grad=g.createRadialGradient(64,64,4,64,64,64);
grad.addColorStop(0,"rgba(32,48,68,.55)");grad.addColorStop(.55,"rgba(32,48,68,.18)");grad.addColorStop(1,"rgba(32,48,68,0)");
g.fillStyle=grad;g.fillRect(0,0,128,128);
return new THREE.CanvasTexture(c);
}
function roundedBox(THREE,w,h,d,r,seg=3){
const n=seg*2+1;
const g=new THREE.BoxGeometry(1,1,1,n,n,n).toNonIndexed();
const pos=g.attributes.position,nor=g.attributes.normal,uv=g.attributes.uv;
const hx=w/2-r,hy=h/2-r,hz=d/2-r,hs=.5/n;
const v=new THREE.Vector3(),q=new THREE.Vector3();
for(let i=0;i<pos.count;i++){
v.fromBufferAttribute(pos,i);
q.set(v.x-Math.sign(v.x)*hs,v.y-Math.sign(v.y)*hs,v.z-Math.sign(v.z)*hs).normalize();
pos.setXYZ(i,hx*Math.sign(v.x)+q.x*r,hy*Math.sign(v.y)+q.y*r,hz*Math.sign(v.z)+q.z*r);
nor.setXYZ(i,q.x,q.y,q.z);
}
g.groups.forEach((gr)=>{
for(let i=gr.start;i<gr.start+gr.count;i++){
const x=pos.getX(i),y=pos.getY(i),z=pos.getZ(i);
let a,b;
switch(gr.materialIndex){
case 0:a=.5-z/d;b=.5+y/h;break;
case 1:a=.5+z/d;b=.5+y/h;break;
case 2:a=.5+x/w;b=.5-z/d;break;
case 3:a=.5+x/w;b=.5+z/d;break;
case 4:a=.5+x/w;b=.5+y/h;break;
default:a=.5-x/w;b=.5+y/h;
}
uv.setXY(i,a,b);
}
});
return g;
}
function roofGeometry(THREE,w,h,d,r){
const s=new THREE.Shape();
const hw=w/2;
s.moveTo(-hw+r,0);s.lineTo(hw-r,0);s.quadraticCurveTo(hw,0,hw-r*.7,r*.9);
s.lineTo(r*.6,h-r*1.1);s.quadraticCurveTo(0,h+r*.2,-r*.6,h-r*1.1);
s.lineTo(-hw+r*.7,r*.9);s.quadraticCurveTo(-hw,0,-hw+r,0);
const g=new THREE.ExtrudeGeometry(s,{depth:d,bevelEnabled:true,bevelThickness:.1,bevelSize:.1,bevelSegments:5,curveSegments:10});
g.center();
return g;
}
function lathe(THREE,pts,seg=48){
return new THREE.LatheGeometry(pts.map(([x,y])=>new THREE.Vector2(x,y)),seg);
}
function studioEnvironment(THREE,renderer){
const env=new THREE.Scene();
env.add(new THREE.Mesh(new THREE.BoxGeometry(14,14,14),new THREE.MeshBasicMaterial({color:0xcfdcea,side:THREE.BackSide})));
const panel=(col,k,w,h,x,y,z)=>{
const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:new THREE.Color(col).multiplyScalar(k),side:THREE.DoubleSide}));
m.position.set(x,y,z);m.lookAt(0,0,0);env.add(m);
};
panel(0xffffff,6,7,5,-4,5,5);
panel(0xfff0d8,3.5,4,6,6,2,3);
panel(0xdceaff,2.5,6,3,0,-5,4);
const pm=new THREE.PMREMGenerator(renderer);
const rt=pm.fromScene(env,.03);
pm.dispose();
env.traverse((o)=>{if(o.geometry)o.geometry.dispose();if(o.material)o.material.dispose();});
return rt;
}
const GROUND=-3.42;
function homeToys(ctx){
const {THREE,scene,colors,fontsOk}=ctx;
const group=new THREE.Group();scene.add(group);
const owned=[];
const own=(o)=>{owned.push(o);return o;};
const toy=(hex,extra)=>own(new THREE.MeshPhysicalMaterial(Object.assign({color:hex,roughness:.42,metalness:0,clearcoat:.5,clearcoatRoughness:.38,envMapIntensity:.7},extra)));
const pieces=[];
const add=(mesh,cfg)=>{
mesh.castShadow=true;mesh.receiveShadow=true;
group.add(mesh);
pieces.push(Object.assign({mesh,x:0,y:0,z:0,rx:0,ry:0,rz:0,s:1,amp:.06,period:5,phase:0,delay:0,dur:800,drop:1.6,par:.05,sway:0,swayP:4,spin:0,yawAmp:0,yawP:6},cfg));
return pieces[pieces.length-1];
};
const mark=(mk,bg)=>faceTexture(THREE,{bg,mark:mk});
const bw=1.18;
const blockMats=(hex,front,side)=>{
const base=toy(hex);
const f=toy("#FFFFFF");f.map=own(mark(front,hex));
const sd=toy("#FFFFFF");sd.map=own(mark(side,hex));
return [sd,base,base,base,f,base];
};
const gA=own(roundedBox(THREE,bw,bw,bw,.16));
const gB=own(roundedBox(THREE,1.02,1.02,1.02,.15));
const gRoof=own(roofGeometry(THREE,1.18,.9,.95,.14));
const tx=-2.12,tz=.35;
const A=add(new THREE.Mesh(gA,blockMats(colors.blue,"A","star")),{x:tx,y:GROUND+.42+bw/2,z:tz,ry:.2,rz:-.015,amp:.05,period:5.6,phase:.2,delay:250,par:.07,yawAmp:.05,yawP:7});
const B=add(new THREE.Mesh(gB,blockMats(colors.coral,"B","circle")),{x:tx+.07,y:A.y+bw/2+.34+.51,z:tz,ry:-.3,rz:.03,amp:.07,period:4.7,phase:1.1,delay:430,par:.08,yawAmp:.07,yawP:5.4});
const R=add(new THREE.Mesh(gRoof,toy(colors.yellow)),{x:tx-.02,y:B.y+.51+.34+.45,z:tz,ry:.28,rz:-.035,amp:.09,period:4.1,phase:2.1,delay:610,par:.09,sway:.05,swayP:3.4});
const wood="#E4B97F";
const sx=2.28,sz=.2;
const baseG=own(lathe(THREE,[[0,0],[.56,0],[.64,.03],[.68,.1],[.62,.17],[0,.17]]));
const stB=add(new THREE.Mesh(baseG,toy(wood,{clearcoat:.2})),{x:sx,y:GROUND+.4,z:sz,amp:.035,period:6,phase:.6,delay:700,par:.05});
const postG=own(new THREE.CylinderGeometry(.075,.075,2.15,20));
const post=add(new THREE.Mesh(postG,toy(wood,{clearcoat:.2})),{x:sx,y:stB.y+.17+1.07,z:sz,amp:.035,period:6,phase:.6,delay:760,par:.05});
const capG=own(new THREE.SphereGeometry(.15,24,16));
add(new THREE.Mesh(capG,toy(colors.coral)),{x:sx,y:post.y+1.07+.09,z:sz,amp:.035,period:6,phase:.6,delay:1250,par:.05});
const rings=[[.54,colors.green,.15],[.45,colors.yellow,.14],[.36,colors.coral,.13],[.28,colors.blue,.12]];
rings.forEach(([rad,hex,tube],i)=>{
const g=own(new THREE.TorusGeometry(rad,tube,24,64));
add(new THREE.Mesh(g,toy(hex)),{x:sx,y:stB.y+.62+i*.5,z:sz,rx:Math.PI/2+(i%2?.07:-.06),rz:(i%2?-.05:.06),amp:.07,period:3.8+i*.55,phase:i*1.3,delay:830+i*130,par:.06+i*.012,sway:.045,swayP:5+i*.7});
});
const ballTex=own(ballTexture(THREE,[colors.coral,"#FFF8EF",colors.yellow,"#FFF8EF",colors.blue,"#FFF8EF"]));
const ballG=own(new THREE.SphereGeometry(.44,48,32));
const ball=add(new THREE.Mesh(ballG,toy("#FFFFFF",{map:ballTex,clearcoat:.65})),{x:.34,y:GROUND+.44,z:1.55,amp:0,delay:1300,dur:700,drop:2.2,par:.12,spin:.7});
ball.ball=true;
const key=new THREE.DirectionalLight(0xfff3e0,2.4);
key.position.set(-3.5,6.5,6);key.target.position.set(0,GROUND,0);
key.castShadow=true;key.shadow.mapSize.set(1024,1024);
const sc=key.shadow.camera;sc.left=-5;sc.right=5;sc.top=5;sc.bottom=-5;sc.near=1;sc.far=22;
key.shadow.bias=-.0004;key.shadow.normalBias=.02;
scene.add(key,key.target);
scene.add(new THREE.HemisphereLight(0xffffff,0xdbe8f5,.95));
const rim=new THREE.DirectionalLight(0xdbeaff,.9);rim.position.set(5,2,-4);scene.add(rim);
const floor=own(new THREE.Mesh(new THREE.PlaneGeometry(14,8),own(new THREE.ShadowMaterial({color:0x203044,opacity:.2}))));
floor.rotation.x=-Math.PI/2;floor.position.set(0,GROUND,.6);floor.receiveShadow=true;scene.add(floor);
const blobT=own(blobTexture(THREE));
const blobMat=own(new THREE.MeshBasicMaterial({map:blobT,transparent:true,depthWrite:false}));
const blobs=[
{src:A,w:2.4,d:1.1,k:.9},{src:stB,w:2.0,d:.9,k:.85},{src:ball,w:1.2,d:.6,k:.9}
].map((b)=>{
const m=new THREE.Mesh(own(new THREE.PlaneGeometry(1,1)),own(blobMat.clone()));
m.rotation.x=-Math.PI/2;m.position.set(b.src.x,GROUND+.012,b.src.z);
scene.add(m);return Object.assign(b,{m});
});

return {
update(t,still,stage){
const px=stage?stage.x:0,py=stage?stage.y:0;
pieces.forEach((p)=>{
const e=still?1:clamp01((t*1000-p.delay)/p.dur);
const grown=still?1:(.5+.5*easeBack(e));
const drop=(1-easeOut(e))*p.drop;
let bob=still?0:Math.sin(t*TAU/p.period+p.phase)*p.amp*e;
let y=p.y+bob+drop,sq=1;
if(p.ball){
const T=2.3,H=.78,ph=(t%T)/T,hop=still?.25:Math.abs(Math.sin(Math.PI*ph))*H*e;
y=p.y+hop+drop;
sq=still?1:1-Math.max(0,.1-hop)*1.7;
}
p.mesh.position.set(p.x+px*p.par*2.4,y-py*p.par*.8,p.z);
p.mesh.scale.set(p.s*grown*(1+(1-sq)*.55),p.s*grown*sq,p.s*grown*(1+(1-sq)*.55));
p.mesh.rotation.set(p.rx+(still?0:Math.sin(t*TAU/p.swayP)*p.sway),p.ry+(still?0:Math.sin(t*TAU/p.yawP)*p.yawAmp+t*p.spin*(p.ball?1:0))+px*.25*(1+p.par),p.rz+(still?0:Math.sin(t*TAU/(p.swayP*1.3)+p.phase)*p.sway*.7));
});
blobs.forEach((b)=>{
const h=Math.max(0,b.src.mesh.position.y-GROUND-(b.src.ball?.44:b.src===A?.42+bw/2:.4));
b.m.position.x=b.src.mesh.position.x;
b.m.scale.set(b.w*(1+h*.1),b.d*(1+h*.1),1);
b.m.material.opacity=b.k/(1+h*.55);
});
},
dispose(){
owned.forEach((o)=>o.dispose&&o.dispose());
pieces.forEach((p)=>{if(Array.isArray(p.mesh.material))p.mesh.material.forEach((m)=>m.dispose());});
}
};
}

const SCENES={"home-toys":homeToys};
function poster(host){
host.classList.add("is-fallback");
const src=host.dataset.poster;
if(!src||host.querySelector("img"))return;
const img=document.createElement("img");
img.src=src;img.alt="";img.decoding="async";
host.appendChild(img);
}
async function mount(host,build){
const small=window.innerWidth<700;
if(!webgl2()){poster(host);return;}
let THREE;
try{THREE=await loadThree();}catch(err){poster(host);return;}
let fontsOk=false;
try{await Promise.race([document.fonts.load("700 120px Outfit").then(()=>true),new Promise((r)=>setTimeout(r,1500,false))]);fontsOk=true;}catch(err){}
let renderer;
try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:"high-performance"});}catch(err){poster(host);return;}
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,small?1.5:2));
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.domElement.setAttribute("aria-hidden","true");
host.appendChild(renderer.domElement);
const scene=new THREE.Scene();
const envRT=studioEnvironment(THREE,renderer);
scene.environment=envRT.texture;
const colors={blue:token("--color-blue","#1769C2"),coral:token("--color-coral","#E9816D"),yellow:token("--color-yellow","#F5CD4F"),green:token("--color-green","#75A85C")};
const cam=new THREE.PerspectiveCamera(28,1,.1,80);
const api=build({THREE,scene,colors,fontsOk,renderer,host});
const VIEW_H=8.42,VIEW_W=8.35,FOV=28;
const resize=()=>{
const w=host.clientWidth,h=host.clientHeight;
if(!w||!h)return;
renderer.setSize(w,h,false);
cam.aspect=w/h;
const need=Math.max(VIEW_H,VIEW_W/cam.aspect);
cam.position.set(0,0,need/2/Math.tan(THREE.MathUtils.degToRad(FOV/2)));
cam.lookAt(0,0,0);cam.updateProjectionMatrix();
};
const still=reduce();
const stageEl=host.closest("[data-stage]");
let t0=performance.now(),raf=0,visible=true,dead=false;
const frame=(now)=>{
raf=0;if(dead)return;
api.update((now-t0)/1000,still,stageEl?stageOf(stageEl):null);
renderer.render(scene,cam);
if(!still&&visible&&!document.hidden)raf=requestAnimationFrame(frame);
};
const start=()=>{if(!raf&&!dead&&!still)raf=requestAnimationFrame(frame);};
const ro=new ResizeObserver(()=>{resize();if(still||!raf)frame(performance.now());});ro.observe(host);
const io=new IntersectionObserver((e)=>{visible=e[0].isIntersecting;if(visible)start();});io.observe(host);
const onVis=()=>{if(!document.hidden)start();};
document.addEventListener("visibilitychange",onVis);
const lost=(e)=>{e.preventDefault();cleanup();poster(host);};
renderer.domElement.addEventListener("webglcontextlost",lost);
function cleanup(){
dead=true;cancelAnimationFrame(raf);ro.disconnect();io.disconnect();
document.removeEventListener("visibilitychange",onVis);
renderer.domElement.removeEventListener("webglcontextlost",lost);
try{api.dispose();envRT.dispose();renderer.dispose();}catch(err){}
renderer.domElement.remove();
}
resize();
t0=performance.now();
frame(t0);start();
host.classList.add("is-ready");
window.addEventListener("pagehide",cleanup,{once:true});
}
export function initFloat3d(){
document.querySelectorAll("[data-float3d]").forEach((host)=>{
const build=SCENES[host.dataset.float3d];
if(build)mount(host,build);
});
}
