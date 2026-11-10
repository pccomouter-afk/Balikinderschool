const TIME_SCALE = 0.72;
const FOV = 28;
const ELEVATION = 0.4;
const FIT_W = 5.9;
const FIT_H = 3.8;
const TARGET_Y = 1.2;
const YAW = -0.3;
const BOOK_OPEN = 0.16;
const BOOK_CLOSED = 1.25;
const ARCH_BASE_Y = -0.05;
const ARCH_Z = -1.15;
const TUBE = 0.13;
const ARCH_SEGMENTS = 72;
const ARCH_RADIAL = 16;

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const span = (t, start, dur) => clamp01((t - start) / dur);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const settle = (t) => {
  const c = 0.9;
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
};
const token = (name, fallback) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
  fallback;

const colors = () => ({
  blue: token("--color-blue", "#1769c2"),
  blueDeep: token("--color-blue-deep", "#12477f"),
  yellow: token("--color-yellow", "#f5cd4f"),
  coral: token("--color-coral", "#e9816d"),
  green: token("--color-green", "#75a85c"),
  greenDeep: token("--color-green-deep", "#4f7f3a"),
  paper: token("--color-paper", "#fff8ef"),
  sky: token("--color-sky", "#abdce9"),
});

const surface = (THREE, color, extra) => {
  const base = new THREE.Color(color);
  return new THREE.MeshPhysicalMaterial({
    color: base,
    roughness: 0.78,
    metalness: 0,
    sheen: 0.55,
    sheenRoughness: 0.85,
    sheenColor: base.clone().lerp(new THREE.Color("#ffffff"), 0.55),
    ...extra,
  });
};

const softBox = (THREE, w, h, d, r, withUv) => {
  const n = 7;
  const g = new THREE.BoxGeometry(1, 1, 1, n, n, n).toNonIndexed();
  const pos = g.attributes.position;
  const nor = g.attributes.normal;
  const uv = g.attributes.uv;
  const hx = w / 2 - r;
  const hy = h / 2 - r;
  const hz = d / 2 - r;
  const half = 0.5 / n;
  const v = new THREE.Vector3();
  const q = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    q.set(
      v.x - Math.sign(v.x) * half,
      v.y - Math.sign(v.y) * half,
      v.z - Math.sign(v.z) * half,
    ).normalize();
    pos.setXYZ(
      i,
      hx * Math.sign(v.x) + q.x * r,
      hy * Math.sign(v.y) + q.y * r,
      hz * Math.sign(v.z) + q.z * r,
    );
    nor.setXYZ(i, q.x, q.y, q.z);
  }
  if (withUv) {
    g.groups.forEach((gr) => {
      for (let i = gr.start; i < gr.start + gr.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const z = pos.getZ(i);
        let a;
        let b;
        switch (gr.materialIndex) {
          case 0:
            a = 0.5 - z / d;
            b = 0.5 + y / h;
            break;
          case 1:
            a = 0.5 + z / d;
            b = 0.5 + y / h;
            break;
          case 2:
            a = 0.5 + x / w;
            b = 0.5 - z / d;
            break;
          case 3:
            a = 0.5 + x / w;
            b = 0.5 + z / d;
            break;
          case 4:
            a = 0.5 + x / w;
            b = 0.5 + y / h;
            break;
          default:
            a = 0.5 - x / w;
            b = 0.5 + y / h;
        }
        uv.setXY(i, a, b);
      }
    });
  }
  return g;
};

const letterTexture = (THREE, letter, bg, ink) => {
  const size = 256;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const g = c.getContext("2d");
  g.fillStyle = bg;
  g.fillRect(0, 0, size, size);
  g.font = "700 168px Outfit, 'DM Sans', system-ui, sans-serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillStyle = ink;
  g.globalAlpha = 0.95;
  g.fillText(letter, size / 2, size / 2 + 10);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
};

const shadowTexture = (THREE) => {
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 128;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(64, 64, 6, 64, 64, 64);
  grad.addColorStop(0, "rgba(10,38,76,0.55)");
  grad.addColorStop(0.55, "rgba(10,38,76,0.2)");
  grad.addColorStop(1, "rgba(10,38,76,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
};

const fade = (mesh, p) => {
  const list = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
  list.forEach((m) => {
    m.transparent = p < 1;
    m.opacity = p;
  });
};

const buildBook = (THREE, c) => {
  const root = new THREE.Group();
  const coverMat = surface(THREE, c.coral);
  const pageMat = surface(THREE, c.paper);
  const spineMat = surface(THREE, c.coral);
  const halves = [-1, 1].map((side) => {
    const pivot = new THREE.Group();
    const cover = new THREE.Mesh(softBox(THREE, 1.98, 0.16, 2.6, 0.07), coverMat);
    cover.position.set(side * 0.98, 0, 0);
    const pages = new THREE.Mesh(softBox(THREE, 1.84, 0.2, 2.42, 0.06), pageMat);
    pages.position.set(side * 0.95, 0.17, 0);
    pivot.add(cover, pages);
    root.add(pivot);
    return { pivot, side };
  });
  const spine = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 2.6, 24),
    spineMat,
  );
  spine.rotation.x = Math.PI / 2;
  spine.position.y = -0.02;
  root.add(spine);
  return { root, halves };
};

