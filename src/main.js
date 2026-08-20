import "./style.css";
import { totalBarangPage, initTotalBarang } from "./pages/totalBarang.js";
import { dataBarangPage, initDataBarang } from "./pages/dataBarang.js";
import { barangMasukPage, initBarangMasuk } from "./pages/barangMasuk.js";
import { barangKeluarPage, initBarangKeluar } from "./pages/barangKeluar.js";
import { transaksiPage, initTransaksi } from "./pages/transaksi.js";
import { akunPage, initAkun } from "./pages/akun.js";
import { loginPage, initLogin } from "./pages/login.js";
const app = document.querySelector("#app");

const pages = {
  home: renderHome,
  totalBarang: renderTotalBarang,
  dataBarang: renderDataBarang,
  barangMasuk: renderBarangMasuk,
  barangKeluar: renderBarangKeluar,
  transaksi: renderTransaksi,
  akun: renderAkun
};

function renderLogin() {
  app.innerHTML = loginPage();

  initLogin(() => {
    renderHome();
  });
}

function navigate(page) {
  if (!pages[page]) return;

  history.pushState(
    { page },
    "",
    window.location.pathname + window.location.search
  );

  pages[page]();
}

window.addEventListener("popstate", event => {
  const page = event.state?.page || "home";

  if (pages[page]) {
    pages[page]();
  } else {
    renderHome();
  }
});

function layout(content, active = "home") {
  app.innerHTML = `
    <div class="app">
      <header class="top">
        <div class="brand">
          <div class="brand-mark">S</div>

          <div>
            <h1>Stock<span>Flow</span></h1>
            <p>Manajemen stok</p>
          </div>
        </div>

        <div class="top-right">
          <button class="icon-btn">⌕</button>
          <div class="avatar">A</div>
        </div>
      </header>

      <main class="content">
        ${content}
      </main>

      <nav class="bottom-nav">
        <button
          class="nav-item ${active === "home" ? "active" : ""}"
          data-page="home"
        >
          <span>⌂</span>
          <small>Home</small>
        </button>

        <button
          class="nav-item ${active === "transaksi" ? "active" : ""}"
          data-page="transaksi"
        >
          <span>⇄</span>
          <small>Transaksi</small>
        </button>

        <button
          class="nav-item ${active === "akun" ? "active" : ""}"
          data-page="akun"
        >
          <span>♙</span>
          <small>Akun</small>
        </button>
      </nav>
    </div>
  `;

  document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => {
      const page = item.dataset.page;

      if (page === active) return;

      navigate(page);
    });
  });
}

