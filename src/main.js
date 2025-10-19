// src/main.js
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { enterClassroom, checkPlayerProximity } from "./core/classroom.js";
import { updatePlayer } from "./core/player.js";
import { init as initMolecule, addBackButton } from "./core/molecule.js";
import { stopMoleculeRender } from "./core/molecule.js";

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

// === QUIZ MODE ===// === QUIZ MODE ===
let allQuizData = [
  {
    molecule: "H2O",
    correct: "Air (H2O)",
    options: ["Air (H2O)", "Karbon Dioksida (CO2)", "Amonia (NH3)", "Metana (CH4)"],
  },
  {
    molecule: "CO2",
    correct: "Karbon Dioksida (CO2)",
    options: ["Oksigen (O2)", "Karbon Dioksida (CO2)", "Metana (CH4)", "Hidrogen (H2)"],
  },
  {
    molecule: "NH3",
    correct: "Amonia (NH3)",
    options: ["Air (H2O)", "Amonia (NH3)", "Hidrogen Sulfida (H2S)", "Metana (CH4)"],
  },
  {
    molecule: "CH4",
    correct: "Metana (CH4)",
    options: ["Karbon Dioksida (CO2)", "Metana (CH4)", "Etana (C2H6)", "Oksigen (O2)"],
  },
  {
    molecule: "O2",
    correct: "Oksigen (O2)",
    options: ["Oksigen (O2)", "Hidrogen (H2)", "Karbon Monoksida (CO)", "Nitrogen (N2)"],
  },
  {
    molecule: "C2H6",
    correct: "Etana (C2H6)",
    options: ["Etana (C2H6)", "Metana (CH4)", "Karbon Dioksida (CO2)", "Amonia (NH3)"],
  },
  {
    molecule: "CO",
    correct: "Karbon Monoksida (CO)",
    options: ["Karbon Dioksida (CO2)", "Karbon Monoksida (CO)", "Oksigen (O2)", "Hidrogen (H2)"],
  },
  {
    molecule: "H2S",
    correct: "Hidrogen Sulfida (H2S)",
    options: ["Hidrogen Sulfida (H2S)", "Amonia (NH3)", "Air (H2O)", "Metana (CH4)"],
  },
];

let quizData = [];
let currentQuizIndex = 0;
let score = 0;

// 🎲 Fungsi untuk mengacak array
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 💾 Ambil history dari localStorage
function getQuizHistory() {
  return JSON.parse(localStorage.getItem("quizHistory")) || [];
}

// 💾 Simpan nilai baru ke history
function saveQuizHistory(score) {
  const history = getQuizHistory();
  const newRecord = {
    date: new Date().toLocaleString(),
    score: score,
  };
  history.push(newRecord);
  localStorage.setItem("quizHistory", JSON.stringify(history));
}

// 🧾 Tampilkan history di overlay
function showQuizHistory() {
  const overlay = document.getElementById("quiz-overlay");
  const history = getQuizHistory();

  overlay.innerHTML = `
    <div id="quiz-panel">
      <h2>📜 Riwayat Kuis</h2>
      ${
        history.length > 0
          ? `
            <table class="quiz-history-table">
              <thead>
                <tr><th>No</th><th>Tanggal</th><th>Nilai</th></tr>
              </thead>
              <tbody>
                ${history
                  .map(
                    (h, i) =>
                      `<tr><td>${i + 1}</td><td>${h.date}</td><td>${h.score}</td></tr>`
                  )
                  .join("")}
              </tbody>
            </table>`
          : "<p>Belum ada riwayat kuis.</p>"
      }
      <button id="history-back" class="quiz-btn">⬅ Kembali</button>
    </div>
  `;

  document.getElementById("history-back").onclick = () => {
    endQuiz(); // balik ke halaman akhir kuis
  };
}

document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "k" && currentMode === "classroom") {
    startQuizMode();
  }
});

function startQuizMode() {
  console.log("🎯 Starting quiz mode...");
  currentMode = "quiz";
  classroomCanvas.classList.add("hidden");
  moleculeCanvas.classList.remove("hidden");

  const overlay = document.getElementById("quiz-overlay");
  overlay.classList.remove("hidden");

  // 🔁 Pilih 5 soal acak
  quizData = shuffleArray([...allQuizData]).slice(0, 5);
  currentQuizIndex = 0;
  score = 0;

  overlay.innerHTML = `
    <div id="quiz-panel">
      <h2 id="quiz-question"></h2>
      <div id="quiz-options"></div>
      <p id="quiz-score">Score: 0</p>
    </div>
  `;

  loadQuizQuestion();
}

function loadQuizQuestion() {
  if (currentQuizIndex >= quizData.length) {
    endQuiz();
    return;
  }

  const { molecule, correct, options } = quizData[currentQuizIndex];
  stopMoleculeRender();
  initMolecule(() => {}, molecule);

  const questionEl = document.getElementById("quiz-question");
  const optionsEl = document.getElementById("quiz-options");
  const scoreEl = document.getElementById("quiz-score");

  questionEl.textContent = `Pertanyaan ${currentQuizIndex + 1}: Molekul apakah ini?`;
  scoreEl.textContent = `Score: ${score}`;
  optionsEl.innerHTML = "";

  shuffleArray(options).forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "quiz-option";
    btn.textContent = opt;
    btn.onclick = () => {
      if (opt === correct) score += 20;
      currentQuizIndex++;
      loadQuizQuestion();
    };
    optionsEl.appendChild(btn);
  });
}

function endQuiz() {
  // 💾 Simpan hasil ke history
  saveQuizHistory(score);

  const overlay = document.getElementById("quiz-overlay");
  overlay.innerHTML = `
    <div id="quiz-panel">
      <h2>Quiz Selesai!</h2>
      <p>Skor akhir kamu: ${score}</p>
      <div class="quiz-btn-group">
        <button id="quiz-retry" class="quiz-btn">🔁 Ulang Kuis</button>
        <button id="quiz-exit" class="quiz-btn">🏫 Kembali ke Classroom</button>
        <button id="quiz-history" class="quiz-btn">📜 Lihat History</button>
      </div>
    </div>
  `;

  document.getElementById("quiz-retry").onclick = () => {
    quizData = shuffleArray([...allQuizData]).slice(0, 5);
    currentQuizIndex = 0;
    score = 0;

    overlay.innerHTML = `
      <div id="quiz-panel">
        <h2 id="quiz-question"></h2>
        <div id="quiz-options"></div>
        <p id="quiz-score">Score: 0</p>
      </div>
    `;
    loadQuizQuestion();
  };

  document.getElementById("quiz-exit").onclick = () => {
    overlay.classList.add("hidden");
    moleculeCanvas.classList.add("hidden");
    switchToClassroomMode();
  };

  document.getElementById("quiz-history").onclick = showQuizHistory;
}


// === HINT VISIBILITY ===
const quizHint = document.getElementById("quiz-hint");

// Pantau perubahan mode setiap frame
function updateHintVisibility() {
  if (!quizHint) return;
  if (currentMode === "classroom") {
    quizHint.style.display = "block";
  } else {
    quizHint.style.display = "none";
  }
  requestAnimationFrame(updateHintVisibility);
}
updateHintVisibility();
