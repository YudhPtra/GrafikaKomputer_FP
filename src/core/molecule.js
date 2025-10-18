// Import library Three.js dan modul-modul tambahannya.
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { Sky } from 'three/addons/objects/Sky.js';

// export let mainGroup;
// export function setMainGroup(group) {
//   mainGroup = group;
// }

// DATA: Objek utama yang menyimpan semua informasi tentang atom dan molekul.
const DATA = {
    atoms: {
        H: { 
            name: "Hidrogen", 
            symbol: "H", 
            color: 0xffffff, 
            atomicNumber: 1, 
            atomicMass: "1.008 u", 
            electrons: [1], 
            radius: 0.5, 
            details: [
                { 
                    title: "Kenalan Dulu Yuk!", 
                    content: "<b>Nama Panggilan:</b> Hidrogen<br><b>Simbol Keren:</b> H<br><b>Nomor Absen:</b> 1 (Anak pertama di tabel periodik!)<br><b>Berat:</b> 1.008 u (Paling enteng sedunia!)" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Hidrogen ini si paling simpel dan paling banyak di alam semesta. 🌌 Dia ada di mana-mana, dari matahari sampai di air yang kamu minum. Bisa dibilang, dia ini bahan dasar utama kosmos!" 
                },
                { 
                    title: "Jeroannya Gimana?", 
                    content: "<b>Isi Perut:</b> Cuma 1 proton dan 1 elektron. Minimalis abis!<br><b>Gaya Elektron:</b> 1s¹ (Cuma punya satu elektron buat 'gandengan').<br><b>Saudaranya (Isotop):</b> Punya 2 saudara, si Deuterium yang agak berat, dan si Tritium yang radioaktif." 
                },
                { 
                    title: "Penampilannya Gimana?", 
                    content: "<b>Wujud Asli (sebagai H₂):</b> Gas yang nggak keliatan.<br><b>Suhu Beku:</b> -259.14 °C (Dingin banget! 🥶)<br><b>Sifat:</b> Kalau sendirian (H₂), dia nggak berwarna dan nggak berbau. Jadi jangan harap bisa lihat dia." 
                },
                { 
                    title: "Sifat Kimianya?", 
                    content: "<b>Cara Berteman:</b> Suka banget 'gandengan' sama atom lain pakai ikatan kovalen.<br><b>Kelakuan:</b> Super reaktif! Gampang banget kebakar kalau ketemu oksigen. Makanya sering dipakai buat bahan bakar roket. 🚀" 
                },
                { 
                    title: "Nongkrongnya di Mana?", 
                    content: "<b>Tempat Favorit:</b> Matahari dan bintang-bintang, di dalam molekul air (H₂O), dan jadi 'tulang punggung' di semua makanan yang kamu makan (karbohidrat, protein, dll)." 
                },
                { 
                    title: "Cara Bikinnya Gimana?", 
                    content: "<b>Metode Populer:</b> 'Memecah' air pakai listrik (elektrolisis) atau 'mengambil' hidrogen dari gas alam. Mirip kayak misahin kuning telur dari putihnya, tapi ini versi kimianya." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Di Industri:</b> Bikin pupuk biar tanaman subur, bikin margarin, dan jadi bahan bakar bersih masa depan.<br><b>Di Tubuh Kita:</b> Tanpa dia, nggak ada air. Nggak ada air, ya nggak ada kita! 😉" 
                },
                { 
                    title: "Bahaya Nggak Sih?", 
                    content: "<b>Racun?:</b> Enggak, dia nggak beracun.<br><b>Tapi Awas!:</b> Gampang banget MELEDAK! 🔥 Makanya balon Zeppelin yang isinya hidrogen udah nggak dipakai lagi." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Penemu:</b> Henry Cavendish di tahun 1766.<br><b>Trivia:</b> Hidrogen itu satu-satunya atom yang nggak punya neutron di versi normalnya. Bener-bener si paling simpel!" 
                }
            ]
        },
        C: { 
            name: "Karbon", 
            symbol: "C", 
            color: 0x606060, 
            atomicNumber: 6, 
            atomicMass: "12.011 u", 
            electrons: [2, 4], 
            radius: 0.8, 
            details: [
                { 
                    title: "Kenalan Dulu Yuk!", 
                    content: "<b>Nama Panggilan:</b> Karbon<br><b>Simbol Keren:</b> C<br><b>Nomor Absen:</b> 6<br><b>Berat:</b> 12.011 u" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Karbon adalah 'tulang punggung' dari semua kehidupan di Bumi! 🦴 Dia ini kayak mainan LEGO paling serbaguna di dunia kimia, bisa dirangkai jadi jutaan bentuk molekul yang berbeda, dari plastik sampai DNA." 
                },
                { 
                    title: "Jeroannya Gimana?", 
                    content: "<b>Isi Perut:</b> 6 proton, 6 elektron, 6 neutron (biasanya).<br><b>Gaya Elektron:</b> [He] 2s²2p² (Punya 'empat tangan' buat gandengan, makanya jago banget bikin struktur kompleks).<br><b>Saudaranya (Isotop):</b> Punya saudara radioaktif terkenal, si Karbon-14, yang dipakai ilmuwan buat jadi 'mesin waktu' pengukur umur fosil." 
                },
                { 
                    title: "Penampilannya Gimana?", 
                    content: "<b>Wujud Asli:</b> Padat.<br><b>Sifat:</b> Punya banyak 'kepribadian'! Bisa jadi <b>grafit</b> yang item dan licin (kayak isi pensil), bisa juga jadi <b>intan</b> yang super keras dan bening (kayak di perhiasan). Keren kan? 💍" 
                },
                { 
                    title: "Sifat Kimianya?", 
                    content: "<b>Cara Berteman:</b> Juaranya bikin ikatan kovalen yang stabil. Bisa gandengan sama dirinya sendiri buat bikin rantai panjang atau cincin, dasar dari semua molekul organik." 
                },
                { 
                    title: "Nongkrongnya di Mana?", 
                    content: "<b>Tempat Favorit:</b> Di mana-mana! Di udara sebagai CO₂, di dalam tanah sebagai batubara dan minyak, di lautan, dan tentunya, di dalam semua makhluk hidup (termasuk kamu!)." 
                },
                { 
                    title: "Cara Bikinnya Gimana?", 
                    content: "Karbon nggak 'dibuat', tapi didaur ulang terus-menerus lewat <b>siklus karbon</b>. Tumbuhan mengambil CO₂ dari udara (fotosintesis), kita makan tumbuhan, kita bernapas mengeluarkan CO₂, terus berputar!" 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Di Industri:</b> Bahan bakar fosil, plastik, obat-obatan, serat karbon, tinta, dan masih banyak lagi.<br><b>Di Tubuh Kita:</b> Dia adalah kerangka dari karbohidrat, protein, lemak, dan DNA. Tanpa karbon, kita cuma sekumpulan air dan mineral." 
                },
                { 
                    title: "Bahaya Nggak Sih?", 
                    content: "<b>Racun?:</b> Karbon murni (intan, grafit) sama sekali nggak bahaya.<br><b>Tapi Awas!:</b> Beberapa senyawanya bisa berbahaya, contohnya Karbon Monoksida (CO) yang beracun." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Nama Asal:</b> Dari kata Latin 'carbo', yang artinya arang.<br><b>Trivia:</b> Semua kehidupan yang kita tahu disebut 'kehidupan berbasis karbon' karena kemampuan unik karbon untuk membentuk molekul yang kompleks dan stabil. Dia emang superstar-nya kimia!" 
                }
            ]
        },
        O: { 
            name: "Oksigen", 
            symbol: "O", 
            color: 0xff0000, 
            atomicNumber: 8, 
            atomicMass: "15.999 u", 
            electrons: [2, 6], 
            radius: 0.8, 
            details: [
                { 
                    title: "Kenalan Dulu Yuk!", 
                    content: "<b>Nama Panggilan:</b> Oksigen<br><b>Simbol Keren:</b> O<br><b>Nomor Absen:</b> 8<br><b>Berat:</b> 15.999 u" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Oksigen adalah gas kehidupan! 💨 Dialah alasan kita bisa bernapas dan api bisa menyala. Sekitar 21% udara yang kita hirup itu isinya Oksigen. Tanpa dia, nggak ada pesta barbekyu dan nggak ada kita!" 
                },
                { 
                    title: "Jeroannya Gimana?", 
                    content: "<b>Isi Perut:</b> 8 proton, 8 elektron, 8 neutron.<br><b>Gaya Elektron:</b> [He] 2s²2p⁴ (Punya 6 elektron di kulit luar, jadi dia 'haus' 2 elektron lagi biar stabil. Makanya reaktif banget!).<br><b>Saudaranya (Isotop):</b> Punya beberapa saudara, tapi Oksigen-16 adalah yang paling umum." 
                },
                { 
                    title: "Penampilannya Gimana?", 
                    content: "<b>Wujud Asli (sebagai O₂):</b> Gas yang nggak keliatan.<br><b>Sifat:</b> Nggak berwarna, nggak berbau. Tapi kalau didinginin banget sampai jadi cair, warnanya jadi biru pucat yang cantik. 💧" 
                },
                { 
                    title: "Sifat Kimianya?", 
                    content: "<b>Kelakuan:</b> Super reaktif! Dia ini si 'pengambil elektron' kedua paling jago setelah Fluor. Suka banget 'gandengan' sama hampir semua unsur lain, proses ini disebut <b>oksidasi</b> (contohnya: besi berkarat, apel jadi cokelat)." 
                },
                { 
                    title: "Nongkrongnya di Mana?", 
                    content: "<b>Tempat Favorit:</b> Di udara bebas (sebagai O₂), larut di dalam air (makanya ikan bisa napas), dan terikat di dalam molekul air (H₂O), batuan, dan mineral." 
                },
                { 
                    title: "Cara Bikinnya Gimana?", 
                    content: "<b>Sumber Utama:</b> Dihasilkan oleh tumbuhan, alga, dan cyanobacteria lewat proses <b>fotosintesis</b>. Mereka menghirup CO₂ dan 'menghembuskan' O₂. Terima kasih, tumbuhan! 🌳" 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Di Tubuh Kita:</b> Penting banget buat <b>respirasi seluler</b>, yaitu proses 'membakar' makanan buat jadi energi (ATP).<br><b>Di Industri:</b> Untuk pengelasan baja, terapi medis, pengolahan air, dan bahan bakar roket (sebagai oksidator)." 
                },
                { 
                    title: "Bahaya Nggak Sih?", 
                    content: "<b>Racun?:</b> Enggak, kita butuh dia buat hidup.<br><b>Tapi Awas!:</b> Oksigen murni bisa sangat berbahaya karena bikin api jadi super besar dan nggak terkendali. Pada tekanan tinggi, oksigen murni juga bisa jadi racun buat tubuh." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Penemu:</b> Carl Wilhelm Scheele dan Joseph Priestley (mereka nemuin sendiri-sendiri sekitar tahun 1774).<br><b>Trivia:</b> Api di luar angkasa (tanpa gravitasi) bentuknya bulat, beda sama di Bumi yang runcing ke atas, karena nggak ada aliran udara panas ke atas!" 
                }
            ]
        },
        N: { 
            name: 'Nitrogen', 
            symbol: 'N', 
            color: 0x88aaff, 
            atomicNumber: 7, 
            atomicMass: "14.007 u", 
            electrons: [2, 5], 
            radius: 0.85, 
            details: [
                { 
                    title: "Kenalan Dulu Yuk!", 
                    content: "<b>Nama Panggilan:</b> Nitrogen<br><b>Simbol Keren:</b> N<br><b>Nomor Absen:</b> 7<br><b>Berat:</b> 14.007 u" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Nitrogen ini adalah 'warga mayoritas' di udara kita! Sekitar 78% atmosfer itu isinya dia. Tapi, dia ini agak 'sombong' dan nggak suka sembarangan bergaul sama unsur lain kalau lagi jadi gas N₂." 
                },
                { 
                    title: "Jeroannya Gimana?", 
                    content: "<b>Isi Perut:</b> 7 proton, 7 elektron, 7 neutron.<br><b>Gaya Elektron:</b> [He] 2s²2p³ (Punya 5 elektron di kulit luar, jadi dia cukup fleksibel buat 'gandengan').<br><b>Saudaranya (Isotop):</b> Nitrogen-14 adalah versi yang paling umum sejauh ini." 
                },
                { 
                    title: "Penampilannya Gimana?", 
                    content: "<b>Wujud Asli (sebagai N₂):</b> Gas yang super duper nggak keliatan. Nggak berwarna, nggak berbau, nggak berasa.<br><b>Versi Cair:</b> Kalau didinginkan, jadi <b>nitrogen cair</b> yang ngebul dan dingin banget (-196 °C)! Sering dipakai buat efek asap di panggung." 
                },
                { 
                    title: "Sifat Kimianya?", 
                    content: "<b>Kelakuan (sebagai N₂):</b> Sangat stabil dan malas bereaksi! Kenapa? Karena dua atom nitrogen di gas N₂ itu gandengannya kuat banget pakai <b>ikatan rangkap tiga</b> (N≡N). Susah banget buat dipisahin, kayak pasangan yang udah lengket banget. 끈" 
                },
                { 
                    title: "Nongkrongnya di Mana?", 
                    content: "<b>Tempat Favorit:</b> Paling banyak di atmosfer. Tapi dia juga penting banget di tanah (dalam bentuk nitrat) dan jadi komponen utama di dalam tubuh kita, yaitu di <b>protein</b> dan <b>DNA</b>." 
                },
                { 
                    title: "Cara Bikinnya Gimana?", 
                    content: "<b>Metode Industri:</b> 'Menyaring' udara cair. Udara didinginkan sampai jadi cair, terus dipanaskan pelan-pelan. Karena nitrogen mendidih di suhu yang lebih rendah dari oksigen, dia bakal menguap duluan dan bisa ditangkap." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Di Industri:</b> Bahan utama pembuatan <b>amonia</b> lewat Proses Haber-Bosch, yang kemudian jadi pupuk.<br><b>Sehari-hari:</b> Nitrogen cair buat membekukan makanan atau di dunia medis. Gas nitrogen juga dipakai buat ngisi bungkus keripik biar nggak melempem! 🥔" 
                },
                { 
                    title: "Bahaya Nggak Sih?", 
                    content: "<b>Racun?:</b> Gas N₂ sama sekali nggak beracun.<br><b>Tapi Awas!:</b> Di ruang tertutup, dia bisa 'mendorong' oksigen keluar. Kalau oksigennya habis, kita bisa lemas karena kekurangan napas (asfiksia). Nitrogen cair juga bisa menyebabkan luka bakar dingin yang parah." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Penemu:</b> Daniel Rutherford pada tahun 1772.<br><b>Trivia:</b> Ikatan rangkap tiga pada N₂ adalah salah satu ikatan kovalen terkuat yang ada. Butuh energi setara petir ⚡ untuk bisa memecahnya secara alami!" 
                }
            ]
        },
        P: { 
            name: 'Fosfor', 
            symbol: 'P', 
            color: 0xffa500, 
            atomicNumber: 15, 
            atomicMass: "30.974 u", 
            electrons: [2, 8, 5], 
            radius: 1.3, 
            details: [
                { 
                    title: "Kenalan Dulu Yuk!", 
                    content: "<b>Nama Panggilan:</b> Fosfor<br><b>Simbol Keren:</b> P<br><b>Nomor Absen:</b> 15<br><b>Berat:</b> 30.974 u" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Fosfor adalah elemen api dan kehidupan! 🔥 Dia punya 'kepribadian ganda': satu sisi sangat reaktif dan bisa menyala sendiri di udara, sisi lainnya adalah komponen super penting dalam DNA, tulang, dan molekul energi kita (ATP)." 
                },
                { 
                    title: "Jeroannya Gimana?", 
                    content: "<b>Isi Perut:</b> 15 proton, 15 elektron, 16 neutron.<br><b>Gaya Elektron:</b> [Ne] 3s²3p³ (Punya 5 elektron di kulit luar, siap buat berbagai macam aksi kimia).<br><b>Baju Ganti (Alotrop):</b> Punya banyak 'baju', yang paling terkenal si <b>Fosfor Putih</b> (berbahaya) dan si <b>Fosfor Merah</b> (lebih kalem)." 
                },
                { 
                    title: "Penampilannya Gimana?", 
                    content: "<b>Wujud Asli:</b> Padat.<br><b>Fosfor Putih:</b> Kayak lilin transparan yang agak kekuningan. Seramnya, dia bisa <b>bersinar dalam gelap</b> (chemiluminescence)! ✨<br><b>Fosfor Merah:</b> Bubuk merah gelap yang lebih jinak, ini yang kamu lihat di ujung batang korek api." 
                },
                { 
                    title: "Sifat Kimianya?", 
                    content: "<b>Kelakuan:</b> Si Fosfor Putih ini super temperamental! Gampang banget 'marah' dan bisa kebakar sendiri kalau ketemu udara. Makanya harus disimpen di dalam air. Kalau si Fosfor Merah jauh lebih stabil dan butuh digesek dulu baru mau nyala." 
                },
                { 
                    title: "Nongkrongnya di Mana?", 
                    content: "<b>Tempat Favorit:</b> Dia nggak suka sendirian di alam, jadi selalu gandengan sama oksigen dalam bentuk batuan fosfat.<br><b>Di Tubuh Kita:</b> Dia adalah VIP! Jadi 'tulang punggung' di DNA & RNA, bagian penting dari ATP (baterai sel), dan bikin tulang & gigi kita kuat." 
                },
                { 
                    title: "Cara Bikinnya Gimana?", 
                    content: "Fosfor 'ditambang' dari batuan fosfat. Batuan ini dipanaskan di suhu super tinggi bareng pasir dan karbon di dalam tungku listrik untuk 'memaksa' si fosfor keluar sendirian." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Paling Penting:</b> Sebagai <b>pupuk</b> fosfat! Tanpa dia, pertanian di seluruh dunia bisa gagal.<br><b>Sehari-hari:</b> Ujung batang korek api (fosfor merah), deterjen, dan beberapa jenis minuman soda (dalam bentuk asam fosfat)." 
                },
                { 
                    title: "Bahaya Nggak Sih?", 
                    content: "<b>Racun?:</b> Fosfor Merah relatif aman. TAPI, <b>Fosfor Putih sangat-sangat beracun dan berbahaya!</b> Kalau kena kulit bisa menyebabkan luka bakar parah yang susah sembuh, dan uapnya merusak organ dalam." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Nama Asal:</b> Dari bahasa Yunani 'phosphoros', yang artinya 'Pembawa Cahaya', karena kemampuannya bersinar dalam gelap.<br><b>Sejarah Penemuan:</b> Ditemukan oleh Hennig Brand pada 1669 secara nggak sengaja saat dia mencoba membuat 'Batu Bertuah' (Philosopher's Stone) dengan cara merebus air kencing. 🧪" 
                }
            ]
        },
        S: { 
            name: 'Belerang', 
            symbol: 'S', 
            color: 0xffff00, 
            atomicNumber: 16, 
            atomicMass: "32.06 u", 
            electrons: [2, 8, 6], 
            radius: 1.1, 
            details: [
                { 
                    title: "Kenalan Dulu Yuk!", 
                    content: "<b>Nama Panggilan:</b> Belerang (Sulfur)<br><b>Simbol Keren:</b> S<br><b>Nomor Absen:</b> 16<br><b>Berat:</b> 32.06 u" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Belerang adalah si 'kuning' yang baunya khas! 🌋 Dia ini elemen nonlogam yang sudah dikenal dari zaman kuno, sering diasosiasikan dengan bau telur busuk (walaupun sebenarnya senyawanyalah yang berbau) dan gunung berapi." 
                },
                { 
                    title: "Jeroannya Gimana?", 
                    content: "<b>Isi Perut:</b> 16 proton, 16 elektron, 16 neutron.<br><b>Gaya Elektron:</b> [Ne] 3s²3p⁴ (Sama kayak Oksigen, dia punya 6 elektron di kulit luar, jadi suka banget 'mencari' 2 elektron lagi buat jadi stabil)." 
                },
                { 
                    title: "Penampilannya Gimana?", 
                    content: "<b>Wujud Asli:</b> Padatan kristal.<br><b>Warna Khas:</b> Kuning cerah yang mencolok.<br><b>Sifat:</b> Rapuh, jadi gampang hancur kalau dipukul, dan nggak larut dalam air." 
                },
                { 
                    title: "Sifat Kimianya?", 
                    content: "<b>Kelakuan:</b> Belerang bisa terbakar di udara dengan nyala api biru yang cantik, menghasilkan gas belerang dioksida (SO₂) yang baunya super menyengat dan bikin batuk. 😤 Dia bisa 'gandengan' sama hampir semua unsur." 
                },
                { 
                    title: "Nongkrongnya di Mana?", 
                    content: "<b>Tempat Favorit:</b> Sering banget ditemukan dalam bentuk murninya di dekat gunung berapi dan sumber air panas.<br><b>Di Tubuh Kita:</b> Dia ini komponen penting di beberapa asam amino (batu bata pembangun protein), makanya rambut atau kuku yang terbakar punya bau khas 'belerang'." 
                },
                { 
                    title: "Cara Bikinnya Gimana?", 
                    content: "Kebanyakan belerang sekarang 'dipanen' sebagai produk sampingan dari pengolahan minyak bumi dan gas alam. Proses ini penting untuk menghilangkan senyawa belerang yang bisa menyebabkan hujan asam." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Paling Penting:</b> Hampir semua belerang di dunia dipakai untuk membuat <b>asam sulfat (H₂SO₄)</b>, yang dijuluki 'rajanya bahan kimia' dan super penting untuk bikin pupuk.<br><b>Lainnya:</b> Dipakai dalam pembuatan bubuk mesiu, korek api, dan proses vulkanisasi karet biar ban jadi kuat." 
                },
                { 
                    title: "Bahaya Nggak Sih?", 
                    content: "<b>Racun?:</b> Belerang murni (yang kuning itu) nggak terlalu beracun.<br><b>Tapi Awas!:</b> Banyak senyawanya yang berbahaya! Contohnya, Hidrogen Sulfida (H₂S) yang berbau telur busuk itu sangat beracun, dan Belerang Dioksida (SO₂) adalah polutan udara utama." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Nama Kuno:</b> Dalam teks-teks kuno seperti Alkitab, belerang disebut 'brimstone', sering dikaitkan dengan api dan murka ilahi.<br><b>Trivia:</b> Bau khas bawang putih dan bawang bombay saat dimasak itu disebabkan oleh senyawa-senyawa belerang yang menguap!" 
                }
            ]
        },
        Cl: { 
            name: 'Klorin', 
            symbol: 'Cl', 
            color: 0x88ff88, 
            atomicNumber: 17, 
            atomicMass: "35.45 u", 
            electrons: [2, 8, 7], 
            radius: 1.15, 
            details: [
                { 
                    title: "Kenalan Dulu Yuk!", 
                    content: "<b>Nama Panggilan:</b> Klorin<br><b>Simbol Keren:</b> Cl<br><b>Nomor Absen:</b> 17<br><b>Berat:</b> 35.45 u" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Klorin adalah si 'penjaga kebersihan' di dunia kimia! 🧼 Dialah yang bikin kolam renang aman dari kuman dan air minum kita bebas bakteri. Tapi jangan salah, di balik tugas mulianya, dia ini aslinya gas yang cukup sangar." 
                },
                { 
                    title: "Jeroannya Gimana?", 
                    content: "<b>Isi Perut:</b> 17 proton, 17 elektron, 18 neutron (biasanya).<br><b>Gaya Elektron:</b> [Ne] 3s²3p⁵ (Punya 7 elektron di kulit luar, dia cuma butuh SATU lagi buat jadi sempurna. Makanya dia super agresif dalam 'mencuri' elektron dari atom lain!)." 
                },
                { 
                    title: "Penampilannya Gimana?", 
                    content: "<b>Wujud Asli:</b> Gas.<br><b>Warna Khas:</b> Kuning kehijauan yang pucat.<br><b>Bau:</b> Sangat menyengat dan menyesakkan, mirip bau pemutih pakaian yang kuat." 
                },
                { 
                    title: "Sifat Kimianya?", 
                    content: "<b>Kelakuan:</b> Dia ini salah satu anggota geng Halogen yang super reaktif. Jago banget merebut elektron dari unsur lain untuk membentuk garam, contoh paling terkenalnya adalah saat dia 'mencuri' elektron dari Natrium (Na) buat jadi garam dapur (NaCl)." 
                },
                { 
                    title: "Nongkrongnya di Mana?", 
                    content: "<b>Tempat Favorit:</b> Jarang banget sendirian di alam. Dia paling suka 'nongkrong' di lautan dalam bentuk ion klorida (Cl⁻), yang bikin air laut terasa asin. Dia juga ada di dalam garam batu di bawah tanah." 
                },
                { 
                    title: "Cara Bikinnya Gimana?", 
                    content: "<b>Metode Populer:</b> 'Menyetrum' air garam (larutan NaCl). Proses elektrolisis ini akan memisahkan Natrium Klorida menjadi gas klorin dan natrium hidroksida. Simpel tapi butuh banyak listrik!" 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Paling Penting:</b> Sebagai <b>disinfektan</b> untuk air minum dan kolam renang.<br><b>Sehari-hari:</b> Bahan utama pemutih pakaian (natrium hipoklorit).<br><b>Industri:</b> Bahan baku pembuatan plastik PVC (Pipa paralon itu lho!), pelarut, dan obat-obatan." 
                },
                { 
                    title: "Bahaya Nggak Sih?", 
                    content: "<b>Racun?:</b> Sangat! Gas klorin sangat beracun bagi sistem pernapasan.<br><b>Sejarah Kelam:</b> Karena sifat racunnya, gas klorin pernah digunakan sebagai senjata kimia mengerikan pada Perang Dunia I. 💀" 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Penemu:</b> Carl Wilhelm Scheele pada tahun 1774.<br><b>Trivia:</b> Bau khas 'kaporit' di kolam renang sebenarnya bukan bau klorin murni, melainkan bau senyawa bernama <b>kloramin</b>, yang terbentuk saat klorin bereaksi dengan keringat dan urin. Ups! 🙊" 
                }
            ]
        },
        F: { 
            name: 'Fluor', 
            symbol: 'F', 
            color: 0x90ee90, 
            atomicNumber: 9, 
            atomicMass: "18.998 u", 
            electrons: [2, 7], 
            radius: 0.7, 
            details: [
                { 
                    title: "Kenalan Dulu Yuk!", 
                    content: "<b>Nama Panggilan:</b> Fluorin (Fluor)<br><b>Simbol Keren:</b> F<br><b>Nomor Absen:</b> 9<br><b>Berat:</b> 18.998 u" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Fluorin ini adalah preman paling ditakuti di dunia unsur! 👑 Dia adalah unsur paling <b>elektronegatif</b>, artinya dia paling jago 'mencuri' elektron dari atom lain. Nggak ada yang bisa menolak kemauannya." 
                },
                { 
                    title: "Jeroannya Gimana?", 
                    content: "<b>Isi Perut:</b> 9 proton, 9 elektron, 10 neutron.<br><b>Gaya Elektron:</b> [He] 2s²2p⁵ (Sama kayak Klorin, dia punya 7 elektron di kulit luar dan cuma butuh SATU lagi. Tapi karena ukurannya lebih kecil, daya tariknya jauh lebih ganas!)." 
                },
                { 
                    title: "Penampilannya Gimana?", 
                    content: "<b>Wujud Asli:</b> Gas.<br><b>Warna Khas:</b> Kuning-hijau yang sangat pucat.<br><b>Bau:</b> Super menyengat dan berbahaya, mirip klorin tapi lebih parah." 
                },
                { 
                    title: "Sifat Kimianya?", 
                    content: "<b>Kelakuan:</b> Ekstremis! Dia bereaksi dengan hampir SEMUANYA, bahkan dengan gas mulia yang terkenal sombong dan anti-sosial. Dia bisa membakar air, kaca, dan pasir. Nggak ada yang aman dari amukannya. 🔥" 
                },
                { 
                    title: "Nongkrongnya di Mana?", 
                    content: "<b>Tempat Favorit:</b> Karena super reaktif, dia nggak pernah ditemukan sendirian di alam. Selalu 'mengunci' atom lain dalam senyawa mineral seperti <b>fluorit</b> (CaF₂) dan <b>kriolit</b>." 
                },
                { 
                    title: "Cara Bikinnya Gimana?", 
                    content: "Super susah! Karena dia jago banget merebut elektron, nggak ada unsur kimia lain yang bisa 'memaksanya' melepaskan elektron. Satu-satunya cara adalah dengan <b>elektrolisis</b> (disetrum) dalam kondisi yang sangat sulit dan berbahaya." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Sehari-hari:</b> Senyawa fluorida di dalam <b>pasta gigi</b> membantu mengeraskan email gigi dan mencegah gigi berlubang. 🦷<br><b>Di Dapur:</b> Bahan utama pembuatan <b>Teflon</b>, lapisan anti-lengket di wajan.<br><b>Industri Nuklir:</b> Digunakan untuk memisahkan isotop uranium dalam pembuatan bahan bakar nuklir." 
                },
                { 
                    title: "Bahaya Nggak Sih?", 
                    content: "<b>Racun?:</b> Sangat, sangat, SANGAT berbahaya! Gas fluorin sangat beracun dan korosif. Kontak dengannya bisa menyebabkan luka bakar kimia yang parah dan dalam karena ia bereaksi dengan kalsium di dalam tulang." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Sejarah Kelam:</b> Banyak ilmuwan awal yang mencoba mengisolasinya berakhir sakit parah atau bahkan meninggal, membuatnya dijuluki 'Gas Iblis'.<br><b>Penemu:</b> Akhirnya berhasil diisolasi oleh Henri Moissan pada tahun 1886, yang membuatnya memenangkan Hadiah Nobel." 
                }
            ]
        },
        B: { 
            name: 'Boron', 
            symbol: 'B', 
            color: 0xffa07a, 
            atomicNumber: 5, 
            atomicMass: "10.81 u", 
            electrons: [2, 3], 
            radius: 0.9, 
            details: [
                { 
                    title: "Kenalan Dulu Yuk!", 
                    content: "<b>Nama Panggilan:</b> Boron<br><b>Simbol Keren:</b> B<br><b>Nomor Absen:</b> 5<br><b>Berat:</b> 10.81 u" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Boron ini si 'bingung' dari tabel periodik. Dia bukan logam, tapi juga bukan nonlogam sejati. Dia adalah <b>metaloid</b>, punya sifat di antara keduanya. Kerennya, dia ini salah satu elemen paling keras yang ada!" 
                },
                { 
                    title: "Jeroannya Gimana?", 
                    content: "<b>Isi Perut:</b> 5 proton, 5 elektron, 6 neutron.<br><b>Gaya Elektron:</b> [He] 2s²2p¹ (Cuma punya 3 elektron di kulit luar, jadi dia sering 'kekurangan' elektron. Ini bikin sifat kimianya jadi unik banget!)." 
                },
                { 
                    title: "Penampilannya Gimana?", 
                    content: "<b>Wujud Asli:</b> Padat.<br><b>Warna Khas:</b> Versi kristalnya berwarna hitam dan berkilau. Super keras, hampir sekeras intan!<br><b>Sifat:</b> Nggak gampang menghantarkan listrik kalau lagi dingin, tapi jadi lebih jago kalau dipanaskan (sifat semikonduktor)." 
                },
                { 
                    title: "Sifat Kimianya?", 
                    content: "<b>Kelakuan:</b> Dia ini 'fakir elektron'. Karena cuma punya 3 elektron valensi, dia sering membentuk ikatan yang aneh dan nggak memenuhi aturan oktet (aturan 8 elektron). Dia suka banget 'menerima' sumbangan elektron dari atom lain." 
                },
                { 
                    title: "Nongkrongnya di Mana?", 
                    content: "<b>Tempat Favorit:</b> Nggak pernah sendirian di alam. Dia paling sering ditemukan dalam senyawa mineral seperti <b>boraks</b>, yang mungkin pernah kamu lihat sebagai bubuk pembersih atau pengawet." 
                },
                { 
                    title: "Cara Bikinnya Gimana?", 
                    content: "Boron murni sangat sulit dibuat. Biasanya, senyawanya (seperti boron oksida) direduksi (dipaksa menerima elektron) menggunakan logam reaktif seperti magnesium dalam suhu yang sangat tinggi." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Di Dapur:</b> Sebagai bahan utama <b>kaca Pyrex</b>! Senyawa borosilikat bikin kaca jadi tahan banting sama perubahan suhu ekstrem. 🍳<br><b>Di Industri:</b> Bahan semikonduktor, magnet super kuat (neodymium magnet), dan rompi anti peluru (boron karbida).<br><b>Sehari-hari:</b> Asam borat digunakan sebagai antiseptik ringan atau obat tetes mata." 
                },
                { 
                    title: "Bahaya Nggak Sih?", 
                    content: "<b>Racun?:</b> Boron murni nggak berbahaya.<br><b>Tapi Awas!:</b> Beberapa senyawanya seperti boraks bisa beracun jika tertelan dalam jumlah besar. Makanya jangan dipakai buat pengawet bakso ya! 🍜" 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Warna Api:</b> Kalau senyawa boron dibakar, dia bakal menghasilkan nyala api berwarna <b>hijau terang</b> yang keren banget! Ini sering dipakai di kembang api.<br><b>Trivia:</b> Boron adalah salah satu dari sedikit elemen ringan yang jumlahnya lebih banyak di kerak Bumi daripada di alam semesta secara keseluruhan." 
                }
            ]
        },
        Fe: { 
            name: 'Besi', 
            symbol: 'Fe', 
            color: 0xe67e22, 
            atomicNumber: 26, 
            atomicMass: "55.845 u", 
            electrons: [2, 8, 14, 2], 
            radius: 1.4, 
            details: [
                { 
                    title: "Kenalan Dulu Yuk!", 
                    content: "<b>Nama Panggilan:</b> Besi (Iron)<br><b>Simbol Keren:</b> Fe (dari nama Latin 'Ferrum')<br><b>Nomor Absen:</b> 26<br><b>Berat:</b> 55.845 u" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Besi adalah rajanya logam! 👑 Dia ini logam yang paling umum di Bumi dan jadi tulang punggung peradaban kita, dari pedang kuno sampai gedung pencakar langit. Tanpa dia, dunia modern nggak akan ada." 
                },
                { 
                    title: "Jeroannya Gimana?", 
                    content: "<b>Isi Perut:</b> 26 proton, 26 elektron, 30 neutron.<br><b>Gaya Elektron:</b> [Ar] 3d⁶4s² (Konfigurasinya agak ribet, khas logam transisi yang membuatnya jago gonta-ganti muatan).<br><b>Sifat Unik:</b> Punya sifat <b>feromagnetik</b>, artinya bisa ditarik kuat sama magnet dan bisa dibikin jadi magnet permanen." 
                },
                { 
                    title: "Penampilannya Gimana?", 
                    content: "<b>Wujud Asli:</b> Padat.<br><b>Warna Khas:</b> Abu-abu metalik yang berkilau.<br><b>Sifat:</b> Kuat, ulet (bisa dibentuk), tapi punya satu kelemahan besar: gampang banget <b>berkarat</b> kalau ketemu udara dan air." 
                },
                { 
                    title: "Sifat Kimianya?", 
                    content: "<b>Kelakuan:</b> Cukup reaktif. Dia pelan-pelan bereaksi dengan oksigen di udara lembab untuk membentuk karat (besi oksida). Bisa juga bereaksi dengan banyak asam." 
                },
                { 
                    title: "Nongkrongnya di Mana?", 
                    content: "<b>Tempat Favorit:</b> Paling banyak di inti Bumi! Di kerak bumi, dia 'ditambang' dari batuan mineral seperti <b>hematit</b> dan <b>magnetit</b>.<br><b>Di Tubuh Kita:</b> Super penting! Dia jadi pusat dari molekul <b>hemoglobin</b> di sel darah merah kita, yang tugasnya ngangkut oksigen ke seluruh tubuh." 
                },
                { 
                    title: "Cara Bikinnya Gimana?", 
                    content: "Besi murni diekstraksi dari bijihnya di dalam tungku raksasa yang disebut 'blast furnace'. Bijih besi, kokas (karbon), dan batu kapur dipanaskan di suhu super tinggi untuk 'memaksa' oksigen lepas dari besi." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Paling Penting:</b> Dicampur sedikit karbon buat jadi <b>baja</b>, material konstruksi paling penting di dunia untuk membangun gedung, jembatan, mobil, kapal, rel kereta, dan hampir semuanya!<br><b>Di Tubuh Kita:</b> Mengangkut oksigen. Kekurangan zat besi bisa bikin kita kena anemia (lesu dan pucat)." 
                },
                { 
                    title: "Bahaya Nggak Sih?", 
                    content: "<b>Racun?:</b> Dalam jumlah kecil, sangat penting. Tapi kalau kebanyakan ( overdosis suplemen zat besi), bisa sangat beracun dan merusak organ tubuh.<br><b>Risiko:</b> Karat bisa menyebabkan infeksi tetanus jika masuk ke luka." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Nama Asal:</b> Simbol 'Fe' berasal dari kata Latin 'Ferrum'.<br><b>Trivia:</b> Besi adalah unsur terberat yang bisa diciptakan di dalam inti bintang lewat fusi nuklir. Unsur yang lebih berat dari besi terbentuk lewat ledakan supernova yang dahsyat! 💥" 
                }
            ]
        },
    },
    molecules: {
        H2O: { 
            name: "Air (H₂O)", 
            description: "Molekul polar dengan bentuk tekuk/bent (~104.5°). Fondasi dari semua kehidupan yang kita kenal.", 
            details: [
                { 
                    title: "Kartu Identitas Molekul", 
                    content: "<b>Nama Panggilan:</b> Air<br><b>Nama Resmi (IUPAC):</b> Oksidana<br><b>Rumus:</b> H₂O<br><b>Berat Molekul:</b> 18.015 g/mol" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Air adalah molekul paling superstar di planet ini! 🌍 Dia adalah pelarut universal, pengatur suhu Bumi, dan alasan utama adanya kehidupan. Sekitar 60% dari tubuh kamu itu isinya air, lho." 
                },
                { 
                    title: "Bentuk & Strukturnya", 
                    content: "<b>Bentuk Geometri:</b> Bentuk Tekuk (Bent) dengan sudut ~104.5°.<br><b>Model:</b> Satu atom Oksigen di tengah diapit dua atom Hidrogen, mirip kepala Mickey Mouse.🐭<br><b>Ikatan:</b> Ikatan kovalen polar, di mana Oksigen sedikit 'serakah' menarik elektron, membuatnya sedikit negatif (δ-) dan Hidrogen jadi sedikit positif (δ+)." 
                },
                { 
                    title: "Penampilan Fisiknya", 
                    content: "<b>Wujud:</b> Satu-satunya zat yang ada di Bumi secara alami dalam tiga wujud: padat (es), cair (air), dan gas (uap air).<br><b>Titik Didih:</b> 100 °C<br><b>Titik Beku:</b> 0 °C<br><b>Warna:</b> Bening (tapi lautan terlihat biru karena cara air menyerap dan memantulkan cahaya)." 
                },
                { 
                    title: "Sifat Kimianya", 
                    content: "<b>Kepolaran:</b> Sangat polar! Sifat 'magnet'-nya ini yang bikin dia jago banget melarutkan banyak zat lain, seperti garam dan gula.<br><b>Ikatan Hidrogen:</b> Molekul air suka 'berpelukan' satu sama lain pakai ikatan hidrogen. Inilah yang bikin air punya sifat-sifat aneh dan keren." 
                },
                { 
                    title: "Asalnya dari Mana?", 
                    content: "<b>Sumber Alami:</b> Lautan, sungai, danau, gletser, dan uap air di atmosfer. Air di Bumi terus berputar dalam siklus hidrologi (hujan, penguapan, dst)." 
                },
                { 
                    title: "Gimana Terbentuknya?", 
                    content: "<b>Reaksi Paling Terkenal:</b> Dua molekul hidrogen (H₂) bereaksi dengan satu molekul oksigen (O₂) menghasilkan dua molekul air (2H₂ + O₂ ⟶ 2H₂O). Reaksi ini melepaskan banyak energi, makanya bahan bakar roket sering pakai hidrogen dan oksigen!" 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Untuk Kehidupan:</b> Minum, mandi, memasak, mengangkut nutrisi di dalam tubuh.<br><b>Di Industri:</b> Pelarut, pendingin di pabrik dan pembangkit listrik, dan bahan baku untuk berbagai proses kimia." 
                },
                { 
                    title: "Aman Nggak?", 
                    content: "<b>Toksisitas:</b> Tentu saja tidak beracun! Justru kita nggak bisa hidup tanpanya.<br><b>Dampak:</b> Terlalu banyak atau terlalu sedikit air (banjir atau kekeringan) bisa jadi bencana. Menjaga kebersihan air adalah salah satu tantangan terbesar umat manusia." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Anomali Aneh:</b> Es (padat) lebih ringan daripada air (cair)! Inilah sebabnya es mengapung. Kalau es tenggelam, danau dan laut akan membeku dari bawah ke atas, dan kehidupan akuatik nggak akan bisa bertahan. Jadi, sifat aneh ini super penting!" 
                }
            ]
        },
        O2: { 
            name: "Oksigen (O₂)",
            description: "Molekul diatomik esensial untuk kehidupan aerobik dan pembakaran. Terdiri dari dua atom oksigen yang terikat rangkap dua.",
            details: [
                {
                    title: "Kartu Identitas Molekul",
                    content: "<b>Nama Panggilan:</b> Gas Oksigen<br><b>Rumus:</b> O₂<br><b>Berat Molekul:</b> 31.998 g/mol"
                },
                {
                    title: "Siapakah Dia?",
                    content: "Oksigen (O₂) adalah gas kehidupan! 🌬️ Inilah molekul yang kita hirup setiap detik untuk tetap hidup. Dia juga 'teman'-nya api, tanpa dia nggak akan ada pembakaran."
                },
                {
                    title: "Bentuk & Strukturnya",
                    content: "<b>Bentuk Geometri:</b> Linear (dua atom doang!).<br><b>Model:</b> Dua atom Oksigen gandengan.<br><b>Ikatan:</b> Ikatan kovalen **rangkap dua** (O=O). Uniknya, molekul O₂ ini bersifat **paramagnetik**, artinya dia sedikit tertarik sama medan magnet. Aneh kan?"
                },
                {
                    title: "Penampilan Fisiknya",
                    content: "<b>Wujud:</b> Gas.<br><b>Warna:</b> Tidak berwarna.<br><b>Bau:</b> Tidak berbau.<br><b>Titik Didih:</b> -183 °C.<br><b>Sifat Cair:</b> Oksigen cair berwarna biru pucat dan bersifat magnetik!"
                },
                {
                    title: "Sifat Kimianya",
                    content: "<b>Kelakuan:</b> Sangat reaktif! Dia adalah <b>oksidator</b> kuat kedua setelah Fluorin. Suka banget 'mencuri' elektron dari unsur lain dalam reaksi pembakaran (combustion) dan korosi (karat)."
                },
                {
                    title: "Asalnya dari Mana?",
                    content: "<b>Sumber Utama:</b> Dihasilkan oleh tumbuhan, alga, dan cyanobacteria lewat proses <b>fotosintesis</b>. Mereka adalah 'pabrik' oksigen alami di planet kita. 🌿<br><b>Di Udara:</b> Menyusun sekitar 21% dari atmosfer Bumi."
                },
                {
                    title: "Gimana Terbentuknya?",
                    content: "<b>Fotosintesis:</b> Tumbuhan 'memecah' molekul air (H₂O) menggunakan energi matahari, melepaskan O₂ sebagai 'produk sampingan'. Reaksi sederhananya: 6CO₂ + 6H₂O + Cahaya ⟶ C₆H₁₂O₆ + 6O₂."
                },
                {
                    title: "Gunanya Buat Apa?",
                    content: "<b>Untuk Bernapas:</b> Esensial untuk <b>respirasi seluler</b> pada hewan dan manusia, proses menghasilkan energi (ATP) dari makanan.<br><b>Di Industri:</b> Pembuatan baja, pengelasan (dicampur asetilena), terapi medis (tabung oksigen), pengolahan air limbah, bahan bakar roket (sebagai oksidator cair)."
                },
                {
                    title: "Aman Nggak?",
                    content: "<b>Penting Banget!:</b> Kita nggak bisa hidup tanpanya.<br><b>Tapi Awas!:</b> Oksigen murni bisa sangat berbahaya karena sangat mempercepat pembakaran. Api kecil bisa jadi kebakaran hebat. Menghirup O₂ murni bertekanan tinggi juga bisa beracun (keracunan oksigen)."
                },
                {
                    title: "Fakta Unik!",
                    content: "<b>Kenapa Paramagnetik?:</b> Ini agak rumit, tapi intinya teori ikatan sederhana nggak cukup menjelaskan O₂. Teori Orbital Molekul menunjukkan kalau O₂ punya dua elektron 'jomblo' (tidak berpasangan) yang bikin dia tertarik magnet.<br><b>Oksigen Awal:</b> Dulu banget, atmosfer Bumi hampir nggak punya O₂ bebas. Baru setelah cyanobacteria mulai berfotosintesis miliaran tahun lalu, kadar O₂ mulai naik drastis, peristiwa ini disebut 'Great Oxidation Event'!"
                }
            ]
        },
        CO2: { 
            name: "Karbondioksida (CO₂)", 
            description: "Molekul nonpolar dengan bentuk linear. Gas penting dalam siklus kehidupan dan iklim Bumi.", 
            details: [
                { 
                    title: "Kartu Identitas Molekul", 
                    content: "<b>Nama Panggilan:</b> Karbon Dioksida<br><b>Nama Resmi (IUPAC):</b> Carbon Dioxide<br><b>Rumus:</b> CO₂<br><b>Berat Molekul:</b> 44.01 g/mol" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Karbon dioksida, alias CO₂, adalah gas 'napas' kehidupan. Kita menghembuskannya, dan tumbuhan 'menghirupnya'. Dia juga yang bikin minuman soda jadi meletup-letup! 🥤" 
                },
                { 
                    title: "Bentuk & Strukturnya", 
                    content: "<b>Bentuk Geometri:</b> Lurus Sempurna (Linear).<br><b>Model:</b> Satu atom Karbon di tengah yang 'diapit' oleh dua atom Oksigen. Benar-benar simetris dan seimbang.<br><b>Ikatan:</b> Setiap Oksigen terikat ke Karbon dengan <b>ikatan rangkap dua</b> (O=C=O). Karena bentuknya yang lurus, tarikan elektronnya jadi seimbang dan molekul ini bersifat <b>nonpolar</b>." 
                },
                { 
                    title: "Penampilan Fisiknya", 
                    content: "<b>Wujud:</b> Gas yang tidak terlihat pada suhu dan tekanan normal.<br><b>Titik Sublimasi:</b> -78.5 °C. Dia ini unik, nggak mau meleleh dulu. Dari padat langsung jadi gas! Fenomena ini disebut menyublim.<br><b>Wujud Padat:</b> Bentuk padatnya adalah <b>es kering</b> (*dry ice*), yang super dingin dan sering dipakai buat efek asap panggung yang dramatis." 
                },
                { 
                    title: "Sifat Kimianya", 
                    content: "<b>Kepolaran:</b> Nonpolar.<br><b>Reaktivitas:</b> Cukup stabil. Tapi kalau dilarutkan dalam air, dia bisa bereaksi membentuk asam karbonat (H₂CO₃) yang bersifat asam lemah. Inilah yang memberi sedikit rasa 'gigit' pada minuman bersoda." 
                },
                { 
                    title: "Asalnya dari Mana?", 
                    content: "<b>Sumber Alami:</b> Dihasilkan dari proses pernapasan semua hewan, pembusukan materi organik, letusan gunung berapi, dan pembakaran (kayu, daun, dll).<br><b>Sumber Manusia:</b> Pembakaran bahan bakar fosil (bensin, batubara) adalah penyumbang terbesarnya." 
                },
                { 
                    title: "Gimana Terbentuknya?", 
                    content: "<b>Reaksi Umum:</b> Terbentuk saat senyawa karbon dibakar dengan oksigen yang cukup. Contohnya, saat kita membakar gas alam (metana) di kompor: CH₄ + 2O₂ ⟶ CO₂ + 2H₂O." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Untuk Kehidupan:</b> Makanan utama bagi tumbuhan dalam proses <b>fotosintesis</b>. Mereka mengubah CO₂ jadi gula (energi) dan melepaskan oksigen untuk kita hirup.<br><b>Di Industri:</b> Membuat minuman bersoda (karbonasi), digunakan dalam pemadam api (karena lebih berat dari udara dan tidak mudah terbakar), dan sebagai es kering untuk pendinginan." 
                },
                { 
                    title: "Aman Nggak?", 
                    content: "<b>Toksisitas:</b> Dalam konsentrasi normal di udara, aman banget.<br><b>Tapi Awas!:</b> Kalau konsentrasinya sangat tinggi di ruang tertutup, dia bisa 'mendorong' oksigen keluar dan bikin kita pusing atau bahkan pingsan karena kekurangan oksigen." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Efek Rumah Kaca:</b> CO₂ adalah <b>gas rumah kaca</b> yang paling terkenal. Dia membiarkan cahaya matahari masuk, tapi 'menjebak' panas yang mau keluar, mirip kayak selimut untuk Bumi. Peningkatan kadarnya di atmosfer adalah penyebab utama perubahan iklim.<br><b>Trivia:</b> Tanpa CO₂ sama sekali, suhu rata-rata Bumi bakal jadi super dingin sekitar -18 °C. Jadi, sedikit CO₂ itu penting, tapi kalau kebanyakan jadi masalah!" 
                }
            ]
        },
        NH3: { 
            name: "Amonia (NH₃)", 
            description: "Molekul polar dengan geometri piramida trigonal (~107.8°). Memiliki bau yang tajam dan khas.", 
            details: [
                { 
                    title: "Kartu Identitas Molekul", 
                    content: "<b>Nama Panggilan:</b> Amonia<br><b>Nama Resmi (IUPAC):</b> Azana<br><b>Rumus:</b> NH₃<br><b>Berat Molekul:</b> 17.031 g/mol" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Amonia adalah gas berbau super tajam yang mungkin pernah kamu cium dari produk pembersih lantai atau di lab kimia. Walaupun baunya nggak enak, dia ini salah satu molekul paling penting di dunia industri, lho!" 
                },
                { 
                    title: "Bentuk & Strukturnya", 
                    content: "<b>Bentuk Geometri:</b> Piramida Trigonal. Mirip tripod kamera!<br><b>Model:</b> Satu atom Nitrogen di puncak, dengan tiga atom Hidrogen sebagai 'kaki-kakinya'. Bentuk ini muncul karena ada satu 'pasangan elektron penyendiri' di puncak Nitrogen yang mendorong ikatan ke bawah.<br><b>Ikatan:</b> Ikatan kovalen polar." 
                },
                { 
                    title: "Penampilan Fisiknya", 
                    content: "<b>Wujud:</b> Gas yang nggak berwarna.<br><b>Sifat:</b> Lebih ringan dari udara. Gampang banget larut dalam air, membentuk larutan yang disebut amonium hidroksida." 
                },
                { 
                    title: "Sifat Kimianya", 
                    content: "<b>Sifat Basa:</b> Amonia adalah basa lemah. Saat larut dalam air, dia suka 'mencuri' proton (H⁺) dari air, menghasilkan ion amonium (NH₄⁺) dan ion hidroksida (OH⁻), yang bikin larutannya jadi basa." 
                },
                { 
                    title: "Asalnya dari Mana?", 
                    content: "<b>Sumber Alami:</b> Dihasilkan dari proses pembusukan materi organik (seperti tanaman dan hewan) oleh bakteri.<br><b>Sumber Industri:</b> Diproduksi secara massal lewat <b>Proses Haber-Bosch</b>, sebuah reaksi canggih yang 'memaksa' gas nitrogen dan hidrogen buat bersatu." 
                },
                { 
                    title: "Gimana Terbentuknya?", 
                    content: "Reaksi industrinya adalah N₂ + 3H₂ ⇌ 2NH₃. Reaksi ini butuh tekanan dan suhu super tinggi plus katalis. Penemuan proses ini sangat revolusioner karena memungkinkan produksi pupuk secara besar-besaran." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Paling Penting:</b> Sebagai bahan utama pembuatan <b>pupuk nitrogen</b>. Tanpa amonia, kita nggak akan bisa menanam makanan sebanyak sekarang!<br><b>Lainnya:</b> Sebagai zat pendingin (refrigeran), bahan baku pembuatan nilon, dan dalam produk pembersih rumah tangga." 
                },
                { 
                    title: "Aman Nggak?", 
                    content: "<b>Toksisitas:</b> Beracun dan korosif. Menghirup gasnya dalam konsentrasi tinggi bisa sangat berbahaya bagi paru-paru dan sistem pernapasan.<br><b>Risiko:</b> Larutannya bisa menyebabkan luka bakar kimia pada kulit dan mata." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Bau Khas:</b> Bau tajam yang sering tercium di toilet umum yang kurang bersih itu juga berasal dari amonia, yang dihasilkan oleh bakteri saat mengurai urea dari air seni.<br><b>Di Luar Angkasa:</b> Amonia beku ditemukan di planet-planet luar seperti Jupiter dan Saturnus!" 
                }
            ]
        },
        H2S: { 
            name: "Hidrogen Sulfida (H₂S)", 
            description: "Gas beracun dan mudah terbakar dengan bau khas seperti telur busuk. Bentuknya tekuk/bent (~92.1°).", 
            details: [
                { 
                    title: "Kartu Identitas Molekul", 
                    content: "<b>Nama Panggilan:</b> Gas Telur Busuk, Gas Selokan<br><b>Nama Resmi (IUPAC):</b> Sulfana<br><b>Rumus:</b> H₂S<br><b>Berat Molekul:</b> 34.1 g/mol" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Hidrogen sulfida adalah biang keladi dari bau telur busuk! 🥚 Dia adalah gas yang terbentuk secara alami saat bakteri mengurai bahan organik tanpa oksigen. Walaupun baunya ganggu banget, dia punya peran penting di alam." 
                },
                { 
                    title: "Bentuk & Strukturnya", 
                    content: "<b>Bentuk Geometri:</b> Bentuk Tekuk (Bent) dengan sudut ~92.1°.<br><b>Model:</b> Mirip molekul air, tapi dengan atom Belerang yang lebih besar di tengah. Sudutnya lebih 'lancip' daripada air karena ukuran Belerang yang lebih besar.<br><b>Ikatan:</b> Ikatan kovalen polar." 
                },
                { 
                    title: "Penampilan Fisiknya", 
                    content: "<b>Wujud:</b> Gas yang tidak berwarna.<br><b>Sifat:</b> Lebih berat dari udara, jadi suka 'ngumpul' di area-area rendah seperti selokan atau sumur.<br><b>Bau:</b> Sangat menyengat seperti telur busuk pada konsentrasi rendah." 
                },
                { 
                    title: "Sifat Kimianya", 
                    content: "<b>Keasaman:</b> Merupakan asam yang sangat lemah saat larut dalam air.<br><b>Reaktivitas:</b> Mudah terbakar di udara, menghasilkan nyala api biru dan membentuk belerang dioksida (SO₂). Juga bisa membuat perak jadi kusam dan hitam." 
                },
                { 
                    title: "Asalnya dari Mana?", 
                    content: "<b>Sumber Alami:</b> Rawa-rawa, selokan, gunung berapi, dan sumber air panas. Juga diproduksi dalam usus kita, yang jadi salah satu penyebab bau kentut! 💨<br><b>Sumber Industri:</b> Produk sampingan dari pemurnian minyak bumi dan gas alam." 
                },
                { 
                    title: "Gimana Terbentuknya?", 
                    content: "<b>Reaksi Lab:</b> Cara klasiknya adalah dengan mereaksikan bongkahan besi(II) sulfida dengan asam kuat. Reaksinya: FeS + 2HCl ⟶ FeCl₂ + H₂S. Langsung deh keluar bau telur busuknya." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Di Industri:</b> Sumber utama untuk produksi belerang murni dan asam sulfat.<br><b>Di Lab:</b> Digunakan sebagai pereaksi dalam analisis kimia kualitatif untuk memisahkan ion-ion logam.<br><b>Di Tubuh (dosis super kecil):</b> Ternyata punya peran sebagai molekul sinyal yang mengatur tekanan darah dan peradangan." 
                },
                { 
                    title: "Aman Nggak?", 
                    content: "<b>Toksisitas:</b> Sangat beracun, setara dengan sianida! ☠️<br><b>Risiko Tersembunyi:</b> Bahayanya, pada konsentrasi tinggi, H₂S bisa langsung <b>melumpuhkan indra penciuman</b>. Kamu jadi nggak bisa mencium baunya lagi dan nggak sadar kalau kamu sedang menghirup gas beracun. Ini jebakan yang mematikan." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Bau Khas:</b> Bau telur busuk yang sangat spesifik itu bisa terdeteksi oleh hidung manusia bahkan dalam konsentrasi yang sangat-sangat rendah, jauh di bawah ambang batas berbahayanya. Ini semacam sistem peringatan dini alami buat kita." 
                }
            ]
        },
        H2O2: { 
            name: "Hidrogen Peroksida (H₂O₂)", 
            description: "Senyawa peroksida paling sederhana dengan bentuk 3D 'gauche' yang unik, mirip seperti buku yang terbuka. Oksidator kuat.", 
            details: [
                { 
                    title: "Kartu Identitas Molekul", 
                    content: "<b>Nama Panggilan:</b> Hidrogen Peroksida<br><b>Nama Resmi (IUPAC):</b> Dihidrogen Dioksida<br><b>Rumus:</b> H₂O₂<br><b>Berat Molekul:</b> 34.014 g/mol" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Hidrogen peroksida ini ibarat 'sepupu super' dari air. 🦸‍♀️ Rumusnya H₂O₂, cuma beda satu oksigen dari air (H₂O), tapi tambahan satu oksigen itu bikin dia jadi super reaktif dan punya banyak kegunaan keren (dan berbahaya!)." 
                },
                { 
                    title: "Bentuk & Strukturnya", 
                    content: "<b>Bentuk Geometri:</b> Gauche (dibaca: 'gosh'). Bentuknya nggak lurus atau datar, tapi mirip <b>buku yang sedang terbuka</b>. Unik banget!<br><b>Model:</b> Dua atom Hidrogen dan dua atom Oksigen yang terhubung H-O-O-H.<br><b>Ikatan:</b> Ikatan kovalen polar." 
                },
                { 
                    title: "Penampilan Fisiknya", 
                    content: "<b>Wujud:</b> Cairan bening.<br><b>Sifat:</b> Sedikit lebih kental (lebih 'syrupy') daripada air biasa.<br><b>Warna:</b> Tidak berwarna, tapi dalam jumlah besar bisa terlihat agak kebiruan." 
                },
                { 
                    title: "Sifat Kimianya", 
                    content: "<b>Kelakuan:</b> Sifatnya nggak stabil dan gampang banget terurai jadi air dan gas oksigen (2H₂O₂ ⟶ 2H₂O + O₂). Dia adalah <b>oksidator kuat</b>, artinya jago banget 'mencuri' elektron dari zat lain, yang bikin dia jadi pemutih dan pembersih yang efektif." 
                },
                { 
                    title: "Asalnya dari Mana?", 
                    content: "<b>Sumber Alami:</b> Diproduksi dalam jumlah kecil di atmosfer dan di dalam tubuh kita sebagai produk sampingan metabolisme.<br><b>Sumber Industri:</b> Dibuat secara massal melalui proses antrakuinon yang cukup rumit." 
                },
                { 
                    title: "Gimana Terbentuknya?", 
                    content: "Di lab, bisa dibuat dengan mereaksikan barium peroksida dengan asam sulfat. Tapi cara ini udah kuno dan nggak efisien untuk produksi besar." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Di Kotak P3K:</b> Larutan 3% dipakai sebagai <b>antiseptik</b> buat membersihkan luka. Buih yang muncul itu adalah gas oksigen yang dilepaskan! 🧼<br><b>Di Salon:</b> Sebagai bahan utama untuk <b>memutihkan rambut</b> (bleaching).<br><b>Di Luar Angkasa:</b> Dalam konsentrasi super tinggi (>70%), dipakai sebagai <b>bahan bakar roket</b>!" 
                },
                { 
                    title: "Aman Nggak?", 
                    content: "<b>Tergantung Konsentrasi:</b> Larutan 3% di apotek relatif aman. <br><b>Tapi Awas!:</b> Konsentrasi yang lebih tinggi (>30%) sangat korosif dan bisa menyebabkan luka bakar kimia parah pada kulit. Bisa juga meledak jika tidak ditangani dengan benar." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Hewan Super:</b> Kumbang Pengebom (Bombardier Beetle) menyimpan hidrogen peroksida di dalam perutnya. Saat terancam, dia mencampurnya dengan zat lain untuk memicu reaksi kimia eksplosif yang menyemprotkan cairan panas dan beracun ke musuhnya! 🪲💨" 
                }
            ]
        },
        HCl: { 
            name: "Asam Klorida (HCl)", 
            description: "Molekul diatomik yang sangat polar. Dalam larutan air, ia menjadi asam kuat.", 
            details: [
                { 
                    title: "Kartu Identitas Molekul", 
                    content: "<b>Nama Panggilan:</b> Asam Klorida (cairan), Hidrogen Klorida (gas)<br><b>Rumus:</b> HCl<br><b>Berat Molekul:</b> 36.46 g/mol" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Asam klorida adalah salah satu 'preman' di dunia asam! 😠 Dia ini asam kuat yang sangat korosif. Hebatnya, versi encernya ada di dalam lambung kita dan bertugas buat mencerna makanan." 
                },
                { 
                    title: "Bentuk & Strukturnya", 
                    content: "<b>Bentuk Geometri:</b> Linear (ya iyalah, cuma dua atom! 😂).<br><b>Model:</b> Satu atom Hidrogen 'gandengan' sama satu atom Klorin.<br><b>Ikatan:</b> Ikatan kovalen yang sangat polar. Klorin jauh lebih 'serakah' elektron daripada Hidrogen, jadi elektronnya lebih banyak ngumpul di dekat Klorin." 
                },
                { 
                    title: "Penampilan Fisiknya", 
                    content: "<b>Wujud Gas:</b> Gas tidak berwarna yang 'berasap' di udara lembab.<br><b>Wujud Cairan (Asam):</b> Cairan bening tidak berwarna yang sangat korosif." 
                },
                { 
                    title: "Sifat Kimianya", 
                    content: "<b>Sifat Asam:</b> Dia ini <b>asam kuat</b>. Artinya, kalau dilarutkan dalam air, hampir semua molekul HCl langsung 'putus' jadi ion H⁺ (pembawa sifat asam) dan ion Cl⁻. pH-nya bisa sangat rendah (sangat asam)." 
                },
                { 
                    title: "Asalnya dari Mana?", 
                    content: "<b>Di Alam:</b> Ditemukan dalam gas vulkanik.<br><b>Di Tubuh Kita:</b> Diproduksi oleh sel-sel di dinding lambung kita sebagai <b>asam lambung</b> untuk membantu memecah protein dan membunuh bakteri jahat di makanan." 
                },
                { 
                    title: "Gimana Terbentuknya?", 
                    content: "<b>Di Industri:</b> Biasanya dibuat dengan membakar gas hidrogen (H₂) dan gas klorin (Cl₂) bersamaan. Ledakan kecil yang terkendali!<br><b>Di Lab:</b> Bisa dibuat dengan mereaksikan garam dapur (NaCl) dengan asam sulfat (H₂SO₄)." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Di Industri:</b> Super penting! Dipakai untuk 'membersihkan' karat dari baja sebelum diproses lebih lanjut, produksi gelatin, dan mengatur keasaman (pH) di berbagai proses kimia.<br><b>Di Rumah:</b> Ada di beberapa produk pembersih toilet yang kuat (tapi hati-hati!)." 
                },
                { 
                    title: "Aman Nggak?", 
                    content: "<b>Bahaya?:</b> Sangat! ☠️ Cairannya bisa menyebabkan luka bakar kimia parah pada kulit. Uapnya sangat berbahaya jika terhirup, bisa merusak paru-paru.<br><b>Aturan Pakai:</b> Wajib pakai kacamata pelindung, sarung tangan, dan bekerja di ruangan dengan ventilasi super bagus." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Super Power Lambung:</b> Asam lambung kita itu pH-nya sekitar 1.5 sampai 3.5, cukup kuat untuk melarutkan paku besi (walaupun butuh waktu lama!). Hebatnya, lambung kita nggak ikut 'tercerna' karena punya lapisan lendir tebal yang melindunginya." 
                }
            ]
        },
        O3: { 
            name: "Ozon (O₃)", 
            description: "Molekul triatomik dengan bentuk tekuk (~117°). Alotrop dari oksigen yang punya peran ganda.", 
            details: [
                { 
                    title: "Kartu Identitas Molekul", 
                    content: "<b>Nama Panggilan:</b> Ozon<br><b>Rumus:</b> O₃<br><b>Berat Molekul:</b> 48.00 g/mol" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Ozon adalah Oksigen (O₂) yang 'ketempelan' satu atom oksigen lagi. Tambahan satu atom ini bikin dia jadi super reaktif dan punya 'kepribadian ganda': di atas langit dia pahlawan, tapi di dekat kita dia jadi penjahat." 
                },
                { 
                    title: "Bentuk & Strukturnya", 
                    content: "<b>Bentuk Geometri:</b> Bentuk Tekuk (Bent) dengan sudut ~117°.<br><b>Model:</b> Tiga atom Oksigen membentuk huruf V.<br><b>Ikatan:</b> Ikatan <b>resonansi</b>. Bayangin ini kayak ikatan 1,5 (satu setengah), bukan ikatan tunggal atau rangkap dua murni. Ini yang bikin kedua ikatannya sama kuat dan sama panjang." 
                },
                { 
                    title: "Penampilan Fisiknya", 
                    content: "<b>Wujud:</b> Gas.<br><b>Warna:</b> Biru pucat (tapi di atmosfer konsentrasinya terlalu rendah untuk bisa kelihatan).<br><b>Bau:</b> Bau 'bersih' dan tajam yang khas. Kamu bisa menciumnya setelah ada petir besar. ⚡" 
                },
                { 
                    title: "Sifat Kimianya", 
                    content: "<b>Kelakuan:</b> Sangat reaktif dan merupakan oksidator yang jauh lebih kuat daripada Oksigen biasa. Dia gampang banget 'nyerahin' atom oksigen ketiganya ke molekul lain, makanya dia jago banget membunuh kuman dan menghilangkan bau." 
                },
                { 
                    title: "Asalnya dari Mana?", 
                    content: "<b>Di Atas Langit:</b> Terbentuk secara alami di <b>stratosfer</b> saat radiasi ultraviolet (UV) dari matahari memecah O₂. Ozon yang terkumpul ini membentuk <b>lapisan ozon</b>.<br><b>Di Bawah Sini:</b> Terbentuk di dekat permukaan tanah saat polusi dari knalpot kendaraan dan industri bereaksi dengan sinar matahari." 
                },
                { 
                    title: "Gimana Terbentuknya?", 
                    content: "<b>Proses Alam:</b> Sinar UV memecah O₂ menjadi 2 atom O. Satu atom O yang 'jomblo' ini kemudian nempel ke molekul O₂ lain, jadilah O₃. Petir juga bisa melakukan hal yang sama!" 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Sebagai Pahlawan (di Stratosfer):</b> Lapisan ozon bertindak kayak <b>kacamata hitam raksasa</b> untuk Bumi, menyerap sebagian besar radiasi UV-B yang berbahaya dari matahari dan melindungi kita dari kanker kulit. 😎<br><b>Sebagai Pembersih (di Industri):</b> Digunakan untuk mensterilkan air minum, membersihkan udara, dan menghilangkan bau." 
                },
                { 
                    title: "Aman Nggak?", 
                    content: "<b>Sebagai Penjahat (di Permukaan Tanah):</b> Sangat berbahaya! Ozon adalah polutan utama dalam 'smog' (kabut asap). Menghirupnya bisa merusak paru-paru dan memicu serangan asma." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Bau Hujan:</b> Bau segar yang khas setelah badai petir itu sebenarnya adalah bau ozon yang baru terbentuk di udara.<br><b>Lubang Ozon:</b> Pada tahun 80-an, ilmuwan menemukan 'lubang' di lapisan ozon yang disebabkan oleh bahan kimia buatan manusia (CFC). Berkat kerjasama internasional (Protokol Montreal), penggunaan CFC dilarang dan lapisan ozon perlahan-lahan pulih. Kemenangan besar untuk sains dan kemanusiaan!" 
                }
            ]
        },
        SF6: { 
            name: "Belerang Heksafluorida (SF₆)", 
            description: "Gas inert dengan geometri oktahedral yang sempurna. Merupakan gas rumah kaca yang sangat poten.", 
            details: [
                { 
                    title: "Kartu Identitas Molekul", 
                    content: "<b>Nama Panggilan:</b> SF6<br><b>Nama Resmi (IUPAC):</b> Sulfur Hexafluoride<br><b>Rumus:</b> SF₆<br><b>Berat Molekul:</b> 146.06 g/mol" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "SF₆ adalah molekul super simetris dan super 'mager'. Dia ini gas yang sangat stabil dan nggak suka bereaksi sama sekali. Tapi yang paling terkenal, dia super padat dan bisa bikin suaramu jadi kayak suara monster! 👹" 
                },
                { 
                    title: "Bentuk & Strukturnya", 
                    content: "<b>Bentuk Geometri:</b> Oktahedral Sempurna.<br><b>Model:</b> Satu atom Belerang di pusat, dikelilingi oleh enam atom Fluor di setiap arah (atas, bawah, kiri, kanan, depan, belakang). Bentuknya simetris banget!<br><b>Ikatan:</b> Ikatan kovalen polar, tapi karena bentuknya yang super simetris, molekulnya jadi <b>nonpolar</b> secara keseluruhan." 
                },
                { 
                    title: "Penampilan Fisiknya", 
                    content: "<b>Wujud:</b> Gas yang tidak terlihat.<br><b>Sifat:</b> Tidak berwarna, tidak berbau, tidak berasa, dan tidak beracun.<br><b>Super Padat:</b> Dia ini salah satu gas terberat, sekitar 5 kali lebih padat daripada udara. Kalau kamu tuang ke akuarium, dia bakal 'menggenang' di dasar." 
                },
                { 
                    title: "Sifat Kimianya", 
                    content: "<b>Kelakuan:</b> Super duper males! Dia adalah salah satu gas yang paling <b>inert</b> (tidak reaktif) yang diketahui. Enam atom Fluor yang 'menjaga' atom Belerang di tengah membuatnya susah banget buat 'diserang' oleh molekul lain." 
                },
                { 
                    title: "Asalnya dari Mana?", 
                    content: "<b>Sumber:</b> Dia ini murni buatan manusia, nggak ada di alam. SF₆ dibuat untuk kebutuhan industri." 
                },
                { 
                    title: "Gimana Terbentuknya?", 
                    content: "Dibuat dengan mereaksikan langsung lelehan belerang dengan gas fluorin. Reaksinya: S + 3F₂ ⟶ SF₆. Prosesnya harus dikontrol dengan hati-hati karena gas fluorin sangat reaktif." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Paling Penting:</b> Sebagai <b>isolator listrik</b> di peralatan tegangan tinggi seperti di gardu listrik. Sifatnya yang inert dan nggak menghantarkan listrik membuatnya sempurna untuk mencegah korsleting dan ledakan.<br><b>Di Medis:</b> Pernah digunakan dalam operasi mata untuk membantu memperbaiki retina." 
                },
                { 
                    title: "Aman Nggak?", 
                    content: "<b>Toksisitas:</b> Tidak beracun.<br><b>Tapi Awas!:</b> Sama seperti nitrogen, dia bisa menggantikan oksigen di ruang tertutup dan menyebabkan sesak napas (asfiksia).<br><b>Dampak Lingkungan:</b> Ini masalah besarnya! SF₆ adalah <b>gas rumah kaca paling poten</b> yang pernah diukur, sekitar 23.500 kali lebih kuat dalam 'menjebak' panas daripada CO₂. Sekali lepas ke atmosfer, dia bisa bertahan di sana selama ribuan tahun." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Suara Monster:</b> Kalau helium bikin suara jadi cempreng karena lebih ringan dari udara, SF₆ melakukan kebalikannya! Menghirupnya (<b>JANGAN DICOBA, BERBAHAYA!</b>) akan membuat suaramu jadi super berat dan dalam karena gas ini jauh lebih padat dari udara.<br><b>Perahu Mengapung:</b> Kamu bisa membuat perahu kecil dari aluminium foil dan 'mengapungkannya' di atas gas SF₆ yang tidak terlihat di dalam akuarium. Keren banget!" 
                }
            ]
        },
        PH3: { 
            name: "Fosfin (PH₃)", 
            description: "Gas tidak berwarna dan sangat beracun dengan struktur piramida trigonal. Berbau seperti bawang putih atau ikan busuk.", 
            details: [
                { 
                    title: "Kartu Identitas Molekul", 
                    content: "<b>Nama Panggilan:</b> Fosfin<br><b>Nama Resmi (IUPAC):</b> Fosfana<br><b>Rumus:</b> PH₃<br><b>Berat Molekul:</b> 33.99 g/mol" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Fosfin adalah 'kembaran' Amonia (NH₃) dari dunia Fosfor. Bentuknya mirip, tapi kelakuannya jauh lebih berbahaya. Dia ini gas super beracun dengan bau yang sangat tidak enak, antara bau bawang putih busuk dan ikan mati. 🐟" 
                },
                { 
                    title: "Bentuk & Strukturnya", 
                    content: "<b>Bentuk Geometri:</b> Piramida Trigonal.<br><b>Model:</b> Sama seperti Amonia, satu atom Fosfor di puncak dengan tiga atom Hidrogen sebagai 'kaki-kakinya'. Bentuk ini juga disebabkan oleh adanya pasangan elektron penyendiri di puncak." 
                },
                { 
                    title: "Penampilan Fisiknya", 
                    content: "<b>Wujud:</b> Gas yang tidak berwarna.<br><b>Sifat:</b> Sedikit lebih padat dari udara.<br><b>Bau:</b> Sangat tidak menyenangkan, seperti bawang putih atau ikan busuk." 
                },
                { 
                    title: "Sifat Kimianya", 
                    content: "<b>Kelakuan:</b> Sangat mudah terbakar! Kalau ada sedikit pengotor (diphosphane, P₂H₄), dia bisa <b>menyala secara spontan</b> di udara. Bener-bener gas yang temperamental." 
                },
                { 
                    title: "Asalnya dari Mana?", 
                    content: "<b>Sumber Alami:</b> Terbentuk dalam jumlah kecil di lingkungan yang sangat minim oksigen, seperti rawa-rawa dan tumpukan pupuk kandang, dari aktivitas bakteri anaerobik." 
                },
                { 
                    title: "Gimana Terbentuknya?", 
                    content: "<b>Di Lab:</b> Bisa dibuat dengan mereaksikan fosfor putih dengan basa kuat seperti natrium hidroksida. Ini adalah reaksi yang cukup berbahaya." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Paling Penting:</b> Sebagai <b>fumigan</b> (pestisida dalam bentuk gas). Fosfin digunakan untuk membasmi serangga dan hama di dalam silo penyimpanan biji-bijian (gandum, jagung) tanpa merusak biji-bijian itu sendiri.<br><b>Industri Elektronik:</b> Digunakan sebagai sumber fosfor dalam pembuatan semikonduktor." 
                },
                { 
                    title: "Aman Nggak?", 
                    content: "<b>Toksisitas:</b> Sangat-sangat beracun! ☠️ Menghirupnya bahkan dalam konsentrasi rendah bisa fatal. Gas ini menyerang sistem saraf pusat dan paru-paru.<br><b>Risiko:</b> Karena bisa menyala spontan, risiko kebakaran dan ledakannya juga tinggi." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Heboh di Planet Venus:</b> Pada tahun 2020, para ilmuwan mengumumkan deteksi gas fosfin di atmosfer Venus. Ini bikin heboh karena di Bumi, fosfin sering dikaitkan dengan kehidupan mikroba. Penemuan ini memicu perdebatan sengit tentang kemungkinan adanya 'kehidupan di awan' Venus, walaupun sekarang banyak yang meragukannya. 👽" 
                }
            ]
        },
        CO: { 
            name: "Karbon Monoksida (CO)", 
            description: "Gas beracun dengan ikatan rangkap tiga. Dihasilkan dari pembakaran tidak sempurna.", 
            details: [
                { 
                    title: "Kartu Identitas Molekul", 
                    content: "<b>Nama Panggilan:</b> Karbon Monoksida<br><b>Nama Resmi (IUPAC):</b> Carbon Monoxide<br><b>Rumus:</b> CO<br><b>Berat Molekul:</b> 28.01 g/mol" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Karbon monoksida adalah 'pembunuh diam-diam'. 🤫 Dia ini gas super beracun yang nggak punya bau, warna, ataupun rasa. Dia muncul saat ada pembakaran yang nggak sempurna, kayak dari knalpot kendaraan atau pemanas yang rusak." 
                },
                { 
                    title: "Bentuk & Strukturnya", 
                    content: "<b>Bentuk Geometri:</b> Linear (pastinya, kan cuma dua atom!).<br><b>Model:</b> Satu atom Karbon gandengan super erat sama satu atom Oksigen.<br><b>Ikatan:</b> Ikatan <b>kovalen rangkap tiga</b> (C≡O). Ikatan ini kuat banget dan punya sedikit 'drama' muatan formal yang bikin dia unik." 
                },
                { 
                    title: "Penampilan Fisiknya", 
                    content: "<b>Wujud:</b> Gas.<br><b>Sifat:</b> Tidak berwarna, tidak berbau, tidak berasa. Inilah yang membuatnya sangat berbahaya, karena kita nggak sadar kalau dia ada di sekitar kita." 
                },
                { 
                    title: "Sifat Kimianya", 
                    content: "<b>Kelakuan:</b> Jago banget 'nempel' ke logam, terutama Besi (Fe). Sifat inilah yang jadi dasar dari mekanisme racunnya di dalam tubuh." 
                },
                { 
                    title: "Asalnya dari Mana?", 
                    content: "<b>Sumber Utama:</b> Pembakaran tidak sempurna bahan bakar fosil. Sumber utamanya adalah <b>asap knalpot kendaraan bermotor</b>.<br><b>Sumber Lain:</b> Asap rokok, kompor gas yang tidak berfungsi baik, dan kebakaran hutan." 
                },
                { 
                    title: "Gimana Terbentuknya?", 
                    content: "Terbentuk saat bahan bakar karbon (bensin, kayu, gas) dibakar tapi jumlah oksigennya kurang. Reaksinya: 2C + O₂ ⟶ 2CO. Kalau oksigennya cukup, harusnya jadi CO₂ yang lebih aman." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Di Industri:</b> Meskipun beracun, dia sangat berguna! Dipakai sebagai bahan bakar gas dan sebagai <b>agen pereduksi</b> untuk 'mencuri' oksigen dari bijih logam dalam proses pemurnian besi dan logam lainnya." 
                },
                { 
                    title: "Aman Nggak?", 
                    content: "<b>Toksisitas:</b> Sangat-sangat beracun! ☠️<br><b>Mekanisme Racun:</b> CO 'menipu' hemoglobin di sel darah merah kita. Hemoglobin jadi lebih suka ngikat CO (sekitar 240x lebih kuat!) daripada Oksigen. Akibatnya, tubuh kita jadi kekurangan oksigen, yang bisa berakibat fatal." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Peringatan Dini:</b> Burung kenari dulu sering dibawa masuk ke dalam tambang batubara. Karena burung lebih sensitif terhadap CO, kalau burungnya pingsan, itu jadi tanda bagi para penambang untuk segera keluar.<br><b>Di Luar Angkasa:</b> Karbon monoksida adalah salah satu molekul paling umum di medium antarbintang, dan sangat penting dalam pembentukan bintang baru." 
                }
            ]
        },
        BF3: { 
            name: "Boron Trifluorida (BF₃)", 
            description: "Molekul trigonal planar sempurna. Contoh klasik pengecualian aturan oktet.", 
            details: [
                { 
                    title: "Kartu Identitas Molekul", 
                    content: "<b>Nama Panggilan:</b> Boron Trifluorida<br><b>Nama Resmi (IUPAC):</b> Trifluoroborane<br><b>Rumus:</b> BF₃<br><b>Berat Molekul:</b> 67.81 g/mol" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "BF₃ adalah molekul yang 'melanggar aturan'! 🤓 Dia ini terkenal di dunia kimia karena atom Boron di tengahnya nggak patuh sama aturan oktet (aturan 8 elektron). Bentuknya yang super datar dan simetris juga keren banget." 
                },
                { 
                    title: "Bentuk & Strukturnya", 
                    content: "<b>Bentuk Geometri:</b> Trigonal Planar (Segitiga Datar Sempurna).<br><b>Model:</b> Satu atom Boron di tengah, dikelilingi tiga atom Fluor yang membentuk segitiga sama sisi dengan sudut persis 120°.<br><b>Ikatan:</b> Ikatan kovalen polar, tapi karena bentuknya yang super simetris, molekulnya jadi <b>nonpolar</b>." 
                },
                { 
                    title: "Penampilan Fisiknya", 
                    content: "<b>Wujud:</b> Gas yang tidak berwarna.<br><b>Bau:</b> Bau yang tajam dan menyesakkan.<br><b>Sifat:</b> 'Berasap' di udara lembab karena bereaksi dengan uap air." 
                },
                { 
                    title: "Sifat Kimianya", 
                    content: "<b>Kelakuan:</b> Dia ini 'fakir elektron' akut! Karena Boron cuma punya 6 elektron di sekelilingnya, dia super 'lapar' dan suka banget <b>menerima sumbangan pasangan elektron</b> dari molekul lain. Sifat ini membuatnya jadi <b>Asam Lewis</b> yang sangat kuat." 
                },
                { 
                    title: "Asalnya dari Mana?", 
                    content: "<b>Sumber:</b> Murni buatan manusia. Dia terlalu reaktif untuk bisa ada sendirian di alam bebas." 
                },
                { 
                    title: "Gimana Terbentuknya?", 
                    content: "Dibuat dengan mereaksikan boron oksida dengan hidrogen fluorida. Reaksinya: B₂O₃ + 6HF ⟶ 2BF₃ + 3H₂O." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Paling Penting:</b> Sebagai <b>katalis</b> super serbaguna dalam industri kimia. Sifat 'lapar elektron'-nya ini dipakai untuk mempercepat berbagai macam reaksi sintesis organik, mirip mak comblang di dunia molekul." 
                },
                { 
                    title: "Aman Nggak?", 
                    content: "<b>Toksisitas:</b> Sangat beracun dan korosif. ☠️<br><b>Risiko:</b> Bereaksi hebat dengan air menghasilkan asam yang berbahaya. Menghirup gasnya bisa merusak paru-paru secara serius." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Si Pelanggar Aturan:</b> BF₃ adalah contoh 'poster' untuk molekul yang tidak mematuhi aturan oktet. Ini bukti bahwa di kimia, selalu ada pengecualian yang menarik!<br><b>Kontras Keren:</b> Bandingkan dia dengan Amonia (NH₃). Keduanya punya 4 atom, tapi NH₃ bentuknya piramida karena punya 1 pasang elektron bebas, sedangkan BF₃ yang nggak punya pasangan elektron bebas jadi datar sempurna." 
                }
            ]
        },
        ClF3: { 
            name: "Klorin Trifluorida (ClF₃)", 
            description: "Molekul interhalogen dengan geometri Bentuk-T yang unik karena adanya dua pasang elektron bebas pada atom klorin pusat.", 
            details: [
                { 
                    title: "Kartu Identitas Molekul", 
                    content: "<b>Nama Panggilan:</b> Klorin Trifluorida<br><b>Nama Resmi (IUPAC):</b> Chlorine Trifluoride<br><b>Rumus:</b> ClF₃<br><b>Berat Molekul:</b> 92.45 g/mol" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "ClF₃ adalah salah satu molekul paling 'gila' dan berbahaya yang pernah dibuat! ☢️ Dia ini zat super reaktif yang bisa membakar hampir apa saja, bahkan benda-benda yang kamu pikir nggak mungkin terbakar seperti pasir, kaca, dan asbes." 
                },
                { 
                    title: "Bentuk & Strukturnya", 
                    content: "<b>Bentuk Geometri:</b> Bentuk-T (T-Shaped).<br><b>Model:</b> Satu atom Klorin di tengah, dengan satu Fluor di samping dan dua Fluor di posisi atas-bawah, membentuk huruf 'T' yang agak bengkok.<br><b>Rahasia Bentuknya:</b> Atom Klorin pusat punya dua 'pasangan elektron penyendiri' yang super besar. Mereka mengambil banyak ruang dan 'mendorong' ketiga atom Fluor ke dalam bentuk T yang aneh ini." 
                },
                { 
                    title: "Penampilan Fisiknya", 
                    content: "<b>Wujud:</b> Gas tidak berwarna, atau cairan kuning kehijauan pucat di bawah 12 °C.<br><b>Bau:</b> Sangat menyengat, manis, dan menyesakkan." 
                },
                { 
                    title: "Sifat Kimianya", 
                    content: "<b>Kelakuan:</b> Ekstremis sejati! Dia adalah <b>oksidator yang jauh lebih kuat daripada oksigen</b>. Dia bereaksi secara eksplosif dengan air dan hampir semua bahan organik. Kalau kamu siram air ke api ClF₃, apinya malah makin besar!" 
                },
                { 
                    title: "Asalnya dari Mana?", 
                    content: "<b>Sumber:</b> Murni buatan manusia di laboratorium. Syukurlah dia nggak ada di alam bebas!" 
                },
                { 
                    title: "Gimana Terbentuknya?", 
                    content: "Dibuat dengan mereaksikan langsung gas klorin (Cl₂) dengan gas fluorin (F₂) pada suhu tinggi (200-300 °C). Reaksinya: Cl₂ + 3F₂ ⟶ 2ClF₃." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Industri Nuklir:</b> Digunakan untuk membuat uranium heksafluorida (UF₆), langkah penting dalam pengayaan uranium untuk bahan bakar nuklir.<br><b>Industri Semikonduktor:</b> Dipakai sebagai agen pembersih super ampuh untuk membersihkan ruang reaktor pembuatan chip komputer.<br><b>Lainnya:</b> Pernah diteliti sebagai bahan bakar roket, tapi terlalu berbahaya untuk ditangani." 
                },
                { 
                    title: "Aman Nggak?", 
                    content: "<b>Bahaya?:</b> Sangat-sangat-sangat berbahaya! Ini salah satu zat kimia paling berbahaya yang ada. ☠️<br><b>Risiko:</b> Super korosif, super beracun, dan bereaksi hebat dengan hampir semua hal. Menanganinya butuh peralatan dan keahlian tingkat dewa." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Cerita Perang Dunia II:</b> Nazi meneliti ClF₃ dengan nama sandi 'N-Stoff' sebagai senjata pembakar potensial. Mereka bilang satu tumpahan kecil pernah membakar habis bunker beton sedalam 30 cm dan kerikil di bawahnya.<br><b>Kontras Keren:</b> Bandingkan dengan BF₃! Keduanya punya 4 atom, tapi karena ClF₃ punya 2 pasang elektron bebas, bentuknya jadi aneh (Bentuk-T), sedangkan BF₃ yang nggak punya, bentuknya jadi segitiga datar yang rapi." 
                }
            ]
        },
        CH4: { 
            name: "Metana (CH₄)", 
            description: "Alkana paling sederhana dan komponen utama gas alam. Berbentuk tetrahedral (~109.5°).", 
            details: [
                { 
                    title: "Kartu Identitas Molekul", 
                    content: "<b>Nama Panggilan:</b> Metana, Gas Rawa<br><b>Nama Resmi (IUPAC):</b> Methane<br><b>Rumus:</b> CH₄<br><b>Berat Molekul:</b> 16.04 g/mol" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Metana adalah si paling simpel dari semua molekul organik! 👶 Dia ini komponen utama dari gas alam yang kita pakai buat masak. Dia juga terkenal sebagai 'gas rawa' karena sering muncul dari tempat-tempat basah." 
                },
                { 
                    title: "Bentuk & Strukturnya", 
                    content: "<b>Bentuk Geometri:</b> Tetrahedral Sempurna.<br><b>Model:</b> Satu atom Karbon di tengah dengan empat atom Hidrogen di sekelilingnya, membentuk piramida tiga sisi yang simetris dengan sudut ikatan 109.5°.<br><b>Ikatan:</b> Ikatan kovalen nonpolar. Karena super simetris, molekul ini sangat nonpolar." 
                },
                { 
                    title: "Penampilan Fisiknya", 
                    content: "<b>Wujud:</b> Gas yang tidak terlihat.<br><b>Sifat:</b> Tidak berwarna, tidak berbau. Jauh lebih ringan dari udara.<br><b>Titik Didih:</b> -161.5 °C." 
                },
                { 
                    title: "Sifat Kimianya", 
                    content: "<b>Kelakuan:</b> Meskipun stabil, dia ini sangat mudah terbakar! Reaksi pembakarannya dengan oksigen (CH₄ + 2O₂ ⟶ CO₂ + 2H₂O) melepaskan banyak energi, makanya dia jadi bahan bakar yang hebat." 
                },
                { 
                    title: "Asalnya dari Mana?", 
                    content: "<b>Sumber Alami:</b> Cadangan gas alam di bawah tanah. Juga dihasilkan oleh bakteri metanogenik di lingkungan tanpa oksigen, seperti rawa, sawah, dan perut sapi (ya, sendawa sapi itu metana!). 🐄" 
                },
                { 
                    title: "Gimana Terbentuknya?", 
                    content: "Terbentuk dari dekomposisi (penguraian) bahan organik oleh mikroba selama jutaan tahun di bawah tekanan dan panas di dalam kerak bumi." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Paling Penting:</b> Sebagai <b>bahan bakar</b> untuk pembangkit listrik, pemanas rumah, dan kompor gas.<br><b>Di Industri:</b> Bahan baku utama untuk memproduksi hidrogen, metanol, dan banyak bahan kimia penting lainnya." 
                },
                { 
                    title: "Aman Nggak?", 
                    content: "<b>Toksisitas:</b> Tidak beracun.<br><b>Tapi Awas!:</b> Sangat mudah meledak jika bercampur dengan udara dalam konsentrasi tertentu (5-15%). Juga bisa menyebabkan sesak napas di ruang tertutup karena menggantikan oksigen.<br><b>Dampak Lingkungan:</b> Metana adalah <b>gas rumah kaca yang sangat poten</b>, sekitar 28 kali lebih kuat dalam 'menjebak' panas daripada CO₂ dalam jangka waktu 100 tahun." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Gas Kentut:</b> Walaupun sering disalahkan, metana sebenarnya bukan penyebab utama bau kentut. Bau khas itu lebih disebabkan oleh senyawa belerang seperti hidrogen sulfida (H₂S).<br><b>Di Luar Angkasa:</b> Metana cair membentuk danau dan sungai di permukaan Titan, bulan terbesar Saturnus! 🪐" 
                }
            ]
        },
        C2H6: { 
            name: "Etana (C₂H₆)", 
            description: "Alkana sederhana yang terdiri dari dua atom karbon. Komponen kedua terbesar dalam gas alam.", 
            details: [
                { 
                    title: "Kartu Identitas Molekul", 
                    content: "<b>Nama Panggilan:</b> Etana<br><b>Nama Resmi (IUPAC):</b> Ethane<br><b>Rumus:</b> C₂H₆<br><b>Berat Molekul:</b> 30.07 g/mol" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Etana adalah 'kakak' dari Metana. Dia ini molekul hidrokarbon simpel kedua, cuma dua atom karbon yang gandengan. Dia mungkin nggak se-terkenal Metana, tapi perannya di industri super penting!" 
                },
                { 
                    title: "Bentuk & Strukturnya", 
                    content: "<b>Bentuk Geometri:</b> Dua tetrahedral yang nyambung.<br><b>Model:</b> Bayangin dua molekul Metana yang salah satu Hidrogennya dilepas, terus mereka gandengan tangan. 🤝<br><b>Ikatan:</b> Ikatan kovalen nonpolar. Molekul ini sangat simetris dan nonpolar." 
                },
                { 
                    title: "Penampilan Fisiknya", 
                    content: "<b>Wujud:</b> Gas yang tidak terlihat.<br><b>Sifat:</b> Tidak berwarna dan tidak berbau.<br><b>Titik Didih:</b> -88.6 °C." 
                },
                { 
                    title: "Sifat Kimianya", 
                    content: "<b>Kelakuan:</b> Mirip Metana, dia ini gampang banget terbakar. Tapi selain itu, dia cukup 'kalem' dan nggak terlalu reaktif. Sifat khas alkana banget." 
                },
                { 
                    title: "Asalnya dari Mana?", 
                    content: "<b>Sumber Alami:</b> Komponen terbesar kedua (setelah metana) dalam <b>gas alam</b>. Dia diekstrak bareng sama metana dari bawah tanah." 
                },
                { 
                    title: "Gimana Terbentuknya?", 
                    content: "Sama seperti metana, etana terbentuk dari penguraian materi organik selama jutaan tahun di bawah tekanan dan panas di dalam kerak bumi." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Pekerjaan Utamanya:</b> Dia ini 'batu loncatan'! Hampir semua etana di dunia dipakai sebagai bahan baku untuk dipecah (proses *steam cracking*) menjadi <b>etena (C₂H₄)</b>. Nah, etena inilah yang jadi bahan dasar pembuatan plastik polietilena, plastik paling umum di dunia!" 
                },
                { 
                    title: "Aman Nggak?", 
                    content: "<b>Toksisitas:</b> Tidak beracun.<br><b>Tapi Awas!:</b> Sangat mudah terbakar dan bisa meledak jika konsentrasinya pas di udara. Seperti gas lainnya, bisa bikin sesak napas di ruang tertutup." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Danau Luar Angkasa:</b> Para ilmuwan telah menemukan lautan dan danau <b>etana cair</b> di permukaan Titan, bulan terbesar planet Saturnus. Jadi, di sana hujan etana, bukan air!<br><b>Bukan Bahan Bakar Langsung:</b> Walaupun bisa dibakar, etana terlalu 'berharga' untuk sekadar jadi bahan bakar. Jauh lebih bernilai kalau diubah jadi etena untuk industri plastik." 
                }
            ]
        },
        C3H8: { 
            name: "Propana (C₃H₈)", 
            description: "Alkana yang umum digunakan sebagai bahan bakar gas dalam LPG (Liquefied Petroleum Gas).", 
            details: [
                { 
                    title: "Kartu Identitas Molekul", 
                    content: "<b>Nama Panggilan:</b> Propana<br><b>Nama Resmi (IUPAC):</b> Propane<br><b>Rumus:</b> C₃H₈<br><b>Berat Molekul:</b> 44.1 g/mol" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Propana adalah 'gas barbekyu'! 🔥 Dia ini superstar-nya bahan bakar portabel. Kalau kamu pernah lihat tabung gas biru atau hijau buat kompor atau panggangan, kemungkinan besar isinya adalah propana." 
                },
                { 
                    title: "Bentuk & Strukturnya", 
                    content: "<b>Bentuk Geometri:</b> Rantai tiga atom karbon yang zig-zag.<br><b>Model:</b> Tiga 'piramida' tetrahedral yang gandengan, membentuk rantai pendek.<br><b>Ikatan:</b> Ikatan kovalen nonpolar. Molekul ini nonpolar." 
                },
                { 
                    title: "Penampilan Fisiknya", 
                    content: "<b>Wujud:</b> Gas pada suhu normal.<br><b>Sifat Unik:</b> Dia gampang banget dicairkan cuma dengan sedikit tekanan. Inilah rahasianya kenapa dia bisa disimpen dalam jumlah banyak di dalam tabung sebagai <b>LPG (Liquefied Petroleum Gas)</b>." 
                },
                { 
                    title: "Sifat Kimianya", 
                    content: "<b>Kelakuan:</b> Sangat mudah terbakar, tapi pembakarannya relatif 'bersih', menghasilkan lebih banyak panas per kilogram daripada bensin dan lebih sedikit polusi. Reaksinya: C₃H₈ + 5O₂ ⟶ 3CO₂ + 4H₂O." 
                },
                { 
                    title: "Asalnya dari Mana?", 
                    content: "<b>Sumber:</b> Dia bukan 'ditambang' langsung. Propana 'dipanen' sebagai produk sampingan selama proses pengolahan <b>gas alam</b> dan pemurnian <b>minyak bumi</b>." 
                },
                { 
                    title: "Gimana Terbentuknya?", 
                    content: "Dia dipisahkan dari campuran hidrokarbon lain selama proses penyulingan minyak atau pemrosesan gas. Karena titik didihnya berbeda dari metana atau butana, dia bisa diisolasi dengan mudah." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Paling Penting:</b> Sebagai <b>bahan bakar LPG</b> untuk memasak, memanaskan air, dan pemanas ruangan, terutama di daerah yang nggak terjangkau jaringan gas kota.<br><b>Lainnya:</b> Bahan bakar untuk forklift, bus, dan balon udara panas. Juga bahan baku untuk membuat plastik." 
                },
                { 
                    title: "Aman Nggak?", 
                    content: "<b>Toksisitas:</b> Tidak beracun.<br><b>Tapi Awas!:</b> Super duper mudah terbakar dan meledak! 💥<br><b>Bau Khas:</b> Propana murni nggak berbau. Bau 'gas' yang kamu cium itu sebenarnya adalah zat kimia berbau (seperti etil merkaptan) yang sengaja ditambahkan sebagai 'alarm' biar kalau ada kebocoran, kita langsung tahu." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Lebih Berat dari Udara:</b> Tidak seperti metana, gas propana lebih berat dari udara. Kalau ada kebocoran, dia bakal 'menggenang' di lantai atau area rendah, yang bikin risiko kebakarannya jadi lebih tinggi.<br><b>Di Film:</b> Ledakan dahsyat di film-film seringkali menggunakan propana karena pembakarannya yang besar dan bisa dikontrol." 
                }
            ]
        },
        nC4H10: { 
            name: "n-Butana (C₄H₁₀)", 
            description: "Isomer butana dengan rantai karbon lurus (tidak bercabang). Komponen LPG.", 
            details: [
                { 
                    title: "Kartu Identitas Molekul", 
                    content: "<b>Nama Panggilan:</b> n-Butana (n = normal)<br><b>Nama Resmi (IUPAC):</b> Butane<br><b>Rumus:</b> C₄H₁₀<br><b>Berat Molekul:</b> 58.12 g/mol" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "n-Butana adalah 'kakak' dari Propana. Dia ini alkana rantai lurus dengan empat karbon. Kamu paling sering ketemu dia di dalam <b>korek api gas</b>! Bunyi 'cesss' dan apinya itu berkat si butana." 
                },
                { 
                    title: "Bentuk & Strukturnya", 
                    content: "<b>Bentuk Geometri:</b> Rantai empat atom karbon yang zig-zag.<br><b>Model:</b> Empat 'piramida' tetrahedral yang gandengan, membentuk rantai yang lebih panjang dari propana.<br><b>Ikatan:</b> Ikatan kovalen nonpolar." 
                },
                { 
                    title: "Penampilan Fisiknya", 
                    content: "<b>Wujud:</b> Gas pada suhu kamar.<br><b>Sifat:</b> Sama seperti propana, dia gampang banget dicairkan, makanya bisa dimasukin ke dalam korek api atau tabung gas portabel.<br><b>Titik Didih:</b> -0.5 °C (sedikit di bawah titik beku air!)." 
                },
                { 
                    title: "Sifat Kimianya", 
                    content: "<b>Kelakuan:</b> Sangat mudah terbakar dan melepaskan banyak energi. Sifatnya sangat mirip dengan alkana lain seperti metana dan propana." 
                },
                { 
                    title: "Asalnya dari Mana?", 
                    content: "<b>Sumber:</b> Sama seperti propana, dia adalah produk sampingan dari pengolahan <b>gas alam</b> dan pemurnian <b>minyak bumi</b>." 
                },
                { 
                    title: "Gimana Terbentuknya?", 
                    content: "Dia dipisahkan dari hidrokarbon lain selama proses penyulingan fraksional minyak mentah. Karena punya titik didih yang spesifik, dia bisa diisolasi." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Paling Penting:</b> Sebagai bahan bakar di <b>korek api gas</b> dan <b>kompor camping</b> portabel.<br><b>Lainnya:</b> Dicampur dengan propana untuk membuat LPG. Juga dicampur ke dalam bensin untuk meningkatkan angka oktan dan membuatnya lebih mudah menyala di musim dingin." 
                },
                { 
                    title: "Aman Nggak?", 
                    content: "<b>Toksisitas:</b> Tidak beracun.<br><b>Tapi Awas!:</b> Sangat-sangat mudah terbakar dan meledak! 💥 Gasnya juga lebih berat dari udara, jadi kalau bocor bisa 'menggenang' di lantai dan menciptakan bahaya kebakaran." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Punya Kembaran!:</b> n-Butana punya 'kembaran' bernama <b>Isobutana</b>. Rumus kimianya sama persis (C₄H₁₀), tapi bentuknya beda (bercabang).<br><b>Perbedaan Titik Didih:</b> Karena bentuknya yang lurus dan 'panjang', n-butana punya titik didih lebih tinggi daripada isobutana yang lebih bulat. Ini contoh keren dari bagaimana bentuk molekul mempengaruhi sifat fisiknya!" 
                }
            ]
        },
        iC4H10: { 
            name: "Isobutana (C₄H₁₀)", 
            description: "Isomer butana dengan rantai karbon bercabang (2-metilpropana). Contoh klasik dari isomerisme struktural.", 
            details: [
                { 
                    title: "Kartu Identitas Molekul", 
                    content: "<b>Nama Panggilan:</b> Isobutana<br><b>Nama Resmi (IUPAC):</b> 2-Metilpropana<br><b>Rumus:</b> C₄H₁₀<br><b>Berat Molekul:</b> 58.12 g/mol" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Isobutana adalah 'kembaran' n-Butana yang bentuknya lebih 'kompak'. Dia punya jumlah atom yang sama persis, tapi cara atom karbonnya nyambung itu beda. Dia ini contoh keren buat nunjukkin kalau di kimia, bentuk itu ngaruh banget!" 
                },
                { 
                    title: "Bentuk & Strukturnya", 
                    content: "<b>Bentuk Geometri:</b> Rantai Karbon Bercabang.<br><b>Model:</b> Bayangin satu atom karbon di tengah yang 'gandengan' sama tiga atom karbon lainnya, membentuk kayak huruf 'T' atau cakar. 爪<br><b>Ikatan:</b> Ikatan kovalen nonpolar." 
                },
                { 
                    title: "Penampilan Fisiknya", 
                    content: "<b>Wujud:</b> Gas pada suhu normal.<br><b>Sifat:</b> Sama kayak n-butana, dia gampang dicairkan dan nggak berwarna.<br><b>Titik Didih:</b> -11.7 °C. Sedikit lebih dingin dari n-butana!" 
                },
                { 
                    title: "Sifat Kimianya", 
                    content: "<b>Kelakuan:</b> Sangat mudah terbakar, mirip banget sama kembarannya, si n-butana. Dia juga nggak terlalu reaktif selain untuk dibakar." 
                },
                { 
                    title: "Asalnya dari Mana?", 
                    content: "<b>Sumber:</b> Sama persis kayak propana dan n-butana, dia didapat sebagai produk sampingan dari pengolahan <b>gas alam</b> dan pemurnian <b>minyak bumi</b>." 
                },
                { 
                    title: "Gimana Terbentuknya?", 
                    content: "Dia bisa dipisahkan dari n-butana atau dibuat dari n-butana lewat proses kimia yang disebut <b>isomerisasi</b>, di mana rantai lurusnya 'dipatahkan' dan disambung ulang jadi bercabang." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Paling Penting:</b> Sebagai <b>propelan</b> di dalam kaleng semprot (deodoran, parfum, cat semprot). Dialah gas pendorong yang bikin isinya bisa keluar.<br><b>Lainnya:</b> Digunakan sebagai <b>refrigeran</b> (zat pendingin) di kulkas dan AC karena lebih ramah lingkungan daripada Freon. Juga bahan baku untuk membuat bensin berkualitas tinggi." 
                },
                { 
                    title: "Aman Nggak?", 
                    content: "<b>Toksisitas:</b> Tidak beracun.<br><b>Tapi Awas!:</b> Super mudah terbakar dan meledak! Sama seperti n-butana, gasnya lebih berat dari udara dan bisa berbahaya jika bocor." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Perbedaan Titik Didih:</b> Kenapa titik didihnya lebih rendah dari n-butana? Karena bentuknya yang lebih 'bulat' dan kompak, molekul isobutana nggak bisa 'berpelukan' seerat molekul n-butana yang panjang. Ikatan antarmolekulnya jadi lebih lemah dan lebih gampang 'terbang' jadi gas. Ini bukti nyata pentingnya bentuk 3D molekul!" 
                }
            ]
        },
        C3H6: { 
            name: "Siklopropana (C₃H₆)", 
            description: "Alkana siklik paling sederhana dengan tiga atom karbon membentuk cincin segitiga. Strukturnya memiliki tegangan cincin yang tinggi.", 
            details: [
                { 
                    title: "Kartu Identitas Molekul", 
                    content: "<b>Nama Panggilan:</b> Siklopropana<br><b>Nama Resmi (IUPAC):</b> Cyclopropane<br><b>Rumus:</b> C₃H₆<br><b>Berat Molekul:</b> 42.08 g/mol" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Siklopropana adalah alkana terkecil yang nekat bikin geng 'cincin'! 💍 Dia ini molekul segitiga yang super tegang. Bayangin kamu disuruh menekuk tongkat lurus jadi segitiga, pasti bakal 'stres' kan? Nah, begitulah perasaan ikatan di dalam molekul ini." 
                },
                { 
                    title: "Bentuk & Strukturnya", 
                    content: "<b>Bentuk Geometri:</b> Segitiga Datar Sempurna (Trigonal Planar) untuk kerangka karbonnya.<br><b>Model:</b> Tiga atom karbon membentuk segitiga sama sisi yang kaku.<br><b>Ikatan:</b> Ikatan kovalennya 'melengkung' keluar (disebut *bent bonds* atau ikatan pisang 🍌). Ini adalah cara dia mengatasi 'stres' karena dipaksa membentuk sudut 60°." 
                },
                { 
                    title: "Penampilan Fisiknya", 
                    content: "<b>Wujud:</b> Gas yang tidak berwarna.<br><b>Bau:</b> Punya bau yang agak manis, mirip seperti produk minyak bumi lainnya.<br><b>Titik Didih:</b> -33 °C." 
                },
                { 
                    title: "Sifat Kimianya", 
                    content: "<b>Kelakuan:</b> Super reaktif untuk ukuran alkana! 'Ketegangan' di dalam cincinnya bikin dia nggak sabar buat 'patah' dan bereaksi dengan zat lain untuk melepaskan stresnya. Jauh lebih reaktif daripada propana yang rantainya lurus." 
                },
                { 
                    title: "Asalnya dari Mana?", 
                    content: "<b>Sumber:</b> Tidak ditemukan dalam jumlah besar di alam. Siklopropana adalah molekul yang biasanya dibuat di laboratorium atau industri." 
                },
                { 
                    title: "Gimana Terbentuknya?", 
                    content: "Dibuat dari molekul rantai lurus yang punya 'gantungan' di kedua ujungnya (misalnya, 1,3-dibromopropana), lalu direaksikan dengan logam seperti seng (Zinc) untuk 'memaksa' kedua ujungnya bersatu membentuk cincin." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Kegunaan (Historis):</b> Dulu, dia ini terkenal sebagai <b>agen anestesi</b> (obat bius) yang dihirup. Kerjanya cepat dan bikin pasien cepat sadar, tapi punya satu masalah besar..." 
                },
                { 
                    title: "Aman Nggak?", 
                    content: "<b>Toksisitas:</b> Relatif tidak beracun untuk dibius.<br><b>Tapi Awas!:</b> ...masalah besarnya adalah dia <b>sangat mudah meledak!</b> 🔥 Mencampurnya dengan oksigen di ruang operasi itu resep bencana. Karena risiko ledakan inilah penggunaannya sebagai obat bius sudah lama ditinggalkan." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Tegangan Cincin:</b> Atom karbon itu paling 'nyaman' membentuk sudut 109.5°. Di siklopropana, dia dipaksa membentuk sudut 60°. 'Stres' akibat perbedaan sudut inilah yang disebut <b>tegangan cincin</b>, dan ini adalah konsep super penting dalam kimia organik!<br><b>Punya Kembaran:</b> Rumus C₃H₆ juga dimiliki oleh Propena (alkena). Mereka adalah contoh dari <b>isomer</b>." 
                }
            ]
        },
        C6H12: { 
            name: "Sikloheksana (C₆H₁₂)", 
            description: "Senyawa siklik jenuh yang tidak datar. Strukturnya mengadopsi konformasi 'kursi' yang stabil untuk meminimalkan tolakan antar atom.", 
            details: [
                { 
                    title: "Kartu Identitas Molekul", 
                    content: "<b>Nama Panggilan:</b> Sikloheksana<br><b>Nama Resmi (IUPAC):</b> Cyclohexane<br><b>Rumus:</b> C₆H₁₂<br><b>Berat Molekul:</b> 84.16 g/mol" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Jangan tertipu sama gambarnya yang heksagonal! Sikloheksana ini bukan molekul yang datar. Dia ini molekul 'santai' yang bentuknya lebih mirip <b>kursi malas</b> 🛋️ daripada segi enam kaku. Bentuk ini bikin dia jadi super stabil." 
                },
                { 
                    title: "Bentuk & Strukturnya", 
                    content: "<b>Bentuk Geometri:</b> Konformasi Kursi (Chair Conformation).<br><b>Model:</b> Enam atom karbon membentuk cincin yang 'melipat' ke atas dan ke bawah untuk menghindari stres. Ini adalah bentuk 3D paling stabil untuk cincin enam anggota.<br><b>Ikatan:</b> Ikatan kovalen nonpolar." 
                },
                { 
                    title: "Penampilan Fisiknya", 
                    content: "<b>Wujud:</b> Cairan yang tidak berwarna.<br><b>Sifat:</b> Mudah menguap dan sangat mudah terbakar.<br><b>Bau:</b> Punya bau khas yang agak tajam, mirip bau di bengkel atau bau bensin." 
                },
                { 
                    title: "Sifat Kimianya", 
                    content: "<b>Kelakuan:</b> Karena bentuk 'kursi'-nya yang bebas tegangan, dia ini cukup 'mager' dan nggak terlalu reaktif, mirip alkana rantai lurus. Tapi kalau ada api, dia bakal terbakar hebat." 
                },
                { 
                    title: "Asalnya dari Mana?", 
                    content: "<b>Sumber Alami:</b> Ditemukan dalam jumlah yang cukup banyak di dalam <b>minyak mentah (petroleum)</b>. Dia dipisahkan dari sana lewat proses penyulingan." 
                },
                { 
                    title: "Gimana Terbentuknya?", 
                    content: "<b>Di Industri:</b> Biasanya dibuat dalam skala besar dengan mereaksikan benzena (C₆H₆) dengan gas hidrogen (H₂) pada tekanan dan suhu tinggi. Proses ini 'menjenuhkan' cincin benzena." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Paling Penting:</b> Sebagai bahan baku utama untuk memproduksi <b>Nilon</b>! Sekitar 90% dari sikloheksana di dunia dipakai untuk membuat serat nilon untuk pakaian, karpet, dan tali.<br><b>Lainnya:</b> Digunakan sebagai pelarut nonpolar di lab dan industri." 
                },
                { 
                    title: "Aman Nggak?", 
                    content: "<b>Toksisitas:</b> Relatif tidak terlalu beracun.<br><b>Tapi Awas!:</b> Sangat mudah terbakar! 🔥 Uapnya bisa bikin pusing dan iritasi mata jika terhirup dalam jumlah banyak." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Bisa Jungkir Balik!:</b> Bentuk 'kursi' sikloheksana ini sangat fleksibel. Dia bisa melakukan 'jungkir balik' (disebut *ring flip*) di mana bagian 'sandaran kepala' jadi 'pijakan kaki' dan sebaliknya. Proses ini terjadi jutaan kali per detik pada suhu kamar!<br><b>Aksial & Ekuator:</b> Atom hidrogennya punya dua posisi: 'aksial' (tegak lurus) dan 'ekuator' (menyamping). Saat 'jungkir balik', posisi mereka saling bertukar!" 
                }
            ]
        },
        C2H4: { 
            name: "Etena (C₂H₄)", 
            description: "Alkena paling sederhana, dengan ikatan rangkap dua antar karbon yang membuatnya planar (datar).", 
            details: [
                { 
                    title: "Kartu Identitas Molekul", 
                    content: "<b>Nama Panggilan:</b> Etilena<br><b>Nama Resmi (IUPAC):</b> Ethene<br><b>Rumus:</b> C₂H₄<br><b>Berat Molekul:</b> 28.05 g/mol" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Etena, atau yang lebih sering dipanggil Etilena, adalah superstar di dunia industri dan juga 'penasihat buah'. 🍌 Dia ini molekul organik yang paling banyak diproduksi di seluruh dunia dan punya tugas alami sebagai hormon pematangan pada tumbuhan." 
                },
                { 
                    title: "Bentuk & Strukturnya", 
                    content: "<b>Bentuk Geometri:</b> Datar Sempurna (Planar).<br><b>Model:</b> Dua atom Karbon dihubungkan dengan ikatan rangkap dua, dan masing-masing Karbon mengikat dua atom Hidrogen. Seluruh 6 atom ini berada di satu bidang datar.<br><b>Ikatan:</b> Mengandung satu <b>ikatan rangkap dua C=C</b>. Ikatan ini kaku dan nggak bisa berputar, yang jadi dasar dari isomerisme cis-trans pada alkena yang lebih besar." 
                },
                { 
                    title: "Penampilan Fisiknya", 
                    content: "<b>Wujud:</b> Gas yang tidak berwarna.<br><b>Bau:</b> Punya bau yang agak manis dan samar.<br><b>Titik Didih:</b> -103.7 °C." 
                },
                { 
                    title: "Sifat Kimianya", 
                    content: "<b>Kelakuan:</b> Jauh lebih reaktif daripada Etana (C₂H₆)! Ikatan rangkap duanya itu kaya akan elektron dan siap 'membuka diri' untuk bereaksi dengan molekul lain. Reaksi khasnya adalah <b>reaksi adisi</b>, di mana ikatan rangkapnya putus dan atom baru ditambahkan." 
                },
                { 
                    title: "Asalnya dari Mana?", 
                    content: "<b>Sumber Industri:</b> Diproduksi secara massal dari 'pemecahan' (steam cracking) hidrokarbon seperti etana yang didapat dari gas alam.<br><b>Sumber Alami:</b> Diproduksi oleh tumbuhan sebagai <b>hormon</b> untuk mengatur proses pematangan buah dan penuaan daun." 
                },
                { 
                    title: "Gimana Terbentuknya?", 
                    content: "Proses industrinya melibatkan pemanasan etana (C₂H₆) pada suhu sangat tinggi (lebih dari 850 °C), yang membuatnya 'pecah' menjadi etena (C₂H₄) dan hidrogen (H₂)." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Paling Penting:</b> Sebagai 'batu bata' utama untuk membuat <b>plastik polietilena</b> (kantong kresek, botol sampo, mainan, dll). Ini adalah plastik yang paling banyak digunakan di dunia.<br><b>Lainnya:</b> Bahan baku untuk membuat etanol, zat antibeku (etilena glikol), dan plastik PVC." 
                },
                { 
                    title: "Aman Nggak?", 
                    content: "<b>Toksisitas:</b> Relatif tidak beracun.<br><b>Tapi Awas!:</b> Sangat-sangat mudah terbakar dan bisa meledak! 🔥 Juga bisa bertindak sebagai asfiksian (bikin sesak napas) di ruang tertutup." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Trik Pisang Matang:</b> Kalau kamu mau bikin pisang mentah cepat matang, taruh aja di dalam kantong kertas bareng satu pisang yang sudah matang (atau apel). Pisang matang akan melepaskan gas etilena, yang akan mempercepat pematangan pisang lainnya. Sains!<br><b>Lampu Gas Kuno:</b> Dulu, etilena adalah komponen dalam 'gas penerangan' yang dipakai untuk lampu jalanan sebelum listrik jadi umum." 
                }
            ]
        },
        C3H4: { 
            name: "Propadiene (Allene) (C₃H₄)", 
            description: "Senyawa dengan dua ikatan rangkap dua bersebelahan (alena). Gugus -CH₂ di ujungnya saling tegak lurus.", 
            details: [
                { 
                    title: "Kartu Identitas Molekul", 
                    content: "<b>Nama Panggilan:</b> Alena (Allene)<br><b>Nama Resmi (IUPAC):</b> Propadiene<br><b>Rumus:</b> C₃H₄<br><b>Berat Molekul:</b> 40.06 g/mol" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Alena adalah molekul yang super unik dan agak 'aneh'. Dia punya dua ikatan rangkap dua yang nempel langsung (C=C=C). Susunan langka ini bikin bentuk 3D-nya jadi nggak biasa dan bikin pusing ahli kimia!" 
                },
                { 
                    title: "Bentuk & Strukturnya", 
                    content: "<b>Bentuk Geometri:</b> Non-planar (Tidak Datar!).<br><b>Model:</b> Tiga atom karbon lurus di tengah, tapi dua pasang atom hidrogen di ujungnya itu saling <b>tegak lurus</b> satu sama lain. Kalau dilihat dari depan kayak tanda tambah (+), dari samping kayak garis lurus.<br><b>Ikatan:</b> Dua ikatan rangkap dua yang bersebelahan (C=C=C)." 
                },
                { 
                    title: "Penampilan Fisiknya", 
                    content: "<b>Wujud:</b> Gas yang tidak berwarna.<br><b>Bau:</b> Punya bau yang agak manis.<br><b>Titik Didih:</b> -34 °C." 
                },
                { 
                    title: "Sifat Kimianya", 
                    content: "<b>Kelakuan:</b> Lebih reaktif daripada alkena biasa. Dua ikatan rangkap yang berdekatan ini membuatnya sedikit 'stres' dan lebih mudah bereaksi, terutama lewat reaksi adisi." 
                },
                { 
                    title: "Asalnya dari Mana?", 
                    content: "<b>Sumber:</b> Dia nggak terlalu umum di alam. Biasanya ditemukan sebagai campuran dalam gas MAPP (gas untuk las) atau dibuat secara spesifik di laboratorium." 
                },
                { 
                    title: "Gimana Terbentuknya?", 
                    content: "Bisa terbentuk sebagai produk sampingan dari proses 'perengkahan' (cracking) propana atau lewat reaksi kimia khusus di lab yang melibatkan penghilangan atom halogen dari molekul lain." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Di Industri:</b> Jarang dipakai langsung. Lebih sering jadi 'batu loncatan' dalam sintesis organik untuk membuat molekul lain yang lebih kompleks.<br><b>Riset:</b> Struktur uniknya bikin dia jadi subjek penelitian yang menarik dalam kimia teori dan stereokimia." 
                },
                { 
                    title: "Aman Nggak?", 
                    content: "<b>Toksisitas:</b> Relatif tidak beracun.<br><b>Tapi Awas!:</b> Sangat mudah terbakar dan bisa membentuk campuran eksplosif dengan udara! 🔥" 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Geometri Aneh:</b> Bayangin baling-baling helikopter. Kalau satu baling-baling muter horizontal, baling-baling satunya (di sumbu yang sama) muter vertikal. Nah, kira-kira begitulah posisi gugus -CH₂ di ujung molekul Alena!<br><b>Kiral Tanpa Pusat Kiral:</b> Karena bentuknya yang tegak lurus, turunan Alena tertentu bisa menjadi kiral (punya bayangan cermin yang nggak bisa ditumpuk) meskipun nggak punya atom karbon kiral. Ini konsep stereokimia tingkat lanjut yang keren!" 
                }
            ]
        },
        cisC2H2Cl2: { 
            name: "cis-1,2-Dikloroetena", 
            description: "Isomer 'cis' dari C₂H₂Cl₂. Kedua atom klorin berada di sisi yang sama dari ikatan rangkap, membuat molekul ini polar.", 
            details: [
                { 
                    title: "Kartu Identitas Molekul", 
                    content: "<b>Nama Panggilan:</b> cis-1,2-Dikloroetena<br><b>Nama Resmi (IUPAC):</b> (Z)-1,2-Dichloroethene<br><b>Rumus:</b> C₂H₂Cl₂<br><b>Berat Molekul:</b> 96.94 g/mol" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Ini dia si kembar 'cis'! Dia punya saudara kembar namanya 'trans'. Bedanya? Di molekul 'cis' ini, kedua atom Klorin yang gede itu nongkrong di <b>sisi yang sama</b> dari ikatan rangkap dua. Posisi ini bikin dia punya sifat yang beda sama si kembarannya." 
                },
                { 
                    title: "Bentuk & Strukturnya", 
                    content: "<b>Bentuk Geometri:</b> Datar Sempurna (Planar).<br><b>Model:</b> Dua Karbon gandengan pakai ikatan rangkap dua. Masing-masing Karbon ngikat satu Hidrogen dan satu Klorin. Di versi 'cis' ini, kedua Klorinnya ada di 'lantai atas' (atau 'lantai bawah') barengan.<br><b>Ikatan:</b> Ikatan rangkap dua C=C yang kaku." 
                },
                { 
                    title: "Penampilan Fisiknya", 
                    content: "<b>Wujud:</b> Cairan yang tidak berwarna.<br><b>Bau:</b> Punya bau yang agak manis, mirip kloroform.<br><b>Titik Didih:</b> 60.3 °C (Lebih 'betah' jadi cairan daripada kembarannya si trans!)." 
                },
                { 
                    title: "Sifat Kimianya", 
                    content: "<b>Kepolaran:</b> Dia ini <b>polar</b>! Karena kedua Klorin yang 'serakah' elektron ada di sisi yang sama, molekulnya jadi punya sisi 'negatif' dan sisi 'positif', kayak magnet kecil. 🧲<br><b>Reaktivitas:</b> Mirip etena, ikatan rangkap duanya bisa 'dibuka' untuk reaksi adisi." 
                },
                { 
                    title: "Asalnya dari Mana?", 
                    content: "<b>Sumber:</b> Biasanya muncul sebagai produk sampingan di industri kimia atau saat bakteri di tanah mengurai pelarut terklorinasi lainnya. Dia ini sering jadi kontaminan lingkungan." 
                },
                { 
                    title: "Gimana Terbentuknya?", 
                    content: "Bisa terbentuk saat asetilena (etuna) direaksikan dengan klorin, atau saat molekul yang lebih besar 'dipotong' ikatan H-Cl nya (dehidrohalogenasi)." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Kegunaan Utama:</b> Pernah dipakai sebagai <b>pelarut</b> untuk membersihkan komponen elektronik atau logam, dan sebagai bahan baku kimia.<br><b>Tapi Sekarang:</b> Penggunaannya udah banyak dikurangi karena masalah lingkungan dan kesehatan." 
                },
                { 
                    title: "Aman Nggak?", 
                    content: "<b>Toksisitas:</b> Beracun jika terhirup atau tertelan.<br><b>Risiko Kesehatan:</b> Dapat menyebabkan iritasi mata dan kulit, pusing, dan kerusakan organ dalam jangka panjang. Diduga bersifat karsinogenik.<br><b>Risiko Lain:</b> Mudah terbakar." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Arti Nama:</b> Awalan 'cis' itu dari bahasa Latin yang artinya 'di sisi yang sama'.<br><b>Kenapa Titik Didih Lebih Tinggi?:</b> Karena molekulnya polar, mereka punya gaya tarik-menarik antarmolekul (dipol-dipol) yang lebih kuat daripada si trans yang nonpolar. Jadi, butuh energi (suhu) lebih tinggi buat 'memisahkan' mereka jadi gas." 
                }
            ]
        },
        transC2H2Cl2: { 
            name: "trans-1,2-Dikloroetena", 
            description: "Isomer 'trans' dari C₂H₂Cl₂. Kedua atom klorin berada di sisi yang berlawanan, membuat molekul ini nonpolar.", 
            details: [
                { 
                    title: "Kartu Identitas Molekul", 
                    content: "<b>Nama Panggilan:</b> trans-1,2-Dikloroetena<br><b>Nama Resmi (IUPAC):</b> (E)-1,2-Dichloroethene<br><b>Rumus:</b> C₂H₂Cl₂<br><b>Berat Molekul:</b> 96.94 g/mol" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Ini dia si kembar 'trans'! Dia adalah saudara dari 'cis'-1,2-Dikloroetena. Yang bikin dia beda adalah posisi atom Klorinnya: di molekul 'trans' ini, kedua atom Klorin nongkrong di <b>sisi yang berseberangan</b> dari ikatan rangkap dua. Kayak lagi jaga jarak gitu!" 
                },
                { 
                    title: "Bentuk & Strukturnya", 
                    content: "<b>Bentuk Geometri:</b> Datar Sempurna (Planar).<br><b>Model:</b> Sama kayak si 'cis', dua Karbon gandengan pakai ikatan rangkap dua, masing-masing ngikat satu Hidrogen dan satu Klorin. Bedanya, di sini satu Klorin ada di 'lantai atas', satunya lagi di 'lantai bawah'.<br><b>Ikatan:</b> Ikatan rangkap dua C=C yang kaku." 
                },
                { 
                    title: "Penampilan Fisiknya", 
                    content: "<b>Wujud:</b> Cairan yang tidak berwarna.<br><b>Bau:</b> Punya bau yang agak manis, mirip kloroform.<br><b>Titik Didih:</b> 47.5 °C (Dia lebih gampang 'terbang' jadi gas daripada si cis!)." 
                },
                { 
                    title: "Sifat Kimianya", 
                    content: "<b>Kepolaran:</b> Dia ini <b>nonpolar</b>! Aneh kan? Meskipun ikatan C-Cl itu polar, karena kedua Klorin ada di sisi yang berlawanan, tarikan elektronnya jadi saling meniadakan. Hasilnya? Molekulnya jadi seimbang dan nggak punya sisi 'positif' atau 'negatif'." 
                },
                { 
                    title: "Asalnya dari Mana?", 
                    content: "<b>Sumber:</b> Sama seperti isomer cis-nya, dia sering muncul sebagai produk sampingan industri atau hasil penguraian pelarut lain di lingkungan. Sering jadi kontaminan air tanah." 
                },
                { 
                    title: "Gimana Terbentuknya?", 
                    content: "Biasanya terbentuk bersamaan dengan isomer cis saat asetilena direaksikan dengan klorin atau lewat reaksi eliminasi. Campuran keduanya seringkali perlu dipisahkan." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Kegunaan Utama:</b> Sama seperti cis, pernah dipakai sebagai <b>pelarut</b> dan bahan baku kimia.<br><b>Sekarang:</b> Penggunaannya juga sudah sangat terbatas karena masalah lingkungan dan kesehatan." 
                },
                { 
                    title: "Aman Nggak?", 
                    content: "<b>Toksisitas:</b> Beracun jika terhirup atau tertelan, mirip dengan isomer cis.<br><b>Risiko Kesehatan:</b> Iritasi mata dan kulit, pusing, kerusakan organ. Juga diduga bersifat karsinogenik.<br><b>Risiko Lain:</b> Mudah terbakar." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Arti Nama:</b> Awalan 'trans' itu dari bahasa Latin yang artinya 'di seberang' atau 'melintasi'.<br><b>Kenapa Titik Didih Lebih Rendah?:</b> Karena molekulnya nonpolar, gaya tarik-menarik antarmolekulnya (gaya London dispersion) lebih lemah daripada gaya dipol-dipol pada isomer cis yang polar. Akibatnya, molekul trans lebih gampang 'kabur' jadi gas pada suhu yang lebih rendah." 
                }
            ]
        },
        C2H2: {
            name: "Etuna (C₂H₂)",
            description: "Alkuna paling sederhana, dengan ikatan rangkap tiga antar karbon yang membuatnya linear.",
            details: [
                {
                    title: "Kartu Identitas Molekul",
                    content: "<b>Nama Panggilan:</b> Asetilena<br><b>Nama Resmi (IUPAC):</b> Ethyne<br><b>Rumus:</b> C₂H₂<br><b>Berat Molekul:</b> 26.04 g/mol"
                },
                {
                    title: "Siapakah Dia?",
                    content: "Asetilena, alias Etuna, adalah si 'tukang las'! 🔥 Dia ini molekul hidrokarbon paling simpel yang punya ikatan rangkap tiga super kuat. Ikatan ini nyimpen banyak energi, makanya dia jago banget bikin api super panas."
                },
                {
                    title: "Bentuk & Strukturnya",
                    content: "<b>Bentuk Geometri:</b> Lurus kayak penggaris (Linear).<br><b>Model:</b> Dua atom Karbon gandengan pakai ikatan rangkap tiga (C≡C), dan masing-masing Karbon ngikat satu atom Hidrogen. Semua empat atom ini ada di satu garis lurus.<br><b>Ikatan:</b> Ikatan kovalen rangkap tiga C≡C yang super kuat dan pendek."
                },
                {
                    title: "Penampilan Fisiknya",
                    content: "<b>Wujud:</b> Gas yang tidak berwarna.<br><b>Bau:</b> Asetilena murni sebenarnya nggak berbau, tapi versi komersialnya sering punya bau mirip bawang putih karena ada pengotor.<br><b>Titik Didih:</b> -84 °C (Dia menyublim, sama kayak CO₂)."
                },
                {
                    title: "Sifat Kimianya",
                    content: "<b>Kelakuan:</b> Sangat-sangat reaktif dan gampang terbakar! Ikatan rangkap tiganya itu 'lapar' banget buat bereaksi, terutama lewat reaksi adisi. Dia juga nggak stabil kalau ditekan tinggi."
                },
                {
                    title: "Asalnya dari Mana?",
                    content: "<b>Sumber:</b> Nggak terlalu banyak di alam. Kebanyakan asetilena dibuat oleh manusia untuk kebutuhan industri."
                },
                {
                    title: "Gimana Terbentuknya?",
                    content: "<b>Cara Klasik:</b> Mereaksikan kalsium karbida (batu karbit) dengan air. Reaksinya seru dan menghasilkan banyak gas: CaC₂ + 2H₂O ⟶ C₂H₂ + Ca(OH)₂.<br><b>Cara Modern:</b> Oksidasi parsial metana pada suhu super tinggi."
                },
                {
                    title: "Gunanya Buat Apa?",
                    content: "<b>Paling Penting:</b> Sebagai bahan bakar untuk <b>pengelasan oksiasetilena</b> (las karbit). Dicampur sama oksigen murni, pembakarannya bisa mencapai suhu <b>lebih dari 3300 °C</b>, cukup buat melelehkan baja! 🔩<br><b>Lainnya:</b> Bahan baku penting untuk sintesis berbagai bahan kimia organik, seperti plastik dan pelarut."
                },
                {
                    title: "Aman Nggak?",
                    content: "<b>Bahaya?:</b> Sangat berbahaya! 🔥<br><b>Risiko Utama:</b> Super mudah terbakar dan <b>sangat eksplosif</b>, terutama kalau ditekan atau dalam bentuk cair murni. Makanya, tabung las asetilena itu isinya bukan gas murni, tapi dilarutkan dalam aseton biar aman."
                },
                {
                    title: "Fakta Unik!",
                    content: "<b>Api Terpanas:</b> Nyala api oksiasetilena adalah salah satu nyala api hasil pembakaran kimia yang paling panas yang bisa dibuat manusia.<br><b>Lampu Karbit:</b> Dulu, sebelum ada senter modern, lampu karbit (yang menggunakan reaksi karbit + air untuk menghasilkan asetilena yang dibakar) sering dipakai oleh penjelajah gua dan penambang."
                }
            ]
        },
        C6H6: { 
            name: "Benzena (C₆H₆)", 
            description: "Senyawa organik aromatik dengan struktur cincin heksagonal planar yang sangat stabil.", 
            details: [
                { 
                    title: "Kartu Identitas Molekul", 
                    content: "<b>Nama Panggilan:</b> Benzena<br><b>Nama Resmi (IUPAC):</b> Benzene<br><b>Rumus:</b> C₆H₆<br><b>Berat Molekul:</b> 78.11 g/mol" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Benzena adalah 'diva' di dunia kimia organik! 💅 Dia ini cincin karbon super stabil yang jadi 'induk' dari semua senyawa aromatik. Dia punya bau khas yang agak manis, tapi jangan terkecoh, dia punya sisi gelap juga." 
                },
                { 
                    title: "Bentuk & Strukturnya", 
                    content: "<b>Bentuk Geometri:</b> Heksagonal Datar Sempurna (Planar).<br><b>Model:</b> Enam atom Karbon membentuk cincin segi enam yang rata, dan masing-masing Karbon ngikat satu Hidrogen.<br><b>Ikatan Spesial:</b> Ikatan antar Karbonnya itu unik banget! Bukan rangkap dua atau tunggal biasa, tapi sesuatu di antaranya, kayak ikatan 'satu setengah'. Elektronnya 'jalan-jalan' bebas di seluruh cincin (<b>resonansi</b>), bikin dia jadi super stabil." 
                },
                { 
                    title: "Penampilan Fisiknya", 
                    content: "<b>Wujud:</b> Cairan yang tidak berwarna.<br><b>Bau:</b> Bau yang agak manis dan khas (tapi jangan dicium!).<br><b>Sifat:</b> Mudah menguap dan sangat mudah terbakar." 
                },
                { 
                    title: "Sifat Kimianya", 
                    content: "<b>Kelakuan:</b> Karena super stabil (sifat <b>aromatisitas</b>), dia ini agak 'malas' bereaksi dengan cara biasa (reaksi adisi). Dia lebih suka <b>reaksi substitusi</b>, di mana salah satu atom Hidrogennya diganti sama atom atau gugus lain tanpa merusak cincinnya yang berharga." 
                },
                { 
                    title: "Asalnya dari Mana?", 
                    content: "<b>Sumber Alami:</b> Ditemukan secara alami dalam <b>minyak mentah (petroleum)</b> dan juga dilepaskan dari letusan gunung berapi dan kebakaran hutan.<br><b>Sumber Manusia:</b> Komponen dalam bensin dan asap rokok." 
                },
                { 
                    title: "Gimana Terbentuknya?", 
                    content: "<b>Di Industri:</b> Diproduksi dalam jumlah besar dari minyak bumi melalui proses yang disebut <b>catalytic reforming</b>." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Super Penting:</b> Sebagai <b>pelarut</b> industri dan bahan baku utama untuk membuat banyak barang! Mulai dari <b>plastik</b> (seperti stirena untuk styrofoam), serat sintetis (<b>nilon</b>), deterjen, pestisida, sampai obat-obatan." 
                },
                { 
                    title: "Aman Nggak?", 
                    content: "<b>Bahaya?:</b> Sangat berbahaya! ☠️<br><b>Risiko Utama:</b> Benzena bersifat <b>karsinogenik</b>, artinya bisa menyebabkan kanker (terutama leukemia) jika terpapar dalam jangka panjang. Dia juga sangat mudah terbakar.<br><b>Aturan Ketat:</b> Penggunaannya sekarang sangat dibatasi dan diatur ketat karena risikonya." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Mimpi Ular:</b> Struktur cincin benzena yang misterius akhirnya terpecahkan oleh ahli kimia August Kekulé pada tahun 1865. Konon, idenya muncul dari mimpi tentang ular yang menggigit ekornya sendiri! 🐍<br><b>Aromatik =/= Wangi:</b> Walaupun namanya 'aromatik' dan benzena punya bau manis, istilah 'aromatik' dalam kimia sekarang merujuk pada stabilitas elektron khusus dalam sistem cincin, bukan baunya." 
                }
            ]
        },
        C2H5OH: { 
            name: "Etanol (C₂H₅OH)", 
            description: "Alkohol primer sederhana yang bersifat polar karena adanya gugus hidroksil (-OH). Komponen utama dalam minuman beralkohol dan hand sanitizer.", 
            details: [
                { 
                    title: "Kartu Identitas Molekul", 
                    content: "<b>Nama Panggilan:</b> Etanol, Alkohol Gosok (kadang)<br><b>Nama Resmi (IUPAC):</b> Ethanol<br><b>Rumus:</b> C₂H₅OH<br><b>Berat Molekul:</b> 46.07 g/mol" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Etanol adalah jenis alkohol yang paling terkenal! Dia ada di minuman keras 🍺, bikin hand sanitizer ampuh bunuh kuman 🧴, dan bahkan bisa jadi bahan bakar mobil. Dia ini 'sepupu' Etana (C₂H₆), tapi ketambahan 'gantungan' -OH yang bikin sifatnya beda banget." 
                },
                { 
                    title: "Bentuk & Strukturnya", 
                    content: "<b>Model:</b> Kayak Etana (dua karbon gandengan), tapi satu Hidrogennya diganti sama gugus -OH (Oksigen gandeng Hidrogen).<br><b>Gugus Spesial:</b> Gugus <b>Hidroksil (-OH)</b> inilah 'bintang utamanya'. Gugus ini bikin dia jadi polar dan bisa 'berteman akrab' sama air.<br><b>Ikatan:</b> Ikatan kovalen." 
                },
                { 
                    title: "Penampilan Fisiknya", 
                    content: "<b>Wujud:</b> Cairan yang tidak berwarna.<br><b>Sifat:</b> Mudah menguap, baunya khas (bau 'alkohol'), dan gampang banget terbakar.<br><b>Bersahabat dengan Air:</b> Bisa larut sempurna dalam air dalam perbandingan berapa pun karena bisa membentuk ikatan hidrogen." 
                },
                { 
                    title: "Sifat Kimianya", 
                    content: "<b>Kepolaran:</b> Polar banget gara-gara ada gugus -OH.<br><b>Kelakuan:</b> Mudah terbakar menghasilkan CO₂ dan H₂O. Bisa dioksidasi jadi aldehida atau asam karboksilat. Bisa juga bereaksi sama logam aktif." 
                },
                { 
                    title: "Asalnya dari Mana?", 
                    content: "<b>Sumber Alami:</b> Hasil <b>fermentasi</b> gula oleh ragi (yeast). Proses inilah yang dipakai buat bikin bir, wine, dan minuman beralkohol lainnya sejak zaman dulu.<br><b>Sumber Industri:</b> Dibuat dari <b>etena</b> (C₂H₄) yang direaksikan dengan uap air pada suhu dan tekanan tinggi." 
                },
                { 
                    title: "Gimana Terbentuknya?", 
                    content: "<b>Fermentasi:</b> Ragi 'memakan' gula (misal glukosa) dan 'mengeluarkan' etanol dan karbon dioksida. Reaksi sederhananya: C₆H₁₂O₆ (gula) ⟶ 2C₂H₅OH (etanol) + 2CO₂ (karbon dioksida)." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Minuman:</b> Komponen utama minuman beralkohol.<br><b>Antiseptik:</b> Membunuh kuman di hand sanitizer atau alkohol gosok (biasanya konsentrasi 70%).<br><b>Pelarut:</b> Melarutkan banyak zat yang nggak larut di air (parfum, obat-obatan).<br><b>Bahan Bakar:</b> Dicampur dengan bensin sebagai <b>bioetanol</b>." 
                },
                { 
                    title: "Aman Nggak?", 
                    content: "<b>Risiko:</b> Sangat mudah terbakar! 🔥<br><b>Kalau Diminum:</b> Bersifat memabukkan dan depresan sistem saraf pusat. Konsumsi berlebihan bisa merusak hati dan organ lain, bahkan mematikan.<br><b>Jangan Campur Pemutih!:</b> Mencampur alkohol dengan pemutih bisa menghasilkan gas kloroform yang berbahaya." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Sejak Kapan?:</b> Manusia udah bikin minuman beralkohol (yang mengandung etanol) sejak ribuan tahun lalu, mungkin sejak zaman prasejarah!<br><b>Kenapa 70%?:</b> Konsentrasi etanol 70% ternyata lebih efektif membunuh kuman daripada 100% (absolut). Kenapa? Karena sedikit air membantu etanol menembus dinding sel bakteri." 
                }
            ]
        },
        CH2O: {
            name: "Formaldehida (CH₂O)",
            description: "Aldehida paling sederhana dengan bentuk trigonal planar. Gas berbau tajam yang digunakan sebagai pengawet.",
            details: [
                {
                    title: "Kartu Identitas Molekul",
                    content: "<b>Nama Panggilan:</b> Formaldehida, Formalin (larutannya)<br><b>Nama Resmi (IUPAC):</b> Methanal<br><b>Rumus:</b> CH₂O<br><b>Berat Molekul:</b> 30.03 g/mol"
                },
                {
                    title: "Siapakah Dia?",
                    content: "Formaldehida adalah si paling simpel dari geng aldehida! 👻 Dia ini gas yang baunya nusuk banget dan terkenal sebagai bahan utama <b>formalin</b>, cairan yang dipakai buat mengawetkan hewan-hewan di lab biologi (kodok, cacing, dll)."
                },
                {
                    title: "Bentuk & Strukturnya",
                    content: "<b>Bentuk Geometri:</b> Datar Sempurna (Trigonal Planar).<br><b>Model:</b> Satu atom Karbon di tengah, gandengan rangkap dua sama Oksigen, dan gandengan tunggal sama dua Hidrogen. Semuanya rapi di satu bidang datar.<br><b>Gugus Spesial:</b> Ini adalah contoh paling dasar dari gugus fungsi <b>Aldehida (-CHO)</b>."
                },
                {
                    title: "Penampilan Fisiknya",
                    content: "<b>Wujud:</b> Gas yang tidak berwarna.<br><b>Bau:</b> Sangat menyengat, bikin mata pedih dan sesak napas.<br><b>Sifat:</b> Gampang banget larut dalam air, membentuk larutan formalin."
                },
                {
                    title: "Sifat Kimianya",
                    content: "<b>Kelakuan:</b> Super reaktif! Ikatan rangkap C=O nya gampang 'diserang'. Dia juga gampang banget berpolimerisasi (molekul-molekulnya nyambung jadi rantai panjang)."
                },
                {
                    title: "Asalnya dari Mana?",
                    content: "<b>Sumber Alami:</b> Terbentuk dalam jumlah kecil di atmosfer dari reaksi metana dan sinar matahari. Juga diproduksi dalam metabolisme makhluk hidup.<br><b>Sumber Manusia:</b> Asap rokok, asap dari pembakaran kayu, dan knalpot kendaraan."
                },
                {
                    title: "Gimana Terbentuknya?",
                    content: "<b>Di Industri:</b> Dibuat secara besar-besaran dengan mengoksidasi metanol (alkohol kayu) pakai katalis perak atau besi oksida."
                },
                {
                    title: "Gunanya Buat Apa?",
                    content: "<b>Pengawet:</b> Larutan formalin dipakai buat mengawetkan spesimen biologis.<br><b>Industri:</b> Bahan baku super penting untuk membuat <b>resin</b> (perekat kayu lapis/plywood), plastik (seperti Bakelite), dan berbagai bahan kimia lainnya.<br><b>Lainnya:</b> Disinfektan dan bahan pembalsaman."
                },
                {
                    title: "Aman Nggak?",
                    content: "<b>Bahaya?:</b> Sangat berbahaya! ☠️<br><b>Risiko Utama:</b> Gasnya sangat iritatif bagi mata, hidung, dan tenggorokan. Paparan jangka panjang bersifat <b>karsinogenik</b> (menyebabkan kanker).<br><b>Penyalahgunaan:</b> Dulu sering disalahgunakan sebagai pengawet makanan (bakso, tahu), padahal sangat dilarang karena berbahaya!"
                },
                {
                    title: "Fakta Unik!",
                    content: "<b>Di Luar Angkasa:</b> Formaldehida adalah salah satu molekul organik pertama yang terdeteksi di ruang antarbintang! Keberadaannya jadi petunjuk penting tentang asal-usul kehidupan.<br><b>Nama Asal:</b> Namanya berasal dari 'Formic Acid' (Asam Semut), karena bisa dibuat dari oksidasi asam formiat."
                }
            ]
        },
        C3H6O: { 
            name: "Aseton (C₃H₆O)", 
            description: "Keton paling sederhana yang umum digunakan sebagai pelarut polar aprotik.", 
            details: [
                { 
                    title: "Kartu Identitas Molekul", 
                    content: "<b>Nama Panggilan:</b> Aseton, Penghapus Kuteks<br><b>Nama Resmi (IUPAC):</b> Propanone<br><b>Rumus:</b> C₃H₆O<br><b>Berat Molekul:</b> 58.08 g/mol" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Aseton adalah si 'pembersih kuteks' yang terkenal! 💅 Dia ini keton paling simpel dan jadi pelarut serbaguna yang jago banget melarutkan banyak zat, termasuk cat kuku, lem super, dan beberapa jenis plastik." 
                },
                { 
                    title: "Bentuk & Strukturnya", 
                    content: "<b>Bentuk Geometri:</b> Trigonal Planar di sekitar Karbon tengah.<br><b>Model:</b> Satu atom Karbon di tengah gandengan rangkap dua sama Oksigen (gugus karbonil C=O), dan juga gandengan sama dua gugus metil (-CH₃).<br><b>Gugus Spesial:</b> Ini contoh paling dasar dari gugus fungsi <b>Keton</b>, di mana C=O nya ada di *tengah* rantai karbon." 
                },
                { 
                    title: "Penampilan Fisiknya", 
                    content: "<b>Wujud:</b> Cairan yang tidak berwarna.<br><b>Bau:</b> Punya bau khas yang agak manis dan fruity (tapi jangan dihirup terlalu banyak!).<br><b>Sifat:</b> Sangat mudah menguap dan super mudah terbakar." 
                },
                { 
                    title: "Sifat Kimianya", 
                    content: "<b>Kepolaran:</b> Polar (karena ada C=O), tapi dia *aprotik* (nggak punya H yang nempel di O), jadi sifat pelarutnya beda sama air atau alkohol.<br><b>Kelakuan:</b> Mudah terbakar. Gugus C=O nya bisa bereaksi, tapi nggak sereaktif aldehida." 
                },
                { 
                    title: "Asalnya dari Mana?", 
                    content: "<b>Sumber Alami:</b> Diproduksi secara alami dalam jumlah kecil di dalam tubuh kita selama proses metabolisme lemak (sebagai 'benda keton'). Juga ditemukan di tanaman dan gas vulkanik.<br><b>Sumber Industri:</b> Diproduksi secara besar-besaran, biasanya barengan sama fenol (proses Cumene)." 
                },
                { 
                    title: "Gimana Terbentuknya?", 
                    content: "Di tubuh, terbentuk saat kita membakar lemak sebagai sumber energi utama (misalnya saat puasa atau diet keto). Di industri, proses Cumene melibatkan reaksi antara benzena dan propena." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Paling Penting:</b> Sebagai <b>pelarut</b> serbaguna di industri dan lab. Jago melarutkan cat, pernis, lem, tinta, dan plastik.<br><b>Sehari-hari:</b> Bahan utama <b>penghapus cat kuku</b>.<br><b>Lainnya:</b> Bahan baku untuk membuat plastik lain (seperti PMMA/akrilik) dan bahan kimia." 
                },
                { 
                    title: "Aman Nggak?", 
                    content: "<b>Toksisitas:</b> Uapnya bisa bikin pusing, mual, dan iritasi mata/tenggorokan jika terhirup banyak.<br><b>Risiko Utama:</b> Sangat-sangat mudah terbakar! 🔥 Jauhkan dari api atau sumber panas.<br><b>Di Tubuh:</b> Kalau jumlahnya berlebihan di tubuh (kondisi ketoasidosis pada diabetes), bisa berbahaya." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Bisa Melarutkan Styrofoam!:</b> Aseton terkenal bisa 'melelehkan' styrofoam (polistirena) dengan cepat. Coba deh tetesin sedikit (hati-hati!), styrofoamnya bakal langsung kempes. Ini karena aseton melarutkan polimer polistirena.<br><b>Napas Bau Aseton:</b> Pada penderita diabetes yang tidak terkontrol, tubuh mereka memproduksi banyak benda keton, termasuk aseton. Ini bisa bikin napas mereka punya bau khas yang manis seperti buah." 
                }
            ]
        },
        HCOOH: {
            name: "Asam Formiat (HCOOH)",
            description: "Asam karboksilat paling sederhana. Molekul ini unik karena juga memiliki sifat aldehida, dan sepenuhnya planar (datar).",
            details: [
                {
                    title: "Kartu Identitas Molekul",
                    content: "<b>Nama Panggilan:</b> Asam Semut (Formic Acid)<br><b>Nama Resmi (IUPAC):</b> Methanoic Acid<br><b>Rumus:</b> HCOOH<br><b>Berat Molekul:</b> 46.03 g/mol"
                },
                {
                    title: "Siapakah Dia?",
                    content: "Asam formiat adalah asam karboksilat paling 'junior'! 🐜 Dia ini yang bikin gigitan semut atau sengatan lebah terasa perih dan gatal. Uniknya, dia ini molekul 'dua muka', punya sifat asam sekaligus aldehida."
                },
                {
                    title: "Bentuk & Strukturnya",
                    content: "<b>Bentuk Geometri:</b> Datar Sempurna (Planar).<br><b>Model:</b> Satu atom Karbon di tengah gandengan sama dua Oksigen (satu rangkap dua, satu tunggal) dan satu Hidrogen. Semua rapi di satu bidang.<br><b>Gugus Spesial:</b> Punya gugus <b>Asam Karboksilat (-COOH)</b> DAN karena ada H yang nempel langsung di C=O, dia juga punya sifat gugus <b>Aldehida (-CHO)</b>."
                },
                {
                    title: "Penampilan Fisiknya",
                    content: "<b>Wujud:</b> Cairan yang tidak berwarna.<br><b>Bau:</b> Punya bau yang sangat tajam dan menusuk hidung.<br><b>Sifat:</b> Korosif."
                },
                {
                    title: "Sifat Kimianya",
                    content: "<b>Keasaman:</b> Merupakan asam lemah, tapi paling kuat di antara asam karboksilat sederhana lainnya.<br><b>Kelakuan:</b> Karena punya 'dua muka', dia bisa bereaksi sebagai asam (melepaskan H⁺) dan juga sebagai aldehida (bisa dioksidasi, nggak kayak asam karboksilat lain)."
                },
                {
                    title: "Asalnya dari Mana?",
                    content: "<b>Sumber Alami:</b> Ditemukan dalam <b>racun sengatan semut</b> dan lebah. Juga ada di jelatang.<br><b>Sumber Lain:</b> Produk sampingan dari metabolisme beberapa organisme."
                },
                {
                    title: "Gimana Terbentuknya?",
                    content: "<b>Di Industri:</b> Biasanya dibuat dari metanol (alkohol kayu) yang direaksikan dengan karbon monoksida, lalu hasilnya direaksikan lagi dengan air."
                },
                {
                    title: "Gunanya Buat Apa?",
                    content: "<b>Di Peternakan:</b> Dipakai sebagai <b>pengawet</b> dan agen antibakteri dalam pakan ternak.<br><b>Di Industri:</b> Untuk proses penyamakan kulit, pewarnaan tekstil, dan sebagai pembersih kerak (descaler)."
                },
                {
                    title: "Aman Nggak?",
                    content: "<b>Bahaya?:</b> Lumayan berbahaya.<br><b>Risiko:</b> Cairannya sangat <b>korosif</b> dan bisa menyebabkan luka bakar kimia pada kulit dan mata. Uapnya juga iritatif bagi sistem pernapasan."
                },
                {
                    title: "Fakta Unik!",
                    content: "<b>Nama dari Semut:</b> Nama 'formiat' berasal dari kata Latin untuk semut, yaitu <i>formica</i>.<br><b>Senjata Kimia Alami:</b> Kemampuannya bikin perih adalah mekanisme pertahanan diri bagi semut dan lebah terhadap predator."
                }
            ]
        },
        CH3COOH: { 
            name: "Asam Asetat (CH₃COOH)", 
            description: "Asam karboksilat sederhana, komponen utama yang memberikan rasa asam dan bau tajam pada cuka.", 
            details: [
                { 
                    title: "Kartu Identitas Molekul", 
                    content: "<b>Nama Panggilan:</b> Asam Asetat, Asam Cuka<br><b>Nama Resmi (IUPAC):</b> Ethanoic Acid<br><b>Rumus:</b> CH₃COOH<br><b>Berat Molekul:</b> 60.05 g/mol" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Asam asetat adalah biang keladi di balik rasa asam dan bau menyengat dari <b>cuka</b>! 😖 Dia ini asam karboksilat kedua paling simpel setelah asam formiat, dan salah satu bahan kimia organik paling penting di industri." 
                },
                { 
                    title: "Bentuk & Strukturnya", 
                    content: "<b>Model:</b> Bayangin gugus metil (-CH₃) yang gandengan sama gugus asam karboksilat (-COOH). Bagian -COOH nya itu datar (trigonal planar) di sekitar Karbon tengah.<br><b>Gugus Spesial:</b> Gugus <b>Asam Karboksilat (-COOH)</b> adalah 'bintang'-nya. Gugus inilah yang bisa 'melepas' ion H⁺ dan bikin dia jadi asam." 
                },
                { 
                    title: "Penampilan Fisiknya", 
                    content: "<b>Wujud:</b> Cairan yang tidak berwarna.<br><b>Bau:</b> Bau super tajam dan menusuk, khas bau cuka.<br><b>Sifat:</b> Korosif. Kalau didinginkan di bawah 16.6 °C, dia bisa membeku jadi kristal mirip es, makanya versi murninya disebut 'asam asetat glasial'." 
                },
                { 
                    title: "Sifat Kimianya", 
                    content: "<b>Keasaman:</b> Merupakan <b>asam lemah</b>. Artinya, kalau dilarutkan dalam air, cuma sebagian kecil molekulnya yang 'melepas' ion H⁺.<br><b>Kelakuan:</b> Bisa bereaksi dengan basa (membentuk garam asetat), alkohol (membentuk ester yang wangi), dan logam tertentu." 
                },
                { 
                    title: "Asalnya dari Mana?", 
                    content: "<b>Sumber Alami:</b> Dihasilkan secara alami oleh bakteri (seperti *Acetobacter*) melalui proses <b>fermentasi</b> etanol. Inilah cara cuka dibuat dari wine atau sari buah.<br><b>Sumber Industri:</b> Diproduksi secara besar-besaran, biasanya dari metanol dan karbon monoksida." 
                },
                { 
                    title: "Gimana Terbentuknya?", 
                    content: "<b>Pembuatan Cuka:</b> Bakteri *Acetobacter* 'mengubah' etanol (C₂H₅OH) di dalam minuman anggur atau sari buah menjadi asam asetat (CH₃COOH) dengan bantuan oksigen dari udara. Reaksinya: C₂H₅OH + O₂ ⟶ CH₃COOH + H₂O." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Di Dapur:</b> Sebagai <b>cuka makan</b> untuk memberi rasa asam pada makanan, acar, dan saus salad.<br><b>Di Industri:</b> Pelarut penting, bahan baku pembuatan plastik seperti polivinil asetat (<b>lem kayu PVA</b>) dan selulosa asetat (serat rayon), serta untuk produksi pewarna dan obat-obatan." 
                },
                { 
                    title: "Aman Nggak?", 
                    content: "<b>Risiko:</b> Asam asetat pekat (glasial) sangat <b>korosif</b> dan bisa menyebabkan luka bakar kimia parah pada kulit dan mata. Uapnya juga sangat iritatif.<br><b>Cuka Makan:</b> Cuka makan (larutan encer sekitar 4-8%) relatif aman, tapi tetap bisa bikin perih kalau kena luka." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Empat Rasa Dasar?:</b> Dulu orang mengira hanya ada empat rasa dasar (manis, asin, pahit, asam). Rasa asam yang kita deteksi itu sebagian besar karena adanya ion H⁺ yang dilepaskan oleh asam seperti asam asetat.<br><b>Pembersih Alami:</b> Cuka sering dipakai sebagai pembersih rumah tangga yang ramah lingkungan karena sifat asamnya bisa melarutkan kerak mineral dan membunuh beberapa jenis kuman." 
                }
            ]
        },
        CH3CONH2: { 
            name: "Asetamida (CH₃CONH₂)", 
            description: "Amida paling sederhana, mengandung gugus fungsi amida (-CONH₂) yang merupakan dasar dari ikatan peptida dalam protein.", 
            details: [
                { 
                    title: "Kartu Identitas Molekul", 
                    content: "<b>Nama Panggilan:</b> Asetamida<br><b>Nama Resmi (IUPAC):</b> Ethanamide<br><b>Rumus:</b> CH₃CONH₂<br><b>Berat Molekul:</b> 59.07 g/mol" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Asetamida adalah versi 'junior' dari ikatan super penting yang nyambungin asam amino jadi protein di tubuh kita! 🧬 Dia ini amida paling simpel, kayak model dasar buat ngertiin gimana protein terbentuk." 
                },
                { 
                    title: "Bentuk & Strukturnya", 
                    content: "<b>Model:</b> Bayangin gugus metil (-CH₃) gandengan sama gugus amida (-CONH₂).<br><b>Gugus Spesial:</b> Gugus <b>Amida (-CONH₂)</b> adalah gabungan dari karbonil (C=O) dan amina (-NH₂).<br><b>Struktur Datar:</b> Bagian O=C-N nya itu cenderung datar (planar) karena elektronnya suka 'jalan-jalan' bolak-balik (resonansi)." 
                },
                { 
                    title: "Penampilan Fisiknya", 
                    content: "<b>Wujud:</b> Padatan kristal.<br><b>Warna:</b> Putih.<br><b>Bau:</b> Kalau murni, hampir nggak berbau, tapi kadang ada sedikit bau 'tikus'.<br><b>Sifat:</b> Bisa larut dalam air." 
                },
                { 
                    title: "Sifat Kimianya", 
                    content: "<b>Kepolaran:</b> Polar.<br><b>Kelakuan:</b> Cukup stabil. Bisa dihidrolisis (dipecah pakai air) jadi asam asetat dan amonia, tapi butuh kondisi agak ekstrem (asam atau basa kuat)." 
                },
                { 
                    title: "Asalnya dari Mana?", 
                    content: "<b>Sumber Alami:</b> Ditemukan dalam jumlah kecil di beberapa mineral dan di dalam asap pembakaran batu bara.<br><b>Sumber Industri:</b> Dibuat di pabrik kimia." 
                },
                { 
                    title: "Gimana Terbentuknya?", 
                    content: "<b>Cara Umum:</b> Biasanya dibuat dengan mereaksikan amonia (NH₃) dengan turunan asam asetat (seperti anhidrida asetat atau asetil klorida). Mirip kayak 'memaksa' asam dan basa buat bergabung." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Di Industri:</b> Dipakai sebagai <b>pelarut</b> untuk beberapa jenis zat organik.<br><b>Lainnya:</b> Sebagai <b>plasticizer</b> (bahan yang bikin plastik jadi lebih fleksibel) dan bahan baku untuk sintesis obat-obatan dan bahan kimia lainnya." 
                },
                { 
                    title: "Aman Nggak?", 
                    content: "<b>Toksisitas:</b> Dianggap agak beracun.<br><b>Risiko:</b> Bisa menyebabkan iritasi kalau kena kulit atau mata. Paparan jangka panjang diduga bisa berpengaruh buruk pada kesehatan.<br><b>Perhatian:</b> Tidak mudah terbakar seperti pelarut organik lainnya." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Fondasi Protein:</b> Ikatan amida (yang mirip banget sama di asetamida) adalah <b>ikatan peptida</b>. Ratusan atau ribuan ikatan peptida inilah yang merangkai asam amino menjadi rantai protein yang panjang dan kompleks di dalam tubuh kita. Jadi, asetamida ini kayak miniatur dari 'lem' kehidupan!" 
                }
            ]
        },
        CH3CN: {
            name: "Asetonitril (CH₃CN)",
            description: "Molekul dengan geometri campuran: gugus metil (-CH₃) tetrahedral dan gugus nitril (-C≡N) linear.",
            details: [
                {
                    title: "Kartu Identitas Molekul",
                    content: "<b>Nama Panggilan:</b> Asetonitril, Metil Sianida<br><b>Nama Resmi (IUPAC):</b> Ethanenitrile<br><b>Rumus:</b> CH₃CN<br><b>Berat Molekul:</b> 41.05 g/mol"
                },
                {
                    title: "Siapakah Dia?",
                    content: "Asetonitril adalah pelarut 'dua kepribadian'! 😎 Sebagian tubuhnya (gugus metil) punya bentuk kayak Metana, tapi bagian lainnya (gugus nitril) lurus kaku kayak penggaris. Dia ini pelarut super penting di lab kimia."
                },
                {
                    title: "Bentuk & Strukturnya",
                    content: "<b>Bentuk Geometri:</b> Campuran! Bagian -CH₃ nya <b>Tetrahedral</b>, bagian -C≡N nya <b>Linear</b>.<br><b>Model:</b> Gugus metil (-CH₃) yang 'gendut' nyambung ke atom Karbon yang lurus gandengan rangkap tiga sama Nitrogen.<br><b>Gugus Spesial:</b> Gugus <b>Nitril (-C≡N)</b> yang punya ikatan rangkap tiga super kuat."
                },
                {
                    title: "Penampilan Fisiknya",
                    content: "<b>Wujud:</b> Cairan yang tidak berwarna.<br><b>Bau:</b> Punya bau yang agak manis dan mirip eter.<br><b>Sifat:</b> Mudah menguap."
                },
                {
                    title: "Sifat Kimianya",
                    content: "<b>Kepolaran:</b> Polar (karena tarikan kuat dari Nitrogen), tapi dia *aprotik* (nggak punya H yang nempel di N atau O).<br><b>Kelakuan:</b> Cukup stabil, tapi bisa terbakar. Gugus nitrilnya bisa diubah jadi gugus fungsi lain lewat berbagai reaksi kimia."
                },
                {
                    title: "Asalnya dari Mana?",
                    content: "<b>Sumber:</b> Kebanyakan dibuat di industri. Jarang ditemukan dalam jumlah besar di alam."
                },
                {
                    title: "Gimana Terbentuknya?",
                    content: "<b>Di Industri:</b> Biasanya didapat sebagai <b>produk sampingan</b> saat membuat akrilonitril (bahan baku plastik ABS dan serat akrilik). Jadi, dia ini kayak 'bonus' dari proses lain."
                },
                {
                    title: "Gunanya Buat Apa?",
                    content: "<b>Super Penting di Lab:</b> Pelarut pilihan utama untuk teknik pemisahan canggih yang disebut <b>HPLC</b> (High-Performance Liquid Chromatography). Ibaratnya, dia ini 'jalan tol' buat molekul-molekul yang mau dipisahkan.<br><b>Lainnya:</b> Pelarut dalam sintesis obat-obatan dan bahan kimia, serta dipakai buat mengekstrak lemak dan minyak."
                },
                {
                    title: "Aman Nggak?",
                    content: "<b>Toksisitas:</b> Lumayan beracun.<br><b>Risiko:</b> Uapnya bisa bikin pusing dan iritasi. Kalau tertelan atau terserap kulit dalam jumlah banyak, bisa dimetabolisme jadi sianida di dalam tubuh! ☠️<br><b>Risiko Lain:</b> Mudah terbakar."
                },
                {
                    title: "Fakta Unik!",
                    content: "<b>Pelarut Aprotik Polar:</b> Sifatnya yang polar tapi nggak punya ikatan O-H atau N-H (aprotik) membuatnya sangat berguna untuk jenis reaksi kimia tertentu yang nggak bisa dilakukan di air atau alkohol.<br><b>Deteksi di Luar Angkasa:</b> Asetonitril juga telah terdeteksi di awan gas antarbintang, termasuk di sekitar bintang muda!"
                }
            ]
        },
        CCl4: { 
            name: "Karbon Tetraklorida (CCl₄)", 
            description: "Senyawa organik volatil dengan geometri tetrahedral. Dahulu digunakan sebagai pemadam api dan refrigeran.", 
            details: [
                { 
                    title: "Kartu Identitas Molekul", 
                    content: "<b>Nama Panggilan:</b> Karbon Tet, CTC<br><b>Nama Resmi (IUPAC):</b> Tetrachloromethane<br><b>Rumus:</b> CCl₄<br><b>Berat Molekul:</b> 153.82 g/mol" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Karbon tetraklorida adalah molekul 'mantan bintang' yang sekarang jadi buronan lingkungan. 🕵️ Dulu dia super populer sebagai pembersih hebat dan pemadam api, tapi ternyata dia punya sisi gelap yang berbahaya banget buat ozon dan kesehatan kita." 
                },
                { 
                    title: "Bentuk & Strukturnya", 
                    content: "<b>Bentuk Geometri:</b> Tetrahedral Sempurna.<br><b>Model:</b> Mirip Metana (CH₄), tapi keempat atom Hidrogennya diganti sama atom Klorin yang lebih besar. Super simetris!<br><b>Ikatan:</b> Ikatan kovalen polar (C-Cl), tapi karena bentuknya yang simetris sempurna, molekulnya jadi <b>nonpolar</b> secara keseluruhan." 
                },
                { 
                    title: "Penampilan Fisiknya", 
                    content: "<b>Wujud:</b> Cairan padat (berat!) yang tidak berwarna.<br><b>Bau:</b> Punya bau yang agak manis, mirip kloroform (tapi jangan dicium!).<br><b>Sifat:</b> Tidak mudah terbakar. Ini salah satu alasan kenapa dulu dipakai sebagai pemadam api." 
                },
                { 
                    title: "Sifat Kimianya", 
                    content: "<b>Kepolaran:</b> Nonpolar.<br><b>Kelakuan:</b> Cukup stabil dalam kondisi normal, tapi bisa terurai jadi zat berbahaya kalau kena panas tinggi atau sinar UV." 
                },
                { 
                    title: "Asalnya dari Mana?", 
                    content: "<b>Sumber:</b> Tidak ditemukan secara alami. Dia murni produk industri kimia buatan manusia." 
                },
                { 
                    title: "Gimana Terbentuknya?", 
                    content: "<b>Di Industri:</b> Dulu dibuat dengan mereaksikan klorin dengan metana atau senyawa klorin lain pada suhu tinggi. Tapi produksinya sekarang sudah sangat dibatasi." 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Kegunaan (Historis):</b><br>• <b>Pemadam Api:</b> Dulu populer buat alat pemadam api karena nggak mudah terbakar.<br>• <b>Pembersih:</b> Pelarut 'dry cleaning' yang ampuh buat ngilangin noda minyak.<br>• <b>Refrigeran:</b> Salah satu bahan pembuat Freon (pendingin AC/kulkas) generasi awal.<br><b>Sekarang:</b> Hampir semua penggunaannya sudah dilarang!" 
                },
                { 
                    title: "Aman Nggak?", 
                    content: "<b>Bahaya?:</b> Sangat berbahaya! ☠️<br><b>Risiko Utama:</b><br>1. <b>Merusak Ozon:</b> Dia adalah salah satu zat perusak lapisan ozon paling parah.<br>2. <b>Racun Hati:</b> Sangat beracun bagi hati (hepatotoksik) dan bisa menyebabkan kerusakan hati permanen.<br>3. <b>Karsinogenik:</b> Diduga kuat menyebabkan kanker.<br><b>Status:</b> Penggunaannya diatur ketat oleh Protokol Montreal." 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Gas Rumah Kaca Juga:</b> Selain merusak ozon, CCl₄ juga merupakan gas rumah kaca yang cukup poten.<br><b>Penghapus Tipe-X Kuno:</b> Dulu, cairan penghapus tipe-x (correction fluid) sering mengandung pelarut seperti CCl₄ atau trikloroetana, makanya baunya khas banget (dan berbahaya kalau dihirup)." 
                }
            ]
        },
        C6H12O6: {
            name: "Glukosa (C₆H₁₂O₆)",
            description: "Gula monosakarida yang merupakan sumber energi utama bagi sebagian besar organisme. Memiliki struktur cincin heksagonal.",
            details: [
                {
                    title: "Kartu Identitas Molekul",
                    content: "<b>Nama Panggilan:</b> Glukosa, Gula Darah, Dekstrosa<br><b>Nama Resmi (IUPAC):</b> D-Glucose<br><b>Rumus:</b> C₆H₁₂O₆<br><b>Berat Molekul:</b> 180.16 g/mol"
                },
                {
                    title: "Siapakah Dia?",
                    content: "Glukosa adalah 'bahan bakar' utama kehidupan! ⛽ Dia ini gula paling dasar yang dipakai sel-sel kita (dan hampir semua makhluk hidup lain) buat dapetin energi. Dia juga hasil utama dari fotosintesis tumbuhan."
                },
                {
                    title: "Bentuk & Strukturnya",
                    content: "<b>Model:</b> Paling sering ditemui dalam bentuk <b>cincin segi enam</b> (piranosa). Cincin ini nggak datar, tapi melipat kayak 'kursi malas' (chair conformation) biar lebih stabil.<br><b>Gugus Spesial:</b> Punya banyak gugus hidroksil (-OH) yang bikin dia 'lengket' sama air, dan satu gugus aldehida (-CHO) (kalau lagi dalam bentuk rantai terbuka)."
                },
                {
                    title: "Penampilan Fisiknya",
                    content: "<b>Wujud:</b> Padatan kristal.<br><b>Warna:</b> Putih.<br><b>Rasa:</b> Manis (tapi nggak semanis gula dapur/sukrosa).<br><b>Sifat:</b> Gampang banget larut dalam air."
                },
                {
                    title: "Sifat Kimianya",
                    content: "<b>Kelakuan:</b> Bisa bereaksi sebagai aldehida (makanya disebut 'gula pereduksi'). Yang paling penting, molekul glukosa bisa 'gandengan' satu sama lain membentuk rantai panjang seperti <b>pati</b> (buat simpan energi) atau <b>selulosa</b> (buat dinding sel tumbuhan)."
                },
                {
                    title: "Asalnya dari Mana?",
                    content: "<b>Sumber Utama:</b> Dibuat oleh tumbuhan, alga, dan beberapa bakteri lewat <b>fotosintesis</b> (pakai CO₂, air, dan cahaya matahari).<br><b>Ditemukan di:</b> Buah-buahan manis, madu, dan tentunya, di dalam darah kita sebagai 'gula darah'."
                },
                {
                    title: "Gimana Terbentuknya?",
                    content: "<b>Fotosintesis:</b> Reaksi ajaibnya: 6CO₂ + 6H₂O + Cahaya Matahari ⟶ C₆H₁₂O₆ + 6O₂.<br><b>Di Industri:</b> Biasanya dibuat dengan 'memecah' pati (dari jagung atau kentang) pakai enzim atau asam."
                },
                {
                    title: "Gunanya Buat Apa?",
                    content: "<b>Sumber Energi No. 1:</b> Bahan bakar utama untuk <b>respirasi seluler</b> di dalam sel kita, menghasilkan molekul energi ATP.<br><b>Pemanis:</b> Digunakan sebagai pemanis dalam makanan dan minuman.<br><b>Batu Bata:</b> Unit dasar pembangun karbohidrat kompleks seperti pati, selulosa, dan glikogen (simpanan energi di hewan)."
                },
                {
                    title: "Aman Nggak?",
                    content: "<b>Penting Banget!:</b> Kita butuh glukosa untuk energi.<br><b>Tapi Awas!:</b> Kadar glukosa darah yang terlalu tinggi dalam jangka panjang (seperti pada <b>diabetes</b>) bisa merusak pembuluh darah, saraf, dan organ tubuh lainnya."
                },
                {
                    title: "Fakta Unik!",
                    content: "<b>Makanan Otak:</b> Otak kita itu 'rakus' glukosa! Dia memakai sekitar 20% dari total energi glukosa yang kita konsumsi.<br><b>Punya Kembaran:</b> Glukosa punya 'kembaran' isomer bernama Fruktosa (gula buah), rumusnya sama (C₆H₁₂O₆) tapi strukturnya sedikit beda dan rasanya lebih manis."
                }
            ]
        },
        C8H10N4O2: {
            name: "Kafein (C₈H₁₀N₄O₂)",
            description: "Stimulan sistem saraf pusat dari kelas metilxantina. Salah satu zat psikoaktif yang paling banyak dikonsumsi di dunia.",
            details: [
                {
                    title: "Kartu Identitas Molekul",
                    content: "<b>Nama Panggilan:</b> Kafein<br><b>Nama Resmi (IUPAC):</b> 1,3,7-Trimethylxanthine<br><b>Rumus:</b> C₈H₁₀N₄O₂<br><b>Berat Molekul:</b> 194.19 g/mol"
                },
                {
                    title: "Siapakah Dia?",
                    content: "Kafein adalah 'jagoan' bikin melek sejagat raya! ☕ Dia ini zat stimulan alami yang ada di kopi, teh, dan cokelat kesukaanmu. Dialah alasan kenapa secangkir kopi bisa bikin ngantuk hilang seketika."
                },
                {
                    title: "Bentuk & Strukturnya",
                    content: "<b>Model:</b> Strukturnya agak ribet, punya dua cincin yang nyatu (kerangka purin), mirip sama basa DNA Adenin dan Guanin, tapi ketambahan tiga 'gantungan' metil (-CH₃) dan dua atom Oksigen.<br><b>Struktur:</b> Relatif datar karena sistem cincinnya."
                },
                {
                    title: "Penampilan Fisiknya",
                    content: "<b>Wujud:</b> Padatan kristal.<br><b>Warna:</b> Putih.<br><b>Rasa:</b> Pahit banget kalau murni!<br><b>Sifat:</b> Larut lumayan baik dalam air panas."
                },
                {
                    title: "Sifat Kimianya",
                    content: "<b>Kelakuan:</b> Di dalam tubuh, dia jago banget 'menipu' otak kita. Dia bisa nyamar jadi molekul lain (adenosin) dan bikin kita nggak merasa ngantuk. Dia juga bersifat diuretik ringan (bikin sering pipis)."
                },
                {
                    title: "Asalnya dari Mana?",
                    content: "<b>Sumber Alami:</b> Biji kopi, daun teh (termasuk teh hijau, hitam, oolong), biji kakao (cokelat!), buah guarana, dan kacang kola. Tumbuhan bikin kafein buat jadi 'pestisida alami'."
                },
                {
                    title: "Gimana Terbentuknya?",
                    content: "<b>Di Tanaman:</b> Dibuat oleh tanaman lewat serangkaian reaksi biokimia yang kompleks dari molekul purin lain.<br><b>Di Industri:</b> Bisa juga disintesis di lab, tapi mengekstraknya dari sumber alami biasanya lebih gampang."
                },
                {
                    title: "Gunanya Buat Apa?",
                    content: "<b>Paling Populer:</b> Meningkatkan kewaspadaan, mengurangi rasa lelah, dan memperbaiki mood (makanya kopi dan teh populer banget!).<br><b>Di Obat:</b> Sering ditambahkan ke obat pereda nyeri (kayak obat sakit kepala) karena bisa meningkatkan efektivitasnya.<br><b>Olahraga:</b> Kadang dipakai atlet untuk meningkatkan performa."
                },
                {
                    title: "Aman Nggak?",
                    content: "<b>Dosis Normal:</b> Relatif aman dalam jumlah sedang (misal 1-3 cangkir kopi).<br><b>Tapi Awas!:</b> Kebanyakan kafein bisa bikin gelisah, deg-degan, susah tidur (insomnia), sakit perut, dan bahkan kecanduan ringan. Overdosis kafein (sangat jarang, tapi mungkin) bisa berbahaya."
                },
                {
                    title: "Fakta Unik!",
                    content: "<b>Pestisida Alami:</b> Di dalam tanaman, kafein berfungsi sebagai racun saraf yang bisa melumpuhkan atau membunuh serangga yang mencoba memakannya. Jahat tapi cerdas!<br><b>Cara Kerja di Otak:</b> Kafein 'duduk' di tempat parkir molekul adenosin. Adenosin ini tugasnya bikin kita ngantuk. Kalau tempat parkirnya diduduki kafein, adenosin nggak bisa kerja, makanya kita jadi melek terus!"
                }
            ]
        },
        C8H8: {
            name: "Cubane (C₈H₈)",
            description: "Hidrokarbon sintetik dengan delapan atom karbon tersusun di sudut-sudut kubus. Memiliki tegangan cincin dan sudut yang sangat tinggi.",
            details: [
                {
                    title: "Kartu Identitas Molekul",
                    content: "<b>Nama Panggilan:</b> Cubane (Kubana)<br><b>Nama Resmi (IUPAC):</b> Susah banget! 😂 Panggil aja Cubane.<br><b>Rumus:</b> C₈H₈<br><b>Berat Molekul:</b> 104.15 g/mol"
                },
                {
                    title: "Siapakah Dia?",
                    content: "Cubane adalah molekul 'mustahil' yang jadi kenyataan! 🧊 Dia ini hidrokarbon super unik yang atom karbonnya membentuk **kubus sempurna**. Bayangin aja, molekul berbentuk dadu! Ini adalah salah satu bentuk paling aneh dan tegang di dunia kimia."
                },
                {
                    title: "Bentuk & Strukturnya",
                    content: "<b>Bentuk Geometri:</b> Kubus Sempurna!<br><b>Model:</b> Delapan atom Karbon nongkrong persis di setiap sudut kubus, dan masing-masing ngikat satu atom Hidrogen yang menunjuk keluar.<br><b>Ikatan 'Stres':</b> Atom karbon itu maunya sudut 109.5°, tapi di sini dipaksa jadi **90°**. Ini bikin ikatannya jadi super tegang, kayak per yang ditekan habis-habisan!"
                },
                {
                    title: "Penampilan Fisiknya",
                    content: "<b>Wujud:</b> Padatan kristal.<br><b>Warna:</b> Putih.<br><b>Sifat:</b> Mengejutkan, dia lumayan stabil pada suhu kamar meskipun tegang banget."
                },
                {
                    title: "Sifat Kimianya",
                    content: "<b>Kelakuan:</b> Walaupun stabil diem aja, energi yang 'terjebak' di dalam ikatannya itu gede banget! Karena tegangannya, dia bisa bereaksi dengan cara-cara yang nggak biasa, seringkali melepaskan banyak energi kalau 'dipancing'."
                },
                {
                    title: "Asalnya dari Mana?",
                    content: "<b>Sumber:</b> 100% buatan manusia di laboratorium. Nggak ada ceritanya nemu Cubane di alam bebas."
                },
                {
                    title: "Gimana Terbentuknya?",
                    content: "<b>Super Sulit!:</b> Dibuat pertama kali oleh Philip Eaton tahun 1964 lewat serangkaian reaksi kimia yang panjang, rumit, dan butuh keahlian tingkat tinggi. Ini dianggap sebagai salah satu 'mahakarya' sintesis kimia organik."
                },
                {
                    title: "Gunanya Buat Apa?",
                    content: "<b>Riset:</b> Kebanyakan dipakai buat penelitian fundamental tentang ikatan kimia dan molekul tegang.<br><b>Potensi Gila:</b> Karena nyimpen banyak energi, turunannya diteliti buat jadi <b>bahan bakar roket</b> super kuat atau bahkan <b>bahan peledak</b> canggih! 🚀💣"
                },
                {
                    title: "Aman Nggak?",
                    content: "<b>Toksisitas:</b> Anehnya, nggak terlalu beracun.<br><b>Tapi Awas!:</b> Energi yang tersimpan itu bahaya laten. Kalau nggak hati-hati, bisa terurai secara eksplosif. Bukan mainan!"
                },
                {
                    title: "Fakta Unik!",
                    content: "<b>Bentuk Platonic:</b> Kubus adalah salah satu dari lima 'Bentuk Platonic' (bentuk 3D sempurna). Cubane adalah satu-satunya hidrokarbon yang kerangkanya persis sama dengan salah satu bentuk ini.<br><b>Kepadatan Energi:</b> Cubane punya salah satu kepadatan energi tertinggi per volume di antara semua hidrokarbon. Kecil-kecil cabe rawit!"
                }
            ]
        },
        C10H16: {
            name: "Adamantane (C₁₀H₁₆)",
            description: "Hidrokarbon polisiklik dengan struktur sangkar kaku yang identik dengan unit terkecil dari kisi kristal berlian. Sangat simetris dan bebas tegangan.",
            details: [
                {
                    title: "Kartu Identitas Molekul",
                    content: "<b>Nama Panggilan:</b> Adamantane<br><b>Nama Resmi (IUPAC):</b> Tricyclo[3.3.1.1³,⁷]decane<br><b>Rumus:</b> C₁₀H₁₆<br><b>Berat Molekul:</b> 136.23 g/mol"
                },
                {
                    title: "Siapakah Dia?",
                    content: "Adamantane adalah 'berlian mini' di dunia molekul! 💎 Bentuknya super simetris dan kaku, persis kayak potongan terkecil dari struktur kristal berlian. Dia ini molekul sangkar yang paling stabil dan paling terkenal."
                },
                {
                    title: "Bentuk & Strukturnya",
                    content: "<b>Bentuk Geometri:</b> Sangkar Simetris (mirip berlian).<br><b>Model:</b> Sepuluh atom Karbon membentuk kerangka 3D yang terdiri dari tiga cincin sikloheksana yang 'menyatu' dalam bentuk kursi sempurna.<br><b>Bebas Stres:</b> Semua sudut ikatannya mendekati 109.5° yang ideal, bikin dia jadi molekul yang super 'santai' dan bebas tegangan cincin."
                },
                {
                    title: "Penampilan Fisiknya",
                    content: "<b>Wujud:</b> Padatan kristal.<br><b>Warna:</b> Putih.<br><b>Titik Leleh:</b> Super tinggi untuk ukurannya, sekitar 270 °C! Dia nggak mau meleleh gampang-gampang.<br><b>Bau:</b> Punya bau khas mirip kamper (kapur barus)."
                },
                {
                    title: "Sifat Kimianya",
                    content: "<b>Kelakuan:</b> Sangat stabil dan nggak reaktif. Mirip banget sama berlian, dia susah 'diganggu'. Butuh kondisi yang cukup ekstrem buat bikin dia bereaksi."
                },
                {
                    title: "Asalnya dari Mana?",
                    content: "<b>Sumber Alami:</b> Ditemukan dalam jumlah kecil di beberapa jenis <b>minyak bumi (petroleum)</b>.<br><b>Sumber Utama:</b> Kebanyakan dibuat secara sintetis di laboratorium."
                },
                {
                    title: "Gimana Terbentuknya?",
                    content: "<b>Di Industri:</b> Biasanya dibuat dari molekul siklik lain yang lebih simpel lewat serangkaian reaksi penataan ulang (isomerisasi) yang dipicu oleh katalis asam kuat. Kayak main puzzle molekul!"
                },
                {
                    title: "Gunanya Buat Apa?",
                    content: "<b>Obat-obatan:</b> Turunannya (seperti Amantadine dan Memantine) dipakai sebagai obat antivirus (buat influenza A) dan obat untuk penyakit Alzheimer.<br><b>Material:</b> Kerangka adamantane yang kaku dipakai sebagai 'jangkar' dalam pembuatan polimer khusus dan material canggih."
                },
                {
                    title: "Aman Nggak?",
                    content: "<b>Toksisitas:</b> Adamantane murni relatif tidak beracun.<br><b>Tapi Awas!:</b> Beberapa turunannya yang dipakai sebagai obat tentu punya efek samping dan harus sesuai resep dokter."
                },
                {
                    title: "Fakta Unik!",
                    content: "<b>Nama Berlian:</b> Namanya berasal dari kata Yunani kuno 'adamantos', yang artinya 'tak terkalahkan' atau 'sekeras berlian', merujuk pada kekakuan strukturnya.<br><b>Super Simetris:</b> Adamantane adalah salah satu molekul paling simetris yang ada. Dia punya simetri tetrahedral yang tinggi, sama kayak metana!"
                }
            ]
        },
        FeC10H10: { 
            name: "Ferrocene (Fe(C₅H₅)₂)", 
            description: "Senyawa organologam dengan struktur 'sandwich' yang ikonik. Satu atom besi diapit oleh dua cincin siklopentadienil.", 
            details: [
                { 
                    title: "Kartu Identitas Molekul", 
                    content: "<b>Nama Panggilan:</b> Ferrocene (Ferosena)<br><b>Nama Resmi (IUPAC):</b> Bis(η⁵-cyclopentadienyl)iron(II)<br><b>Rumus:</b> Fe(C₅H₅)₂<br><b>Berat Molekul:</b> 186.03 g/mol" 
                },
                { 
                    title: "Siapakah Dia?", 
                    content: "Ferrocene adalah 'sandwich' paling aneh dan paling keren di dunia kimia! 🥪 Dia ini molekul pertama yang ditemukan punya struktur unik di mana atom logam (Besi) diapit pas di tengah-tengah dua cincin karbon. Penemuannya bikin heboh dan membuka bidang baru!" 
                },
                { 
                    title: "Bentuk & Strukturnya", 
                    content: "<b>Bentuk Geometri:</b> Struktur Sandwich.<br><b>Model:</b> Satu atom Besi (Fe) di tengah, 'dijepit' dari atas dan bawah oleh dua cincin pentagonal datar (siklopentadienil, Cp).<br><b>Ikatan Unik:</b> Besi nggak nempel ke karbon tertentu, tapi 'dipegang' oleh seluruh awan elektron dari kedua cincin secara bersamaan. Ikatan super canggih!" 
                },
                { 
                    title: "Penampilan Fisiknya", 
                    content: "<b>Wujud:</b> Padatan kristal.<br><b>Warna:</b> Oranye terang yang khas.<br><b>Sifat:</b> Sangat stabil, bisa tahan panas tinggi, dan larut di banyak pelarut organik." 
                },
                { 
                    title: "Sifat Kimianya", 
                    content: "<b>Kelakuan:</b> Walaupun ada Besi, dia nggak gampang berkarat. Cincin karbonnya bisa bereaksi mirip benzena (reaksi substitusi aromatik), tapi seringkali lebih gampang bereaksi. Dia juga bisa 'dilepas-pasang' elektronnya (redoks)." 
                },
                { 
                    title: "Asalnya dari Mana?", 
                    content: "<b>Sumber:</b> Murni buatan laboratorium atau industri. Dia nggak ada di alam." 
                },
                { 
                    title: "Gimana Terbentuknya?", 
                    content: "<b>Cara Klasik:</b> Mereaksikan senyawa siklopentadiena dengan basa kuat, lalu hasilnya direaksikan dengan garam besi(II) klorida. Agak ribet, tapi hasilnya keren!" 
                },
                { 
                    title: "Gunanya Buat Apa?", 
                    content: "<b>Di Industri:</b> Sebagai 'aditif' anti-ketukan (anti-knocking) pada bensin (walaupun sekarang udah jarang). Turunannya dipakai sebagai katalis.<br><b>Riset:</b> Jadi 'mainan' favorit para ahli kimia organologam buat dipelajari dan dimodifikasi jadi molekul-molekul baru yang canggih." 
                },
                { 
                    title: "Aman Nggak?", 
                    content: "<b>Toksisitas:</b> Relatif tidak terlalu beracun dibandingkan senyawa organologam lainnya.<br><b>Tapi Awas!:</b> Tetap bahan kimia, jadi harus ditangani dengan hati-hati. Jangan dimakan!" 
                },
                { 
                    title: "Fakta Unik!", 
                    content: "<b>Penemuan Kebetulan:</b> Ditemukan secara nggak sengaja pada tahun 1951 oleh dua tim peneliti yang berbeda secara independen! Penemuan ini begitu aneh dan nggak terduga sampai-sampai dianugerahi Hadiah Nobel Kimia pada 1973.<br><b>Kelahiran Bidang Baru:</b> Penemuan Ferrocene dianggap sebagai kelahiran bidang kimia organologam modern, yaitu studi tentang senyawa yang punya ikatan langsung antara atom karbon dan logam." 
                }
            ]
        },
        C60: {
            name: "Buckminsterfullerene (C₆₀)",
            description: "Alotrop karbon berbentuk bola sepak berongga, terdiri dari 60 atom karbon. Ikon nanoteknologi dan penemuan peraih Nobel.",
            details: [
                {
                    title: "Kartu Identitas Molekul",
                    content: "<b>Nama Panggilan:</b> Buckyball, Fullerene C60<br><b>Nama Resmi (IUPAC):</b> (C₆₀-Ih)[5,6]fullerene<br><b>Rumus:</b> C₆₀<br><b>Berat Molekul:</b> 720.6 g/mol"
                },
                {
                    title: "Siapakah Dia?",
                    content: "Buckyball adalah 'bola sepak' paling keren di dunia kimia! ⚽ Dia ini molekul karbon murni yang bentuknya persis kayak bola sepak klasik. Penemuannya super heboh dan membuka pintu ke dunia baru: nanoteknologi!"
                },
                {
                    title: "Bentuk & Strukturnya",
                    content: "<b>Bentuk Geometri:</b> Ikosahedron Terpotong (Truncated Icosahedron) - alias bentuk bola sepak!<br><b>Model:</b> 60 atom Karbon nyambung membentuk 'jaring' bola yang terdiri dari <b>12 segi lima (pentagon)</b> dan <b>20 segi enam (heksagon)</b>. Penting banget: nggak ada dua pentagon yang nempel langsung!<br><b>Ikatan:</b> Ikatan kovalen, campuran antara sifat ikatan tunggal dan rangkap dua."
                },
                {
                    title: "Penampilan Fisiknya",
                    content: "<b>Wujud:</b> Padatan.<br><b>Warna:</b> Hitam atau coklat tua.<br><b>Sifat:</b> Lumayan stabil, tapi nggak terlalu suka larut di pelarut biasa. Dia lebih suka pelarut kayak toluena atau karbon disulfida, menghasilkan larutan berwarna magenta yang cantik."
                },
                {
                    title: "Sifat Kimianya",
                    content: "<b>Kelakuan:</b> Walaupun stabil, 'bola' elektronnya ini bisa bereaksi. Dia bisa 'dimasuki' atom kecil lain di dalamnya (endohedral fullerene) atau 'dihias' dengan gugus kimia di luarnya. Dia juga bisa menerima elektron (bersifat elektrofilik)."
                },
                {
                    title: "Asalnya dari Mana?",
                    content: "<b>Sumber Alami:</b> Ditemukan dalam jumlah super kecil di jelaga (soot) yang terbentuk dari pembakaran khusus, di beberapa batuan kuno, dan bahkan di luar angkasa!<br><b>Sumber Utama:</b> Dibuat di laboratorium."
                },
                {
                    title: "Gimana Terbentuknya?",
                    content: "<b>Cara Keren:</b> Menguapkan grafit pakai laser super kuat dalam atmosfer gas helium! 💥 Atom-atom karbon yang menguap ini kemudian 'mendingin' dan secara ajaib merakit diri jadi bola-bola C₆₀."
                },
                {
                    title: "Gunanya Buat Apa?",
                    content: "<b>Potensi Masa Depan:</b> Masih banyak diteliti! Potensinya keren banget: sebagai 'kandang' molekuler buat pengiriman obat, bahan pelumas super licin, semikonduktor organik, antioksidan, dan material baru lainnya di bidang nanoteknologi."
                },
                {
                    title: "Aman Nggak?",
                    content: "<b>Toksisitas:</b> Masih terus diteliti. Beberapa studi awal menunjukkan kemungkinan efek tertentu pada sel, tapi belum ada kesimpulan pasti tentang bahayanya pada manusia. Sebaiknya tetap ditangani dengan hati-hati."
                },
                {
                    title: "Fakta Unik!",
                    content: "<b>Nama Arsitek:</b> Namanya diambil dari Buckminster Fuller, seorang arsitek terkenal yang merancang bangunan kubah geodesik yang bentuknya mirip Buckyball.<br><b>Hadiah Nobel:</b> Penemunya (Kroto, Curl, Smalley) dianugerahi Hadiah Nobel Kimia tahun 1996 atas penemuan kelas baru molekul karbon ini."
                }
            ]
        },
        CNT: {
            name: "Carbon Nanotube (CNT)",
            description: "Struktur silinder dari atom karbon yang merupakan salah satu material terkuat yang dikenal. Pilar utama dalam bidang nanoteknologi.",
            details: [
                {
                    title: "Kartu Identitas Molekul",
                    content: "<b>Nama Panggilan:</b> Carbon Nanotube (Karbon Nanotabung)<br><b>Singkatan:</b> CNT<br><b>Rumus:</b> Bervariasi, tapi dasarnya (C₂)n<br><b>Berat Molekul:</b> Sangat bervariasi tergantung panjangnya"
                },
                {
                    title: "Siapakah Dia?",
                    content: "CNT adalah 'sedotan super' dari dunia nano! ⚫ Bayangin selembar sarang lebah atom karbon (graphene) yang digulung jadi tabung super kecil. Hasilnya? Material ajaib yang luar biasa kuat, ringan, dan jago banget menghantarkan listrik & panas."
                },
                {
                    title: "Bentuk & Strukturnya",
                    content: "<b>Bentuk Geometri:</b> Silinder Sempurna.<br><b>Model:</b> Tabung mulus yang dindingnya terbentuk dari jaringan heksagonal atom Karbon.<br><b>Jenis-jenis:</b> Ada beberapa 'gaya gulungan' yang beda (<b>armchair, zigzag, chiral</b>), dan ini secara ajaib menentukan apakah CNT itu bakal bersifat kayak logam (konduktor) atau semikonduktor!"
                },
                {
                    title: "Penampilan Fisiknya",
                    content: "<b>Wujud:</b> Biasanya berupa bubuk hitam halus (kumpulan banyak nanotube).<br><b>Sifat Super:</b><br>• <b>Super Kuat:</b> Salah satu material terkuat yang pernah diukur, puluhan kali lebih kuat dari baja!<br>• <b>Super Ringan:</b> Jauh lebih ringan dari logam.<br>• <b>Super Konduktif:</b> Bisa menghantarkan listrik dan panas lebih baik dari tembaga."
                },
                {
                    title: "Sifat Kimianya",
                    content: "<b>Kelakuan:</b> Cukup stabil dan inert karena ikatan karbonnya kuat. Tapi, permukaannya bisa 'dihias' atau dimodifikasi (difungsionalisasi) dengan molekul lain untuk menambah kegunaan."
                },
                {
                    title: "Asalnya dari Mana?",
                    content: "<b>Sumber:</b> Tidak ditemukan dalam jumlah besar di alam (mungkin ada jejak kecil di beberapa tempat). Mayoritas CNT adalah hasil sintesis canggih di laboratorium."
                },
                {
                    title: "Gimana Terbentuknya?",
                    content: "<b>Metode Populer:</b><br>• <b>Arc Discharge:</b> Mirip bikin Buckyball, pakai 'percikan listrik' super panas ke batang karbon.<br>• <b>Laser Ablation:</b> Menembakkan laser super kuat ke target grafit.<br>• <b>CVD (Chemical Vapor Deposition):</b> Metode paling umum sekarang. Gas yang mengandung karbon 'ditumbuhkan' jadi tabung di atas partikel katalis logam kecil."
                },
                {
                    title: "Gunanya Buat Apa?",
                    content: "<b>Material Komposit:</b> Dicampur ke plastik atau logam lain buat bikin material super kuat tapi ringan (rangka sepeda balap 🚲, alat pancing, bagian pesawat).<br><b>Elektronik:</b> Diteliti buat bikin transistor super kecil, layar sentuh transparan, dan kabel super konduktif.<br><b>Energi:</b> Untuk meningkatkan performa baterai dan superkapasitor.<br><b>Medis (Riset):</b> Dijajaki untuk pengiriman obat langsung ke sel kanker atau sebagai 'perancah' untuk pertumbuhan jaringan."
                },
                {
                    title: "Aman Nggak?",
                    content: "<b>Masih Misteri?:</b> Dampak kesehatan jangka panjangnya masih terus diteliti.<br><b>Potensi Risiko:</b> Ada kekhawatiran kalau beberapa jenis CNT (terutama yang panjang dan kaku) bisa berbahaya bagi paru-paru jika terhirup, mirip seperti serat asbes. Makanya, penanganannya harus super hati-hati pakai pelindung."
                },
                {
                    title: "Fakta Unik!",
                    content: "<b>Penemu:</b> Sumio Iijima pada tahun 1991.<br><b>Hitam Pekat:</b> Material yang terbuat dari CNT yang disusun vertikal (Vantablack) adalah salah satu material paling hitam yang pernah dibuat, bisa menyerap lebih dari 99.9% cahaya!<br><b>Lift Luar Angkasa?:</b> Kekuatan CNT yang luar biasa bikin ilmuwan bermimpi suatu hari nanti bisa membangun 'lift' dari Bumi ke luar angkasa pakai kabel berbahan dasar CNT!"
                }
            ]
        },
        DNA: {
            name: "DNA (Asam Deoksiribonukleat)",
            description: "Molekul heliks ganda yang membawa informasi genetik. Terdiri dari tulang punggung gula-fosfat dan pasangan basa nitrogen (A-T, G-C).",
            details: [
                {
                    title: "Kartu Identitas Molekul",
                    content: "<b>Nama Panggilan:</b> DNA<br><b>Nama Resmi:</b> Deoxyribonucleic Acid (Asam Deoksiribonukleat)<br><b>Jenis:</b> Makromolekul Biologis (Polimer Asam Nukleat)<br><b>Rumus:</b> Sangat panjang dan bervariasi!"
                },
                {
                    title: "Siapakah Dia?",
                    content: "DNA adalah **'blueprint' kehidupan**! 🧬 Dia ini molekul super panjang yang nyimpen semua resep rahasia buat ngebangun dan ngejalanin tubuhmu, mulai dari warna mata sampai cara selmu bekerja. Dia adalah 'buku instruksi' utama alam semesta."
                },
                {
                    title: "Bentuk & Strukturnya",
                    content: "<b>Bentuk Geometri:</b> **Heliks Ganda (Double Helix)** yang ikonik!<br><b>Model:</b> Bayangin tangga spiral super panjang. 'Pegangan' tangganya (tulang punggung) terbuat dari gula deoksiribosa dan gugus fosfat yang selang-seling. 'Anak tangganya' adalah pasangan basa nitrogen.<br><b>Pasangan Spesial:</b> Adenin (A) selalu gandengan sama Timin (T) pakai 2 'lem' (ikatan hidrogen), dan Guanin (G) selalu gandengan sama Sitosin (C) pakai 3 'lem'."
                },
                {
                    title: "Penampilan Fisiknya",
                    content: "<b>Wujud:</b> Kalau diekstrak dari sel dalam jumlah banyak, kelihatan kayak benang-benang putih halus.<br><b>Ukuran:</b> Super panjang! Kalau DNA dari satu sel manusia direntangin, panjangnya bisa sampai 2 meter, tapi super tipis!"
                },
                {
                    title: "Sifat Kimianya",
                    content: "<b>Kelakuan:</b> Cukup stabil, penting banget biar informasi genetik nggak gampang rusak. Tapi dia bisa 'dibuka ritsletingnya' (denaturasi) pakai panas atau bahan kimia, dan bisa 'disalin' (replikasi) atau 'dibaca' (transkripsi) oleh mesin seluler."
                },
                {
                    title: "Asalnya dari Mana?",
                    content: "<b>Sumber:</b> Ada di dalam inti (nukleus) hampir setiap sel makhluk hidup (kecuali beberapa sel kayak sel darah merah matang). Juga ada sedikit di mitokondria."
                },
                {
                    title: "Gimana Terbentuknya?",
                    content: "<b>Replikasi:</b> Saat sel membelah, DNA disalin dengan sangat akurat. Heliks gandanya 'dibuka', dan setiap untai lama jadi cetakan buat bikin untai baru. Proses ini super canggih dan melibatkan banyak 'mesin' protein (enzim)."
                },
                {
                    title: "Gunanya Buat Apa?",
                    content: "<b>Super Penting:</b> Menyimpan semua **informasi genetik** yang menentukan sifat-sifat kita dan cara tubuh kita berfungsi. Urutan basa A, T, G, C itu adalah 'kode' yang dibaca sel untuk membuat protein."
                },
                {
                    title: "Aman Nggak?",
                    content: "<b>Penting Banget!:</b> DNA itu esensi dari kehidupan.<br><b>Tapi Awas!:</b> Kerusakan pada DNA (misalnya karena radiasi UV, bahan kimia berbahaya, atau kesalahan saat replikasi) bisa menyebabkan mutasi, yang bisa memicu penyakit seperti kanker."
                },
                {
                    title: "Fakta Unik!",
                    content: "<b>Penemu Struktur:</b> James Watson dan Francis Crick (1953), tapi mereka nggak akan bisa tanpa data difraksi sinar-X krusial dari Rosalind Franklin! ✨<br><b>Kemiripan Genetik:</b> Kamu berbagi sekitar 99.9% DNA yang sama dengan orang lain! Perbedaan kecil itulah yang bikin kita semua unik. Kamu bahkan berbagi sekitar 98% DNA dengan simpanse! 🐒"
                }
            ]
        },
    },
};

// Variabel global untuk scene Three.js, elemen DOM, dan state management.
let scene, camera, renderer, controls, composer;
// let mainGroup, defaultFont;
let defaultFont;
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
export function init() {
    body.classList.add('sidebar-collapsed');
    console.log("Init Molecule Scene with group:", mainGroup);
     
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
export function clearScene() {
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
        if (activeState.type === 'electron_shell') {
            displayAtomDetail(activeState.key);
        } else if (activeState.type === 'atom') {
            displayMolecule(activeState.parentMolecule);
        }
    });

    // Listener untuk tombol tutup panel detail.
    document.getElementById('close-detail-info-btn').addEventListener('click', () => {
        detailInfoPanel.classList.add('hidden'); // Sembunyikan panel detail

        // Jika kita sedang dalam mode molekul, tampilkan kembali panel info molekul.
        if (activeState.type === 'molecule') {
            const moleculeData = DATA.molecules[activeState.key];
            if (moleculeData) {
                // Panggil lagi fungsi update untuk memastikan kontennya benar & hapus class 'hidden'
                updateMoleculeInfoPanel(moleculeData.name, moleculeData.description);
            }
            // Reset menu detail yang aktif
            activeState.menu = null;
            buildSidebar(); // Update sidebar
        }
    });

    // Listener untuk tombol tutup panel info molekul.
    document.getElementById('close-molecule-info-btn').addEventListener('click', () => {
        moleculeInfoPanel.classList.add('hidden');
    });

    // Listener untuk tombol toggle sidebar.
    // document.getElementById('sidebar-toggle').addEventListener('click', () => {
    //     document.getElementById('sidebar').classList.toggle('collapsed');
    //     body.classList.toggle('sidebar-collapsed');
    //     setTimeout(onWindowResize, 350); // Resize canvas setelah animasi sidebar selesai.
    // });
}

