// src/core/classroom.js
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { drawMoleculeGeometry } from "./molecule.js";
import { setupPlayer } from "./player.js";
import { DATA } from "../data.js";

export const desks = [];
export const moleculesOnDesks = [];

export function createClassroomEnvironment(mainGroup) {
  // floor
  const floorMat = new THREE.MeshStandardMaterial({ color: 0xe0d6b4 });
  const floor = new THREE.Mesh(new THREE.BoxGeometry(40, 0.1, 40), floorMat);
  floor.receiveShadow = true;
  mainGroup.add(floor);

  // walls
  const wallMat = new THREE.MeshStandardMaterial({ color: 0xf2f0eb, side: THREE.BackSide });
  const walls = new THREE.Mesh(new THREE.BoxGeometry(40, 10, 40), wallMat);
  walls.position.y = 5;
  mainGroup.add(walls);

  // board (simple)
  const board = new THREE.Mesh(new THREE.BoxGeometry(8, 3, 0.2), new THREE.MeshStandardMaterial({ color: 0x003300 }));
  board.position.set(0, 3, -19.8);
  mainGroup.add(board);
}

function createDesk() {
  const group = new THREE.Group();
  const loader = new GLTFLoader();
  // jika file model tidak ada, group kosong tetap digunakan
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
      // fallback: buat desk sederhana
      const top = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.12, 1.2), new THREE.MeshStandardMaterial({ color: 0x8b5a2b }));
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.8, 0.12), new THREE.MeshStandardMaterial({ color: 0x6b3e1a }));
      top.position.y = 0.5;
      leg.position.set(-0.85, 0.1, -0.45);
      group.add(top);
      group.add(leg);
      console.warn("Failed to load desk model, using fallback simple desk.", err);
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

      // ✅ Buat grup sementara untuk molekul
      const tempGroup = new THREE.Group();

      // ✅ Trik: sementara daftarkan ke global agar drawX() tidak error
      const oldMainGroup = window.mainGroup;
      window.mainGroup = tempGroup;

      // Gambar molekul ke grup sementara
      drawMoleculeGeometry(molKey);

      // Pulihkan variabel global supaya tidak ganggu scene molekul nanti
      window.mainGroup = oldMainGroup;

      // Skala dan tempatkan di atas meja
      const molInstance = tempGroup;
      molInstance.scale.setScalar(0.9);

      const placeMolecule = () => {
        const bbox = new THREE.Box3().setFromObject(desk);
        const deskTopY = bbox.max.y;
        molInstance.position.set(0, deskTopY - desk.position.y + 0.5, 0);
        desk.add(molInstance);
      };

      if (desk.children.length > 0) placeMolecule();
      else setTimeout(placeMolecule, 600);

      moleculesOnDesks.push({ mesh: molInstance, key: molKey, desk });
    }
  }
}


export function enterClassroom(scene, mainGroup, camera, controls) {
  // bersihkan group
  mainGroup.clear();
  createClassroomEnvironment(mainGroup);
  setupClassroom(mainGroup, 3, 4);

  // setup player: player.js harus mengekspor setupPlayer(mainGroup, camera, controls)
  // dan mengembalikan objek player (THREE.Object3D) yang punya .position
  const player = setupPlayer(mainGroup, camera, controls);
  return player;
}
