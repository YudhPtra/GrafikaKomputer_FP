import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js'; 
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const DATA = {
     atoms: {
        H: { 
            name: 'Hidrogen', 
            symbol: 'H', 
            color: 0xffffff,
            atomicNumber: 1,
            atomicMass: "1.008 u",
            description: "Hidrogen adalah atom paling ringan dan unsur paling melimpah di alam semesta."
        },
        C: { 
            name: 'Karbon', 
            symbol: 'C', 
            color: 0x282828,
            atomicNumber: 6,
            atomicMass: "12.011 u",
            description: "Karbon adalah dasar dari semua kehidupan, dapat membentuk ikatan kovalen kompleks."
        },
        O: { 
            name: 'Oksigen', 
            symbol: 'O', 
            color: 0xff0000,
            atomicNumber: 8,
            atomicMass: "15.999 u",
            description: "Oksigen sangat penting untuk respirasi, membentuk 21% atmosfer bumi."
        },
    },
    molecules: {
        // (molekul tetap sama seperti sebelumnya)
        H2O: { 
            name: 'Air (H₂O)', 
            description: 'Molekul polar dengan bentuk tekuk/bent (~104.5°)...'
        },
        CH4: {
            name: 'Metana (CH₄)',
            description: 'Molekul nonpolar dengan bentuk tetrahedral (~109.5°)...'
        },
        CO2: {
            name: 'Karbondioksida (CO₂)',
            description: 'Molekul nonpolar dengan bentuk linear...'
        }
    }
};

// --- INISIALISASI THREE.JS ---
let scene, camera, renderer, controls;
let labelRenderer; 
let mainGroup; 
let defaultFont; 
const canvasContainer = document.getElementById('canvas-container');
let textLabelsToBillboard = []; 

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();



function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a2a3a); 

    camera = new THREE.PerspectiveCamera(75, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
    camera.position.z = 10;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); 
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
    canvasContainer.appendChild(renderer.domElement);
    
    labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.pointerEvents = 'none'; 
    document.body.appendChild(labelRenderer.domElement);

    renderer.domElement.addEventListener('click', onClick, false);


    mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Pencahayaan yang sudah disesuaikan
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5); 
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 3, 100);
    pointLight.position.set(0, 5, 10);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 2048;
    pointLight.shadow.mapSize.height = 2048;
    scene.add(pointLight);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minPolarAngle = 0; 
    controls.maxPolarAngle = Math.PI;
    controls.minAzimuthAngle = -Infinity;
    controls.maxAzimuthAngle = Infinity;

    const fontLoader = new FontLoader();
    fontLoader.load('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/fonts/helvetiker_bold.typeface.json', (font) => {
        defaultFont = font;
        setupUIListeners();
        displayMolecule('H2O'); 
        animate(); 
    });

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();

    textLabelsToBillboard.forEach(label => {
        if (label) {
            label.quaternion.copy(camera.quaternion);
        }
    });

    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}

function clearScene() {
    textLabelsToBillboard = []; 
    while(mainGroup.children.length > 0){ 
        const object = mainGroup.children[0];
        object.traverse(function(node) {
            if (node.isMesh) {
                if (node.geometry) node.geometry.dispose();
                if (node.material) {
                    if (Array.isArray(node.material)) {
                        node.material.forEach(material => material.dispose());
                    } else {
                        node.material.dispose();
                    }
                }
            }
            if (node.isCSS2DObject) {
                node.element.remove();
            }
        });
        mainGroup.remove(object);
    }
}

function updateInfoPanel(title, description) {
    document.getElementById('info-title').textContent = title;
    document.getElementById('info-description').textContent = description;
}

function updateActiveButton(targetButton) {
    document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
    if(targetButton) {
        targetButton.classList.add('active');
    }
}

// --- FUNGSI DRAWING ---

