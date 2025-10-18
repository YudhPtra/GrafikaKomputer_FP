import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { drawMoleculeGeometry } from "./molecule.js";
import { setupPlayer } from "./player.js";
import { DATA } from "../data.js";

export const desks = [];
export const moleculesOnDesks = [];
let highlightMesh = null;
let interactionText = null;

export function createClassroomEnvironment(mainGroup, scene) {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
  dirLight.position.set(10, 15, 10);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.set(2048, 2048);
  scene.add(dirLight);

  const floorTex = new THREE.TextureLoader().load("textures/wood_floor.jpg");
  floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping;
  floorTex.repeat.set(8, 8);
  const floorMat = new THREE.MeshStandardMaterial({
    map: floorTex,
    roughness: 0.8,
    metalness: 0.1,
  });
  const floor = new THREE.Mesh(new THREE.BoxGeometry(40, 0.1, 40), floorMat);
  floor.receiveShadow = true;
  mainGroup.add(floor);

  const wallMat = new THREE.MeshStandardMaterial({
    color: 0xf2f0eb,
    side: THREE.BackSide,
  });
  const walls = new THREE.Mesh(new THREE.BoxGeometry(40, 10, 40), wallMat);
  walls.position.y = 5;
  mainGroup.add(walls);

  const board = new THREE.Mesh(
    new THREE.BoxGeometry(8, 3, 0.2),
    new THREE.MeshStandardMaterial({ color: 0x004d00 })
  );
  board.position.set(0, 3, -19.8);
  mainGroup.add(board);
}

function createDesk() {
  const group = new THREE.Group();
  const loader = new GLTFLoader();

  loader.load(
    "models/school_desk.glb",
    (gltf) => {
      const model = gltf.scene;
      model.scale.set(1.2, 1.2, 1.2);
      model.rotation.y = Math.PI;
      group.add(model);
    },
    undefined,
    (err) => {
      const top = new THREE.Mesh(
        new THREE.BoxGeometry(2.0, 0.12, 1.2),
        new THREE.MeshStandardMaterial({ color: 0x8b5a2b })
      );
      const legMat = new THREE.MeshStandardMaterial({ color: 0x4a2c0a });
      const legs = [];
      for (const [x, z] of [
        [-0.9, -0.5],
        [0.9, -0.5],
        [-0.9, 0.5],
        [0.9, 0.5],
      ]) {
        const leg = new THREE.Mesh(
          new THREE.BoxGeometry(0.1, 0.8, 0.1),
          legMat
        );
        leg.position.set(x, 0.1, z);
        legs.push(leg);
      }
      top.position.y = 0.5;
      group.add(top, ...legs);
    }
  );

  return group;
}

export function setupClassroom(mainGroup, rows = 3, cols = 4) {
  const spacingX = 5;
  const spacingZ = 4;
  const moleculeKeys = Object.keys(DATA.molecules);
  let molIndex = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const desk = createDesk();
      desk.position.set(
        (c - (cols - 1) / 2) * spacingX,
        0.4,
        (r - (rows - 1) / 2) * spacingZ
      );
      mainGroup.add(desk);
      desks.push(desk);

      const molKey = moleculeKeys[molIndex % moleculeKeys.length];
      molIndex++;

      const tempGroup = new THREE.Group();
      const oldMainGroup = window.mainGroup;
      window.mainGroup = tempGroup;
      drawMoleculeGeometry(molKey);
      window.mainGroup = oldMainGroup;

      const molInstance = tempGroup;
      molInstance.scale.setScalar(0.4); // 🔹 Molekul diperkecil
      molInstance.position.y = 1.2;

      desk.add(molInstance);
      moleculesOnDesks.push({ mesh: molInstance, key: molKey, desk });
    }
  }
}

/** Membuat efek highlight & teks interaksi */
function createInteractionText() {
  interactionText = document.createElement("div");
  interactionText.textContent = "Tekan E untuk lihat detail";
  interactionText.style.position = "fixed";
  interactionText.style.bottom = "60px";
  interactionText.style.left = "50%";
  interactionText.style.transform = "translateX(-50%)";
  interactionText.style.padding = "10px 18px";
  interactionText.style.background = "rgba(0,0,0,0.7)";
  interactionText.style.color = "white";
  interactionText.style.fontFamily = "Arial, sans-serif";
  interactionText.style.fontSize = "14px";
  interactionText.style.borderRadius = "6px";
  interactionText.style.display = "none";
  interactionText.style.zIndex = "2000";
  document.body.appendChild(interactionText);
}

function setHighlight(target) {
  if (!target) {
    if (highlightMesh) {
      highlightMesh.material.emissiveIntensity = 0;
    }
    if (interactionText) interactionText.style.display = "none";
    return;
  }
  const mesh = target.mesh;
  if (!mesh) return;

  // Highlight dengan emissive glow
  mesh.traverse((child) => {
    if (child.isMesh && child.material) {
      child.material.emissive = new THREE.Color(0x00ffff);
      child.material.emissiveIntensity = 0.8;
    }
  });

  highlightMesh = mesh;
  interactionText.style.display = "block";
}

/** Mengecek apakah player dekat dengan molekul */
export function checkPlayerProximity(player) {
  let nearest = null;
  let minDist = Infinity;

  for (const { mesh, key } of moleculesOnDesks) {
    const dist = player.position.distanceTo(mesh.getWorldPosition(new THREE.Vector3()));
    if (dist < 2.5 && dist < minDist) {
      nearest = { mesh, key };
      minDist = dist;
    }
  }

  if (nearest) setHighlight(nearest);
  else setHighlight(null);

  return nearest;
}

/** Entry point utama untuk scene classroom */
export function enterClassroom(scene, mainGroup, camera, controls) {
  mainGroup.clear();
  createClassroomEnvironment(mainGroup, scene);
  setupClassroom(mainGroup, 3, 4);
  createInteractionText();

  const player = setupPlayer(mainGroup, camera, controls);
  camera.position.set(0, 4, 12);
  controls.target.set(0, 2, 0);
  controls.update();

  return player;
}
