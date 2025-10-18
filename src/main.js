// src/main.js
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { enterClassroom } from "./core/classroom.js";
import { updatePlayer } from "./core/player.js";
import { init as initMolecule } from "./core/molecule.js";

let scene, camera, renderer, controls;
let mainGroup;
let currentMode = "classroom"; // "classroom" | "molecule"
let player;
let clock = new THREE.Clock();

// 🔹 Referensi elemen canvas
const classroomCanvas = document.getElementById("classroom-canvas");
const moleculeCanvas = document.getElementById("molecule-canvas");

initClassroomScene(); // ⬅️ Mulai dari classroom dulu
animate();

// ----------------------
// INISIALISASI CLASSROOM
// ----------------------
function initClassroomScene() {
  console.log("🔹 Initializing classroom scene...");
  currentMode = "classroom";

  // Setup renderer untuk classroom
  renderer = new THREE.WebGLRenderer({
    canvas: classroomCanvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xbfd1e5);

  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  controls = new OrbitControls(camera, renderer.domElement);

  mainGroup = new THREE.Group();
  scene.add(mainGroup);

  player = enterClassroom(scene, mainGroup, camera, controls);

  window.addEventListener("resize", onWindowResize);
}

// ----------------------
// SWITCH MODE
// ----------------------
export function switchToMoleculeMode() {
  console.log("🧪 Switching to molecule mode...");
  currentMode = "molecule";

  classroomCanvas.classList.add("hidden");
  moleculeCanvas.classList.remove("hidden");

  // Jalankan scene molecule (pakai canvas-nya sendiri)
  initMolecule();
}


// ----------------------
// RENDER LOOP
// ----------------------
function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();

  if (currentMode === "classroom") {
    updatePlayer(delta, camera);
    renderer.render(scene, camera);
  }
  // mode molecule render sendiri di initMolecule()
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
