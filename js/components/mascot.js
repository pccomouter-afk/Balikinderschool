import {siteUrl} from "../foundation/paths.js";
const MODEL=siteUrl("assets/models/mascot.glb");
const ORDER=["greeting","happy","thinking","surprise","victory","investigate","sleep"];
async function available(url){
try{
const res=await fetch(url,{method:"HEAD"});
return res.ok&&!(res.headers.get("content-type")||"").includes("text/html");
}catch(err){
return false;
}
}
function webgl(){
try{return !!document.createElement("canvas").getContext("webgl2");}catch(err){return false;}
}
export async function initMascot(stage){
if(!stage||!webgl()||!(await available(MODEL)))return;
let THREE,GLTFLoader;
try{
THREE=await import("../vendor/three.module.min.js");
({GLTFLoader}=await import("../vendor/GLTFLoader.js"));
}catch(err){
return;
}
const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let gltf;
try{
gltf=await new GLTFLoader().loadAsync(MODEL);
}catch(err){
return;
}
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.outputColorSpace=THREE.SRGBColorSpace;
stage.appendChild(renderer.domElement);
const scene=new THREE.Scene();
scene.add(new THREE.HemisphereLight(0xffffff,0xbcd6ee,1.4));
const key=new THREE.DirectionalLight(0xffffff,1.6);
key.position.set(2.5,4,4);
scene.add(key);
const model=gltf.scene;
scene.add(model);
const box=new THREE.Box3().setFromObject(model);
const size=box.getSize(new THREE.Vector3());
const center=box.getCenter(new THREE.Vector3());
const cam=new THREE.PerspectiveCamera(28,1,.1,100);
const frame=()=>{
const w=stage.clientWidth,h=stage.clientHeight;
if(!w||!h)return;
renderer.setSize(w,h);
cam.aspect=w/h;
const fovV=THREE.MathUtils.degToRad(cam.fov);
const fitH=(size.y*1.08)/2/Math.tan(fovV/2);
const fitW=(size.x*1.4)/2/(Math.tan(fovV/2)*cam.aspect);
const dist=Math.max(fitH,fitW);
cam.position.set(center.x,center.y,center.z+dist);
cam.lookAt(center);
cam.updateProjectionMatrix();
renderer.render(scene,cam);
};
const mixer=new THREE.AnimationMixer(model);
const clips=new Map();
gltf.animations.forEach((c)=>clips.set(c.name.toLowerCase(),c));
const find=(key)=>{
for(const [name,clip] of clips)if(name.includes(key))return clip;
return null;
};
const idleClip=find("idle")||gltf.animations[0]||null;
const idle=idleClip?mixer.clipAction(idleClip):null;
const sequence=ORDER.map(find).filter(Boolean);
let active=idle;
let index=-1;
if(idle){idle.play();}
const clock=new THREE.Clock();
let visible=true,raf=0;
const loop=()=>{
raf=0;
mixer.update(clock.getDelta());
renderer.render(scene,cam);
if(!reduce&&visible&&!document.hidden)raf=requestAnimationFrame(loop);
};
const start=()=>{if(!raf&&!reduce){clock.getDelta();raf=requestAnimationFrame(loop);}};
const play=()=>{
if(reduce||!sequence.length)return;
index=(index+1)%sequence.length;
const next=mixer.clipAction(sequence[index]);
next.reset();
next.setLoop(THREE.LoopOnce,1);
next.clampWhenFinished=true;
if(active&&active!==next)next.crossFadeFrom(active,.25,false);
next.play();
active=next;
start();
};
mixer.addEventListener("finished",(e)=>{
if(!idle||e.action===idle)return;
idle.reset();
idle.crossFadeFrom(e.action,.35,false);
idle.play();
active=idle;
});
new ResizeObserver(frame).observe(stage);
frame();
if(reduce){mixer.update(0);renderer.render(scene,cam);}
stage.hidden=false;
stage.closest("[data-mascot-scene]")?.classList.add("has-mascot");
stage.addEventListener("click",play);
stage.addEventListener("keydown",(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();play();}});
new IntersectionObserver((entries)=>{visible=entries[0].isIntersecting;if(visible)start();}).observe(stage);
document.addEventListener("visibilitychange",()=>{if(!document.hidden)start();});
start();
}