const buildFlutterPage = (THREE, c) => {
  const length = 1.7;
  const depth = 2.25;
  const geo = new THREE.PlaneGeometry(length, depth, 16, 1);
  geo.rotateX(-Math.PI / 2);
  geo.translate(length / 2, 0, 0);
  const base = Float32Array.from(geo.attributes.position.array);
  const mat = surface(THREE, c.paper, { side: THREE.DoubleSide });
  const mesh = new THREE.Mesh(geo, mat);
  const pivot = new THREE.Group();
  pivot.add(mesh);
  const bend = (amount) => {
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const t = base[i * 3] / length;
      pos.setY(i, base[i * 3 + 1] + amount * t * t * length * 0.5);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
  };
  bend(0);
  return { pivot, mesh, bend };
};

const buildBlock = (THREE, size, letter, bg, ink) => {
  const tex = letterTexture(THREE, letter, bg, ink);
  const mesh = new THREE.Mesh(
    softBox(THREE, size, size, size, size * 0.17, true),
    surface(THREE, "#ffffff", { map: tex }),
  );
  return mesh;
};

const buildPencil = (THREE, c) => {
  const group = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.065, 0.065, 1.05, 6),
    surface(THREE, c.blue),
  );
  const ferrule = new THREE.Mesh(
    new THREE.CylinderGeometry(0.07, 0.07, 0.12, 20),
    surface(THREE, c.yellow),
  );
  ferrule.position.y = 0.58;
  const eraser = new THREE.Mesh(
    new THREE.CylinderGeometry(0.062, 0.062, 0.1, 20),
    surface(THREE, c.coral),
  );
  eraser.position.y = 0.69;
  const wood = new THREE.Mesh(
    new THREE.ConeGeometry(0.065, 0.2, 6),
    surface(THREE, "#f0d9b5"),
  );
  wood.position.y = -0.625;
  wood.rotation.z = Math.PI;
  const lead = new THREE.Mesh(
    new THREE.ConeGeometry(0.026, 0.07, 12),
    surface(THREE, c.blueDeep),
  );
  lead.position.y = -0.755;
  lead.rotation.z = Math.PI;
  group.add(body, ferrule, eraser, wood, lead);
  group.rotation.z = Math.PI / 2;
  const holder = new THREE.Group();
  holder.add(group);
  return holder;
};

const buildSprout = (THREE, c) => {
  const root = new THREE.Group();
  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.04, 0.5, 12),
    surface(THREE, c.greenDeep),
  );
  stem.position.y = 0.25;
  const leaf = (x, rot, color) => {
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 24, 16),
      surface(THREE, color),
    );
    m.scale.set(1.25, 0.3, 0.62);
    m.position.set(x, 0.52, 0);
    m.rotation.z = rot;
    return m;
  };
  root.add(stem, leaf(-0.2, 0.55, c.green), leaf(0.2, -0.55, c.greenDeep));
  return root;
};

const buildArch = (THREE, c) => {
  class Arc extends THREE.Curve {
    constructor(radius) {
      super();
      this.radius = radius;
    }
    getPoint(t, target = new THREE.Vector3()) {
      const a = Math.PI * (1 - t);
      return target.set(Math.cos(a) * this.radius, Math.sin(a) * this.radius, 0);
    }
  }
  const group = new THREE.Group();
  const specs = [
    { r: 2.55, color: c.yellow },
    { r: 2.25, color: c.coral },
    { r: 1.95, color: c.green },
    { r: 1.65, color: c.paper },
  ];
  const bands = specs.map(({ r, color }) => {
    const curve = new Arc(r);
    const geo = new THREE.TubeGeometry(curve, ARCH_SEGMENTS, TUBE, ARCH_RADIAL, false);
    const mat = surface(THREE, color);
    const tube = new THREE.Mesh(geo, mat);
    const capGeo = new THREE.SphereGeometry(TUBE, 20, 14);
    const startCap = new THREE.Mesh(capGeo, mat);
    const tip = new THREE.Mesh(capGeo, mat);
    startCap.position.copy(curve.getPoint(0));
    tip.position.copy(curve.getPoint(0));
    startCap.visible = false;
    tip.visible = false;
    group.add(tube, startCap, tip);
    return { curve, geo, tube, startCap, tip, perSegment: ARCH_RADIAL * 6 };
  });
  group.position.set(0, ARCH_BASE_Y, ARCH_Z);
  const reveal = (band, p) => {
    const steps = Math.floor(ARCH_SEGMENTS * p);
    band.geo.setDrawRange(0, steps * band.perSegment);
    band.tube.visible = steps > 0;
    band.startCap.visible = p > 0;
    band.tip.visible = p > 0;
    band.curve.getPoint(steps / ARCH_SEGMENTS, band.tip.position);
  };
  bands.forEach((b) => reveal(b, 0));
  return { group, bands, reveal };
};