// Membangun konten sidebar berdasarkan state aplikasi saat ini.
function buildSidebar() {
    sidebarContent.innerHTML = '';
    if (activeState.type === 'molecule') {
        buildMoleculeGallery();
    } else if (activeState.type === 'atom' || activeState.type === 'electron_shell') {
        buildAtomDetailMenu();
    }
    console.log("🧩 activeState.type =", activeState.type);
    document.getElementById("sidebar-toggle")?.addEventListener("click", () => {
  console.log("✅ Sidebar toggle diklik!");

});
const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("sidebar-toggle");


if (toggleBtn) {
  // Hapus dulu semua listener lama dengan clone trick
  const newToggleBtn = toggleBtn.cloneNode(true);
  toggleBtn.parentNode.replaceChild(newToggleBtn, toggleBtn);

  newToggleBtn.addEventListener("click", () => {
    console.log("✅ Sidebar toggle diklik!");
    sidebar.classList.toggle("collapsed");
    console.log("🔄 Sidebar toggled:", sidebar.classList.contains("collapsed") ? "Tertutup" : "Terbuka");
  });
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

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'btn';
        toggleBtn.textContent = isAnimationPaused ? 'Start' : 'Pause';
        toggleBtn.onclick = () => {
            isAnimationPaused = !isAnimationPaused;
            toggleBtn.textContent = isAnimationPaused ? 'Start' : 'Pause';
            if (!isAnimationPaused) {
                clock.getDelta();
            }
        };

        btnGroup.appendChild(toggleBtn); 
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
export function drawMoleculeGeometry(moleculeKey){
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
        case "C2H5OH": drawEthanol(); break;
        case "C6H12O6": drawGlucose(); break;
        case "C6H12": drawCyclohexane(); break;
        case "H2O2": drawHydrogenPeroxide(); break;
        case "O3": drawOzone(); break;
        case "CH3CN": drawAcetonitrile(); break;
        case "C3H4": drawAllene(); break;
        case "BF3": drawBoronTrifluoride(); break;
        case "nC4H10": drawNButane(); break;
        case "iC4H10": drawIsobutane(); break;
        case "ClF3": drawChlorineTrifluoride(); break;
        case "C3H6": drawCyclopropane(); break;
        case "CH3CONH2": drawAcetamide(); break;
        case "CO": drawCarbonMonoxide(); break;
        case "HCOOH": drawFormicAcid(); break;
        case "cisC2H2Cl2": drawCisDichloroethene(); break;
        case "transC2H2Cl2": drawTransDichloroethene(); break;
        case "C10H16": drawAdamantane(); break;
        case "FeC10H10": drawFerrocene(); break;
        case "C60": drawBuckminsterfullerene(); break;
        case "C8H8": drawCubane(); break;
        case "CNT": drawCarbonNanotube(); break;
        case "DNA": drawDNA(); break;
        case "O2": drawOxygen(); break;
    }
}

// Menggambar geometri spesifik untuk molekul Air (H2O).

// --- Tambahan ---
export function setMainGroup(group) {
  mainGroup = group;
}

function getSafeMainGroup() {
  if (!mainGroup) {
    console.warn("⚠️ mainGroup belum diinisialisasi, membuat group sementara...");
    mainGroup = new THREE.Group();
  }
  return mainGroup;
}

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
    getSafeMainGroup().add(o, h1, h2);
    getSafeMainGroup().add(createBondMesh(o.position, h1.position, 0.08));
    getSafeMainGroup().add(createBondMesh(o.position, h2.position, 0.08));
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
    const h_mid1 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
    h_mid1.position.set(0, chBondLength, 0);
    h_mid1.userData.initialPosition = h_mid1.position.clone();
    mainGroup.add(h_mid1, createBondMesh(c2.position, h_mid1.position, 0.08));
    const h_mid2 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
    h_mid2.position.set(0, -chBondLength * Math.cos(60 * Math.PI/180), -chBondLength * Math.sin(60*Math.PI/180));
    h_mid2.userData.initialPosition = h_mid2.position.clone();
    mainGroup.add(h_mid2, createBondMesh(c2.position, h_mid2.position, 0.08));
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
    const atoms = {}; 
    const bondLength = 2.5;
    const chBondLength = 2.0;
    const doubleBondOffset = 0.15;
    function createAndPlaceAtom(name, symbol, position) {
        const atom = createAtomMesh(DATA.atoms[symbol].radius, DATA.atoms[symbol].color, symbol);
        atom.position.copy(position);
        atom.userData.initialPosition = atom.position.clone();
        atoms[name] = atom;
        mainGroup.add(atom);
        return atom;
    }

    function addDoubleBond(pos1, pos2, radius = 0.08) {
        mainGroup.add(createBondMesh(pos1.clone().setZ(doubleBondOffset), pos2.clone().setZ(doubleBondOffset), radius));
        mainGroup.add(createBondMesh(pos1.clone().setZ(-doubleBondOffset), pos2.clone().setZ(-doubleBondOffset), radius));
    }

    const p = { 
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

    Object.keys(p).forEach(key => {
        const symbol = key.charAt(0);
        createAndPlaceAtom(key, symbol, p[key]);
    });

    mainGroup.add(createBondMesh(p.N1, p.C2, 0.12));
    mainGroup.add(createBondMesh(p.C2, p.N3, 0.12));
    mainGroup.add(createBondMesh(p.N3, p.C4, 0.12));
    mainGroup.add(createBondMesh(p.C5, p.C6, 0.12));
    mainGroup.add(createBondMesh(p.C6, p.N1, 0.12));
    mainGroup.add(createBondMesh(p.C5, p.N7, 0.12));
    mainGroup.add(createBondMesh(p.C8, p.N9, 0.12));
    mainGroup.add(createBondMesh(p.N9, p.C4, 0.12));

    addDoubleBond(p.C4, p.C5);
    addDoubleBond(p.N7, p.C8);

    const O2_pos = new THREE.Vector3().subVectors(p.C2, p.N1).add(new THREE.Vector3().subVectors(p.C2, p.N3)).normalize().multiplyScalar(bondLength).add(p.C2);
    const O2 = createAndPlaceAtom('O2', 'O', O2_pos);
    addDoubleBond(p.C2, O2.position);
    
    const O6_pos = new THREE.Vector3().subVectors(p.C6, p.N1).add(new THREE.Vector3().subVectors(p.C6, p.C5)).normalize().multiplyScalar(bondLength).add(p.C6);
    const O6 = createAndPlaceAtom('O6', 'O', O6_pos);
    addDoubleBond(p.C6, O6.position);

    const H8_pos = new THREE.Vector3().subVectors(p.C8, p.N7).add(new THREE.Vector3().subVectors(p.C8, p.N9)).normalize().multiplyScalar(chBondLength).add(p.C8);
    const H8 = createAndPlaceAtom('H8', 'H', H8_pos);
    mainGroup.add(createBondMesh(p.C8, H8.position, 0.08));

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

function drawEthanol() {
    // Definisi konstanta untuk mempermudah penyesuaian
    const ccBondLength = 2.5;
    const coBondLength = 2.4;
    const chBondLength = 2.0;
    const ohBondLength = 1.8;
    const tetrahedralAngle = 109.5 * Math.PI / 180;
    const bentAngle = 104.5 * Math.PI / 180;
    const c1 = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C'); // Karbon metil
    const c2 = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C'); // Karbon hidroksil
    const o = createAtomMesh(DATA.atoms.O.radius, DATA.atoms.O.color, 'O', '-', 0xff8888);
    const h_hydroxyl = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H', '+', 0x8888ff);
    c1.position.set(-ccBondLength / 2, -0.2, 0);
    c2.position.set(ccBondLength / 2, 0.2, 0);
    // Posisikan Oksigen membentuk sudut tetrahedral dari ikatan C-C
    o.position.set(
        c2.position.x + coBondLength * Math.cos(tetrahedralAngle / 1.8),
        c2.position.y + coBondLength * Math.sin(tetrahedralAngle / 1.8),
        0
    );
     // Posisikan Hidrogen membentuk sudut tekuk (bent) dari ikatan C-O
    h_hydroxyl.position.set(
        o.position.x + ohBondLength * Math.cos(bentAngle / 1.5),
        o.position.y - ohBondLength * Math.sin(bentAngle / 1.5),
        0
    );
    // Hidrogen pada Karbon 1 (gugus metil, -CH3)
    const h1a = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
    const h1b = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
    const h1c = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
    h1a.position.set(c1.position.x - chBondLength * Math.cos(tetrahedralAngle/2), c1.position.y + chBondLength * Math.sin(tetrahedralAngle/2), 0);
    h1b.position.set(c1.position.x + 0.3, c1.position.y - 0.3, chBondLength * 0.8);
    h1c.position.set(c1.position.x + 0.3, c1.position.y - 0.3, -chBondLength * 0.8);
    
    // Hidrogen pada Karbon 2 (gugus metilen, -CH2-)
    const h2a = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
    const h2b = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
    h2a.position.set(c2.position.x - 0.2, c2.position.y - 0.2, chBondLength * 0.8);
    h2b.position.set(c2.position.x - 0.2, c2.position.y - 0.2, -chBondLength * 0.8);

    [c1, c2, o, h_hydroxyl, h1a, h1b, h1c, h2a, h2b].forEach(atom => {
        atom.userData.initialPosition = atom.position.clone();
        mainGroup.add(atom);
    });
    mainGroup.add(createBondMesh(c1.position, c2.position, 0.1));
    mainGroup.add(createBondMesh(c2.position, o.position, 0.1));
    mainGroup.add(createBondMesh(o.position, h_hydroxyl.position, 0.08));
    mainGroup.add(createBondMesh(c1.position, h1a.position, 0.08));
    mainGroup.add(createBondMesh(c1.position, h1b.position, 0.08));
    mainGroup.add(createBondMesh(c1.position, h1c.position, 0.08));
    mainGroup.add(createBondMesh(c2.position, h2a.position, 0.08));
    mainGroup.add(createBondMesh(c2.position, h2b.position, 0.08));
}

function drawGlucose() {
    const ringRadius = 2.5;
    const coBondLength = 2.0; // Panjang ikatan C-O
    const ohBondLength = 1.6; // Panjang ikatan O-H
    const ch2ohBondLength = 2.2; // Panjang ikatan C5-C6
    const bondRadius = 0.08; // Radius seragam untuk ikatan yang lebih jelas

    const atoms = {}; 

    const createAndAddAtom = (name, symbol, position) => {
        const atomData = DATA.atoms[symbol];
        const atom = createAtomMesh(atomData.radius, atomData.color, symbol);
        atom.position.copy(position);
        atom.userData.initialPosition = atom.position.clone();
        atoms[name] = atom;
        mainGroup.add(atom);
    };
    
    const ringPositions = {};
    for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * 2 * Math.PI;
        const zPos = i % 2 === 0 ? 0.4 : -0.4; 
        const symbol = i === 5 ? 'O' : 'C';
        const name = i === 5 ? 'O_ring' : `C${i+1}`;
        ringPositions[name] = new THREE.Vector3(ringRadius * Math.cos(angle), ringRadius * Math.sin(angle), zPos);
        createAndAddAtom(name, symbol, ringPositions[name]);
    }

    const ringAtomKeys = Object.keys(ringPositions);
    for (let i = 0; i < 6; i++) {
        const currentAtom = atoms[ringAtomKeys[i]];
        const nextAtom = atoms[ringAtomKeys[(i + 1) % 6]];
        mainGroup.add(createBondMesh(currentAtom.position, nextAtom.position, 0.1));
    }
    
    const addHydroxylGroup = (parentAtom, direction) => {
        const normalizedDir = direction.normalize();
        const oPos = parentAtom.position.clone().add(normalizedDir.clone().multiplyScalar(coBondLength));
        createAndAddAtom(`O_${parentAtom.name}`, 'O', oPos);

        const hDir = oPos.clone().sub(parentAtom.position).normalize();
        const hPos = oPos.clone().add(hDir.multiplyScalar(ohBondLength));
        createAndAddAtom(`H_O_${parentAtom.name}`, 'H', hPos);
        
        mainGroup.add(createBondMesh(parentAtom.position, oPos, bondRadius));
        mainGroup.add(createBondMesh(oPos, hPos, bondRadius - 0.01));
    };

    // Tambahkan gugus -OH pada C1, C2, C3, C4
    addHydroxylGroup(atoms.C1, new THREE.Vector3(1, 0.2, -1));   // Arah ke luar-bawah
    addHydroxylGroup(atoms.C2, new THREE.Vector3(0.5, 1, 1));   // Arah ke atas-luar
    addHydroxylGroup(atoms.C3, new THREE.Vector3(-0.5, 1, -1));  // Arah ke atas-dalam
    addHydroxylGroup(atoms.C4, new THREE.Vector3(-1, -0.2, 1)); // Arah ke dalam-bawah

    const c5Dir = new THREE.Vector3(0.2, -1, 1).normalize();
    const c6Pos = atoms.C5.position.clone().add(c5Dir.multiplyScalar(ch2ohBondLength));
    createAndAddAtom('C6', 'C', c6Pos);
    mainGroup.add(createBondMesh(atoms.C5.position, c6Pos, 0.1));
    
    // Tambahkan gugus -OH pada C6
    addHydroxylGroup(atoms.C6, new THREE.Vector3(-1, -0.5, 0));
}

function drawCyclohexane() {
    const ringRadius = 2.5;
    const chBondLength = 1.8;
    const bondRadius = 0.08;
    const atoms = {};

    const createAndAddAtom = (name, symbol, position) => {
        const atomData = DATA.atoms[symbol];
        const atom = createAtomMesh(atomData.radius, atomData.color, symbol);
        atom.position.copy(position);
        atom.userData.initialPosition = atom.position.clone();
        atoms[name] = atom;
        mainGroup.add(atom);
    };

    for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * 2 * Math.PI + (Math.PI / 6); // Offset agar terlihat lebih baik
        // Kunci dari bentuk 'kursi': Z-position dibuat naik-turun secara bergantian
        const zPos = i % 2 === 0 ? 0.5 : -0.5;
        const cPos = new THREE.Vector3(ringRadius * Math.cos(angle), ringRadius * Math.sin(angle), zPos);
        createAndAddAtom(`C${i}`, 'C', cPos);
    }

    for (let i = 0; i < 6; i++) {
        const currentAtom = atoms[`C${i}`];
        const nextAtom = atoms[`C${(i + 1) % 6}`];
        mainGroup.add(createBondMesh(currentAtom.position, nextAtom.position, 0.1));
    }

    for (let i = 0; i < 6; i++) {
        const carbonAtom = atoms[`C${i}`];
        const cPos = carbonAtom.position;

        // Tentukan arah aksial (lurus ke atas atau bawah)
        const axialDir = new THREE.Vector3(0, 0, (i % 2 === 0 ? 1 : -1));
        const axialPos = cPos.clone().add(axialDir.multiplyScalar(chBondLength));
        createAndAddAtom(`H_axial_${i}`, 'H', axialPos);
        mainGroup.add(createBondMesh(cPos, axialPos, bondRadius));

        // Tentukan arah ekuator (menyamping keluar dari cincin)
        const equatorialDir = new THREE.Vector3(cPos.x, cPos.y, -cPos.z * 0.2).normalize();
        const equatorialPos = cPos.clone().add(equatorialDir.multiplyScalar(chBondLength));
        createAndAddAtom(`H_equatorial_${i}`, 'H', equatorialPos);
        mainGroup.add(createBondMesh(cPos, equatorialPos, bondRadius));
    }
}

