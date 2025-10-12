// Import library Three.js dan modul-modul tambahannya.
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { Sky } from 'three/addons/objects/Sky.js';

// DATA: Objek utama yang menyimpan semua informasi tentang atom dan molekul.
const DATA = {
    atoms: {
        H: { name: "Hidrogen", symbol: "H", color: 0xffffff, atomicNumber: 1, atomicMass: "1.008 u", electrons: [1], radius: 0.7, details: [
            { title: "Etimologi & Sejarah", content: "Nama 'hidrogen' diberikan oleh Antoine Lavoisier pada tahun 1783, berasal dari kata Yunani 'hydro' (air) dan 'genes' (membentuk)..." },
            { title: "Struktur & Komposisi", content: "Sebagai unsur paling sederhana, atom hidrogen netral terdiri dari satu proton tunggal di intinya dan satu elektron yang mengorbitnya..." },
            { title: "Fakta Menarik / Trivia", content: "Hidrogen memiliki tiga isotop umum: Protium (¹H), Deuterium (²H), dan Tritium (³H)..." }
        ]},
        C: { name: "Karbon", symbol: "C", color: 0x606060, atomicNumber: 6, atomicMass: "12.011 u", electrons: [2, 4], radius: 1.1, details: [
            { title: "Etimologi & Sejarah", content: "Nama 'karbon' berasal dari kata Latin 'carbo', yang berarti batu bara atau arang..." },
            { title: "Peran dalam Biologi", content: "Karbon adalah 'tulang punggung' kimia dari semua kehidupan di Bumi..." },
            { title: "Fakta Menarik / Trivia", content: "Isotop radioaktif Karbon-14 (¹⁴C) digunakan dalam penanggalan radiokarbon..." }
        ]},
        O: { name: "Oksigen", symbol: "O", color: 0xff0000, atomicNumber: 8, atomicMass: "15.999 u", electrons: [2, 6], radius: 1.0, details: [
            { title: "Etimologi & Sejarah", content: "Nama 'oksigen' diciptakan oleh Antoine Lavoisier dari kata Yunani 'oxys' (asam) dan 'genes' (pembentuk)..." },
            { title: "Peran dalam Biologi", content: "Oksigen sangat penting untuk respirasi seluler pada organisme aerobik..." },
            { title: "Fakta Menarik / Trivia", content: "Meskipun vital untuk kehidupan, oksigen murni pada tekanan tinggi bisa menjadi racun..." }
        ]},
        N: { name: 'Nitrogen',  symbol: 'N',  color: 0x88aaff, atomicNumber: 7, atomicMass: "14.007 u", electrons: [2, 5], radius: 1.05, details: [ { title: "Info", content: "Detail untuk Nitrogen belum ditambahkan."} ]},
        P: { name: 'Fosfor',    symbol: 'P',  color: 0xffa500, atomicNumber: 15, atomicMass: "30.974 u", electrons: [2, 8, 5], radius: 1.3, details: [ { title: "Info", content: "Detail untuk Fosfor belum ditambahkan."} ]},
        S: { name: 'Belerang',  symbol: 'S',  color: 0xffff88, atomicNumber: 16, atomicMass: "32.06 u", electrons: [2, 8, 6], radius: 1.2, details: [ { title: "Info", content: "Detail untuk Belerang belum ditambahkan."} ]},
        Cl: { name: 'Klorin',    symbol: 'Cl', color: 0x88ff88, atomicNumber: 17, atomicMass: "35.45 u", electrons: [2, 8, 7], radius: 1.15, details: [ { title: "Info", content: "Detail untuk Klorin belum ditambahkan."} ]},
    },
    molecules: {
        H2O: { name: "Air (H₂O)", description: "Molekul polar dengan bentuk tekuk/bent (~104.5°). Memiliki muatan parsial negatif pada Oksigen dan positif pada Hidrogen.", details: [
            { title: "Info Umum", content: "Air (H₂O) adalah substansi kimia dengan rumus kimia H₂O. Satu molekul air tersusun atas dua atom hidrogen yang terikat secara kovalen pada satu atom oksigen." },
            { title: "Sifat Fisik", content: "Air tidak berasa, tidak berbau pada kondisi standar, dan transparan. Es lebih ringan daripada air cair, sebuah anomali yang penting bagi kehidupan." }
        ]},
        CH4: { name: "Metana (CH₄)", description: "Molekul nonpolar dengan bentuk tetrahedral (~109.5°). Komponen utama gas alam.", details: [
            { title: "Info Umum", content: "Metana adalah hidrokarbon paling sederhana, terdiri dari satu atom karbon dan empat atom hidrogen." },
            { title: "Peran Lingkungan", content: "Metana adalah gas rumah kaca yang kuat, dengan potensi pemanasan global yang jauh lebih tinggi daripada karbondioksida." }
        ]},
        CO2: { name: "Karbondioksida (CO₂)", description: "Molekul nonpolar dengan bentuk linear. Terdiri dari ikatan kovalen rangkap dua.", details: [
            { title: "Info Umum", content: "Karbondioksida adalah gas yang secara alami ada di atmosfer Bumi sebagai bagian dari siklus karbon Bumi." },
            { title: "Peran Biologis", content: "Tumbuhan menggunakan karbondioksida selama fotosintesis untuk membuat makanan." }
        ]},
    },
};

// Variabel global untuk scene Three.js, elemen DOM, dan state management.
let scene, camera, renderer, controls, composer;
let mainGroup, defaultFont;
const canvasContainer = document.getElementById("canvas-container");
const detailInfoPanel = document.getElementById('detail-info-panel');
const moleculeInfoPanel = document.getElementById('molecule-info-panel');
const sidebarContent = document.getElementById('sidebar-content');
const body = document.body;
let textLabelsToBillboard = [];
let sky, sun;
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
const clock = new THREE.Clock();

// Variabel untuk animasi elektron.
let electronShells = [], electronsToAnimate = [];
let isAnimationPaused = false;
let electronGlowTexture;
let lastHoveredAtom = null;

// Variabel untuk melacak state tampilan (molekul, atom, atau kelopak elektron).
let activeState = { type: 'molecule', key: 'H2O', menu: null };
const backButton = document.getElementById('back-btn');

