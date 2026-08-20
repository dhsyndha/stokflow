import "./akun.css";

export function akunPage() {
  return `
    <section class="akun-page">

      <div class="akun-heading">
        <span class="page-label">AKUN</span>
        <h2>Akun</h2>
        <p>Kelola informasi akun dan pengaturan StockFlow.</p>
      </div>

      <div class="akun-profile">
        <div class="akun-avatar">A</div>
        <div class="akun-profile-info">
          <strong>Admin</strong>
          <span class="akun-status"><i></i>Akun aktif</span>
        </div>
        <button class="edit-akun" id="editAkun">✎ Edit Profil</button>
      </div>

      <div class="akun-block">
        <span class="akun-label">INFORMASI AKUN</span>

        <div class="akun-list">
          <div class="akun-row">
            <div class="akun-row-icon">♙</div>
            <div class="akun-row-info">
              <strong>Nama Lengkap</strong>
              <span>Admin</span>
            </div>
            <b>›</b>
          </div>

          <div class="akun-row">
            <div class="akun-row-icon">✉</div>
            <div class="akun-row-info">
              <strong>Email</strong>
              <span>admin@stockflow.com</span>
            </div>
            <b>›</b>
          </div>

          <div class="akun-row">
            <div class="akun-row-icon">♢</div>
            <div class="akun-row-info">
              <strong>Status Akun</strong>
              <span class="status-active">Aktif</span>
            </div>
          </div>

          <div class="akun-row">
            <div class="akun-row-icon">▣</div>
            <div class="akun-row-info">
              <strong>Bergabung Sejak</strong>
              <span>19 Agustus 2026</span>
            </div>
          </div>
        </div>
      </div>

      <div class="akun-block">
        <span class="akun-label">PENGATURAN</span>

        <div class="akun-list">
          <button class="akun-row akun-button" id="pengaturanBtn">
            <div class="akun-row-icon">⚙</div>
            <div class="akun-row-info">
              <strong>Pengaturan</strong>
              <span>Kelola pengaturan dan akun</span>
            </div>
            <b>›</b>
          </button>

          <button class="akun-row akun-button" id="tentangBtn">
            <div class="akun-row-icon">ⓘ</div>
            <div class="akun-row-info">
              <strong>Tentang StockFlow</strong>
              <span>Informasi aplikasi dan fitur</span>
            </div>
            <span class="versi">v1.0.0</span>
            <b>›</b>
          </button>
        </div>
      </div>

      <button class="logout-akun" id="logoutBtn">
        <span>↪</span>
        <div>
          <strong>Keluar</strong>
          <small>Keluar dari akun StockFlow</small>
        </div>
      </button>

      <div class="akun-footer">StockFlow v1.0.0</div>
    </section>
  `;
}

export function initAkun() {
  document.querySelector("#editAkun")?.addEventListener("click", () => {
    tampilkanAkunToast("Edit profil akan tersedia pada versi berikutnya.");
  });

  document.querySelector("#pengaturanBtn")?.addEventListener("click", bukaPengaturan);
  document.querySelector("#tentangBtn")?.addEventListener("click", bukaTentang);
  document.querySelector("#logoutBtn")?.addEventListener("click", bukaLogout);
}

