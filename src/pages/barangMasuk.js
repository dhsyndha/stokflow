import "./barangMasuk.css";

let transaksiMasuk = [
  { nama:"Indomie Goreng", kategori:"Makanan", jumlah:20, tanggal:"19 Agustus 2026", waktu:"09:42", icon:"🍜", bg:"food-bg" },
  { nama:"Aqua Botol 600ml", kategori:"Minuman", jumlah:15, tanggal:"18 Agustus 2026", waktu:"14:20", icon:"💧", bg:"water-bg" },
  { nama:"Beras Premium 5kg", kategori:"Sembako", jumlah:10, tanggal:"18 Agustus 2026", waktu:"10:15", icon:"🍚", bg:"rice-bg" }
];

export function barangMasukPage() {
  return `
    <section class="masuk-page">
      <div class="masuk-heading">
        <button class="back-masuk" id="backMasuk">←</button>
        <div>
          <span class="page-label">TRANSAKSI</span>
          <h2>Barang Masuk</h2>
          <p>Catatan barang yang masuk ke inventori.</p>
        </div>
      </div>

      <div class="masuk-summary">
        <div class="masuk-card primary-masuk">
          <span>Total Masuk</span>
          <strong>${hitungTotal()}</strong>
          <small>Unit bulan ini</small>
        </div>
        <div class="masuk-card">
          <span>Hari Ini</span>
          <strong>8</strong>
          <small>Transaksi</small>
        </div>
        <div class="masuk-card">
          <span>Jenis Barang</span>
          <strong>4</strong>
          <small>Barang</small>
        </div>
      </div>

      <div class="masuk-tools">
        <div class="masuk-search">
          <span>⌕</span>
          <input id="searchMasuk" type="text" placeholder="Cari barang...">
        </div>

        <div class="masuk-filter-row">
          <div class="custom-select" id="filterKategoriSelect">
            <button type="button" class="custom-select-btn">
              <span>Semua Kategori</span>
              <i class="select-arrow"></i>
            </button>
            <div class="custom-options">
              <button type="button" data-value="Semua" class="selected">Semua Kategori</button>
              <button type="button" data-value="Makanan">Makanan</button>
              <button type="button" data-value="Minuman">Minuman</button>
              <button type="button" data-value="Sembako">Sembako</button>
            </div>
            <input type="hidden" id="filterMasuk" value="Semua">
          </div>

          <button type="button" class="btn-tambah-masuk" id="tambahMasuk">
            ＋ Tambah Barang
          </button>
        </div>
      </div>

      <div class="riwayat-heading">
        <div>
          <span>RIWAYAT</span>
          <h3>Barang Masuk Terbaru</h3>
        </div>
        <small id="jumlahTransaksi">${transaksiMasuk.length} transaksi</small>
      </div>

      <div class="masuk-list" id="masukList">
        ${renderTransaksi(transaksiMasuk)}
      </div>
    </section>
  `;
}

function hitungTotal() {
  return transaksiMasuk.reduce((total, item) => total + item.jumlah, 0);
}

function renderTransaksi(data) {
  if (!data.length) {
    return `
      <div class="masuk-empty">
        <strong>Barang tidak ditemukan</strong>
        <span>Coba gunakan kata kunci atau kategori lain.</span>
      </div>
    `;
  }

  return data.map(item => `
    <article class="transaksi-masuk">
      <div class="masuk-image ${item.bg}">${item.icon}</div>
      <div class="masuk-name">
        <strong>${item.nama}</strong>
        <span>${item.kategori}</span>
      </div>
      <div class="masuk-jumlah">
        <small>Jumlah Masuk</small>
        <strong>+${item.jumlah} pcs</strong>
      </div>
      <div class="masuk-date">
        <small>Tanggal</small>
        <strong>${item.tanggal}</strong>
        <span>${item.waktu}</span>
      </div>
      <div class="masuk-status">Barang Masuk</div>
    </article>
  `).join("");
}

function setupDropdown(select, input) {
  const button = select.querySelector(".custom-select-btn");
  const text = button.querySelector("span");
  const options = select.querySelectorAll(".custom-options button");

  button.addEventListener("click", event => {
    event.stopPropagation();
    document.querySelectorAll(".custom-select.open").forEach(item => {
      if (item !== select) item.classList.remove("open");
    });
    select.classList.toggle("open");
  });

  options.forEach(option => {
    option.addEventListener("click", event => {
      event.stopPropagation();
      input.value = option.dataset.value;
      text.textContent = option.textContent.trim();
      options.forEach(item => item.classList.remove("selected"));
      option.classList.add("selected");
      select.classList.remove("open");
      input.dispatchEvent(new Event("change"));
    });
  });
}

