import "./transaksi.css";

const barang = [
  { id: 1, nama: "Indomie Goreng", kategori: "Makanan", harga: 3000, stok: 120, icon: "🍜" },
  { id: 2, nama: "Aqua 600ml", kategori: "Minuman", harga: 4000, stok: 80, icon: "💧" },
  { id: 3, nama: "Teh Botol Sosro", kategori: "Minuman", harga: 3000, stok: 8, icon: "🧃" },
  { id: 4, nama: "Beras Premium 5kg", kategori: "Sembako", harga: 70000, stok: 30, icon: "🍚" },
  { id: 5, nama: "Gula Pasir 1kg", kategori: "Sembako", harga: 13000, stok: 45, icon: "🛍️" },
  { id: 6, nama: "Tepung Terigu 1kg", kategori: "Sembako", harga: 12000, stok: 25, icon: "🌾" },
  { id: 7, nama: "Minyak Goreng 1L", kategori: "Sembako", harga: 16000, stok: 35, icon: "🫗" },
  { id: 8, nama: "Susu Ultra 250ml", kategori: "Minuman", harga: 6000, stok: 20, icon: "🥛" }
];

let keranjang = [];

const rupiah = angka => `Rp ${angka.toLocaleString("id-ID")}`;

export function transaksiPage() {
  return `
    <section class="transaksi-page">

      <div class="transaksi-heading">
        <span class="page-label">TRANSAKSI</span>
        <h2>Kasir</h2>
        <p>Buat transaksi penjualan dengan cepat.</p>
      </div>

      <div class="kasir-layout">

        <div class="produk-panel">

          <div class="panel-heading">
            <div>
              <span>PRODUK</span>
              <h3>Pilih Barang</h3>
            </div>
          </div>

          <div class="kasir-search">
            <span>⌕</span>
            <input id="searchKasir" type="text" placeholder="Cari barang...">
          </div>

          <div class="kategori-kasir" id="kategoriKasir">
            <button class="kategori-btn active" data-kategori="Semua">Semua</button>
            <button class="kategori-btn" data-kategori="Makanan">Makanan</button>
            <button class="kategori-btn" data-kategori="Minuman">Minuman</button>
            <button class="kategori-btn" data-kategori="Sembako">Sembako</button>
          </div>

          <div class="produk-grid" id="produkGrid">
            ${renderProduk(barang)}
          </div>

          <div class="kasir-hint">
            Klik barang untuk menambahkan ke keranjang
          </div>

        </div>
        <div class="keranjang-panel">
          <div class="keranjang-head">
            <div>
              <span>TRANSAKSI</span>
              <h3>Keranjang</h3>
            </div>

            <button id="hapusSemua" class="hapus-semua">
              Hapus Semua
            </button>
          </div>

          <div class="keranjang-list" id="keranjangList">
            ${renderKeranjang()}
          </div>

          <div class="pembayaran">

            <div class="total-row">
              <span>Subtotal</span>
              <strong id="subtotal">Rp 0</strong>
            </div>

            <div class="total-row">
              <span>Diskon</span>
              <input id="diskon" type="number" min="0" value="0">
            </div>

            <div class="total-row total-final">
              <span>Total</span>
              <strong id="total">Rp 0</strong>
            </div>

            <button class="bayar-btn" id="bayarBtn">
              BAYAR SEKARANG
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderProduk(data) {
  if (!data.length) {
    return `
      <div class="produk-empty">
        <strong>Barang tidak ditemukan</strong>
        <span>Coba cari barang lain.</span>
      </div>
    `;
  }

  return data.map(item => `
    <button class="produk-card" data-id="${item.id}">
      <div class="produk-icon">${item.icon}</div>
      <strong>${item.nama}</strong>
      <span class="produk-harga">${rupiah(item.harga)}</span>
      <small class="${item.stok <= 10 ? "stok-danger" : "stok-safe"}">
        Stok: ${item.stok}
      </small>
    </button>
  `).join("");
}

function renderKeranjang() {
  if (!keranjang.length) {
    return `
      <div class="keranjang-empty">
        <div>🛒</div>
        <strong>Keranjang masih kosong</strong>
        <span>Pilih barang untuk memulai transaksi.</span>
      </div>
    `;
  }

  return keranjang.map(item => `
    <div class="keranjang-item">

      <div class="keranjang-icon">${item.icon}</div>

      <div class="keranjang-info">
        <strong>${item.nama}</strong>
        <span>${rupiah(item.harga)}</span>
      </div>

      <div class="jumlah-control">
        <button class="kurang-btn" data-id="${item.id}">−</button>
        <strong>${item.jumlah}</strong>
        <button class="tambah-btn" data-id="${item.id}">+</button>
      </div>

      <strong class="item-subtotal">
        ${rupiah(item.harga * item.jumlah)}
      </strong>

      <button class="hapus-item" data-id="${item.id}">
        ×
      </button>

    </div>
  `).join("");
}

function hitungTotal() {
  const subtotal = keranjang.reduce(
    (total, item) => total + item.harga * item.jumlah,
    0
  );

  const diskon = Number(
    document.querySelector("#diskon")?.value || 0
  );

  return {
    subtotal,
    total: Math.max(0, subtotal - diskon)
  };
}

function updateKeranjang() {
  const list = document.querySelector("#keranjangList");
  if (!list) return;

  const { subtotal, total } = hitungTotal();

  list.innerHTML = renderKeranjang();

  document.querySelector("#subtotal").textContent = rupiah(subtotal);
  document.querySelector("#total").textContent = rupiah(total);

  initKeranjangEvents();
}

function tambahKeKeranjang(id) {
  const produk = barang.find(item => item.id === id);
  if (!produk) return;

  const existing = keranjang.find(item => item.id === id);

  if (existing) {
    if (existing.jumlah < produk.stok) {
      existing.jumlah++;
    }
  } else {
    keranjang.push({
      ...produk,
      jumlah: 1
    });
  }

  updateKeranjang();
}

function initKeranjangEvents() {
  document.querySelectorAll(".kurang-btn").forEach(button => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);
      const item = keranjang.find(item => item.id === id);

      if (!item) return;

      item.jumlah--;

      if (item.jumlah <= 0) {
        keranjang = keranjang.filter(item => item.id !== id);
      }

      updateKeranjang();
    });
  });

  document.querySelectorAll(".tambah-btn").forEach(button => {
    button.addEventListener("click", () => {
      tambahKeKeranjang(Number(button.dataset.id));
    });
  });

  document.querySelectorAll(".hapus-item").forEach(button => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);

      keranjang = keranjang.filter(
        item => item.id !== id
      );

      updateKeranjang();
    });
  });
}

function bukaPopupPembayaran() {
  if (!keranjang.length) {
    tampilkanToast("Pilih barang terlebih dahulu.");
    return;
  }

  const { total } = hitungTotal();

  const modal = document.createElement("div");
  modal.className = "payment-overlay";

  modal.innerHTML = `
    <div class="payment-modal">

      <div class="payment-head">
        <div>
          <span>PEMBAYARAN</span>
          <h3>Pilih Pembayaran</h3>
        </div>

        <button class="payment-close">×</button>
      </div>

      <div class="payment-total">
        <span>Total Pembayaran</span>
        <strong>${rupiah(total)}</strong>
      </div>

      <div class="payment-label">
        PILIH METODE PEMBAYARAN
      </div>

      <div class="payment-methods">

        <button class="payment-method active" data-method="Tunai">
          <div class="payment-method-icon">💵</div>
          <div>
            <strong>Tunai</strong>
            <span>Bayar menggunakan uang tunai</span>
          </div>
          <i>›</i>
        </button>

        <button class="payment-method" data-method="QRIS">
          <div class="payment-method-icon">▦</div>
          <div>
            <strong>QRIS</strong>
            <span>Scan QR untuk pembayaran</span>
          </div>
          <i>›</i>
        </button>

        <button class="payment-method" data-method="Transfer">
          <div class="payment-method-icon">🏦</div>
          <div>
            <strong>Transfer Bank</strong>
            <span>Transfer ke rekening toko</span>
          </div>
          <i>›</i>
        </button>

        <button class="payment-method" data-method="E-Wallet">
          <div class="payment-method-icon">👛</div>
          <div>
            <strong>E-Wallet</strong>
            <span>GoPay, DANA, OVO, dan lainnya</span>
          </div>
          <i>›</i>
        </button>

      </div>

      <div class="payment-detail" id="paymentDetail">
        ${renderTunai(total)}
      </div>

    </div>
  `;

  document.body.appendChild(modal);

  const close = () => modal.remove();

  modal.querySelector(".payment-close")
    .addEventListener("click", close);

  modal.addEventListener("click", event => {
    if (event.target === modal) {
      close();
    }
  });

  modal.querySelectorAll(".payment-method").forEach(button => {
    button.addEventListener("click", () => {

      modal.querySelectorAll(".payment-method")
        .forEach(item => item.classList.remove("active"));

      button.classList.add("active");

      const method = button.dataset.method;
      const detail = modal.querySelector("#paymentDetail");

      if (method === "Tunai") {
        detail.innerHTML = renderTunai(total);
        initTunai(modal, total);
      }

      if (method === "QRIS") {
        detail.innerHTML = renderQRIS(total);
        initNonTunai(modal, total, "QRIS");
      }

      if (method === "Transfer") {
        detail.innerHTML = renderTransfer(total);
        initNonTunai(modal, total, "Transfer Bank");
      }

      if (method === "E-Wallet") {
        detail.innerHTML = renderEWallet(total);
        initEWallet(modal, total);
      }
    });
  });

  initTunai(modal, total);
}

function renderTunai(total) {
  return `
    <div class="payment-cash">

      <div class="payment-detail-title">
        Tunai
      </div>

      <label>
        Uang Dibayar
        <input
          id="uangDibayar"
          type="number"
          min="0"
          placeholder="Rp 0"
        >
      </label>

      <div class="kembalian-box">
        <span>Kembalian</span>
        <strong id="popupKembalian">Rp 0</strong>
      </div>

      <button class="lanjut-bayar" id="lanjutBayar">
        LANJUTKAN PEMBAYARAN
      </button>

    </div>
  `;
}

function renderQRIS(total) {
  return `
    <div class="payment-detail-box qris-payment">

      <div class="payment-detail-title">
        QRIS
      </div>

      <span class="payment-detail-desc">
        Scan kode QR menggunakan aplikasi pembayaran.
      </span>

      <div class="qris-code">
        <div class="fake-qr">
          <span>▦</span>
        </div>
      </div>

      <div class="payment-detail-total">
        <span>Total Pembayaran</span>
        <strong>${rupiah(total)}</strong>
      </div>

      <button class="lanjut-bayar" id="lanjutBayar">
        SAYA SUDAH MEMBAYAR
      </button>

    </div>
  `;
}


function renderTransfer(total) {
  return `
    <div class="payment-detail-box">

      <div class="payment-detail-title">
        Transfer Bank
      </div>

      <span class="payment-detail-desc">
        Transfer sesuai nominal ke rekening berikut.
      </span>

      <div class="bank-card">

        <span>Bank BCA</span>

        <strong>1234567890</strong>

        <small>
          a.n. StockFlow
        </small>

      </div>

      <div class="payment-detail-total">
        <span>Total Pembayaran</span>
        <strong>${rupiah(total)}</strong>
      </div>

      <button class="lanjut-bayar" id="lanjutBayar">
        SAYA SUDAH TRANSFER
      </button>

    </div>
  `;
}


function renderEWallet(total) {
  return `
    <div class="payment-detail-box">

      <div class="payment-detail-title">
        E-Wallet
      </div>

      <span class="payment-detail-desc">
        Pilih e-wallet yang digunakan.
      </span>

      <div class="ewallet-list">

        <button
          class="ewallet-item"
          data-wallet="GoPay"
        >
          <div>G</div>
          <strong>GoPay</strong>
        </button>

        <button
          class="ewallet-item"
          data-wallet="DANA"
        >
          <div>D</div>
          <strong>DANA</strong>
        </button>

        <button
          class="ewallet-item"
          data-wallet="OVO"
        >
          <div>O</div>
          <strong>OVO</strong>
        </button>

        <button
          class="ewallet-item"
          data-wallet="ShopeePay"
        >
          <div>S</div>
          <strong>ShopeePay</strong>
        </button>

      </div>

      <div class="payment-detail-total">
        <span>Total Pembayaran</span>
        <strong>${rupiah(total)}</strong>
      </div>

      <button
        class="lanjut-bayar"
        id="lanjutBayar"
        disabled
      >
        KONFIRMASI PEMBAYARAN
      </button>

    </div>
  `;
}

function initNonTunai(modal, total, metode) {
  const button = modal.querySelector("#lanjutBayar");

  if (!button) return;

  button.addEventListener("click", () => {
    transaksiBerhasil(modal, 0, metode);
  });
}


function initEWallet(modal, total) {
  const wallets = modal.querySelectorAll(".ewallet-item");
  const button = modal.querySelector("#lanjutBayar");

  let selectedWallet = "";

  wallets.forEach(wallet => {
    wallet.addEventListener("click", () => {

      wallets.forEach(item => {
        item.classList.remove("selected");
      });

      wallet.classList.add("selected");

      selectedWallet = wallet.dataset.wallet;

      button.disabled = false;
    });
  });

  button.addEventListener("click", () => {

    if (!selectedWallet) return;

    transaksiBerhasil(
      modal,
      0,
      selectedWallet
    );
  });
}

function initTunai(modal, total) {
  const input = modal.querySelector("#uangDibayar");
  const kembalian = modal.querySelector("#popupKembalian");
  const lanjut = modal.querySelector("#lanjutBayar");

  if (!input || !kembalian || !lanjut) return;

  input.addEventListener("input", () => {
    const bayar = Number(input.value || 0);

    const hasil = Math.max(
      0,
      bayar - total
    );

    kembalian.textContent = rupiah(hasil);

    if (bayar >= total) {
      lanjut.disabled = false;
    } else {
      lanjut.disabled = true;
    }
  });

  lanjut.disabled = true;

  lanjut.addEventListener("click", () => {

    const bayar = Number(input.value || 0);

    if (bayar < total) return;

    transaksiBerhasil(
      modal,
      bayar - total,
      "Tunai"
    );
  });
}

function transaksiBerhasil( modal, kembalian = 0, metode = "Tunai") {
  modal.querySelector(".payment-modal").innerHTML = `
    <div class="success-payment">

      <div class="success-icon">
        ✓
      </div>

      <span>TRANSAKSI SELESAI</span>

      <h3>Pembayaran Berhasil</h3>

      <p>
        Transaksi berhasil disimpan.
      </p>

      <div class="success-detail">

        <div>
          <span>Metode Pembayaran</span>
          <strong>${metode}</strong>
        </div>

        ${
          kembalian > 0
            ? `
              <div>
                <span>Kembalian</span>
                <strong>${rupiah(kembalian)}</strong>
              </div>
            `
            : ""
        }

        <div>
          <span>Status</span>
          <strong class="success-text">
            Berhasil
          </strong>
        </div>

      </div>

      <button
        class="lanjut-bayar"
        id="selesaiBayar"
      >
        SELESAI
      </button>

    </div>
  `;

  modal.querySelector("#selesaiBayar")
    .addEventListener("click", () => {

      modal.remove();

      keranjang = [];

      updateKeranjang();
    });
}

function tampilkanToast(pesan) {
  const toast = document.createElement("div");
  toast.className = "kasir-toast";

  toast.innerHTML = `
    <div class="toast-icon">!</div>
    <div class="toast-content">
      <strong>Belum ada barang</strong>
      <span>${pesan}</span>
    </div>
    <button class="toast-close">×</button>
  `;

  document.body.appendChild(toast);

  const tutup = () => toast.remove();

  toast.querySelector(".toast-close")
    .addEventListener("click", tutup);

  setTimeout(() => {
    toast.classList.add("toast-hide");

    setTimeout(tutup, 300);
  }, 3000);
}

export function initTransaksi() {
  const search = document.querySelector("#searchKasir");
  const produkGrid = document.querySelector("#produkGrid");
  const kategori = document.querySelector("#kategoriKasir");
  const hapusSemua = document.querySelector("#hapusSemua");
  const diskon = document.querySelector("#diskon");
  const bayarBtn = document.querySelector("#bayarBtn");

  function initProdukEvents() {
    document.querySelectorAll(".produk-card").forEach(card => {
      card.addEventListener("click", () => {
        tambahKeKeranjang(Number(card.dataset.id));
      });
    });
  }

  function filterProduk() {
    const keyword = search.value.toLowerCase();

    const activeKategori =
      kategori.querySelector(".active")?.dataset.kategori || "Semua";

    const hasil = barang.filter(item => {
      const cocokNama =
        item.nama.toLowerCase().includes(keyword);

      const cocokKategori =
        activeKategori === "Semua" ||
        item.kategori === activeKategori;

      return cocokNama && cocokKategori;
    });

    produkGrid.innerHTML = renderProduk(hasil);
    initProdukEvents();
  }

  search.addEventListener("input", filterProduk);

  kategori.querySelectorAll(".kategori-btn").forEach(button => {
    button.addEventListener("click", () => {

      kategori.querySelectorAll(".kategori-btn")
        .forEach(btn => btn.classList.remove("active"));

      button.classList.add("active");

      filterProduk();
    });
  });

  hapusSemua.addEventListener("click", () => {
    keranjang = [];
    updateKeranjang();
  });

  diskon.addEventListener("input", updateKeranjang);

  bayarBtn.addEventListener("click", bukaPopupPembayaran);

  initProdukEvents();
  initKeranjangEvents();
}