function drawHydrogenPeroxide() {
    const ooBondLength = 2.2;
    const ohBondLength = 1.8;
    const bondRadius = 0.08;
    const dihedralAngle = 111.5 * Math.PI / 180; // Sudut antara dua bidang H-O-O

    const o1 = createAtomMesh(DATA.atoms.O.radius, DATA.atoms.O.color, 'O');
    const o2 = createAtomMesh(DATA.atoms.O.radius, DATA.atoms.O.color, 'O');
    const h1 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
    const h2 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');

    o1.position.set(0, -ooBondLength / 2, 0);
    o2.position.set(0, ooBondLength / 2, 0);

    h1.position.set(ohBondLength * Math.cos(0.2), o1.position.y + ohBondLength * Math.sin(0.2), 0);
    
    // Hidrogen kedua (h2) diputar sebesar sudut dihedral di sekitar sumbu Y
    const h2_unrotated_pos = new THREE.Vector3(ohBondLength * Math.cos(0.2), o2.position.y - ohBondLength * Math.sin(0.2), 0);
    h2.position.copy(h2_unrotated_pos).applyAxisAngle(new THREE.Vector3(0, 1, 0), dihedralAngle);

    [o1, o2, h1, h2].forEach(atom => {
        atom.userData.initialPosition = atom.position.clone();
        mainGroup.add(atom);
    });

    mainGroup.add(createBondMesh(o1.position, o2.position, 0.1));
    mainGroup.add(createBondMesh(o1.position, h1.position, bondRadius));
    mainGroup.add(createBondMesh(o2.position, h2.position, bondRadius));
}