function renderHome() {
  layout(`
    <section class="welcome">
      <div>
        <span class="label">RINGKASAN STOK</span>
        <h2>Halo, Admin <span>👋</span></h2>
        <p>Kelola persediaan barang dengan lebih mudah dan terorganisir.</p>
      </div>

      <div class="welcome-orb"></div>
    </section>

    <section class="overview">
      <button class="overview-card primary" id="totalBarangBtn">
        <div class="card-icon">▣</div>
        <span>Total Barang</span>
        <strong>24</strong>
        <small>Barang terdaftar</small>
      </button>

      <button class="overview-card success" id="barangMasukBtn">
        <div class="card-icon">↓</div>
        <span>Barang Masuk</span>
        <strong>45</strong>
        <small>Bulan ini</small>
      </button>

      <button class="overview-card warning" id="barangKeluarBtn">
        <div class="card-icon">↑</div>
        <span>Barang Keluar</span>
        <strong>32</strong>
        <small>Bulan ini</small>
      </button>
    </section>

    <section class="section-title">
      <div>
        <span>INVENTORI</span>
        <h3>Ringkasan Barang</h3>
      </div>

      <button id="lihatSemuaBarang">
        Lihat semua
      </button>
    </section>

    <section class="products">
      <article class="product">
        <div class="product-symbol">🍜</div>

        <div class="product-info">
          <strong>Indomie Goreng</strong>
          <span>Makanan</span>
        </div>

        <div class="product-detail">
          <small>Stok</small>
          <strong class="safe">120</strong>
        </div>

        <div class="product-detail product-price">
          <small>Harga Jual</small>
          <strong>Rp 3.000</strong>
        </div>
      </article>

      <article class="product">
        <div class="product-symbol">💧</div>

        <div class="product-info">
          <strong>Aqua 600ml</strong>
          <span>Minuman</span>
        </div>

        <div class="product-detail">
          <small>Stok</small>
          <strong class="safe">80</strong>
        </div>

        <div class="product-detail product-price">
          <small>Harga Jual</small>
          <strong>Rp 4.000</strong>
        </div>
      </article>

      <article class="product">
        <div class="product-symbol">🧃</div>

        <div class="product-info">
          <strong>Teh Botol Sosro</strong>
          <span>Minuman</span>
        </div>

        <div class="product-detail">
          <small>Stok</small>
          <strong class="danger">8</strong>
        </div>

        <div class="product-detail product-price">
          <small>Harga Jual</small>
          <strong>Rp 3.000</strong>
        </div>
      </article>

      <article class="product">
        <div class="product-symbol">🍚</div>

        <div class="product-info">
          <strong>Beras Premium 5kg</strong>
          <span>Sembako</span>
        </div>

        <div class="product-detail">
          <small>Stok</small>
          <strong class="safe">30</strong>
        </div>

        <div class="product-detail product-price">
          <small>Harga Jual</small>
          <strong>Rp 70.000</strong>
        </div>
      </article>
    </section>

    <section class="stock-summary">
      <div class="stock-summary-head">
        <div>
          <span>STATUS</span>
          <h3>Kondisi Stok</h3>
        </div>

        <div class="status-dot"></div>
      </div>

      <button
        class="status-row status-clickable"
        id="stokMenipisBtn"
      >
        <div class="status-icon danger-icon">!</div>

        <div class="status-text">
          <strong>Stok Menipis</strong>
          <small>Perlu segera diperiksa</small>
        </div>

        <b>3</b>
      </button>

      <button
        class="status-row status-clickable"
        id="stokAmanBtn"
      >
        <div class="status-icon safe-icon">✓</div>

        <div class="status-text">
          <strong>Stok Aman</strong>
          <small>Jumlah masih aman</small>
        </div>

        <b>21</b>
      </button>

      <div
        class="status-products"
        id="statusProducts"
      ></div>
    </section>
  `);

  document
    .querySelector("#totalBarangBtn")
    .addEventListener("click", () => {
      navigate("totalBarang");
    });

  document
    .querySelector("#lihatSemuaBarang")
    .addEventListener("click", () => {
      navigate("dataBarang");
    });

  document
    .querySelector("#barangMasukBtn")
    .addEventListener("click", () => {
      navigate("barangMasuk");
    });

  document
    .querySelector("#barangKeluarBtn")
    .addEventListener("click", () => {
      navigate("barangKeluar");
    });

  const stokMenipisBtn =
    document.querySelector("#stokMenipisBtn");

  const stokAmanBtn =
    document.querySelector("#stokAmanBtn");

  const statusProducts =
    document.querySelector("#statusProducts");

  const barang = [
    {
      nama: "Indomie Goreng",
      kategori: "Makanan",
      stok: 120,
      harga: "Rp 3.000",
      icon: "🍜"
    },
    {
      nama: "Aqua 600ml",
      kategori: "Minuman",
      stok: 80,
      harga: "Rp 4.000",
      icon: "💧"
    },
    {
      nama: "Teh Botol Sosro",
      kategori: "Minuman",
      stok: 8,
      harga: "Rp 3.000",
      icon: "🧃"
    },
    {
      nama: "Beras Premium 5kg",
      kategori: "Sembako",
      stok: 30,
      harga: "Rp 70.000",
      icon: "🍚"
    }
  ];

  function tampilkanStatus(jenis) {
    const hasil =
      jenis === "menipis"
        ? barang.filter(item => item.stok <= 10)
        : barang.filter(item => item.stok > 10);

    const aktif =
      statusProducts.dataset.active === jenis;

    if (aktif) {
      statusProducts.innerHTML = "";
      statusProducts.dataset.active = "";
      return;
    }

    statusProducts.dataset.active = jenis;

    statusProducts.innerHTML = `
      <div class="status-products-head">
        <span>
          ${
            jenis === "menipis"
              ? "PERLU DIPERHATIKAN"
              : "KONDISI AMAN"
          }
        </span>

        <strong>${hasil.length} barang</strong>
      </div>

      <div class="status-products-list">
        ${hasil
          .map(
            item => `
              <div class="status-product">
                <div class="status-product-icon">
                  ${item.icon}
                </div>

                <div class="status-product-info">
                  <strong>${item.nama}</strong>
                  <span>${item.kategori}</span>
                </div>

                <div class="status-product-stock">
                  <small>Stok</small>

                  <strong
                    class="${
                      jenis === "menipis"
                        ? "danger"
                        : "safe"
                    }"
                  >
                    ${item.stok} pcs
                  </strong>
                </div>

                <div class="status-product-price">
                  <small>Harga Jual</small>
                  <strong>${item.harga}</strong>
                </div>
              </div>
            `
          )
          .join("")}
      </div>
    `;
  }

  stokMenipisBtn.addEventListener("click", () => {
    tampilkanStatus("menipis");
  });

  stokAmanBtn.addEventListener("click", () => {
    tampilkanStatus("aman");
  });
}

function renderTotalBarang() {
  layout(`
    ${totalBarangPage()}
  `, "home");

  document
    .querySelector(".back-home")
    ?.addEventListener("click", () => {
      history.back();
    });

  initTotalBarang();
}

function renderDataBarang() {
  layout(`
    ${dataBarangPage()}
  `, "home");

  document
    .querySelector("#backData")
    ?.addEventListener("click", () => {
      history.back();
    });

  initDataBarang();
}

function renderBarangMasuk() {
  layout(`
    ${barangMasukPage()}
  `, "home");

  document
    .querySelector("#backMasuk")
    ?.addEventListener("click", () => {
      history.back();
    });

  initBarangMasuk();
}

function renderBarangKeluar() {
  layout(`
    ${barangKeluarPage()}
  `, "home");

  document
    .querySelector("#backKeluar")
    ?.addEventListener("click", () => {
      history.back();
    });

  initBarangKeluar();
}

function renderTransaksi() {
  layout(`
    ${transaksiPage()}
  `, "transaksi");

  initTransaksi();
}

function renderAkun() {
  layout(`
    ${akunPage()}
  `, "akun");

  initAkun();
}

const demoMode =
  window.location.search.includes("demo=true");

const sudahLogin =
  localStorage.getItem("stockflowLogin") === "true";

if (demoMode) {
  renderHome();
} else if (sudahLogin) {
  renderHome();
} else {
  renderLogin();
}