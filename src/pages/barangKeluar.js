import "./barangKeluar.css";

const transaksiKeluar = [
  {
    nama: "Indomie Goreng",
    kategori: "Makanan",
    jumlah: 12,
    tanggal: "19 Agustus 2026",
    waktu: "13:20",
    icon: "🍜",
    bg: "food-bg"
  },
  {
    nama: "Aqua Botol 600ml",
    kategori: "Minuman",
    jumlah: 10,
    tanggal: "19 Agustus 2026",
    waktu: "11:15",
    icon: "💧",
    bg: "water-bg"
  },
  {
    nama: "Teh Botol Sosro",
    kategori: "Minuman",
    jumlah: 7,
    tanggal: "18 Agustus 2026",
    waktu: "15:40",
    icon: "🧃",
    bg: "tea-bg"
  },
  {
    nama: "Beras Premium 5kg",
    kategori: "Sembako",
    jumlah: 5,
    tanggal: "18 Agustus 2026",
    waktu: "09:30",
    icon: "🍚",
    bg: "rice-bg"
  }
];

export function barangKeluarPage() {
  return `
    <section class="keluar-page">

      <div class="keluar-heading">
        <button class="back-keluar" id="backKeluar">←</button>

        <div>
          <span class="page-label">TRANSAKSI</span>
          <h2>Barang Keluar</h2>
          <p>Catat dan kelola barang yang keluar dari inventori.</p>
        </div>
      </div>

      <div class="keluar-summary">

        <div class="keluar-card">
          <span>Total Keluar</span>
          <strong>${hitungTotalKeluar()}</strong>
          <small>Unit bulan ini</small>
        </div>

        <div class="keluar-card">
          <span>Hari Ini</span>
          <strong>15</strong>
          <small>Transaksi</small>
        </div>

        <div class="keluar-card">
          <span>Jenis Barang</span>
          <strong>${hitungJenisBarang()}</strong>
          <small>Barang</small>
        </div>

      </div>

      <div class="keluar-tools">

        <div class="keluar-search">
          <span>⌕</span>
          <input
            id="searchKeluar"
            type="text"
            placeholder="Cari barang..."
          >
        </div>

        <select id="filterKeluar">
          <option value="Semua">Semua Kategori</option>
          <option value="Makanan">Makanan</option>
          <option value="Minuman">Minuman</option>
          <option value="Sembako">Sembako</option>
        </select>

      </div>

      <div class="riwayat-keluar-heading">
        <div>
          <span>RIWAYAT</span>
          <h3>Barang Keluar Terbaru</h3>
        </div>

        <small>${transaksiKeluar.length} transaksi</small>
      </div>

      <div class="keluar-list" id="keluarList">
        ${renderTransaksiKeluar(transaksiKeluar)}
      </div>

    </section>
  `;
}

function hitungTotalKeluar() {
  return transaksiKeluar.reduce(
    (total, item) => total + item.jumlah,
    0
  );
}

function hitungJenisBarang() {
  return new Set(
    transaksiKeluar.map(item => item.nama)
  ).size;
}

function renderTransaksiKeluar(data) {

  if (!data.length) {
    return `
      <div class="keluar-empty">
        <strong>Transaksi tidak ditemukan</strong>
        <span>Coba gunakan kata kunci atau kategori lain.</span>
      </div>
    `;
  }

  return data.map(item => `
    <article class="transaksi-keluar">

      <div class="keluar-image ${item.bg}">
        ${item.icon}
      </div>

      <div class="keluar-name">
        <strong>${item.nama}</strong>
        <span>${item.kategori}</span>
      </div>

      <div class="keluar-jumlah">
        <small>Jumlah Keluar</small>
        <strong>-${item.jumlah} pcs</strong>
      </div>

      <div class="keluar-date">
        <small>Tanggal</small>
        <strong>${item.tanggal}</strong>
        <span>${item.waktu}</span>
      </div>

      <div class="keluar-status">
        Barang Keluar
      </div>

    </article>
  `).join("");
}

export function initBarangKeluar() {

  const search = document.querySelector("#searchKeluar");
  const filter = document.querySelector("#filterKeluar");
  const list = document.querySelector("#keluarList");

  function updateList() {

    const keyword = search.value.toLowerCase();
    const kategori = filter.value;

    const hasil = transaksiKeluar.filter(item => {

      const cocokNama =
        item.nama.toLowerCase().includes(keyword);

      const cocokKategori =
        kategori === "Semua" ||
        item.kategori === kategori;

      return cocokNama && cocokKategori;
    });

    list.innerHTML = renderTransaksiKeluar(hasil);
  }

  search.addEventListener("input", updateList);
  filter.addEventListener("change", updateList);
}