// Inisialisasi scene 3D, kamera, renderer, dan kontrol.
function init() {
    body.classList.add('sidebar-collapsed');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
    camera.position.z = 10;
    
    // Setup renderer WebGL.
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;  
    canvasContainer.appendChild(renderer.domElement);
    
    // Setup skybox.
    sky = new Sky();
    sky.scale.setScalar(450000);
    scene.add(sky);
    sun = new THREE.Vector3();
    const effectController = { turbidity: 10, rayleigh: 3, mieCoefficient: 0.005, mieDirectionalG: 0.7, elevation: -1, azimuth: 180, exposure: renderer.toneMappingExposure };
    function guiChanged() { // Fungsi untuk mengupdate properti skybox.
        const uniforms = sky.material.uniforms;
        uniforms[ 'turbidity' ].value = effectController.turbidity;
        uniforms[ 'rayleigh' ].value = effectController.rayleigh;
        uniforms[ 'mieCoefficient' ].value = effectController.mieCoefficient;
        uniforms[ 'mieDirectionalG' ].value = effectController.mieDirectionalG;
        const phi = THREE.MathUtils.degToRad( 90 - effectController.elevation );
        const theta = THREE.MathUtils.degToRad( effectController.azimuth );
        sun.setFromSphericalCoords( 1, phi, theta );
        uniforms[ 'sunPosition' ].value.copy( sun );
        renderer.toneMappingExposure = effectController.exposure;
    }
    guiChanged();
    
    // Grup utama untuk menampung semua objek molekul.
    mainGroup = new THREE.Group();
    scene.add(mainGroup);
    
    // Setup pencahayaan.
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.7);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 5, 100);
    pointLight.position.set(0, 5, 10);
    pointLight.castShadow = true;
    scene.add(pointLight);
    
    // Setup kontrol orbit (untuk memutar, zoom, pan).
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    
    // Setup post-processing untuk efek bloom (cahaya).
    const renderPass = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass( new THREE.Vector2(canvasContainer.clientWidth, canvasContainer.clientHeight), 0.15, 0.8, 0.99 );
    composer = new EffectComposer(renderer);
    composer.addPass(renderPass);
    composer.addPass(bloomPass);

    // Menambahkan event listener untuk interaksi mouse.
    renderer.domElement.addEventListener("click", onClick, false);
    renderer.domElement.addEventListener('dblclick', onDoubleClick, false);
    renderer.domElement.addEventListener('mousemove', onMouseMove, false);
    
    // Membuat tekstur untuk glow elektron.
    electronGlowTexture = createGlowTexture('rgba(255, 255, 255, 1.0)', 'rgba(255, 255, 255, 0.0)');
    
    // Memuat font, lalu memulai aplikasi.
    const fontLoader = new FontLoader();
    fontLoader.load("https://cdn.jsdelivr.net/npm/three@0.160.0/examples/fonts/helvetiker_bold.typeface.json", (font) => {
        defaultFont = font;
        buildSidebar();
        enterClassroom();
        // displayMolecule("H2O");
        setupUIListeners();
        animate();
    });
    window.addEventListener("resize", onWindowResize);
}

// Loop utama animasi yang dijalankan setiap frame.
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    
    const delta = clock.getDelta();
    updatePlayer(delta);
    updateMoleculeProximity();
    
    // Menganimasikan pergerakan elektron di orbitnya.
    if (!isAnimationPaused && electronsToAnimate.length > 0) {
        electronsToAnimate.forEach(e => {
            e.progress = (e.progress + e.speed * delta) % 1;
            const newPosition = e.curve.getPoint(e.progress);
            const posVec = new THREE.Vector3(newPosition.x, newPosition.y, 0);
            posVec.applyEuler(e.orbitGroup.rotation);
            e.object.position.copy(posVec);
        });
        electronShells.forEach((shell) => {
            shell.rotation.y += 0.001;
            shell.rotation.x += 0.0005;
        });
    }
    
    // Menerapkan animasi 'sway' (goyangan) pada atom dalam molekul.
    if (activeState.type === 'molecule') {
       const elapsedTime = clock.getElapsedTime();
       mainGroup.children.forEach(child => {
         if (child.userData.type === 'atom' && child.userData.initialPosition) {
           const initialPos = child.userData.initialPosition;
           const swayX = Math.sin(elapsedTime * 1.1 + initialPos.y) * 0.08;
           const swayY = Math.cos(elapsedTime * 1.3 + initialPos.x) * 0.07;
           child.position.set(initialPos.x + swayX, initialPos.y + swayY, initialPos.z);
         }
       });
    }
    
    // Membuat label teks selalu menghadap kamera (billboarding).
    textLabelsToBillboard.forEach((label) => {
      if (label) label.quaternion.copy(camera.quaternion);
    });

    // Merender scene dengan efek post-processing.
    composer.render();
}

// Membersihkan semua objek dari scene utama untuk render baru.
function clearScene() {
    textLabelsToBillboard = [];
    electronsToAnimate = [];
    electronShells = [];
    while (mainGroup.children.length > 0) {
        const object = mainGroup.children[0];
        // Pastikan untuk membuang geometri dan material untuk mencegah memory leak.
        object.traverse(node => {
            if (node.isMesh) {
                if (node.geometry) node.geometry.dispose();
                if (node.material) {
                    if (Array.isArray(node.material)) node.material.forEach(m => m.dispose());
                    else node.material.dispose();
                }
            }
        });
        mainGroup.remove(object);
    }
}

// Menampilkan visualisasi molekul berdasarkan key.
function displayMolecule(moleculeKey) {
    clearScene();
    const moleculeData = DATA.molecules[moleculeKey];
    if (!moleculeData) return;
    
    activeState = { type: 'molecule', key: moleculeKey, menu: null };
    backButton.classList.add('hidden'); // Sembunyikan tombol kembali.
    
    drawMoleculeGeometry(moleculeKey); // Gambar geometri molekulnya.
    
    controls.autoRotate = true; // Aktifkan rotasi otomatis.
    detailInfoPanel.classList.add('hidden'); // Sembunyikan panel detail.
    updateMoleculeInfoPanel(moleculeData.name, moleculeData.description); // Tampilkan info molekul.
    buildSidebar(); // Bangun ulang sidebar.

    camera.position.set(0, 0, 10); // Reset posisi kamera.
    controls.target.set(0, 0, 0);
}

// Menampilkan visualisasi detail sebuah atom.
function displayAtomDetail(atomKey) {
    clearScene();
    const atomData = DATA.atoms[atomKey];
    if (!atomData) return;
    
    const parentMoleculeKey = activeState.type === 'molecule' ? activeState.key : (activeState.parentMolecule || 'H2O');
    activeState = { type: 'atom', key: atomKey, menu: atomData.details[0]?.title, parentMolecule: parentMoleculeKey };
    
    // Tampilkan tombol kembali dengan konteks yang benar.
    backButton.innerHTML = `&larr; Kembali ke ${DATA.molecules[parentMoleculeKey].name}`;
    backButton.classList.remove('hidden');
    
    controls.autoRotate = false; // Matikan rotasi otomatis.
    moleculeInfoPanel.classList.add('hidden'); // Sembunyikan panel info molekul.
    
    const atom = createAtomMesh(1.2, atomData.color, atomData.symbol); // Buat mesh atom.
    mainGroup.add(atom);

    const title = `${atomData.name} (${atomData.symbol}) - No. Atom: ${atomData.atomicNumber}`;
    updateDetailInfoPanel(title, atomData.details, atomData.details[0]?.title); // Tampilkan panel info detail.
    buildSidebar();
    camera.position.set(0, 0, 6); // Atur posisi kamera lebih dekat.
    controls.target.set(0, 0, 0);
}

