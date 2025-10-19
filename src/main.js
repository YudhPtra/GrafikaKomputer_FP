// src/main.js
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { enterClassroom, checkPlayerProximity } from "./core/classroom.js";
import { updatePlayer } from "./core/player.js";
import { init as initMolecule, addBackButton } from "./core/molecule.js";
// import { stopMoleculeRender } from "./core/molecule.js";
import { stopMoleculeRender } from "./core/molecule.js";

// import { switchToClassroomMode } from "./main.js"; // biar bisa dipanggil balik dari tombol back (opsional)

// === Variabel global ===
let scene, camera, renderer, controls;
let mainGroup;
let player;
let currentMode = "classroom"; // "classroom" | "molecule"
let clock = new THREE.Clock();
let lastPlayerPosition = null;

// === Referensi elemen canvas ===
const classroomCanvas = document.getElementById("classroom-canvas");
const moleculeCanvas = document.getElementById("molecule-canvas");

// === Jalankan classroom scene pertama kali ===
initClassroomScene();
animate();

// ----------------------
// INISIALISASI CLASSROOM
// ----------------------
function initClassroomScene() {
  console.log("🔹 Initializing classroom scene...");
  currentMode = "classroom";

  // Renderer untuk classroom
  renderer = new THREE.WebGLRenderer({
    canvas: classroomCanvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  // Scene & kamera
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xbfd1e5);

  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // Group utama
  mainGroup = new THREE.Group();
  scene.add(mainGroup);

  // Setup classroom
  player = enterClassroom(scene, mainGroup, camera, controls);

  // Resize listener
  window.addEventListener("resize", onWindowResize);
}

// ----------------------
// SWITCH TO MOLECULE MODE
// ----------------------
export function switchToMoleculeMode(playerRef, moleculeKey = "H2O") {
  console.log("🧪 Switching to molecule mode for:", moleculeKey);
  currentMode = "molecule";

  if (playerRef) lastPlayerPosition = playerRef.position.clone();

  stopMoleculeRender();

  setTimeout(() => {
    classroomCanvas.classList.add("hidden");
    moleculeCanvas.classList.remove("hidden");

    // 🔹 Kirim moleculeKey ke initMolecule
    initMolecule(addBackButton, moleculeKey);
  }, 100);
}

// ----------------------
// SWITCH BACK TO CLASSROOM MODE
// ----------------------


export function switchToClassroomMode() {
  console.log("🏫 Switching back to classroom...");
  currentMode = "classroom";

  // 🔹 Hentikan render scene molecule
  stopMoleculeRender();

  // 🔹 Hapus tombol back (kalau ada)
  const btn = document.getElementById("back-to-classroom");
  if (btn) btn.remove();

  // 🔹 Ganti tampilan canvas
  moleculeCanvas.classList.add("hidden");
  classroomCanvas.classList.remove("hidden");

  // 🔹 Pastikan classroom renderer digunakan kembali
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);

  // 🔹 Kembalikan posisi player
  if (player && lastPlayerPosition) {
    player.position.copy(lastPlayerPosition);
    console.log("🎯 Player returned to:", lastPlayerPosition);
  }

  // 🔹 Pastikan kamera mengikuti karakter
  if (controls && player) {
    controls.target.copy(player.position.clone().add(new THREE.Vector3(0, 1, 0)));
    controls.update();
  }

  // 🔹 Render ulang classroom untuk memastikan muncul
  requestAnimationFrame(() => {
    renderer.render(scene, camera);
  });

  console.log("✅ Classroom mode restored!");
}


// ----------------------
// RENDER LOOP
// ----------------------
function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();

  if (currentMode === "classroom") {
    if (player) {
      updatePlayer(delta, camera);
      checkPlayerProximity(player);
    }
    renderer.render(scene, camera);
  }
  // Molecule mode dirender dari initMolecule()
}

// ----------------------
// RESPONSIVE RESIZE
// ----------------------
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
