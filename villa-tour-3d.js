import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const shell = document.getElementById("villaTourShell");
const viewport = document.getElementById("villaTourViewer");
const canvas = document.getElementById("villaTourCanvas");
const intro = document.getElementById("villaTourIntro");
const introImage = document.getElementById("villaTourIntroImage");
const introText = document.querySelector('[data-i18n="walk.introText"]');
const startButton = document.getElementById("villaTourStartBtn");
const fullButton = document.getElementById("villaTourFullscreenBtn");
const fullButtonText = document.getElementById("villaTourFullscreenText");
const roomTitle = document.getElementById("villaTourSceneTitle");
const roomDescription = document.getElementById("villaTourSceneDescription");
const roomLabel = document.getElementById("villaTourCurrentRoom");
const counter = document.getElementById("villaTourCurrentStep");
const progress = document.getElementById("villaTourProgress");
const hint = document.getElementById("villaTourControlsHint");
const previousButton = document.getElementById("villaTourPrevBtn");
const nextButton = document.getElementById("villaTourNextBtn");

if (shell && viewport && canvas) {
  const text = {
    ar: {
      facade: ["الواجهة الرئيسية", "ابدأ أمام الواجهة الكلاسيكية، ثم ادخل إلى بهو الاستقبال."],
      majlis: ["مجلس الضيوف", "مساحة استقبال رسمية متصلة بمحور الحركة الرئيسي."],
      diningA: ["منطقة الطعام الأولى", "منطقة طعام قريبة من مجلس الضيوف والبهو."],
      living: ["صالة المعيشة", "مساحة عائلية مفتوحة بإطلالة على الحديقة الجانبية."],
      diningB: ["منطقة الطعام الثانية", "منطقة طعام يومية بين صالة المعيشة والمطبخ."],
      kitchen: ["المطبخ", "مطبخ عملي متصل بمنطقة الطعام ومسار الخدمة."],
      store: ["المخزن", "مساحة تخزين صغيرة على جانب المطبخ."],
      outdoor: ["جلسة خارجية", "جلسة هادئة في الحديقة الأمامية للفيلا."],
      maid: ["غرفة العاملة", "غرفة خدمة مستقلة ضمن جناح الخدمات."],
      laundry: ["الغسيل والكي", "غرفة غسيل وكي بجوار مخزن الخدمة."]
    },
    en: {
      facade: ["Facade and entry", "Start at the classic facade, then enter the reception hall."],
      majlis: ["Guest majlis", "A formal reception space connected to the main circulation axis."],
      diningA: ["Dining room one", "A formal dining room beside the majlis and entrance hall."],
      living: ["Family living hall", "A relaxed family room with a side garden outlook."],
      diningB: ["Dining room two", "An everyday dining space between the living hall and kitchen."],
      kitchen: ["Kitchen", "A practical kitchen connected to dining and the service route."],
      store: ["Store room", "A compact storage room beside the kitchen."],
      outdoor: ["Outdoor sitting", "A quiet seating corner in the front garden."],
      maid: ["Maid's room", "A private room within the service wing."],
      laundry: ["Laundry and ironing", "A utility room beside the service store."]
    }
  };

  const roomOrder = ["facade", "majlis", "diningA", "living", "diningB", "kitchen", "store", "outdoor", "maid", "laundry"];
  const roomStops = {
    facade: { x: 0, z: 11.4, yaw: 0 },
    majlis: { x: -6.3, z: 4.3, yaw: -Math.PI / 2 },
    diningA: { x: -6.2, z: 0.1, yaw: -Math.PI / 2 },
    living: { x: -6.3, z: -4.8, yaw: -Math.PI / 2 },
    diningB: { x: 6.2, z: 2.7, yaw: Math.PI / 2 },
    kitchen: { x: 6.2, z: -1.8, yaw: Math.PI / 2 },
    store: { x: 9, z: -2.9, yaw: Math.PI / 2 },
    outdoor: { x: 5.8, z: 10.6, yaw: 0 },
    maid: { x: 4.8, z: -5.6, yaw: -Math.PI / 2 },
    laundry: { x: 8.7, z: -5.6, yaw: Math.PI / 2 }
  };

  let scene, camera, renderer, controlsReady = false;
  let activeRoom = "facade";
  let tourStarted = false;
  let pointerLocked = false;
  let dragging = false;
  let lastPointerX = 0;
  let lastPointerY = 0;
  let yaw = 0;
  let pitch = -0.04;
  let targetPose = null;
  let facadePlane = null;
  const wallBounds = [];
  const held = { forward: false, backward: false, left: false, right: false, turnLeft: false, turnRight: false };
  const eyeHeight = 1.68;
  const walkRadius = 0.32;
  const lang = () => document.documentElement.lang === "en" ? "en" : "ar";
  const isCoarse = window.matchMedia("(pointer: coarse)").matches;

  function label(id) {
    const current = text[lang()][id] || text.ar[id];
    return current || ["", ""];
  }

  function updateLanguage() {
    const current = lang();
    const roomText = label(activeRoom);
    if (roomTitle) roomTitle.textContent = roomText[0];
    if (roomDescription) roomDescription.textContent = roomText[1];
    if (roomLabel) roomLabel.textContent = String(roomOrder.indexOf(activeRoom) + 1).padStart(2, "0") + " · " + roomText[0];
    if (hint) hint.textContent = current === "ar"
      ? "اسحب للنظر · تحرّك بالأسهم أو WASD"
      : "Drag to look · use WASD or arrows to walk";
    if (fullButtonText) fullButtonText.textContent =
      document.fullscreenElement === shell || shell.classList.contains("is-windowed-fullscreen")
        ? (current === "ar" ? "إنهاء ملء الشاشة" : "EXIT FULL SCREEN")
        : (current === "ar" ? "فتح بملء الشاشة" : "OPEN FULL SCREEN");
    if (fullButton) fullButton.setAttribute("aria-label", fullButtonText?.textContent || "Full screen");
  }

  function setRoom(id, animate = true) {
    if (!roomStops[id] || !camera) return;
    if (!tourStarted) {
      tourStarted = true;
      if (intro) intro.hidden = true;
    }
    activeRoom = id;
    const stop = roomStops[id];
    if (animate) {
      targetPose = {
        position: new THREE.Vector3(stop.x, eyeHeight, stop.z),
        yaw: stop.yaw
      };
    } else {
      camera.position.set(stop.x, eyeHeight, stop.z);
      yaw = stop.yaw;
      camera.rotation.set(pitch, yaw, 0, "YXZ");
      targetPose = null;
    }
    const index = roomOrder.indexOf(id);
    document.querySelectorAll("[data-tour-room]").forEach(button => {
      const isActive = button.getAttribute("data-tour-room") === id;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
    if (counter) counter.textContent = String(index + 1).padStart(2, "0");
    if (progress) progress.style.width = ((index + 1) / roomOrder.length * 100) + "%";
    updateLanguage();
  }

  function addBox(x, y, z, sx, sy, sz, material, parent = scene, shadow = true) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), material);
    mesh.position.set(x, y, z);
    mesh.castShadow = shadow;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }

  function addCylinder(x, y, z, rt, rb, h, material, parent = scene, sides = 20) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, sides), material);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }

  function addSphere(x, y, z, radius, material, parent = scene) {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 24, 16), material);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }

  function addCushion(x, y, z, width, height, depth, material, parent = scene) {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 20), material);
    mesh.position.set(x, y, z);
    mesh.scale.set(width / 2, height / 2, depth / 2);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }

  function addWallX(z, from, to, openings = [], height = 3.35, thickness = 0.18) {
    const sorted = openings.slice().sort((a, b) => a[0] - b[0]);
    let cursor = from;
    const segments = [];
    sorted.forEach(([a, b]) => {
      if (a > cursor) segments.push([cursor, a]);
      cursor = Math.max(cursor, b);
    });
    if (cursor < to) segments.push([cursor, to]);
    segments.forEach(([a, b]) => {
      if (b - a < 0.04) return;
      addBox((a + b) / 2, height / 2, z, b - a, height, thickness, wallMat);
      wallBounds.push({ minX: a, maxX: b, minZ: z - thickness / 2, maxZ: z + thickness / 2 });
    });
    sorted.forEach(([a, b]) => {
      const trim = 0.095;
      addBox(a + trim / 2, height / 2, z, trim, height, thickness * 1.15, trimMat);
      addBox(b - trim / 2, height / 2, z, trim, height, thickness * 1.15, trimMat);
      addBox((a + b) / 2, height - 0.1, z, b - a + trim, 0.16, thickness * 1.2, trimMat);
    });
  }

  function addWallZ(x, from, to, openings = [], height = 3.35, thickness = 0.18) {
    const sorted = openings.slice().sort((a, b) => a[0] - b[0]);
    let cursor = from;
    const segments = [];
    sorted.forEach(([a, b]) => {
      if (a > cursor) segments.push([cursor, a]);
      cursor = Math.max(cursor, b);
    });
    if (cursor < to) segments.push([cursor, to]);
    segments.forEach(([a, b]) => {
      if (b - a < 0.04) return;
      addBox(x, height / 2, (a + b) / 2, thickness, height, b - a, wallMat);
      wallBounds.push({ minX: x - thickness / 2, maxX: x + thickness / 2, minZ: a, maxZ: b });
    });
    sorted.forEach(([a, b]) => {
      const trim = 0.095;
      addBox(x, height / 2, a + trim / 2, thickness * 1.15, height, trim, trimMat);
      addBox(x, height / 2, b - trim / 2, thickness * 1.15, height, trim, trimMat);
      addBox(x, height - 0.1, (a + b) / 2, thickness * 1.2, 0.16, b - a + trim, trimMat);
    });
  }

  function createMarbleTexture() {
    const c = document.createElement("canvas");
    c.width = 512; c.height = 512;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#e6dfd2";
    ctx.fillRect(0, 0, 512, 512);
    ctx.strokeStyle = "rgba(127,112,92,.14)";
    ctx.lineWidth = 2;
    for (let i = 0; i < 14; i++) {
      const y = (i * 49 + 13) % 512;
      ctx.beginPath();
      ctx.moveTo(-20, y);
      ctx.bezierCurveTo(110, y - 65 + i * 2, 310, y + 50 - i, 530, y - 22);
      ctx.stroke();
    }
    for (let i = 0; i < 22; i++) {
      ctx.fillStyle = "rgba(255,255,255," + (0.04 + (i % 4) * 0.02) + ")";
      ctx.fillRect((i * 73) % 512, (i * 109) % 512, 42, 2);
    }
    const texture = new THREE.CanvasTexture(c);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(5, 4);
    return texture;
  }

  const wallMat = new THREE.MeshStandardMaterial({ color: 0xe9e2d7, roughness: 0.82 });
  const trimMat = new THREE.MeshStandardMaterial({ color: 0xd5c7b1, roughness: 0.66 });
  const oliveMat = new THREE.MeshStandardMaterial({ color: 0x414b35, roughness: 0.72 });
  const oliveDeepMat = new THREE.MeshStandardMaterial({ color: 0x303a2b, roughness: 0.78 });
  const orangeMat = new THREE.MeshStandardMaterial({ color: 0xe99a45, roughness: 0.48 });
  const brassMat = new THREE.MeshStandardMaterial({ color: 0xa17d42, metalness: 0.72, roughness: 0.28 });
  const marbleMat = new THREE.MeshStandardMaterial({ map: createMarbleTexture(), roughness: 0.32, metalness: 0.03 });
  const woodMat = new THREE.MeshStandardMaterial({ color: 0x563c2d, roughness: 0.45 });
  const creamMat = new THREE.MeshStandardMaterial({ color: 0xf0e9dc, roughness: 0.76 });
  const glassMat = new THREE.MeshPhysicalMaterial({ color: 0xb7c7c1, roughness: 0.12, transmission: 0.18, transparent: true, opacity: 0.48, side: THREE.DoubleSide });
  const rugMat = new THREE.MeshStandardMaterial({ color: 0x9d8a70, roughness: 0.92 });
  const seatMat = new THREE.MeshStandardMaterial({ color: 0xcfc5b4, roughness: 0.9 });
  const warmLight = new THREE.MeshBasicMaterial({ color: 0xffd89a });

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xc9c8bb);
  scene.fog = new THREE.Fog(0xc9c8bb, 32, 78);
  camera = new THREE.PerspectiveCamera(68, 1, 0.1, 100);
  camera.position.set(0, eyeHeight, 11.4);
  camera.rotation.order = "YXZ";

  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: !isCoarse, powerPreference: "high-performance" });
  } catch (error) {
    if (introText) introText.textContent = lang() === "ar"
      ? "يتعذر تشغيل العرض ثلاثي الأبعاد في هذا المتصفح. افتح الموقع بمتصفح حديث يدعم WebGL."
      : "This browser could not start the 3D view. Open the site in a modern browser with WebGL support.";
    if (startButton) startButton.disabled = true;
    throw error;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isCoarse ? 1.35 : 1.75));
  renderer.setSize(viewport.clientWidth, viewport.clientHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const hemi = new THREE.HemisphereLight(0xfff3dc, 0x5d5e4e, 1.45);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffe7bf, 2.25);
  sun.position.set(-8, 15, 9);
  sun.castShadow = true;
  sun.shadow.mapSize.set(isCoarse ? 768 : 1280, isCoarse ? 768 : 1280);
  sun.shadow.camera.left = -18; sun.shadow.camera.right = 18;
  sun.shadow.camera.top = 18; sun.shadow.camera.bottom = -18;
  scene.add(sun);
  scene.add(new THREE.AmbientLight(0xffffff, 0.32));

  function addLight(x, y, z, intensity = 0.85, distance = 8) {
    const light = new THREE.PointLight(0xffd49a, intensity, distance, 2);
    light.position.set(x, y, z);
    scene.add(light);
    addSphere(x, y, z, 0.09, warmLight);
  }

  // Garden court, villa shell, entry route and room partitions from the supplied ground floor concept.
  addBox(0, -0.2, 0, 21.2, 0.36, 15.2, marbleMat);
  addBox(0, -0.22, 10.7, 27, 0.36, 8.8, new THREE.MeshStandardMaterial({ color: 0xbab29e, roughness: 0.86 }));
  addBox(0, 3.38, 0, 21.2, 0.22, 15.2, wallMat);

  // Exterior wall leaves the center entrance open.
  addWallX(7, -10.6, 10.6, [[-1.45, 1.45]]);
  addWallX(-7, -10.6, 10.6);
  addWallZ(-10.6, -7, 7);
  addWallZ(10.6, -7, 7);

  // Central hall and the public rooms.
  addWallZ(-3.05, -7, 7, [[-5.25, -4.05], [-0.62, 0.62], [3.28, 4.48]]);
  addWallZ(3.05, -7, 7, [[-5.55, -4.35], [-2.48, -1.28], [2.55, 3.75]]);
  addWallX(2.42, -10.6, -3.05);
  addWallX(-2.38, -10.6, -3.05);
  addWallX(0.1, 3.05, 10.6);
  addWallX(-4.02, 3.05, 10.6);

  // Compact service rooms at the back right.
  addWallZ(6.8, -7, -4.02, [[-6.45, -5.25]]);
  addWallZ(8.35, -4.02, 0.1, [[-3.25, -2.1]]);
  addWallX(-5.42, 6.8, 10.6, [[8.02, 9.12]]);
  addWallX(-6.02, 3.05, 6.8, [[4.1, 5.15]]);

  // Warm cornices and restrained wall moulding around the main public spaces.
  [-10.46, -3.14, 3.14, 10.46].forEach(x => {
    addBox(x, 0.18, 0, 0.06, 0.12, 14, trimMat, scene, false);
    addBox(x, 3.08, 0, 0.08, 0.14, 14, trimMat, scene, false);
  });
  [-6.88, -4.08, -2.28, 0.02, 2.32, 6.88].forEach(z => {
    addBox(0, 0.18, z, 20.8, 0.12, 0.06, trimMat, scene, false);
    addBox(0, 3.08, z, 20.8, 0.14, 0.08, trimMat, scene, false);
  });

  // Tall glazed windows and classic panel frames along the side elevations.
  [-8.9, -5.4, -1.6, 1.6, 5.4, 8.9].forEach(z => {
    addBox(-10.48, 1.82, z, 0.04, 1.85, 1.7, glassMat, scene, false);
    addBox(10.48, 1.82, z, 0.04, 1.85, 1.7, glassMat, scene, false);
    addBox(-10.39, 0.86, z, 0.1, 0.07, 1.85, brassMat, scene, false);
    addBox(10.39, 0.86, z, 0.1, 0.07, 1.85, brassMat, scene, false);
  });

  // Entry stair, entry columns, planted court and a subtle pergola for outdoor sitting.
  for (let i = 0; i < 5; i++) {
    const width = 4.1 + i * 0.44;
    const depth = 0.42;
    addBox(0, 0.08 + i * 0.04, 7.55 + i * 0.44, width, 0.16, depth, trimMat);
  }
  [-1.82, 1.82].forEach(x => {
    addCylinder(x, 1.68, 6.84, 0.16, 0.2, 3.36, creamMat, scene, 24);
    addCylinder(x, 3.35, 6.84, 0.29, 0.29, 0.12, trimMat, scene, 24);
    addCylinder(x, 0.18, 6.84, 0.3, 0.34, 0.18, trimMat, scene, 24);
  });
  addBox(0, 3.42, 6.82, 4.2, 0.24, 0.42, trimMat);
  addBox(6.2, 2.85, 10.1, 5.1, 0.18, 0.18, woodMat);
  [-8.1, -4.4, 4.4, 8.1].forEach(x => addBox(x, 1.55, 11.25, 0.12, 3.1, 0.12, woodMat));
  addBox(6.2, 2.82, 8.8, 5.1, 0.12, 0.12, woodMat);
  addBox(6.2, 2.82, 11.4, 5.1, 0.12, 0.12, woodMat);

  function addPlant(x, z, scale = 1) {
    addCylinder(x, 0.27, z, 0.34 * scale, 0.45 * scale, 0.5 * scale, woodMat);
    const foliage = new THREE.MeshStandardMaterial({ color: 0x4b5a3d, roughness: 0.9 });
    const leaves = new THREE.Mesh(new THREE.ConeGeometry(0.55 * scale, 1.7 * scale, 12), foliage);
    leaves.position.set(x, 1.25 * scale, z);
    leaves.castShadow = true;
    scene.add(leaves);
  }
  [-9.3, -7.3, 7.3, 9.3].forEach(x => addPlant(x, 9.2, 1));
  [-9.9, 9.9].forEach(x => addPlant(x, -5.7, 1.2));

  function addRug(x, z, w, d, color = 0x8f8066) {
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.95 });
    addBox(x, 0.012, z, w, 0.024, d, mat, scene, false);
    addBox(x, 0.027, z - d / 2 + 0.08, w - 0.22, 0.018, 0.035, brassMat, scene, false);
    addBox(x, 0.027, z + d / 2 - 0.08, w - 0.22, 0.018, 0.035, brassMat, scene, false);
  }

  function addSofa(x, z, rotation, length = 3.2, color = 0x414b35) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotation;
    scene.add(group);
    const fabric = new THREE.MeshStandardMaterial({ color, roughness: 0.94 });
    const pillow = new THREE.MeshStandardMaterial({ color: 0xe6decf, roughness: 0.92 });
    const leg = new THREE.MeshStandardMaterial({ color: 0x8a6d41, metalness: 0.6, roughness: 0.36 });
    addBox(0, 0.32, 0, length, 0.3, 0.96, fabric, group);
    addCushion(0, 0.49, 0.02, length - 0.12, 0.28, 0.88, fabric, group);
    addCushion(0, 0.92, -0.34, length - 0.08, 0.86, 0.3, fabric, group);
    addCushion(-length / 2 + 0.16, 0.66, 0.05, 0.34, 0.62, 0.98, fabric, group);
    addCushion(length / 2 - 0.16, 0.66, 0.05, 0.34, 0.62, 0.98, fabric, group);
    for (let i = 0; i < Math.max(2, Math.floor(length / 0.9)); i++) {
      const pillowX = -length / 2 + 0.65 + i * (length - 1.3) / Math.max(1, Math.floor(length / 0.9) - 1);
      addCushion(pillowX, 0.8, 0.17, 0.5, 0.34, 0.2, pillow, group);
    }
    [-length / 2 + 0.25, length / 2 - 0.25].forEach(px => {
      addBox(px, 0.13, -0.31, 0.07, 0.26, 0.07, leg, group, false);
      addBox(px, 0.13, 0.31, 0.07, 0.26, 0.07, leg, group, false);
    });
  }

  function addCoffeeTable(x, z, radius = 0.75) {
    addCylinder(x, 0.58, z, radius, radius, 0.13, trimMat, scene, 40);
    addCylinder(x, 0.3, z, 0.11, 0.14, 0.48, brassMat, scene, 20);
    addCylinder(x, 0.05, z, 0.45, 0.45, 0.06, brassMat, scene, 32);
  }

  function addDiningSet(x, z, rotation = 0) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotation;
    scene.add(group);
    addBox(0, 0.82, 0, 2.6, 0.14, 1.35, trimMat, group);
    [-1, 1].forEach(px => [-1, 1].forEach(pz => addBox(px * 1.03, 0.4, pz * 0.48, 0.12, 0.8, 0.12, woodMat, group)));
    for (let i = -1; i <= 1; i++) {
      [-1, 1].forEach(side => {
        const cz = side * 1.0;
        addCushion(i * 0.74, 0.53, cz, 0.57, 0.26, 0.56, oliveMat, group);
        addCushion(i * 0.74, 0.91, cz + side * 0.22, 0.57, 0.7, 0.2, oliveMat, group);
        addBox(i * 0.74, 0.12, cz, 0.08, 0.24, 0.08, brassMat, group);
      });
    }
  }

  function addChandelier(x, z) {
    addCylinder(x, 3.05, z, 0.06, 0.06, 0.65, brassMat);
    addCylinder(x, 2.72, z, 0.48, 0.58, 0.08, brassMat, scene, 32);
    for (let i = 0; i < 8; i++) {
      const angle = i * Math.PI / 4;
      const px = x + Math.cos(angle) * 0.62;
      const pz = z + Math.sin(angle) * 0.62;
      addSphere(px, 2.4, pz, 0.12, warmLight);
      const light = new THREE.PointLight(0xffd39a, 0.18, 3.2, 2);
      light.position.set(px, 2.4, pz);
      scene.add(light);
    }
  }

  function addWallArtX(x, y, z, width, height, color) {
    const frame = new THREE.MeshStandardMaterial({ color: 0x8f713f, metalness: 0.52, roughness: 0.38 });
    const artwork = new THREE.MeshStandardMaterial({ color, roughness: 0.9 });
    addBox(x, y, z, 0.09, height + 0.16, width + 0.16, frame, scene, false);
    addBox(x + (x < 0 ? 0.055 : -0.055), y, z, 0.045, height, width, artwork, scene, false);
    addBox(x + (x < 0 ? 0.084 : -0.084), y - height * 0.26, z, 0.02, 0.045, width * 0.64, brassMat, scene, false);
    addBox(x + (x < 0 ? 0.084 : -0.084), y + height * 0.1, z, 0.02, 0.035, width * 0.45, creamMat, scene, false);
  }

  function addWallArtZ(z, y, x, width, height, color) {
    const frame = new THREE.MeshStandardMaterial({ color: 0x8f713f, metalness: 0.52, roughness: 0.38 });
    const artwork = new THREE.MeshStandardMaterial({ color, roughness: 0.9 });
    const face = z < 0 || (z > 0 && z < 1) ? 1 : -1;
    addBox(x, y, z, width + 0.16, height + 0.16, 0.09, frame, scene, false);
    addBox(x, y, z + face * 0.055, width, height, 0.045, artwork, scene, false);
    addBox(x, y - height * 0.25, z + face * 0.084, width * 0.62, 0.045, 0.02, brassMat, scene, false);
    addBox(x, y + height * 0.1, z + face * 0.084, width * 0.43, 0.035, 0.02, creamMat, scene, false);
  }

  // Majlis and guest reception seating.
  addRug(-6.7, 4.7, 5.5, 3.2, 0x697154);
  addSofa(-6.4, 6.1, 0, 3.9, 0x414b35);
  addSofa(-8.8, 4.55, Math.PI / 2, 2.7, 0xcfc4ae);
  addSofa(-4.2, 4.55, -Math.PI / 2, 2.7, 0xcfc4ae);
  addCoffeeTable(-6.5, 4.5, 0.9);

  // Formal dining, family living and a second daily dining zone.
  addRug(-6.8, 0, 4.9, 3.6, 0x8b795e);
  addDiningSet(-6.8, 0);
  addRug(-6.7, -4.9, 5.4, 3.5, 0x6d715f);
  addSofa(-6.4, -3.5, 0, 4.1, 0xc8c0b3);
  addSofa(-8.5, -5.15, Math.PI / 2, 2.5, 0x414b35);
  addCoffeeTable(-6.5, -5.15, 0.72);
  addRug(6.6, 2.6, 4.8, 3.2, 0x9a886e);
  addDiningSet(6.6, 2.65, Math.PI / 2);

  // Kitchen cabinetry, stone island and brass details.
  [-6.1, -4.9, -3.7].forEach(z => {
    addBox(9.65, 1.0, z, 1.55, 1.9, 0.62, oliveDeepMat);
    addBox(9.65, 2.0, z, 1.64, 0.09, 0.72, trimMat);
    addBox(8.82, 1.05, z, 0.045, 1.9, 0.045, brassMat, scene, false);
  });
  addBox(5.3, 1.0, -1.65, 0.65, 1.9, 4.1, oliveDeepMat);
  addBox(5.3, 2.0, -1.65, 0.85, 0.12, 4.25, trimMat);
  addBox(7.3, 0.92, -1.2, 2.5, 1.75, 1.0, creamMat);
  addBox(7.3, 1.83, -1.2, 2.7, 0.13, 1.18, marbleMat);
  addBox(7.3, 1.92, -1.2, 0.56, 0.05, 0.42, brassMat, scene, false);
  [-0.52, 0, 0.52].forEach(z => addBox(7.3, 0.43, -1.2 + z, 0.38, 0.84, 0.38, oliveMat));
  addLight(6.5, 2.65, -0.9, 0.55, 6);
  addLight(8.1, 2.65, -0.9, 0.55, 6);

  // Service wing and outdoor sitting.
  addBox(4.7, 0.34, -5.62, 1.9, 0.68, 1.4, woodMat);
  addBox(4.7, 0.82, -5.62, 1.5, 0.24, 1.1, creamMat);
  addBox(8.1, 0.36, -5.55, 2.0, 0.72, 0.76, oliveMat);
  addBox(8.1, 0.78, -5.55, 2.2, 0.12, 0.9, trimMat);
  addRug(6.5, 10.2, 4.2, 2.8, 0x777b62);
  addSofa(5.4, 10.8, 0, 2.7, 0x414b35);
  addCoffeeTable(7.1, 9.9, 0.52);
  addPlant(8.9, 10.8, 0.8);
  addLight(6.3, 2.7, 10.2, 0.35, 7);
  addChandelier(0, -1.0);
  // Quiet olive, ivory and brass artwork gives each public room a clear focal point.
  addWallArtZ(6.82, 2.05, -6.5, 1.8, 1.35, 0x414b35);
  addWallArtZ(-2.22, 2.05, -6.7, 1.45, 1.15, 0xd4a45e);
  addWallArtZ(-6.82, 2.05, -6.5, 1.8, 1.3, 0x8d8777);
  addWallArtZ(0.28, 2.05, 7.0, 1.45, 1.1, 0x414b35);
  addWallArtX(-10.42, 2.05, -1.35, 1.15, 1.5, 0x8d8777);
  addLight(-6.4, 2.65, 4.6, 0.45, 6);
  addLight(-6.4, 2.65, -4.9, 0.48, 7);
  addLight(6.5, 2.65, 2.4, 0.42, 6);

  // A decorative stair at the back of the foyer, kept open as a visual anchor.
  for (let i = 0; i < 8; i++) {
    addBox(0, 0.1 + i * 0.2, -4.55 - i * 0.34, 2.35, 0.2, 0.42, trimMat);
  }
  addBox(0, 1.75, -7.2, 2.35, 0.16, 0.2, brassMat);

  // Facade artwork is the first view; the visitor walks through the modeled entrance.
  if (window.villaTourFacade) {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(window.villaTourFacade, texture => {
      texture.colorSpace = THREE.SRGBColorSpace;
      facadePlane = new THREE.Mesh(
        new THREE.PlaneGeometry(13.2, 7.45),
        new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide })
      );
      facadePlane.position.set(0, 3.72, 7.18);
      scene.add(facadePlane);
    });
  }
  if (introImage && window.villaTourFacade) introImage.src = window.villaTourFacade;

  function resize() {
    const w = Math.max(1, viewport.clientWidth);
    const h = Math.max(1, viewport.clientHeight);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isCoarse ? 1.35 : 1.75));
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(viewport);
  window.addEventListener("resize", resize);

  function canStandAt(x, z) {
    if (x < -12.7 || x > 12.7 || z < -9.5 || z > 13.4) return false;
    for (const wall of wallBounds) {
      if (x > wall.minX - walkRadius && x < wall.maxX + walkRadius &&
          z > wall.minZ - walkRadius && z < wall.maxZ + walkRadius) return false;
    }
    return true;
  }

  function look(dx, dy) {
    yaw -= dx * 0.0033;
    pitch = THREE.MathUtils.clamp(pitch - dy * 0.0025, -0.78, 0.72);
    if (camera) camera.rotation.set(pitch, yaw, 0, "YXZ");
  }

  canvas.addEventListener("pointerdown", event => {
    if (!tourStarted || event.button > 0) return;
    dragging = true;
    lastPointerX = event.clientX;
    lastPointerY = event.clientY;
    if (canvas.setPointerCapture && event.pointerType === "touch") canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener("pointermove", event => {
    if (!dragging || pointerLocked) return;
    look(event.clientX - lastPointerX, event.clientY - lastPointerY);
    lastPointerX = event.clientX;
    lastPointerY = event.clientY;
  });
  ["pointerup", "pointercancel", "lostpointercapture"].forEach(type => {
    canvas.addEventListener(type, () => { dragging = false; });
  });
  canvas.addEventListener("click", () => {
    if (!tourStarted || isCoarse || !canvas.requestPointerLock || document.pointerLockElement === canvas) return;
    canvas.requestPointerLock();
  });
  document.addEventListener("pointerlockchange", () => {
    pointerLocked = document.pointerLockElement === canvas;
  });
  document.addEventListener("mousemove", event => {
    if (pointerLocked) look(event.movementX, event.movementY);
  });

  const keyMap = {
    KeyW: "forward", ArrowUp: "forward",
    KeyS: "backward", ArrowDown: "backward",
    KeyA: "left", ArrowLeft: "turnLeft",
    KeyD: "right", ArrowRight: "turnRight"
  };
  window.addEventListener("keydown", event => {
    if (!tourStarted || !keyMap[event.code]) return;
    held[keyMap[event.code]] = true;
    event.preventDefault();
  });
  window.addEventListener("keyup", event => {
    if (keyMap[event.code]) held[keyMap[event.code]] = false;
  });
  window.addEventListener("blur", () => Object.keys(held).forEach(key => { held[key] = false; }));

  document.querySelectorAll("[data-walk]").forEach(button => {
    const action = button.getAttribute("data-walk");
    const stateKey = action === "forward" ? "forward" : action === "backward" ? "backward" :
      action === "turn-left" ? "turnLeft" : action === "turn-right" ? "turnRight" : "";
    if (!stateKey) return;
    const release = event => {
      event.preventDefault();
      held[stateKey] = false;
    };
    button.addEventListener("pointerdown", event => {
      event.preventDefault();
      tourStarted = true;
      if (intro) intro.hidden = true;
      held[stateKey] = true;
    });
    ["pointerup", "pointerleave", "pointercancel", "lostpointercapture"].forEach(type => button.addEventListener(type, release));
    button.addEventListener("contextmenu", event => event.preventDefault());
  });

  function goToRoom(id) {
    if (id === "facade" && !tourStarted) {
      setRoom("facade", false);
      return;
    }
    setRoom(id);
  }

  if (startButton) startButton.addEventListener("click", () => {
    setRoom("facade", false);
    tourStarted = true;
    if (intro) intro.hidden = true;
  });
  document.querySelectorAll("[data-tour-room]").forEach(button => {
    button.addEventListener("click", () => goToRoom(button.getAttribute("data-tour-room")));
  });
  if (previousButton) previousButton.addEventListener("click", () => {
    const index = roomOrder.indexOf(activeRoom);
    goToRoom(roomOrder[(index + roomOrder.length - 1) % roomOrder.length]);
  });
  if (nextButton) nextButton.addEventListener("click", () => {
    const index = roomOrder.indexOf(activeRoom);
    goToRoom(roomOrder[(index + 1) % roomOrder.length]);
  });

  let fallbackFullscreen = false;
  function syncFullscreen() {
    const active = document.fullscreenElement === shell || fallbackFullscreen;
    shell.classList.toggle("is-windowed-fullscreen", fallbackFullscreen);
    document.body.classList.toggle("tour-locked", fallbackFullscreen);
    if (fullButtonText) fullButtonText.textContent = active
      ? (lang() === "ar" ? "إنهاء ملء الشاشة" : "EXIT FULL SCREEN")
      : (lang() === "ar" ? "فتح بملء الشاشة" : "OPEN FULL SCREEN");
    if (fullButton) fullButton.setAttribute("aria-label", fullButtonText?.textContent || "Full screen");
    resize();
  }
  if (fullButton) fullButton.addEventListener("click", async () => {
    const active = document.fullscreenElement === shell || fallbackFullscreen;
    if (active) {
      if (document.fullscreenElement === shell && document.exitFullscreen) await document.exitFullscreen().catch(() => {});
      fallbackFullscreen = false;
      syncFullscreen();
      return;
    }
    if (shell.requestFullscreen) {
      try {
        await shell.requestFullscreen({ navigationUI: "hide" });
      } catch (error) {
        fallbackFullscreen = true;
      }
    } else {
      fallbackFullscreen = true;
    }
    syncFullscreen();
  });
  document.addEventListener("fullscreenchange", syncFullscreen);
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && fallbackFullscreen) {
      fallbackFullscreen = false;
      syncFullscreen();
    }
  });
  window.addEventListener("site-language-change", updateLanguage);

  function moveCamera(dt) {
    if (!tourStarted) return;
    if (held.turnLeft) yaw += dt * 1.65;
    if (held.turnRight) yaw -= dt * 1.65;
    camera.rotation.set(pitch, yaw, 0, "YXZ");
    if (targetPose) {
      camera.position.lerp(targetPose.position, Math.min(1, dt * 3.8));
      const deltaYaw = Math.atan2(Math.sin(targetPose.yaw - yaw), Math.cos(targetPose.yaw - yaw));
      yaw += deltaYaw * Math.min(1, dt * 3.8);
      camera.rotation.set(pitch, yaw, 0, "YXZ");
      if (camera.position.distanceTo(targetPose.position) < 0.08 && Math.abs(deltaYaw) < 0.025) targetPose = null;
    }

    let forwardAmount = (held.forward ? 1 : 0) - (held.backward ? 1 : 0);
    let sideAmount = (held.right ? 1 : 0) - (held.left ? 1 : 0);
    if (!forwardAmount && !sideAmount) return;
    const speed = 3.1 * dt;
    const dx = (-Math.sin(yaw) * forwardAmount + Math.cos(yaw) * sideAmount) * speed;
    const dz = (-Math.cos(yaw) * forwardAmount - Math.sin(yaw) * sideAmount) * speed;
    const nextX = camera.position.x + dx;
    const nextZ = camera.position.z + dz;
    if (canStandAt(nextX, camera.position.z)) camera.position.x = nextX;
    if (canStandAt(camera.position.x, nextZ)) camera.position.z = nextZ;
    if (facadePlane && camera.position.z < 7.85) facadePlane.visible = false;
  }

  let previousTime = performance.now();
  function animate(now) {
    requestAnimationFrame(animate);
    const dt = Math.min(0.045, Math.max(0.001, (now - previousTime) / 1000));
    previousTime = now;
    moveCamera(dt);
    if (facadePlane && camera.position.z < 7.85) facadePlane.visible = false;
    renderer.render(scene, camera);
  }
  requestAnimationFrame(animate);
  resize();
  updateLanguage();
  controlsReady = true;
}