function createAtomMesh(radius, color, symbol, charge = null, chargeColor = 0xffffff) {
    const atomGroup = new THREE.Group();

    const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
    const sphereMaterial = new THREE.MeshPhysicalMaterial({
        color: color,
        transmission: 0.9,
        roughness: 0.3,
        metalness: 0.0,      
        reflectivity: 0.2,
        ior: 1.5,
        thickness: 0.8,
        transparent: true,
        opacity: 0.7,
    });
    const atomSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    atomSphere.castShadow = true;
    atomSphere.receiveShadow = true;
    atomGroup.add(atomSphere);

    // --- IMPORTANT: set userData on the group so clicking text/mesh still identifies the atom ---
    atomGroup.userData = { type: 'atom', symbol: symbol };

    if (defaultFont) {
        const textGroup = new THREE.Group();
        atomGroup.add(textGroup);
        textLabelsToBillboard.push(textGroup);

        const textGeometry = new TextGeometry(symbol, {
            font: defaultFont,
            size: radius * (charge ? 0.6 : 0.8),
            height: 0.1,
            curveSegments: 12,
        });
        textGeometry.center(); 
        
        const textMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xffffff,
            emissive: 0xffffff,
            emissiveIntensity: 0.6,
            depthTest: false,
        });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        if (charge) textMesh.position.y = radius * 0.2;
        textGroup.add(textMesh);

        if (charge) {
            const chargeGeometry = new TextGeometry(charge, {
                font: defaultFont,
                size: radius * 0.5,
                height: 0.05,
                curveSegments: 12,
            });
            chargeGeometry.center();
            
            const chargeMaterial = new THREE.MeshStandardMaterial({ 
                color: chargeColor,
                emissive: chargeColor,
                emissiveIntensity: 0.8,
                depthTest: false,
            });
            const chargeMesh = new THREE.Mesh(chargeGeometry, chargeMaterial);
            chargeMesh.position.y = -radius * 0.35;
            textGroup.add(chargeMesh); 
        }
    }

    return atomGroup;
}



function createBondMesh(pos1, pos2, radius = 0.1) {
     const direction = new THREE.Vector3().subVectors(pos2, pos1);
     const orientation = new THREE.Matrix4();
     orientation.lookAt(pos1, pos2, new THREE.Object3D().up);
     orientation.multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2));
     const geometry = new THREE.CylinderGeometry(radius, radius, direction.length(), 16, 1);
     const bond = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0xcccccc, transparent: true, opacity: 0.4, roughness: 0.8 }));
     bond.castShadow = true;
     bond.receiveShadow = true;
     bond.applyMatrix4(orientation);
     bond.position.copy(pos1).add(direction.multiplyScalar(0.5));
     return bond;
}

function displayMolecule(moleculeKey) {
    clearScene();
    const moleculeData = DATA.molecules[moleculeKey];
    if (!moleculeData) return;

    switch (moleculeKey) {
        case 'H2O':
            drawWater();
            break;
        case 'CH4':
            drawMethane();
            break;
        case 'CO2':
            drawCarbonDioxide();
            break;
        default:
            updateInfoPanel(moleculeData.name, "Visualisasi untuk molekul ini belum diimplementasikan.");
            break;
    }
    
    controls.target.set(0, 0, 0);
    updateInfoPanel(moleculeData.name, moleculeData.description);
}

function drawWater() {
    const o_data = DATA.atoms.O;
    const h_data = DATA.atoms.H;
    
    const o = createAtomMesh(0.8, o_data.color, o_data.symbol, '-', 0xff8888);
    const h1 = createAtomMesh(0.5, h_data.color, h_data.symbol, '+', 0x8888ff);
    const h2 = createAtomMesh(0.5, h_data.color, h_data.symbol, '+', 0x8888ff);

    const angle = 104.5 * Math.PI / 180;
    const bondLength = 2.0;
    
    h1.position.set(bondLength * Math.cos(angle / 2), bondLength * Math.sin(angle / 2), 0);
    h2.position.set(bondLength * Math.cos(angle / 2), -bondLength * Math.sin(angle / 2), 0);
    
    mainGroup.add(o, h1, h2);
    mainGroup.add(createBondMesh(o.position, h1.position, 0.08));
    mainGroup.add(createBondMesh(o.position, h2.position, 0.08));
}