document.addEventListener("click", () => {
  document.querySelectorAll(".custom-select.open").forEach(select => {
    select.classList.remove("open");
  });
});

export function initBarangMasuk() {
  const search = document.querySelector("#searchMasuk");
  const filter = document.querySelector("#filterMasuk");
  const list = document.querySelector("#masukList");
  const tambah = document.querySelector("#tambahMasuk");
  const filterSelect = document.querySelector("#filterKategoriSelect");

  setupDropdown(filterSelect, filter);

  function updateList() {
    const keyword = search.value.toLowerCase().trim();
    const kategori = filter.value;

    const hasil = transaksiMasuk.filter(item => {
      const cocokNama = item.nama.toLowerCase().includes(keyword);
      const cocokKategori = kategori === "Semua" || item.kategori === kategori;
      return cocokNama && cocokKategori;
    });

    list.innerHTML = renderTransaksi(hasil);

    const jumlah = document.querySelector("#jumlahTransaksi");
    if (jumlah) jumlah.textContent = `${hasil.length} transaksi`;
  }

  search.addEventListener("input", updateList);
  filter.addEventListener("change", updateList);

  tambah.addEventListener("click", () => {
    const modal = document.createElement("div");
    modal.className = "modal-overlay";

    modal.innerHTML = `
      <div class="barang-modal">
        <div class="modal-head">
          <div>
            <span>TAMBAH TRANSAKSI</span>
            <h3>Barang Masuk</h3>
          </div>
          <button type="button" class="modal-close">×</button>
        </div>

        <div class="form-grid">
          <label>
            Nama Barang
            <input id="formNama" type="text" placeholder="Contoh: Indomie Goreng">
          </label>

          <label>
            Kategori
            <div class="custom-select" id="modalKategoriSelect">
              <button type="button" class="custom-select-btn">
                <span>Pilih kategori</span>
                <i class="select-arrow"></i>
              </button>
              <div class="custom-options">
                <button type="button" data-value="Makanan">Makanan</button>
                <button type="button" data-value="Minuman">Minuman</button>
                <button type="button" data-value="Sembako">Sembako</button>
              </div>
              <input type="hidden" id="formKategori" value="">
            </div>
          </label>

          <label>
            Jumlah Masuk
            <input id="formJumlah" type="number" min="1" placeholder="0">
          </label>

          <label>
            Harga Beli
            <input id="formBeli" type="number" min="0" placeholder="0">
          </label>

          <label>
            Harga Jual
            <input id="formJual" type="number" min="0" placeholder="0">
          </label>
        </div>

        <div class="modal-actions">
          <button type="button" class="cancel-btn">Batal</button>
          <button type="button" class="save-btn">Simpan Barang</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    setupDropdown(
      modal.querySelector("#modalKategoriSelect"),
      modal.querySelector("#formKategori")
    );

    const closeModal = () => modal.remove();

    modal.querySelector(".modal-close").addEventListener("click", closeModal);
    modal.querySelector(".cancel-btn").addEventListener("click", closeModal);

    modal.addEventListener("click", event => {
      if (event.target === modal) closeModal();
    });

    modal.querySelector(".save-btn").addEventListener("click", () => {
      const nama = modal.querySelector("#formNama").value.trim();
      const kategori = modal.querySelector("#formKategori").value;
      const jumlah = Number(modal.querySelector("#formJumlah").value);
      const beli = Number(modal.querySelector("#formBeli").value);
      const jual = Number(modal.querySelector("#formJual").value);

      if (!nama || !kategori || jumlah <= 0 || beli <= 0 || jual <= 0) {
        alert("Lengkapi semua data terlebih dahulu.");
        return;
      }

      const sekarang = new Date();
      const tanggal = sekarang.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      });
      const waktu = sekarang.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit"
      });

      let icon = "📦";
      let bg = "food-bg";

      if (kategori === "Makanan") {
        icon = "🍜";
        bg = "food-bg";
      } else if (kategori === "Minuman") {
        icon = "💧";
        bg = "water-bg";
      } else if (kategori === "Sembako") {
        icon = "🍚";
        bg = "rice-bg";
      }

      transaksiMasuk.unshift({
        nama,
        kategori,
        jumlah,
        tanggal,
        waktu,
        icon,
        bg,
        beli,
        jual
      });

      closeModal();
      updateList();

      const total = document.querySelector(".primary-masuk strong");
      if (total) total.textContent = hitungTotal();

      const jumlahTransaksi = document.querySelector("#jumlahTransaksi");
      if (jumlahTransaksi) {
        jumlahTransaksi.textContent = `${transaksiMasuk.length} transaksi`;
      }
    });
  });
}