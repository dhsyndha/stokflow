import "./totalBarang.css";

let barang = [
  {
    nama:"Indomie Goreng",
    kategori:"Makanan",
    stok:120,
    beli:"Rp 2.500",
    jual:"Rp 3.000",
    icon:"🍜",
    bg:"food-bg"
  },
  {
    nama:"Aqua Botol 600ml",
    kategori:"Minuman",
    stok:80,
    beli:"Rp 3.000",
    jual:"Rp 4.000",
    icon:"💧",
    bg:"water-bg"
  },
  {
    nama:"Teh Botol Sosro",
    kategori:"Minuman",
    stok:8,
    beli:"Rp 2.000",
    jual:"Rp 3.000",
    icon:"🧃",
    bg:"tea-bg"
  },
  {
    nama:"Beras Premium 5kg",
    kategori:"Sembako",
    stok:30,
    beli:"Rp 60.000",
    jual:"Rp 70.000",
    icon:"🍚",
    bg:"rice-bg"
  }
];

export function totalBarangPage(){
  return `
    <section class="barang-page">

      <div class="barang-heading">
        <button class="back-home">←</button>
        <div>
          <span class="page-label">INVENTORI</span>
          <h2>Total Barang</h2>
          <p>Kelola seluruh barang yang tersedia di dalam stok.</p>
        </div>
      </div>

      <div class="barang-summary">

        <div class="summary-main">
          <div class="summary-icon">▣</div>
          <div>
            <span>Total Barang</span>
            <strong id="totalBarangCount">${barang.length}</strong>
            <small>Barang terdaftar</small>
          </div>
        </div>

        <div class="summary-info-card">
          <small>Total Stok</small>
          <strong id="totalStokCount">
            ${hitungTotalStok().toLocaleString("id-ID")} pcs
          </strong>
        </div>

        <div class="summary-info-card">
          <small>Stok Aman</small>
          <strong id="stokAmanCount" class="safe-text">
            ${hitungStokAman()} barang
          </strong>
        </div>

        <div class="summary-info-card danger-summary">
          <small>Stok Menipis</small>
          <strong id="stokMenipisCount" class="danger-text">
            ${hitungStokMenipis()} barang
          </strong>
        </div>

      </div>

      <div class="barang-tools">

        <div class="barang-search">
          <span>⌕</span>
          <input
            id="searchBarang"
            type="text"
            placeholder="Cari nama barang..."
          >
        </div>

        <select id="filterKategori">
          <option value="Semua">Semua Kategori</option>
          <option value="Makanan">Makanan</option>
          <option value="Minuman">Minuman</option>
          <option value="Sembako">Sembako</option>
        </select>
      </div>

      <div class="barang-list" id="barangList">
        ${renderBarang(barang)}
      </div>

    </section>
  `;
}

function hitungTotalStok(){
  return barang.reduce((total,item) => total + item.stok,0);
}

function hitungStokAman(){
  return barang.filter(item => item.stok > 10).length;
}

function hitungStokMenipis(){
  return barang.filter(item => item.stok <= 10).length;
}

function renderBarang(data){
  if(!data.length){
    return `
      <div class="empty-barang">
        <div>⌕</div>
        <strong>Barang tidak ditemukan</strong>
        <span>Coba gunakan kata kunci atau kategori lain.</span>
      </div>
    `;
  }

  return data.map(item => `
    <article class="barang-item">

      <div class="barang-image ${item.bg}">
        ${item.icon}
      </div>

      <div class="barang-name">
        <strong>${item.nama}</strong>
        <span>Produk · ${item.kategori}</span>
      </div>

      <div class="barang-value">
        <small>Stok</small>
        <strong class="${item.stok <= 10 ? "danger-text" : "safe-text"}">
          ${item.stok} pcs
        </strong>
      </div>

      <div class="barang-value">
        <small>Harga Beli</small>
        <strong>${item.beli}</strong>
      </div>

      <div class="barang-value">
        <small>Harga Jual</small>
        <strong>${item.jual}</strong>
      </div>


      <span class="stock-badge ${item.stok <= 10 ? "danger-badge" : "safe-badge"}">
        ${item.stok <= 10 ? "Stok Menipis" : "Stok Aman"}
      </span>

      <button class="more-btn">•••</button>

    </article>
  `).join("");
}

export function initTotalBarang(){

  const search = document.querySelector("#searchBarang");
  const filter = document.querySelector("#filterKategori");
  const list = document.querySelector("#barangList");

  function updateList(){

    const keyword = search.value.toLowerCase();
    const kategori = filter.value;

    const hasil = barang.filter(item => {

      const cocokNama =
        item.nama.toLowerCase().includes(keyword);

      const cocokKategori =
        kategori === "Semua" ||
        item.kategori === kategori;

      return cocokNama && cocokKategori;

    });

    list.innerHTML = renderBarang(hasil);
  }

  search.addEventListener("input",updateList);
  filter.addEventListener("change",updateList);

}

function updateSummary(){

  const totalBarang =
    document.querySelector("#totalBarangCount");

  const totalStok =
    document.querySelector("#totalStokCount");

  const stokAman =
    document.querySelector("#stokAmanCount");

  const stokMenipis =
    document.querySelector("#stokMenipisCount");

  if(totalBarang){
    totalBarang.textContent = barang.length;
  }

  if(totalStok){
    totalStok.textContent =
      `${hitungTotalStok().toLocaleString("id-ID")} pcs`;
  }

  if(stokAman){
    stokAman.textContent =
      `${hitungStokAman()} barang`;
  }

  if(stokMenipis){
    stokMenipis.textContent =
      `${hitungStokMenipis()} barang`;
  }

}