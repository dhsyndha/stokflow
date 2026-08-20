import "./login.css";

export function loginPage() {
  return `
    <section class="login-page">
      <div class="login-glow login-glow-one"></div>
      <div class="login-glow login-glow-two"></div>

      <div class="login-card">
        <div class="login-brand">
          <div class="login-logo">S</div>
          <div>
            <h1>Stock<span>Flow</span></h1>
            <p>Manajemen stok</p>
          </div>
        </div>

        <div class="login-heading">
          <span>SELAMAT DATANG</span>
          <h2>Masuk ke akun</h2>
          <p>Kelola stok dan transaksi dengan lebih mudah.</p>
        </div>

        <form id="loginForm">
          <label class="login-field">
            <span>Email</span>
            <div class="login-input">
              <span>✉</span>
              <input
                id="loginEmail"
                type="email"
                placeholder="Masukkan email"
                autocomplete="email"
              />
            </div>
          </label>

          <label class="login-field">
            <span>Password</span>
            <div class="login-input">
              <span>●</span>
              <input
                id="loginPassword"
                type="password"
                placeholder="Masukkan password"
                autocomplete="current-password"
              />
              <button type="button" class="show-password" id="showPassword">◉</button>
            </div>
          </label>

          <div class="login-options">
            <label>
              <input type="checkbox" id="rememberLogin" />
              <span>Ingat saya</span>
            </label>
            <button type="button" id="forgotPassword">Lupa password?</button>
          </div>

          <button type="submit" class="login-button">Masuk</button>
        </form>

        <div class="login-footer">
          <span>StockFlow v1.0.0</span>
        </div>
      </div>
    </section>
  `;
}

export function initLogin(onSuccess) {
  const form = document.querySelector("#loginForm");
  const password = document.querySelector("#loginPassword");
  const showPassword = document.querySelector("#showPassword");
  const forgotPassword = document.querySelector("#forgotPassword");

  showPassword?.addEventListener("click", () => {
    const isPassword = password.type === "password";
    password.type = isPassword ? "text" : "password";
    showPassword.textContent = isPassword ? "◉" : "○";
  });

  forgotPassword?.addEventListener("click", () => {
    tampilkanLoginToast("Silakan hubungi admin untuk reset password.");
  });

  form?.addEventListener("submit", event => {
    event.preventDefault();

    const email = document.querySelector("#loginEmail").value.trim();
    const passwordValue = password.value.trim();

    if (!email || !passwordValue) {
      tampilkanLoginToast("Email dan password wajib diisi.");
      return;
    }

    if (
      email !== "admin@stockflow.com" ||
      passwordValue !== "admin123"
    ) {
      tampilkanLoginToast("Email atau password salah.");
      return;
    }

    localStorage.setItem("stockflowLogin", "true");
    onSuccess?.();
  });
}

function tampilkanLoginToast(pesan) {
  const oldToast = document.querySelector(".login-toast");
  oldToast?.remove();

  const toast = document.createElement("div");
  toast.className = "login-toast";

  toast.innerHTML = `
    <div class="login-toast-icon">!</div>
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
    toast.classList.add("hide");
    setTimeout(() => toast.remove(), 250);
  }, 3000);
}