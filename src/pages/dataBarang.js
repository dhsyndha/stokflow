import "./dataBarang.css";

const dataBarang = [
  {
    nama:"Indomie Goreng",
    kategori:"Makanan",
    stok:120,
    jual:"Rp 3.000",
    icon:"🍜",
    bg:"food-bg"
  },
  {
    nama:"Aqua 600ml",
    kategori:"Minuman",
    stok:80,
    jual:"Rp 4.000",
    icon:"💧",
    bg:"water-bg"
  },
  {
    nama:"Teh Botol Sosro",
    kategori:"Minuman",
    stok:8,
    jual:"Rp 3.000",
    icon:"🧃",
    bg:"tea-bg"
  },
  {
    nama:"Beras Premium 5kg",
    kategori:"Sembako",
    stok:30,
    jual:"Rp 70.000",
    icon:"🍚",
    bg:"rice-bg"
  }
];

export function dataBarangPage(){
  return `
    <section class="data-page">

      <div class="data-heading">
        <button class="back-data" id="backData">←</button>

        <div>
          <span>INVENTORI</span>
          <h2>Data Barang</h2>
          <p>Seluruh barang yang tersedia di dalam inventori.</p>
        </div>
      </div>

      <div class="data-tools">
        <div class="data-search">
          <span>⌕</span>
          <input id="dataSearch" type="text" placeholder="Cari nama barang...">
        </div>

        <select id="dataFilter">
          <option value="Semua">Semua Kategori</option>
          <option value="Makanan">Makanan</option>
          <option value="Minuman">Minuman</option>
          <option value="Sembako">Sembako</option>
        </select>
      </div>

      <div class="data-list" id="dataList">
        ${renderData(dataBarang)}
      </div>

    </section>
  `;
}

function renderData(data){
  if(!data.length){
    return `
      <div class="data-empty">
        <div>⌕</div>
        <strong>Barang tidak ditemukan</strong>
        <span>Coba gunakan kata kunci lain.</span>
      </div>
    `;
  }

  return data.map(item => `
    <article class="data-item">

      <div class="data-image ${item.bg}">
        ${item.icon}
      </div>

      <div class="data-name">
        <strong>${item.nama}</strong>
        <span>${item.kategori}</span>
      </div>

      <div class="data-stock">
        <small>Stok</small>
        <strong class="${item.stok <= 10 ? "data-danger" : "data-safe"}">
          ${item.stok}
        </strong>
      </div>

      <div class="data-price">
        <small>Harga Jual</small>
        <strong>${item.jual}</strong>
      </div>

      <span class="data-status ${item.stok <= 10 ? "status-danger" : "status-safe"}">
        ${item.stok <= 10 ? "Stok Menipis" : "Stok Aman"}
      </span>

    </article>
  `).join("");
}

export function initDataBarang(){
  const search = document.querySelector("#dataSearch");
  const filter = document.querySelector("#dataFilter");
  const list = document.querySelector("#dataList");

  function updateData(){
    const keyword = search.value.toLowerCase();
    const kategori = filter.value;

    const hasil = dataBarang.filter(item => {
      const cocokNama = item.nama.toLowerCase().includes(keyword);
      const cocokKategori =
        kategori === "Semua" || item.kategori === kategori;

      return cocokNama && cocokKategori;
    });

    list.innerHTML = renderData(hasil);
  }

  search.addEventListener("input",updateData);
  filter.addEventListener("change",updateData);
}