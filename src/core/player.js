import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { switchToMoleculeMode } from "../main.js";
import { getNearestMolecule } from "./classroom.js";

let player, playerModel, mixer, actions = {};
let currentAction = "Idle";
let yaw = 0, pitch = 0;
const moveState = { forward: false, back: false, left: false, right: false };
const PLAYER_RADIUS = 0.45;
const cameraDistance = 4.5, cameraHeight = 2.0;
let velocityY = 0;
let isGrounded = true;
const GRAVITY = -9.8;
const JUMP_STRENGTH = 5;

export function setupPlayer(mainGroup, camera, controls) {
  player = new THREE.Object3D();
  player.position.set(0, PLAYER_RADIUS, 6);
  mainGroup.add(player);
  controls.enabled = false;
  loadCharacter();

  // 🔹 Input keyboard
  window.addEventListener("keydown", (e) => handleKey(e, true));
  window.addEventListener("keyup", (e) => handleKey(e, false));

  // 🔹 Mouse look
  let isMouseDown = false, lastX = 0, lastY = 0;
  window.addEventListener("mousedown", (e) => { isMouseDown = true; lastX = e.clientX; lastY = e.clientY; });
  window.addEventListener("mouseup", () => (isMouseDown = false));
  window.addEventListener("mousemove", (e) => {
    if (!isMouseDown) return;
    const dx = e.clientX - lastX, dy = e.clientY - lastY;
    lastX = e.clientX; lastY = e.clientY;
    yaw -= dx * 0.003;
    pitch = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, pitch - dy * 0.003));
  });

  return player;
}

function handleKey(e, pressed) {
  const k = e.key.toLowerCase();

  // WASD movement
  if (["w", "a", "s", "d"].includes(k))
    moveState[{ w: "forward", s: "back", a: "left", d: "right" }[k]] = pressed;

  // Space → lompat
  if (k === " " && pressed) jump();

  // E → buka mode molekul (kalau ada molekul di dekat)
  if (k === "e" && pressed) {
    const molKey = getNearestMolecule(); // 🔹 dapatkan key molekul terdekat
    if (molKey) {
      console.log("🧪 Membuka molekul:", molKey);
      switchToMoleculeMode(player, molKey); // ⬅️ kirim juga key-nya
    } else {
      console.log("❌ Tidak ada molekul di dekat karakter.");
    }
  }
}

export function updatePlayer(delta, camera) {
  if (!player) return;
  if (mixer) mixer.update(delta);

  const dir = new THREE.Vector3();
  if (moveState.forward) dir.z -= 1;
  if (moveState.back) dir.z += 1;
  if (moveState.left) dir.x -= 1;
  if (moveState.right) dir.x += 1;
  const moving = dir.lengthSq() > 0;
  setAction(moving ? "Walk" : "Idle");

  if (moving) {
    dir.normalize();
    const forward = new THREE.Vector3(Math.sin(yaw), 0, Math.cos(yaw));
    const right = new THREE.Vector3(forward.z, 0, -forward.x);
    const worldDir = new THREE.Vector3()
      .addScaledVector(forward, dir.z)
      .addScaledVector(right, dir.x)
      .normalize();
    player.position.addScaledVector(worldDir, 4 * delta);

    const angle = Math.atan2(worldDir.x, worldDir.z);
  player.rotation.y = angle;
  }

  // Fisika loncat
  velocityY += GRAVITY * delta;
  player.position.y += velocityY * delta;
  if (player.position.y <= PLAYER_RADIUS) {
    player.position.y = PLAYER_RADIUS;
    velocityY = 0;
    isGrounded = true;
  }

  // Kamera mengikuti
  const camOffset = new THREE.Vector3(
    Math.sin(yaw) * cameraDistance,
    cameraHeight + Math.sin(pitch) * 2,
    Math.cos(yaw) * cameraDistance
  );
  const desiredCamPos = player.position.clone().add(camOffset);
  camera.position.lerp(desiredCamPos, 0.15);
  camera.lookAt(player.position.clone().add(new THREE.Vector3(0, 1, 0)));
}

function jump() {
  if (!isGrounded) return;
  velocityY = JUMP_STRENGTH;
  isGrounded = false;
}

function setAction(name) {
  if (!actions[name] || currentAction === name) return;
  const prev = actions[currentAction];
  const next = actions[name];
  prev.fadeOut(0.2);
  next.reset().fadeIn(0.2).play();
  currentAction = name;
}

function loadCharacter() {
  const loader = new GLTFLoader();
  loader.load("models/chibi_boy.glb", (gltf) => {
    playerModel = gltf.scene;
    playerModel.scale.set(0.8, 0.8, 0.8);
    player.add(playerModel);

    // setup animasi
    mixer = new THREE.AnimationMixer(playerModel);
    gltf.animations.forEach((clip) => {
      actions[clip.name] = mixer.clipAction(clip);
    });

    if (actions["Idle"]) actions["Idle"].play();
  });
}