// Menampilkan model kelopak elektron untuk sebuah atom.
function displayElectronShell(atomKey) {
    clearScene();
    const data = DATA.atoms[atomKey];
    if (!data || !data.electrons) return;
    
    const parentAtomState = activeState.type === 'atom' ? activeState : activeState.parentAtomState;
    activeState = { type: 'electron_shell', key: atomKey, parentMolecule: parentAtomState.parentMolecule };

    backButton.innerHTML = `&larr; Kembali ke Detail Atom`;
    backButton.classList.remove('hidden');

    detailInfoPanel.classList.add('hidden');
    moleculeInfoPanel.classList.add('hidden');

    // Buat inti atom (nucleus) dan efek cahayanya.
    const nucleusMaterial = new THREE.MeshBasicMaterial({ color: data.color });
    const nucleusGeometry = new THREE.SphereGeometry(data.radius, 32, 32);
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    mainGroup.add(nucleus);

    const nucleusGlow = new THREE.Sprite(new THREE.SpriteMaterial({
        map: createGlowTexture(`rgba(255, 255, 255, 0.5)`, `rgba(255, 255, 255, 0.0)`),
        color: data.color, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false
    }));
    nucleusGlow.scale.set(data.radius * 4, data.radius * 4, 1.0);
    mainGroup.add(nucleusGlow);

    // Iterasi setiap kelopak elektron dan buat orbit serta elektronnya.
    data.electrons.forEach((electronCount, shellIndex) => {
        const shellRadius = data.radius * 2.5 + (shellIndex * 3.0);
        const shellGroup = new THREE.Group();
        mainGroup.add(shellGroup);
        electronShells.push(shellGroup);

        const orbitCount = electronCount > 2 ? 5 : 1; // Tentukan jumlah orbit.
        const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x88ddff, transparent: true, opacity: 0.35 });
        const electronMaterial = new THREE.SpriteMaterial({
            map: electronGlowTexture, color: 0xffffff, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false
        });

        const orbitData = [];
        for(let i = 0; i < orbitCount; i++) {
            const curve = new THREE.EllipseCurve(0, 0, shellRadius, shellRadius, 0, 2 * Math.PI, false, 0);
            const points = curve.getPoints(64);
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const orbitLine = new THREE.Line(geometry, orbitMaterial);
            orbitLine.rotation.y = (i / orbitCount) * Math.PI;
            orbitLine.rotation.x = Math.PI / 3;
            shellGroup.add(orbitLine);
            orbitData.push({ line: orbitLine, curve: curve });
        }

        // Distribusikan elektron secara merata di antara orbit yang tersedia.
        for (let i = 0; i < electronCount; i++) {
            const targetOrbitIndex = i % orbitCount;
            const { line: targetOrbit, curve: targetCurve } = orbitData[targetOrbitIndex];
            const electronIndexInOrbit = Math.floor(i / orbitCount);
            const baseElectronCount = Math.floor(electronCount / orbitCount);
            const remainder = electronCount % orbitCount;
            const totalElectronsInOrbit = baseElectronCount + (targetOrbitIndex < remainder ? 1 : 0);
            const progress = totalElectronsInOrbit > 0 ? (electronIndexInOrbit / totalElectronsInOrbit) : 0;
            const electronSprite = new THREE.Sprite(electronMaterial);
            electronSprite.scale.set(1.5, 1.5, 1.0);
            shellGroup.add(electronSprite); 
            electronsToAnimate.push({
                object: electronSprite, curve: targetCurve, orbitGroup: targetOrbit,
                progress: progress, speed: 0.12 + Math.random() * 0.06
            });
        }
    });

    buildSidebar();
    camera.position.set(0, 0, data.electrons.length * 10 + 5); // Jauhkan kamera agar semua kelopak terlihat.
    controls.target.set(0, 0, 0);
}

// Menangani klik pada atom untuk menampilkan detailnya.
function onClick(event) {
    if (activeState.type !== 'molecule') return;
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    const clickedAtom = getHoveredAtom();
    if (clickedAtom) {
        displayAtomDetail(clickedAtom.userData.symbol);
    }
}

// Menangani klik ganda pada atom untuk menampilkan kelopak elektron.
function onDoubleClick(event) {
    if (activeState.type !== 'atom') return;
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    const clickedAtom = getHoveredAtom();
    if (clickedAtom && clickedAtom.userData.symbol === activeState.key) {
        displayElectronShell(clickedAtom.userData.symbol);
    }
}

// Mengatur semua event listener untuk elemen UI (tombol, dll).
function setupUIListeners() {
    // Listener untuk tombol kembali.
    backButton.addEventListener('click', () => {
        if(activeState.type === 'electron_shell') {
            displayAtomDetail(activeState.key);
        } else if (activeState.type === 'atom') {
            displayMolecule(activeState.parentMolecule);
        }
    });

    // Listener untuk tombol tutup panel.
    document.getElementById('close-detail-info-btn').addEventListener('click', () => {
        detailInfoPanel.classList.add('hidden');
    });
    document.getElementById('close-molecule-info-btn').addEventListener('click', () => {
        moleculeInfoPanel.classList.add('hidden');
    });

    // Listener untuk tombol toggle sidebar.
    document.getElementById('sidebar-toggle').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('collapsed');
        body.classList.toggle('sidebar-collapsed');
        setTimeout(onWindowResize, 350); // Resize canvas setelah animasi sidebar selesai.
    });
}

// Membangun konten sidebar berdasarkan state aplikasi saat ini.
function buildSidebar() {
    sidebarContent.innerHTML = '';
    if (activeState.type === 'molecule') {
        buildMoleculeGallery();
    } else if (activeState.type === 'atom' || activeState.type === 'electron_shell') {
        buildAtomDetailMenu();
    }
}

