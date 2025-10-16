// Import library Three.js dan modul-modul tambahannya.
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { Sky } from 'three/addons/objects/Sky.js';

// DATA: Objek utama yang menyimpan semua informasi tentang atom dan molekul.
const DATA = {
    atoms: {
        H: { name: "Hidrogen", symbol: "H", color: 0xffffff, atomicNumber: 1, atomicMass: "1.008 u", electrons: [1], radius: 0.5, details: [
            { title: "Etimologi & Sejarah", content: "Nama 'hidrogen' diberikan oleh Antoine Lavoisier pada tahun 1783, berasal dari kata Yunani 'hydro' (air) dan 'genes' (membentuk)..." },
            { title: "Struktur & Komposisi", content: "Sebagai unsur paling sederhana, atom hidrogen netral terdiri dari satu proton tunggal di intinya dan satu elektron yang mengorbitnya..." },
            { title: "Fakta Menarik / Trivia", content: "Hidrogen memiliki tiga isotop umum: Protium (¹H), Deuterium (²H), dan Tritium (³H)..." }
        ]},
        C: { name: "Karbon", symbol: "C", color: 0x606060, atomicNumber: 6, atomicMass: "12.011 u", electrons: [2, 4], radius: 0.8, details: [
            { title: "Etimologi & Sejarah", content: "Nama 'karbon' berasal dari kata Latin 'carbo', yang berarti batu bara atau arang..." },
            { title: "Peran dalam Biologi", content: "Karbon adalah 'tulang punggung' kimia dari semua kehidupan di Bumi..." },
            { title: "Fakta Menarik / Trivia", content: "Isotop radioaktif Karbon-14 (¹⁴C) digunakan dalam penanggalan radiokarbon..." }
        ]},
        O: { name: "Oksigen", symbol: "O", color: 0xff0000, atomicNumber: 8, atomicMass: "15.999 u", electrons: [2, 6], radius: 0.8, details: [
            { title: "Etimologi & Sejarah", content: "Nama 'oksigen' diciptakan oleh Antoine Lavoisier dari kata Yunani 'oxys' (asam) dan 'genes' (pembentuk)..." },
            { title: "Peran dalam Biologi", content: "Oksigen sangat penting untuk respirasi seluler pada organisme aerobik..." },
            { title: "Fakta Menarik / Trivia", content: "Meskipun vital untuk kehidupan, oksigen murni pada tekanan tinggi bisa menjadi racun..." }
        ]},
        N: { name: 'Nitrogen',  symbol: 'N',  color: 0x88aaff, atomicNumber: 7, atomicMass: "14.007 u", electrons: [2, 5], radius: 0.85, details: [ { title: "Info", content: "Detail untuk Nitrogen belum ditambahkan."} ]},
        P: { name: 'Fosfor',    symbol: 'P',  color: 0xffa500, atomicNumber: 15, atomicMass: "30.974 u", electrons: [2, 8, 5], radius: 1.3, details: [ { title: "Info", content: "Detail untuk Fosfor belum ditambahkan."} ]},
        S: { name: 'Belerang',  symbol: 'S',  color: 0xffff88, atomicNumber: 16, atomicMass: "32.06 u", electrons: [2, 8, 6], radius: 1.2, details: [ { title: "Info", content: "Detail untuk Belerang belum ditambahkan."} ]},
        Cl: { name: 'Klorin',    symbol: 'Cl', color: 0x88ff88, atomicNumber: 17, atomicMass: "35.45 u", electrons: [2, 8, 7], radius: 1.15, details: [ { title: "Info", content: "Detail untuk Klorin belum ditambahkan."} ]},
        F: { name: 'Fluor',     symbol: 'F',  color: 0x90ee90, atomicNumber: 9, atomicMass: "18.998 u", electrons: [2, 7], radius: 0.7, details: [ { title: "Info", content: "Detail untuk Fluor belum ditambahkan."} ] }
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
        PH3: { name: "Fosfin (PH₃)", description: "Gas tidak berwarna dan mudah terbakar dengan struktur piramida trigonal.", details: [
            { title: "Info Umum", content: "Detail belum ditambahkan.." },
            { title: "Peran Biologis", content: "Detail belum ditambahkan." }
        ]},
        SF6: { name: "Belerang Heksafluorida (SF₆)", description: "Gas rumah kaca yang sangat poten dengan geometri oktahedral.", details: [
            { title: "Info Umum", content: "Detail belum ditambahkan." },
            { title: "Peran Biologis", content: "Detail belum ditambahkan." }
        ]},
        CCl4: { name: "Karbon Tetraklorida (CCl₄)", description: "Senyawa organik volatil dengan geometri tetrahedral.", details: [
            { title: "Info Umum", content: "Detail belum ditambahkan." },
            { title: "Peran Biologis", content: "Detail belum ditambahkan." }
        ]},
        C6H6: { name: "Benzena (C₆H₆)", description: "Senyawa organik aromatik dengan struktur cincin heksagonal.", details: [
            { title: "Info Umum", content: "Detail belum ditambahkan." },
            { title: "Peran Biologis", content: "Detail belum ditambahkan." }
        ]},
        C2H6: { name: "Etana (C₂H₆)", description: "Alkana sederhana yang terdiri dari dua atom karbon.", details: [
            { title: "Info Umum", content: "Detail belum ditambahkan." },
            { title: "Peran Biologis", content: "Detail belum ditambahkan." }
        ]},
        C3H8: { name: "Propana (C₃H₈)", description: "Alkana yang umum digunakan sebagai bahan bakar gas.", details: [
            { title: "Info Umum", content: "Detail belum ditambahkan." },
            { title: "Peran Biologis", content: "Detail belum ditambahkan." }
        ]},
        CH2O: { name: "Formaldehida (CH₂O)", description: "Aldehida paling sederhana dengan bentuk trigonal planar.", details: [
            { title: "Info Umum", content: "Detail belum ditambahkan." },
            { title: "Peran Biologis", content: "Detail belum ditambahkan." }
        ]},
        C3H6O: { name: "Aseton (C₃H₆O)", description: "Keton paling sederhana yang umum digunakan sebagai pelarut.", details: [
            { title: "Info Umum", content: "Detail belum ditambahkan." },
            { title: "Peran Biologis", content: "Detail belum ditambahkan." }
        ]},
        CH3COOH: { name: "Asam Asetat (CH₃COOH)", description: "Asam karboksilat sederhana, komponen utama cuka.", details: [
            { title: "Info Umum", content: "Detail belum ditambahkan." },
            { title: "Peran Biologis", content: "Detail belum ditambahkan." }
        ]},
        C8H10N4O2: { name: "Kafein (C₈H₁₀N₄O₂)", description: "Stimulan sistem saraf pusat dari kelas metilxantina.", details: [
            { title: "Info Umum", content: "Detail belum ditambahkan." },
            { title: "Peran Biologis", content: "Detail belum ditambahkan." }
        ]},
        NH3: { name: "Amonia (NH₃)", description: "Molekul polar dengan geometri piramida trigonal (~107.8°). Memiliki bau yang tajam dan khas.", details: [
            { title: "Info Umum", content: "Amonia adalah senyawa nitrogen dan hidrogen yang penting secara komersial, terutama sebagai bahan dasar pupuk." },
            { title: "Sifat Kimia", content: "Amonia bersifat basa lemah. Gasnya lebih ringan dari udara." }
        ]},
        HCl: { name: "Asam Klorida (HCl)", description: "Molekul diatomik yang sangat polar. Dalam larutan air, ia menjadi asam kuat.", details: [
            { title: "Info Umum", content: "Asam klorida adalah gas tidak berwarna pada suhu kamar yang membentuk kabut putih asam klorida saat kontak dengan kelembapan atmosfer." },
            { title: "Penggunaan", content: "Digunakan secara luas dalam industri kimia sebagai pereaksi, dan juga ditemukan di dalam lambung sebagai asam lambung." }
        ]},
        H2S: { name: "Hidrogen Sulfida (H₂S)", description: "Gas beracun dan mudah terbakar dengan bau khas seperti telur busuk. Bentuknya tekuk/bent (~92.1°).", details: [
            { title: "Info Umum", content: "Hidrogen sulfida adalah gas yang dihasilkan dari dekomposisi bahan organik oleh bakteri tanpa adanya oksigen." },
            { title: "Keamanan", content: "Meskipun baunya sangat kuat pada konsentrasi rendah, pada konsentrasi tinggi dapat melumpuhkan indra penciuman dengan cepat, menjadikannya sangat berbahaya." }
        ]},
        C2H4: { name: "Etena (C₂H₄)", description: "Alkena paling sederhana, dengan ikatan rangkap dua antar karbon yang membuatnya planar.", details: [
            { title: "Info Umum", content: "Etena (juga dikenal sebagai etilena) adalah hormon tumbuhan alami dan bahan baku industri kimia yang sangat penting." },
            { title: "Penggunaan", content: "Digunakan untuk memproduksi polietilena, plastik yang paling banyak digunakan di dunia." }
        ]},
        C2H2: { name: "Etuna (C₂H₂)", description: "Alkuna paling sederhana, dengan ikatan rangkap tiga antar karbon yang membuatnya linear.", details: [
            { title: "Info Umum", content: "Etuna (juga dikenal sebagai asetilena) adalah gas yang sangat mudah terbakar." },
            { title: "Penggunaan", content: "Digunakan dalam pengelasan (las karbit) karena menghasilkan nyala api yang sangat panas." }
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
        displayMolecule("H2O");
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
        pauseBtn.textContent = 'Pause';
        pauseBtn.onclick = () => { isAnimationPaused = true; };
        
        const startBtn = document.createElement('button');
        startBtn.className = 'btn';
        startBtn.textContent = 'Mulai';
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
function drawMoleculeGeometry(moleculeKey){
    switch (moleculeKey) {
        case "H2O": drawWater(); break;
        case "CH4": drawMethane(); break;
        case "CO2": drawCarbonDioxide(); break;
        case "PH3": drawPhosphine(); break;
        case "SF6": drawSulfurHexafluoride(); break;
        case "CCl4": drawCarbonTetrachloride(); break;
        case "C6H6": drawBenzene(); break;
        case "C2H6": drawEthane(); break;
        case "C3H8": drawPropane(); break;
        case "CH2O": drawFormaldehyde(); break;
        case "C3H6O": drawAcetone(); break;
        case "CH3COOH": drawAceticAcid(); break;
        case "C8H10N4O2": drawCaffeine(); break;
        case "NH3": drawAmmonia(); break;
        case "HCl": drawHydrogenChloride(); break;
        case "H2S": drawHydrogenSulfide(); break;
        case "C2H4": drawEthene(); break;
        case "C2H2": drawEthyne(); break;
    }
}

// Menggambar geometri spesifik untuk molekul Air (H2O).
function drawWater() {
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
    mainGroup.add(o, h1, h2);
    mainGroup.add(createBondMesh(o.position, h1.position, 0.08));
    mainGroup.add(createBondMesh(o.position, h2.position, 0.08));
}

// Menggambar geometri spesifik untuk molekul Metana (CH4).
function drawMethane() {
    const c = createAtomMesh(0.9, DATA.atoms.C.color, 'C');
    c.userData.initialPosition = c.position.clone();
    mainGroup.add(c);
    // Posisi tetrahedral untuk atom hidrogen.
    const positions = [ new THREE.Vector3(1, 1, 1), new THREE.Vector3(1, -1, -1), new THREE.Vector3(-1, 1, -1), new THREE.Vector3(-1, -1, 1) ];
    positions.forEach((pos) => {
        const h = createAtomMesh(0.5, DATA.atoms.H.color, 'H');
        h.position.copy(pos.normalize().multiplyScalar(2.5));
        h.userData.initialPosition = h.position.clone();
        mainGroup.add(h);
        mainGroup.add(createBondMesh(c.position, h.position, 0.08));
    });
}

// Menggambar geometri spesifik untuk molekul Karbondioksida (CO2).
function drawCarbonDioxide() {
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
    mainGroup.add(c, o1, o2);
    // Gambar dua ikatan untuk setiap atom Oksigen.
    mainGroup.add(createBondMesh(c.position.clone().setY(doubleBondOffset), o1.position.clone().setY(doubleBondOffset), 0.08));
    mainGroup.add(createBondMesh(c.position.clone().setY(-doubleBondOffset), o1.position.clone().setY(-doubleBondOffset), 0.08));
    mainGroup.add(createBondMesh(c.position.clone().setY(doubleBondOffset), o2.position.clone().setY(doubleBondOffset), 0.08));
    mainGroup.add(createBondMesh(c.position.clone().setY(-doubleBondOffset), o2.position.clone().setY(-doubleBondOffset), 0.08));
}

function drawPhosphine() {
            const p = createAtomMesh(DATA.atoms.P.radius, DATA.atoms.P.color, 'P');
            p.userData.initialPosition = p.position.clone();
            mainGroup.add(p);
            
            const bondLength = 2.5;
            const angle = 93.5 * Math.PI / 180;
            const h1 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
            h1.position.set(0, bondLength, 0); // Atas
            
            const h2 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
            h2.position.set(bondLength * Math.sin(angle), -bondLength * Math.cos(angle), 0); // Kanan bawah
            
            const h3 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
            h3.position.set(-bondLength * Math.sin(angle/2), -bondLength * Math.cos(angle), -bondLength * Math.sin(angle) * 0.866); // Kiri bawah belakang

            h1.userData.initialPosition = h1.position.clone();
            h2.userData.initialPosition = h2.position.clone();
            h3.userData.initialPosition = h3.position.clone();

            mainGroup.add(h1, createBondMesh(p.position, h1.position, 0.1));
            mainGroup.add(h2, createBondMesh(p.position, h2.position, 0.1));
            mainGroup.add(h3, createBondMesh(p.position, h3.position, 0.1));
        }

function drawSulfurHexafluoride() {
    const s = createAtomMesh(DATA.atoms.S.radius, DATA.atoms.S.color, 'S');
    s.userData.initialPosition = s.position.clone();
    mainGroup.add(s);
    const bondLength = 2.8;
    const positions = [
        new THREE.Vector3(bondLength, 0, 0), new THREE.Vector3(-bondLength, 0, 0),
        new THREE.Vector3(0, bondLength, 0), new THREE.Vector3(0, -bondLength, 0),
        new THREE.Vector3(0, 0, bondLength), new THREE.Vector3(0, 0, -bondLength),
    ];
    positions.forEach(pos => {
        const f = createAtomMesh(DATA.atoms.F.radius, DATA.atoms.F.color, 'F');
        f.position.copy(pos);
        f.userData.initialPosition = f.position.clone();
        mainGroup.add(f, createBondMesh(s.position, f.position, 0.1));
    });
}
            
function drawCarbonTetrachloride() {
    const c = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C', '+', 0x8888ff);
    c.userData.initialPosition = c.position.clone();
    mainGroup.add(c);
    const bondLength = 3.0;
    const positions = [
        new THREE.Vector3(1, 1, 1), new THREE.Vector3(1, -1, -1),
        new THREE.Vector3(-1, 1, -1), new THREE.Vector3(-1, -1, 1)
    ];
    positions.forEach(pos => {
        const cl = createAtomMesh(DATA.atoms.Cl.radius, DATA.atoms.Cl.color, 'Cl', '-', 0xff8888);
        cl.position.copy(pos.normalize().multiplyScalar(bondLength));
        cl.userData.initialPosition = cl.position.clone();
    mainGroup.add(cl, createBondMesh(c.position, cl.position, 0.15));
    });
}

 function drawBenzene() {
            const carbons = [];
            const ringRadius = 3.0;
            const chBondLength = 2.0;
            const doubleBondOffset = 0.15;

            // Buat dan posisikan 6 atom Karbon dan 6 atom Hidrogen
            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * 2 * Math.PI;

                // Posisi Karbon
                const cX = ringRadius * Math.cos(angle);
                const cY = ringRadius * Math.sin(angle);
                const carbon = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C');
                carbon.position.set(cX, cY, 0);
                carbon.userData.initialPosition = carbon.position.clone();
                carbons.push(carbon);
                mainGroup.add(carbon);

                // Posisi Hidrogen
                const hX = (ringRadius + chBondLength) * Math.cos(angle);
                const hY = (ringRadius + chBondLength) * Math.sin(angle);
                const hydrogen = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
                hydrogen.position.set(hX, hY, 0);
                hydrogen.userData.initialPosition = hydrogen.position.clone();
                mainGroup.add(hydrogen);
                
                // Buat ikatan C-H
                mainGroup.add(createBondMesh(carbon.position, hydrogen.position, 0.08));
            }

            // Buat ikatan C-C (berselang-seling)
            for (let i = 0; i < 6; i++) {
                const currentCarbon = carbons[i];
                const nextCarbon = carbons[(i + 1) % 6]; // Untuk menyambung C terakhir ke C pertama

                if (i % 2 === 0) { // Ikatan rangkap dua
                    const pos1 = currentCarbon.position;
                    const pos2 = nextCarbon.position;
                    mainGroup.add(createBondMesh(pos1.clone().setZ(doubleBondOffset), pos2.clone().setZ(doubleBondOffset), 0.08));
                    mainGroup.add(createBondMesh(pos1.clone().setZ(-doubleBondOffset), pos2.clone().setZ(-doubleBondOffset), 0.08));
                } else { // Ikatan tunggal
                    mainGroup.add(createBondMesh(currentCarbon.position, nextCarbon.position, 0.08));
                }
            }
        }

function drawEthane() {
            const ccBondLength = 2.5;
            const chBondLength = 2.0;
            const tetrahedralAngle = 109.5 * Math.PI / 180;

            // Buat 2 atom Karbon
            const c1 = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C');
            c1.position.x = -ccBondLength / 2;
            c1.userData.initialPosition = c1.position.clone();
            mainGroup.add(c1);

            const c2 = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C');
            c2.position.x = ccBondLength / 2;
            c2.userData.initialPosition = c2.position.clone();
            mainGroup.add(c2);

            // Buat ikatan C-C
            mainGroup.add(createBondMesh(c1.position, c2.position, 0.12));

            // Buat atom Hidrogen untuk setiap Karbon
            const basePositions = [];
            for (let i = 0; i < 3; i++) {
                const angle = (i / 3) * 2 * Math.PI;
                basePositions.push(new THREE.Vector3(
                    chBondLength * Math.cos(tetrahedralAngle - Math.PI/2),
                    chBondLength * Math.sin(tetrahedralAngle- Math.PI/2) * Math.cos(angle),
                    chBondLength * Math.sin(tetrahedralAngle- Math.PI/2) * Math.sin(angle)
                ));
            }
            
            // Hidrogen di Karbon 1 (menghadap ke kiri)
            basePositions.forEach(pos => {
                const h = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
                h.position.copy(c1.position).add(pos.clone().setX(-pos.x));
                h.userData.initialPosition = h.position.clone();
                mainGroup.add(h, createBondMesh(c1.position, h.position, 0.08));
            });

            // Hidrogen di Karbon 2 (menghadap ke kanan, staggered)
            const rotationMatrix = new THREE.Matrix4().makeRotationX(Math.PI / 3);
             basePositions.forEach(pos => {
                const h = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
                const rotatedPos = pos.clone().applyMatrix4(rotationMatrix);
                h.position.copy(c2.position).add(rotatedPos);
                h.userData.initialPosition = h.position.clone();
                mainGroup.add(h, createBondMesh(c2.position, h.position, 0.08));
            });
        }

function drawPropane() {
            const ccBondLength = 2.5;
            const chBondLength = 2.0;
            const tetrahedralAngle = 109.5 * Math.PI / 180;

            // Buat 3 atom Karbon dalam satu garis
            const c1 = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C');
            c1.position.x = -ccBondLength;
            c1.userData.initialPosition = c1.position.clone();
            mainGroup.add(c1);

            const c2 = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C');
            c2.position.x = 0;
            c2.userData.initialPosition = c2.position.clone();
            mainGroup.add(c2);

            const c3 = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C');
            c3.position.x = ccBondLength;
            c3.userData.initialPosition = c3.position.clone();
            mainGroup.add(c3);

            // Buat ikatan C-C
            mainGroup.add(createBondMesh(c1.position, c2.position, 0.12));
            mainGroup.add(createBondMesh(c2.position, c3.position, 0.12));

            // -- Hidrogen untuk Karbon 1 (ujung kiri) --
            const endCHPositions = [];
            for (let i = 0; i < 3; i++) {
                const angle = (i / 3) * 2 * Math.PI;
                endCHPositions.push(new THREE.Vector3(
                    chBondLength * Math.cos(tetrahedralAngle - Math.PI/2),
                    chBondLength * Math.sin(tetrahedralAngle - Math.PI/2) * Math.cos(angle),
                    chBondLength * Math.sin(tetrahedralAngle - Math.PI/2) * Math.sin(angle)
                ));
            }
            
            endCHPositions.forEach(pos => {
                const h = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
                h.position.copy(c1.position).add(pos.clone().setX(-pos.x));
                h.userData.initialPosition = h.position.clone();
                mainGroup.add(h, createBondMesh(c1.position, h.position, 0.08));
            });

            // -- Hidrogen untuk Karbon 2 (tengah) --
            const h_mid1 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
            h_mid1.position.set(0, chBondLength, 0);
            h_mid1.userData.initialPosition = h_mid1.position.clone();
            mainGroup.add(h_mid1, createBondMesh(c2.position, h_mid1.position, 0.08));

            const h_mid2 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
            h_mid2.position.set(0, -chBondLength * Math.cos(60 * Math.PI/180), -chBondLength * Math.sin(60*Math.PI/180));
            h_mid2.userData.initialPosition = h_mid2.position.clone();
            mainGroup.add(h_mid2, createBondMesh(c2.position, h_mid2.position, 0.08));

            // -- Hidrogen untuk Karbon 3 (ujung kanan) --
            const rotationMatrix = new THREE.Matrix4().makeRotationX(Math.PI / 3);
            endCHPositions.forEach(pos => {
                const h = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
                const rotatedPos = pos.clone().applyMatrix4(rotationMatrix);
                h.position.copy(c3.position).add(rotatedPos);
                h.userData.initialPosition = h.position.clone();
                mainGroup.add(h, createBondMesh(c3.position, h.position, 0.08));
            });
        }

function drawFormaldehyde() {
            const c = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C');
            c.userData.initialPosition = c.position.clone();
            mainGroup.add(c);

            const o = createAtomMesh(DATA.atoms.O.radius, DATA.atoms.O.color, 'O');
            const coBondLength = 2.2;
            o.position.y = coBondLength;
            o.userData.initialPosition = o.position.clone();
            mainGroup.add(o);
            
            // Ikatan rangkap C=O
            const doubleBondOffset = 0.15;
            mainGroup.add(createBondMesh(c.position.clone().setX(doubleBondOffset), o.position.clone().setX(doubleBondOffset), 0.08));
            mainGroup.add(createBondMesh(c.position.clone().setX(-doubleBondOffset), o.position.clone().setX(-doubleBondOffset), 0.08));

            const h1 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
            const chBondLength = 2.0;
            const angle = 120 * Math.PI / 180;
            h1.position.set(chBondLength * Math.cos(angle/2), -chBondLength * Math.sin(angle/2), 0);
            h1.userData.initialPosition = h1.position.clone();
            mainGroup.add(h1, createBondMesh(c.position, h1.position, 0.08));
            
            const h2 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
            h2.position.set(-chBondLength * Math.cos(angle/2), -chBondLength * Math.sin(angle/2), 0);
            h2.userData.initialPosition = h2.position.clone();
            mainGroup.add(h2, createBondMesh(c.position, h2.position, 0.08));
        }

function drawAcetone() {
            const ccBondLength = 2.5;
            const coBondLength = 2.2;
            const chBondLength = 2.0;
            const trigonalAngle = 120 * Math.PI / 180;
            const tetrahedralAngle = 109.5 * Math.PI / 180;

            // Karbon tengah (gugus karbonil)
            const c_mid = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C');
            c_mid.userData.initialPosition = c_mid.position.clone();
            mainGroup.add(c_mid);

            // Oksigen
            const o = createAtomMesh(DATA.atoms.O.radius, DATA.atoms.O.color, 'O');
            o.position.y = coBondLength;
            o.userData.initialPosition = o.position.clone();
            mainGroup.add(o);

            // Ikatan rangkap C=O
            const doubleBondOffset = 0.15;
            mainGroup.add(createBondMesh(c_mid.position.clone().setX(doubleBondOffset), o.position.clone().setX(doubleBondOffset), 0.08));
            mainGroup.add(createBondMesh(c_mid.position.clone().setX(-doubleBondOffset), o.position.clone().setX(-doubleBondOffset), 0.08));
            
            // Karbon metil kiri
            const c_left = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C');
            c_left.position.set(-ccBondLength * Math.sin(trigonalAngle / 2), -ccBondLength * Math.cos(trigonalAngle / 2), 0);
            c_left.userData.initialPosition = c_left.position.clone();
            mainGroup.add(c_left, createBondMesh(c_mid.position, c_left.position, 0.12));

            // Karbon metil kanan
            const c_right = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C');
            c_right.position.set(ccBondLength * Math.sin(trigonalAngle / 2), -ccBondLength * Math.cos(trigonalAngle / 2), 0);
            c_right.userData.initialPosition = c_right.position.clone();
            mainGroup.add(c_right, createBondMesh(c_mid.position, c_right.position, 0.12));
            
            // Posisi dasar Hidrogen untuk gugus metil (mengarah ke -X)
            const methylHPositions = [];
            for (let i = 0; i < 3; i++) {
                const angle = (i / 3) * 2 * Math.PI;
                methylHPositions.push(new THREE.Vector3(
                    -chBondLength * Math.cos(tetrahedralAngle - Math.PI / 2),
                    chBondLength * Math.sin(tetrahedralAngle - Math.PI / 2) * Math.cos(angle),
                    chBondLength * Math.sin(tetrahedralAngle - Math.PI / 2) * Math.sin(angle)
                ));
            }
            
            // Hidrogen di karbon kiri
            const bondVectorLeft = new THREE.Vector3().subVectors(c_left.position, c_mid.position).normalize();
            const quaternionLeft = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(-1, 0, 0), bondVectorLeft);
            methylHPositions.forEach(pos => {
                const h = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
                h.position.copy(c_left.position).add(pos.clone().applyQuaternion(quaternionLeft));
                h.userData.initialPosition = h.position.clone();
                mainGroup.add(h, createBondMesh(c_left.position, h.position, 0.08));
            });

            // Hidrogen di karbon kanan
            const bondVectorRight = new THREE.Vector3().subVectors(c_right.position, c_mid.position).normalize();
            const quaternionRight = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(-1, 0, 0), bondVectorRight);
            methylHPositions.forEach(pos => {
                const h = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
                h.position.copy(c_right.position).add(pos.clone().applyQuaternion(quaternionRight));
                h.userData.initialPosition = h.position.clone();
                mainGroup.add(h, createBondMesh(c_right.position, h.position, 0.08));
            });
        }

function drawAceticAcid() {
            const ccBondLength = 2.8;
            const coBondLength = 2.2;
            const chBondLength = 2.0;
            const ohBondLength = 1.8;
            const trigonalAngle = 120 * Math.PI / 180;
            const tetrahedralAngle = 109.5 * Math.PI / 180;

            // Karbon gugus karboksil
            const c_carboxyl = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C');
            c_carboxyl.userData.initialPosition = c_carboxyl.position.clone();
            mainGroup.add(c_carboxyl);

            // Oksigen karbonil (ikatan rangkap)
            const o_carbonyl = createAtomMesh(DATA.atoms.O.radius, DATA.atoms.O.color, 'O');
            o_carbonyl.position.set(coBondLength * Math.sin(trigonalAngle/2), coBondLength * Math.cos(trigonalAngle/2), 0);
            o_carbonyl.userData.initialPosition = o_carbonyl.position.clone();
            mainGroup.add(o_carbonyl);
            const doubleBondOffset = 0.15;
            mainGroup.add(createBondMesh(c_carboxyl.position.clone().setZ(doubleBondOffset), o_carbonyl.position.clone().setZ(doubleBondOffset), 0.08));
            mainGroup.add(createBondMesh(c_carboxyl.position.clone().setZ(-doubleBondOffset), o_carbonyl.position.clone().setZ(-doubleBondOffset), 0.08));
            
            // Oksigen hidroksil (ikatan tunggal)
            const o_hydroxyl = createAtomMesh(DATA.atoms.O.radius, DATA.atoms.O.color, 'O');
            o_hydroxyl.position.set(-coBondLength * Math.sin(trigonalAngle/2), coBondLength * Math.cos(trigonalAngle/2), 0);
            o_hydroxyl.userData.initialPosition = o_hydroxyl.position.clone();
            mainGroup.add(o_hydroxyl, createBondMesh(c_carboxyl.position, o_hydroxyl.position, 0.08));
            
            // Hidrogen hidroksil
            const h_hydroxyl = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
            const cohAngle = 109.5 * Math.PI / 180;
            h_hydroxyl.position.x = o_hydroxyl.position.x - ohBondLength * Math.cos(cohAngle/2);
            h_hydroxyl.position.y = o_hydroxyl.position.y + ohBondLength * Math.sin(cohAngle/2);
            h_hydroxyl.userData.initialPosition = h_hydroxyl.position.clone();
            mainGroup.add(h_hydroxyl, createBondMesh(o_hydroxyl.position, h_hydroxyl.position, 0.08));

            // Karbon metil
            const c_methyl = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C');
            c_methyl.position.set(0, -ccBondLength, 0);
            c_methyl.userData.initialPosition = c_methyl.position.clone();
            mainGroup.add(c_methyl, createBondMesh(c_carboxyl.position, c_methyl.position, 0.12));

            // Hidrogen untuk gugus metil
            const methylHPositions = [];
            for (let i = 0; i < 3; i++) {
                const angle = (i / 3) * 2 * Math.PI;
                 methylHPositions.push(new THREE.Vector3(
                    chBondLength * Math.sin(tetrahedralAngle - Math.PI / 2) * Math.cos(angle),
                    -chBondLength * Math.cos(tetrahedralAngle - Math.PI / 2),
                    chBondLength * Math.sin(tetrahedralAngle - Math.PI / 2) * Math.sin(angle)
                ));
            }
             methylHPositions.forEach(pos => {
                const h = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
                h.position.copy(c_methyl.position).add(pos);
                h.userData.initialPosition = h.position.clone();
                mainGroup.add(h, createBondMesh(c_methyl.position, h.position, 0.08));
            });
        }

function drawCaffeine() {
            const atoms = {}; // Store atom objects for easy reference
            const bondLength = 2.5;
            const chBondLength = 2.0;
            const doubleBondOffset = 0.15;

            // Helper to add atom and save it
            function createAndPlaceAtom(name, symbol, position) {
                const atom = createAtomMesh(DATA.atoms[symbol].radius, DATA.atoms[symbol].color, symbol);
                atom.position.copy(position);
                atom.userData.initialPosition = atom.position.clone();
                atoms[name] = atom;
                mainGroup.add(atom);
                return atom;
            }
            
            // Helper for double bonds
            function addDoubleBond(pos1, pos2, radius = 0.08) {
                mainGroup.add(createBondMesh(pos1.clone().setZ(doubleBondOffset), pos2.clone().setZ(doubleBondOffset), radius));
                mainGroup.add(createBondMesh(pos1.clone().setZ(-doubleBondOffset), pos2.clone().setZ(-doubleBondOffset), radius));
            }

            // --- Define more accurate atom positions for the fused rings ---
            const p = { // positions
                C5: new THREE.Vector3(0, 0, 0),
                C4: new THREE.Vector3(bondLength, 0, 0),
                N3: new THREE.Vector3(bondLength + bondLength * Math.cos(Math.PI / 3), -bondLength * Math.sin(Math.PI / 3), 0),
                C2: new THREE.Vector3(bondLength, -2 * bondLength * Math.sin(Math.PI / 3), 0),
                N1: new THREE.Vector3(0, -2 * bondLength * Math.sin(Math.PI / 3), 0),
                C6: new THREE.Vector3(-bondLength * Math.cos(Math.PI / 3), -bondLength * Math.sin(Math.PI / 3), 0),
                N7: new THREE.Vector3(-0.4, 1.9, 0),
                C8: new THREE.Vector3(1.25, 2.7, 0),
                N9: new THREE.Vector3(2.9, 1.9, 0),
            };

            // --- Create ring atoms ---
            Object.keys(p).forEach(key => {
                const symbol = key.charAt(0);
                createAndPlaceAtom(key, symbol, p[key]);
            });

            // --- Create ring bonds ---
            mainGroup.add(createBondMesh(p.N1, p.C2, 0.12));
            mainGroup.add(createBondMesh(p.C2, p.N3, 0.12));
            mainGroup.add(createBondMesh(p.N3, p.C4, 0.12));
            mainGroup.add(createBondMesh(p.C5, p.C6, 0.12));
            mainGroup.add(createBondMesh(p.C6, p.N1, 0.12));
            mainGroup.add(createBondMesh(p.C5, p.N7, 0.12));
            mainGroup.add(createBondMesh(p.C8, p.N9, 0.12));
            mainGroup.add(createBondMesh(p.N9, p.C4, 0.12));

            // --- Add the double bonds based on reference image ---
            addDoubleBond(p.C4, p.C5);
            addDoubleBond(p.N7, p.C8);

            // --- Add external atoms ---
            // Carbonyl Oxygens
            const O2_pos = new THREE.Vector3().subVectors(p.C2, p.N1).add(new THREE.Vector3().subVectors(p.C2, p.N3)).normalize().multiplyScalar(bondLength).add(p.C2);
            const O2 = createAndPlaceAtom('O2', 'O', O2_pos);
            addDoubleBond(p.C2, O2.position);
            
            const O6_pos = new THREE.Vector3().subVectors(p.C6, p.N1).add(new THREE.Vector3().subVectors(p.C6, p.C5)).normalize().multiplyScalar(bondLength).add(p.C6);
            const O6 = createAndPlaceAtom('O6', 'O', O6_pos);
            addDoubleBond(p.C6, O6.position);

            // Hydrogen on C8
            const H8_pos = new THREE.Vector3().subVectors(p.C8, p.N7).add(new THREE.Vector3().subVectors(p.C8, p.N9)).normalize().multiplyScalar(chBondLength).add(p.C8);
            const H8 = createAndPlaceAtom('H8', 'H', H8_pos);
            mainGroup.add(createBondMesh(p.C8, H8.position, 0.08));

            // --- Methyl Groups ---
            function addMethylGroup(parentAtom, refAtom1, refAtom2) {
                const offset = new THREE.Vector3().subVectors(parentAtom.position, refAtom1.position).add(new THREE.Vector3().subVectors(parentAtom.position, refAtom2.position)).normalize().multiplyScalar(bondLength);
                const methyl_C_pos = new THREE.Vector3().addVectors(parentAtom.position, offset);
                const methyl_C = createAndPlaceAtom(`C_methyl_${parentAtom.name}`, 'C', methyl_C_pos);
                mainGroup.add(createBondMesh(parentAtom.position, methyl_C.position, 0.12));

                const tetrahedralAngle = 109.5 * Math.PI / 180;
                const hPositions = [];
                 for (let i = 0; i < 3; i++) {
                    const angle = (i / 3) * 2 * Math.PI;
                     hPositions.push(new THREE.Vector3(
                        chBondLength * Math.sin(tetrahedralAngle - Math.PI / 2) * Math.cos(angle),
                        chBondLength * Math.cos(tetrahedralAngle - Math.PI / 2),
                        chBondLength * Math.sin(tetrahedralAngle - Math.PI / 2) * Math.sin(angle)
                    ));
                }

                const bondVector = new THREE.Vector3().subVectors(methyl_C.position, parentAtom.position).normalize();
                const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), bondVector);

                hPositions.forEach((pos, i) => {
                    const h = createAndPlaceAtom(`H_methyl_${parentAtom.name}_${i}`, 'H', methyl_C.position.clone().add(pos.clone().applyQuaternion(quaternion)));
                    mainGroup.add(createBondMesh(methyl_C.position, h.position, 0.08));
                });
            }
            
            addMethylGroup(atoms.N1, atoms.C2, atoms.C6);
            addMethylGroup(atoms.N3, atoms.C2, atoms.C4);
            addMethylGroup(atoms.N7, atoms.C5, atoms.C8);
        }