function drawOzone() {
    const bondLength = 2.0;
    const angle = 116.8 * Math.PI / 180; // Sudut ikatan O-O-O
    const bondRadius = 0.08;
    const doubleBondOffset = 0.15; // Offset untuk menunjukkan resonansi/ikatan rangkap

    const o_center = createAtomMesh(DATA.atoms.O.radius, DATA.atoms.O.color, 'O', '+', 0x8888ff);
    const o_left = createAtomMesh(DATA.atoms.O.radius, DATA.atoms.O.color, 'O', '-', 0xff8888);
    const o_right = createAtomMesh(DATA.atoms.O.radius, DATA.atoms.O.color, 'O');

    o_left.position.set(-bondLength * Math.cos(angle / 2), -bondLength * Math.sin(angle / 2), 0);
    o_right.position.set(bondLength * Math.cos(angle / 2), -bondLength * Math.sin(angle / 2), 0);
    
    [o_center, o_left, o_right].forEach(atom => {
        atom.userData.initialPosition = atom.position.clone();
        mainGroup.add(atom);
    });

    mainGroup.add(createBondMesh(o_center.position, o_left.position, bondRadius)); // Ikatan tunggal
    
    // Ikatan rangkap dua ke kanan
    mainGroup.add(createBondMesh(o_center.position.clone().setZ(doubleBondOffset/2), o_right.position.clone().setZ(doubleBondOffset/2), bondRadius));
    mainGroup.add(createBondMesh(o_center.position.clone().setZ(-doubleBondOffset/2), o_right.position.clone().setZ(-doubleBondOffset/2), bondRadius));
}