// Membuat menu navigasi detail atom di sidebar.
function buildAtomDetailMenu() {
    const atomKey = activeState.key;
    const atomData = DATA.atoms[atomKey];
    if (!atomData) return;
    
    // Header dengan nama atom.
    const header = document.createElement('h1');
    header.className = 'sidebar-header';
    header.textContent = atomData.name;
    sidebarContent.appendChild(header);

    // Jika dalam mode detail atom, tampilkan tombol navigasi info.
    if (activeState.type === 'atom' && atomData.details) {
        const module = document.createElement('div');
        module.className = 'sidebar-module';
        const h3 = document.createElement('h3');
        h3.textContent = 'Detail Informasi';
        const btnGroup = document.createElement('div');
        btnGroup.className = 'btn-group';

        atomData.details.forEach(detail => {
            const navBtn = document.createElement('button');
            navBtn.className = 'btn';
            if (detail.title === activeState.menu) navBtn.classList.add('active');
            navBtn.textContent = detail.title;
            navBtn.addEventListener('click', () => {
                activeState.menu = detail.title;
                const title = `${atomData.name} (${atomData.symbol}) - No. Atom: ${atomData.atomicNumber}`;
                updateDetailInfoPanel(title, atomData.details, detail.title);
                buildSidebar(); // Bangun ulang untuk update state aktif.
            });
            btnGroup.appendChild(navBtn);
        });
        module.appendChild(h3);
        module.appendChild(btnGroup);
        sidebarContent.appendChild(module);
    }

    // Jika dalam mode kelopak elektron, tampilkan tombol kontrol animasi.
    if (activeState.type === 'electron_shell') {
        const module = document.createElement('div');
        module.className = 'sidebar-module';
        const h3 = document.createElement('h3');
        h3.textContent = 'Kontrol Animasi';
        const btnGroup = document.createElement('div');
        btnGroup.className = 'btn-group';
        
        const pauseBtn = document.createElement('button');
        pauseBtn.className = 'btn';
        pauseBtn.textContent = 'Pause Animasi';
        pauseBtn.onclick = () => { isAnimationPaused = true; };
        
        const startBtn = document.createElement('button');
        startBtn.className = 'btn';
        startBtn.textContent = 'Mulai Animasi';
        startBtn.onclick = () => { isAnimationPaused = false; clock.getDelta(); };
        
        btnGroup.appendChild(pauseBtn);
        btnGroup.appendChild(startBtn);
        module.appendChild(h3);
        module.appendChild(btnGroup);
        sidebarContent.appendChild(module);
    }
}

// Membuat galeri molekul di sidebar.
function buildMoleculeGallery() {
    const header = document.createElement('h1');
    header.className = 'sidebar-header';
    header.textContent = 'MolEdu';
    sidebarContent.appendChild(header);
    
    const module = document.createElement('div');
    module.className = 'sidebar-module';
    const h3 = document.createElement('h3');
    h3.textContent = 'Galeri Molekul';
    const btnGroup = document.createElement('div');
    btnGroup.className = 'btn-group';

    // Iterasi semua molekul di DATA dan buat tombol untuk masing-masing.
    Object.keys(DATA.molecules).forEach(key => {
        const molData = DATA.molecules[key];
        const entry = document.createElement('div');
        entry.className = 'molecule-entry';

        const btn = document.createElement('button');
        btn.className = 'btn';
        if (key === activeState.key) btn.classList.add('active');
        btn.innerHTML = `<span>${molData.name}</span>`;
        btn.addEventListener('click', () => {
            if (activeState.key === key && activeState.type === 'molecule') return;
            displayMolecule(key);
        });

        // Jika molekul ini aktif, tambahkan ikon untuk membuka menu detail.
        if (key === activeState.key) {
            const detailIcon = document.createElement('span');
            detailIcon.className = 'detail-icon';
            detailIcon.innerHTML = '&#8942;'; // Ikon titik tiga vertikal.
            detailIcon.addEventListener('click', (e) => {
                e.stopPropagation(); // Mencegah event klik tombol utama terpicu.
                const menu = entry.querySelector('.detail-menu');
                menu.classList.toggle('visible');
                e.target.classList.toggle('rotated');
            });
            btn.appendChild(detailIcon);
        }
        
        // Buat menu detail (dropdown) untuk molekul yang aktif.
        const detailMenu = document.createElement('div');
        detailMenu.className = 'detail-menu';
        if (key === activeState.key) {
           molData.details.forEach(detail => {
               const navBtn = document.createElement('button');
               navBtn.className = 'btn-detail-nav';
               if (detail.title === activeState.menu) navBtn.classList.add('active');
               navBtn.textContent = detail.title;
               navBtn.addEventListener('click', (e) => {
                   e.stopPropagation();
                   if (activeState.menu === detail.title) return;
                   activeState.menu = detail.title;
                   
                   document.querySelectorAll('.btn-detail-nav').forEach(b => b.classList.remove('active'));
                   e.target.classList.add('active');

                   // Update tampilan untuk menunjukkan detail yang dipilih.
                   clearScene();
                   drawMoleculeGeometry(key);
                   moleculeInfoPanel.classList.add('hidden');
                   updateDetailInfoPanel(molData.name, molData.details, detail.title);
               });
               detailMenu.appendChild(navBtn);
           });
           // Jika ada menu yang aktif, tampilkan dropdownnya.
           if (activeState.menu) {
               detailMenu.classList.add('visible');
           }
        }

        entry.appendChild(btn);
        entry.appendChild(detailMenu);
        btnGroup.appendChild(entry);
    });
    
    module.appendChild(h3);
    module.appendChild(btnGroup);
    sidebarContent.appendChild(module);
}

// Membuat tekstur gradasi radial untuk efek glow.
function createGlowTexture(color1, color2) {
    const canvas = document.createElement('canvas');
    canvas.width = 128; canvas.height = 128;
    const context = canvas.getContext('2d');
    const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0.0, color1);
    gradient.addColorStop(1.0, color2);
    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(canvas);
}

// Menyesuaikan ukuran renderer dan kamera saat jendela diubah.
function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    composer.setSize(width, height);
}

// Memperbarui konten panel informasi detail.
function updateDetailInfoPanel(title, details, focusedSectionTitle = null) {
    const titleEl = document.getElementById("detail-info-title");
    const detailsContainer = document.getElementById("detail-info-details");
    
    titleEl.textContent = title;
    detailsContainer.innerHTML = ''; // Kosongkan konten sebelumnya.

    if (Array.isArray(details)) {
        // Tampilkan hanya bagian yang difokuskan, atau semua bagian jika tidak ada fokus.
        const sectionsToDisplay = focusedSectionTitle 
            ? details.filter(item => item.title === focusedSectionTitle)
            : details;

        sectionsToDisplay.forEach(item => {
            const section = document.createElement('div');
            section.className = 'info-section';
            const h3 = document.createElement('h3');
            h3.textContent = item.title;
            const p = document.createElement('p');
            p.innerHTML = item.content; // Gunakan innerHTML untuk merender tag seperti <sub>.
            section.appendChild(h3);
            section.appendChild(p);
            detailsContainer.appendChild(section);
        });
    }
    
    detailInfoPanel.classList.remove('hidden'); // Tampilkan panel.
}

// Memperbarui konten panel informasi molekul.
function updateMoleculeInfoPanel(title, description) {
    document.getElementById('molecule-info-title').textContent = title;
    document.getElementById('molecule-info-description').innerHTML = description;
    moleculeInfoPanel.classList.remove('hidden');
}