function drawAmmonia() {
    const n = createAtomMesh(DATA.atoms.N.radius, DATA.atoms.N.color, 'N', '-', 0xff8888);
    n.position.y = 0.3; // Angkat atom N sedikit untuk membentuk puncak piramida
    n.userData.initialPosition = n.position.clone();
    mainGroup.add(n);
    
    const bondLength = 2.2;
    const angleHNH = 107.8 * Math.PI / 180;
    
    // Hitung posisi atom H di dasar piramida
    const h1 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H', '+', 0x8888ff);
    h1.position.set(0, -bondLength * Math.cos(angleHNH/1.5), bondLength * Math.sin(angleHNH/1.5));

    const h2 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H', '+', 0x8888ff);
    h2.position.set(bondLength * Math.sin(angleHNH/1.5) * Math.sin(Math.PI / 3 * 2), -bondLength * Math.cos(angleHNH/1.5), -bondLength * Math.sin(angleHNH/1.5) * Math.cos(Math.PI / 3 * 2));

    const h3 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H', '+', 0x8888ff);
    h3.position.set(-bondLength * Math.sin(angleHNH/1.5) * Math.sin(Math.PI / 3 * 2), -bondLength * Math.cos(angleHNH/1.5), -bondLength * Math.sin(angleHNH/1.5) * Math.cos(Math.PI / 3 * 2));
    
    h1.userData.initialPosition = h1.position.clone();
    h2.userData.initialPosition = h2.position.clone();
    h3.userData.initialPosition = h3.position.clone();

    mainGroup.add(h1, h2, h3);
    mainGroup.add(createBondMesh(n.position, h1.position, 0.08));
    mainGroup.add(createBondMesh(n.position, h2.position, 0.08));
    mainGroup.add(createBondMesh(n.position, h3.position, 0.08));
}