function drawAcetonitrile() {
    const ccBondLength = 2.4;
    const cnBondLength = 2.2;
    const chBondLength = 1.8;
    const tripleBondOffset = 0.18;
    const tetrahedralAngle = 109.5 * Math.PI / 180;
    const bondRadius = 0.08;

    const c_methyl = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C');
    const c_nitrile = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C');
    const n_nitrile = createAtomMesh(DATA.atoms.N.radius, DATA.atoms.N.color, 'N');

    c_methyl.position.set(-ccBondLength / 2, 0, 0);
    c_nitrile.position.set(ccBondLength / 2, 0, 0);
    n_nitrile.position.set(c_nitrile.position.x + cnBondLength, 0, 0);

    const h1 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
    h1.position.set(c_methyl.position.x - 0.4, chBondLength * Math.sin(tetrahedralAngle/2), 0);

    const h2 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
    h2.position.set(c_methyl.position.x + 0.2, -chBondLength * Math.cos(tetrahedralAngle/2), chBondLength * Math.sin(tetrahedralAngle/2));
    
    const h3 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
    h3.position.set(c_methyl.position.x + 0.2, -chBondLength * Math.cos(tetrahedralAngle/2), -chBondLength * Math.sin(tetrahedralAngle/2));

    [c_methyl, c_nitrile, n_nitrile, h1, h2, h3].forEach(atom => {
        atom.userData.initialPosition = atom.position.clone();
        mainGroup.add(atom);
    });

    mainGroup.add(createBondMesh(c_methyl.position, c_nitrile.position, 0.1));
    
    // Ikatan rangkap tiga C≡N
    mainGroup.add(createBondMesh(c_nitrile.position, n_nitrile.position, bondRadius)); // Ikatan tengah
    mainGroup.add(createBondMesh(c_nitrile.position.clone().setY(tripleBondOffset), n_nitrile.position.clone().setY(tripleBondOffset), bondRadius));
    mainGroup.add(createBondMesh(c_nitrile.position.clone().setY(-tripleBondOffset), n_nitrile.position.clone().setY(-tripleBondOffset), bondRadius));
    
    // Ikatan C-H
    mainGroup.add(createBondMesh(c_methyl.position, h1.position, bondRadius));
    mainGroup.add(createBondMesh(c_methyl.position, h2.position, bondRadius));
    mainGroup.add(createBondMesh(c_methyl.position, h3.position, bondRadius));
}