// Membuat mesh 3D untuk sebuah atom, lengkap dengan label.
function createAtomMesh(radius, color, symbol, charge = null, chargeColor = 0xffffff) {
    const atomGroup = new THREE.Group();
    // Gunakan MeshPhysicalMaterial untuk efek seperti kaca/transparan.
    const sphereGeometry = new THREE.SphereGeometry(radius, 64, 64);
    const sphereMaterial = new THREE.MeshPhysicalMaterial({ color, transmission: 0.9, roughness: 0.1, metalness: 0.1, reflectivity: 0.5, ior: 1.5, thickness: 0.8, transparent: true, opacity: 0.8, emissive: color, emissiveIntensity: 0.2 });
    const atomSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    atomSphere.castShadow = true;
    atomSphere.receiveShadow = true;
    atomGroup.add(atomSphere);
    atomGroup.userData = { type: "atom", symbol: symbol, originalEmissive: sphereMaterial.emissiveIntensity };

    // Tambahkan label teks (simbol atom) jika font sudah dimuat.
    if (defaultFont) {
        const textGroup = new THREE.Group();
        atomGroup.add(textGroup);
        textLabelsToBillboard.push(textGroup); // Tambahkan ke array agar selalu menghadap kamera.
        const textGeometry = new TextGeometry(symbol, { font: defaultFont, size: radius * (charge ? 0.6 : 0.8), height: 0.1, curveSegments: 12 });
        textGeometry.center();
        const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.6, depthTest: false });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        if (charge) textMesh.position.y = radius * 0.2;
        textGroup.add(textMesh);
        // Tambahkan label muatan (charge) jika ada.
        if (charge) {
            const chargeGeometry = new TextGeometry(charge, { font: defaultFont, size: radius * 0.5, height: 0.05, curveSegments: 12 });
            chargeGeometry.center();
            const chargeMaterial = new THREE.MeshStandardMaterial({ color: chargeColor, emissive: chargeColor, emissiveIntensity: 0.8, depthTest: false });
            const chargeMesh = new THREE.Mesh(chargeGeometry, chargeMaterial);
            chargeMesh.position.y = -radius * 0.35;
            textGroup.add(chargeMesh);
        }
    }
    return atomGroup;
}

// Membuat mesh 3D untuk ikatan antar atom.
function createBondMesh(pos1, pos2, radius = 0.1) {
    const direction = new THREE.Vector3().subVectors(pos2, pos1);
    const orientation = new THREE.Matrix4();
    orientation.lookAt(pos1, pos2, new THREE.Object3D().up);
    orientation.multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2));
    const geometry = new THREE.CylinderGeometry(radius, radius, direction.length(), 32, 1);
    const bond = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0xcccccc, transparent: true, opacity: 0.4, roughness: 0.8 }));
    bond.castShadow = true;
    bond.receiveShadow = true;
    bond.applyMatrix4(orientation);
    bond.position.copy(pos1).add(direction.multiplyScalar(0.5));
    return bond;
}

// Router untuk memanggil fungsi gambar molekul yang sesuai.
function drawMoleculeGeometry(moleculeKey) {
  let group = new THREE.Group();

  switch (moleculeKey) {
    case "H2O":
      group = drawWater();
      break;
    case "CH4":
      group = drawMethane();
      break;
    case "CO2":
      group = drawCarbonDioxide();
      break;
  }

  return group;
}

// Menggambar geometri spesifik untuk molekul Air (H2O).
function drawWater() {
    const group = new THREE.Group();
    const o = createAtomMesh(0.8, DATA.atoms.O.color, 'O', "-", 0xff8888);
    const h1 = createAtomMesh(0.5, DATA.atoms.H.color, 'H', "+", 0x8888ff);
    const h2 = createAtomMesh(0.5, DATA.atoms.H.color, 'H', "+", 0x8888ff);
    const angle = (104.5 * Math.PI) / 180; // Sudut ikatan.
    const bondLength = 2.0;
    h1.position.set(bondLength * Math.cos(angle / 2), bondLength * Math.sin(angle / 2), 0);
    h2.position.set(bondLength * Math.cos(angle / 2), -bondLength * Math.sin(angle / 2), 0);
    o.userData.initialPosition = o.position.clone();
    h1.userData.initialPosition = h1.position.clone();
    h2.userData.initialPosition = h2.position.clone();
    group.add(o, h1, h2);
    group.add(createBondMesh(o.position, h1.position, 0.08));
    group.add(createBondMesh(o.position, h2.position, 0.08));
     return group; 
}

// Menggambar geometri spesifik untuk molekul Metana (CH4).
function drawMethane() {
      const group = new THREE.Group();
    const c = createAtomMesh(0.9, DATA.atoms.C.color, 'C');
    c.userData.initialPosition = c.position.clone();
    group.add(c);
    // Posisi tetrahedral untuk atom hidrogen.
    const positions = [ new THREE.Vector3(1, 1, 1), new THREE.Vector3(1, -1, -1), new THREE.Vector3(-1, 1, -1), new THREE.Vector3(-1, -1, 1) ];
    positions.forEach((pos) => {
        const h = createAtomMesh(0.5, DATA.atoms.H.color, 'H');
        h.position.copy(pos.normalize().multiplyScalar(2.5));
        h.userData.initialPosition = h.position.clone();
        group.add(h);
        group.add(createBondMesh(c.position, h.position, 0.08));
        
    });
}

// Menggambar geometri spesifik untuk molekul Karbondioksida (CO2).
function drawCarbonDioxide() {
    const group = new THREE.Group();
    const c = createAtomMesh(0.9, DATA.atoms.C.color, 'C');
    const o1 = createAtomMesh(0.8, DATA.atoms.O.color, 'O');
    const o2 = createAtomMesh(0.8, DATA.atoms.O.color, 'O');
    const bondLength = 2.8;
    const doubleBondOffset = 0.18; // Offset untuk ikatan rangkap dua.
    o1.position.x = -bondLength;
    o2.position.x = bondLength;
    c.userData.initialPosition = c.position.clone();
    o1.userData.initialPosition = o1.position.clone();
    o2.userData.initialPosition = o2.position.clone();
    group.add(c, o1, o2);
    // Gambar dua ikatan untuk setiap atom Oksigen.
    group.add(createBondMesh(c.position.clone().setY(doubleBondOffset), o1.position.clone().setY(doubleBondOffset), 0.08));
    group.add(createBondMesh(c.position.clone().setY(-doubleBondOffset), o1.position.clone().setY(-doubleBondOffset), 0.08));
    group.add(createBondMesh(c.position.clone().setY(doubleBondOffset), o2.position.clone().setY(doubleBondOffset), 0.08));
    group.add(createBondMesh(c.position.clone().setY(-doubleBondOffset), o2.position.clone().setY(-doubleBondOffset), 0.08));
    return group;
}

