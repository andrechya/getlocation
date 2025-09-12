const overlay = document.getElementById("connectionOverlay");
const statusMessage = document.getElementById("statusMessage");

let countdown = 15;
let countdownTimer;
let retryCount = 0;
const maxRetries = 3; // berapa kali mencoba rejoin

function showOverlay() {
  overlay.style.display = "flex";
  retryCount = 0; // reset kalau offline baru
  startCountdown();
}

function hideOverlay() {
  overlay.style.display = "none";
  clearInterval(countdownTimer);
  retryCount = 0;
}

function startCountdown() {
  countdown = 15;
  updateMessage();

  clearInterval(countdownTimer);
  countdownTimer = setInterval(() => {
    countdown--;

    if (countdown <= 0) {
      retryCount++;

      if (retryCount >= maxRetries) {
        clearInterval(countdownTimer);

        // Ganti isi statusMessage jadi pesan + tombol reload
        statusMessage.innerHTML = `
          <div class="mb-3">❌ Tidak bisa terhubung.<br>Silakan periksa koneksi internet Anda.</div>
          <button class="btn btn-danger btn-sm" onclick="location.reload()">🔄 Reload Page</button>
        `;
        return;
      }

      countdown = 15; // reset hitung mundur
    }

    updateMessage();
  }, 1000);
}

function updateMessage() {
  if (retryCount < maxRetries) {
    statusMessage.textContent = `Rejoin failed... trying again in ${countdown} seconds (Percobaan ${retryCount + 1}/${maxRetries})`;
  }
}

// Event listener offline/online
window.addEventListener("offline", showOverlay);
window.addEventListener("online", hideOverlay);

// Status awal
if (!navigator.onLine) {
  showOverlay();
} else {
  hideOverlay();
}