function drawHydrogenChloride() {
    const h = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H', '+', 0x8888ff);
    const cl = createAtomMesh(DATA.atoms.Cl.radius, DATA.atoms.Cl.color, 'Cl', '-', 0xff8888);
    const bondLength = 2.8;
    
    h.position.x = -bondLength / 2;
    cl.position.x = bondLength / 2;
    
    h.userData.initialPosition = h.position.clone();
    cl.userData.initialPosition = cl.position.clone();
    
    mainGroup.add(h, cl);
    mainGroup.add(createBondMesh(h.position, cl.position, 0.12));
}

function drawHydrogenSulfide() {
    const s = createAtomMesh(DATA.atoms.S.radius, DATA.atoms.S.color, 'S', '-', 0xff8888);
    const h1 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H', '+', 0x8888ff);
    const h2 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H', '+', 0x8888ff);
    const angle = (92.1 * Math.PI) / 180; // Sudut ikatan H-S-H
    const bondLength = 2.4;
    
    h1.position.set(bondLength * Math.cos(angle / 2), bondLength * Math.sin(angle / 2), 0);
    h2.position.set(bondLength * Math.cos(angle / 2), -bondLength * Math.sin(angle / 2), 0);
    
    s.userData.initialPosition = s.position.clone();
    h1.userData.initialPosition = h1.position.clone();
    h2.userData.initialPosition = h2.position.clone();
    
    mainGroup.add(s, h1, h2);
    mainGroup.add(createBondMesh(s.position, h1.position, 0.08));
    mainGroup.add(createBondMesh(s.position, h2.position, 0.08));
}