// Mendeteksi atom mana yang sedang ditunjuk oleh kursor mouse.
function getHoveredAtom() {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(mainGroup.children, true);
    for (let i = 0; i < intersects.length; i++) {
        let obj = intersects[i].object;
        // Cari parent object yang merupakan grup atom.
        while (obj && !obj.userData?.type) {
            obj = obj.parent;
        }
        if (obj && obj.userData && obj.userData.type === 'atom') {
            return obj;
        }
    }
    return null;
}

// Menangani hover pada atom untuk memberikan efek highlight.
function onMouseMove(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    const hoveredAtom = getHoveredAtom();
    
    // Jangan ubah kursor atau highlight jika sedang grabbing/panning.
    if(canvasContainer.style.cursor !== 'grabbing'){
        // Kembalikan material atom yang sebelumnya di-hover ke state normal.
        if (lastHoveredAtom && lastHoveredAtom !== hoveredAtom) {
            const material = lastHoveredAtom.children[0].material;
            material.emissiveIntensity = lastHoveredAtom.userData.originalEmissive;
        }
        // Jika ada atom yang di-hover, beri efek highlight dan ubah kursor.
        if (hoveredAtom) {
            const material = hoveredAtom.children[0].material;
            material.emissiveIntensity = 0.5;  
            lastHoveredAtom = hoveredAtom;
            canvasContainer.style.cursor = 'pointer';
        } else {
            // Jika tidak ada, kembalikan atom terakhir dan kursor ke state normal.
            if(lastHoveredAtom) {
                const material = lastHoveredAtom.children[0].material;
                material.emissiveIntensity = lastHoveredAtom.userData.originalEmissive;
            }
            lastHoveredAtom = null;
            canvasContainer.style.cursor = 'grab';
        }
    }
}

// Memuat library TWEEN.js dan memulai inisialisasi setelah selesai.
const tweenScript = document.createElement('script');
tweenScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/tween.js/20.0.3/tween.umd.js';
document.head.appendChild(tweenScript);
tweenScript.onload = () => {
    // Loop animasi khusus untuk TWEEN.
    function animateTween(time) {
        requestAnimationFrame(animateTween);
        if(typeof TWEEN !== 'undefined') {
            TWEEN.update(time);
        }
    }
    requestAnimationFrame(animateTween);
    init(); // Panggil fungsi init utama setelah TWEEN siap.
};

// ---------- Classroom & Player: tambahan global ----------
const desks = [];
const deskBoxes = []; // Box3 for collision checks
const moleculesOnDesks = []; // { mesh: Group, key: 'H2O' }
let player = null;
const PLAYER_RADIUS = 0.45;
const INTERACTION_RADIUS = 2.0;
let currentNearbyMol = null;
let inPopupMode = false;
let interactionPromptEl = null;
const moveState = { forward:false, back:false, left:false, right:false };

// ---------- Create a basic desk ----------
// function createDesk(width = 2, depth = 1.2, height = 0.8) {
//     const geom = new THREE.BoxGeometry(width, height, depth);
//     const mat = new THREE.MeshStandardMaterial({ color: 0x8B5A2B, roughness: 0.8 });
//     const desk = new THREE.Mesh(geom, mat);
//     desk.castShadow = true;
//     desk.receiveShadow = true;
//     return desk;
// }

function createDesk() {
  const deskGroup = new THREE.Group();
//   const loader = new THREE.GLTFLoader();
  const loader = new GLTFLoader();
  loader.load(
    "models/school_desk.glb", // ganti dengan path model kamu
    (gltf) => {
      const deskModel = gltf.scene;
      deskModel.scale.set(1.2, 1.2, 1.2);
      deskModel.rotation.y = Math.PI;
      deskGroup.add(deskModel);
    },
    undefined,
    (err) => console.error("Failed to load desk:", err)
  );
  return deskGroup;
}

// ---------- Create a small instance of molecule (returns THREE.Group) ----------
function createMoleculeInstance(moleculeKey) {
    // Reuse your createAtomMesh & createBondMesh functions (they return mesh/group)
    const g = new THREE.Group();
    switch(moleculeKey) {
        case "H2O": {
            const o = createAtomMesh(0.35, DATA.atoms.O.color, 'O');
            const h1 = createAtomMesh(0.25, DATA.atoms.H.color, 'H');
            const h2 = createAtomMesh(0.25, DATA.atoms.H.color, 'H');
            const angle = (104.5 * Math.PI) / 180;
            const bondLength = 0.9;
            h1.position.set(bondLength * Math.cos(angle/2), bondLength * Math.sin(angle/2), 0);
            h2.position.set(bondLength * Math.cos(angle/2), -bondLength * Math.sin(angle/2), 0);
            g.add(o, h1, h2);
            g.add(createBondMesh(o.position.clone(), h1.position.clone(), 0.04));
            g.add(createBondMesh(o.position.clone(), h2.position.clone(), 0.04));
            break;
        }
        case "CH4": {
            const c = createAtomMesh(0.4, DATA.atoms.C.color, 'C');
            const positions = [
                new THREE.Vector3(0.9, 0.9, 0.9),
                new THREE.Vector3(0.9, -0.9, -0.9),
                new THREE.Vector3(-0.9, 0.9, -0.9),
                new THREE.Vector3(-0.9, -0.9, 0.9)
            ];
            g.add(c);
            positions.forEach(pos => {
                const h = createAtomMesh(0.22, DATA.atoms.H.color, 'H');
                h.position.copy(pos.normalize().multiplyScalar(1.4));
                g.add(h);
                g.add(createBondMesh(c.position.clone(), h.position.clone(), 0.03));
            });
            break;
        }
        case "CO2": {
            const c = createAtomMesh(0.38, DATA.atoms.C.color, 'C');
            const o1 = createAtomMesh(0.35, DATA.atoms.O.color, 'O');
            const o2 = createAtomMesh(0.35, DATA.atoms.O.color, 'O');
            const bondLength = 1.4;
            o1.position.x = -bondLength;
            o2.position.x = bondLength;
            g.add(c, o1, o2);
            const off = 0.06;
            g.add(createBondMesh(c.position.clone().setY(off), o1.position.clone().setY(off), 0.03));
            g.add(createBondMesh(c.position.clone().setY(-off), o1.position.clone().setY(-off), 0.03));
            g.add(createBondMesh(c.position.clone().setY(off), o2.position.clone().setY(off), 0.03));
            g.add(createBondMesh(c.position.clone().setY(-off), o2.position.clone().setY(-off), 0.03));
            break;
        }
        default: {
            // fallback: small sphere
            const s = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), new THREE.MeshStandardMaterial({ color: 0xaaaaaa }));
            g.add(s);
        }
    }
    // give a name for debug
    g.userData.moleculeKey = moleculeKey;
    return g;
}