function drawMethane() {
    const c_data = DATA.atoms.C;
    const h_data = DATA.atoms.H;
    const bondLength = 2.5;

    // Metana tidak polar, jadi argumen muatan dihilangkan
    const c = createAtomMesh(0.9, c_data.color, c_data.symbol);
    mainGroup.add(c);

    // Posisi tetrahedral untuk atom Hidrogen
    const positions = [
        new THREE.Vector3(1, 1, 1), 
        new THREE.Vector3(1, -1, -1),
        new THREE.Vector3(-1, 1, -1), 
        new THREE.Vector3(-1, -1, 1),
    ];
    
    positions.forEach(pos => {
        const h = createAtomMesh(0.5, h_data.color, h_data.symbol);
        // Normalisasi vektor posisi lalu kalikan dengan panjang ikatan
        h.position.copy(pos.normalize().multiplyScalar(bondLength));
        mainGroup.add(h);
        mainGroup.add(createBondMesh(c.position, h.position, 0.08));
    });
}

function drawCarbonDioxide() {
    const c_data = DATA.atoms.C;
    const o_data = DATA.atoms.O;
    const bondLength = 2.8;
    const doubleBondOffset = 0.18; 

    const c = createAtomMesh(0.9, c_data.color, c_data.symbol);
    const o1 = createAtomMesh(0.8, o_data.color, o_data.symbol);
    const o2 = createAtomMesh(0.8, o_data.color, o_data.symbol);

    // Posisi linear di sepanjang sumbu x
    o1.position.x = -bondLength;
    o2.position.x = bondLength;
    
    mainGroup.add(c, o1, o2);
    
    // Membuat ikatan rangkap dua untuk C=O pertama
    const bond1_pos_a = c.position.clone().setY(doubleBondOffset);
    const bond1_pos_b = o1.position.clone().setY(doubleBondOffset);
    mainGroup.add(createBondMesh(bond1_pos_a, bond1_pos_b, 0.08));
    
    const bond2_pos_a = c.position.clone().setY(-doubleBondOffset);
    const bond2_pos_b = o1.position.clone().setY(-doubleBondOffset);
    mainGroup.add(createBondMesh(bond2_pos_a, bond2_pos_b, 0.08));

    // Membuat ikatan rangkap dua untuk C=O kedua
    const bond3_pos_a = c.position.clone().setY(doubleBondOffset);
    const bond3_pos_b = o2.position.clone().setY(doubleBondOffset);
    mainGroup.add(createBondMesh(bond3_pos_a, bond3_pos_b, 0.08));

    const bond4_pos_a = c.position.clone().setY(-doubleBondOffset);
    const bond4_pos_b = o2.position.clone().setY(-doubleBondOffset);
    mainGroup.add(createBondMesh(bond4_pos_a, bond4_pos_b, 0.08));
}
function displayAtom(atomKey) {
    clearScene();
    const atomData = DATA.atoms[atomKey];
    if (!atomData) return;

    // Buat satu atom besar
    const atom = createAtomMesh(1.2, atomData.color, atomData.symbol);
    mainGroup.add(atom);

    // Panel info
    const infoText = `
        Nomor Atom: ${atomData.atomicNumber}<br>
        Massa Atom: ${atomData.atomicMass}<br><br>
        ${atomData.description}
    `;
    updateInfoPanel(atomData.name, infoText);

    controls.target.set(0, 0, 0);
    camera.position.set(0, 0, 6);
}


function setupUIListeners() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const type = event.target.dataset.type;
            const key = event.target.dataset.key;
            updateActiveButton(event.target);
            if (type === 'atom') {
                displayAtom(key);
            } else if (type === 'molecule') {
                displayMolecule(key);
            }
        });
    });
}

function onClick(event) {
    // Hitung posisi mouse normalisasi (-1..1)
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    // Cari objek yang kena ray
    const intersects = raycaster.intersectObjects(mainGroup.children, true);

   if (intersects.length > 0) {
    // cari object teratas yang punya userData.type === 'atom'
    let obj = intersects[0].object;
    while (obj && !obj.userData?.type) {
        obj = obj.parent;
    }
    if (obj && obj.userData && obj.userData.type === 'atom') {
        displayAtom(obj.userData.symbol);
    }
}

}


// --- MULAI APLIKASI ---
init();