function tampilkanAkunToast(pesan) {
  const oldToast = document.querySelector(".akun-toast");
  oldToast?.remove();

  const toast = document.createElement("div");
  toast.className = "akun-toast";

  toast.innerHTML = `
    <div class="akun-toast-icon">✓</div>
    <div>
      <strong>StockFlow</strong>
      <span>${pesan}</span>
    </div>
    <button type="button">×</button>
  `;

  document.body.appendChild(toast);

  toast.querySelector("button").addEventListener("click", () => {
    toast.remove();
  });

  setTimeout(() => {
    if (!toast.isConnected) return;
    toast.classList.add("hide");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function bukaPengaturan() {
  const modal = document.createElement("div");
  modal.className = "akun-modal-overlay";

  modal.innerHTML = `
    <div class="akun-modal">
      <div class="akun-modal-head">
        <div>
          <span>PENGATURAN</span>
          <h3>Pengaturan Akun</h3>
        </div>
        <button type="button" class="akun-modal-close">×</button>
      </div>

      <div class="pengaturan-item">
        <div>
          <strong>Hapus Akun</strong>
          <span>Menghapus akun dan seluruh data StockFlow.</span>
        </div>
        <button type="button" class="hapus-akun-btn">Hapus Akun</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector(".akun-modal-close").addEventListener("click", () => {
    modal.remove();
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) modal.remove();
  });

  modal.querySelector(".hapus-akun-btn").addEventListener("click", () => {
    bukaKonfirmasiHapus(modal);
  });
}

function bukaKonfirmasiHapus(parentModal) {
  const modal = document.createElement("div");
  modal.className = "akun-modal-overlay";

  modal.innerHTML = `
    <div class="akun-modal akun-confirm">
      <div class="confirm-icon">!</div>
      <h3>Hapus Akun?</h3>
      <p>Akun dan seluruh data StockFlow yang dihapus tidak dapat dipulihkan.</p>

      <div class="confirm-actions">
        <button type="button" class="confirm-batal">Batal</button>
        <button type="button" class="confirm-hapus">Ya, Hapus Akun</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector(".confirm-batal").addEventListener("click", () => {
    modal.remove();
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) modal.remove();
  });

  modal.querySelector(".confirm-hapus").addEventListener("click", () => {
    localStorage.removeItem("stockflowLogin");
    parentModal.remove();
    modal.remove();
    window.location.reload();
  });
}

function bukaTentang() {
  const modal = document.createElement("div");
  modal.className = "akun-modal-overlay";

  modal.innerHTML = `
    <div class="akun-modal tentang-modal">
      <div class="akun-modal-head">
        <div>
          <span>TENTANG APLIKASI</span>
          <h3>Tentang StockFlow</h3>
        </div>
        <button type="button" class="akun-modal-close">×</button>
      </div>

      <div class="tentang-logo">
        <div>S</div>
        <div>
          <strong>StockFlow</strong>
          <span>Manajemen stok</span>
        </div>
      </div>

      <p class="tentang-text">
        StockFlow adalah aplikasi manajemen stok yang dibuat
        untuk membantu mengelola persediaan barang dengan lebih
        mudah, terorganisir, dan efisien.
      </p>

      <p class="tentang-text">
        Aplikasi ini menyediakan fitur untuk mengelola data barang,
        memantau jumlah stok, mencatat barang masuk dan barang
        keluar, serta membantu proses transaksi penjualan.
      </p>

      <div class="tentang-fitur">
        <div>
          <strong>Data Barang</strong>
          <span>Mengelola informasi dan stok setiap barang.</span>
        </div>

        <div>
          <strong>Transaksi</strong>
          <span>Mencatat transaksi penjualan dengan lebih praktis.</span>
        </div>

        <div>
          <strong>Manajemen Stok</strong>
          <span>Memantau stok aman dan stok yang mulai menipis.</span>
        </div>
      </div>

      <div class="tentang-footer">
        StockFlow v1.0.0
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector(".akun-modal-close").addEventListener("click", () => {
    modal.remove();
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) modal.remove();
  });
}

function bukaLogout() {
  const modal = document.createElement("div");
  modal.className = "logout-modal-overlay";

  modal.innerHTML = `
    <div class="logout-modal">
      <div class="logout-icon">↪</div>
      <h3>Keluar dari akun?</h3>
      <p>Kamu akan keluar dari akun StockFlow pada perangkat ini.</p>

      <div class="logout-actions">
        <button type="button" class="logout-cancel">Batal</button>
        <button type="button" class="logout-confirm">Keluar</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector(".logout-cancel").addEventListener("click", () => {
    modal.remove();
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) modal.remove();
  });

  modal.querySelector(".logout-confirm").addEventListener("click", () => {
    localStorage.removeItem("stockflowLogin");
    modal.remove();
    window.location.reload();
  });
}