function drawAllene() {
    const ccBondLength = 2.2; // Ikatan rangkap dua lebih pendek
    const chBondLength = 1.8;
    const doubleBondOffset = 0.18; // Jarak antar ikatan pada C=C
    const bondRadius = 0.08;
    const hchAngle = 120 * Math.PI / 180; // Sudut H-C-H mendekati sp2

    const c_left = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C');
    const c_center = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C');
    const c_right = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C');

    c_left.position.set(-ccBondLength, 0, 0);
    c_center.position.set(0, 0, 0);
    c_right.position.set(ccBondLength, 0, 0);

    const h1_left = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
    h1_left.position.set(c_left.position.x + 0.2, chBondLength * Math.sin(hchAngle/2), 0);
    const h2_left = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
    h2_left.position.set(c_left.position.x + 0.2, -chBondLength * Math.sin(hchAngle/2), 0);

    const h1_right = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
    h1_right.position.set(c_right.position.x - 0.2, 0, chBondLength * Math.sin(hchAngle/2));
    const h2_right = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
    h2_right.position.set(c_right.position.x - 0.2, 0, -chBondLength * Math.sin(hchAngle/2));

    [c_left, c_center, c_right, h1_left, h2_left, h1_right, h2_right].forEach(atom => {
        atom.userData.initialPosition = atom.position.clone();
        mainGroup.add(atom);
    });

    mainGroup.add(createBondMesh(c_left.position.clone().setY(doubleBondOffset), c_center.position.clone().setY(doubleBondOffset), bondRadius));
    mainGroup.add(createBondMesh(c_left.position.clone().setY(-doubleBondOffset), c_center.position.clone().setY(-doubleBondOffset), bondRadius));

    mainGroup.add(createBondMesh(c_center.position.clone().setZ(doubleBondOffset), c_right.position.clone().setZ(doubleBondOffset), bondRadius));
    mainGroup.add(createBondMesh(c_center.position.clone().setZ(-doubleBondOffset), c_right.position.clone().setZ(-doubleBondOffset), bondRadius));
    
    // Ikatan C-H
    mainGroup.add(createBondMesh(c_left.position, h1_left.position, bondRadius));
    mainGroup.add(createBondMesh(c_left.position, h2_left.position, bondRadius));
    mainGroup.add(createBondMesh(c_right.position, h1_right.position, bondRadius));
    mainGroup.add(createBondMesh(c_right.position, h2_right.position, bondRadius));
}

