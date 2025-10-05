import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';

(function () {
  const canvas = document.getElementById('space-canvas');
  const heroSection = document.querySelector('.hero');

  if (!canvas || !heroSection) {
    return;
  }

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x050813, 1);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x02030b, 0.0022);

  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
  camera.position.set(0, 18, 140);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = true;
  controls.minDistance = 30;
  controls.maxDistance = 260;
  controls.panSpeed = 0.3;
  controls.rotateSpeed = 0.6;
  controls.zoomSpeed = 0.8;

  let isUserInteracting = false;
  controls.addEventListener('start', () => {
    isUserInteracting = true;
  });
  controls.addEventListener('end', () => {
    isUserInteracting = false;
  });

  const ambientLight = new THREE.AmbientLight(0x8da8ff, 0.7);
  scene.add(ambientLight);

  const rimLight = new THREE.PointLight(0xffffff, 1.4, 900);
  rimLight.position.set(140, 100, 80);
  scene.add(rimLight);

  const starGeometry = new THREE.BufferGeometry();
  const starCount = 2200;
  const starPositions = new Float32Array(starCount * 3);
  const starColors = new Float32Array(starCount * 3);
  const color = new THREE.Color();

  for (let i = 0; i < starCount; i += 1) {
    const radius = 260 * Math.pow(Math.random(), 0.45);
    const theta = THREE.MathUtils.randFloatSpread(360) * (Math.PI / 180);
    const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    starPositions[i * 3] = x;
    starPositions[i * 3 + 1] = y;
    starPositions[i * 3 + 2] = z;

    const hue = 0.55 + Math.random() * 0.08;
    const saturation = 0.18 + Math.random() * 0.22;
    const lightness = 0.55 + Math.random() * 0.35;
    color.setHSL(hue, saturation, lightness);
    starColors[i * 3] = color.r;
    starColors[i * 3 + 1] = color.g;
    starColors[i * 3 + 2] = color.b;
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

  const starMaterial = new THREE.PointsMaterial({
    size: 1.35,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
  });

  const starfield = new THREE.Points(starGeometry, starMaterial);
  scene.add(starfield);

  const bigDipperData = [
    { name: 'Dubhe', position: new THREE.Vector3(-32, 24, 2) },
    { name: 'Merak', position: new THREE.Vector3(-18, 10, -6) },
    { name: 'Phecda', position: new THREE.Vector3(-5, 0, -4) },
    { name: 'Megrez', position: new THREE.Vector3(8, 8, 0) },
    { name: 'Alioth', position: new THREE.Vector3(22, 6, 5) },
    { name: 'Mizar', position: new THREE.Vector3(36, 2, 2) },
    { name: 'Alkaid', position: new THREE.Vector3(48, -10, -4) },
  ];

  const bigDipperGroup = new THREE.Group();
  const bigDipperMaterial = new THREE.MeshBasicMaterial({ color: 0xffd27d });

  bigDipperData.forEach((star) => {
    const glowGeometry = new THREE.SphereGeometry(3.4, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.16 });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.copy(star.position);

    const starMesh = new THREE.Mesh(new THREE.SphereGeometry(1.9, 24, 24), bigDipperMaterial.clone());
    starMesh.position.copy(star.position);

    bigDipperGroup.add(glow);
    bigDipperGroup.add(starMesh);
  });

  const bigDipperConnections = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
  ];

  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xffb347,
    transparent: true,
    opacity: 0.75,
  });

  bigDipperConnections.forEach(([startIndex, endIndex]) => {
    const start = bigDipperData[startIndex].position;
    const end = bigDipperData[endIndex].position;
    const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
    const line = new THREE.Line(geometry, lineMaterial);
    bigDipperGroup.add(line);
  });

  scene.add(bigDipperGroup);

  const dipperCenter = bigDipperData
    .reduce((acc, star) => acc.add(star.position.clone()), new THREE.Vector3())
    .multiplyScalar(1 / bigDipperData.length);
  controls.target.copy(dipperCenter);
  controls.update();

  let targetRotation = 0;
  const rotationSpeed = 0.0009;

  function animate() {
    requestAnimationFrame(animate);

    if (!isUserInteracting) {
      targetRotation += rotationSpeed;
      bigDipperGroup.rotation.y = targetRotation;
      starfield.rotation.y += rotationSpeed * 0.45;
    }

    controls.update();
    renderer.render(scene, camera);
  }

  function resizeRenderer() {
    const width = heroSection.clientWidth;
    const height = heroSection.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  resizeRenderer();
  animate();
  window.addEventListener('resize', resizeRenderer);

  const scrollTriggers = document.querySelectorAll('[data-scroll-to]');
  scrollTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const selector = trigger.getAttribute('data-scroll-to');
      const target = selector ? document.querySelector(selector) : null;
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
})();