export async function createIntroScene(host, onLost) {
  const THREE = await import("../vendor/three.module.min.js");
  if (document.fonts && document.fonts.load) {
    await Promise.race([
      document.fonts.load("700 168px Outfit"),
      new Promise((resolve) => window.setTimeout(resolve, 700)),
    ]).catch(() => {});
  }
  const c = colors();
  const small = window.matchMedia("(max-width: 760px)").matches;
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2));
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.className = "entry__canvas";
  canvas.setAttribute("aria-hidden", "true");
  host.append(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 60);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x8fb6e6, 1.0));
  const key = new THREE.DirectionalLight(0xfff1dc, 2.4);
  key.position.set(3.5, 6, 5);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xcfe4ff, 0.5);
  fill.position.set(-5, 2, 3);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0xdbeaff, 0.6);
  rim.position.set(-3, 3, -5);
  scene.add(rim);

  const world = new THREE.Group();
  world.rotation.y = YAW;
  scene.add(world);

  const shadowTex = shadowTexture(THREE);
  const shadowGeo = new THREE.PlaneGeometry(6.4, 3.8);
  shadowGeo.rotateX(-Math.PI / 2);
  const shadow = new THREE.Mesh(
    shadowGeo,
    new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0,
    }),
  );
  shadow.position.y = -0.2;
  world.add(shadow);

  const book = buildBook(THREE, c);
  world.add(book.root);

  const flutter = buildFlutterPage(THREE, c);
  flutter.pivot.position.set(0, 0.3, 0);
  world.add(flutter.pivot);

  const blockSize = { l: 0.8, p: 0.74, g: 0.58 };
  const blockL = buildBlock(THREE, blockSize.l, "L", c.yellow, c.blueDeep);
  const blockP = buildBlock(THREE, blockSize.p, "P", c.coral, c.paper);
  const blockG = buildBlock(THREE, blockSize.g, "G", c.green, c.paper);
  const rest = {
    l: new THREE.Vector3(-1.1, 0.83, 0.05),
    p: new THREE.Vector3(-1.02, 0.83 + blockSize.l / 2 + blockSize.p / 2 - 0.01, 0.06),
    g: new THREE.Vector3(-0.3, 0.7, 0.82),
  };
  blockL.rotation.set(0, 0.18, -BOOK_OPEN);
  blockP.rotation.set(0, -0.3, -0.05);
  blockG.rotation.set(0, 0.35, -0.04);
  world.add(blockL, blockP, blockG);

  const sprout = buildSprout(THREE, c);
  const sproutRest = new THREE.Vector3(
    rest.p.x + 0.04,
    rest.p.y + blockSize.p / 2 - 0.02,
    rest.p.z,
  );
  world.add(sprout);

  const pencil = buildPencil(THREE, c);
  const pencilRest = new THREE.Vector3(1.05, 0.56, 0.92);
  pencil.rotation.y = -0.45;
  world.add(pencil);

  const arch = buildArch(THREE, c);
  scene.add(arch.group);

  const movers = [
    { mesh: blockL, rest: rest.l, start: 0.55, drop: 1.3 },
    { mesh: blockP, rest: rest.p, start: 0.72, drop: 1.4 },
    { mesh: blockG, rest: rest.g, start: 0.9, drop: 1.1 },
  ];

  let width = 0;
  let height = 0;
  const fit = () => {
    const aspect = width / height;
    const tan = Math.tan((FOV * Math.PI) / 360);
    const dist =
      Math.max(FIT_H / 2 / tan, FIT_W / 2 / (tan * aspect)) * 1.04;
    camera.aspect = aspect;
    camera.position.set(
      0,
      TARGET_Y + Math.sin(ELEVATION) * dist,
      Math.cos(ELEVATION) * dist,
    );
    camera.lookAt(0, TARGET_Y, 0);
    camera.updateProjectionMatrix();
  };
  const resize = () => {
    const w = Math.max(1, Math.round(host.clientWidth));
    const h = Math.max(1, Math.round(host.clientHeight));
    if (w === width && h === height) return;
    width = w;
    height = h;
    renderer.setSize(w, h, false);
    fit();
  };
  resize();
  const observer = new ResizeObserver(resize);
  observer.observe(host);

  const place = (mesh, restPos, p, from) => {
    const k = easeOut(p);
    mesh.position.set(restPos.x, restPos.y + from * (1 - k), restPos.z);
    const s = 0.86 + 0.14 * settle(p);
    mesh.scale.setScalar(p > 0 ? s : 0.0001);
    fade(mesh, clamp01(p * 2));
  };

  const update = (t) => {
    const bookOpen = easeInOut(span(t, 0.05, 0.85));
    const bookIn = easeOut(span(t, 0, 0.7));
    book.halves.forEach(({ pivot, side }) => {
      pivot.rotation.z = side * (BOOK_CLOSED + (BOOK_OPEN - BOOK_CLOSED) * bookOpen);
    });
    const float = Math.sin(t * 0.9) * 0.03;
    book.root.position.y = -0.9 * (1 - bookIn) + float * bookIn;
    flutter.pivot.position.y = 0.3 + book.root.position.y;
    shadow.material.opacity = 0.7 * bookIn;
    const lift = easeInOut(span(t, 0.7, 0.8));
    const wave = Math.sin(t * 1.25);
    flutter.pivot.rotation.z = BOOK_OPEN + 0.04 + lift * (0.42 + wave * 0.1);
    flutter.bend(lift * (0.16 + (wave * 0.5 + 0.5) * 0.14));
    flutter.mesh.visible = lift > 0;

    const archP = [0.2, 0.34, 0.48, 0.62];
    arch.bands.forEach((band, i) => {
      arch.reveal(band, easeInOut(span(t, archP[i], 0.95)));
    });

    const bob = [0, 0, 0];
    movers.forEach(({ mesh, rest: r, start, drop }, i) => {
      const p = span(t, start, 0.7);
      place(mesh, r, p, drop);
      if (p >= 1) {
        const phase = [0, 1.2, 2.1][i];
        const amp = [0.035, 0.05, 0.04][i];
        bob[i] = Math.sin(t * (1.05 + i * 0.15) + phase) * amp;
        mesh.position.y += bob[i];
        mesh.rotation.y += Math.sin(t * 0.6 + phase) * 0.0008;
      }
    });
    if (span(t, movers[1].start, 0.7) >= 1) blockP.position.y += bob[0];

    const sproutP = span(t, 1.4, 0.5);
    sprout.visible = sproutP > 0;
    sprout.position.copy(sproutRest);
    sprout.position.y += bob[0] + bob[1];
    sprout.scale.setScalar(Math.max(0.0001, easeOut(sproutP)));
    sprout.rotation.z = Math.sin(t * 1.4) * 0.05 * sproutP;

    const pencilP = span(t, 0.95, 0.6);
    pencil.visible = pencilP > 0;
    pencil.position.set(
      pencilRest.x + 0.5 * (1 - easeOut(pencilP)),
      pencilRest.y + float * bookIn,
      pencilRest.z,
    );
    pencil.rotation.y = -0.45 + Math.sin(t * 0.8) * 0.03;
    pencil.scale.setScalar(Math.max(0.0001, easeOut(pencilP)));
  };

  update(0);
  renderer.render(scene, camera);

  let raf = 0;
  let origin = 0;
  let disposed = false;
  const tick = (now) => {
    raf = window.requestAnimationFrame(tick);
    if (!origin) origin = now;
    update(((now - origin) / 1000) * TIME_SCALE);
    renderer.render(scene, camera);
  };
  const lost = (event) => {
    event.preventDefault();
    if (onLost) onLost();
  };
  canvas.addEventListener("webglcontextlost", lost);

  const dispose = () => {
    if (disposed) return;
    disposed = true;
    window.cancelAnimationFrame(raf);
    observer.disconnect();
    canvas.removeEventListener("webglcontextlost", lost);
    scene.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      const list = Array.isArray(o.material) ? o.material : [o.material];
      list.forEach((m) => {
        if (!m) return;
        if (m.map) m.map.dispose();
        m.dispose();
      });
    });
    shadowTex.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    canvas.remove();
  };

  return {
    start() {
      if (!disposed && !raf) raf = window.requestAnimationFrame(tick);
    },
    dispose,
  };
}