function drawBoronTrifluoride() {
    const bondLength = 2.4;
    const bondRadius = 0.08;

    const b = createAtomMesh(DATA.atoms.B.radius, DATA.atoms.B.color, 'B');
    const f1 = createAtomMesh(DATA.atoms.F.radius, DATA.atoms.F.color, 'F');
    const f2 = createAtomMesh(DATA.atoms.F.radius, DATA.atoms.F.color, 'F');
    const f3 = createAtomMesh(DATA.atoms.F.radius, DATA.atoms.F.color, 'F');

    for (let i = 0; i < 3; i++) {
        const angle = (i / 3) * 2 * Math.PI;
        const f_atom = [f1, f2, f3][i];
        f_atom.position.set(bondLength * Math.cos(angle), bondLength * Math.sin(angle), 0);
    }
    
    [b, f1, f2, f3].forEach(atom => {
        atom.userData.initialPosition = atom.position.clone();
        mainGroup.add(atom);
    });

    mainGroup.add(createBondMesh(b.position, f1.position, bondRadius));
    mainGroup.add(createBondMesh(b.position, f2.position, bondRadius));
    mainGroup.add(createBondMesh(b.position, f3.position, bondRadius));
}

function drawNButane() {
    const ccBondLength = 2.5;
    const chBondLength = 1.8;
    const bondRadius = 0.08;
    const angle = 109.5 * Math.PI / 180; // Sudut tetrahedral
    const atoms = {};

    // Helper untuk membuat atom
    const createAndAddAtom = (name, symbol, position) => {
        const atomData = DATA.atoms[symbol];
        const atom = createAtomMesh(atomData.radius, atomData.color, symbol);
        atom.position.copy(position);
        atom.userData.initialPosition = atom.position.clone();
        atoms[name] = atom;
        mainGroup.add(atom);
    };

    // Buat rantai Karbon zig-zag
    for (let i = 0; i < 4; i++) {
        const xPos = i * ccBondLength * Math.sin(angle / 2);
        const yPos = (i % 2 === 0 ? -1 : 1) * ccBondLength * Math.cos(angle / 2) / 2;
        createAndAddAtom(`C${i}`, 'C', new THREE.Vector3(xPos, yPos, 0));
        if (i > 0) {
            mainGroup.add(createBondMesh(atoms[`C${i-1}`].position, atoms[`C${i}`].position, 0.1));
        }
    }

    createAndAddAtom('H0a', 'H', atoms.C0.position.clone().add(new THREE.Vector3(-chBondLength * 0.9, 0, 0)));
    createAndAddAtom('H0b', 'H', atoms.C0.position.clone().add(new THREE.Vector3(0, 0, chBondLength)));
    createAndAddAtom('H0c', 'H', atoms.C0.position.clone().add(new THREE.Vector3(0, 0, -chBondLength)));
    createAndAddAtom('H1a', 'H', atoms.C1.position.clone().add(new THREE.Vector3(0, 0, chBondLength)));
    createAndAddAtom('H1b', 'H', atoms.C1.position.clone().add(new THREE.Vector3(0, 0, -chBondLength)));
    createAndAddAtom('H2a', 'H', atoms.C2.position.clone().add(new THREE.Vector3(0, 0, chBondLength)));
    createAndAddAtom('H2b', 'H', atoms.C2.position.clone().add(new THREE.Vector3(0, 0, -chBondLength)));
    createAndAddAtom('H3a', 'H', atoms.C3.position.clone().add(new THREE.Vector3(chBondLength * 0.9, 0, 0)));
    createAndAddAtom('H3b', 'H', atoms.C3.position.clone().add(new THREE.Vector3(0, 0, chBondLength)));
    createAndAddAtom('H3c', 'H', atoms.C3.position.clone().add(new THREE.Vector3(0, 0, -chBondLength)));
    Object.keys(atoms).filter(k => k.startsWith('H')).forEach(hKey => {
        const cIndex = hKey.charAt(1); // Ambil indeks karbon dari nama hidrogen
        mainGroup.add(createBondMesh(atoms[`C${cIndex}`].position, atoms[hKey].position, bondRadius));
    });
}

function drawIsobutane() {
    const ccBondLength = 2.5;
    const chBondLength = 1.8;
    const bondRadius = 0.08;
    const angle = 109.5 * Math.PI / 180; // Sudut tetrahedral
    const atoms = {};

    const createAndAddAtom = (name, symbol, position) => {
        const atomData = DATA.atoms[symbol];
        const atom = createAtomMesh(atomData.radius, atomData.color, symbol);
        atom.position.copy(position);
        atom.userData.initialPosition = atom.position.clone();
        atoms[name] = atom;
        mainGroup.add(atom);
    };

    createAndAddAtom('C_center', 'C', new THREE.Vector3(0, 0, 0));

    const tetraPositions = [
        new THREE.Vector3(1, 1, 1),
        new THREE.Vector3(1, -1, -1),
        new THREE.Vector3(-1, 1, -1),
        new THREE.Vector3(-1, -1, 1)
    ];

    createAndAddAtom('C1', 'C', tetraPositions[0].normalize().multiplyScalar(ccBondLength));
    createAndAddAtom('C2', 'C', tetraPositions[1].normalize().multiplyScalar(ccBondLength));
    createAndAddAtom('C3', 'C', tetraPositions[2].normalize().multiplyScalar(ccBondLength));
    createAndAddAtom('H_center', 'H', tetraPositions[3].normalize().multiplyScalar(chBondLength));

    mainGroup.add(createBondMesh(atoms.C_center.position, atoms.C1.position, 0.1));
    mainGroup.add(createBondMesh(atoms.C_center.position, atoms.C2.position, 0.1));
    mainGroup.add(createBondMesh(atoms.C_center.position, atoms.C3.position, 0.1));
    mainGroup.add(createBondMesh(atoms.C_center.position, atoms.H_center.position, bondRadius));

    const addMethylHydrogens = (carbonAtom) => {
        const cPos = carbonAtom.position;
        // Vektor arah dari C pusat ke C metil (ini adalah sumbu rotasi)
        const axis_C_C = cPos.clone().sub(atoms.C_center.position).normalize();

        // Pilih vektor referensi yang tidak sejajar dengan sumbu rotasi
        let refVec = new THREE.Vector3(0, 1, 0);
        if (Math.abs(axis_C_C.dot(refVec)) > 0.99) {
            refVec.set(1, 0, 0); // Ganti jika sejajar
        }
        
        // Buat vektor pertama yang tegak lurus dengan sumbu C-C
        const perpVec = new THREE.Vector3().crossVectors(axis_C_C, refVec).normalize();

        for (let i = 0; i < 3; i++) {
            // Buat arah C-H dengan menggabungkan arah sumbu dan arah tegak lurus
            // Ini akan membentuk sudut tetrahedral yang benar
            const hDir = perpVec.clone().multiplyScalar(Math.sin(angle));
            hDir.add(axis_C_C.clone().multiplyScalar(-Math.cos(angle))).normalize();

            // Putar arah C-H di sekitar sumbu C-C untuk 2 hidrogen lainnya
            hDir.applyAxisAngle(axis_C_C, (i / 3) * 2 * Math.PI);

            const hPos = cPos.clone().add(hDir.multiplyScalar(chBondLength));
            
            const hAtom = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
            hAtom.position.copy(hPos);
            hAtom.userData.initialPosition = hPos.clone();
            mainGroup.add(hAtom);
            mainGroup.add(createBondMesh(cPos, hPos, bondRadius));
        }
    };
    
    // Tambahkan 9 Hidrogen lainnya ke tiga gugus metil
    addMethylHydrogens(atoms.C1);
    addMethylHydrogens(atoms.C2);
    addMethylHydrogens(atoms.C3);
}