function drawEthene() {
    const doubleBondOffset = 0.15;
    const ccBondLength = 2.4;
    const chBondLength = 2.0;
    const hchAngle = 117 * Math.PI / 180;

    const c1 = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C');
    c1.position.x = -ccBondLength / 2;
    c1.userData.initialPosition = c1.position.clone();
    mainGroup.add(c1);

    const c2 = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C');
    c2.position.x = ccBondLength / 2;
    c2.userData.initialPosition = c2.position.clone();
    mainGroup.add(c2);

    // Ikatan rangkap C=C
    mainGroup.add(createBondMesh(c1.position.clone().setY(doubleBondOffset), c2.position.clone().setY(doubleBondOffset), 0.08));
    mainGroup.add(createBondMesh(c1.position.clone().setY(-doubleBondOffset), c2.position.clone().setY(-doubleBondOffset), 0.08));

    // Hidrogen pada C1
    const h1 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
    h1.position.set(c1.position.x - chBondLength * Math.cos(hchAngle/2), chBondLength * Math.sin(hchAngle/2), 0);
    h1.userData.initialPosition = h1.position.clone();
    mainGroup.add(h1, createBondMesh(c1.position, h1.position, 0.08));

    const h2 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
    h2.position.set(c1.position.x - chBondLength * Math.cos(hchAngle/2), -chBondLength * Math.sin(hchAngle/2), 0);
    h2.userData.initialPosition = h2.position.clone();
    mainGroup.add(h2, createBondMesh(c1.position, h2.position, 0.08));

    // Hidrogen pada C2
    const h3 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
    h3.position.set(c2.position.x + chBondLength * Math.cos(hchAngle/2), chBondLength * Math.sin(hchAngle/2), 0);
    h3.userData.initialPosition = h3.position.clone();
    mainGroup.add(h3, createBondMesh(c2.position, h3.position, 0.08));

    const h4 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
    h4.position.set(c2.position.x + chBondLength * Math.cos(hchAngle/2), -chBondLength * Math.sin(hchAngle/2), 0);
    h4.userData.initialPosition = h4.position.clone();
    mainGroup.add(h4, createBondMesh(c2.position, h4.position, 0.08));
}