// =========== CLASSROOM MODE : SETUP & PLAYER ===========
// ---------- Setup classroom: floor + desks + molecules ----------
function setupClassroom(rows = 3, cols = 4) {
    // floor
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshStandardMaterial({ color: 0xeeeeee }));
    floor.rotation.x = -Math.PI/2;
    floor.receiveShadow = true;
    mainGroup.add(floor);

    const spacingX = 3.2, spacingZ = 2.8;
    const deskW = 2.0, deskD = 1.2, deskH = 0.8;
    const moleculeKeys = Object.keys(DATA.molecules);

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const desk = createDesk(deskW, deskD, deskH);
            desk.position.set((c - (cols-1)/2) * spacingX, deskH/2, (r - (rows-1)/2) * spacingZ);
            mainGroup.add(desk);
            desks.push(desk);

            // store bounding box (update when added to scene)
            const box = new THREE.Box3().setFromObject(desk);
            deskBoxes.push(box);
            desk.userData.boundingBox = box;

            // place a molecule on the desk (1 per desk)
            const molKey = moleculeKeys[(r*cols + c) % moleculeKeys.length];
            const molInstance = createMoleculeInstance(molKey);
            // small scale so it fits on desk
            molInstance.scale.setScalar(0.9);
            molInstance.position.set(0, deskH/2 + 0.25, 0); // top center of desk
            desk.add(molInstance);
            moleculesOnDesks.push({ mesh: molInstance, key: molKey, desk });
        }
    }
}

// ==== Player & Movement in Classroom ====
// ---------- Create player object and visuals ----------
function setupPlayer() {
    player = new THREE.Object3D();
    player.position.set(0, PLAYER_RADIUS, 6);
     mainGroup.add(player);
  loadCharacter();
    // visible capsule-ish body for debug (replace with GLTF if desired)
    // const bodyGeo = new THREE.CapsuleGeometry(PLAYER_RADIUS, 0.5, 4, 8);
    // const bodyMat = new THREE.MeshStandardMaterial({ color: 0x3366ff, metalness: 0.2, roughness: 0.6, transparent: true, opacity: 0.9 });
    // const playerMesh = new THREE.Mesh(bodyGeo, bodyMat);
    // playerMesh.castShadow = true;
    // player.add(playerMesh);
    // mainGroup.add(player);

    // create on-screen prompt element
    interactionPromptEl = document.createElement('div');
    interactionPromptEl.id = 'interaction-hint';
    interactionPromptEl.style.position = 'fixed';
    interactionPromptEl.style.left = '50%';
    interactionPromptEl.style.transform = 'translateX(-50%)';
    interactionPromptEl.style.bottom = '28px';
    interactionPromptEl.style.padding = '10px 16px';
    interactionPromptEl.style.background = 'rgba(0,0,0,0.6)';
    interactionPromptEl.style.color = '#fff';
    interactionPromptEl.style.borderRadius = '8px';
    interactionPromptEl.style.fontFamily = 'sans-serif';
    interactionPromptEl.style.fontSize = '14px';
    interactionPromptEl.style.pointerEvents = 'none';
    interactionPromptEl.style.opacity = '0';
    interactionPromptEl.style.transition = 'opacity 0.2s';
    interactionPromptEl.textContent = '';
    document.body.appendChild(interactionPromptEl);

    // disable OrbitControls while in classroom (we'll control camera manually)
    controls.enabled = false;
}

// ---------- Movement input ----------
window.addEventListener('keydown', (e) => {
    const k = e.key.toLowerCase();
    if (k === 'w') moveState.forward = true;
    if (k === 's') moveState.back = true;
    if (k === 'a') moveState.left = true;
    if (k === 'd') moveState.right = true;

    // interact
      if (k === 'e' && currentNearbyMol && !inPopupMode) {
    enterMoleculePopupMode(currentNearbyMol.key); 
  }
//    if (k === 'e' && currentNearbyMol && !inPopupMode) {
//     const mol = DATA.molecules[currentNearbyMol.key];
//     if (mol) {
//         enterMoleculePopupMode(mol, currentNearbyMol.mesh);
//     }
// }
//     document.addEventListener('keydown', (e) => {
//     if (e.key.toLowerCase() === 'e' && currentNearbyMol) {
//         enterMoleculePopupMode(currentNearbyMol.key);
//     }
//     });
});
window.addEventListener('keyup', (e) => {
    const k = e.key.toLowerCase();
    if (k === 'w') moveState.forward = false;
    if (k === 's') moveState.back = false;
    if (k === 'a') moveState.left = false;
    if (k === 'd') moveState.right = false;
});

// ---------- Player update (call from animate) ----------
function updatePlayer(delta) {
    if (inPopupMode) return;

  if (!player) return;

  const moveSpeed = 4.0;
  const dir = new THREE.Vector3();

  if (moveState.forward) dir.z -= 1;
  if (moveState.back) dir.z += 1;
  if (moveState.left) dir.x -= 1;
  if (moveState.right) dir.x += 1;

  if (dir.lengthSq() > 0) {
    dir.normalize();

    // arah kamera (tanpa pitch)
    const forward = new THREE.Vector3(Math.sin(yaw), 0, Math.cos(yaw)).normalize();
    const right = new THREE.Vector3(forward.z, 0, -forward.x).normalize();

    const worldDir = new THREE.Vector3();
    worldDir.addScaledVector(forward, dir.z);
    worldDir.addScaledVector(right, dir.x);
    worldDir.normalize();

    const proposed = player.position.clone().add(worldDir.multiplyScalar(moveSpeed * delta));

    // sederhana: belum pakai collision
    player.position.copy(proposed);

    // rotasi player ke arah gerak
    const lookAt = player.position.clone().add(worldDir);
    // player.lookAt(lookAt);
    player.quaternion.slerp(
  new THREE.Quaternion().setFromRotationMatrix(
    new THREE.Matrix4().lookAt(player.position, lookAt, new THREE.Vector3(0, 1, 0))
  ),
  0.2
);
  }

  // update posisi & arah kamera berdasarkan yaw/pitch
  const camOffset = new THREE.Vector3(
    Math.sin(yaw) * cameraDistance,
    cameraHeight + Math.sin(pitch) * 2,
    Math.cos(yaw) * cameraDistance
  );

  const desiredCamPos = player.position.clone().add(camOffset);
  camera.position.lerp(desiredCamPos, 0.15);

  // kamera selalu melihat ke player
  camera.lookAt(player.position.clone().add(new THREE.Vector3(0, 1, 0)));
}