function drawChlorineTrifluoride() {
    const bondLength_axial = 2.4; // Ikatan aksial sedikit lebih panjang
    const bondLength_equatorial = 2.2;
    const bondRadius = 0.08;

    const cl = createAtomMesh(DATA.atoms.Cl.radius, DATA.atoms.Cl.color, 'Cl');
    const f_axial1 = createAtomMesh(DATA.atoms.F.radius, DATA.atoms.F.color, 'F');
    const f_axial2 = createAtomMesh(DATA.atoms.F.radius, DATA.atoms.F.color, 'F');
    const f_equatorial = createAtomMesh(DATA.atoms.F.radius, DATA.atoms.F.color, 'F');

    cl.position.set(0, 0, 0);
    
    // Dua atom Fluor berada di posisi aksial (atas dan bawah)
    f_axial1.position.set(0, bondLength_axial, 0);
    f_axial2.position.set(0, -bondLength_axial, 0);
    
    // Satu atom Fluor berada di posisi ekuatorial (samping)
    f_equatorial.position.set(bondLength_equatorial, 0, 0);

    [cl, f_axial1, f_axial2, f_equatorial].forEach(atom => {
        atom.userData.initialPosition = atom.position.clone();
        mainGroup.add(atom);
    });

    mainGroup.add(createBondMesh(cl.position, f_axial1.position, bondRadius));
    mainGroup.add(createBondMesh(cl.position, f_axial2.position, bondRadius));
    mainGroup.add(createBondMesh(cl.position, f_equatorial.position, bondRadius));
}

function drawCyclopropane() {
    const ccBondLength = 2.5;
    const chBondLength = 1.8;
    const bondRadius = 0.08;
    const atoms = {};

    // Helper untuk membuat atom
    const createAndAddAtom = (name, symbol, position) => {
        const atomData = DATA.atoms[symbol];
        const atom = createAtomMesh(atomData.radius, atomData.color, symbol);
        atom.position.copy(position);
        atom.userData.initialPosition = atom.position.clone();
        atoms[name] = atom;
        mainGroup.add(atom);
    };

    for (let i = 0; i < 3; i++) {
        const angle = (i / 3) * 2 * Math.PI;
        const cPos = new THREE.Vector3(ccBondLength * Math.cos(angle), ccBondLength * Math.sin(angle), 0);
        createAndAddAtom(`C${i}`, 'C', cPos);
    }

    mainGroup.add(createBondMesh(atoms.C0.position, atoms.C1.position, 0.1));
    mainGroup.add(createBondMesh(atoms.C1.position, atoms.C2.position, 0.1));
    mainGroup.add(createBondMesh(atoms.C2.position, atoms.C0.position, 0.1));

    for (let i = 0; i < 3; i++) {
        const carbonAtom = atoms[`C${i}`];
        const cPos = carbonAtom.position;

        // Satu Hidrogen di atas bidang (sumbu Z positif)
        const h_above_pos = cPos.clone().add(new THREE.Vector3(0, 0, chBondLength));
        createAndAddAtom(`H${i}_a`, 'H', h_above_pos);
        mainGroup.add(createBondMesh(cPos, h_above_pos, bondRadius));

        // Satu Hidrogen di bawah bidang (sumbu Z negatif)
        const h_below_pos = cPos.clone().add(new THREE.Vector3(0, 0, -chBondLength));
        createAndAddAtom(`H${i}_b`, 'H', h_below_pos);
        mainGroup.add(createBondMesh(cPos, h_below_pos, bondRadius));
    }
}

function drawAcetamide() {
    const ccBondLength = 2.5;
    const coBondLength = 2.0; // Ikatan rangkap dua
    const cnBondLength = 2.2;
    const nhBondLength = 1.6;
    const chBondLength = 1.8;
    const bondRadius = 0.08;
    const doubleBondOffset = 0.22;

    const c_methyl = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C');
    const c_carbonyl = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C');
    const o_carbonyl = createAtomMesh(DATA.atoms.O.radius, DATA.atoms.O.color, 'O');
    const n_amide = createAtomMesh(DATA.atoms.N.radius, DATA.atoms.N.color, 'N');
    
    c_methyl.position.set(-ccBondLength, 0, 0);
    c_carbonyl.position.set(0, 0, 0);
    o_carbonyl.position.set(0, coBondLength, 0);
    n_amide.position.set(cnBondLength * Math.sin(Math.PI/6), -cnBondLength * Math.cos(Math.PI/6), 0);

    const h_methyl1 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
    h_methyl1.position.set(c_methyl.position.x - 0.5, -0.5, chBondLength*0.8);
    const h_methyl2 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
    h_methyl2.position.set(c_methyl.position.x - 0.5, -0.5, -chBondLength*0.8);
    const h_methyl3 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
    h_methyl3.position.set(c_methyl.position.x + 0.5, chBondLength, 0);
    const h_amide1 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
    h_amide1.position.set(n_amide.position.x + nhBondLength * 0.8, n_amide.position.y, 0);
    const h_amide2 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
    h_amide2.position.set(n_amide.position.x - nhBondLength * 0.4, n_amide.position.y - nhBondLength, 0);
    [c_methyl, c_carbonyl, o_carbonyl, n_amide, h_methyl1, h_methyl2, h_methyl3, h_amide1, h_amide2].forEach(atom => {
        atom.userData.initialPosition = atom.position.clone();
        mainGroup.add(atom);
    });

    mainGroup.add(createBondMesh(c_methyl.position, c_carbonyl.position, 0.1));
    mainGroup.add(createBondMesh(c_carbonyl.position, n_amide.position, bondRadius));
    mainGroup.add(createBondMesh(c_carbonyl.position.clone().setX(doubleBondOffset/2), o_carbonyl.position.clone().setX(doubleBondOffset/2), bondRadius));
    mainGroup.add(createBondMesh(c_carbonyl.position.clone().setX(-doubleBondOffset/2), o_carbonyl.position.clone().setX(-doubleBondOffset/2), bondRadius));
    mainGroup.add(createBondMesh(c_methyl.position, h_methyl1.position, bondRadius));
    mainGroup.add(createBondMesh(c_methyl.position, h_methyl2.position, bondRadius));
    mainGroup.add(createBondMesh(c_methyl.position, h_methyl3.position, bondRadius));
    mainGroup.add(createBondMesh(n_amide.position, h_amide1.position, bondRadius));
    mainGroup.add(createBondMesh(n_amide.position, h_amide2.position, bondRadius));
}

function drawCarbonMonoxide() {
    const bondLength = 2.0;
    const tripleBondOffset = 0.20;
    const bondRadius = 0.08;
    const c = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C', '-', 0xff8888);
    const o = createAtomMesh(DATA.atoms.O.radius, DATA.atoms.O.color, 'O', '+', 0x8888ff);

    c.position.set(-bondLength / 2, 0, 0);
    o.position.set(bondLength / 2, 0, 0);
    [c, o].forEach(atom => {
        atom.userData.initialPosition = atom.position.clone();
        mainGroup.add(atom);
    });

    mainGroup.add(createBondMesh(c.position, o.position, bondRadius)); // Ikatan tengah (sigma)
    mainGroup.add(createBondMesh(c.position.clone().setY(tripleBondOffset), o.position.clone().setY(tripleBondOffset), bondRadius)); // Ikatan pi 1
    mainGroup.add(createBondMesh(c.position.clone().setY(-tripleBondOffset), o.position.clone().setY(-tripleBondOffset), bondRadius)); // Ikatan pi 2
}

function drawFormicAcid() {
    const coDoubleBondLength = 2.0;
    const coSingleBondLength = 2.2;
    const chBondLength = 1.8;
    const ohBondLength = 1.6;
    const bondRadius = 0.08;
    const doubleBondOffset = 0.22;

    const c = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C');
    const o_carbonyl = createAtomMesh(DATA.atoms.O.radius, DATA.atoms.O.color, 'O');
    const o_hydroxyl = createAtomMesh(DATA.atoms.O.radius, DATA.atoms.O.color, 'O');
    const h_acid = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H'); // Hidrogen pada -COOH
    const h_aldehyde = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H'); // Hidrogen pada -CHO

    c.position.set(0, 0, 0);
    o_carbonyl.position.set(0, coDoubleBondLength, 0);
    h_aldehyde.position.set(-chBondLength * 0.9, -chBondLength * 0.5, 0);
    o_hydroxyl.position.set(coSingleBondLength * 0.9, -coSingleBondLength * 0.5, 0);
    
    // Posisikan hidrogen asam menjauh dari oksigen hidroksil
    const h_acid_dir = o_hydroxyl.position.clone().sub(c.position).normalize();
    h_acid.position.copy(o_hydroxyl.position).add(h_acid_dir.multiplyScalar(ohBondLength));

    [c, o_carbonyl, o_hydroxyl, h_acid, h_aldehyde].forEach(atom => {
        atom.userData.initialPosition = atom.position.clone();
        mainGroup.add(atom);
    });

    mainGroup.add(createBondMesh(c.position.clone().setX(doubleBondOffset/2), o_carbonyl.position.clone().setX(doubleBondOffset/2), bondRadius));
    mainGroup.add(createBondMesh(c.position.clone().setX(-doubleBondOffset/2), o_carbonyl.position.clone().setX(-doubleBondOffset/2), bondRadius));
    mainGroup.add(createBondMesh(c.position, h_aldehyde.position, bondRadius));
    mainGroup.add(createBondMesh(c.position, o_hydroxyl.position, bondRadius));
    mainGroup.add(createBondMesh(o_hydroxyl.position, h_acid.position, bondRadius));
}

function drawCisDichloroethene() {
    const ccBondLength = 2.2;
    const chBondLength = 1.8;
    const cclBondLength = 2.4;
    const doubleBondOffset = 0.22;
    const bondRadius = 0.08;
    const angle = 120 * Math.PI / 180; // Sudut ~120 derajat untuk sp2

    // Buat atom Karbon
    const c1 = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C');
    const c2 = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C');
    c1.position.set(-ccBondLength / 2, 0, 0);
    c2.position.set(ccBondLength / 2, 0, 0);
    mainGroup.add(c1, c2);

    const dir_up = new THREE.Vector3(Math.cos(angle/2), Math.sin(angle/2), 0);
    const dir_down = new THREE.Vector3(Math.cos(angle/2), -Math.sin(angle/2), 0);
    const h1 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
    h1.position.copy(c1.position).add(dir_up.clone().setX(-dir_up.x).multiplyScalar(chBondLength));
    const cl1 = createAtomMesh(DATA.atoms.Cl.radius, DATA.atoms.Cl.color, 'Cl');
    cl1.position.copy(c1.position).add(dir_down.clone().setX(-dir_down.x).multiplyScalar(cclBondLength));
    const h2 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
    h2.position.copy(c2.position).add(dir_up.multiplyScalar(chBondLength));
    const cl2 = createAtomMesh(DATA.atoms.Cl.radius, DATA.atoms.Cl.color, 'Cl');
    cl2.position.copy(c2.position).add(dir_down.multiplyScalar(cclBondLength));
    [h1, cl1, h2, cl2].forEach(atom => {
        atom.userData.initialPosition = atom.position.clone();
        mainGroup.add(atom);
    });

    mainGroup.add(createBondMesh(c1.position.clone().setY(doubleBondOffset/2), c2.position.clone().setY(doubleBondOffset/2), bondRadius));
    mainGroup.add(createBondMesh(c1.position.clone().setY(-doubleBondOffset/2), c2.position.clone().setY(-doubleBondOffset/2), bondRadius));
    mainGroup.add(createBondMesh(c1.position, h1.position, bondRadius));
    mainGroup.add(createBondMesh(c1.position, cl1.position, bondRadius));
    mainGroup.add(createBondMesh(c2.position, h2.position, bondRadius));
    mainGroup.add(createBondMesh(c2.position, cl2.position, bondRadius));
}

function drawTransDichloroethene() {
    const ccBondLength = 2.2;
    const chBondLength = 1.8;
    const cclBondLength = 2.4;
    const doubleBondOffset = 0.22;
    const bondRadius = 0.08;
    const angle = 120 * Math.PI / 180;

    // Buat atom Karbon
    const c1 = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C');
    const c2 = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C');
    c1.position.set(-ccBondLength / 2, 0, 0);
    c2.position.set(ccBondLength / 2, 0, 0);
    mainGroup.add(c1, c2);

    const dir_up = new THREE.Vector3(Math.cos(angle/2), Math.sin(angle/2), 0);
    const dir_down = new THREE.Vector3(Math.cos(angle/2), -Math.sin(angle/2), 0);

    const h1 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
    h1.position.copy(c1.position).add(dir_up.clone().setX(-dir_up.x).multiplyScalar(chBondLength));
    const cl1 = createAtomMesh(DATA.atoms.Cl.radius, DATA.atoms.Cl.color, 'Cl');
    cl1.position.copy(c1.position).add(dir_down.clone().setX(-dir_down.x).multiplyScalar(cclBondLength));

    const h2 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
    h2.position.copy(c2.position).add(dir_down.multiplyScalar(chBondLength)); // H di bawah
    const cl2 = createAtomMesh(DATA.atoms.Cl.radius, DATA.atoms.Cl.color, 'Cl');
    cl2.position.copy(c2.position).add(dir_up.multiplyScalar(cclBondLength)); // Cl di atas

    [h1, cl1, h2, cl2].forEach(atom => {
        atom.userData.initialPosition = atom.position.clone();
        mainGroup.add(atom);
    });

    mainGroup.add(createBondMesh(c1.position.clone().setY(doubleBondOffset/2), c2.position.clone().setY(doubleBondOffset/2), bondRadius));
    mainGroup.add(createBondMesh(c1.position.clone().setY(-doubleBondOffset/2), c2.position.clone().setY(-doubleBondOffset/2), bondRadius));
    mainGroup.add(createBondMesh(c1.position, h1.position, bondRadius));
    mainGroup.add(createBondMesh(c1.position, cl1.position, bondRadius));
    mainGroup.add(createBondMesh(c2.position, h2.position, bondRadius));
    mainGroup.add(createBondMesh(c2.position, cl2.position, bondRadius));
}

function drawAdamantane() {
    const ccBondLength = 3.2;  
    const chBondLength = 2.0; 
    const bondRadius = 0.08;
    const atoms = {};

    // Helper untuk membuat atom
    const createAndAddAtom = (name, symbol, position) => {
        const atomData = DATA.atoms[symbol];
        const atom = createAtomMesh(atomData.radius, atomData.color, symbol);
        atom.position.copy(position);
        atom.userData.initialPosition = atom.position.clone();
        atoms[name] = atom;
        mainGroup.add(atom);
    };

    // Menggunakan ccBondLength yang sudah diperbesar
    const p = ccBondLength / Math.sqrt(6);
    createAndAddAtom('C1', 'C', new THREE.Vector3(p, p, p));
    createAndAddAtom('C2', 'C', new THREE.Vector3(-p, -p, p));
    createAndAddAtom('C3', 'C', new THREE.Vector3(p, -p, -p));
    createAndAddAtom('C4', 'C', new THREE.Vector3(-p, p, -p));
    createAndAddAtom('C12', 'C', new THREE.Vector3(0, 0, p * Math.sqrt(2)));
    createAndAddAtom('C13', 'C', new THREE.Vector3(p * Math.sqrt(2), 0, 0));
    createAndAddAtom('C14', 'C', new THREE.Vector3(0, p * Math.sqrt(2), 0));
    createAndAddAtom('C23', 'C', new THREE.Vector3(0, -p * Math.sqrt(2), 0));
    createAndAddAtom('C24', 'C', new THREE.Vector3(-p * Math.sqrt(2), 0, 0));
    createAndAddAtom('C34', 'C', new THREE.Vector3(0, 0, -p * Math.sqrt(2)));
    
    const bonds = [
        'C1-C12', 'C1-C13', 'C1-C14',
        'C2-C12', 'C2-C23', 'C2-C24',
        'C3-C13', 'C3-C23', 'C3-C34',
        'C4-C14', 'C4-C24', 'C4-C34'
    ];
    bonds.forEach(bond => {
        const [a, b] = bond.split('-');
        mainGroup.add(createBondMesh(atoms[a].position, atoms[b].position, 0.1));
    });

    Object.keys(atoms).filter(k => k.length === 2).forEach(cKey => {
        const cAtom = atoms[cKey];
        const dir = cAtom.position.clone().normalize();
        const hPos = cAtom.position.clone().add(dir.multiplyScalar(chBondLength));
        const hAtom = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
        hAtom.position.copy(hPos);
        hAtom.userData.initialPosition = hPos.clone();
        mainGroup.add(hAtom);
        mainGroup.add(createBondMesh(cAtom.position, hPos, bondRadius));
    });

    Object.keys(atoms).filter(k => k.length === 3).forEach(cKey => {
        const cAtom = atoms[cKey];
        const neighbor1 = atoms[`C${cKey.charAt(1)}`];
        const neighbor2 = atoms[`C${cKey.charAt(2)}`];

        const v1 = neighbor1.position.clone().sub(cAtom.position);
        const v2 = neighbor2.position.clone().sub(cAtom.position);
        
        const bisector = v1.clone().add(v2).normalize();
        const perpendicular = new THREE.Vector3().crossVectors(v1,v2).normalize();

        const h1Dir = new THREE.Vector3().addVectors(bisector, perpendicular).normalize();
        const h2Dir = new THREE.Vector3().subVectors(bisector, perpendicular).normalize();
        
        const h1Pos = cAtom.position.clone().add(h1Dir.multiplyScalar(chBondLength));
        const h2Pos = cAtom.position.clone().add(h2Dir.multiplyScalar(chBondLength));

        const h1 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
        const h2 = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
        h1.position.copy(h1Pos);
        h2.position.copy(h2Pos);
        h1.userData.initialPosition = h1Pos.clone();
        h2.userData.initialPosition = h2Pos.clone();
        mainGroup.add(h1, h2);
        mainGroup.add(createBondMesh(cAtom.position, h1Pos, bondRadius));
        mainGroup.add(createBondMesh(cAtom.position, h2Pos, bondRadius));
    });
}

function drawFerrocene() {
    const ringRadius = 2.8;
    const ringDistance = 2.0; // Jarak vertikal dari Fe ke pusat cincin
    const chBondLength = 1.8;
    const bondRadius = 0.08;
    const atoms = {};

    const createAndAddAtom = (name, symbol, position) => {
        const atomData = DATA.atoms[symbol];
        const atom = createAtomMesh(atomData.radius, atomData.color, symbol);
        atom.position.copy(position);
        atom.userData.initialPosition = atom.position.clone();
        atoms[name] = atom;
        mainGroup.add(atom);
    };

    createAndAddAtom('Fe', 'Fe', new THREE.Vector3(0, 0, 0));

    const createCpRing = (zPos, prefix) => {
        const ringCarbons = [];
        // Buat 5 atom Karbon membentuk pentagon
        for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * 2 * Math.PI;
            const cPos = new THREE.Vector3(ringRadius * Math.cos(angle), ringRadius * Math.sin(angle), zPos);
            createAndAddAtom(`${prefix}_C${i}`, 'C', cPos);
            ringCarbons.push(atoms[`${prefix}_C${i}`]);
        }
        
        // Buat ikatan C-C di dalam cincin
        for (let i = 0; i < 5; i++) {
            const currentC = ringCarbons[i];
            const nextC = ringCarbons[(i + 1) % 5];
            mainGroup.add(createBondMesh(currentC.position, nextC.position, 0.1));
        }

        // Tambahkan Hidrogen ke setiap Karbon, mengarah keluar dari cincin
        ringCarbons.forEach((carbonAtom, i) => {
            const cPos = carbonAtom.position;
            const dir = cPos.clone().setZ(zPos).normalize(); // Arah dari pusat cincin ke Karbon
            const hPos = cPos.clone().add(dir.multiplyScalar(chBondLength));
            createAndAddAtom(`${prefix}_H${i}`, 'H', hPos);
            mainGroup.add(createBondMesh(cPos, hPos, bondRadius));
        });
    };

    createCpRing(ringDistance, 'top');  
    createCpRing(-ringDistance, 'bottom'); 
}

function drawBuckminsterfullerene() {
    const radius = 6.5; // Radius bola C60, diperbesar agar tidak menumpuk
    const bondRadius = 0.08;
    const atoms = [];

    const phi = (1 + Math.sqrt(5)) / 2;
    const vertices = [
        new THREE.Vector3(0, 1, 3 * phi), new THREE.Vector3(0, 1, -3 * phi),
        new THREE.Vector3(0, -1, 3 * phi), new THREE.Vector3(0, -1, -3 * phi),
        new THREE.Vector3(1, 3 * phi, 0), new THREE.Vector3(1, -3 * phi, 0),
        new THREE.Vector3(-1, 3 * phi, 0), new THREE.Vector3(-1, -3 * phi, 0),
        new THREE.Vector3(3 * phi, 0, 1), new THREE.Vector3(3 * phi, 0, -1),
        new THREE.Vector3(-3 * phi, 0, 1), new THREE.Vector3(-3 * phi, 0, -1),
        new THREE.Vector3(2, (1 + 2 * phi), phi), new THREE.Vector3(2, (1 + 2 * phi), -phi),
        new THREE.Vector3(2, -(1 + 2 * phi), phi), new THREE.Vector3(2, -(1 + 2 * phi), -phi),
        new THREE.Vector3(-2, (1 + 2 * phi), phi), new THREE.Vector3(-2, (1 + 2 * phi), -phi),
        new THREE.Vector3(-2, -(1 + 2 * phi), phi), new THREE.Vector3(-2, -(1 + 2 * phi), -phi),
        new THREE.Vector3((1 + 2 * phi), phi, 2), new THREE.Vector3((1 + 2 * phi), phi, -2),
        new THREE.Vector3((1 + 2 * phi), -phi, 2), new THREE.Vector3((1 + 2 * phi), -phi, -2),
        new THREE.Vector3(-(1 + 2 * phi), phi, 2), new THREE.Vector3(-(1 + 2 * phi), phi, -2),
        new THREE.Vector3(-(1 + 2 * phi), -phi, 2), new THREE.Vector3(-(1 + 2 * phi), -phi, -2),
        new THREE.Vector3(phi, 2, (1 + 2 * phi)), new THREE.Vector3(phi, 2, -(1 + 2 * phi)),
        new THREE.Vector3(phi, -2, (1 + 2 * phi)), new THREE.Vector3(phi, -2, -(1 + 2 * phi)),
        new THREE.Vector3(-phi, 2, (1 + 2 * phi)), new THREE.Vector3(-phi, 2, -(1 + 2 * phi)),
        new THREE.Vector3(-phi, -2, (1 + 2 * phi)), new THREE.Vector3(-phi, -2, -(1 + 2 * phi)),
        new THREE.Vector3(1, (2 + phi), 2 * phi), new THREE.Vector3(1, (2 + phi), -2 * phi),
        new THREE.Vector3(1, -(2 + phi), 2 * phi), new THREE.Vector3(1, -(2 + phi), -2 * phi),
        new THREE.Vector3(-1, (2 + phi), 2 * phi), new THREE.Vector3(-1, (2 + phi), -2 * phi),
        new THREE.Vector3(-1, -(2 + phi), 2 * phi), new THREE.Vector3(-1, -(2 + phi), -2 * phi),
        new THREE.Vector3((2 + phi), 2 * phi, 1), new THREE.Vector3((2 + phi), 2 * phi, -1),
        new THREE.Vector3((2 + phi), -2 * phi, 1), new THREE.Vector3((2 + phi), -2 * phi, -1),
        new THREE.Vector3(-(2 + phi), 2 * phi, 1), new THREE.Vector3(-(2 + phi), 2 * phi, -1),
        new THREE.Vector3(-(2 + phi), -2 * phi, 1), new THREE.Vector3(-(2 + phi), -2 * phi, -1),
        new THREE.Vector3(2 * phi, 1, (2 + phi)), new THREE.Vector3(2 * phi, 1, -(2 + phi)),
        new THREE.Vector3(2 * phi, -1, (2 + phi)), new THREE.Vector3(2 * phi, -1, -(2 + phi)),
        new THREE.Vector3(-2 * phi, 1, (2 + phi)), new THREE.Vector3(-2 * phi, 1, -(2 + phi)),
        new THREE.Vector3(-2 * phi, -1, (2 + phi)), new THREE.Vector3(-2 * phi, -1, -(2 + phi))
    ];

    vertices.forEach(pos => {
        const atom = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C');
        const finalPos = pos.normalize().multiplyScalar(radius);
        atom.position.copy(finalPos);
        atom.userData.initialPosition = finalPos.clone();
        atoms.push(atom);
        mainGroup.add(atom);
    });

    const bondDistanceCheck = radius * 0.5; 

    for (let i = 0; i < atoms.length; i++) {
        for (let j = i + 1; j < atoms.length; j++) {
            const atom1 = atoms[i];
            const atom2 = atoms[j];
            const dist = atom1.position.distanceTo(atom2.position);

            // Jika jaraknya cukup dekat, buat ikatan
            if (dist < bondDistanceCheck) {
                mainGroup.add(createBondMesh(atom1.position, atom2.position, bondRadius));
            }
        }
    }
    
    // Sesuaikan posisi kamera untuk C60 agar terlihat penuh
    camera.position.set(0, 0, 18);
    controls.target.set(0, 0, 0);
}

function drawCubane() {
    const cubeSide = 3.0; // Panjang sisi kubus, dibuat cukup besar agar tidak menumpuk
    const chBondLength = 1.8;
    const bondRadius = 0.08;
    const atoms = {};

    const createAndAddAtom = (name, symbol, position) => {
        const atomData = DATA.atoms[symbol];
        const atom = createAtomMesh(atomData.radius, atomData.color, symbol);
        atom.position.copy(position);
        atom.userData.initialPosition = atom.position.clone();
        atoms[name] = atom;
        mainGroup.add(atom);
    };
    const s = cubeSide / 2;
    const vertices = [
        new THREE.Vector3(s, s, s), new THREE.Vector3(s, s, -s),
        new THREE.Vector3(s, -s, s), new THREE.Vector3(s, -s, -s),
        new THREE.Vector3(-s, s, s), new THREE.Vector3(-s, s, -s),
        new THREE.Vector3(-s, -s, s), new THREE.Vector3(-s, -s, -s)
    ];

    vertices.forEach((pos, i) => {
        createAndAddAtom(`C${i}`, 'C', pos);
    });

    const edges = [
        'C0-C1', 'C0-C2', 'C0-C4', 'C1-C3', 'C1-C5', 'C2-C3',
        'C2-C6', 'C3-C7', 'C4-C5', 'C4-C6', 'C5-C7', 'C6-C7'
    ];
    edges.forEach(edge => {
        const [a, b] = edge.split('-');
        mainGroup.add(createBondMesh(atoms[a].position, atoms[b].position, 0.1));
    });

    Object.keys(atoms).forEach(cKey => {
        const carbonAtom = atoms[cKey];
        // Vektor arah dari pusat kubus ke sudutnya
        const dir = carbonAtom.position.clone().normalize();
        const hPos = carbonAtom.position.clone().add(dir.multiplyScalar(chBondLength));
        
        const hAtom = createAtomMesh(DATA.atoms.H.radius, DATA.atoms.H.color, 'H');
        hAtom.position.copy(hPos);
        hAtom.userData.initialPosition = hPos.clone();
        mainGroup.add(hAtom);
        mainGroup.add(createBondMesh(carbonAtom.position, hPos, bondRadius));
    });
}

function drawCarbonNanotube() {
    const tubeRadius = 3.5;
    const numRings = 10;
    const atomsPerRing = 12;
    const bondLength = 1.8;
    const bondRadius = 0.08;
    const atoms = [];

    for (let i = 0; i < numRings; i++) {
        for (let j = 0; j < atomsPerRing; j++) {
            const angleOffset = (i % 2 === 0) ? 0 : (Math.PI / atomsPerRing);
            const angle = (j / atomsPerRing) * 2 * Math.PI + angleOffset;
            
            const x = tubeRadius * Math.cos(angle);
            const y = tubeRadius * Math.sin(angle);
            const z = i * (bondLength * 0.75);

            const atom = createAtomMesh(DATA.atoms.C.radius, DATA.atoms.C.color, 'C');
            atom.position.set(x, y, z);
            atom.userData.initialPosition = atom.position.clone();
            atoms.push(atom);
            mainGroup.add(atom);
        }
    }

    const bondCheckDistance = bondLength * 1.1;
    for (let i = 0; i < atoms.length; i++) {
        for (let j = i + 1; j < atoms.length; j++) {
            if (atoms[i].position.distanceTo(atoms[j].position) < bondCheckDistance) {
                mainGroup.add(createBondMesh(atoms[i].position, atoms[j].position, bondRadius));
            }
        }
    }

    const tubeCenterZ = (numRings - 1) * (bondLength * 0.75) / 2;

    mainGroup.children.forEach(child => {
        child.position.z -= tubeCenterZ;
        if (child.userData.initialPosition) {
            child.userData.initialPosition.z -= tubeCenterZ;
        }
    });

    camera.position.set(tubeRadius * 3, tubeRadius * 2, 0); // Z sekarang 0
    controls.target.set(0, 0, 0); // Target sekarang SELALU di (0,0,0)
}

function drawDNA() {
    const numBasePairs = 12;        
    const helixRadius = 4.0;        
    const helixPitch = 12.0;        
    const basePairDistance = 2.0;   
    const bondRadius = 0.08;

    const atoms = { strand1: [], strand2: [], bases1: [], bases2: [] }; 
    const colorAT = { A: 0x4169E1, T: 0xFF4500 }; 
    const colorGC = { G: 0x32CD32, C: 0xFFD700 }; 

    for (let i = 0; i < numBasePairs; i++) {
        const angle = (i / helixPitch) * 2 * Math.PI;
        const z = i * basePairDistance;

        const p1 = createAtomMesh(DATA.atoms.P.radius, DATA.atoms.P.color, 'P');
        p1.position.set(helixRadius * Math.cos(angle), helixRadius * Math.sin(angle), z);
        atoms.strand1.push(p1);
        mainGroup.add(p1);

        const p2 = createAtomMesh(DATA.atoms.P.radius, DATA.atoms.P.color, 'P');
        p2.position.set(-helixRadius * Math.cos(angle), -helixRadius * Math.sin(angle), z);
        atoms.strand2.push(p2);
        mainGroup.add(p2);

        if (i > 0) {
            mainGroup.add(createBondMesh(atoms.strand1[i - 1].position, p1.position, 0.1));
            mainGroup.add(createBondMesh(atoms.strand2[i - 1].position, p2.position, 0.1));
        }

        const isATpair = Math.random() > 0.5; 
        const baseSymbol1 = isATpair ? 'A' : 'G';
        const baseSymbol2 = isATpair ? 'T' : 'C';
        const baseColor1 = isATpair ? colorAT.A : colorGC.G;
        const baseColor2 = isATpair ? colorAT.T : colorGC.C;

        const base1 = createAtomMesh(DATA.atoms.N.radius, baseColor1, baseSymbol1);
        const base2 = createAtomMesh(DATA.atoms.N.radius, baseColor2, baseSymbol2);

        base1.userData.type = 'base_placeholder';
        base2.userData.type = 'base_placeholder';
        base1.position.copy(p1.position).lerp(p2.position, 0.3); 
        base2.position.copy(p2.position).lerp(p1.position, 0.3); 
        atoms.bases1.push(base1);
        atoms.bases2.push(base2);
        
        mainGroup.add(base1, base2);
        mainGroup.add(createBondMesh(p1.position, base1.position, bondRadius));
        mainGroup.add(createBondMesh(p2.position, base2.position, bondRadius));

        const numHBonds = isATpair ? 2 : 3;
        for (let j = 0; j < numHBonds; j++) {
            const offsetAmount = 0.5;
            const offset = new THREE.Vector3(0, (j - (numHBonds - 1) / 2) * offsetAmount, 0);
            offset.applyAxisAngle(new THREE.Vector3(0,0,1), angle + Math.PI/2);
            mainGroup.add(createBondMesh(base1.position.clone().add(offset), base2.position.clone().add(offset), 0.04)); 
        }
    }

    const helixCenterZ = (numBasePairs - 1) * basePairDistance / 2;

    mainGroup.children.forEach(child => {
        child.position.z -= helixCenterZ;
        if (child.userData && child.userData.initialPosition) {
             child.userData.initialPosition.z -= helixCenterZ;
        }
    });

    camera.position.set(helixRadius * 3, helixRadius * 2, 0);
    controls.target.set(0, 0, 0);
}

function drawOxygen() {
    const bondLength = 2.0;
    const doubleBondOffset = 0.20; // Jarak untuk ikatan rangkap dua
    const bondRadius = 0.08;

    const o1 = createAtomMesh(DATA.atoms.O.radius, DATA.atoms.O.color, 'O');
    const o2 = createAtomMesh(DATA.atoms.O.radius, DATA.atoms.O.color, 'O');

    o1.position.set(-bondLength / 2, 0, 0);
    o2.position.set(bondLength / 2, 0, 0);

    [o1, o2].forEach(atom => {
        atom.userData.initialPosition = atom.position.clone();
        mainGroup.add(atom);
    });

    mainGroup.add(createBondMesh(o1.position.clone().setY(doubleBondOffset / 2), o2.position.clone().setY(doubleBondOffset / 2), bondRadius));
    mainGroup.add(createBondMesh(o1.position.clone().setY(-doubleBondOffset / 2), o2.position.clone().setY(-doubleBondOffset / 2), bondRadius));
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
    // init(); // Panggil fungsi init utama setelah TWEEN siap.
};