// Menggambar geometri spesifik untuk Etuna (C2H2).
function drawEthyne() {
    const tripleBondOffset = 0.20;
    const ccBondLength = 2.2;
    const chBondLength = 1.9;

    const c1 = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C');
    c1.position.x = -ccBondLength / 2;
    c1.userData.initialPosition = c1.position.clone();
    mainGroup.add(c1);

    const c2 = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C');
    c2.position.x = ccBondLength / 2;
    c2.userData.initialPosition = c2.position.clone();
    mainGroup.add(c2);

    // Ikatan rangkap tiga C≡C
    mainGroup.add(createBondMesh(c1.position, c2.position, 0.08)); // center
    mainGroup.add(createBondMesh(c1.position.clone().setY(tripleBondOffset), c2.position.clone().setY(tripleBondOffset), 0.08));
    mainGroup.add(createBondMesh(c1.position.clone().setY(-tripleBondOffset), c2.position.clone().setY(-tripleBondOffset), 0.08));

    // Hidrogen
    const h1 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
    h1.position.x = c1.position.x - chBondLength;
    h1.userData.initialPosition = h1.position.clone();
    mainGroup.add(h1, createBondMesh(c1.position, h1.position, 0.08));

    const h2 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
    h2.position.x = c2.position.x + chBondLength;
    h2.userData.initialPosition = h2.position.clone();
    mainGroup.add(h2, createBondMesh(c2.position, h2.position, 0.08));
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