// ---------- Proximity check for molecules (call from animate) ----------
function updateMoleculeProximity() {
    if (inPopupMode) return;

    if (!player) return;
    let found = null;
    const playerPos = player.position;
    for (const entry of moleculesOnDesks) {
        const worldPos = new THREE.Vector3();
        entry.mesh.getWorldPosition(worldPos);
        const d = worldPos.distanceTo(playerPos);
        if (d < INTERACTION_RADIUS) {
            found = entry;
            break;
        }
    }

    if (found && currentNearbyMol !== found) {
        // entered proximity
        currentNearbyMol = found;
        interactionPromptEl.textContent = `Tekan E untuk melihat: ${DATA.molecules[found.key].name}`;
        interactionPromptEl.style.opacity = '1';
        // highlight: scale up slightly with tween or simple scale
        found.mesh.scale.setScalar(1.08);
    } else if (!found && currentNearbyMol) {
        // left proximity
        currentNearbyMol.mesh.scale.setScalar(1.0);
        currentNearbyMol = null;
        interactionPromptEl.style.opacity = '0';
        moleculeInfoPanel.classList.add('hidden'); // optional: auto-hide
    }
}

    // ====================== CLASS ROOM MODE ======================
    // ---------- Enter classroom mode ----------
    function enterClassroom() {
        clearScene(); // reuse your clearScene to remove previous objects
        activeState = { type: 'classroom', key: null, menu: null };
        createClassroomEnvironment();
        setupClassroom(3, 4);
        setupPlayer();
        // recompute deskBoxes (make sure Box3 values are correct in world-space)
        deskBoxes.length = 0;
        desks.forEach(d => {
            const b = new THREE.Box3().setFromObject(d);
            deskBoxes.push(b);
            d.userData.boundingBox = b;
        });
        // position camera initially behind player
        camera.position.set(player.position.x, player.position.y + 2.0, player.position.z + 4.5);
        camera.lookAt(player.position);
        controls.enabled = false;
        buildSidebar(); // optional: update sidebar for classroom mode
    }

    // ---------- Integrasi ke animate() ----------
    /* Di dalam fungsi animate() yang sudah ada, tambahkan:
    updatePlayer(delta);
    updateMoleculeProximity();
    (pastikan ini dipanggil sebelum composer.render())
    */

    // Camera rotation control
    let yaw = 0;      // rotasi horizontal
    let pitch = 0;    // rotasi vertikal
    const cameraDistance = 4.5;
    const cameraHeight = 2.0;
    let isMouseDown = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    // Mouse control for camera rotation
    window.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    });

    window.addEventListener("mouseup", () => {
    isMouseDown = false;
    });

    window.addEventListener("mousemove", (e) => {
    if (!isMouseDown) return;
    const deltaX = e.clientX - lastMouseX;
    const deltaY = e.clientY - lastMouseY;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;

    // Adjust rotation sensitivity
    const sensitivity = 0.003;
    yaw -= deltaX * sensitivity;
    pitch -= deltaY * sensitivity;

    // Clamp pitch to avoid flipping
    pitch = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, pitch));
    });



    let playerMixer = null;
    let playerModel = null;

    function loadCharacter() {
    const loader = new GLTFLoader(); // bukan THREE.GLTFLoader()
    loader.load(
        "models/chibi_boy.glb",
        (gltf) => {
        console.log("Model loaded:", gltf.scene);
        playerModel = gltf.scene;
        playerModel.scale.set(0.8, 0.8, 0.8);
        playerModel.position.set(0, -PLAYER_RADIUS, 0);
        player.add(playerModel);

        // animasi idle
        playerMixer = new THREE.AnimationMixer(playerModel);
        if (gltf.animations.length > 0) {
            const idleAction = playerMixer.clipAction(gltf.animations[0]);
            idleAction.play();
        }
        },
        undefined,
        (error) => console.error("Error loading character:", error)
    );
    }


    function createClassroomEnvironment() {
    const floorMat = new THREE.MeshStandardMaterial({ color: 0xe0d6b4 });
    const floor = new THREE.Mesh(new THREE.BoxGeometry(40, 0.1, 40), floorMat);
    floor.receiveShadow = true;
    mainGroup.add(floor);
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xf2f0eb, side: THREE.BackSide });
    const walls = new THREE.Mesh(new THREE.BoxGeometry(40, 10, 40), wallMat);
    walls.position.y = 5;
    mainGroup.add(walls);

    // papan tulis
    const board = new THREE.Mesh(
        new THREE.BoxGeometry(8, 3, 0.2),
        new THREE.MeshStandardMaterial({ color: 0x003300 })
    );
    board.position.set(0, 3, -19.8);
    mainGroup.add(board);

    // lampu
    const light = new THREE.PointLight(0xffffff, 1.2, 100);
    light.position.set(0, 8, 0);
    light.castShadow = true;
    mainGroup.add(light);
    }

    let popupScene, popupCamera, popupRenderer, popupControls;
    let popupMolecule;

    function enterMoleculePopupMode(moleculeKey) {
    // Tampilkan overlay popup
    const popupEl = document.getElementById('molecule-popup');
    popupEl.classList.remove('hidden');

    // Buat scene baru
    popupScene = new THREE.Scene();
    popupCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    popupCamera.position.set(0, 0, 10);

    // Renderer khusus popup
    const popupCanvas = document.getElementById('molecule-canvas');
    popupRenderer = new THREE.WebGLRenderer({ canvas: popupCanvas, alpha: true, antialias: true });
    popupRenderer.setSize(window.innerWidth, window.innerHeight);
    popupRenderer.setPixelRatio(window.devicePixelRatio);

    // Tambahkan kontrol orbit
    // popupControls = new THREE.OrbitControls(popupCamera, popupRenderer.domElement);
    popupControls = new OrbitControls(popupCamera, popupRenderer.domElement);
    popupControls.enableDamping = true;

    // Lampu
    const light = new THREE.DirectionalLight(0xffffff, 1.2);
    light.position.set(5, 10, 5);
    popupScene.add(light);
    popupScene.add(new THREE.AmbientLight(0xffffff, 0.5));

    // Buat model molekulnya (pakai fungsi yang sudah kamu punya)
    const moleculeData = DATA.molecules[moleculeKey];
    popupMolecule = drawMoleculeGeometry(moleculeKey); // Pastikan fungsi ini return Group
    popupScene.add(popupMolecule);

    // Pesan di bawah
    const msgEl = document.getElementById('popup-message');
    msgEl.textContent = moleculeData.description || "Penjelasan molekul ini.";

    // Jalankan animasi render popup
    function animatePopup() {
        if (popupScene) {
        requestAnimationFrame(animatePopup);
        popupControls.update();
        popupRenderer.render(popupScene, popupCamera);
        }
    }
    animatePopup();
    }

    function exitMoleculePopupMode() {
    const popupEl = document.getElementById('molecule-popup');
    popupEl.classList.add('hidden');

    // Bersihkan scene popup
    popupRenderer.dispose();
    popupScene = null;
    popupMolecule = null;
    }
    document.getElementById('popup-back-btn').addEventListener('click', exitMoleculePopupMode);
